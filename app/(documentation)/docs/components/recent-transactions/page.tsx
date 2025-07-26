'use client';
import React from 'react';

import { motion } from 'framer-motion';
import { CodeBlock } from '@/components/docs/code-block';
import { Card } from '@/components/ui/card';
import RecentTransactions from '@/components/RecentTransactions';

export default function RecentTransactionsPage() {
  const mockData = {
    accounts: [
      {
        id: '1',
        appwriteItemId: 'acc1',
        name: 'Main Account',
        currentBalance: 5000,
        availableBalance: 5000,
        officialName: 'Main Account',
        mask: '1234',
        institutionId: 'bank1',
        type: 'checking',
        subtype: 'personal',
        shareableId: 'shareable1',
      },
    ],
    transactions: [
      {
        id: '1',
        $id: '1',
        name: 'Coffee Shop',
        amount: 50,
        description: 'Coffee Shop',
        date: '2024-03-20',
        paymentChannel: 'in-store',
        type: 'debit',
        category: 'Food and Drink',
        pending: false,
        accountId: 'acc1',
        image: 'https://example.com/image.jpg',
        $createdAt: '2024-03-20T12:00:00Z',
        channel: 'transfer',
        account_id: 'acc1',
        transaction_id: 'txn1',
        iso_currency_code: 'USD',
        unofficial_currency_code: null,
        location: {
          address: '123 Coffee St',
          city: 'Coffee City',
          region: 'CA',
          postal_code: '12345',
          country: 'US',
          lat: 37.7749,
          lon: -122.4194,
        },
        payment_meta: {
          reference_number: '123456',
          ppd_id: '123456',
          payee: 'Coffee Shop',
          by_order_of: null,
          payer: null,
          payment_method: null,
          payment_processor: null,
          reason: null,
        },
        pending_transaction_id: null,
        merchant_name: 'Coffee Shop',
        check_number: null,
        transaction_code: null,
        senderBankId: 'bank1',
        receiverBankId: 'bank2',
      },
    ],
    appwriteItemId: 'acc1',
    page: 1,
  };

  return (
    <div className="space-y-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="font-ibm-plex-serif text-3xl font-bold text-white md:text-5xl">
          RecentTransactions
        </h1>
        <p className="text-lg text-gray-400">
          Component for displaying recent transactions with pagination.
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
        <Card className="p-6 bg-white border-gray-800 pointer-events-none">
          <RecentTransactions {...mockData} />
        </Card>

        <CodeBlock
          code={`import { RecentTransactions } from "@/components/bank/recent-transactions"

export default function TransactionsPage() {
  return (
    <RecentTransactions
      accounts={accounts}
      transactions={transactions}
      appwriteItemId={currentAccountId}
      page={currentPage}
    />
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
            <h3 className="font-semibold text-white mb-2">accounts</h3>
            <p className="text-gray-400">Array of bank account objects.</p>
            <p className="text-sm text-gray-500 mt-1">Type: Account[]</p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">transactions</h3>
            <p className="text-gray-400">Array of transaction objects.</p>
            <p className="text-sm text-gray-500 mt-1">Type: Transaction[]</p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">appwriteItemId</h3>
            <p className="text-gray-400">Current selected account ID.</p>
            <p className="text-sm text-gray-500 mt-1">Type: string</p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">page</h3>
            <p className="text-gray-400">Current page number for pagination.</p>
            <p className="text-sm text-gray-500 mt-1">Type: number</p>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
