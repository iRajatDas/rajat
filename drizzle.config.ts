import type { Config } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import env from "@/lib/env";

export default {
  schema: "./lib/db/schema/**",
  driver: "pg",
  out: "migrations",
  dbCredentials: {
    connectionString: env.POSTGRES_URL,
  },
} satisfies Config;
