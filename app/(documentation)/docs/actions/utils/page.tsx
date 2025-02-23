"use client"

import { motion } from "framer-motion"
import { CodeBlock } from "@/components/docs/code-block"
import { Card } from "@/components/ui/card"

export default function UtilsPage() {
  return (
    <div className="space-y-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="font-ibm-plex-serif text-3xl font-bold text-white md:text-5xl">Utils</h1>
        <p className="text-lg text-gray-400">Utility functions for common operations and data formatting.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">Date Formatting</h2>
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <p className="text-gray-400 mb-4">Format dates in various styles.</p>
          <CodeBlock
            code={`const { dateTime, dateDay, dateOnly, timeOnly } = formatDateTime(new Date())

// Results:
// dateTime: "Mon, Oct 25, 8:30 AM"
// dateDay: "Mon, 10/25/2023"
// dateOnly: "Oct 25, 2023"
// timeOnly: "8:30 AM"`}
          />
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">Currency Formatting</h2>
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <p className="text-gray-400 mb-4">Format numbers as currency.</p>
          <CodeBlock
            code={`const amount = formatAmount(1234.56)
// Result: "$1,234.56"

const amount2 = formatAmount(1000000)
// Result: "$1,000,000.00"`}
          />
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">Data Processing</h2>
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <p className="text-gray-400 mb-4">Functions for processing and transforming data.</p>
          <CodeBlock
            code={`// Parse and stringify objects
const parsed = parseStringify(value)

// Remove special characters
const clean = removeSpecialCharacters("Hello! @World")
// Result: "Hello World"

// Count transaction categories
const categories = countTransactionCategories(transactions)
// Returns sorted array of categories with counts

// Encrypt/Decrypt IDs
const encrypted = encryptId("123")
const decrypted = decryptId(encrypted)`}
          />
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">URL Handling</h2>
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <p className="text-gray-400 mb-4">URL manipulation and query parameter handling.</p>
          <CodeBlock
            code={`// Update URL query parameters
const newUrl = formUrlQuery({
  params: "page=1&sort=desc",
  key: "filter",
  value: "active"
})

// Extract customer ID from URL
const customerId = extractCustomerIdFromUrl("https://api.example.com/customers/123")
// Result: "123"`}
          />
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">Features</h2>
        <div className="grid gap-4">
          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">Type Safety</h3>
            <p className="text-gray-400">Full TypeScript support with proper type definitions.</p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">Internationalization</h3>
            <p className="text-gray-400">Uses Intl API for consistent formatting across locales.</p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">Data Processing</h3>
            <p className="text-gray-400">Efficient utilities for processing and transforming data structures.</p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">URL Manipulation</h3>
            <p className="text-gray-400">Comprehensive URL and query parameter handling functions.</p>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}