import { Db, MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  maxIdleTimeMS: 30000,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

let db: Db;
const dbName = 'yourbank';

export async function connectToDatabase() {
  try {
    const client = await clientPromise;
    if (!db) {
      db = client.db(dbName);
      // Create indexes for performance
      await createIndexes();
    }
    return { client, db };
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

async function createIndexes() {
  try {
    const collections = await db.listCollections().toArray();
    const existingCollections = collections.map(col => col.name);

    // Check and create users collection indexes
    if (!existingCollections.includes('users')) {
      await db.createCollection('users');
    }

    const userIndexes = await db.collection('users').listIndexes().toArray();
    const userIndexNames = userIndexes.map(idx => idx.name);

    if (!userIndexNames.includes('email_1')) {
      await db.collection('users').createIndex({ email: 1 }, { unique: true });
    }

    // Check and create banks collection indexes
    if (!existingCollections.includes('banks')) {
      await db.createCollection('banks');
    }

    const bankIndexes = await db.collection('banks').listIndexes().toArray();
    const bankIndexNames = bankIndexes.map(idx => idx.name);

    if (!bankIndexNames.includes('userId_1')) {
      await db.collection('banks').createIndex({ userId: 1 });
    }

    // Check if accountId index exists and what type it is
    const accountIdIndex = bankIndexes.find(idx => idx.name === 'accountId_1');
    if (!accountIdIndex) {
      // Create unique index if it doesn't exist
      await db
        .collection('banks')
        .createIndex({ accountId: 1 }, { unique: true });
    }

    if (!bankIndexNames.includes('shareableId_1')) {
      await db.collection('banks').createIndex({ shareableId: 1 });
    }

    // Check and create transactions collection indexes
    if (!existingCollections.includes('transactions')) {
      await db.createCollection('transactions');
    }

    const transactionIndexes = await db
      .collection('transactions')
      .listIndexes()
      .toArray();
    const transactionIndexNames = transactionIndexes.map(idx => idx.name);

    if (!transactionIndexNames.includes('userId_1_transactions')) {
      await db
        .collection('transactions')
        .createIndex({ userId: 1 }, { name: 'userId_1_transactions' });
    }

    if (!transactionIndexNames.includes('bankId_1')) {
      await db.collection('transactions').createIndex({ bankId: 1 });
    }

    if (!transactionIndexNames.includes('senderBankId_1')) {
      await db.collection('transactions').createIndex({ senderBankId: 1 });
    }

    if (!transactionIndexNames.includes('receiverBankId_1')) {
      await db.collection('transactions').createIndex({ receiverBankId: 1 });
    }

    if (!transactionIndexNames.includes('createdAt_-1')) {
      await db.collection('transactions').createIndex({ createdAt: -1 });
    }
  } catch (error) {
    // Log but don't throw - indexes might already exist
    console.log(
      'Index creation warning (this is usually safe to ignore):',
      error instanceof Error ? error.message : String(error)
    );
  }
}

export function getUsersCollection() {
  if (!db) {
    throw new Error('Database not connected. Call connectToDatabase first.');
  }
  return db.collection('users');
}

export function getBanksCollection() {
  if (!db) {
    throw new Error('Database not connected. Call connectToDatabase first.');
  }
  return db.collection('banks');
}

export function getTransactionsCollection() {
  if (!db) {
    throw new Error('Database not connected. Call connectToDatabase first.');
  }
  return db.collection('transactions');
}

export default clientPromise;
