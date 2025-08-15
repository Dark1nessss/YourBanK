import { FilterQuery, Types, UpdateQuery } from 'mongoose';
import type { IAccount, IBank, ITransaction, IUser } from './models';
import { Account, Bank, Transaction, User } from './models';

// Helper functions to replace Appwrite Query operations
export class MongoQuery {
  static equal(
    field: string,
    value: string | number | boolean
  ): FilterQuery<unknown> {
    return { [field]: value };
  }

  static notEqual(
    field: string,
    value: string | number | boolean
  ): FilterQuery<unknown> {
    return { [field]: { $ne: value } };
  }

  static contains(field: string, value: string): FilterQuery<unknown> {
    return { [field]: { $regex: value, $options: 'i' } };
  }

  static between(
    field: string,
    min: number | Date,
    max: number | Date
  ): FilterQuery<unknown> {
    return { [field]: { $gte: min, $lte: max } };
  }

  static orderDesc(field: string): Record<string, -1> {
    return { [field]: -1 };
  }

  static orderAsc(field: string): Record<string, 1> {
    return { [field]: 1 };
  }

  static limit(count: number): number {
    return count;
  }
}

// Helper to generate unique IDs (replacing Appwrite ID.unique())
export class ID {
  static unique(): string {
    return new Types.ObjectId().toString();
  }
}

// Database operation helpers
export class DatabaseOps {
  // Replace Appwrite listDocuments
  static async listUsers(
    query: FilterQuery<IUser> = {},
    limit = 100
  ): Promise<IUser[]> {
    return await User.find(query).limit(limit).sort({ createdAt: -1 });
  }

  static async listBanks(
    query: FilterQuery<IBank> = {},
    limit = 100
  ): Promise<IBank[]> {
    return await Bank.find(query).limit(limit).populate('userId');
  }

  static async listTransactions(
    query: FilterQuery<ITransaction> = {},
    limit = 100
  ): Promise<ITransaction[]> {
    return (await Transaction.find(query)
      .limit(limit)
      .populate('userId')
      .populate('bankId')
      .sort({ date: -1 })) as ITransaction[];
  }

  static async listAccounts(
    query: FilterQuery<IAccount> = {},
    limit = 100
  ): Promise<IAccount[]> {
    return await Account.find(query).limit(limit).populate('userId');
  }

  // Replace Appwrite getDocument
  static async getUser(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  static async getBank(id: string): Promise<IBank | null> {
    return (await Bank.findById(id).populate('userId')) as IBank | null;
  }

  static async getTransaction(id: string): Promise<ITransaction | null> {
    return (await Transaction.findById(id).populate('userId')).populate(
      'bankId'
    );
  }

  static async getAccount(id: string): Promise<IAccount | null> {
    return (await Account.findById(id)).populate('userId');
  }

  // Replace Appwrite createDocument
  static async createUser(data: Partial<IUser>): Promise<IUser> {
    const user = new User(data);
    return await user.save();
  }

  static async createBank(data: Partial<IBank>): Promise<IBank> {
    const bank = new Bank(data);
    return await bank.save();
  }

  static async createTransaction(
    data: Partial<ITransaction>
  ): Promise<ITransaction> {
    const transaction = new Transaction(data);
    return await transaction.save();
  }

  static async createAccount(data: Partial<IAccount>): Promise<IAccount> {
    const account = new Account(data);
    return await account.save();
  }

  // Replace Appwrite updateDocument
  static async updateUser(
    id: string,
    data: UpdateQuery<IUser>
  ): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, data, { new: true });
  }

  static async updateBank(
    id: string,
    data: UpdateQuery<IBank>
  ): Promise<IBank | null> {
    return await Bank.findByIdAndUpdate(id, data, { new: true });
  }

  static async updateTransaction(
    id: string,
    data: UpdateQuery<ITransaction>
  ): Promise<ITransaction | null> {
    return await Transaction.findByIdAndUpdate(id, data, { new: true });
  }

  static async updateAccount(
    id: string,
    data: UpdateQuery<IAccount>
  ): Promise<IAccount | null> {
    return await Account.findByIdAndUpdate(id, data, { new: true });
  }

  // Replace Appwrite deleteDocument
  static async deleteUser(id: string): Promise<IUser | null> {
    return (await User.findByIdAndDelete(id).lean()) as IUser | null;
  }

  static async deleteBank(id: string): Promise<IBank | null> {
    return (await Bank.findByIdAndDelete(id).lean()) as IBank | null;
  }

  static async deleteTransaction(id: string): Promise<ITransaction | null> {
    return (await Transaction.findByIdAndDelete(
      id
    ).lean()) as ITransaction | null;
  }

  static async deleteAccount(id: string): Promise<IAccount | null> {
    return (await Account.findByIdAndDelete(id).lean()) as IAccount | null;
  }
}
