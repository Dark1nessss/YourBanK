'use client';

import { motion } from 'framer-motion';
import { CodeBlock } from '@/components/docs/code-block';
import { Card } from '@/components/ui/card';
import { BankTabItem } from '@/components/BankTabItem';

export default function BankTabItemPage() {
  const demoAccount = {
    id: 'demo-1',
    appwriteItemId: 'demo-1',
    name: 'Main Checking',
    mask: '4567',
    institutionId: 'chase',
    currentBalance: 12345.67,
    availableBalance: 12345.67,
    type: 'depository' as const,
    subtype: 'checking' as const,
    officialName: 'Chase Total Checking',
    shareableId: 'shareable-demo-1',
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
          BankTabItem
        </h1>
        <p className="text-lg text-gray-400">
          A tab item component for displaying bank account information in a
          tabbed interface.
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
          <div className="max-w-md mx-auto">
            <BankTabItem
              key={demoAccount.id}
              account={demoAccount}
              appwriteItemId={demoAccount.appwriteItemId}
            />
          </div>
        </Card>

        <CodeBlock
          code={`import { BankTabItem } from "@/components/bank/bank-tab-item"

export default function AccountTabs() {
  const account = {
    id: "acc-1",
    name: "Main Checking",
    mask: "4567",
    currentBalance: 12345.67,
    type: "depository",
    subtype: "checking",
  }

  return (
    <BankTabItem
      account={account}
      isSelected={true}
      onClick={() => console.log("Tab clicked")}
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
            <h3 className="font-semibold text-white mb-2">isSelected</h3>
            <p className="text-gray-400">
              Whether the tab item is currently selected.
            </p>
            <p className="text-sm text-gray-500 mt-1">Type: boolean</p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">onClick</h3>
            <p className="text-gray-400">
              Callback function called when the tab item is clicked.
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Type: () {'->'} void (optional)
            </p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">className</h3>
            <p className="text-gray-400">
              Additional CSS classes to apply to the tab item.
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
            <h3 className="font-semibold text-white mb-2">
              Interactive States
            </h3>
            <p className="text-gray-400">
              Smooth hover and tap animations provide visual feedback for user
              interactions.
            </p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">
              Selection Indicator
            </h3>
            <p className="text-gray-400">
              A highlighted border and background color clearly indicate the
              selected state.
            </p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">Responsive Layout</h3>
            <p className="text-gray-400">
              The tab item adjusts its layout to maintain readability across
              different screen sizes.
            </p>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
