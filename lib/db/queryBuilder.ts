import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import { Pool } from "pg";
import * as schema from "./schema";
import env from "@/lib/env";

const pool = new Pool({
  connectionString: env.POSTGRES_URL,
});

const db = drizzle(pool, { schema });

export const queryBuilder = db;

const main = async () => {
  try {
    await migrate(db, { migrationsFolder: "migrations" });
    console.log("🚀 Migrations ran successfully!");
  } catch (err) {
    if (err instanceof Error) {
      console.error(`🚨 Error running migrations: ${err.message}`);
    }

    process.exit(1);
  }
};

void main();

export * from "./schema";
