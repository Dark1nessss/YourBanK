"use client"

import { motion } from "framer-motion"
import { CopyButton } from "@/components/docs/copy-button"

export default function ComponentsJsonPage() {
  return (
    <div className="space-y-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="font-ibm-plex-serif text-3xl font-bold text-white md:text-5xl">Components.json</h1>
        <p className="text-lg text-gray-400">Configure your YourBanK components and styling.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4 w-full overflow-hidden"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">Configuration</h2>
        <p className="text-gray-400">
          The <code className="rounded bg-[#1d1d1d] px-1.5 py-0.5">components.json</code> file contains the
          configuration for your YourBanK components, including styling, themes, and component paths.
        </p>

        <div className="relative rounded-lg border border-gray-800 bg-[#0c0c0c]">
          <div className="absolute right-4 top-4">
            <CopyButton
              value={`{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}`}
              className="bg-[#1d1d1d] hover:bg-[#2a2a2a]"
            />
          </div>
          <pre className="mb-4 mt-6 overflow-x-auto p-4">
            <code className="text-white">{`{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}`}</code>
          </pre>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">Options</h2>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">style</h3>
          <p className="text-gray-400">
            The style of components to use. YourBanK uses a custom style based on shadcn/ui with banking-specific
            modifications.
          </p>

          <h3 className="text-xl font-semibold text-white">rsc</h3>
          <p className="text-gray-400">
            Enable React Server Components support. This is enabled by default for Next.js projects.
          </p>

          <h3 className="text-xl font-semibold text-white">tsx</h3>
          <p className="text-gray-400">
            Enable TypeScript support. When enabled, components will be copied as .tsx files.
          </p>

          <h3 className="text-xl font-semibold text-white">tailwind</h3>
          <p className="text-gray-400">Configuration for Tailwind CSS.</p>
          <ul className="list-disc space-y-2 pl-6 text-gray-400">
            <li>
              <code className="rounded bg-[#1d1d1d] px-1.5 py-0.5">config</code> - Path to your Tailwind config file
            </li>
            <li>
              <code className="rounded bg-[#1d1d1d] px-1.5 py-0.5">css</code> - Path to your CSS file
            </li>
            <li>
              <code className="rounded bg-[#1d1d1d] px-1.5 py-0.5">baseColor</code> - Default color palette
            </li>
            <li>
              <code className="rounded bg-[#1d1d1d] px-1.5 py-0.5">cssVariables</code> - Enable CSS variables
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-white">aliases</h3>
          <p className="text-gray-400">Configure import aliases for components and utilities.</p>
          <ul className="list-disc space-y-2 pl-6 text-gray-400">
            <li>
              <code className="rounded bg-[#1d1d1d] px-1.5 py-0.5">components</code> - Alias for components directory
            </li>
            <li>
              <code className="rounded bg-[#1d1d1d] px-1.5 py-0.5">utils</code> - Alias for utilities
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  )
}