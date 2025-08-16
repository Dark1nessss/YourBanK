import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET!;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public routes
  const publicRoutes = ['/sign-in', '/sign-up', '/'];
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Check for session token
  const token = req.cookies.get('session')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch {
    // Invalid token, redirect to sign-in
    const response = NextResponse.redirect(new URL('/sign-in', req.url));
    response.cookies.delete('session');
    return response;
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/link-account/:path*',
    '/my-banks/:path*',
    '/transaction-history/:path*',
    '/payment-transfer/:path*',
  ],
};
