import { z } from 'zod';

// MongoDB User Schema
export const UserSchema = z.object({
  _id: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(), // hashed
  address1: z.string(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(), // encrypted
  dwollaCustomerId: z.string().optional(),
  dwollaCustomerUrl: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

// MongoDB Bank Schema
export const BankSchema = z.object({
  _id: z.string().optional(),
  userId: z.string(), // Reference to User._id
  accountId: z.string(),
  accessToken: z.string(), // encrypted
  fundingSourceUrl: z.string().optional(),
  name: z.string(),
  officialName: z.string(),
  type: z.string(),
  subtype: z.string(),
  sharableId: z.string(),
  mask: z.string(),
  currentBalance: z.number(),
  availableBalance: z.number(),
  institutionId: z.string(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

// MongoDB Transaction Schema
export const TransactionSchema = z.object({
  _id: z.string().optional(),
  userId: z.string(), // Reference to User._id
  bankId: z.string(), // Reference to Bank._id
  accountId: z.string(),
  amount: z.number(),
  name: z.string(),
  paymentChannel: z.string(),
  category: z.array(z.string()),
  subcategory: z.array(z.string()),
  type: z.string(),
  date: z.date(),
  image: z.string().optional(),
  senderBankId: z.string().optional(),
  receiverBankId: z.string().optional(),
  channel: z.string(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type User = z.infer<typeof UserSchema>;
export type Bank = z.infer<typeof BankSchema>;
export type Transaction = z.infer<typeof TransactionSchema>;
