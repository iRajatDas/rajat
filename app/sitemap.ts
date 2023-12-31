import env from "@/lib/env";
import { getISODate } from "@/lib/utils";
import { allBlogs, allSnippets } from "contentlayer/generated";

export default async function sitemap() {
  const homePage = {
    url: `${env.NEXTAUTH_URL!}`,
    lastModified: new Date("2023-11-07").toISOString(),
  };

  const blogs = allBlogs.map((post) => ({
    url: `${env.NEXTAUTH_URL!}/blog/${post.slug}`,
    lastModified: getISODate(post.publishedAt),
  }));

  const snippets = allSnippets.map((post) => ({
    url: `${env.NEXTAUTH_URL!}/snippets/${post.slug}`,
    lastModified: getISODate(post.publishedAt),
  }));

  return [homePage, ...snippets, ...blogs];
}
