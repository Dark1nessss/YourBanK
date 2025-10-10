'use client';

import { CodeBlock } from '@/components/docs/code-block';
import TransactionsTable from '@/components/TransactionsTable';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function TransactionTablePage() {
  const mockTransactions = [
    {
      _id: '1',
      accountId: 'acc1',
      pending: false,
      image: 'image1.png',
      id: '1',
      name: 'Coffee Shop',
      amount: 5.75,
      type: 'debit' as const,
      date: '2024-03-20T10:30:00',
      paymentChannel: '',
      category: [],
      $createdAt: '',
      channel: '',
      senderBankId: '',
      receiverBankId: '',
      userId: 'user1',
      bankId: 'bank1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: '2',
      accountId: 'acc2',
      pending: false,
      image: 'image2.png',
      id: '2',
      name: 'Salary Deposit',
      amount: 2500.0,
      type: 'credit' as const,
      date: '2024-03-19T09:00:00',
      paymentChannel: 'transfer',
      category: ['Income'],
      $createdAt: '2024-03-19T08:00:00',
      channel: 'online',
      senderBankId: 'bank1',
      receiverBankId: 'bank2',
      userId: 'user2',
      bankId: 'bank2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return (
    <div className="space-y-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="font-ibm-plex-serif text-3xl font-bold text-white md:text-5xl">
          TransactionsTable
        </h1>
        <p className="text-lg text-gray-400">
          A feature-rich table component for displaying transaction data.
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
          <TransactionsTable transactions={mockTransactions} />
        </Card>

        <CodeBlock
          code={`import { TransactionsTable } from "@/components/bank/transactions-table"

export default function TransactionsPage() {
  const transactions = [
    {
      id: "1",
      name: "Coffee Shop",
      amount: 5.75,
      type: "debit", 
      date: "2024-03-20T10:30:00",
      paymentChannel: "in_store",
      category: "Food & Dining"
    }
  ]

  return <TransactionsTable transactions={transactions} />
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
            <h3 className="font-semibold text-white mb-2">transactions</h3>
            <p className="text-gray-400">
              Array of transaction objects to display in the table.
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Type: {'{'}id: string; name: string; amount: number; type?:
              string; date: string; paymentChannel?: string; category?: string
              {'}'}[]
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
            <h3 className="font-semibold text-white mb-2">Category Badges</h3>
            <p className="text-gray-400">
              Visual category indicators with custom colors and styling for
              different transaction types.
            </p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">Amount Formatting</h3>
            <p className="text-gray-400">
              Automatic currency formatting with color coding for debit and
              credit transactions.
            </p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">Responsive Design</h3>
            <p className="text-gray-400">
              Responsive layout with collapsible columns on mobile devices.
            </p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">Status Indicators</h3>
            <p className="text-gray-400">
              Visual status badges that automatically update based on
              transaction date.
            </p>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
