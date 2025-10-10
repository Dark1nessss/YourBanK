'use client';

import { CodeBlock } from '@/components/docs/code-block';
import RightSidebar from '@/components/RightSidebar';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function RightSidebarPage() {
  const mockData = {
    user: {
      _id: '1',
      userId: 'user123',
      dwollaCustomerUrl: 'https://api-sandbox.dwolla.com/customers/123',
      dwollaCustomerId: '123',
      name: 'John Doe',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phoneNumber: '123-456-7890',
      address: '123 Main St',
      address1: 'Apt 1',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      postalCode: '12345',
      country: 'USA',
      dateOfBirth: '1990-01-01',
      ssn: '123-45-6789',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    transactions: [
      {
        id: '1',
        _id: '1',
        name: 'Shopping',
        category: ['Shopping'],
        amount: 50,
        paymentChannel: 'Online',
        date: new Date(),
        status: 'Completed',
        type: 'debit' as const,
        accountId: 'acc1',
        pending: false,
        image: 'image1.png',
        notes: 'note1',
        $createdAt: new Date().toISOString(),
        channel: 'Online',
        senderBankId: 'bank1',
        receiverBankId: 'bank2',
        userId: 'user123',
        bankId: 'bank1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        _id: '2',
        name: 'Food',
        category: ['Food'],
        amount: 30,
        paymentChannel: 'In-store',
        date: new Date(),
        status: 'Completed',
        type: 'credit' as const,
        accountId: 'acc2',
        pending: false,
        image: 'image2.png',
        notes: 'note2',
        $createdAt: new Date().toISOString(),
        channel: 'In-store',
        senderBankId: 'bank1',
        receiverBankId: 'bank2',
        userId: 'user123',
        bankId: 'bank1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    banks: [
      {
        _id: '1',
        id: '1',
        name: 'Main Account',
        accountId: 'acc1',
        bankId: 'bank1',
        accessToken: 'token123',
        fundingSourceUrl: 'https://api-sandbox.dwolla.com/funding-sources/123',
        type: 'checking',
        currentBalance: 5000,
        availableBalance: 4500,
        userId: 'user123',
        shareableId: 'shareable123',
        officialName: 'Main Checking Account',
        mask: '1234',
        institutionId: 'inst1',
        subtype: 'subtype1',
        appwriteItemId: 'item1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
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
          RightSidebar
        </h1>
        <p className="text-lg text-gray-400">
          Right sidebar component displaying user profile and bank cards.
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
          <div className="max-w-[320px] pointer-events-none">
            <RightSidebar {...mockData} />
          </div>
        </Card>

        <CodeBlock
          code={`import { RightSidebar } from "@/components/bank/right-sidebar"

export default function DashboardLayout() {
  return (
    <div className="flex">
      <main>{children}</main>
      <RightSidebar
        user={user}
        transactions={transactions}
        banks={banks}
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
            <h3 className="font-semibold text-white mb-2">user</h3>
            <p className="text-gray-400">
              User object containing profile information.
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Type: {'{'}firstName: string, lastName: string, email: string{'}'}
            </p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">transactions</h3>
            <p className="text-gray-400">Array of transaction objects.</p>
            <p className="text-sm text-gray-500 mt-1">Type: Transaction[]</p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">banks</h3>
            <p className="text-gray-400">Array of bank account objects.</p>
            <p className="text-sm text-gray-500 mt-1">Type: BankAccount[]</p>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
