import 'dotenv/config';
import { Client, Databases, type Models } from 'node-appwrite';
import { Bank, Transaction, User } from '../lib/models';
import { connectToDatabase } from '../lib/mongoose';

const {
  NEXT_PUBLIC_APPWRITE_ENDPOINT,
  NEXT_APPWRITE_KEY,
  NEXT_PUBLIC_APPWRITE_PROJECT,
  APPWRITE_DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID,
  APPWRITE_TRANSACTION_COLLECTION_ID,
} = process.env;

// Define Appwrite document interfaces
interface AppwriteUser extends Models.Document {
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
}

interface AppwriteBank extends Models.Document {
  userId: string;
  accountId: string;
  accessToken: string;
  fundingSourceUrl?: string;
  name: string;
  officialName: string;
  type: string;
  subtype: string;
  shareableId: string;
  mask: string;
  currentBalance?: number;
  availableBalance?: number;
  institutionId: string;
}

interface AppwriteTransaction extends Models.Document {
  userId: string;
  bankId: string;
  accountId: string;
  amount: number;
  name: string;
  paymentChannel: string;
  category: string | string[];
  subcategory: string | string[];
  type: string;
  date: string;
  image?: string;
  senderBankId?: string;
  receiverBankId?: string;
  channel: string;
}

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(NEXT_PUBLIC_APPWRITE_PROJECT!)
  .setKey(NEXT_APPWRITE_KEY!);

const databases = new Databases(client);

export async function migrateToMongoDB(): Promise<void> {
  console.log('🚀 Starting migration from Appwrite to MongoDB...');

  try {
    // Connect to MongoDB using Mongoose
    await connectToDatabase();
    console.log('✅ Connected to MongoDB');

    // Migrate Users
    console.log('📊 Migrating users...');
    try {
      const appwriteUsers = await databases.listDocuments(
        APPWRITE_DATABASE_ID!,
        APPWRITE_USER_COLLECTION_ID!
      );

      for (const userDoc of appwriteUsers.documents) {
        const user = userDoc as unknown as AppwriteUser;
        const mongoUser = new User({
          _id: user.$id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          address1: user.address1,
          city: user.city,
          state: user.state,
          postalCode: user.postalCode,
          dateOfBirth: user.dateOfBirth,
          ssn: user.ssn,
          dwollaCustomerId: user.dwollaCustomerId,
          dwollaCustomerUrl: user.dwollaCustomerUrl,
          createdAt: new Date(user.$createdAt),
          updatedAt: new Date(user.$updatedAt),
        });

        await mongoUser.save();
      }
      console.log(`✅ Migrated ${appwriteUsers.documents.length} users`);
    } catch (error) {
      console.log('⚠️  No users found or error migrating users:', error);
    }

    // Migrate Banks
    console.log('🏦 Migrating banks...');
    try {
      const appwriteBanks = await databases.listDocuments(
        APPWRITE_DATABASE_ID!,
        APPWRITE_BANK_COLLECTION_ID!
      );

      for (const bankDoc of appwriteBanks.documents) {
        const bank = bankDoc as unknown as AppwriteBank;
        const mongoBank = new Bank({
          _id: bank.$id,
          userId: bank.userId,
          accountId: bank.accountId,
          accessToken: bank.accessToken,
          fundingSourceUrl: bank.fundingSourceUrl,
          name: bank.name || 'Unknown Bank',
          officialName: bank.officialName || 'Unknown Bank',
          type: bank.type || 'depository',
          subtype: bank.subtype || 'checking',
          shareableId: bank.shareableId,
          mask: bank.mask || '0000',
          currentBalance: bank.currentBalance || 0,
          availableBalance: bank.availableBalance || 0,
          institutionId: bank.institutionId || 'unknown',
          bankId: bank.$id, // Use document ID as bankId
          createdAt: new Date(bank.$createdAt),
          updatedAt: new Date(bank.$updatedAt),
        });

        await mongoBank.save();
      }
      console.log(`✅ Migrated ${appwriteBanks.documents.length} banks`);
    } catch (error) {
      console.log('⚠️  No banks found or error migrating banks:', error);
    }

    // Migrate Transactions
    console.log('💳 Migrating transactions...');
    try {
      const appwriteTransactions = await databases.listDocuments(
        APPWRITE_DATABASE_ID!,
        APPWRITE_TRANSACTION_COLLECTION_ID!
      );

      for (const transactionDoc of appwriteTransactions.documents) {
        const transaction = transactionDoc as unknown as AppwriteTransaction;
        const mongoTransaction = new Transaction({
          _id: transaction.$id,
          userId: transaction.userId,
          bankId: transaction.bankId,
          accountId: transaction.accountId,
          amount: transaction.amount,
          name: transaction.name,
          paymentChannel: transaction.paymentChannel,
          category: Array.isArray(transaction.category)
            ? transaction.category
            : [transaction.category],
          subcategory: Array.isArray(transaction.subcategory)
            ? transaction.subcategory
            : [transaction.subcategory],
          type: transaction.type,
          date: new Date(transaction.date),
          image: transaction.image,
          senderBankId: transaction.senderBankId,
          receiverBankId: transaction.receiverBankId,
          channel: transaction.channel,
          createdAt: new Date(transaction.$createdAt),
          updatedAt: new Date(transaction.$updatedAt),
        });

        await mongoTransaction.save();
      }
      console.log(
        `✅ Migrated ${appwriteTransactions.documents.length} transactions`
      );
    } catch (error) {
      console.log(
        '⚠️  No transactions found or error migrating transactions:',
        error
      );
    }

    console.log('🎉 Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

// Run migration if called directly
if (require.main === module) {
  migrateToMongoDB()
    .then(() => {
      console.log('Migration completed, exiting...');
      process.exit(0);
    })
    .catch(error => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}
