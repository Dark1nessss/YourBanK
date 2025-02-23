"use client"

import { motion } from "framer-motion"
import { CodeBlock } from "@/components/docs/code-block"
import { Card } from "@/components/ui/card"
import Sidebar from "@/components/Sidebar"

export default function SidebarPage() {
    const mockUser = {
      $id: "1",
      userId: "user123",
      dwollaCustomerUrl: "https://api-sandbox.dwolla.com/customers/123",
      dwollaCustomerId: "123",
      name: "John Doe",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phoneNumber: "123-456-7890",
      address: "123 Main St",
      address1: "Apt 1",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      postalCode: "12345",
      country: "USA",
      dateOfBirth: "1990-01-01",
      ssn: "123-45-6789",
      transactions: [
        { id: "1", $id: "1", name: "Shopping", category: "Shopping", amount: 50, paymentChannel: "Online", date: "2023-01-01", status: "Completed", type: "expense", accountId: "acc1", pending: false, image: "image1.png", notes: "note1", $createdAt: "2023-01-01T00:00:00Z", channel: "Online", senderBankId: "bank1", receiverBankId: "bank2" },
        { id: "2", $id: "2", name: "Food", category: "Food", amount: 30, paymentChannel: "In-store", date: "2023-01-02", status: "Completed", type: "expense", accountId: "acc2", pending: false, image: "image2.png", notes: "note2", $createdAt: "2023-01-02T00:00:00Z", channel: "In-store", senderBankId: "bank1", receiverBankId: "bank2" },
      ],
      banks: [
        {
          $id: "1",
          id: "1",
          name: "Main Account",
          accountId: "acc1",
          bankId: "bank1",
          accessToken: "token123",
          fundingSourceUrl: "https://api-sandbox.dwolla.com/funding-sources/123",
          type: "checking",
          currentBalance: 5000,
          availableBalance: 4500,
          userId: "user123",
          shareableId: "shareable123",
          officialName: "Main Checking Account",
          mask: "1234",
          institutionId: "inst1",
          subtype: "subtype1",
          appwriteItemId: "item1",
        },
      ],
    }

  return (
    <div className="space-y-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="font-ibm-plex-serif text-3xl font-bold text-white md:text-5xl">Sidebar</h1>
        <p className="text-lg text-gray-400">Main navigation sidebar with user profile and bank links.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">Usage</h2>
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <div className="max-w-[280px] pointer-events-none">
            <Sidebar user={mockUser} />
          </div>
        </Card>

        <CodeBlock
          code={`import { Sidebar } from "@/components/bank/sidebar"

export default function DashboardLayout() {
  return (
    <div className="flex">
      <Sidebar user={user} />
      <main>{children}</main>
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
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">Props</h2>
        <div className="grid gap-4">
          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">user</h3>
            <p className="text-gray-400">User object containing profile information.</p>
            <p className="text-sm text-gray-500 mt-1">
              Type: {"{"}firstName: string, lastName: string, email: string{"}"}
            </p>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}