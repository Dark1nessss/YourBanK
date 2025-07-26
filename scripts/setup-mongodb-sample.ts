import bcrypt from 'bcryptjs';
import 'dotenv/config';
import { MongoClient } from 'mongodb';

const { MONGODB_URI } = process.env;
const mongoClient = new MongoClient(MONGODB_URI!);

export async function setupSampleData() {
  console.log('🚀 Setting up MongoDB with sample data...');

  try {
    await mongoClient.connect();
    const db = mongoClient.db('yourbank');

    const usersCollection = db.collection('users');
    const banksCollection = db.collection('banks');
    const transactionsCollection = db.collection('transactions');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await usersCollection.deleteMany({});
    await banksCollection.deleteMany({});
    await transactionsCollection.deleteMany({});

    // Drop existing indexes to avoid conflicts
    console.log('🗑️  Dropping existing indexes...');
    try {
      await usersCollection.dropIndexes();
      await banksCollection.dropIndexes();
      await transactionsCollection.dropIndexes();
    } catch (error) {
      console.log('⚠️  Some indexes may not exist, continuing...');
    }

    // Create indexes
    console.log('📝 Creating indexes...');
    await usersCollection.createIndex({ email: 1 }, { unique: true });
    await banksCollection.createIndex({ userId: 1 });
    await banksCollection.createIndex({ accountId: 1 }, { unique: true });
    await transactionsCollection.createIndex({ userId: 1 });
    await transactionsCollection.createIndex({ bankId: 1 });
    await transactionsCollection.createIndex({ date: -1 });

    // Sample user
    console.log('👤 Creating sample user...');
    const hashedPassword = await bcrypt.hash('password123', 12);
    const sampleUser = {
      _id: 'user_001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: hashedPassword,
      address1: '123 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      dateOfBirth: '1990-01-01',
      ssn: '123-45-6789',
      dwollaCustomerId: 'dwolla_customer_001',
      dwollaCustomerUrl:
        'https://api-sandbox.dwolla.com/customers/dwolla_customer_001',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await usersCollection.insertOne(sampleUser);
    console.log('✅ Created sample user');

    // Sample bank account
    console.log('🏦 Creating sample bank account...');
    const sampleBank = {
      _id: 'bank_001',
      userId: 'user_001',
      accountId: 'account_001',
      accessToken: 'sample_access_token',
      fundingSourceUrl:
        'https://api-sandbox.dwolla.com/funding-sources/funding_001',
      name: 'Chase Checking',
      officialName: 'Chase Bank Checking Account',
      type: 'depository',
      subtype: 'checking',
      sharableId: 'shareable_001',
      mask: '1234',
      currentBalance: 2500.5,
      availableBalance: 2300.25,
      institutionId: 'ins_109508',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await banksCollection.insertOne(sampleBank);
    console.log('✅ Created sample bank account');

    // Sample transactions
    console.log('💳 Creating sample transactions...');
    const sampleTransactions = [
      {
        _id: 'trans_001',
        userId: 'user_001',
        bankId: 'bank_001',
        accountId: 'account_001',
        amount: -85.5,
        name: 'Starbucks Coffee',
        paymentChannel: 'in store',
        category: ['Food and Drink', 'Coffee'],
        subcategory: ['Coffee'],
        type: 'debit',
        date: new Date('2024-01-15'),
        image: '',
        channel: 'online',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: 'trans_002',
        userId: 'user_001',
        bankId: 'bank_001',
        accountId: 'account_001',
        amount: 2000.0,
        name: 'Salary Deposit',
        paymentChannel: 'other',
        category: ['Transfer', 'Deposit'],
        subcategory: ['Payroll'],
        type: 'credit',
        date: new Date('2024-01-01'),
        image: '',
        channel: 'online',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: 'trans_003',
        userId: 'user_001',
        bankId: 'bank_001',
        accountId: 'account_001',
        amount: -120.0,
        name: 'Electric Bill',
        paymentChannel: 'online',
        category: ['Payment', 'Utilities'],
        subcategory: ['Electric'],
        type: 'debit',
        date: new Date('2024-01-10'),
        image: '',
        channel: 'online',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await transactionsCollection.insertMany(sampleTransactions);
    console.log(`✅ Created ${sampleTransactions.length} sample transactions`);

    console.log('🎉 Sample data setup completed successfully!');
    console.log('📧 Sample user credentials:');
    console.log('   Email: john.doe@example.com');
    console.log('   Password: password123');
  } catch (error) {
    console.error('❌ Setup failed:', error);
    throw error;
  } finally {
    await mongoClient.close();
  }
}

if (require.main === module) {
  setupSampleData()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
