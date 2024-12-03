// app/api/session/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export async function GET(req: NextRequest) {
  try {
    // Recupera o cookie `auth_token`
    const sessionCookie = cookies().get('auth_token');

    if (!sessionCookie) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Decodifica e valida o token JWT
    let decodedToken;
    try {
      decodedToken = jwt.verify(sessionCookie.value, JWT_SECRET);
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Busca o usuário no banco de dados usando o ID decodificado do token
    const user = await prisma.user.findUnique({
      where: { id: decodedToken.id },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Retorna os dados do usuário
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user session:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
