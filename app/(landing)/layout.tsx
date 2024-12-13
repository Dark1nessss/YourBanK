import type { Metadata } from 'next'
import { Inter, IBM_Plex_Serif } from "next/font/google";
import Image from "next/image"
import NavigationMenuDemo from "@/components/NavigationMenu"
import FooterLanding from "@/components/FooterLanding"

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ibm-plex-serif'
})

export const metadata: Metadata = {
  title: 'Landing Page',
  description: 'Welcome to our awesome landing page',
}

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <body className={`${inter.variable} ${ibmPlexSerif.variable} font-inter`}>
    <main className="flex min-h-screen w-full flex-col">
      <NavigationMenuDemo />
      <div className="flex-grow">
        {children}
      </div>
      <FooterLanding />
    </main>
  </body>
  )
}