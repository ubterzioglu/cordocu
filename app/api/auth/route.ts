import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

import { adminSessionCookie, createAdminSession, isAdminUser } from '@/lib/admin-auth'

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

  if (error || !data.user?.email) {
    return NextResponse.json({ error: 'Gecersiz giris bilgileri' }, { status: 401 })
  }

  if (!isAdminUser(data.user)) {
    await supabase.auth.signOut()
    return NextResponse.json({ error: 'Bu hesap admin olarak yetkili degil' }, { status: 403 })
  }

  const session = await createAdminSession(data.user.email, data.user.id)
  const response = NextResponse.json({ ok: true })

  response.cookies.set(adminSessionCookie.name, session, {
    httpOnly: true,
    maxAge: adminSessionCookie.maxAge,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  return response
}
