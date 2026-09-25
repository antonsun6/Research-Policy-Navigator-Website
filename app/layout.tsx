import type { Metadata } from "next";
import "./globals.css";
import TopNav from "@/components/TopNav";

export const metadata: Metadata = {
  title: "Research Policy Navigator",
  description:
    "An AI-assisted policy navigator helping UNC researchers get fast, source-grounded answers to compliance questions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <TopNav />
        <main className="mx-auto max-w-6xl px-6 py-10 text-center">{children}</main>
      </body>
    </html>
  );
}
