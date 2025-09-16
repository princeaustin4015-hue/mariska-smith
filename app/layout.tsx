import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mariska - Where Luck Meets Skill",
  description: "Experience the ultimate luck-based gaming platform with thrilling games like Swifte, Monimak, and Gadmod. Fair play, amazing rewards, and instant gameplay!",
  keywords: ["gaming", "luck games", "online games", "swifte", "monimak", "gadmod", "gaming platform"],
  authors: [{ name: "Mariska Team" }],
  creator: "Mariska",
  publisher: "Mariska",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mariska.com",
    title: "Mariska - Where Luck Meets Skill",
    description: "Experience the ultimate luck-based gaming platform with thrilling games and amazing rewards!",
    siteName: "Mariska",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mariska - Where Luck Meets Skill",
    description: "Experience the ultimate luck-based gaming platform with thrilling games and amazing rewards!",
    creator: "@mariska_games",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#8B5CF6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-cursive`}
      >
        {children}
      </body>
    </html>
  );
}
