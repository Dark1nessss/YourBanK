'use server';

import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CountryCode, ProcessorTokenCreateRequest, Products } from 'plaid';

// Replace Appwrite imports with Mongoose
import {
  createAdminClient,
  createSession,
  createSessionClient,
  destroySession,
} from '../mongoose';
import { plaidClient } from '../plaid';
import { encryptId, parseStringify } from '../utils';
import { addFundingSource } from './dwolla.actions';

export const getUserInfo = async ({
  userId,
}: getUserInfoProps): Promise<User | null> => {
  try {
    const { User } = await createAdminClient();
    const user = await User.findById(userId);
    return parseStringify(user);
  } catch (error) {
    throw new Error(`Failed to get user info: ${error}`);
  }
};

export const signIn = async ({
  email,
  password,
}: signInProps): Promise<{ user: User } | null> => {
  try {
    const { User } = await createAdminClient();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Create session
    await createSession(user._id.toString());

    return parseStringify({ user });
  } catch (error) {
    throw new Error(`Failed to sign in: ${error}`);
  }
};

export const signUp = async ({
  password,
  ...userData
}: SignUpParams): Promise<{ user: User }> => {
  const {
    firstName,
    lastName,
    address1,
    city,
    state,
    postalCode,
    dateOfBirth,
    ssn,
  } = userData;

  let newUserAccount;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user in MongoDB
    const { User } = await createAdminClient();
    newUserAccount = new User({
      firstName,
      lastName,
      email: userData.email,
      password: hashedPassword,
      address1,
      city,
      state,
      postalCode,
      dateOfBirth,
      ssn,
    });

    await newUserAccount.save();

    // Create Dwolla customer using NewDwollaCustomerParams
    const dwollaCustomerParams: NewDwollaCustomerParams = {
      firstName,
      lastName,
      email: userData.email,
      type: 'personal',
      address1,
      city,
      state,
      postalCode,
      dateOfBirth,
      ssn,
    };

    // Note: addFundingSource needs to handle NewDwollaCustomerParams
    const dwollaCustomerUrl = await addFundingSource(
      dwollaCustomerParams as any
    );

    if (dwollaCustomerUrl) {
      const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

      // Update user with Dwolla information
      newUserAccount.dwollaCustomerId = dwollaCustomerId;
      newUserAccount.dwollaCustomerUrl = dwollaCustomerUrl;
      await newUserAccount.save();
    }

    // Create session
    await createSession(newUserAccount._id.toString());
    return parseStringify({ user: newUserAccount });
  } catch (error) {
    throw new Error(`Failed to create user: ${error}`);
  }
};

export const getLoggedInUser = async (): Promise<User | null> => {
  try {
    const { user } = await createSessionClient();
    return parseStringify(user);
  } catch {
    return null;
  }
};

export const logoutAccount = async (): Promise<void> => {
  try {
    await destroySession();
    redirect('/sign-in');
  } catch (error) {
    throw new Error(`Failed to log out: ${error}`);
  }
};

export const createLinkToken = async (
  user: User
): Promise<{ linkToken: string }> => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user._id.toString(),
      },
      client_name: `${user.firstName} ${user.lastName}`,
      products: ['transactions'] as Products[],
      language: 'en',
      country_codes: ['US'] as CountryCode[],
    };

    const response = await plaidClient.linkTokenCreate(tokenParams);
    return parseStringify({ linkToken: response.data.link_token });
  } catch (error) {
    throw new Error(`Failed to create link token: ${error}`);
  }
};

export const createBankAccount = async ({
  userId,
  bankId,
  accountId,
  accessToken,
  fundingSourceUrl,
  shareableId,
}: createBankAccountProps): Promise<{ bankAccount: Bank }> => {
  try {
    const { Bank } = await createAdminClient();

    const bankAccount = new Bank({
      userId: userId.toString(),
      bankId,
      accountId,
      accessToken,
      fundingSourceUrl,
      shareableId,
      // Add default values for required fields
      name: 'Bank Account',
      officialName: 'Bank Account',
      type: 'depository',
      subtype: 'checking',
      mask: '0000',
      currentBalance: 0,
      availableBalance: 0,
      institutionId: 'unknown',
    });

    await bankAccount.save();
    return parseStringify({ bankAccount });
  } catch (error) {
    throw new Error(`Failed to create bank account: ${error}`);
  }
};

export const exchangePublicToken = async ({
  publicToken,
  user,
}: exchangePublicTokenProps): Promise<string> => {
  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const accountData = accountsResponse.data.accounts[0];

    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: 'dwolla' as any,
    };

    const processorTokenResponse =
      await plaidClient.processorTokenCreate(request);
    const processorToken = processorTokenResponse.data.processor_token;

    const fundingSourceParams: AddFundingSourceParams = {
      dwollaCustomerId: user.dwollaCustomerId!,
      processorToken,
      bankName: accountData.name,
    };

    const fundingSourceUrl = await addFundingSource(fundingSourceParams);

    if (!fundingSourceUrl) throw new Error('Failed to create funding source');

    await createBankAccount({
      userId: user._id.toString(),
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      shareableId: encryptId(accountData.account_id),
    });

    revalidatePath('/');
    return parseStringify({ publicTokenExchange: 'complete' });
  } catch (error) {
    throw new Error(`An error occurred while exchanging token: ${error}`);
  }
};

export const getBanks = async ({
  userId,
}: getBanksProps): Promise<{ data: Bank[] }> => {
  try {
    const { Bank } = await createAdminClient();
    const banks = await Bank.find({ userId });
    return parseStringify({ data: banks });
  } catch (error) {
    throw new Error(`Failed to get banks: ${error}`);
  }
};

export const getBank = async ({
  documentId,
}: getBankProps): Promise<Bank | null> => {
  try {
    const { Bank } = await createAdminClient();
    const bank = await Bank.findById(documentId).populate('userId');
    return parseStringify(bank);
  } catch (error) {
    throw new Error(`Failed to get bank: ${error}`);
  }
};

export const getBankByAccountId = async ({
  accountId,
}: getBankByAccountIdProps): Promise<Bank | null> => {
  try {
    const { Bank } = await createAdminClient();
    const bank = await Bank.findOne({ accountId });
    return parseStringify(bank);
  } catch (error) {
    throw new Error(`Failed to get bank by account ID: ${error}`);
  }
};

// Helper function to extract customer ID from Dwolla URL
function extractCustomerIdFromUrl(url: string): string {
  const parts = url.split('/');
  return parts[parts.length - 1];
}
