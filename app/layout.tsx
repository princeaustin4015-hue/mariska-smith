import type { Metadata } from "next"
import { Josefin_Sans } from "next/font/google"
import "./globals.css"
import SessionProvider from "@/components/providers/SessionProvider"

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
})

export const metadata: Metadata = {
  title: "Mariska - Where Luck Meets Skill",
  description: "Experience the ultimate luck-based gaming platform with amazing bonuses, exclusive offers, and thrilling rewards!",
  keywords: ["gaming", "luck games", "online games", "bonuses", "offers", "gaming platform"],
  authors: [{ name: "Mariska Team" }],
  creator: "Mariska",
  publisher: "Mariska",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mariska.com",
    title: "Mariska - Where Luck Meets Skill",
    description: "Experience the ultimate luck-based gaming platform with amazing bonuses, exclusive offers, and thrilling rewards!",
    siteName: "Mariska",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mariska - Where Luck Meets Skill",
    description: "Experience the ultimate luck-based gaming platform with amazing bonuses, exclusive offers, and thrilling rewards!",
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
    <html lang="en" className="dark">
      <body
        className={`${josefinSans.variable} antialiased`}
      >
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
