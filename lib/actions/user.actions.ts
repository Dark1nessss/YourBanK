'use server';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  CountryCode,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
} from 'plaid';
import {
  connectToDatabase,
  getBanksCollection,
  getUsersCollection,
} from '../mongodb';
import { plaidClient } from '../plaid';
import { encryptId, parseStringify } from '../utils';
import { addFundingSource } from './dwolla.actions';

const JWT_SECRET = process.env.JWT_SECRET!;

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
  try {
    await connectToDatabase();
    const usersCollection = getUsersCollection();

    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

    return parseStringify(user);
  } catch (error) {
    throw new Error(`Failed to get user info: ${error}`);
  }
};

// Add missing getBanks function
export const getBanks = async ({ userId }: { userId: string }) => {
  try {
    await connectToDatabase();
    const banksCollection = getBanksCollection();

    const banks = await banksCollection.find({ userId }).toArray();

    return parseStringify(banks);
  } catch (error) {
    throw new Error(`Failed to get banks: ${error}`);
  }
};

// Add missing getBank function
export const getBank = async ({ documentId }: { documentId: string }) => {
  try {
    await connectToDatabase();
    const banksCollection = getBanksCollection();
    const bank = await banksCollection.findOne({
      _id: new ObjectId(documentId),
    });

    if (!bank) {
      throw new Error('Bank not found');
    }

    return parseStringify(bank);
  } catch (error) {
    throw new Error(`Failed to get bank: ${error}`);
  }
};

// Add createBankAccount function
export const createBankAccount = async ({
  userId,
  bankId,
  accountId,
  accessToken,
  fundingSourceUrl,
  shareableId,
}: createBankAccountProps) => {
  try {
    await connectToDatabase();
    const banksCollection = getBanksCollection();

    const bankAccount = {
      userId,
      bankId,
      accountId,
      accessToken,
      fundingSourceUrl,
      shareableId: shareableId,
      name: '',
      officialName: '',
      type: '',
      subtype: '',
      mask: '',
      currentBalance: 0,
      availableBalance: 0,
      institutionId: bankId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await banksCollection.insertOne(bankAccount);

    return parseStringify({ bankAccountId: result.insertedId });
  } catch (error) {
    throw new Error(`Failed to create bank account: ${error}`);
  }
};

export const signIn = async ({ email, password }: signInProps) => {
  try {
    await connectToDatabase();
    const usersCollection = getUsersCollection();

    // Find user by email
    const user = await usersCollection.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set cookie
    cookies().set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });

    return parseStringify({
      ...user,
      password: undefined, // Don't return password
    });
  } catch (error) {
    throw new Error(`Sign in failed: ${error}`);
  }
};

export const signUp = async ({ password, ...userData }: SignUpParams) => {
  const { email, firstName, lastName } = userData;
  let newUserAccount;

  try {
    await connectToDatabase();
    const usersCollection = getUsersCollection();

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists with this email address');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user document
    const newUser = {
      email,
      firstName,
      lastName,
      password: hashedPassword,
      address1: userData.address1,
      city: userData.city,
      state: userData.state,
      postalCode: userData.postalCode,
      dateOfBirth: userData.dateOfBirth,
      ssn: userData.ssn,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Insert user
    const result = await usersCollection.insertOne(newUser);

    // Get created user
    newUserAccount = await usersCollection.findOne({ _id: result.insertedId });

    // Create JWT token for auto-login
    const token = jwt.sign(
      { userId: newUserAccount!._id, email: newUserAccount!.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set cookie
    cookies().set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });

    return parseStringify({
      ...newUserAccount,
      password: undefined, // Don't return password
    });
  } catch (error) {
    throw new Error(`Sign up failed: ${error}`);
  }
};

export const getLoggedInUser = async () => {
  try {
    const token = cookies().get('auth-token')?.value;
    if (!token) {
      return null;
    }

    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    await connectToDatabase();
    const usersCollection = getUsersCollection();

    const user = await usersCollection.findOne({
      _id: new ObjectId(decoded.userId),
    });
    if (!user) {
      return null;
    }

    return parseStringify({
      ...user,
      password: undefined, // Don't return password
    });
  } catch (error) {
    throw new Error(`Failed to get logged in user: ${error}`);
  }
};

export const logoutAccount = async () => {
  try {
    cookies().delete('auth-token');
    redirect('/sign-in');
  } catch (error) {
    throw new Error(`Logout failed: ${error}`);
  }
};

export const createLinkToken = async (user: User & { _id: string }) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user._id,
      },
      client_name: `${user.firstName} ${user.lastName}`,
      products: [Products.Auth, Products.Transactions] as Products[],
      language: 'en' as const,
      country_codes: [CountryCode.Us] as CountryCode[],
    };

    const response = await plaidClient.linkTokenCreate(tokenParams);
    return parseStringify({ linkToken: response.data.link_token });
  } catch (error) {
    throw new Error(`Failed to create link token: ${error}`);
  }
};

export const exchangePublicToken = async ({
  publicToken,
  user,
}: exchangePublicTokenProps) => {
  try {
    // Exchange public token for access token and item ID
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    // Get account information from Plaid
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const accountData = accountsResponse.data.accounts[0];

    // Create a processor token for Dwolla
    const request = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: ProcessorTokenCreateRequestProcessorEnum.Dwolla,
    };

    const processorTokenResponse =
      await plaidClient.processorTokenCreate(request);
    const processorToken = processorTokenResponse.data.processor_token;

    // Create funding source URL using the processor token
    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: (
        user as User & { _id: string; dwollaCustomerId: string }
      ).dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });

    // Create bank record if funding source URL is created successfully
    if (fundingSourceUrl) {
      await createBankAccount({
        userId: (user as User & { _id: string })._id,
        bankId: itemId,
        accountId: accountData.account_id,
        accessToken,
        fundingSourceUrl,
        shareableId: encryptId(accountData.account_id),
      });

      // Revalidate the path to reflect the changes
      revalidatePath('/');

      return parseStringify({
        publicTokenExchange: 'complete',
      });
    }
  } catch (error) {
    throw new Error(`An error occurred while exchanging token: ${error}`);
  }
};

// Add missing getBankByAccountId function
export const getBankByAccountId = async ({
  accountId,
}: {
  accountId: string;
}) => {
  try {
    await connectToDatabase();
    const banksCollection = getBanksCollection();

    const bank = await banksCollection.findOne({ accountId });

    if (!bank) {
      throw new Error('Bank not found');
    }

    return parseStringify(bank);
  } catch (error) {
    throw new Error(`Failed to get bank by account ID: ${error}`);
  }
};
