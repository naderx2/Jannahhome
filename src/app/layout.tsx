import type { Metadata } from "next";
import { Geist, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Jannah Home — Couettes & Draps de lit",
  description:
    "Découvrez nos matlas couette, draps de lit et parures. Commandez sans paiement en ligne.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${notoArabic.variable} antialiased min-h-screen bg-background`}
      >
        {children}
      </body>
    </html>
  );
}
