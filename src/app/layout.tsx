import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "POOL Wheel - Automated Liquidity Flywheel",
  description:
    "Automated buybacks from creator fees. Agentic system routes rewards directly to the liquidity pool, strengthening market depth on Solana.",
  icons: {
    icon: "/pool_token_logo.png",
    apple: "/pool_token_logo.png",
  },
  openGraph: {
    title: "POOL Wheel - Automated Liquidity Flywheel",
    description:
      "Automated buybacks from creator fees. Agentic system routes rewards directly to the liquidity pool, strengthening market depth on Solana.",
    images: ["/pool_token_logo.png"],
  },
  twitter: {
    card: "summary",
    title: "POOL Wheel - Automated Liquidity Flywheel",
    description:
      "Automated buybacks from creator fees. Agentic system routes rewards directly to the liquidity pool.",
    images: ["/pool_token_logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
