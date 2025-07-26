'use client';

import { motion } from 'framer-motion';
import { CodeBlock } from '@/components/docs/code-block';

export default function ConstantsPage() {
  return (
    <div className="space-y-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="font-ibm-plex-serif text-3xl font-bold text-white md:text-5xl">
          Constants.ts
        </h1>
        <p className="text-lg text-gray-400">
          Application-wide constants and configuration values.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4 w-full overflow-hidden"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">
          Configuration
        </h2>
        <p className="text-gray-400">
          The constants file contains shared values used throughout the
          application, including API endpoints, navigation items, and
          configuration settings.
        </p>

        <CodeBlock
          code={`// API Endpoints
export const API_ENDPOINTS = {
  BANK: '/api/bank',
  TRANSACTIONS: '/api/transactions',
  USER: '/api/user',
  PLAID: '/api/plaid',
  DWOLLA: '/api/dwolla',
} as const

// Navigation
export const NAV_ITEMS = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: 'Home',
  },
  {
    title: 'Transactions',
    path: '/transactions',
    icon: 'Receipt',
  },
  // ...more items
] as const

// Chart Colors
export const CHART_COLORS = {
  primary: '#39A36A',
  secondary: '#2970FF',
  accent: '#F59E0B',
  // ...more colors
} as const

// Transaction Categories
export const TRANSACTION_CATEGORIES = [
  'Food & Dining',
  'Shopping',
  'Transportation',
  'Bills & Utilities',
  // ...more categories
] as const`}
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
          Usage
        </h2>
        <p className="text-gray-400">
          Import and use constants in your components:
        </p>

        <CodeBlock
          code={`import { API_ENDPOINTS, CHART_COLORS } from '@/constants'

// Using API endpoints
const response = await fetch(API_ENDPOINTS.TRANSACTIONS)

// Using chart colors
const chartConfig = {
  backgroundColor: [
    CHART_COLORS.primary,
    CHART_COLORS.secondary,
    CHART_COLORS.accent,
  ]
}`}
          showLineNumbers
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">
          Benefits
        </h2>
        <ul className="list-disc space-y-2 pl-6 text-gray-400">
          <li>Centralized configuration management</li>
          <li>Type safety with TypeScript</li>
          <li>Easy updates and maintenance</li>
          <li>Consistent values across components</li>
          <li>Better code organization</li>
        </ul>
      </motion.div>
    </div>
  );
}
