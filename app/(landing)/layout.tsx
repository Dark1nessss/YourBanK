import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from "next/image"
import NavigationMenuDemo from "@/components/NavigationMenu"

const inter = Inter({ subsets: ['latin'] })

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
    <main className={`flex min-h-screen w-full flex-col ${inter.className}`}>
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
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
  )
}