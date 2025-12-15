import type { Metadata, Viewport } from "next"
import { Josefin_Sans } from "next/font/google"
import "./globals.css"

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
})

export const metadata: Metadata = {
  title: "Mariska - Arcade Games Hub",
  description: "Play arcade games, earn credits and tokens, and claim amazing bonuses!",
  keywords: ["arcade games", "credits", "tokens", "bonuses", "gaming platform"],
  authors: [{ name: "Mariska Team" }],
  creator: "Mariska",
  publisher: "Mariska",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mariska.com",
    title: "Mariska - Arcade Games Hub",
    description: "Play arcade games, earn credits and tokens, and claim amazing bonuses!",
    siteName: "Mariska",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mariska - Arcade Games Hub",
    description: "Play arcade games, earn credits and tokens, and claim amazing bonuses!",
    creator: "@mariska_games",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
        {children}
      </body>
    </html>
  );
}
