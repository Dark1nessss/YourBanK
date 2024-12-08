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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:shadow-md transition-all .5s bg-gray-1",
            className
          )}
          {...props}
        >
          <div className="text-md font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
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
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-gray-2">
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none hover:shadow-md transition-all .5s"
                    href="/main"
                  >
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
              <ListItem href="/personal" title="Personal Banking">
                Tailored solutions for your individual financial needs.
              </ListItem>
              <ListItem href="/business" title="Business Banking">
                Comprehensive services to help your business thrive.
              </ListItem>
              <ListItem href="/wealth" title="Wealth Management">
                Expert guidance to grow and protect your assets.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-gray-2">
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
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
        <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              About Us
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}