"use client";

import React from "react";
import dynamic from "next/dynamic";
import "@mdxeditor/editor/style.css";

import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  DiffSourceToggleWrapper,
  diffSourcePlugin,
  tablePlugin,
  InsertTable,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  codeMirrorPlugin,
  codeBlockPlugin,
  InsertImage,
  InsertAdmonition,
  ListsToggle,
  BlockTypeSelect,
} from "@mdxeditor/editor";
import type { ForwardedRef } from "react";
import { type MDXEditorMethods, type MDXEditorProps } from "@mdxeditor/editor";
import { useEdgeStore } from "@/lib/provider/edge-storage-provider";
import { toast } from "sonner";

const MDXEditor = dynamic(
  () => import("@mdxeditor/editor").then((mod) => mod.MDXEditor),
  { ssr: false }
);

export default function Editor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  const { edgestore } = useEdgeStore();

  function imageUploadHandler(image: File): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const res = await edgestore.publicFiles.upload({
        file: image,
        onProgressChange: (progress) => {
          // you can use this to show a progress bar
          console.log(progress);
        },
      });

      if (res.url) {
        toast.success("Image uploaded");
        resolve(res.url);

        return res.url;
      } else {
        toast.error("Error uploading image");
        reject("Error uploading image");
      }
    });
  }

  return (
    <MDXEditor
      className="relative MDXEditorProse"
      contentEditableClassName="prose dark:prose-invert dark:text-neutral-300 max-w-none w-full prose-lg"
      plugins={[
        listsPlugin(),
        quotePlugin(),
        headingsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin({
          imageUploadHandler,
        }),
        tablePlugin(),
        thematicBreakPlugin(),

        // frontmatterPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "tsx" }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            js: "JavaScript",
            css: "CSS",
            txt: "text",
            tsx: "TypeScript",
          },
        }),
        diffSourcePlugin({ viewMode: "rich-text" }),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              {/* <InsertFrontmatter /> */}
              <DiffSourceToggleWrapper>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <InsertTable />
                <InsertImage />
                <BlockTypeSelect />
                <InsertAdmonition />
                <ListsToggle />
              </DiffSourceToggleWrapper>
            </>
          ),
        }),
      ]}
      {...props}
      ref={editorRef}
    />
  );
}
