'use server';

import { CountryCode } from 'plaid';
import { plaidClient } from '../plaid';
import { parseStringify } from '../utils';
import { getTransactionsByBankId } from './transaction.actions';
import { getBank, getBanks } from './user.actions';

// Get multiple bank accounts
export const getAccounts = async ({ userId }: getAccountsProps) => {
  try {
    // Get banks from MongoDB
    const banks = await getBanks({ userId });

    const accounts = await Promise.all(
      banks?.map(async (bank: Bank) => {
        // Get each account info from plaid
        const accountsResponse = await plaidClient.accountsGet({
          access_token: bank.accessToken,
        });
        const accountData = accountsResponse.data.accounts[0];

        // Get institution info from plaid
        const institution = await getInstitution({
          institutionId: accountsResponse.data.item.institution_id!,
        });

        const account: Account = {
          id: accountData.account_id,
          availableBalance: accountData.balances.available!,
          currentBalance: accountData.balances.current!,
          institutionId: institution.institution_id,
          name: accountData.name,
          officialName: accountData.official_name ?? '',
          mask: accountData.mask!,
          type: accountData.type as string,
          subtype: accountData.subtype! as string,
          appwriteItemId: bank._id.toString(), // Keep for compatibility
          shareableId: bank.shareableId,
        };

        return account;
      })
    );

    const totalBanks = accounts.length;
    const totalCurrentBalance = accounts.reduce(
      (total: number, account: Account) => {
        return total + account.currentBalance;
      },
      0
    );

    return parseStringify({ data: accounts, totalBanks, totalCurrentBalance });
  } catch (error) {
    throw new Error(`An error occurred while getting the accounts: ${error}`);
  }
};

// Get one bank account
export const getAccount = async ({ appwriteItemId }: getAccountProps) => {
  try {
    // Get bank from MongoDB
    const bank = await getBank({ documentId: appwriteItemId });

    // Add null check
    if (!bank) {
      throw new Error('Bank not found');
    }

    // Get account info from plaid
    const accountsResponse = await plaidClient.accountsGet({
      access_token: bank.accessToken,
    });
    const accountData = accountsResponse.data.accounts[0];

    // Get transfer transactions from MongoDB
    const transferTransactionsData = await getTransactionsByBankId({
      bankId: bank._id.toString(),
    });

    const transferTransactions = transferTransactionsData.documents.map(
      (transferData: Transaction) => ({
        id: transferData._id,
        name: transferData.name!,
        amount: transferData.amount!,
        date: transferData.createdAt,
        paymentChannel: transferData.channel,
        category: transferData.category,
        type:
          transferData.senderBankId === bank._id.toString()
            ? 'debit'
            : 'credit',
      })
    );

    // Get institution info from plaid - add null check
    const institutionId = accountsResponse.data.item.institution_id;
    if (!institutionId) {
      throw new Error('Institution ID not found');
    }

    const institution = await getInstitution({
      institutionId,
    });

    const transactions = await getTransactions({
      accessToken: bank.accessToken,
    });

    const account: Account = {
      id: accountData.account_id,
      availableBalance: accountData.balances.available!,
      currentBalance: accountData.balances.current!,
      institutionId: institution.institution_id,
      name: accountData.name,
      officialName: accountData.official_name ?? '',
      mask: accountData.mask!,
      type: accountData.type as string,
      subtype: accountData.subtype! as string,
      appwriteItemId: bank._id.toString(),
    };

    // Sort transactions by date such that the most recent transaction is first
    const allTransactions = [...transactions, ...transferTransactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return parseStringify({
      data: account,
      transactions: allTransactions,
    });
  } catch (error) {
    throw new Error(`An error occurred while getting the account: ${error}`);
  }
};

// Get bank info
export const getInstitution = async ({
  institutionId,
}: getInstitutionProps) => {
  try {
    const institutionResponse = await plaidClient.institutionsGetById({
      institution_id: institutionId,
      country_codes: ['US'] as CountryCode[],
    });

    const institution = institutionResponse.data.institution;

    return parseStringify(institution);
  } catch (error) {
    throw new Error(
      `An error occurred while getting the institution: ${error}`
    );
  }
};

// Get transactions
export const getTransactions = async ({
  accessToken,
}: getTransactionsProps) => {
  let hasMore = true;
  let transactions: PlaidTransaction[] = [];

  try {
    // Iterate through each page of new transaction updates for item
    while (hasMore) {
      const response = await plaidClient.transactionsSync({
        access_token: accessToken,
      });

      const data = response.data;

      transactions = response.data.added.map(
        (transaction): PlaidTransaction => ({
          id: transaction.transaction_id,
          name: transaction.name,
          paymentChannel: transaction.payment_channel,
          type: transaction.payment_channel,
          accountId: transaction.account_id,
          amount: transaction.amount,
          pending: transaction.pending,
          category: transaction.category ? transaction.category[0] : '',
          date: transaction.date,
          image: transaction.logo_url ?? undefined,
        })
      );

      hasMore = data.has_more;
    }

    return parseStringify(transactions);
  } catch (error) {
    throw new Error(
      `An error occurred while getting the transactions: ${error}`
    );
  }
};
