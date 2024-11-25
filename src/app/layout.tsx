import Header from "@/app/components/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@radix-ui/themes/styles.css';
import Link from 'next/link';
import GoogleAnalytics from "@/app/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EU Jobs in Brussels: Commission, Agencies, & Government Affairs Opportunities",
  description: "Find top Eurobrussels bubble jobs, and opportunities in EU agencies. Vacancies for government affairs & public affairs in Brussels.",
  verification: {
    google: "IPQK9o-Ctj-mRI0LGd7JAXC9e1eSeMpA0J25py8xg7c",
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png' },
    ],
    shortcut: [
      { url: '/favicon/favicon.ico' },
    ],
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
        <GoogleAnalytics />
        <Header />
        {children}
        <footer className="container py-8 text-gray-500">
          <div className="flex justify-between items-center">
            <div>EUjobs.co &copy; 2024 - All rights reserved</div>
            <nav className="flex flex-col">
              <Link href="/blog" className="hover:text-gray-700 transition-colors">Blog</Link>
              <Link href="/fairpay" className="hover:text-gray-700 transition-colors">Fair Pay Calculator</Link>
              <Link href="/contact" className="hover:text-gray-700 transition-colors">Contact</Link>
              <Link href="https://www.lobbyinglondon.com" className="hover:text-gray-700 transition-colors" target="_blank" rel="noopener noreferrer">Jobs In London</Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
