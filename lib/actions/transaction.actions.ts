'use server';

import { connectToDatabase, getTransactionsCollection } from '../mongodb';
import { parseStringify } from '../utils';

export const createTransaction = async (
  transaction: CreateTransactionProps
) => {
  try {
    await connectToDatabase();
    const transactionsCollection = getTransactionsCollection();

    const newTransaction = {
      channel: 'online',
      category: ['Transfer'],
      paymentChannel: 'online',
      subcategory: ['default'],
      type: 'debit',
      image: undefined,
      date: new Date(),
      userId: transaction.senderId,
      bankId: transaction.senderBankId,
      accountId: transaction.senderBankId,
      ...transaction,
      amount: parseFloat(transaction.amount),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await transactionsCollection.insertOne(newTransaction);
    const createdTransaction = await transactionsCollection.findOne({
      _id: result.insertedId,
    });

    return parseStringify(createdTransaction);
  } catch (error) {
    throw new Error(`Failed to create transaction: ${error}`);
  }
};

export const getTransactionsByBankId = async ({
  bankId,
}: getTransactionsByBankIdProps) => {
  try {
    await connectToDatabase();
    const transactionsCollection = getTransactionsCollection();

    const senderTransactions = await transactionsCollection
      .find({ senderBankId: bankId })
      .toArray();
    const receiverTransactions = await transactionsCollection
      .find({ receiverBankId: bankId })
      .toArray();

    const transactions = {
      total: senderTransactions.length + receiverTransactions.length,
      documents: [...senderTransactions, ...receiverTransactions],
    };

    return parseStringify(transactions);
  } catch (error) {
    throw new Error(`Failed to get transactions: ${error}`);
  }
};
