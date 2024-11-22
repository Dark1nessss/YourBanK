// app/api/session/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

// Handler to get the logged-in user using cookies
export async function GET(req: NextRequest) {
  try {
    const sessionCookie = cookies().get('user-session');

    if (!sessionCookie) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { sessionId: sessionCookie.value },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user session:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
