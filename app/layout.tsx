import "@/styles/globals.css";
import type { Metadata } from "next";
import { fontMono, fontSans } from "@/lib/fonts";
import env from "@/lib/env";
import Navbar from "@/components/nav-bar";
import { cn } from "@/lib/utils";
import Provider from "@/lib/provider";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_ROOT_URL),
  title: {
    default: "Rajat Das",
    template: "%s | Rajat Das",
  },
  description:
    "Expertise in React and Next.js. Rajat Das: Your dedicated Frontend UI/UX developer, ensuring intuitive interfaces and exceptional user satisfaction.",
  openGraph: {
    title: "Rajat Das Portfolio",
    description:
      "Expertise in React and Next.js. Rajat Das: Your dedicated Frontend UI/UX developer, ensuring intuitive interfaces and exceptional user satisfaction.",
    url: env.NEXT_PUBLIC_ROOT_URL,
    siteName: "Rajat Das",
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
    title: "Rajat Das",
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
      {/* <body className={"min-h-screen bg-background font-sans antialiased"}> */}
      <body className="antialiased max-w-2xl mb-40 flex flex-col md:flex-row mx-4 mt-8 lg:mx-auto scroll-smooth">
        <Provider>
          <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0 relative">
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
