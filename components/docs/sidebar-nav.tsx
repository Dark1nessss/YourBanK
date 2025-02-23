"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface DocsSidebarNavProps {
  items: {
    title: string
    items: {
      title: string
      href: string
      disabled?: boolean
    }[]
  }[]
}

export function DocsSidebarNav({ items }: DocsSidebarNavProps) {
  const pathname = usePathname()

  return (
    <div className="w-full">
      {items.map((item) => (
        <div key={item.title} className="pb-4">
          <h4 className="mb-1 rounded-md px-2 py-1 text-md font-semibold text-gray-400">{item.title}</h4>
          {item.items.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-gray-800/50",
                  isActive ? "bg-gray-800 font-medium text-[#39A36A]" : "text-gray-400 hover:text-white",
                  link.disabled && "cursor-not-allowed opacity-60",
                )}
                onClick={(e) => {
                  if (link.disabled) e.preventDefault()
                }}
              >
                <span>{link.title}</span>
              </Link>
            )
          })}
        </div>
      ))}
    </div>
  )
}