import 'dotenv/config';
import { MongoClient } from 'mongodb';
import { Client, Databases } from 'node-appwrite';

const {
  NEXT_PUBLIC_APPWRITE_ENDPOINT,
  NEXT_APPWRITE_KEY,
  NEXT_PUBLIC_APPWRITE_PROJECT,
  APPWRITE_DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID,
  APPWRITE_TRANSACTION_COLLECTION_ID,
  MONGODB_URI,
} = process.env;

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(NEXT_PUBLIC_APPWRITE_PROJECT!)
  .setKey(NEXT_APPWRITE_KEY!);

const databases = new Databases(client);

// Initialize MongoDB client
const mongoClient = new MongoClient(MONGODB_URI!);

export async function migrateToMongoDB() {
  console.log('🚀 Starting migration from Appwrite to MongoDB...');

  try {
    // Connect to MongoDB
    await mongoClient.connect();
    const db = mongoClient.db('yourbank');

    const usersCollection = db.collection('users');
    const banksCollection = db.collection('banks');
    const transactionsCollection = db.collection('transactions');

    // Create indexes
    console.log('📝 Creating indexes...');
    await usersCollection.createIndex({ email: 1 }, { unique: true });
    await banksCollection.createIndex({ userId: 1 });
    await banksCollection.createIndex({ accountId: 1 }, { unique: true });
    await transactionsCollection.createIndex({ userId: 1 });
    await transactionsCollection.createIndex({ bankId: 1 });
    await transactionsCollection.createIndex({ date: -1 });

    // Migrate Users
    console.log('📊 Migrating users...');
    try {
      const appwriteUsers = await databases.listDocuments(
        APPWRITE_DATABASE_ID!,
        APPWRITE_USER_COLLECTION_ID!
      );

      for (const user of appwriteUsers.documents) {
        const mongoUser = {
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
        };

        await usersCollection.replaceOne({ _id: user.$id }, mongoUser, {
          upsert: true,
        });
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

      for (const bank of appwriteBanks.documents) {
        const mongoBank = {
          _id: bank.$id,
          userId: bank.userId,
          accountId: bank.accountId,
          accessToken: bank.accessToken,
          fundingSourceUrl: bank.fundingSourceUrl,
          name: bank.name,
          officialName: bank.officialName,
          type: bank.type,
          subtype: bank.subtype,
          sharableId: bank.shareableId,
          mask: bank.mask,
          currentBalance: bank.currentBalance || 0,
          availableBalance: bank.availableBalance || 0,
          institutionId: bank.institutionId,
          createdAt: new Date(bank.$createdAt),
          updatedAt: new Date(bank.$updatedAt),
        };

        await banksCollection.replaceOne({ _id: bank.$id }, mongoBank, {
          upsert: true,
        });
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

      for (const transaction of appwriteTransactions.documents) {
        const mongoTransaction = {
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
        };

        await transactionsCollection.replaceOne(
          { _id: transaction.$id },
          mongoTransaction,
          { upsert: true }
        );
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
  } finally {
    await mongoClient.close();
  }
}

// Run migration if called directly
if (require.main === module) {
  migrateToMongoDB()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
