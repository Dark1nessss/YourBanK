'use client';

import { motion } from 'framer-motion';
import { CodeBlock } from '@/components/docs/code-block';
import { Card } from '@/components/ui/card';
import BankCard from '@/components/BankCard';
import { demoCards } from '@/constants';

export default function BankCardPage() {
  return (
    <div className="space-y-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="font-ibm-plex-serif text-3xl font-bold text-white md:text-5xl">
          BankCard
        </h1>
        <p className="text-lg text-gray-400">
          A card component for displaying bank account information and balances.
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
          <div className="max-w-md mx-auto pointer-events-none">
            <BankCard
              account={demoCards[0].account}
              userName={demoCards[0].userName}
              showBalance={false}
            />
          </div>
        </Card>

        <CodeBlock
          code={`import { BankCard } from "@/components/bank/bank-card"

export default function AccountPage() {
  const account = {
    id: "acc-1",
    name: "Main Checking",
    mask: "4567",
    institutionId: "chase",
    currentBalance: 12345.67,
    availableBalance: 12345.67,
    type: "depository",
    subtype: "checking",
    officialName: "Chase Total Checking",
  }

  return (
    <BankCard
      account={account}
      userName="John Doe"
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
            <h3 className="font-semibold text-white mb-2">account</h3>
            <p className="text-gray-400">
              The bank account object containing account details.
            </p>
            <p className="text-sm text-gray-500 mt-1">Type: BankAccount</p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">userName</h3>
            <p className="text-gray-400">The name of the account holder.</p>
            <p className="text-sm text-gray-500 mt-1">Type: string</p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">showBalance</h3>
            <p className="text-gray-400">
              Whether to show the account balance initially.
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Type: boolean (optional, defaults to true)
            </p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">className</h3>
            <p className="text-gray-400">
              Additional CSS classes to apply to the card.
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Type: string (optional)
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
            <h3 className="font-semibold text-white mb-2">Balance Toggle</h3>
            <p className="text-gray-400">
              Users can show/hide the balance amount by clicking the eye icon,
              enhancing privacy when needed.
            </p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">Responsive Design</h3>
            <p className="text-gray-400">
              The card adapts to different screen sizes while maintaining
              readability and visual appeal.
            </p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">
              Animated Transitions
            </h3>
            <p className="text-gray-400">
              Smooth animations when the card mounts and when toggling the
              balance visibility.
            </p>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
