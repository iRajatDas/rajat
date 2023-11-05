import zod from "zod";

const envSchema = zod.object({
  POSTGRES_URL: zod.string(),
  POSTGRES_URL_NON_POOLING: zod.string(),
  POSTGRES_USER: zod.string(),
  POSTGRES_HOST: zod.string(),
  POSTGRES_PASSWORD: zod.string().optional(),
  POSTGRES_DATABASE: zod.string(),
});
const env = envSchema.parse(process.env);
export default env;