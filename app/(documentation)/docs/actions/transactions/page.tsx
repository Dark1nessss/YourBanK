'use client';

import { motion } from 'framer-motion';
import { CodeBlock } from '@/components/docs/code-block';
import { Card } from '@/components/ui/card';

export default function TransactionsPage() {
  return (
    <div className="space-y-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="font-ibm-plex-serif text-3xl font-bold text-white md:text-5xl">
          Transaction Actions
        </h1>
        <p className="text-lg text-gray-400">
          Server actions for managing financial transactions.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">
          createTransaction
        </h2>
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <p className="text-gray-400 mb-4">
            Creates a new transaction record in the database.
          </p>
          <CodeBlock
            code={`const newTransaction = await createTransaction({
  name: "Monthly Rent",
  amount: "1500.00",
  senderId: "user_123",
  senderBankId: "bank_456",
  receiverId: "user_789",
  receiverBankId: "bank_012",
  email: "landlord@example.com"
})

// Transaction is automatically categorized as 'Transfer'
// and channel is set to 'online'`}
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
          getTransactionsByBankId
        </h2>
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <p className="text-gray-400 mb-4">
            Retrieves all transactions for a specific bank account.
          </p>
          <CodeBlock
            code={`const { total, documents } = await getTransactionsByBankId({
  bankId: "bank_123"
})

// Returns both sent and received transactions
console.log(\`Total transactions: \${total}\`)
console.log('Transactions:', documents)`}
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
          Type Definitions
        </h2>
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <CodeBlock
            code={`interface CreateTransactionProps {
  name: string
  amount: string
  senderId: string
  senderBankId: string
  receiverId: string
  receiverBankId: string
  email: string
  channel?: string // Defaults to 'online'
  category?: string // Defaults to 'Transfer'
}

interface Transaction {
  $id: string
  name: string
  amount: string
  senderId: string
  senderBankId: string
  receiverId: string
  receiverBankId: string
  email: string
  channel: string
  category: string
  $createdAt: string
}

interface getTransactionsByBankIdProps {
  bankId: string
}`}
          />
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">
          Features
        </h2>
        <div className="grid gap-4">
          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">
              Bi-directional Querying
            </h3>
            <p className="text-gray-400">
              Retrieves both sent and received transactions for comprehensive
              transaction history.
            </p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">
              Automatic Categorization
            </h3>
            <p className="text-gray-400">
              Default categorization and channel assignment for new
              transactions.
            </p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">
              Appwrite Integration
            </h3>
            <p className="text-gray-400">
              Seamless integration with Appwrite database for transaction
              storage.
            </p>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
