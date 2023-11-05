"use server";

import { queryBuilder, view } from "@/lib/db/queryBuilder";
import { eq } from "drizzle-orm";

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
