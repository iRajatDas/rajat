"use server";

import { queryBuilder, view } from "@/lib/db/queryBuilder";
import { eq } from "drizzle-orm";
import { Octokit } from "@octokit/rest";
import { slugify } from "@/lib/utils";
import env from "@/lib/env";

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

const fileExists = async (slug: string, type: "blog" | "snippet") => {
  const octokit = new Octokit({
    auth: env.GHP_PAT,
  });

  const slugified = slugify(slug);

  try {
    const { data } = await octokit.repos.getContent({
      owner: "iRajatDas",
      repo: "rajat",
      path: `content/${type}/${slugified}.mdx`,
    });

    return data;
  } catch (error) {
    throw new Error("File does not exist");
  }
};

export const pushContent = async ({
  content,
  slug,
  type,
}: {
  content: string;
  slug: string;
  type: "blog" | "snippet";
}) =>  {
  try {
    const octokit = new Octokit({
      auth: env.GHP_PAT,
    });

    const slugified = slugify(slug);

    const contentBase64 = Buffer.from(content).toString("base64");

    let data;
    try {
      data = await fileExists(slug, type);
    } catch (error) {
      console.log("🚀 error", error);
      data = {};
    }

    console.log("🚀 data", data);
    const createQuery = {
      owner: "iRajatDas",
      repo: "rajat",
      path: `content/${type}/${slugified}.mdx`,
      message: "Add new post",
      content: contentBase64,
      branch: "main",
    };
    try {
      await octokit.repos.createOrUpdateFileContents({
        ...createQuery,
        // @ts-ignore
        sha: data.sha ? data.sha : undefined,
      });
      console.log("🚀 File created successfully!");
    } catch (error) {
      console.error("Error getting content:", error);
    }
  } catch (error) {
    console.error("Error publishing post to GitHub:", error);
  }

  return;
};
