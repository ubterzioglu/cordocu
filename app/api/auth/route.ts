import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

import { isAdminUser, supabaseSessionCookies } from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()
  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : ''

  if (!normalizedEmail || !password) {
    return NextResponse.json({ error: 'E-posta ve sifre gerekli' }, { status: 400 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({ error: 'Supabase auth ayarlari eksik' }, { status: 500 })
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  const { data, error } = await supabase.auth.signInWithPassword({ email: normalizedEmail, password })

  if (error || !data.user?.email || !data.session?.access_token || !data.session.refresh_token) {
    return NextResponse.json({ error: 'Gecersiz giris bilgileri' }, { status: 401 })
  }

  if (!isAdminUser(data.user)) {
    return NextResponse.json({ error: 'Bu hesap admin olarak yetkili degil' }, { status: 403 })
  }

  const response = NextResponse.json({ ok: true })

  response.cookies.delete('auth')
  response.cookies.set(supabaseSessionCookies.accessToken, data.session.access_token, {
    httpOnly: true,
    maxAge: data.session.expires_in,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })
  response.cookies.set(supabaseSessionCookies.refreshToken, data.session.refresh_token, {
    httpOnly: true,
    maxAge: supabaseSessionCookies.refreshTokenMaxAge,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  return response
}
