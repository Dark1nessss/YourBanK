// user.actions.ts - Final version for user actions with MongoDB

import { PrismaClient } from "@prisma/client";
import { ObjectId } from "bson";
import { plaidClient } from "../plaid";
import { parseStringify } from "../utils";

const prisma = new PrismaClient();

// Function to get user info
export const getUserInfo = async (userId: string) => {
  try {
    const url = new URL('/api/session', process.env.NEXT_PUBLIC_SITE_URL);

    const response = await fetch(url.toString(), {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch logged-in user');
    }
    const data = await response.json();
    return data.user;
  } catch (error) {
    throw new Error(`Error fetching logged-in user: ${error.message}`);
  }
};

// Function to sign in
export const signIn = async (email: string, password: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user || user.password !== password) {
      throw new Error("Invalid credentials");
    }
    // Set user session or token here
    return { message: "Sign in successful", user };
  } catch (error) {
    throw new Error(`Error signing in: ${error.message}`);
  }
};

// Function to sign up
export const signUp = async (
  firstName: string,
  lastName: string,
  address: string,
  city: string,
  state: string,
  postalCode: string,
  dateOfBirth: Date,
  ssn: string,
  email: string,
  password: string
) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        address,
        city,
        state,
        postalCode,
        dateOfBirth,
        ssn,
        email,
        password,
      },
    });
    return { message: "Sign up successful", newUser };
  } catch (error) {
    throw new Error(`Error signing up: ${error.message}`);
  }
};

// Function to get logged-in user
export const getLoggedInUser = async () => {
  try {
    const url = new URL('/api/session', process.env.NEXT_PUBLIC_SITE_URL);

    const response = await fetch(url.toString(), {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch logged-in user');
    }
    const data = await response.json();
    return data.user;
  } catch (error) {
    throw new Error(`Error fetching logged-in user: ${error.message}`);
  }
};

// Function to logout account
export const logoutAccount = async () => {
  try {
    const url = new URL('/api/session/route', process.env.NEXT_PUBLIC_SITE_URL);

    const response = await fetch(url.toString(), {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to log out');
    }
    return { message: "Logout successful" };
  } catch (error) {
    throw new Error(`Error logging out: ${error.message}`);
  }
};

// Function to create link token
export const createLinkToken = async () => {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: "user-id-placeholder", // Replace with real user ID from session or context
      },
      client_name: "YourBank App",
      products: ["auth", "transactions"],
      country_codes: ["US"],
      language: "en",
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error creating link token: ${error.message}`);
  }
};

// Function to create bank account
export const createBankAccount = async (userId: string, bankName: string, accountNumber: string, balance: number) => {
  try {
    const newBankAccount = await prisma.bankAccount.create({
      data: {
        userId: new ObjectId(userId),
        bankName,
        accountNumber,
        balance,
      },
    });
    return { message: "Bank account created successfully", newBankAccount };
  } catch (error) {
    throw new Error(`Error creating bank account: ${error.message}`);
  }
};

// Function to exchange public token
export const exchangePublicToken = async (publicToken: string) => {
  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });
    return { accessToken: response.data.access_token, itemId: response.data.item_id };
  } catch (error) {
    throw new Error(`Error exchanging public token: ${error.message}`);
  }
};

// Function to get banks
export const getBanks = async (userId: string) => {
  try {
    const banks = await prisma.bankAccount.findMany({
      where: {
        userId: new ObjectId(userId),
      },
    });
    return banks;
  } catch (error) {
    throw new Error(`Error fetching banks: ${error.message}`);
  }
};

// Function to get a specific bank
export const getBank = async (bankId: string) => {
  try {
    const bank = await prisma.bankAccount.findUnique({
      where: {
        id: new ObjectId(bankId),
      },
    });
    if (!bank) {
      throw new Error("Bank not found");
    }
    return bank;
  } catch (error) {
    throw new Error(`Error fetching bank: ${error.message}`);
  }
};

// Function to get bank by account ID
export const getBankByAccountId = async (accountId: string) => {
  try {
    const bankAccount = await prisma.bankAccount.findUnique({
      where: {
        accountNumber: accountId,
      },
    });
    if (!bankAccount) {
      throw new Error("Bank account not found");
    }
    return bankAccount;
  } catch (error) {
    throw new Error(`Error fetching bank by account ID: ${error.message}`);
  }
};