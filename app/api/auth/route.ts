import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

import { isAdminUser, supabaseSessionCookies } from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ ok: true })

  response.cookies.delete('auth')
  response.cookies.set(supabaseSessionCookies.accessToken, 'dummy-token', {
    httpOnly: true,
    maxAge: 3600,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })
  response.cookies.set(supabaseSessionCookies.refreshToken, 'dummy-refresh-token', {
    httpOnly: true,
    maxAge: supabaseSessionCookies.refreshTokenMaxAge,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  return response
}