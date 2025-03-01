export const dynamic = 'force-dynamic'

import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import { Inter, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";
import { ClientWrapper } from "@/components/ClientWrapper";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ibm-plex-serif'
})

export const metadata: Metadata = {
  title: "YourBanK",
  description: "YourBanK, all in one place.",
  icons: {
    icon: '/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ibmPlexSerif.variable}`}>
      <ClientWrapper>{children}</ClientWrapper>
      <Analytics />
      </body>
    </html>
  );
}
