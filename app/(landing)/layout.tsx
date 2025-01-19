import type { Metadata } from 'next'
import NavigationMenuDemo from "@/components/NavigationMenu"
import FooterLanding from "@/components/FooterLanding"

export const metadata: Metadata = {
  title: 'Landing Page',
  description: 'Welcome to the landing page',
}

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <NavigationMenuDemo />
      <main className="flex-grow">
        {children}
      </main>
      <FooterLanding />
    </div>
  )
}