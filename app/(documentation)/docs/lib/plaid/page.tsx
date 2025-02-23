"use client"

import { motion } from "framer-motion"
import { CodeBlock } from "@/components/docs/code-block"
import { Card } from "@/components/ui/card"

export default function PlaidPage() {
  return (
    <div className="space-y-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="font-ibm-plex-serif text-3xl font-bold text-white md:text-5xl">Plaid</h1>
        <p className="text-lg text-gray-400">Plaid API client configuration and utilities.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">Configuration</h2>
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <p className="text-gray-400 mb-4">Plaid client configuration setup.</p>
          <CodeBlock
            code={`import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid'

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    }
  }
})

export const plaidClient = new PlaidApi(configuration)`}
          />
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">Usage</h2>
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <p className="text-gray-400 mb-4">Example usage of the Plaid client.</p>
          <CodeBlock
            code={`// Create a link token
const response = await plaidClient.linkTokenCreate({
  user: { client_user_id: 'user_123' },
  client_name: 'YourBanK',
  products: ['auth', 'transactions'],
  language: 'en',
  country_codes: ['US'],
})

// Exchange public token
const exchangeResponse = await plaidClient.itemPublicTokenExchange({
  public_token: publicToken,
})

// Get accounts
const accountsResponse = await plaidClient.accountsGet({
  access_token: accessToken,
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
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">Environment Variables</h2>
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <CodeBlock
            code={`PLAID_CLIENT_ID=
PLAID_SECRET=
PLAID_ENV=sandbox`}
          />
        </Card>
      </motion.div>
    </div>
  )
}