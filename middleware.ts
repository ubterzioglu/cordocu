import { NextRequest, NextResponse } from 'next/server'

import { adminSessionCookie, verifyAdminSession } from '@/lib/admin-auth'

const PUBLIC_PATHS = ['/login', '/api/auth']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  const authCookie = request.cookies.get(adminSessionCookie.name)?.value
  const session = await verifyAdminSession(authCookie)

  if (!session) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
