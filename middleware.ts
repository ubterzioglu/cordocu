import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_PATHS = ['/', '/api/auth']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isPublic = PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'))
  const authCookie = request.cookies.get('auth')?.value

  if (!isPublic && authCookie !== 'true') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (pathname === '/' && authCookie === 'true') {
    return NextResponse.redirect(new URL('/takip', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
