interface AdminAuthCredentials {
  email: string;
  password: string;
}

export async function validateAdminAuth(credentials: AdminAuthCredentials): Promise<boolean> {
  const { email, password } = credentials;

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error('Missing admin credentials');
  }

  return email === adminEmail && password === adminPassword;
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
