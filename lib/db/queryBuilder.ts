import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import env from "@/lib/env";

const pool = new Pool({
  connectionString: env.POSTGRES_URL,
});

export * from "./schema";

export const queryBuilder = drizzle(pool, { schema });
