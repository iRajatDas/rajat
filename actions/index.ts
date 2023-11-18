"use server";

import { queryBuilder, view } from "@/lib/db/queryBuilder";
import { eq } from "drizzle-orm";
import { Octokit } from "@octokit/rest";
import { slugify } from "@/lib/utils";
import env from "@/lib/env";
import axios from "axios";
import { FileExistsData } from "@/types/github-content";
import { format } from "date-fns";

export async function incrementViews(slug: string) {
  const toIncrement = await queryBuilder.query.view.findFirst({
    where(fields, operators) {
      return operators.eq(fields.slug, slug);
    },
  });

  if (toIncrement) {
    await queryBuilder
      .update(view)
      .set({
        views: toIncrement.views + 1,
      })
      .where(eq(view.slug, slug))
      .returning()
      .execute();
  } else {
    await queryBuilder
      .insert(view)
      .values({
        slug,
        updatedAt: new Date(),
      })
      .returning()
      .execute();
  }

  return;
}

export async function getViewCount(slug: string): Promise<
  {
    slug: string;
    count: number;
  }[]
> {
  const views = await queryBuilder.query.view
    .findMany({
      where(fields, operators) {
        return operators.eq(fields.slug, slug);
      },
    })
    .execute();

  return views.map((view) => ({
    slug: view.slug,
    count: view.views,
  }));
}

export const fileExists = async (
  repoOwner: string,
  repoName: string,
  slug: string,
  type: "blog" | "snippet",
  accessToken: string
): Promise<FileExistsData> => {
  const base_url = `https://api.github.com/repos/${repoOwner}/${repoName}/`;
  const headers = {
    Authorization: `token ${accessToken}`,
    Accept: "application/vnd.github.v3+json",
  };

  const slugified = slugify(slug);

  try {
    const contentResponse = await axios.get(
      `${base_url}contents/content/${type}/${slugified}/content.mdx`,
      {
        headers,
      }
    );
    const contentSha = contentResponse.data.sha;

    const metadataResponse = await axios.get(
      `${base_url}contents/content/${type}/${slugified}/metadata.json`,
      {
        headers,
      }
    );
    const metadataSha = metadataResponse.data.sha;

    const treeResponse = await axios.get(`${base_url}git/trees/${contentSha}`, {
      headers,
    });
    const treeSha = treeResponse.data.sha;

    const commitResponse = await axios.get(
      `${base_url}git/commits/${treeSha}`,
      {
        headers,
      }
    );
    const parentSha = commitResponse.data.parents?.[0]?.sha;
    const commitSha = commitResponse.data.sha;

    return {
      sha: contentResponse.data.sha,
      contentSha,
      metadataSha,
      treeSha,
      parentSha,
      commitSha,
    };
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return {};
    } else {
      throw error;
    }
  }
};

export const getFiles = async (type: "blog" | "snippet") => {
  const octokit = new Octokit({
    auth: env.GHP_PAT,
  });

  const { data } = await octokit.repos.getContent({
    owner: "iRajatDas",
    repo: "rajat",
    path: `content/${type}`,
  });

  return data;
};

export const getFilesWithTime = async (type: "blog" | "snippet") => {
  const octokit = new Octokit({
    auth: env.GHP_PAT,
  });

  const { data } = (await octokit.repos.getContent({
    owner: "iRajatDas",
    repo: "rajat",
    path: `content/${type}`,
  })) as any;

  const files = await Promise.all(
    data.map(async (file: any) => {
      const { data: commit } = await octokit.repos.getCommit({
        owner: "iRajatDas",
        repo: "rajat",
        ref: "main",
        path: file.path,
      });

      return {
        ...file,
        commit: commit.commit,
      };
    })
  );

  return files;
};

interface Metadata {
  title: string;
  description: string;
  publishedAt: string;
}

export async function createArticleWithMetadata(
  repoOwner: string,
  repoName: string,
  branch: string,
  content: string,
  slug: string,
  type: "blog" | "snippet",
  title: string,
  description: string
): Promise<void> {
  const headers = {
    Authorization: `token ${env.GHP_PAT}`,
    Accept: "application/vnd.github.v3+json",
  };

  const slugified = slugify(slug);

  // Step 1: Create or update content and metadata files within a single commit
  const filePath = `content/${type}/${slugified}/`;

  const contentBase64 = Buffer.from(content).toString("base64");
  const metadata: Metadata = {
    title,
    description,
    publishedAt: format(new Date(), "yyyy-MM-dd"),
  };
  const metadataBase64 = Buffer.from(JSON.stringify(metadata)).toString(
    "base64"
  );

  await createOrUpdateFiles(
    repoOwner,
    repoName,
    branch,
    filePath,
    {
      "content.mdx": contentBase64,
      "metadata.json": metadataBase64,
    },
    "Add new post",
    headers
  );

  console.log("🚀 Content and metadata files created or updated successfully!");
}

async function createOrUpdateFiles(
  repoOwner: string,
  repoName: string,
  branch: string,
  folderPath: string,
  files: Record<string, string>,
  commitMessage: string,
  headers: Record<string, string>
): Promise<void> {
  const base_url = `https://api.github.com/repos/${repoOwner}/${repoName}/`;

  // Step 1: Get the SHA of the base tree
  const baseTreeResponse = await axios.get(
    `${base_url}git/trees/${branch}?recursive=1`,
    {
      headers,
    }
  );
  const baseTreeSha = baseTreeResponse.data.sha;

  // Step 2: Create blobs for each file
  const blobShas: Record<string, string> = {};
  for (const [fileName, fileContent] of Object.entries(files)) {
    const blobData = {
      content: fileContent,
      encoding: "base64",
    };

    const blobResponse = await axios.post(`${base_url}git/blobs`, blobData, {
      headers,
    });
    blobShas[fileName] = blobResponse.data.sha;
  }

  // Step 3: Create a tree with the new blobs
  const treeData = {
    tree: Object.entries(blobShas).map(([fileName, blobSha]) => ({
      path: folderPath + fileName,
      mode: "100644",
      type: "blob",
      sha: blobSha,
    })),
    base_tree: baseTreeSha,
  };

  const treeResponse = await axios.post(`${base_url}git/trees`, treeData, {
    headers,
  });
  const newTreeSha = treeResponse.data.sha;

  // Step 4: Create a commit with the new tree
  const commitData = {
    message: commitMessage,
    tree: newTreeSha,
    parents: [baseTreeSha],
  };

  const commitResponse = await axios.post(
    `${base_url}git/commits`,
    commitData,
    {
      headers,
    }
  );
  const newCommitSha = commitResponse.data.sha;

  // Step 5: Update the branch reference to the new commit
  await axios.patch(
    `${base_url}git/refs/heads/${branch}`,
    {
      sha: newCommitSha,
    },
    {
      headers,
    }
  );
}
