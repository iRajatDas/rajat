import "server-only";
import { unstable_cache } from "next/cache";
import { queryBuilder, view } from "./db/queryBuilder";

export const getViewsCount = unstable_cache(
  async () => {
    return queryBuilder
      .select({
        views: view.views,
        slug: view.slug,
      })
      .from(view)
      .execute();
  },
  ["all-views"],
  {
    revalidate: 5,
  }
);
