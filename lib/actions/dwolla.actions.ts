'use server';

import { Client } from 'dwolla-v2';

const getEnvironment = (): 'production' | 'sandbox' => {
  const environment = process.env.DWOLLA_ENV as string;

  switch (environment) {
    case 'sandbox':
      return 'sandbox';
    case 'production':
      return 'production';
    default:
      return 'sandbox';
  }
};

const dwollaClient = new Client({
  environment: getEnvironment(),
  key: process.env.DWOLLA_KEY as string,
  secret: process.env.DWOLLA_SECRET as string,
});

// Create a Dwolla Funding Source using a Plaid Processor Token
export const addFundingSource = async ({
  dwollaCustomerId,
  processorToken,
  bankName,
}: AddFundingSourceParams) => {
  try {
    console.log('Creating Dwolla funding source with params:', {
      customerId: dwollaCustomerId,
      bankName,
      hasProcessorToken: !!processorToken,
    });

    // CORRECT: Use customer's endpoint to create funding source
    // The issue was using 'funding-sources' instead of customer-specific endpoint
    const customerUrl = `customers/${dwollaCustomerId}/funding-sources`;

    const requestBody = {
      plaidToken: processorToken,
      name: bankName,
    };

    console.log('Dwolla API call:', {
      endpoint: customerUrl,
      body: requestBody,
    });

    const request = await dwollaClient.post(customerUrl, requestBody);

    if (request.headers && request.headers.get('location')) {
      const fundingSourceUrl = request.headers.get('location');
      console.log('✅ Dwolla funding source created:', fundingSourceUrl);
      return fundingSourceUrl;
    } else {
      console.error('❌ No location header in Dwolla response');
      throw new Error('No funding source URL returned from Dwolla');
    }
  } catch (error: any) {
    console.error('❌ Dwolla funding source creation failed:', {
      error: error.message,
      body: error.body,
      statusCode: error.statusCode,
      headers: error.headers,
    });

    // Log detailed error information
    if (error.body && error.body._embedded && error.body._embedded.errors) {
      console.error('Dwolla API errors:', error.body._embedded.errors);
    }

    throw new Error(
      `Creating a Funding Source Failed: ${JSON.stringify(error.body || error.message)}`
    );
  }
};

// Create a Dwolla Customer
export const createDwollaCustomer = async (
  newCustomer: NewDwollaCustomerParams
): Promise<string> => {
  try {
    console.log('Creating Dwolla customer:', {
      firstName: newCustomer.firstName,
      lastName: newCustomer.lastName,
      email: newCustomer.email,
      type: newCustomer.type,
    });

    // Ensure all required fields are properly formatted
    const customerData = {
      firstName: newCustomer.firstName.trim(),
      lastName: newCustomer.lastName.trim(),
      email: newCustomer.email.trim().toLowerCase(),
      type: newCustomer.type || 'personal',
      address1: newCustomer.address1.trim(),
      city: newCustomer.city.trim(),
      state: newCustomer.state.trim().toUpperCase(),
      postalCode: newCustomer.postalCode.trim(),
      dateOfBirth: newCustomer.dateOfBirth, // Format: YYYY-MM-DD
      ssn: newCustomer.ssn.replace(/\D/g, ''), // Remove non-digits
    };

    console.log('Dwolla customer data:', {
      ...customerData,
      ssn: '***masked***', // Don't log SSN
    });

    const request = await dwollaClient.post('customers', customerData);

    if (request.headers && request.headers.get('location')) {
      const dwollaCustomerUrl = request.headers.get('location');
      console.log('✅ Dwolla customer created:', dwollaCustomerUrl);
      return dwollaCustomerUrl!;
    } else {
      throw new Error('No customer URL returned from Dwolla');
    }
  } catch (error: any) {
    console.error('❌ Dwolla customer creation failed:', {
      error: error.message,
      body: error.body,
      statusCode: error.statusCode,
    });

    // Log detailed error information
    if (error.body && error.body._embedded && error.body._embedded.errors) {
      console.error('Dwolla API errors:', error.body._embedded.errors);
    }

    throw new Error(
      `Failed to create Dwolla customer: ${JSON.stringify(error.body || error.message)}`
    );
  }
};

// Create a Transfer to another Dwolla Customer
export const createTransfer = async ({
  sourceFundingSourceUrl,
  destinationFundingSourceUrl,
  amount,
}: TransferParams) => {
  try {
    const transferData = {
      _links: {
        source: {
          href: sourceFundingSourceUrl,
        },
        destination: {
          href: destinationFundingSourceUrl,
        },
      },
      amount: {
        currency: 'USD',
        value: amount,
      },
    };

    console.log('Creating Dwolla transfer:', {
      source: sourceFundingSourceUrl,
      destination: destinationFundingSourceUrl,
      amount: transferData.amount,
    });

    const request = await dwollaClient.post('transfers', transferData);

    if (request.headers && request.headers.get('location')) {
      const transferUrl = request.headers.get('location');
      console.log('✅ Dwolla transfer created:', transferUrl);
      return transferUrl;
    } else {
      throw new Error('No transfer URL returned from Dwolla');
    }
  } catch (error: any) {
    console.error('❌ Dwolla transfer failed:', {
      error: error.message,
      body: error.body,
      statusCode: error.statusCode,
    });

    throw new Error(
      `Transfer fund failed: ${JSON.stringify(error.body || error.message)}`
    );
  }
};
