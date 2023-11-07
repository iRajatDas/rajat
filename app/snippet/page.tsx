import type { Metadata } from "next";
import Link from "next/link";
import { allSnippets } from "contentlayer/generated";
import { Suspense } from "react";
import Views from "@/components/views";

export const metadata: Metadata = {
  title: "Collection of JavaScript Snippets",
  description:
    "The JavaScript snippet collection contains a wide variety of ES6 helper functions. It includes helpers for dealing with primitives, arrays and objects, as well as algorithms, DOM manipulation functions and Node.js utilities.",
};

export default function BlogPage() {
  return (
    <section>
      <div className="mb-8 space-y-2">
        <h1 className="font-semibold text-2xl tracking-tighter">Snippets</h1>
        <p className="text-neutral-700 dark:text-neutral-300">
          The JavaScript snippet collection contains a wide variety of ES6
          helper functions. It includes helpers for dealing with primitives,
          arrays and objects, as well as algorithms, DOM manipulation functions
          and Node.js utilities.
        </p>
      </div>
      {allSnippets
        .sort((a, b) => {
          if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={post.slug}
          >
            <div className="w-full flex flex-col">
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.title}
              </p>
              <Suspense fallback={<p className="h-6" />}>
                <Views slug={post.slug} />
              </Suspense>
            </div>
          </Link>
        ))}
    </section>
  );
}
