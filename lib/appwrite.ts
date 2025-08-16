import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { Account, Bank, Transaction, User } from './models';
import { connectToDatabase } from './mongoose';

const JWT_SECRET = process.env.JWT_SECRET!;

interface JWTPayload {
  userId: string;
  iat?: number;
  exp?: number;
}

// Replace createAdminClient
export async function createAdminClient() {
  await connectToDatabase();
  return {
    User,
    Bank,
    Transaction,
    Account,
  };
}

// Replace createSessionClient
export async function createSessionClient() {
  try {
    const sessionCookie = cookies().get('session');
    if (!sessionCookie) {
      throw new Error('No session found');
    }

    const decoded = jwt.verify(sessionCookie.value, JWT_SECRET) as JWTPayload;

    await connectToDatabase();
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      throw new Error('User not found');
    }

    return {
      user: JSON.parse(JSON.stringify(user)),
      account: {
        get: async () => user,
      },
    };
  } catch (error) {
    throw new Error(`Session validation failed: ${error}`);
  }
}

// Session management functions
export async function createSession(userId: string) {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '30d' });

  cookies().set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    path: '/',
  });
}

export async function destroySession() {
  cookies().delete('session');
}
