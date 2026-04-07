import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

import { isAdminUser, supabaseSessionCookies } from '@/lib/admin-auth'

const PUBLIC_PATHS = ['/login', '/api/auth']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next()
  }

  const accessToken = request.cookies.get(supabaseSessionCookies.accessToken)?.value
  const refreshToken = request.cookies.get(supabaseSessionCookies.refreshToken)?.value
  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  async function redirectToLogin() {
    const loginUrl = new URL('/login', request.url)
    const response = NextResponse.redirect(loginUrl)
    response.cookies.delete('auth')
    response.cookies.delete(supabaseSessionCookies.accessToken)
    response.cookies.delete(supabaseSessionCookies.refreshToken)
    return response
  }

  if (!accessToken) {
    return redirectToLogin()
  }

  const { data: userData, error: userError } = await supabase.auth.getUser(accessToken)

  if (!userError && userData.user && isAdminUser(userData.user)) {
    return NextResponse.next()
  }

  if (refreshToken) {
    const { data: refreshedData, error: refreshError } = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    })

    if (!refreshError && refreshedData.session && refreshedData.user && isAdminUser(refreshedData.user)) {
      const response = NextResponse.next()
      response.cookies.set(supabaseSessionCookies.accessToken, refreshedData.session.access_token, {
        httpOnly: true,
        maxAge: refreshedData.session.expires_in,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })
      response.cookies.set(supabaseSessionCookies.refreshToken, refreshedData.session.refresh_token, {
        httpOnly: true,
        maxAge: supabaseSessionCookies.refreshTokenMaxAge,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })
      return response
    }
  }

  return redirectToLogin()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
