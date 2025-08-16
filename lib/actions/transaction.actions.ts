'use server';

import { createAdminClient } from '../appwrite';
import { parseStringify } from '../utils';

export const createTransaction = async (
  transaction: CreateTransactionProps
) => {
  try {
    const { Transaction } = await createAdminClient();

    const newTransaction = new Transaction({
      channel: 'online',
      category: ['Transfer'],
      paymentChannel: 'online',
      subcategory: ['default'],
      type: 'debit',
      date: new Date(),
      userId: transaction.senderId,
      bankId: transaction.senderBankId,
      accountId: transaction.senderBankId,
      ...transaction,
      amount: parseFloat(transaction.amount),
    });

    await newTransaction.save();
    return parseStringify(newTransaction);
  } catch (error) {
    throw new Error(`Failed to create transaction: ${error}`);
  }
};

export const getTransactionsByBankId = async ({
  bankId,
}: getTransactionsByBankIdProps) => {
  try {
    const { Transaction } = await createAdminClient();

    const senderTransactions = await Transaction.find({
      senderBankId: bankId,
    }).lean();

    const receiverTransactions = await Transaction.find({
      receiverBankId: bankId,
    }).lean();

    const transactions = {
      total: senderTransactions.length + receiverTransactions.length,
      documents: [...senderTransactions, ...receiverTransactions],
    };

    return parseStringify(transactions);
  } catch (error) {
    throw new Error(`Failed to get transactions: ${error}`);
  }
};

export const getTransactions = async ({ userId }: { userId: string }) => {
  try {
    const { Transaction } = await createAdminClient();

    const transactions = await Transaction.find({ userId })
      .sort({ date: -1 })
      .lean();

    return parseStringify(transactions);
  } catch (error) {
    throw new Error(`Error getting transactions: ${error}`);
  }
};
