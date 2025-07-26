'use client';

import { CodeBlock } from '@/components/docs/code-block';
import PaymentTransferForm from '@/components/PaymentTransferForm';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function PaymentTransferFormPage() {
  const mockAccounts = [
    {
      id: '1',
      name: 'Main Account',
      accountNumber: '****1234',
      type: 'checking',
      availableBalance: 1000,
      currentBalance: 1200,
      officialName: 'Main Account',
      mask: '1234',
      institution: 'YourBank',
      subtype: 'personal',
      verificationStatus: 'verified',
      institutionId: 'inst_123',
      appwriteItemId: 'appwrite_123',
      shareableId: 'shareable_123',
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
          Payment Transfer Form
        </h1>
        <p className="text-lg text-gray-400">
          Form component for initiating bank transfers with validation.
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
          <PaymentTransferForm accounts={mockAccounts} />
        </Card>

        <CodeBlock
          code={`import { PaymentTransferForm } from "@/components/bank/payment-transfer-form"

export default function TransferPage() {
  return <PaymentTransferForm accounts={accounts} />
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
            <p className="text-gray-400">
              Array of bank accounts available for transfers.
            </p>
            <p className="text-sm text-gray-500 mt-1">Type: Account[]</p>
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
            <h3 className="font-semibold text-white mb-2">Form Validation</h3>
            <p className="text-gray-400">
              Comprehensive form validation using Zod schema validation.
            </p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">Loading States</h3>
            <p className="text-gray-400">
              Visual loading states during form submission with animated
              indicators.
            </p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">Bank Integration</h3>
            <p className="text-gray-400">
              Integration with Dwolla for processing bank transfers.
            </p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">
              Transaction Creation
            </h3>
            <p className="text-gray-400">
              Automatically creates transaction records for successful
              transfers.
            </p>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
