import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DeFi Nexus - The Ultimate Solana DeFi Platform",
  description: "Trade, earn, and manage your crypto assets with ease and security on Solana. Swap tokens, provide liquidity, stake, and more.",
  icons: {
    icon: [
      { url: '/defi-nexus-logo-minimal.svg?v=6', type: 'image/svg+xml', sizes: 'any' },
      { url: '/defi-nexus-logo-64.svg?v=6', type: 'image/svg+xml', sizes: 'any' }
    ],
    apple: { url: '/defi-nexus-logo-minimal.svg?v=6', type: 'image/svg+xml' },
    shortcut: { url: '/defi-nexus-logo-minimal.svg?v=6' }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
