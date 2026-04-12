import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "D&D Tools — Your Tabletop Companion",
  description:
    "A suite of free tools for Dungeons & Dragons players: character creator, spell archive, combat tracker, and enemy horde generator.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${inter.variable} ${cinzel.variable}`}>
      <body className="min-h-full flex flex-col bg-gray-950 text-gray-100">
        {children}
      </body>
    </html>
  );
}
