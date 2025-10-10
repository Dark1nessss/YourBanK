import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { cookies } from 'next/headers';

interface JWTPayload {
  userId: string;
  iat?: number;
  exp?: number;
}

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Global connection cache for serverless
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Replace createAdminClient
export async function createAdminClient() {
  await connectToDatabase();

  // Import models
  const { User, Bank, Transaction, Account } = await import('./models');

  return {
    User,
    Bank,
    Transaction,
    Account,
  };
}

// Replace createSessionClient
export async function createSessionClient() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('session')?.value;

  if (!sessionToken) {
    throw new Error('No session found');
  }

  try {
    // Verify JWT token
    const payload = jwt.verify(
      sessionToken,
      process.env.JWT_SECRET!
    ) as JWTPayload;

    await connectToDatabase();
    const { User, Bank, Transaction, Account } = await import('./models');

    // Get user from database
    const user = await User.findById(payload.userId);

    if (!user) {
      throw new Error('User not found');
    }

    return {
      user,
      userId: user._id,
      User,
      Bank,
      Transaction,
      Account,
    };
  } catch (error) {
    throw new Error('Invalid session', { cause: error });
  }
}

// Helper function to create JWT session
export async function createSession(userId: string) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });

  // Set cookie
  const cookieStore = cookies();
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return token;
}

// Helper function to destroy session
export async function destroySession() {
  const cookieStore = cookies();
  cookieStore.delete('session');
}

// Declare global mongoose cache for TypeScript
declare global {
  var mongoose: {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
  };
}
