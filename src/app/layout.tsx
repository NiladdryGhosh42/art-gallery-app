import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ফুলচিত্র (Phulchitra) — প্রাইভেট আর্ট আর্কাইভ ও ডিজিটাল স্টুডিও",
  description: "শিল্পী এবং তাঁর সঙ্গীর একান্ত ডিজিটাল স্কেচবুক ও গ্যালারি আর্কাইভ।",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" data-theme="paper">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Hind+Siliguri:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Noto+Serif+Bengali:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-accent selection:text-white">
        {children}
      </body>
    </html>
  );
}
