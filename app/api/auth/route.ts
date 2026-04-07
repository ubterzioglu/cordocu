import { NextRequest, NextResponse } from 'next/server';

interface AuthRequest {
  password?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = (await request.json()) as AuthRequest;
    const { password } = body;

    const appPassword = process.env.APP_PASSWORD;
    if (!appPassword) {
      throw new Error('Missing APP_PASSWORD');
    }

    if (!password) {
      return NextResponse.json({ error: 'Password required' }, { status: 400 });
    }

    if (password !== appPassword) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set('auth', 'true', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
