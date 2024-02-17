import env from "@/lib/env";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `${env.NEXTAUTH_URL}/sitemap.xml`,
    host: env.NEXTAUTH_URL!,
  };
}
