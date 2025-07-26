import FooterLanding from '@/components/FooterLanding';
import NavigationMenuDemo from '@/components/NavigationMenu';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Landing Page',
  description: 'Welcome to the landing page',
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <NavigationMenuDemo />
      <main className="flex-grow relative z-0">{children}</main>
      <FooterLanding />
    </div>
  );
}
