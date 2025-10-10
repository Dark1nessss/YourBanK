import 'dotenv/config';
import { Types } from 'mongoose';
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

// Helper function to convert Appwrite ID to MongoDB ObjectId
function createValidObjectId(appwriteId: string): string {
  try {
    // If it's already a valid ObjectId, use it
    if (appwriteId.length === 24 && /^[0-9a-fA-F]{24}$/.test(appwriteId)) {
      return appwriteId;
    }
    // Otherwise, create a new ObjectId but store the original ID as a field
    return new Types.ObjectId().toString();
  } catch {
    return new Types.ObjectId().toString();
  }
}

// Helper function to safely parse dates
function safeParseDate(dateString: string): Date {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? new Date() : date;
}

// Helper function to extract user ID from Appwrite bank document
function extractUserId(userField: any): string | null {
  // Handle different formats of user field
  if (typeof userField === 'string') {
    return userField;
  }
  if (typeof userField === 'object' && userField !== null) {
    // Check for nested user object with $id
    if (userField.$id) {
      return userField.$id;
    }
    // Check for userId property
    if (userField.userId) {
      return userField.userId;
    }
    // Check for _id property
    if (userField._id) {
      return userField._id;
    }
  }
  return null;
}

// Define Appwrite document interfaces
interface AppwriteUser extends Models.Document {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
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
  userId: any; // Can be string or object
  accountId: string;
  accessToken: string;
  fundingSourceUrl?: string;
  name?: string;
  officialName?: string;
  type?: string;
  subtype?: string;
  shareableId?: string;
  mask?: string;
  currentBalance?: number;
  availableBalance?: number;
  institutionId?: string;
}

interface AppwriteTransaction extends Models.Document {
  userId?: any; // Can be string or object
  bankId?: any; // Can be string or object
  accountId?: string;
  amount?: number;
  name?: string;
  paymentChannel?: string;
  category?: string | string[];
  subcategory?: string | string[];
  type?: string;
  date?: string;
  image?: string;
  senderBankId?: any;
  receiverBankId?: any;
  channel?: string;
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

    // Clear existing data to avoid conflicts
    console.log('🗑️  Clearing existing MongoDB data...');
    await User.deleteMany({});
    await Bank.deleteMany({});
    await Transaction.deleteMany({});
    console.log('✅ Cleared existing data');

    // Store mapping of old IDs to new IDs
    const userIdMapping = new Map<string, string>();
    const bankIdMapping = new Map<string, string>();

    // Migrate Users
    console.log('📊 Migrating users...');
    try {
      const appwriteUsers = await databases.listDocuments(
        APPWRITE_DATABASE_ID!,
        APPWRITE_USER_COLLECTION_ID!
      );

      console.log(`Found ${appwriteUsers.documents.length} users to migrate`);

      for (const userDoc of appwriteUsers.documents) {
        try {
          const user = userDoc as unknown as AppwriteUser;
          const newUserId = createValidObjectId(user.$id);

          const mongoUser = new User({
            _id: newUserId,
            firstName: user.firstName || 'Unknown',
            lastName: user.lastName || 'User',
            email: user.email,
            password: user.password || 'temp_password_need_reset', // Provide default
            address1: user.address1 || 'Unknown',
            city: user.city || 'Unknown',
            state: user.state || 'Unknown',
            postalCode: user.postalCode || '00000',
            dateOfBirth: user.dateOfBirth || '1990-01-01',
            ssn: user.ssn || '000000000',
            dwollaCustomerId: user.dwollaCustomerId,
            dwollaCustomerUrl: user.dwollaCustomerUrl,
            createdAt: safeParseDate(user.$createdAt),
            updatedAt: safeParseDate(user.$updatedAt),
          });

          await mongoUser.save();
          userIdMapping.set(user.$id, newUserId);

          console.log(`✅ Migrated user: ${user.email}`);
        } catch (error) {
          console.log(
            `❌ Failed to migrate user ${userDoc.$id}:`,
            error instanceof Error ? error.message : String(error)
          );
        }
      }
      console.log(`✅ Successfully migrated ${userIdMapping.size} users`);
    } catch (error) {
      console.log(
        '⚠️  Error migrating users:',
        error instanceof Error ? error.message : String(error)
      );
    }

    // Migrate Banks
    console.log('🏦 Migrating banks...');
    try {
      const appwriteBanks = await databases.listDocuments(
        APPWRITE_DATABASE_ID!,
        APPWRITE_BANK_COLLECTION_ID!
      );

      console.log(`Found ${appwriteBanks.documents.length} banks to migrate`);

      for (const bankDoc of appwriteBanks.documents) {
        try {
          const bank = bankDoc as unknown as AppwriteBank;
          const newBankId = createValidObjectId(bank.$id);

          // Extract user ID properly
          const originalUserId = extractUserId(bank.userId);
          console.log(
            `🔍 Bank ${bank.$id} - Original user field:`,
            bank.userId
          );
          console.log(`🔍 Extracted user ID:`, originalUserId);

          if (!originalUserId) {
            console.log(
              `⚠️  Skipping bank ${bank.$id} - no valid user ID found`
            );
            continue;
          }

          // Find the mapped user ID
          const mappedUserId = userIdMapping.get(originalUserId);
          if (!mappedUserId) {
            console.log(
              `⚠️  Skipping bank ${bank.$id} - user ${originalUserId} not found in migration`
            );
            continue;
          }

          const mongoBank = new Bank({
            _id: newBankId,
            userId: mappedUserId,
            accountId: bank.accountId,
            accessToken: bank.accessToken,
            fundingSourceUrl: bank.fundingSourceUrl,
            name: bank.name || 'Unknown Bank',
            officialName: bank.officialName || 'Unknown Bank',
            type: bank.type || 'depository',
            subtype: bank.subtype || 'checking',
            shareableId: bank.shareableId || createValidObjectId(bank.$id),
            mask: bank.mask || '0000',
            currentBalance: bank.currentBalance || 0,
            availableBalance: bank.availableBalance || 0,
            institutionId: bank.institutionId || 'unknown',
            bankId: bank.$id, // Keep original Appwrite ID as bankId
            createdAt: safeParseDate(bank.$createdAt),
            updatedAt: safeParseDate(bank.$updatedAt),
          });

          await mongoBank.save();
          bankIdMapping.set(bank.$id, newBankId);

          console.log(`✅ Migrated bank: ${bank.name || bank.accountId}`);
        } catch (error) {
          console.log(
            `❌ Failed to migrate bank ${bankDoc.$id}:`,
            error instanceof Error ? error.message : String(error)
          );
        }
      }
      console.log(`✅ Successfully migrated ${bankIdMapping.size} banks`);
    } catch (error) {
      console.log(
        '⚠️  Error migrating banks:',
        error instanceof Error ? error.message : String(error)
      );
    }

    // Migrate Transactions
    console.log('💳 Migrating transactions...');
    try {
      const appwriteTransactions = await databases.listDocuments(
        APPWRITE_DATABASE_ID!,
        APPWRITE_TRANSACTION_COLLECTION_ID!
      );

      console.log(
        `Found ${appwriteTransactions.documents.length} transactions to migrate`
      );

      for (const transactionDoc of appwriteTransactions.documents) {
        try {
          const transaction = transactionDoc as unknown as AppwriteTransaction;

          console.log(`🔍 Transaction ${transaction.$id}:`, {
            userId: transaction.userId,
            bankId: transaction.bankId,
            accountId: transaction.accountId,
          });

          // Extract user and bank IDs properly
          const originalUserId = extractUserId(transaction.userId);
          const originalBankId = extractUserId(transaction.bankId);

          // Skip transactions with missing required data
          if (!originalUserId || !originalBankId || !transaction.accountId) {
            console.log(
              `⚠️  Skipping transaction ${transaction.$id} - missing required fields (user: ${originalUserId}, bank: ${originalBankId}, account: ${transaction.accountId})`
            );
            continue;
          }

          const newTransactionId = createValidObjectId(transaction.$id);
          const mappedUserId = userIdMapping.get(originalUserId);
          const mappedBankId = bankIdMapping.get(originalBankId);

          if (!mappedUserId || !mappedBankId) {
            console.log(
              `⚠️  Skipping transaction ${transaction.$id} - user or bank not found in migration (user: ${mappedUserId}, bank: ${mappedBankId})`
            );
            continue;
          }

          const mongoTransaction = new Transaction({
            _id: newTransactionId,
            userId: mappedUserId,
            bankId: mappedBankId,
            accountId: transaction.accountId,
            amount: transaction.amount || 0,
            name: transaction.name || 'Unknown Transaction',
            paymentChannel: transaction.paymentChannel || 'online',
            category: Array.isArray(transaction.category)
              ? transaction.category
              : transaction.category
                ? [transaction.category]
                : ['other'],
            subcategory: Array.isArray(transaction.subcategory)
              ? transaction.subcategory
              : transaction.subcategory
                ? [transaction.subcategory]
                : ['other'],
            type: transaction.type || 'debit',
            date: transaction.date
              ? safeParseDate(transaction.date)
              : new Date(),
            image: transaction.image,
            senderBankId: transaction.senderBankId
              ? bankIdMapping.get(extractUserId(transaction.senderBankId) || '')
              : undefined,
            receiverBankId: transaction.receiverBankId
              ? bankIdMapping.get(
                  extractUserId(transaction.receiverBankId) || ''
                )
              : undefined,
            channel: transaction.channel || 'online',
            createdAt: safeParseDate(transaction.$createdAt),
            updatedAt: safeParseDate(transaction.$updatedAt),
          });

          await mongoTransaction.save();
          console.log(
            `✅ Migrated transaction: ${transaction.name || transaction.$id}`
          );
        } catch (error) {
          console.log(
            `❌ Failed to migrate transaction ${transactionDoc.$id}:`,
            error instanceof Error ? error.message : String(error)
          );
        }
      }
    } catch (error) {
      console.log(
        '⚠️  Error migrating transactions:',
        error instanceof Error ? error.message : String(error)
      );
    }

    console.log('🎉 Migration completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   Users migrated: ${userIdMapping.size}`);
    console.log(`   Banks migrated: ${bankIdMapping.size}`);
    console.log(`   ✅ Database migration complete!`);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

// Run migration if called directly
if (require.main === module) {
  migrateToMongoDB()
    .then(() => {
      console.log('✅ Migration process completed successfully!');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Migration failed:', error);
      process.exit(1);
    });
}
