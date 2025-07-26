import { Collection, Db, MongoClient } from 'mongodb';

let client: MongoClient;
let db: Db;

const mongoUri =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/yourbank';

export async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(mongoUri);
    await client.connect();
    db = client.db('yourbank');

    // Create indexes for performance
    await createIndexes();
  }
  return { client, db };
}

async function createIndexes() {
  try {
    // User indexes
    await db.collection('users').createIndex({ email: 1 }, { unique: true });

    // Bank indexes
    await db.collection('banks').createIndex({ userId: 1 });
    await db
      .collection('banks')
      .createIndex({ accountId: 1 }, { unique: true });
    await db.collection('banks').createIndex({ sharableId: 1 });

    // Transaction indexes
    await db.collection('transactions').createIndex({ userId: 1 });
    await db.collection('transactions').createIndex({ bankId: 1 });
    await db.collection('transactions').createIndex({ date: -1 });
    await db.collection('transactions').createIndex({ senderBankId: 1 });
    await db.collection('transactions').createIndex({ receiverBankId: 1 });
  } catch (error) {
    // Indexes might already exist, continue
  }
}

// MongoDB Schema definitions
export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
  dwollaCustomerId?: string;
  dwollaCustomerUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Bank {
  _id?: string;
  userId: string;
  accountId: string;
  accessToken: string;
  fundingSourceUrl?: string;
  name: string;
  officialName: string;
  type: string;
  subtype: string;
  sharableId: string;
  mask: string;
  currentBalance: number;
  availableBalance: number;
  institutionId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  _id?: string;
  userId: string;
  bankId: string;
  accountId: string;
  amount: number;
  name: string;
  paymentChannel: string;
  category: string[];
  subcategory: string[];
  type: string;
  date: Date;
  image?: string;
  senderBankId?: string;
  receiverBankId?: string;
  channel: string;
  createdAt: Date;
  updatedAt: Date;
}

// Collection helpers
export function getUsersCollection(): Collection<User> {
  return db.collection<User>('users');
}

export function getBanksCollection(): Collection<Bank> {
  return db.collection<Bank>('banks');
}

export function getTransactionsCollection(): Collection<Transaction> {
  return db.collection<Transaction>('transactions');
}
