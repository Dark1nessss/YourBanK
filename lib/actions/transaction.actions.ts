// transaction.actions.ts - Replacing Appwrite transaction actions with MongoDB

import { PrismaClient } from "@prisma/client";
import { ObjectId } from "bson";

const prisma = new PrismaClient();

// Function to create a transaction
export const createTransaction = async (
  bankAccountId: string,
  amount: number,
  type: string,
  category?: string,
  description?: string
) => {
  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        bankAccountId: new ObjectId(bankAccountId),
        amount,
        type,
        category,
        description,
        timestamp: new Date(),
      },
    });
    return newTransaction;
  } catch (error) {
    throw new Error(`Error creating transaction: ${error.message}`);
  }
};

// Function to get transactions by bank account ID
export const getTransactionsByBankAccountId = async (bankAccountId: string) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        bankAccountId: new ObjectId(bankAccountId),
      },
      orderBy: {
        timestamp: 'desc',
      },
    });
    return transactions;
  } catch (error) {
    throw new Error(`Error fetching transactions: ${error.message}`);
  }
};

// Function to delete a transaction by ID
export const deleteTransaction = async (transactionId: string) => {
  try {
    await prisma.transaction.delete({
      where: {
        id: new ObjectId(transactionId),
      },
    });
    return { message: "Transaction deleted successfully" };
  } catch (error) {
    throw new Error(`Error deleting transaction: ${error.message}`);
  }
};

// Function to update a transaction by ID
export const updateTransaction = async (
  transactionId: string,
  updates: {
    amount?: number;
    type?: string;
    category?: string;
    description?: string;
  }
) => {
  try {
    const updatedTransaction = await prisma.transaction.update({
      where: {
        id: new ObjectId(transactionId),
      },
      data: updates,
    });
    return updatedTransaction;
  } catch (error) {
    throw new Error(`Error updating transaction: ${error.message}`);
  }
};
