const SUPABASE_ACCESS_TOKEN_COOKIE = 'sb-access-token'
const SUPABASE_REFRESH_TOKEN_COOKIE = 'sb-refresh-token'
const SUPABASE_REFRESH_TTL_SECONDS = 60 * 60 * 24 * 30

function getRoles(metadata: Record<string, unknown> | undefined) {
  const roles = new Set<string>()
  const candidateValues = [
    metadata?.role,
    metadata?.roles,
    metadata?.user_role,
    metadata?.user_roles,
    metadata?.access_role,
    metadata?.access_roles,
  ]

  for (const value of candidateValues) {
    if (typeof value === 'string') {
      value
        .split(',')
        .map((role) => role.trim().toLowerCase())
        .filter(Boolean)
        .forEach((role) => roles.add(role))
      continue
    }

    if (Array.isArray(value)) {
      for (const role of value) {
        if (typeof role === 'string') {
          roles.add(role.trim().toLowerCase())
        }
      }
    }
  }

  return roles
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

  return false
}

export const supabaseSessionCookies = {
  accessToken: SUPABASE_ACCESS_TOKEN_COOKIE,
  refreshToken: SUPABASE_REFRESH_TOKEN_COOKIE,
  refreshTokenMaxAge: SUPABASE_REFRESH_TTL_SECONDS,
}
