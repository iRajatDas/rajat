import dotenv from "dotenv";

dotenv.config({ path: ".env" });
import zod from "zod";

const envSchema = zod.object({
  DATABASE_URL: zod.string(),
  NEXTAUTH_SECRET: zod.string(),
  GOOGLE_CLIENT_ID: zod.string(),
  GOOGLE_CLIENT_SECRET: zod.string(),
  POSTGRES_PASSWORD: zod.string().optional(),
  NEXTAUTH_URL: zod.string(),
  GHP_PAT: zod.string(),
  RESEND_EMAIL_FROM: zod.string(),
  
  // EDGE_STORE_ACCESS_KEY: zod.string(),
  // EDGE_STORE_SECRET_KEY: zod.string(),
});

const env = envSchema.parse(process.env);

export default env;
