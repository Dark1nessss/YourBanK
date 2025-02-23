"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DocsSidebarNav } from "@/components/docs/sidebar-nav"

const sidebarNavItems = [
{
    title: "Overview",
    items: [
    {
        title: "Home",
        href: "/docs",
    },
    ],
},
{
    title: "Getting Started",
    items: [
    {
        title: "Introduction",
        href: "/docs/introduction",
    },
    {
        title: "Installation",
        href: "/docs/installation",
    },
    {
        title: "Components.json",
        href: "/docs/components-json",
    },
    {
        title: "Constants.ts",
        href: "/docs/constants",
    },
    {
        title: "Types.ts",
        href: "/docs/types",
    },
    {
        title: "Styling",
        href: "/docs/styling",
    },
    ],
},
{
    title: "Components",
    items: [
    {
        title: "AnimatedCounter",
        href: "/docs/components/animated-counter",
    },
    {
        title: "AuthForm",
        href: "/docs/components/auth-form",
    },
    {
        title: "BankCard",
        href: "/docs/components/bank-card",
    },
    {
        title: "BankTabItem",
        href: "/docs/components/bank-tab-item",
    },
    {
        title: "CardAuth",
        href: "/docs/components/card-auth",
    },
    {
        title: "Category",
        href: "/docs/components/category",
    },
    {
        title: "Copy",
        href: "/docs/components/copy",
    },
    {
        title: "DoughnutChart",
        href: "/docs/components/doughnut-chart",
    },
    {
        title: "Sidebar",
        href: "/docs/components/sidebar",
    },
    {
        title: "RightSidebar",
        href: "/docs/components/right-sidebar",
    },
    {
        title: "Footer",
        href: "/docs/components/footer",
    },
    {
        title: "RecentTransactions",
        href: "/docs/components/recent-transactions",
    },
    {
        title: "TransactionTable",
        href: "/docs/components/transaction-table",
    },
    {
        title: "Pagination",
        href: "/docs/components/pagination",
    },
    {
        title: "PaymentTransferForm",
        href: "/docs/components/payment-transfer-form",
    },
    {
        title: "PlaidLink",
        href: "/docs/components/plaid-link",
    },
    ],
},
{
    title: "Actions",
    items: [
    {
        title: "Bank Actions",
        href: "/docs/actions/bank-actions",
    },
    {
        title: "Dwolla Actions",
        href: "/docs/actions/dwolla-actions",
    },
    {
        title: "Transaction Actions",
        href: "/docs/actions/transactions",
    },
    {
        title: "User Actions",
        href: "/docs/actions/user-actions",
    },
    {
        title: "Appwrite",
        href: "/docs/actions/appwrite",
    },
    {
        title: "Plaid",
        href: "/docs/actions/plaid",
    },
    {
        title: "Utils",
        href: "/docs/actions/utils",
    },
    ],
},
]

export function NavDocs() {
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
                  className="flex flex-col h-full"
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

                  <div className="flex-1 overflow-y-auto custom-scrollbar py-6 px-6">
                    <DocsSidebarNav items={sidebarNavItems} />
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