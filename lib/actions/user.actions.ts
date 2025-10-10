'use server';

import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CountryCode, ProcessorTokenCreateRequest, Products } from 'plaid';

import {
  createAdminClient,
  createSession,
  createSessionClient,
  destroySession,
} from '../appwrite';
import { plaidClient } from '../plaid';
import { encryptId, parseStringify } from '../utils';
import { addFundingSource, createDwollaCustomer } from './dwolla.actions';

export const getUserInfo = async ({
  userId,
}: getUserInfoProps): Promise<User | null> => {
  try {
    const { User } = await createAdminClient();
    const user = await User.findById(userId).select('-password');
    return parseStringify(user);
  } catch (error) {
    throw new Error(`Failed to get user info: ${error}`);
  }
};

export const signIn = async ({
  email,
  password,
}: signInProps): Promise<{ user: User }> => {
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

    // Remove password from response
    const userWithoutPassword = { ...user.toObject(), password: undefined };
    return parseStringify({ user: userWithoutPassword });
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
    // Check if user already exists
    const { User } = await createAdminClient();
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user in MongoDB
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

    // Create Dwolla customer (optional, can fail without breaking signup)
    try {
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

      const dwollaCustomerUrl =
        await createDwollaCustomer(dwollaCustomerParams);

      if (dwollaCustomerUrl) {
        const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);
        newUserAccount.dwollaCustomerId = dwollaCustomerId;
        newUserAccount.dwollaCustomerUrl = dwollaCustomerUrl;
        await newUserAccount.save();
      }
    } catch (dwollaError) {
      console.warn('Dwolla customer creation failed:', dwollaError);
      // Continue without Dwolla
    }

    // Create session
    await createSession(newUserAccount._id.toString());

    // Remove password from response
    const userWithoutPassword = {
      ...newUserAccount.toObject(),
      password: undefined,
    };
    return parseStringify({ user: userWithoutPassword });
  } catch (error) {
    // Clean up user if created but something else failed
    if (newUserAccount && newUserAccount._id) {
      try {
        const { User } = await createAdminClient();
        await User.findByIdAndDelete(newUserAccount._id);
      } catch (cleanupError) {
        console.warn('Failed to cleanup user:', cleanupError);
      }
    }
    throw new Error(`Failed to create user: ${error}`);
  }
};

export const getLoggedInUser = async (): Promise<User | null> => {
  try {
    const { user } = await createSessionClient();
    return parseStringify(user);
  } catch (error) {
    console.log('No logged in user:', error);
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
    console.log('Creating link token for user:', {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    // Get user ID - try different possible fields
    const userId = user._id?.toString();

    if (!userId) {
      console.error('User object:', user);
      throw new Error('User ID is missing from user object');
    }

    if (!user.firstName || !user.lastName) {
      throw new Error('User first name and last name are required');
    }

    const tokenParams = {
      user: {
        client_user_id: userId,
      },
      client_name: `${user.firstName} ${user.lastName}`,
      products: ['transactions'] as Products[],
      language: 'en',
      country_codes: ['US'] as CountryCode[],
    };

    console.log('Plaid token params:', tokenParams);

    const response = await plaidClient.linkTokenCreate(tokenParams);

    if (!response.data.link_token) {
      throw new Error('No link token received from Plaid');
    }

    console.log('Link token created successfully');
    return parseStringify({ linkToken: response.data.link_token });
  } catch (error) {
    console.error('CreateLinkToken error details:', error);
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

    // Get additional account details from Plaid
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });
    const accountData = accountsResponse.data.accounts[0];

    // Get institution info
    const institutionResponse = await plaidClient.institutionsGetById({
      institution_id: accountsResponse.data.item.institution_id!,
      country_codes: ['US'] as CountryCode[],
    });

    const bankAccount = new Bank({
      userId,
      bankId,
      accountId,
      accessToken,
      fundingSourceUrl,
      shareableId,
      name: accountData.name,
      officialName: accountData.official_name || accountData.name,
      type: accountData.type,
      subtype: accountData.subtype || 'checking',
      mask: accountData.mask || '0000',
      currentBalance: accountData.balances.current || 0,
      availableBalance: accountData.balances.available || 0,
      institutionId: institutionResponse.data.institution.institution_id,
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
    // Exchange public token for access token
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    // Get account information
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const accountData = accountsResponse.data.accounts[0];

    let fundingSourceUrl: string | undefined;

    // Try to create Dwolla funding source if user has Dwolla customer ID
    if (user.dwollaCustomerId) {
      try {
        console.log('🏦 Creating Dwolla processor token and funding source...');

        // Create processor token for Dwolla
        const request: ProcessorTokenCreateRequest = {
          access_token: accessToken,
          account_id: accountData.account_id,
          processor: 'dwolla' as ProcessorTokenCreateRequest['processor'],
        };

        const processorTokenResponse =
          await plaidClient.processorTokenCreate(request);
        const processorToken = processorTokenResponse.data.processor_token;

        // Add funding source to Dwolla
        const fundingSourceParams: AddFundingSourceParams = {
          dwollaCustomerId: user.dwollaCustomerId,
          processorToken,
          bankName: accountData.name,
        };

        fundingSourceUrl =
          (await addFundingSource(fundingSourceParams)) || undefined;

        if (fundingSourceUrl) {
          console.log('✅ Dwolla funding source created successfully');
        }
      } catch (dwollaError) {
        console.warn(
          '⚠️ Dwolla funding source creation failed, continuing without it:',
          dwollaError
        );
        // Don't throw error - continue with bank account creation
      }
    } else {
      console.log(
        'ℹ️ No Dwolla customer ID found - skipping funding source creation'
      );
    }

    // Create bank account in MongoDB (with or without Dwolla funding source)
    await createBankAccount({
      userId: user._id.toString(),
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl: fundingSourceUrl || '', // Empty string if no Dwolla
      shareableId: encryptId(accountData.account_id),
    });

    console.log('✅ Bank account linked successfully');
    revalidatePath('/');
    return parseStringify({ publicTokenExchange: 'complete' });
  } catch (error) {
    console.error('❌ Exchange token error:', error);
    throw new Error(`An error occurred while exchanging token: ${error}`);
  }
};

export const getBanks = async ({ userId }: getBanksProps): Promise<Bank[]> => {
  try {
    const { Bank } = await createAdminClient();
    const banks = await Bank.find({ userId }).lean();
    return parseStringify(banks);
  } catch (error) {
    throw new Error(`Failed to get banks: ${error}`);
  }
};

export const getBank = async ({
  documentId,
}: getBankProps): Promise<Bank | null> => {
  try {
    const { Bank } = await createAdminClient();
    const bank = await Bank.findById(documentId).populate('userId').lean();
    if (!bank) throw new Error('Bank not found');
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
    const bank = await Bank.findOne({ accountId }).lean();
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
