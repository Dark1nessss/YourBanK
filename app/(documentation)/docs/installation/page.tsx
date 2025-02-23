"use client"

import { motion } from "framer-motion"
import { CopyButton } from "@/components/docs/copy-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function InstallationPage() {
  return (
    <div className="space-y-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="font-ibm-plex-serif text-3xl font-bold text-white md:text-5xl">Installation</h1>
        <p className="text-lg text-gray-400">How to install and set up YourBanK in your project.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4 w-full overflow-hidden"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">Framework Setup</h2>
        <p className="text-gray-400">
          YourBanK is built on top of Next.js. Run one of the following commands to create a new Next.js project:
        </p>

        <Tabs defaultValue="npm" className="relative mt-6 w-full">
          <TabsList className="w-full justify-start rounded-none border-b border-gray-800 bg-transparent p-0">
            <TabsTrigger
              value="npm"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-medium text-gray-400 shadow-none transition-all hover:text-gray-300 data-[state=active]:border-b-[#39A36A] data-[state=active]:text-white"
            >
              npm
            </TabsTrigger>
            <TabsTrigger
              value="pnpm"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-medium text-gray-400 shadow-none transition-all hover:text-gray-300 data-[state=active]:border-b-[#39A36A] data-[state=active]:text-white"
            >
              pnpm
            </TabsTrigger>
            <TabsTrigger
              value="yarn"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-medium text-gray-400 shadow-none transition-all hover:text-gray-300 data-[state=active]:border-b-[#39A36A] data-[state=active]:text-white"
            >
              yarn
            </TabsTrigger>
          </TabsList>
          <div className="relative mt-6">
            <TabsContent value="npm" className="relative">
              <div className="relative rounded-lg border border-gray-800 bg-zinc-950 [background:radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-950 via-zinc-950 to-zinc-950/90">
                <div className="absolute right-4 top-4 z-20">
                  <CopyButton
                    className="bg-zinc-900 hover:bg-zinc-800"
                    value="npx create-next-app@latest my-app --typescript --tailwind --eslint"
                  />
                </div>
                <pre className="mb-4 mt-6 overflow-x-auto p-4">
                  <code className="text-white">npx create-next-app@latest my-app --typescript --tailwind --eslint</code>
                </pre>
              </div>
            </TabsContent>
            <TabsContent value="pnpm">
              <div className="relative rounded-lg border border-gray-800 bg-zinc-950 [background:radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-950 via-zinc-950 to-zinc-950/90">
                <div className="absolute right-4 top-4 z-20">
                  <CopyButton
                    className="bg-zinc-900 hover:bg-zinc-800"
                    value="pnpm create next-app my-app --typescript --tailwind --eslint"
                  />
                </div>
                <pre className="mb-4 mt-6 overflow-x-auto p-4">
                  <code className="text-white">pnpm create next-app my-app --typescript --tailwind --eslint</code>
                </pre>
              </div>
            </TabsContent>
            <TabsContent value="yarn">
              <div className="relative rounded-lg border border-gray-800 bg-zinc-950 [background:radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-950 via-zinc-950 to-zinc-950/90">
                <div className="absolute right-4 top-4 z-20">
                  <CopyButton
                    className="bg-zinc-900 hover:bg-zinc-800"
                    value="yarn create next-app my-app --typescript --tailwind --eslint"
                  />
                </div>
                <pre className="mb-4 mt-6 overflow-x-auto p-4">
                  <code className="text-white">yarn create next-app my-app --typescript --tailwind --eslint</code>
                </pre>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">Install YourBanK</h2>
        <p className="text-gray-400">Install YourBanK and its dependencies:</p>

        <Tabs defaultValue="npm" className="relative mt-6 w-full">
          <TabsList className="w-full justify-start rounded-none border-b border-gray-800 bg-transparent p-0">
            <TabsTrigger
              value="npm"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-medium text-gray-400 shadow-none transition-all hover:text-gray-300 data-[state=active]:border-b-[#39A36A] data-[state=active]:text-white"
            >
              npm
            </TabsTrigger>
            <TabsTrigger
              value="pnpm"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-medium text-gray-400 shadow-none transition-all hover:text-gray-300 data-[state=active]:border-b-[#39A36A] data-[state=active]:text-white"
            >
              pnpm
            </TabsTrigger>
            <TabsTrigger
              value="yarn"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-medium text-gray-400 shadow-none transition-all hover:text-gray-300 data-[state=active]:border-b-[#39A36A] data-[state=active]:text-white"
            >
              yarn
            </TabsTrigger>
          </TabsList>
          <div className="relative mt-6">
            <TabsContent value="npm">
              <div className="relative rounded-lg border border-gray-800 bg-zinc-950 [background:radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-950 via-zinc-950 to-zinc-950/90">
                <div className="absolute right-4 top-4 z-20">
                  <CopyButton
                    className="bg-zinc-900 hover:bg-zinc-800"
                    value="npm  install  @hookform/resolvers@^3.3.4 
@radix-ui/react-dialog@^1.0.5  @radix-ui/react-label@^2.0.2 
@radix-ui/react-navigation-menu@^1.2.1 
@radix-ui/react-progress@^1.1.0  @radix-ui/react-select@^2.0.0 
@radix-ui/react-slot@^1.0.2  @radix-ui/react-tabs@^1.0.4 
@sentry/nextjs@^8.42.0  chart.js@^4.4.2 
class-variance-authority@^0.7.0  clsx@^2.1.1  dwolla-v2@^3.4.0 
framer-motion@^11.14.4  jsonwebtoken@^9.0.2  lucide-react@^0.374.0 
next@14.2.3 node-appwrite@^12.0.1 plaid@^23.0.0 query-string@^9.0.0 
react@^18 react-chartjs-2@^5.2.0 react-countup@^6.5.3 react-dom@^18 
react-hook-form@^7.51.3  react-plaid-link@^3.5.1 
tailwind-merge@^2.3.0 tailwindcss-animate@^1.0.7 zod@^3.23.4 "
                  />
                </div>
                <pre className="mb-4 mt-6 overflow-x-auto p-4">
                  <code className="text-white">npm install @hookform/resolvers@^3.3.4 
@radix-ui/react-dialog@^1.0.5  @radix-ui/react-label@^2.0.2 
@radix-ui/react-navigation-menu@^1.2.1 
@radix-ui/react-progress@^1.1.0  @radix-ui/react-select@^2.0.0 
@radix-ui/react-slot@^1.0.2  @radix-ui/react-tabs@^1.0.4 
@sentry/nextjs@^8.42.0  chart.js@^4.4.2 
class-variance-authority@^0.7.0  clsx@^2.1.1  dwolla-v2@^3.4.0 
framer-motion@^11.14.4  jsonwebtoken@^9.0.2  lucide-react@^0.374.0 
next@14.2.3 node-appwrite@^12.0.1 plaid@^23.0.0 query-string@^9.0.0 
react@^18 react-chartjs-2@^5.2.0 react-countup@^6.5.3 react-dom@^18 
react-hook-form@^7.51.3  react-plaid-link@^3.5.1 
tailwind-merge@^2.3.0 tailwindcss-animate@^1.0.7 zod@^3.23.4 </code>
                </pre>
              </div>
            </TabsContent>
            <TabsContent value="pnpm">
              <div className="relative rounded-lg border border-gray-800 bg-zinc-950 [background:radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-950 via-zinc-950 to-zinc-950/90">
                <div className="absolute right-4 top-4 z-20">
                  <CopyButton
                    className="bg-zinc-900 hover:bg-zinc-800"
                    value="pnpm  install  @hookform/resolvers@^3.3.4 
@radix-ui/react-dialog@^1.0.5  @radix-ui/react-label@^2.0.2 
@radix-ui/react-navigation-menu@^1.2.1 
@radix-ui/react-progress@^1.1.0  @radix-ui/react-select@^2.0.0 
@radix-ui/react-slot@^1.0.2  @radix-ui/react-tabs@^1.0.4 
@sentry/nextjs@^8.42.0  chart.js@^4.4.2 
class-variance-authority@^0.7.0  clsx@^2.1.1  dwolla-v2@^3.4.0 
framer-motion@^11.14.4  jsonwebtoken@^9.0.2  lucide-react@^0.374.0 
next@14.2.3 node-appwrite@^12.0.1 plaid@^23.0.0 query-string@^9.0.0 
react@^18 react-chartjs-2@^5.2.0 react-countup@^6.5.3 react-dom@^18 
react-hook-form@^7.51.3  react-plaid-link@^3.5.1 
tailwind-merge@^2.3.0 tailwindcss-animate@^1.0.7 zod@^3.23.4"
                  />
                </div>
                <pre className="mb-4 mt-6 overflow-x-auto p-4">
                  <code className="text-white">pnpm add @hookform/resolvers@^3.3.4 
@radix-ui/react-dialog@^1.0.5  @radix-ui/react-label@^2.0.2 
@radix-ui/react-navigation-menu@^1.2.1 
@radix-ui/react-progress@^1.1.0  @radix-ui/react-select@^2.0.0 
@radix-ui/react-slot@^1.0.2  @radix-ui/react-tabs@^1.0.4 
@sentry/nextjs@^8.42.0  chart.js@^4.4.2 
class-variance-authority@^0.7.0  clsx@^2.1.1  dwolla-v2@^3.4.0 
framer-motion@^11.14.4  jsonwebtoken@^9.0.2  lucide-react@^0.374.0 
next@14.2.3 node-appwrite@^12.0.1 plaid@^23.0.0 query-string@^9.0.0 
react@^18 react-chartjs-2@^5.2.0 react-countup@^6.5.3 react-dom@^18 
react-hook-form@^7.51.3  react-plaid-link@^3.5.1 
tailwind-merge@^2.3.0 tailwindcss-animate@^1.0.7 zod@^3.23.4 </code>
                </pre>
              </div>
            </TabsContent>
            <TabsContent value="yarn">
              <div className="relative rounded-lg border border-gray-800 bg-zinc-950 [background:radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-950 via-zinc-950 to-zinc-950/90">
                <div className="absolute right-4 top-4 z-20">
                  <CopyButton
                    className="bg-zinc-900 hover:bg-zinc-800"
                    value="yarn  install  @hookform/resolvers@^3.3.4 @radix-ui/react-dialog@^1.0.5  @radix-ui/react-label@^2.0.2 @radix-ui/react-navigation-menu@^1.2.1 
@radix-ui/react-progress@^1.1.0  @radix-ui/react-select@^2.0.0 
@radix-ui/react-slot@^1.0.2  @radix-ui/react-tabs@^1.0.4 
@sentry/nextjs@^8.42.0  chart.js@^4.4.2 
class-variance-authority@^0.7.0  clsx@^2.1.1  dwolla-v2@^3.4.0 
framer-motion@^11.14.4  jsonwebtoken@^9.0.2  lucide-react@^0.374.0 
next@14.2.3 node-appwrite@^12.0.1 plaid@^23.0.0 query-string@^9.0.0 
react@^18 react-chartjs-2@^5.2.0 react-countup@^6.5.3 react-dom@^18 
react-hook-form@^7.51.3  react-plaid-link@^3.5.1 tailwind-merge@^2.3.0 tailwindcss-animate@^1.0.7 zod@^3.23.4"
                  />
                </div>
                <pre className="mb-4 mt-6 overflow-x-auto p-4">
                  <code className="text-white">yarn add @hookform/resolvers@^3.3.4 
@radix-ui/react-dialog@^1.0.5  @radix-ui/react-label@^2.0.2 
@radix-ui/react-navigation-menu@^1.2.1 
@radix-ui/react-progress@^1.1.0  @radix-ui/react-select@^2.0.0 
@radix-ui/react-slot@^1.0.2  @radix-ui/react-tabs@^1.0.4 
@sentry/nextjs@^8.42.0  chart.js@^4.4.2 
class-variance-authority@^0.7.0  clsx@^2.1.1  dwolla-v2@^3.4.0 
framer-motion@^11.14.4  jsonwebtoken@^9.0.2  lucide-react@^0.374.0 
next@14.2.3 node-appwrite@^12.0.1 plaid@^23.0.0 query-string@^9.0.0 
react@^18 react-chartjs-2@^5.2.0 react-countup@^6.5.3 react-dom@^18 
react-hook-form@^7.51.3  react-plaid-link@^3.5.1 
tailwind-merge@^2.3.0 tailwindcss-animate@^1.0.7 zod@^3.23.4 </code>
                </pre>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">Environment Setup</h2>
        <p className="text-gray-400">
          Create a <code className="rounded bg-gray-800 px-1.5 py-0.5">.env.local</code> file in your project root and
          add your API keys:
        </p>
        <div className="relative rounded-lg border border-gray-800 bg-zinc-950 [background:radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-950 via-zinc-950 to-zinc-950/90">
          <div className="absolute right-4 top-4 z-20">
            <CopyButton
              className="bg-zinc-900 hover:bg-zinc-800"
              value={`#NEXT
NEXT_PUBLIC_SITE_URL=http://localhost:3000

#APPWRITE
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=next_pubic_appwrite_project_id
APPWRITE_DATABASE_ID=database_id
APPWRITE_USER_COLLECTION_ID=user_collection_id
APPWRITE_BANK_COLLECTION_ID=bank_collection_id
APPWRITE_TRANSACTION_COLLECTION_ID=transaction_collection_id
NEXT_APPWRITE_KEY=next_appwrite_key_here

#PLAID
PLAID_CLIENT_ID=plaid_id_here
PLAID_SECRET=plaid_secret_here
PLAID_ENV=sandbox
PLAID_PRODUCTS=auth,transactions,identity
PLAID_COUNTRY_CODES=US,CA

#DWOLLA
DWOLLA_KEY=dwolla_key_here
DWOLLA_SECRET=dwolla_secret_here
DWOLLA_BASE_URL=https://api-sandbox.dwolla.com
DWOLLA_ENV=sandbox

JWT_SECRET=your_jwt_secret_here`}
            />
          </div>
          <pre className="mb-4 mt-6 overflow-x-auto p-4">
            <code className="text-white">{`#NEXT
NEXT_PUBLIC_SITE_URL=http://localhost:3000

#APPWRITE
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=next_pubic_appwrite_project_id
APPWRITE_DATABASE_ID=database_id
APPWRITE_USER_COLLECTION_ID=user_collection_id
APPWRITE_BANK_COLLECTION_ID=bank_collection_id
APPWRITE_TRANSACTION_COLLECTION_ID=transaction_collection_id
NEXT_APPWRITE_KEY=next_appwrite_key_here

#PLAID
PLAID_CLIENT_ID=plaid_id_here
PLAID_SECRET=plaid_secret_here
PLAID_ENV=sandbox
PLAID_PRODUCTS=auth,transactions,identity
PLAID_COUNTRY_CODES=US,CA

#DWOLLA
DWOLLA_KEY=dwolla_key_here
DWOLLA_SECRET=dwolla_secret_here
DWOLLA_BASE_URL=https://api-sandbox.dwolla.com
DWOLLA_ENV=sandbox

JWT_SECRET=your_jwt_secret_here`}</code>
          </pre>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">Next Steps</h2>
        <p className="text-gray-400">
          Now that you have installed YourBanK, you can start using the components in your application. Check out the
          components section to learn more about available components and their usage.
        </p>
      </motion.div>
    </div>
  )
}