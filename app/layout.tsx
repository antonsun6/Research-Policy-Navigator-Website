import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";

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
      <body className="min-h-screen">
        <AppShell>
          <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-14 text-center">
            {children}
          </main>
          <footer className="bg-[var(--navy-deep)] py-6 text-center text-xs text-white/60">
            Team A · COMP 523 · UNC Chapel Hill
          </footer>
        </AppShell>
      </body>
    </html>
  );
}
