import dotenv from "dotenv";

dotenv.config({ path: ".env" });

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import env from "@/lib/env";

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

export const queryBuilder = drizzle(pool, { schema });
export * from "./schema";
