'use client';

import { motion } from 'framer-motion';
import { CodeBlock } from '@/components/docs/code-block';
import { Card } from '@/components/ui/card';

export default function DwollaActionsPage() {
  return (
    <div className="space-y-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="font-ibm-plex-serif text-3xl font-bold text-white md:text-5xl">
          Dwolla Actions
        </h1>
        <p className="text-lg text-gray-400">
          Server actions for Dwolla payment processing integration.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">
          createFundingSource
        </h2>
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <p className="text-gray-400 mb-4">
            Creates a Dwolla funding source using a Plaid processor token.
          </p>
          <CodeBlock
            code={`const fundingSourceUrl = await createFundingSource({
  customerId: "customer_123",
  fundingSourceName: "Checking Account",
  plaidToken: "processor_token"
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
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">
          createTransfer
        </h2>
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <p className="text-gray-400 mb-4">
            Initiates a transfer between two funding sources.
          </p>
          <CodeBlock
            code={`const transferUrl = await createTransfer({
  sourceFundingSourceUrl: "source_url",
  destinationFundingSourceUrl: "dest_url",
  amount: "50.00"
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
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">
          Type Definitions
        </h2>
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <CodeBlock
            code={`interface CreateFundingSourceOptions {
  customerId: string
  fundingSourceName: string
  plaidToken: string
  _links?: any
}

interface TransferParams {
  sourceFundingSourceUrl: string
  destinationFundingSourceUrl: string
  amount: string
}

interface AddFundingSourceParams {
  dwollaCustomerId: string
  processorToken: string
  bankName: string
}`}
          />
        </Card>
      </motion.div>
    </div>
  );
}
