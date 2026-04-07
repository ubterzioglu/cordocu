import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/', '/api/auth', '/corteqs_dashboard.html', '/status.html', '/favicon.ico'];

export function middleware(request: NextRequest): NextResponse | undefined {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.includes(pathname)) {
    return undefined;
  }

  // Check for auth cookie
  const authCookie = request.cookies.get('auth')?.value;

  if (!authCookie) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return undefined;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.html).*)',
  ],
};
