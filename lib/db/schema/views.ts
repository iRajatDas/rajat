import { type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const view = pgTable(
  "view",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").notNull(),
    views: integer("views").notNull().default(0),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (view) => {
    return {
      uniqueIdx: uniqueIndex("slug_idx").on(view.slug),
    };
  }
);

type SelectUser = typeof view.$inferSelect;
type InsertUser = typeof view.$inferInsert;
