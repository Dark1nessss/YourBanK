// dwolla.actions.ts - Final version for Dwolla actions with MongoDB

import { PrismaClient } from "@prisma/client";
import { ObjectId } from "bson";
import dwolla from "dwolla-v2";
import { cookies } from "next/headers";

const prisma = new PrismaClient();
const dwollaClient = new dwolla.Client({
  key: process.env.DWOLLA_APP_KEY,
  secret: process.env.DWOLLA_APP_SECRET,
  environment: "sandbox", // Change to "production" when ready
});

// Function to create a customer in Dwolla
export const createCustomer = async (
  firstName: string,
  lastName: string,
  email: string
) => {
  try {
    const customer = await dwollaClient.post("customers", {
      firstName,
      lastName,
      email,
    });
    return customer.body;
  } catch (error) {
    throw new Error(`Error creating customer: ${error.message}`);
  }
};

// Function to get a customer from Dwolla
export const getCustomer = async (customerId: string) => {
  try {
    const customer = await dwollaClient.get(`customers/${customerId}`);
    return customer.body;
  } catch (error) {
    throw new Error(`Error fetching customer: ${error.message}`);
  }
};

// Function to create a funding source
export const createFundingSource = async (
  customerId: string,
  bankAccountId: string,
  routingNumber: string,
  accountNumber: string,
  bankName: string
) => {
  try {
    const fundingSource = await dwollaClient.post(`customers/${customerId}/funding-sources`, {
      routingNumber,
      accountNumber,
      bankName,
    });
    return fundingSource.body;
  } catch (error) {
    throw new Error(`Error creating funding source: ${error.message}`);
  }
};

// Function to get funding sources for a customer
export const getFundingSources = async (customerId: string) => {
  try {
    const fundingSources = await dwollaClient.get(`customers/${customerId}/funding-sources`);
    return fundingSources.body;
  } catch (error) {
    throw new Error(`Error fetching funding sources: ${error.message}`);
  }
};

// Function to initiate a transfer
export const initiateTransfer = async (
  sourceFundingSourceId: string,
  destinationFundingSourceId: string,
  amount: string,
  currency: string = "USD"
) => {
  try {
    const transfer = await dwollaClient.post("transfers", {
      _links: {
        source: {
          href: `https://api-sandbox.dwolla.com/funding-sources/${sourceFundingSourceId}`,
        },
        destination: {
          href: `https://api-sandbox.dwolla.com/funding-sources/${destinationFundingSourceId}`,
        },
      },
      amount: {
        currency,
        value: amount,
      },
    });
    return transfer.body;
  } catch (error) {
    throw new Error(`Error initiating transfer: ${error.message}`);
  }
};

// Function to get a transfer from Dwolla
export const getTransfer = async (transferId: string) => {
  try {
    const transfer = await dwollaClient.get(`transfers/${transferId}`);
    return transfer.body;
  } catch (error) {
    throw new Error(`Error fetching transfer: ${error.message}`);
  }
};

// Function to delete a funding source
export const deleteFundingSource = async (fundingSourceId: string) => {
  try {
    await dwollaClient.post(`funding-sources/${fundingSourceId}`, {
      removed: true,
    });
    return { message: "Funding source deleted successfully" };
  } catch (error) {
    throw new Error(`Error deleting funding source: ${error.message}`);
  }
};