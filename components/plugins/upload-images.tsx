// import { BlobResult } from "@vercel/blob";
import { toast } from "sonner";
import { EditorState, Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet, EditorView } from "@tiptap/pm/view";

const uploadKey = new PluginKey("upload-image");

const UploadImagesPlugins = () =>
  new Plugin({
    key: uploadKey,
    state: {
      init() {
        return DecorationSet.empty;
      },
      apply(tr, set) {
        set = set.map(tr.mapping, tr.doc);
        // See if the transaction adds or removes any placeholders
        //@ts-expect-error
        const action = tr.getMeta(this);
        if (action && action.add) {
          const { id, pos, src } = action.add;

          const placeholder = document.createElement("div");
          placeholder.setAttribute("class", "img-placeholder");
          const image = document.createElement("img");
          image.setAttribute(
            "class",
            "opacity-40 rounded-lg border border-stone-200"
          );
          image.src = src;
          placeholder.appendChild(image);
          const deco = Decoration.widget(pos + 1, placeholder, {
            id,
          });
          set = set.add(tr.doc, [deco]);
        } else if (action && action.remove) {
          set = set.remove(
            // @ts-expect-error
            set.find(null, null, (spec) => spec.id == action.remove.id)
          );
        }
        return set;
      },
    },
    props: {
      decorations(state) {
        return this.getState(state);
      },
    },
  });

export default UploadImagesPlugins;

function findPlaceholder(state: EditorState, id: {}) {
  const decos = uploadKey.getState(state);
  const found = decos.find(null, null, (spec: any) => spec.id == id);
  return found.length ? found[0].from : null;
}

export function startImageUpload(file: File, view: EditorView, pos: number) {
  // check if the file is an image
  if (!file.type.includes("image/")) {
    toast.error("File type not supported.");
    return;

    // check if the file size is less than 20MB
  } else if (file.size / 1024 / 1024 > 20) {
    toast.error("File size too big (max 20MB).");
    return;
  }

  // A fresh object to act as the ID for this upload
  const id = {};

  // Replace the selection with a placeholder
  const tr = view.state.tr;
  if (!tr.selection.empty) tr.deleteSelection();

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    tr.setMeta(uploadKey, {
      add: {
        id,
        pos,
        src: reader.result,
      },
    });
    view.dispatch(tr);
  };

  handleImageUpload(file).then((src) => {
    const { schema } = view.state;

    let pos = findPlaceholder(view.state, id);
    // If the content around the placeholder has been deleted, drop
    // the image
    if (pos == null) return;

    // Otherwise, insert it at the placeholder's position, and remove
    // the placeholder

    // When BLOB_READ_WRITE_TOKEN is not valid or unavailable, read
    // the image locally
    const imageSrc = typeof src === "object" ? reader.result : src;

    const node = schema.nodes.image.create({ src: imageSrc });
    const transaction = view.state.tr
      .replaceWith(pos, pos, node)
      .setMeta(uploadKey, { remove: { id } });
    view.dispatch(transaction);
  });
}

interface S3UploadParams {
  apiUrl: string;
  imageBlob: Blob;
  imageName: string;
  bucket: string;
  algorithm: string;
  credential: string;
  date: string;
  key: string;
  policy: string;
  signature: string;
}

async function uploadToS3(params: S3UploadParams) {
  const {
    apiUrl,
    imageBlob,
    imageName,
    bucket,
    algorithm,
    credential,
    date,
    key,
    policy,
    signature,
  } = params;

  const formData = new FormData();
  formData.append("file", imageBlob, imageName);
  formData.append("Content-Type", "image/jpeg");
  formData.append(
    "Content-Disposition",
    `inline; filename="${encodeURIComponent(
      imageName
    )}"; filename*=UTF-8''${encodeURIComponent(imageName)}`
  );
  formData.append("bucket", bucket);
  formData.append("X-Amz-Algorithm", algorithm);
  formData.append("X-Amz-Credential", credential);
  formData.append("X-Amz-Date", date);
  formData.append("key", key);
  formData.append("Policy", policy);
  formData.append("X-Amz-Signature", signature);

  const response = await fetch(apiUrl, {
    method: "POST",
    body: formData,
  });
  return response;
}

interface BlobUploadParams {
  presignedUrl: {
    url: string;
    fields: {
      "Content-Disposition": string;
      bucket: string;
      "X-Amz-Algorithm": string;
      "X-Amz-Credential": string;
      "X-Amz-Date": string;
      key: string;
      Policy: string;
      "X-Amz-Signature": string;
    };
  };
  name: string;
  key: string;
  fileType: string;
}

export const handleImageUpload = (file: File) => {
  // upload to Vercel Blob
  return new Promise((resolve) => {
    const requestBody = {
      files: [file.name],
    };
    toast.promise(
      fetch("/api/uploadthing?actionType=upload&slug=imageUploader", {
        method: "POST",
        headers: {
          "content-type": file?.type || "application/octet-stream",
        },
        body: JSON.stringify(requestBody),
      }).then(async (res) => {
        const data = (await res.json()) as BlobUploadParams;

        await uploadToS3({
          apiUrl: "https://uploadthing-prod.s3.us-west-2.amazonaws.com/",
          algorithm: data.presignedUrl.fields["X-Amz-Algorithm"],
          bucket: data.presignedUrl.fields.bucket,
          credential: data.presignedUrl.fields["X-Amz-Credential"],
          date: data.presignedUrl.fields["X-Amz-Date"],
          imageBlob: file,
          imageName: data.name,
          key: data.presignedUrl.fields.key,
          policy: data.presignedUrl.fields.Policy,
          signature: data.presignedUrl.fields["X-Amz-Signature"],
        }).then(async (res) => {
          if (res.status === 200) {
            const {
              presignedUrl: { url },
            } = (await res.json()) as BlobUploadParams;
            // preload the image
            let image = new Image();
            image.src = url;
            image.onload = () => {
              resolve(url);
            };
            // No blob store configured
          } else if (res.status === 401) {
            resolve(file);

            throw new Error(
              "`BLOB_READ_WRITE_TOKEN` environment variable not found, reading image locally instead."
            );
            // Unknown error
          } else {
            throw new Error(`Error uploading image. Please try again.`);
          }
        });
      }),
      {
        loading: "Uploading image...",
        success: "Image uploaded successfully.",
        error: (e) => e.message,
      }
    );
  });
};
