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

export const queryBuilder = drizzle(pool, { schema });

// const migrateDB = async () => {
//   try {
//     await migrate(queryBuilder, { migrationsFolder: "migrations" });
//     console.log("🚀 Migrations ran successfully!");
//   } catch (err) {
//     if (err instanceof Error) {
//       console.error(`🚨 Error running migrations: ${err.message}`);
//     }

//     process.exit(1);
//   }
// };

// migrateDB();

// export const queryBuilder = db;
export * from "./schema";
