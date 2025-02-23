"use client"

import { motion } from "framer-motion"
import { CodeBlock } from "@/components/docs/code-block"
import { Card } from "@/components/ui/card"

export default function BankActionsPage() {
  return (
    <div className="space-y-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="font-ibm-plex-serif text-3xl font-bold text-white md:text-5xl">Bank Actions</h1>
        <p className="text-lg text-gray-400">Server actions for managing bank accounts and transactions.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">getAccounts</h2>
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <p className="text-gray-400 mb-4">Retrieves all bank accounts for a user.</p>
          <CodeBlock
            code={`const { data, totalBanks, totalCurrentBalance } = await getAccounts({ 
  userId: "user_123" 
})`}
          />
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">getAccount</h2>
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <p className="text-gray-400 mb-4">Retrieves details for a specific bank account.</p>
          <CodeBlock
            code={`const { data, transactions } = await getAccount({
  appwriteItemId: "item_123"
})`}
          />
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">getTransactions</h2>
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <p className="text-gray-400 mb-4">Retrieves transactions for a bank account.</p>
          <CodeBlock
            code={`const transactions = await getTransactions({
  accessToken: "access_token_123"
})`}
          />
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">Type Definitions</h2>
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <CodeBlock
            code={`interface Account {
  id: string
  availableBalance: number
  currentBalance: number
  institutionId: string
  name: string
  officialName?: string
  mask: string
  type: string
  subtype: string
  appwriteItemId: string
  shareableId?: string
}

interface Transaction {
  id: string
  name: string
  paymentChannel: string
  type: string
  accountId: string
  amount: number
  pending: boolean
  category: string
  date: string
  image?: string
}`}
          />
        </Card>
      </motion.div>
    </div>
  )
}