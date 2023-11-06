import "@/styles/globals.css";
import type { Metadata } from "next";
import { fontSans } from "@/lib/fonts";
import env from "@/lib/env";
import Navbar from "@/components/nav-bar";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_ROOT_URL),
  title: {
    default: "Rajat Das Portfolio",
    template: "%s | Rajat Das Portfolio",
  },
  description: "A portfolio website for Rajat Das",
  openGraph: {
    title: "Rajat Das Portfolio",
    description: "A portfolio website for Rajat Das",
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
      className={cn(fontSans.variable, "dark")}
      data-mode="dark"
    >
      {/* <body className={"min-h-screen bg-background font-sans antialiased"}> */}
      <body className="antialiased max-w-2xl mb-40 flex flex-col md:flex-row mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0 relative">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
