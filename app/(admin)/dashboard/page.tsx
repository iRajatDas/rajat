import { getFilesWithTime } from "@/actions";
import Views from "@/components/views";
import { GitHubFileType } from "@/types/github-content";
import Link from "next/link";
import React, { Suspense } from "react";

const Dashboard = async () => {
  const blogs = (await getFilesWithTime("blog")) as GitHubFileType[];

  return (
    <div>
      <Link
        className="px-2 py-3 bg-pink-500 text-white "
        href="/dashboard/create"
      >
        Create
      </Link>
      <pre>
        <code>{JSON.stringify(blogs, null, 2)}</code>
      </pre>

      {blogs
        .sort((a, b) => {
          if (new Date(a.commit.author.date) > new Date(b.commit.author.date)) {
            return -1;
          }

          return 1;
        })
        .map((post) => (
          <Link
            key={post.path}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.path}`}
          >
            <div className="w-full flex flex-col">
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.name}
              </p>
              <Suspense fallback={<p className="h-6" />}>
                <Views slug={post._links.git} />
              </Suspense>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Dashboard;
