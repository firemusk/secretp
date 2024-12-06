import Header from "@/app/components/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@radix-ui/themes/styles.css';
import Link from 'next/link';
import GoogleAnalytics from "@/app/components/GoogleAnalytics";
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Top EU Jobs in Brussels | EU Agencies, Government, & Policy Roles",
  description: "Find top Eurobrussels bubble jobs, including roles in EU agencies, government affairs, and public policy. Apply today to top career opportunities!.",
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
      <head>
        <Script 
          async 
          src="https://www.googletagmanager.com/gtag/js?id=G-G616KE1CWQ" 
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-G616KE1CWQ');`}
        </Script>
      </head>
      <body className={inter.className}>
        <GoogleAnalytics />
        <Header />
        {children}
        <footer className="container py-8 text-gray-500 border-t-2 mt-2 md:mt-4 lg:mt-8">
          <div className="flex md:flex-row flex-col justify-between md:items-center">
            <div>EUjobs.co &copy; 2024 - All rights reserved</div>
            <nav className="flex flex-col underline mt-4 md:mt-0 gap-1">
              <Link href="/blog" className="hover:text-gray-700 transition-colors">Eujobs Blog</Link>
              <Link href="/fairpay" className="hover:text-gray-700 transition-colors">EUjobs Fair Pay Calculator</Link>
              <Link href="/contact" className="hover:text-gray-700 transition-colors">Eujobs Contact</Link>
              <Link href="https://www.lobbyinglondon.com" className="hover:text-gray-700 transition-colors" target="_blank" rel="noopener noreferrer">Jobs In London</Link>
              <Link href="/eu-jobs" className="hover:text-gray-700 transition-colors">Browse EU Jobs</Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
