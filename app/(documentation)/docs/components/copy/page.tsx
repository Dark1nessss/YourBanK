'use client';

import Copy from '@/components/Copy';
import { CodeBlock } from '@/components/docs/code-block';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function CopyPage() {
  return (
    <div className="space-y-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="font-ibm-plex-serif text-3xl font-bold text-white md:text-5xl">
          Copy
        </h1>
        <p className="text-lg text-gray-400">
          A button component for copying text to clipboard with visual feedback.
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
          <div className="flex justify-center">
            <Copy title="Example text to copy" />
          </div>
        </Card>

        <CodeBlock
          code={`import { Copy } from "@/components/bank/copy"

export default function ShareableText() {
  return <Copy title="Text to copy" />
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
            <h3 className="font-semibold text-white mb-2">title</h3>
            <p className="text-gray-400">The text to be copied to clipboard.</p>
            <p className="text-sm text-gray-500 mt-1">Type: string</p>
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
            <h3 className="font-semibold text-white mb-2">Visual Feedback</h3>
            <p className="text-gray-400">
              Icon changes to a checkmark when text is copied, providing clear
              user feedback.
            </p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">Timeout Reset</h3>
            <p className="text-gray-400">
              Automatically resets to the copy icon after 2 seconds.
            </p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">
              Clipboard Integration
            </h3>
            <p className="text-gray-400">
              Uses the native Clipboard API for reliable text copying.
            </p>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
