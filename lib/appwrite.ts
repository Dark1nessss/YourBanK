"use server";

import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient() {
  console.log("Environment Variables:");
  console.log("NEXT_PUBLIC_APPWRITE_ENDPOINT:", process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT);
  console.log("NEXT_PUBLIC_APPWRITE_PROJECT:", process.env.NEXT_PUBLIC_APPWRITE_PROJECT);
  
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  const session = cookies().get("appwrite-session");

  if (!session || !session.value) {
    console.error("Session not found. User is not authenticated.");
    throw new Error("No session");
  }

  console.log("Session value:", session.value);
  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {
  console.log("Admin Environment Variables:");
  console.log("NEXT_PUBLIC_APPWRITE_ENDPOINT:", process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT);
  console.log("NEXT_PUBLIC_APPWRITE_PROJECT:", process.env.NEXT_PUBLIC_APPWRITE_PROJECT);
  console.log("NEXT_APPWRITE_KEY:", process.env.NEXT_APPWRITE_KEY);
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
    get user() {
      return new Users(client);
    }
  };
}

