import "@/styles/globals.css";
import type { Metadata } from "next";
import { fontMono, fontSans } from "@/lib/fonts";
import env from "@/lib/env";
import Navbar from "@/components/nav-bar";
import { cn } from "@/lib/utils";
import Provider from "@/lib/provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_ROOT_URL),
  title: {
    default: "Rajat Das",
    template: "%s | Rajat Das",
  },
  description:
    "Expertise in React and Next.js. Rajat Das: Your dedicated Frontend UI/UX developer, ensuring intuitive interfaces and exceptional user satisfaction.",

  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
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

export default function DashboardLayout({
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
      <body className="antialiased max-w-2xl mb-40 flex flex-col md:flex-row mx-4 mt-8w sm:mx-auto scroll-smooth">
        <Toaster richColors />
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
