'use client';

import { CodeBlock } from '@/components/docs/code-block';
import PlaidLink from '@/components/PlaidLink';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function PlaidLinkPage() {
  const mockUser = {
    _id: '1',
    userId: 'user123',
    dwollaCustomerUrl: 'https://api.dwolla.com/customers/123',
    dwollaCustomerId: '123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    name: 'John Doe',
    address1: '123 Main St',
    address2: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    phone: '555-1234',
    postalCode: '10001',
    dateOfBirth: '1990-01-01',
    ssn: '123-45-6789',
    createdAt: new Date(),
    updatedAt: new Date(),
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
          PlaidLink
        </h1>
        <p className="text-lg text-gray-400">
          Component for connecting bank accounts using Plaid integration.
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
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-black mb-2">
                Primary Variant
              </h3>
              <PlaidLink user={mockUser} variant="primary" />
            </div>
          </div>
        </Card>

        <CodeBlock
          code={`import { PlaidLink } from "@/components/bank/plaid-link"

export default function ConnectBank() {
  return (
    <PlaidLink
      user={user}
      variant="primary" // or "ghost" | "add" | "default"
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
            <h3 className="font-semibold text-white mb-2">user</h3>
            <p className="text-gray-400">
              User object containing profile information.
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Type: {'{'}firstName: string; lastName: string; email: string{'}'}
            </p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">variant</h3>
            <p className="text-gray-400">Visual style variant of the button.</p>
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
            <h3 className="font-semibold text-white mb-2">Plaid Integration</h3>
            <p className="text-gray-400">
              Seamless integration with Plaid Link for secure bank account
              connections.
            </p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">Token Management</h3>
            <p className="text-gray-400">
              Automatic handling of link tokens and public token exchange.
            </p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">Visual Variants</h3>
            <p className="text-gray-400">
              Multiple button styles to fit different UI contexts.
            </p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">Client Navigation</h3>
            <p className="text-gray-400">
              Automatic redirection to dashboard after successful connection.
            </p>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
