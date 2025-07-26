'use client';

import { motion } from 'framer-motion';
import { CodeBlock } from '@/components/docs/code-block';
import { Card } from '@/components/ui/card';

export default function AppwritePage() {
  return (
    <div className="space-y-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="font-ibm-plex-serif text-3xl font-bold text-white md:text-5xl">
          Appwrite
        </h1>
        <p className="text-lg text-gray-400">
          Appwrite client configuration and utilities.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">
          createSessionClient
        </h2>
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <p className="text-gray-400 mb-4">
            Creates an Appwrite client with user session.
          </p>
          <CodeBlock
            code={`const { account } = await createSessionClient()

// Use the client
const user = await account.get()`}
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
          createAdminClient
        </h2>
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <p className="text-gray-400 mb-4">
            Creates an Appwrite client with admin privileges.
          </p>
          <CodeBlock
            code={`const { account, database, user } = await createAdminClient()

// Use the client
const users = await database.listDocuments(
  DATABASE_ID,
  USER_COLLECTION_ID
)`}
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
            code={`NEXT_PUBLIC_APPWRITE_ENDPOINT=
NEXT_PUBLIC_APPWRITE_PROJECT=
NEXT_APPWRITE_KEY=
APPWRITE_DATABASE_ID=
APPWRITE_USER_COLLECTION_ID=
APPWRITE_BANK_COLLECTION_ID=
APPWRITE_TRANSACTION_COLLECTION_ID=`}
          />
        </Card>
      </motion.div>
    </div>
  );
}
