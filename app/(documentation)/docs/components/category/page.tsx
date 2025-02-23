"use client"

import { motion } from "framer-motion"
import { CodeBlock } from "@/components/docs/code-block"
import { Card } from "@/components/ui/card"
import Category from "@/components/Category"

export default function CategoryPage() {
  const demoCategory = {
    name: "Shopping",
    count: 25,
    totalCount: 100,
  }

  return (
    <div className="space-y-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="font-ibm-plex-serif text-3xl font-bold text-white md:text-5xl">Category</h1>
        <p className="text-lg text-gray-400">
          A component for displaying transaction categories with visual indicators.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">Usage</h2>
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <div className="max-w-md mx-auto">
            <Category category={demoCategory} />
          </div>
        </Card>

        <CodeBlock
          code={`import { Category } from "@/components/bank/category"

export default function TransactionCategories() {
  const category = {
    name: "Shopping",
    count: 25,
    totalCount: 100,
  }

  return <Category category={category} />
}`}
          showLineNumbers
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">Props</h2>
        <div className="grid gap-4">
          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">category</h3>
            <p className="text-gray-400">The category object containing name, count, and total count.</p>
            <p className="text-sm text-gray-500 mt-1">
              Type: {"{"}name: string, count: number, totalCount: number{"}"}
            </p>
          </Card>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">Features</h2>
        <div className="grid gap-4">
          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">Progress Indicator</h3>
            <p className="text-gray-400">
              Visual progress bar showing the category&apos;s proportion of total transactions.
            </p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">Dynamic Styling</h3>
            <p className="text-gray-400">Category-specific colors and icons based on predefined styles.</p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">Responsive Design</h3>
            <p className="text-gray-400">Adapts to different screen sizes while maintaining visual hierarchy.</p>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}