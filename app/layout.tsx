import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sentinel AI - Command Center",
  description: "AI-powered Risk Controller for crypto/stock portfolios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #0a0f1a 0%, #0d1424 50%, #0a0f1a 100%)", backgroundAttachment: "fixed" }}>
          {children}
        </div>
      </body>
    </html>
  );
}
