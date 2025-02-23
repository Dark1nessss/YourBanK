"use client"

import { motion } from "framer-motion"
import { CodeBlock } from "@/components/docs/code-block"

export default function TypesPage() {
  return (
    <div className="space-y-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="font-ibm-plex-serif text-3xl font-bold text-white md:text-5xl">Types</h1>
        <p className="text-lg text-gray-400">TypeScript types and interfaces used throughout the YourBanK platform.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">Bank Types</h2>
        <p className="text-gray-400">Core types for bank accounts and transactions:</p>

        <CodeBlock
          code={`// Bank Account Types
export interface BankAccount {
  id: string
  appwriteItemId: string
  name: string
  mask: string
  institutionId: string
  currentBalance: number
  availableBalance: number
  type: AccountType
  subtype: AccountSubtype
  officialName?: string
  shareableId?: string
}

export type AccountType = 
  | "investment" 
  | "credit" 
  | "depository" 
  | "loan" 
  | "other"

export type AccountSubtype =
  | "checking"
  | "savings"
  | "credit card"
  | "money market"
  | "prepaid"
  | "personal"

// Transaction Types
export interface Transaction {
  id: string
  accountId: string
  amount: number
  date: string
  name: string
  merchantName?: string
  category: TransactionCategory
  type: TransactionType
  pending: boolean
  description?: string
}

export type TransactionCategory =
  | "Food and Drink"
  | "Travel"
  | "Shopping"
  | "Payment"
  | "Transfer"
  | "Bank Fees"

export type TransactionType = 
  | "debit" 
  | "credit"`}
          showLineNumbers
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">User Types</h2>
        <p className="text-gray-400">Types for user profiles and authentication:</p>

        <CodeBlock
          code={`export interface User {
  id: string
  email: string
  name: string
  imageUrl?: string
  preferences: UserPreferences
  createdAt: string
  updatedAt: string
}

export interface UserPreferences {
  theme: "light" | "dark" | "system"
  currency: string
  notifications: NotificationSettings
}

export interface NotificationSettings {
  email: boolean
  push: boolean
  transactions: boolean
  balances: boolean
  security: boolean
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
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">Component Props</h2>
        <p className="text-gray-400">Types for component props and configurations:</p>

        <CodeBlock
          code={`// AnimatedCounter Props
export interface AnimatedCounterProps {
  value: number
  duration?: number
  formatOptions?: Intl.NumberFormatOptions
  className?: string
}

// BankCard Props
export interface BankCardProps {
  account: BankAccount
  userName: string
  className?: string
  showBalance?: boolean
}

// TransactionTable Props
export interface TransactionTableProps {
  transactions: Transaction[]
  pageSize?: number
  sortable?: boolean
  filterable?: boolean
  onRowClick?: (transaction: Transaction) => void
}`}
          showLineNumbers
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">API Response Types</h2>
        <p className="text-gray-400">Types for API responses and error handling:</p>

        <CodeBlock
          code={`export interface ApiResponse<T> {
  data?: T
  error?: ApiError
  status: number
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, any>
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}`}
          showLineNumbers
        />
      </motion.div>
    </div>
  )
}