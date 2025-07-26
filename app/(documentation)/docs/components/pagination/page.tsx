'use client';

import { motion } from 'framer-motion';
import { CodeBlock } from '@/components/docs/code-block';
import { Card } from '@/components/ui/card';
import { Pagination } from '@/components/Pagination';

export default function PaginationPage() {
  return (
    <div className="space-y-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="font-ibm-plex-serif text-3xl font-bold text-white md:text-5xl">
          Pagination
        </h1>
        <p className="text-lg text-gray-400">
          Navigation component for paginated content with URL integration.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">
          Usage
        </h2>
        <Card className="p-6 bg-white border-gray-800">
          <Pagination page={1} totalPages={5} />
        </Card>

        <CodeBlock
          code={`import { Pagination } from "@/components/bank/pagination"

export default function PaginatedContent() {
  return (
    <div>
      {/* Content */}
      <Pagination page={currentPage} totalPages={totalPages} />
    </div>
  )
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
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">
          Props
        </h2>
        <div className="grid gap-4">
          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">page</h3>
            <p className="text-gray-400">Current page number.</p>
            <p className="text-sm text-gray-500 mt-1">Type: number</p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">totalPages</h3>
            <p className="text-gray-400">Total number of pages available.</p>
            <p className="text-sm text-gray-500 mt-1">Type: number</p>
          </Card>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">
          Features
        </h2>
        <div className="grid gap-4">
          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">URL Integration</h3>
            <p className="text-gray-400">
              Automatically updates the URL with the current page number using
              search params.
            </p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">Boundary Handling</h3>
            <p className="text-gray-400">
              Disables navigation buttons when at the first or last page.
            </p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">Client Navigation</h3>
            <p className="text-gray-400">
              Uses client-side navigation to update content without full page
              reloads.
            </p>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
