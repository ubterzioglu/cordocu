const SESSION_COOKIE = 'auth'
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30

type SessionPayload = {
  email: string
  exp: number
  userId: string
}

function getSessionSecret() {
  const secret = process.env.AUTH_SESSION_SECRET || process.env.AUTH_TOKEN

  if (!secret) {
    throw new Error('AUTH_SESSION_SECRET or AUTH_TOKEN must be configured')
  }

  return secret
}

function encodeBase64Url(input: string) {
  const bytes = new TextEncoder().encode(input)
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('')

  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
}

function decodeBase64Url(input: string) {
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/')
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=')
  const binary = atob(padded)
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

async function signValue(value: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(getSessionSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value))
  const bytes = new Uint8Array(signature)
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('')

  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
}

export async function createAdminSession(email: string, userId: string) {
  const payload: SessionPayload = {
    email,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
    userId,
  }

  const encodedPayload = encodeBase64Url(JSON.stringify(payload))
  const signature = await signValue(encodedPayload)

  return `${encodedPayload}.${signature}`
}

export async function verifyAdminSession(session: string | undefined) {
  if (!session) return null

  const [encodedPayload, signature] = session.split('.')
  if (!encodedPayload || !signature) return null

  const expectedSignature = await signValue(encodedPayload)
  if (signature !== expectedSignature) return null

  try {
    const payload = JSON.parse(decodeBase64Url(encodedPayload)) as SessionPayload
    if (!payload.email || !payload.userId || !payload.exp) return null
    if (payload.exp <= Math.floor(Date.now() / 1000)) return null
    return payload
  } catch {
    return null
  }
}

function getRoles(metadata: Record<string, unknown> | undefined) {
  const roleValue = metadata?.role
  const rolesValue = metadata?.roles
  const roles = new Set<string>()

  if (typeof roleValue === 'string') {
    roles.add(roleValue.toLowerCase())
  }

  if (Array.isArray(rolesValue)) {
    for (const role of rolesValue) {
      if (typeof role === 'string') {
        roles.add(role.toLowerCase())
      }
    }
  }

  return roles
}

function getAllowedAdminEmails() {
  const value = process.env.ADMIN_EMAILS
  if (!value) return new Set<string>()

  return new Set(
    value
      .split(',')
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean)
  )
}

export function isAdminUser(user: {
  app_metadata?: Record<string, unknown>
  email?: string | null
  user_metadata?: Record<string, unknown>
}) {
  const roles = new Set<string>()

  getRoles(user.app_metadata).forEach((role) => roles.add(role))
  getRoles(user.user_metadata).forEach((role) => roles.add(role))

  if (roles.has('admin')) {
    return true
  }

  const email = user.email?.trim().toLowerCase()
  if (email && getAllowedAdminEmails().has(email)) {
    return true
  }

  const adminFlag = user.app_metadata?.admin ?? user.user_metadata?.admin
  return adminFlag === true
}

export const adminSessionCookie = {
  maxAge: SESSION_TTL_SECONDS,
  name: SESSION_COOKIE,
}
