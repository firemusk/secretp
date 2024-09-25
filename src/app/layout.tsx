import Header from "@/app/components/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@radix-ui/themes/styles.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EU Jobs",
  description: "Find a job in the EU institutions change the world by advocating, lobbying, or making policy",
  icons: {
    icon: '/flavicon/favicon.ico',
    shortcut: '/flavicon/favicon-32x32.png',
    apple: '/flavicon/apple-touch-icon.png',
    other: [
      {
        rel: 'android-chrome',
        sizes: '192x192',
        url: '/flavicon/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome',
        sizes: '512x512',
        url: '/flavicon/android-chrome-512x512.png',
      }
    ]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <footer className="container py-8 text-gray-500">
          Job Board &copy; 2024 - All rights reserved
        </footer>
      </body>
    </html>
  );
}
