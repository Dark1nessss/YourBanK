'use client';

import { CodeBlock } from '@/components/docs/code-block';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function FooterPage() {
  const mockUser = {
    _id: '1',
    userId: 'user_123',
    dwollaCustomerUrl: 'https://api.dwolla.com/customers/123',
    dwollaCustomerId: '123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    name: 'John Doe',
    address1: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
    country: 'USA',
    phone: '555-555-5555',
    postalCode: '12345',
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
          Footer
        </h1>
        <p className="text-lg text-gray-400">
          Footer component with user profile and logout functionality.
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
          <div className="max-w-md pointer-events-none">
            <Footer user={mockUser} />
          </div>
        </Card>

        <CodeBlock
          code={`import { Footer } from "@/components/Footer"

export default function Layout() {
  return (
    <div>
      <main>{children}</main>
      <Footer user={user} type="desktop" />
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
            <h3 className="font-semibold text-white mb-2">type</h3>
            <p className="text-gray-400">Footer display type.</p>
            <p className="text-sm text-gray-500 mt-1">
              Type: &quot;desktop&quot; | &ldquo;mobile&quot;
            </p>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
