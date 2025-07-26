'use server';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { connectToDatabase, getUsersCollection } from '../mongodb';
import { parseStringify } from '../utils';

const JWT_SECRET = process.env.JWT_SECRET!;

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
  try {
    await connectToDatabase();
    const usersCollection = getUsersCollection();

    const user = await usersCollection.findOne({ _id: userId });

    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async ({ email, password }: signInProps) => {
  try {
    await connectToDatabase();
    const usersCollection = getUsersCollection();

    // Find user by email
    const user = await usersCollection.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set cookie
    cookies().set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });

    return parseStringify({
      ...user,
      password: undefined, // Don't return password
    });
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const signUp = async ({ password, ...userData }: SignUpParams) => {
  const { email, firstName, lastName } = userData;
  let newUserAccount;

  try {
    await connectToDatabase();
    const usersCollection = getUsersCollection();

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists with this email address');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user document
    const newUser = {
      email,
      firstName,
      lastName,
      password: hashedPassword,
      address1: userData.address1,
      city: userData.city,
      state: userData.state,
      postalCode: userData.postalCode,
      dateOfBirth: userData.dateOfBirth,
      ssn: userData.ssn,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Insert user
    const result = await usersCollection.insertOne(newUser);

    // Get created user
    newUserAccount = await usersCollection.findOne({ _id: result.insertedId });

    // Create JWT token for auto-login
    const token = jwt.sign(
      { userId: newUserAccount!._id, email: newUserAccount!.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set cookie
    cookies().set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });

    return parseStringify({
      ...newUserAccount,
      password: undefined, // Don't return password
    });
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const getLoggedInUser = async () => {
  try {
    const token = cookies().get('auth-token')?.value;
    if (!token) {
      return null;
    }

    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    await connectToDatabase();
    const usersCollection = getUsersCollection();

    const user = await usersCollection.findOne({ _id: decoded.userId });
    if (!user) {
      return null;
    }

    return parseStringify({
      ...user,
      password: undefined, // Don't return password
    });
  } catch (error) {
    console.error('Error getting logged in user:', error);
    return null;
  }
};

export const logoutAccount = async () => {
  try {
    cookies().delete('auth-token');
    redirect('/sign-in');
  } catch (error) {
    console.error('Error logging out:', error);
    return null;
  }
};

export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user._id!,
      },
      client_name: `${user.firstName} ${user.lastName}`,
      products: ['auth', 'transactions'],
      language: 'en',
      country_codes: ['US'],
    };

    const response = await plaidClient.linkTokenCreate(tokenParams);
    return parseStringify({ linkToken: response.data.link_token });
  } catch (error) {
    console.error('Error creating link token:', error);
    throw error;
  }
};
