import mongoose from 'mongoose';

// User Schema
const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address1: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    ssn: { type: String, required: true },
    dwollaCustomerId: { type: String },
    dwollaCustomerUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

// Bank Schema
const BankSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    accountId: { type: String, required: true, unique: true },
    accessToken: { type: String, required: true },
    fundingSourceUrl: { type: String },
    name: { type: String, required: true },
    officialName: { type: String, required: true },
    type: { type: String, required: true },
    subtype: { type: String, required: true },
    shareableId: { type: String, required: true },
    mask: { type: String, required: true },
    currentBalance: { type: Number, default: 0 },
    availableBalance: { type: Number, default: 0 },
    institutionId: { type: String, required: true },
    bankId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Transaction Schema
const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bankId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bank',
      required: true,
    },
    accountId: { type: String, required: true },
    amount: { type: Number, required: true },
    name: { type: String, required: true },
    paymentChannel: { type: String, required: true },
    category: [{ type: String }],
    subcategory: [{ type: String }],
    type: { type: String, required: true },
    date: { type: Date, required: true },
    image: { type: String },
    senderBankId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bank' },
    receiverBankId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bank' },
    channel: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Account Schema (for Plaid accounts)
const AccountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    accountId: { type: String, required: true },
    availableBalance: { type: Number, required: true },
    currentBalance: { type: Number, required: true },
    institutionId: { type: String, required: true },
    name: { type: String, required: true },
    officialName: { type: String, required: true },
    mask: { type: String, required: true },
    type: { type: String, required: true },
    subtype: { type: String, required: true },
    itemId: { type: String, required: true }, // Plaid item ID
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
UserSchema.index({ email: 1 });
BankSchema.index({ userId: 1 });
BankSchema.index({ accountId: 1 });
TransactionSchema.index({ userId: 1 });
TransactionSchema.index({ bankId: 1 });
TransactionSchema.index({ date: -1 });
AccountSchema.index({ userId: 1 });
AccountSchema.index({ accountId: 1 });

// Export models
export const User = mongoose.models.User || mongoose.model('User', UserSchema);
export const Bank = mongoose.models.Bank || mongoose.model('Bank', BankSchema);
export const Transaction =
  mongoose.models.Transaction ||
  mongoose.model('Transaction', TransactionSchema);
export const Account =
  mongoose.models.Account || mongoose.model('Account', AccountSchema);

// TypeScript interfaces
export interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
  dwollaCustomerId?: string;
  dwollaCustomerUrl?: string;
}

export interface IBank extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  accountId: string;
  accessToken: string;
  fundingSourceUrl?: string;
  name: string;
  officialName: string;
  type: string;
  subtype: string;
  shareableId: string;
  mask: string;
  currentBalance: number;
  availableBalance: number;
  institutionId: string;
  bankId: string;
}

export interface ITransaction extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  bankId: mongoose.Types.ObjectId;
  accountId: string;
  amount: number;
  name: string;
  paymentChannel: string;
  category: string[];
  subcategory: string[];
  type: string;
  date: Date;
  image?: string;
  senderBankId?: mongoose.Types.ObjectId;
  receiverBankId?: mongoose.Types.ObjectId;
  channel: string;
}

export interface IAccount extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  accountId: string;
  availableBalance: number;
  currentBalance: number;
  institutionId: string;
  name: string;
  officialName: string;
  mask: string;
  type: string;
  subtype: string;
  itemId: string;
}
