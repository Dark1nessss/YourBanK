"use client"

import { motion } from "framer-motion"
import { CodeBlock } from "@/components/docs/code-block"
import { Card } from "@/components/ui/card"
import DoughnutChart from "@/components/DoughnutChart"

export default function DoughnutChartPage() {
  type Account = {
    id: string;
    name: string;
    currentBalance: number;
    availableBalance: number;
    officialName: string;
    mask: string;
    type: string;
    subtype: string;
    institutionId: string;
    currency: string;
    appwriteItemId: string;
    shareableId: string;
  };

  const demoAccounts: Account[] = [
    { id: "1", name: "Checking", currentBalance: 5000, availableBalance: 5000, officialName: "Checking Account", mask: "1234", type: "depository", subtype: "checking", institutionId: "bank_1", currency: "USD", appwriteItemId: "item_1", shareableId: "share_1" },
    { id: "2", name: "Savings", currentBalance: 10000, availableBalance: 10000, officialName: "Savings Account", mask: "5678", type: "depository", subtype: "savings", institutionId: "bank_2", currency: "USD", appwriteItemId: "item_2", shareableId: "share_2" },
    { id: "3", name: "Investment", currentBalance: 15000, availableBalance: 15000, officialName: "Investment Account", mask: "9012", type: "investment", subtype: "brokerage", institutionId: "bank_3", currency: "USD", appwriteItemId: "item_3", shareableId: "share_3" }
  ];

  return (
    <div className="space-y-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="font-ibm-plex-serif text-3xl font-bold text-white md:text-5xl">DoughnutChart</h1>
        <p className="text-lg text-gray-400">A doughnut chart component for visualizing account balances.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">Usage</h2>
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <div className="max-w-md mx-auto">
            <DoughnutChart accounts={demoAccounts} />
          </div>
        </Card>

        <CodeBlock
          code={`import { DoughnutChart } from "@/components/bank/doughnut-chart"

export default function AccountBalances() {
  const accounts = [
    { name: "Checking", currentBalance: 5000 },
    { name: "Savings", currentBalance: 10000 },
    { name: "Investment", currentBalance: 15000 },
  ]

  return <DoughnutChart accounts={accounts} />
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
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">Props</h2>
        <div className="grid gap-4">
          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">accounts</h3>
            <p className="text-gray-400">Array of account objects with name and balance information.</p>
            <p className="text-sm text-gray-500 mt-1">
              Type: Array{"{<"}
              {"{"} name: string, currentBalance: number {"}"}
              {">"}
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
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">Features</h2>
        <div className="grid gap-4">
          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">Consistent Colors</h3>
            <p className="text-gray-400">Uses a predefined set of green shades for consistent branding.</p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">Customizable Layout</h3>
            <p className="text-gray-400">Configurable cutout percentage and legend display options.</p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">Interactive</h3>
            <p className="text-gray-400">Built-in tooltips and hover effects for better data exploration.</p>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}