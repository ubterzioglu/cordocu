import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { password } = await request.json()
  const validPassword = process.env.APP_PASSWORD

  if (!validPassword || password !== validPassword) {
    return NextResponse.json({ error: 'Yanlış şifre' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set('auth', 'true', {
    httpOnly: true,
    maxAge: 86400,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  return response
}