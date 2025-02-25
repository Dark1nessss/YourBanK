"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Menu, CreditCard, BarChart3, Shield, Wallet, Building2, Users, Briefcase, X, Book } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const features = [
  {
    title: "Bank Integration",
    description: "Connect and manage your US bank accounts securely.",
    href: "/#personal-banking",
    icon: Wallet,
  },
  {
    title: "Card Management",
    description: "Create and manage your virtual and physical cards seamlessly.",
    href: "/#business-banking",
    icon: CreditCard,
  },
  {
    title: "Analytics Dashboard",
    description: "Track your spending and monitor your financial health.",
    href: "/#enterprise-solutions",
    icon: BarChart3,
  },
  {
    title: "Security Center",
    description: "Advanced security features to protect your finances.",
    href: "/#integrations",
    icon: Shield,
  },
]

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ className, title, children, icon: Icon, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "flex select-none items-center gap-4 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-800/50",
              className,
            )}
            {...props}
          >
            <div className="flex h-10 w-16 items-center justify-center rounded-lg bg-gray-800">
              {Icon && <Icon className="h-5 w-5 text-green-500" />}
            </div>
            <div>
              <div className="text-sm font-medium text-white">{title}</div>
              <p className="line-clamp-2 text-sm leading-snug text-gray-400">{children}</p>
            </div>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"

export default function NavigationMenuDemo() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#1a1f2d]">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/icons/logo.svg" width={32} height={32} alt="YourBanK logo" />
              <span className="font-ibm-plex-serif text-xl font-bold text-white">
                Your<span className="text-[#39A36A]">BanK</span>
              </span>
            </Link>

            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-white hover:bg-gray-800 hover:text-white data-[state=open]:bg-gray-800">
                    Features
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="w-[600px] rounded-xl border border-gray-800 bg-[#1a1f2d]/95 p-4 backdrop-blur-sm"
                    >
                      <ul className="grid gap-3 md:grid-cols-2">
                        {features.map((feature) => (
                          <ListItem key={feature.title} title={feature.title} href={feature.href} icon={feature.icon}>
                            {feature.description}
                          </ListItem>
                        ))}
                      </ul>
                    </motion.div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/docs" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent text-white hover:bg-gray-800 hover:text-white",
                      )}
                    >
                      <Book className="mr-2 h-4 w-4" />
                      Docs
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex lg:items-center lg:gap-4">
              <Link href="/sign-in">
                <Button variant="ghost" className="text-white hover:bg-gray-800 hover:text-white">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-[#39A36A] hover:bg-[#2E8754]">Get Started</Button>
              </Link>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsOpen(true)}>
                  <Menu className="h-6 w-6 text-white" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full border-gray-800 bg-[#1a1f2d] p-0 sm:max-w-md"
                showClose={false}
              >
                <motion.div
                  className="flex flex-col"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
                    <Link href="/" className="flex items-center gap-2">
                      <Image src="/icons/logo.svg" width={24} height={24} alt="YourBanK logo" />
                      <span className="font-ibm-plex-serif text-lg font-bold text-white">
                        Your<span className="text-[#39A36A]">BanK</span>
                      </span>
                    </Link>
                    <SheetTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(false)}
                        className="h-10 w-10 rounded-full p-0 text-white hover:bg-gray-800"
                      >
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                    </SheetTrigger>
                  </div>

                  <div className="flex-1 space-y-6 overflow-auto py-6">
                    <div className="px-6">
                      <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Features</div>
                      <ul className="grid gap-3">
                        {features.map((feature) => (
                          <li key={feature.title}>
                            <Link
                              href={feature.href}
                              className="flex items-center gap-3 rounded-lg p-3 text-white transition-colors hover:bg-gray-800"
                            >
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-800">
                                <feature.icon className="h-4 w-4 text-green-500" />
                              </div>
                              <div className="text-sm font-medium">{feature.title}</div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="px-6">
                    <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Documentation</div>
                      <Link
                        href="/docs"
                        className="flex items-center gap-3 rounded-lg p-3 text-white transition-colors hover:bg-gray-800"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-800">
                          <Book className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="text-sm font-medium">Docs</div>
                      </Link>
                    </div>
                  </div>

                  <div className="border-t border-gray-800 p-6">
                    <div className="flex flex-col gap-4">
                      <Link href="/sign-in">
                        <Button
                          variant="outline"
                          className="w-full border-gray-700 text-white hover:bg-gray-800 hover:text-white"
                        >
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/sign-up">
                        <Button className="w-full bg-[#39A36A] hover:bg-[#2E8754]">Get Started</Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}