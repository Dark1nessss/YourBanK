import { z } from 'zod';

const envSchema = z.object({
  // Next.js
  NEXT_PUBLIC_SITE_URL: z.string().url(),

  // MongoDB
  MONGODB_URI: z.string().url(),

  // Plaid
  PLAID_CLIENT_ID: z.string().min(1),
  PLAID_SECRET: z.string().min(1),
  PLAID_ENV: z.enum(['sandbox', 'development', 'production']),
  PLAID_PRODUCTS: z.string(),
  PLAID_COUNTRY_CODES: z.string(),

  // Dwolla
  DWOLLA_KEY: z.string().min(1),
  DWOLLA_SECRET: z.string().min(1),
  DWOLLA_BASE_URL: z.string().url(),
  DWOLLA_ENV: z.enum(['sandbox', 'production']),

  // JWT
  JWT_SECRET: z.string().min(32),
});

export const env = envSchema.parse(process.env);
