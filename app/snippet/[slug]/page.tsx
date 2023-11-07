import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx";
import { allSnippets } from "contentlayer/generated";
import Balancer from "react-wrap-balancer";
import { Suspense } from "react";
import { formatDate } from "@/lib/utils";
import Views from "@/components/views";

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  const post = allSnippets.find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
    slug,
  } = post;
  const ogImage = image
    ? `${process.env.NEXT_PUBLIC_ROOT_URL!}${image}`
    : `${process.env.NEXT_PUBLIC_ROOT_URL!}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${process.env.NEXT_PUBLIC_ROOT_URL!}/snippets/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Snippet({ params }: { params: { slug: string } }) {
  const post = allSnippets.find((post) =>
    post.slug.replaceAll("/snippet", "").includes(params.slug)
  );

  if (!post) {
    notFound();
  }
  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(post.structuredData),
        }}
      ></script>
      <h1 className="font-semibold text-2xl tracking-tighter max-w-[650px]">
        <Balancer>{post.title}</Balancer>
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.publishedAt)}
        </p>
        <Suspense fallback={<p className="h-5" />}>
          <Views slug={post.slug} trackView />
        </Suspense>
      </div>
      <Mdx code={post.body.code} />
    </section>
  );
}