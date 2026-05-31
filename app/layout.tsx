import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "./components/CustomCursor";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VibeCoding OS — Websites That Feel Alive",
  description:
    "Cinematic websites, interactive systems, booking flows, motion experiments, and digital experiences — built by one independent creator.",
  keywords: ["web design", "cinematic websites", "interactive systems", "motion design", "Next.js"],
  openGraph: {
    title: "VibeCoding OS",
    description: "Websites That Feel Alive.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-[#080a0f] text-[#f0f0f0] antialiased overflow-x-hidden">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
