import "@/styles/globals.css";
import type { Metadata } from "next";
import { fontSans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Rajat Das Portfolio",
  description: "A portfolio website for Rajat Das",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={fontSans.variable}>
      <body className={"min-h-screen bg-background font-sans antialiased"}>
        {children}
      </body>
    </html>
  );
}
