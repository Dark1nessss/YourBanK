import type { Metadata } from 'next'
import { Inter, IBM_Plex_Serif } from "next/font/google";
import Image from "next/image"
import NavigationMenuDemo from "@/components/NavigationMenu"

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
    <body className="font-inter">
      <main className="flex min-h-screen w-full flex-col">
        <header className="bg-green-200 border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
              <h1 className="title">
                Your<span className="text-green-700">BanK</span>
              </h1>
            </div>
            <NavigationMenuDemo />
          </div>
        </header>

        <div className="flex-grow container mx-auto px-4 py-8">
          {children}
        </div>

        <footer className="bg-muted py-4">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </div>
        </footer>
      </main>
    </body>
  )
}