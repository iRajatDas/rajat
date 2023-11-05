import type { Config } from "drizzle-kit";
import dotenv from "dotenv";
import env from "@/lib/env";
dotenv.config({ path: ".env" });

export default {
  schema: "./lib/db/schema/**",
  driver: "pg",
  out: "migrations",
  dbCredentials: {
    connectionString: env.POSTGRES_URL,
  },
} satisfies Config;
