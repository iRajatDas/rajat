import env from "@/lib/env";
import { getISODate } from "@/lib/utils";
import { allBlogs, allSnippets } from "contentlayer/generated";

type Sitemap = Array<{
  url: string;
  lastModified?: string | Date;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
}>;

export default async function sitemap() {
  const homePage = {
    url: `${env.NEXTAUTH_URL!}`,
    
    // current date
    lastModified: new Date().toISOString(),
    changefreq: "hourly",
    priority: 1,
  };

  const timeline = {
    url: `${env.NEXTAUTH_URL!}/timeline`,
    lastModified: new Date("2023-11-07").toISOString(),
  };

  const blogs = allBlogs.map((post) => ({
    url: `${env.NEXTAUTH_URL!}/blog/${post.slug}`,
    lastModified: getISODate(post.publishedAt),
    changefreq: "hourly",
    priority: 0.8,
  }));

  const snippets = allSnippets.map((post) => ({
    url: `${env.NEXTAUTH_URL!}/snippets/${post.slug}`,
    lastModified: getISODate(post.publishedAt),
    changefreq: "hourly",
    priority: 0.8,
  }));

  return [homePage, timeline, ...snippets, ...blogs] satisfies Sitemap;
}
