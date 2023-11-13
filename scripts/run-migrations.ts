import { queryBuilder } from "@/lib/db/queryBuilder";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";


const main = async () => {
  try {
    await migrate(queryBuilder, { migrationsFolder: "migrations" });
    console.log("🚀 Migrations ran successfully!");
  } catch (err) {
    if (err instanceof Error) {
      console.error(`🚨 Error running migrations: ${err.message}`);
    }

    process.exit(1);
  }
};

main();
