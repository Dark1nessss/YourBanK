"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string
  src?: string
}

export async function copyToClipboard(value: string) {
  navigator.clipboard.writeText(value)
}

export function CopyButton({ value, className, src, ...props }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    if (!hasCopied) return

    const timeout = setTimeout(() => {
      setHasCopied(false)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [hasCopied])

  return (
    <button
      className={cn(
        "relative z-20 inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-800 bg-zinc-900/90 text-sm font-medium transition-all hover:bg-zinc-800 focus:outline-none",
        className,
      )}
      onClick={() => {
        copyToClipboard(value)
        setHasCopied(true)
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <CheckIcon className="h-4 w-4 text-[#39A36A]" /> : <CopyIcon className="h-4 w-4 text-gray-400" />}
    </button>
  )
}