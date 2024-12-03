// mongo.ts - Replacing appwrite.ts

import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { ObjectId } from "bson";

const prisma = new PrismaClient();

// Function to create a client session from cookies
export async function createSessionClient() {
  try {
    const session = cookies().get("mongo-session");

    if (!session || !session.value) {
      console.error("Session not found. User is not authenticated.");
      throw new Error("No session");
    }

    console.log("Session value:", session.value);
    return prisma;
  } catch (error) {
    throw new Error(`Error creating session client: ${error.message}`);
  }
}

// Function to create an admin client
export async function createAdminClient() {
  try {
    console.log("Admin Environment Variables:");
    console.log("DATABASE_URL:", process.env.DATABASE_URL);
    return prisma;
  } catch (error) {
    throw new Error(`Error creating admin client: ${error.message}`);
  }
}

// Function to get a user by email
export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

// Function to fetch all users
export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

// Function to fetch bank accounts for a user
export const getBankAccountsByUserId = async (userId: string) => {
  try {
    const bankAccounts = await prisma.bankAccount.findMany({
      where: {
        userId: new ObjectId(userId),
      },
    });
    return bankAccounts;
  } catch (error) {
    throw new Error(`Error fetching bank accounts: ${error.message}`);
  }
};

// Function to fetch transactions for a bank account
export const getTransactionsByBankAccountId = async (bankAccountId: string) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        bankAccountId: new ObjectId(bankAccountId),
      },
    });
    return transactions;
  } catch (error) {
    throw new Error(`Error fetching transactions: ${error.message}`);
  }
};
