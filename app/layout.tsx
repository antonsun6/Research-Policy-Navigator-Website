import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/TopNav";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

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
    <html lang="en" className={geist.variable}>
      <body className="flex min-h-screen flex-col">
        <TopNav />
        <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-14 text-center">
          {children}
        </main>
        <footer className="border-t border-[var(--border)] py-6 text-center text-xs text-[var(--foreground)]/50">
          Team A · COMP 523 · UNC Chapel Hill
        </footer>
      </body>
    </html>
  );
}
