import Link from "next/link";
import ArrowIcon from "@/components/arrow-icon";

async function BlogLink({
  slug,
  name,
  type = "blog",
}: {
  slug: string;
  name: string;
  type?: "blog" | "snippet";
}) {
  // const allViews = await getViewsCount();

  return (
    <Link
      href={`/${type}/${slug}`}
      className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50  dark:bg-neutral-800 rounded flex items-center justify-between px-3 py-4 w-full"
    >
      <div className="flex flex-col">
        <p className="font-semibold text-neutral-900 dark:text-neutral-100">
          {name}
        </p>
        {/* <ViewCounter allViews={allViews} slug={slug} trackView={false} /> */}
      </div>
      <div className="text-neutral-700 dark:text-neutral-300">
        <ArrowIcon />
      </div>
    </Link>
  );
}

export default BlogLink;
