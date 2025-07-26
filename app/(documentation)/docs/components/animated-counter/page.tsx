'use client';

import { motion } from 'framer-motion';
import { CodeBlock } from '@/components/docs/code-block';
import { Card } from '@/components/ui/card';
import AnimatedCounter from '@/components/AnimatedCounter';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function AnimatedCounterPage() {
  const [value, setValue] = useState(1234.56);

  return (
    <div className="space-y-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="font-ibm-plex-serif text-3xl font-bold text-white md:text-5xl">
          AnimatedCounter
        </h1>
        <p className="text-lg text-gray-400">
          A smooth animated counter component for displaying numerical values.
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
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <div className="space-y-4">
            <div className="text-3xl font-bold text-white">
              <AnimatedCounter amount={value} />
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => setValue(prev => prev + 100)}
                className="bg-[#39A36A] hover:bg-[#2E8754]"
              >
                Add $100
              </Button>
              <Button
                onClick={() => setValue(prev => prev - 100)}
                variant="outline"
                className="text-white hover:bg-white/10"
              >
                Subtract $100
              </Button>
            </div>
          </div>
        </Card>

        <CodeBlock
          code={`import { AnimatedCounter } from "@/components/ui/animated-counter"

export default function Example() {
  const [value, setValue] = useState(1234.56)

  return (
    <div className="text-3xl font-bold">
      <AnimatedCounter
        value={value}
        formatOptions={{
          style: "currency",
          currency: "USD"
        }}
      />
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
            <h3 className="font-semibold text-white mb-2">value</h3>
            <p className="text-gray-400">
              The numerical value to display and animate.
            </p>
            <p className="text-sm text-gray-500 mt-1">Type: number</p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">formatOptions</h3>
            <p className="text-gray-400">
              Options for number formatting using Intl.NumberFormat.
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Type: Intl.NumberFormatOptions (optional)
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
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">
          Features
        </h2>
        <div className="grid gap-4">
          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">Smooth Animation</h3>
            <p className="text-gray-400">
              Uses Framer Motion spring animations for smooth, natural-feeling
              transitions between values.
            </p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">
              Intersection Observer
            </h3>
            <p className="text-gray-400">
              Animation starts when the counter comes into view, improving
              performance and user experience.
            </p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">
              Flexible Formatting
            </h3>
            <p className="text-gray-400">
              Supports all Intl.NumberFormat options for formatting currencies,
              percentages, and more.
            </p>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
