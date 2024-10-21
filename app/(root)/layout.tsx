import "@/styles/globals.css";
import type { Metadata } from "next";
import { fontMono, fontSans } from "@/lib/fonts";
import env from "@/lib/env";
import Navbar from "@/components/nav-bar";
import { cn } from "@/lib/utils";
import Provider from "@/lib/provider";
import ThemeToggle from "@/components/theme-toggle";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXTAUTH_URL),
  title: {
    default: "Rajot Das - Frontend Engineer | React | Next.js",
    template: "%s | Rajot Das - Frontend Engineer",
  },
  description:
    "Expertise in React and Next.js. Rajot Das: Your dedicated Frontend UI/UX developer, ensuring intuitive interfaces and exceptional user satisfaction.",
  openGraph: {
    title: "Rajot Das - Frontend Engineer | React | Next.js",
    description: `Expertise in React and Next.js. Rajot Das: Your dedicated Frontend UI/UX developer, ensuring intuitive interfaces and exceptional user satisfaction.`,
    url: env.NEXTAUTH_URL,
    siteName: "Rajot Das",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Rajot Das - Frontend Engineer | React | Next.js",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(fontSans.variable, fontMono.variable, "")}
    >
      <head>
        {/* Google Analytics */}

        <Script
          id="google-analytics-script"
          src={`https://www.googletagmanager.com/gtag/js?id=${env.GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag("js", new Date());
            gtag("config", "${env.GOOGLE_ANALYTICS_ID}");
          `}
        </Script>
      </head>

      {/* <body className={"min-h-screen bg-background font-sans antialiased"}> */}
      <body className="antialiased max-w-2xl mb-40 flex flex-col md:flex-row mx-4 mt-8w sm:mx-auto scroll-smooth">
        <Provider>
          <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0 relative">
            <Navbar />
            {children}
          </main>

          <div className="fixed bottom-4 right-4 sm:hidden">
            <ThemeToggle className="bg-slate-100 dark:bg-neutral-800" />
          </div>
        </Provider>
      </body>
    </html>
  );
}
