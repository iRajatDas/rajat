import env from "@/lib/env";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `${env.NEXT_PUBLIC_ROOT_URL}/sitemap.xml`,
    host: env.NEXT_PUBLIC_ROOT_URL!,
  };
}
