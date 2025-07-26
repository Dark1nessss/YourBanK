'use client';

import { motion } from 'framer-motion';
import { CodeBlock } from '@/components/docs/code-block';
import { Card } from '@/components/ui/card';

export default function PlaidPage() {
  return (
    <div className="space-y-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="font-ibm-plex-serif text-3xl font-bold text-white md:text-5xl">
          Plaid
        </h1>
        <p className="text-lg text-gray-400">
          Plaid API client configuration and integration utilities.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">
          Configuration
        </h2>
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <p className="text-gray-400 mb-4">
            Initialize the Plaid client with your API credentials.
          </p>
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
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">
          Usage
        </h2>
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <p className="text-gray-400 mb-4">Common Plaid API operations.</p>
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
})

// Create processor token for Dwolla
const processorTokenResponse = await plaidClient.processorTokenCreate({
  access_token: accessToken,
  account_id: accountId,
  processor: "dwolla"
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
          Environment Variables
        </h2>
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <CodeBlock
            code={`PLAID_CLIENT_ID=your_client_id
PLAID_SECRET=your_secret_key
PLAID_ENV=sandbox  # or development, production`}
          />
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">
          Features
        </h2>
        <div className="grid gap-4">
          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">Type Safety</h3>
            <p className="text-gray-400">
              Full TypeScript support for all Plaid API operations.
            </p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">
              Environment Support
            </h3>
            <p className="text-gray-400">
              Support for sandbox, development, and production environments.
            </p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">
              Dwolla Integration
            </h3>
            <p className="text-gray-400">
              Built-in support for creating Dwolla processor tokens.
            </p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">Error Handling</h3>
            <p className="text-gray-400">
              Comprehensive error handling for all API operations.
            </p>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
