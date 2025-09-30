import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

// NOTE: JWT_SECRET should be set in your .env file
const JWT_SECRET = process.env.JWT_ACCESS_SECRET || 'marizza123'; 

const PUBLIC_PATHS = [
  '/',
  '/login',
];

// Helper to check if a pathname starts with a public path
function isPublicPath(pathname: string): boolean {
  // Checks for exact match ('/') or paths starting with the public path followed by a slash ('/about/team')
  return PUBLIC_PATHS.some(path => pathname === path || pathname.startsWith(path + '/'));
}

export function middleware(req: NextRequest) {
  // Check for the refresh_token cookie (assuming this is your persistent session indicator)
  const token = req.cookies.get('refresh_token')?.value; 
  const pathname = req.nextUrl.pathname;

  if (token && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
    return NextResponse.redirect(new URL('/profile', req.url));
  }

  if (!token && !isPublicPath(pathname)) {
    console.log(`Middleware: No token found. Redirecting protected path (${pathname}) to login.`);
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If none of the above conditions trigger a redirect, allow the request to proceed.
  return NextResponse.next();
}


export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|assets|images).*)', 
  ], 
};
