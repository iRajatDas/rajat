import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import env from "./lib/env";

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedBlogFields = {
  slug: {
    type: "string",
    resolve: (doc) => {
      const fileName = doc._raw.flattenedPath
        .split("/")
        .slice(1)
        .toString()
        .split(",")[0];
      console.log(fileName);
      
return fileName;
    },
  },
  tweetIds: {
    type: "array",
    resolve: (doc) => {
      const tweetMatches = doc.body.raw.match(
        /<StaticTweet\sid="[0-9]+"\s\/>/g
      );
      
return tweetMatches?.map((tweet) => tweet.match(/[0-9]+/g)[0]) || [];
    },
  },
  structuredData: {
    type: "object",
    resolve: (doc) => ({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: doc.title,
      datePublished: doc.publishedAt,
      dateModified: doc.publishedAt,
      description: doc.summary,
      image: doc.image
        ? `${env.NEXTAUTH_URL}${doc.image}`
        : `${env.NEXTAUTH_URL}/og?title=${doc.title}`,
      url: `${env.NEXTAUTH_URL}/blog/${doc._raw.flattenedPath}`,
      author: {
        "@type": "Person",
        name: "Rajat Das",
      },
    }),
  },
};

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedSnippetFields = {
  slug: {
    type: "string",
    resolve: (doc) => {
      const fileName = doc._raw.flattenedPath
        .split("/")
        .slice(1)
        .toString()
        .split(",")[0];

      return fileName;
    },
  },
  tweetIds: {
    type: "array",
    resolve: (doc) => {
      const tweetMatches = doc.body.raw.match(
        /<StaticTweet\sid="[0-9]+"\s\/>/g
      );
      
return tweetMatches?.map((tweet) => tweet.match(/[0-9]+/g)[0]) || [];
    },
  },
  structuredData: {
    type: "object",
    resolve: (doc) => ({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: doc.title,
      datePublished: doc.publishedAt,
      dateModified: doc.publishedAt,
      description: doc.summary,
      image: doc.image
        ? `${env.NEXTAUTH_URL}${doc.image}`
        : `${env.NEXTAUTH_URL}/og?title=${doc.title}`,
      url: `${env.NEXTAUTH_URL}/snippets/${doc._raw.flattenedPath}`,
      author: {
        "@type": "Person",
        name: "Rajat Das",
      },
    }),
  },
};

export const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    publishedAt: {
      type: "string",
      required: true,
    },
    summary: {
      type: "string",
      required: true,
    },
    image: {
      type: "string",
    },
  },
  computedFields: computedBlogFields,
}));

export const Snippet = defineDocumentType(() => ({
  name: "Snippet",
  filePathPattern: `snippet/**/*.mdx`,
  contentType: "mdx",
  extensions: {
    stackbit: {},
  },
  fields: {
    title: {
      type: "string",
      required: true,
    },
    publishedAt: {
      type: "string",
      required: true,
    },
    summary: {
      type: "string",
      required: true,
    },
    image: {
      type: "string",
    },
  },
  computedFields: computedSnippetFields,
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Blog, Snippet],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "one-dark-pro",
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ["word--highlighted"];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"],
            style: "padding-left: 0.375rem;",
          },
        },
      ],
    ],
  },
});
