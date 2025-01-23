"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"

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

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Features",
    href: "/features",
    description: "Explore our innovative banking features designed for you.",
  },
  {
    title: "Accounts",
    href: "/accounts",
    description: "Discover our range of personal and business accounts.",
  },
  {
    title: "Loans",
    href: "/loans",
    description: "Find the right loan solution for your needs.",
  },
  {
    title: "Investments",
    href: "/investments",
    description: "Grow your wealth with our investment options.",
  },
  {
    title: "Support",
    href: "/support",
    description: "Get help and answers to your banking questions.",
  },
]

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-sm p-3 leading-none no-underline outline-none focus:text-accent-foreground shadow-sm hover:shadow-md transition-all .5s bg-green-300",
            className
          )}
          {...props}
        >
          <div className="text-md font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default function NavigationMenuDemo() {
  return (
    <header className="nav-header">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <NavigationMenu className="opacity-100 z-20">
          <NavigationMenuList className="flex-1 justify-start gap-6">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className="nav-logo">
                  <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
                  <h1 className="title">
                    Your<span className="text-green-700">BanK</span>
                  </h1>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="hidden md:block">
              <NavigationMenuTrigger>Services</NavigationMenuTrigger>
              <NavigationMenuContent className="bg-gray-1">
                <ul className="nav-content-grid">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a className="nav-feature-item" href="/main">
                        <Image
                            src="/icons/logo.svg"
                            alt="YourBanK Logo"
                            width={32}
                            height={32}
                        />
                        <div className="mb-2 mt-4 text-lg font-bold title">
                          Your<span className="text-green-700">BanK</span>
                        </div>
                        <p className="text-md leading-normal">
                          Secure, innovative, and personalized banking solutions for a brighter financial future.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="#features" title="Services">
                    Tailored solutions for your individual financial needs.
                  </ListItem>
                  <ListItem href="#benefits" title="Products">
                    Comprehensive services to help your business thrive.
                  </ListItem>
                  <ListItem href="#cta" title="About Us">
                    Expert guidance to grow and protect your assets.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className="hidden md:block">
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent className="bg-gray-1">
                <ul className="nav-content-grid wide">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className="hidden md:block">
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About Us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Link 
          href="/contact" 
          className="contact-us-button"
        >
          Contact Us
        </Link>
      </div>
    </header>
  )
}