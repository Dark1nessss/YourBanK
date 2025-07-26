'use client';

import { motion } from 'framer-motion';
import { CodeBlock } from '@/components/docs/code-block';
import { Card } from '@/components/ui/card';

export default function UtilsPage() {
  return (
    <div className="space-y-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="font-ibm-plex-serif text-3xl font-bold text-white md:text-5xl">
          Utils
        </h1>
        <p className="text-lg text-gray-400">
          Utility functions for common operations.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">
          Formatting
        </h2>
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <p className="text-gray-400 mb-4">
            Date and currency formatting utilities.
          </p>
          <CodeBlock
            code={`// Format date and time
const { dateTime, dateDay, dateOnly, timeOnly } = formatDateTime(new Date())

// Format currency amount
const formattedAmount = formatAmount(1234.56) // "$1,234.56"`}
          />
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">
          URL Handling
        </h2>
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <p className="text-gray-400 mb-4">
            URL query parameter manipulation.
          </p>
          <CodeBlock
            code={`const newUrl = formUrlQuery({
  params: "page=1&sort=desc",
  key: "filter",
  value: "active"
}) // Returns URL with updated query params`}
          />
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">
          Data Processing
        </h2>
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <p className="text-gray-400 mb-4">
            Functions for processing and transforming data.
          </p>
          <CodeBlock
            code={`// Parse and stringify objects
const parsed = parseStringify(value)

// Remove special characters
const clean = removeSpecialCharacters("Hello! @World")

// Count transaction categories
const categories = countTransactionCategories(transactions)

// Encrypt/Decrypt IDs
const encrypted = encryptId("123")
const decrypted = decryptId(encrypted)`}
          />
        </Card>
      </motion.div>
    </div>
  );
}
