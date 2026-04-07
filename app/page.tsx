'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage(): React.ReactElement {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setError(data.error || 'Authentication failed');
        setIsLoading(false);
        return;
      }

      router.push('/corteqs_dashboard.html');
    } catch (err) {
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  }

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '30px',
    textAlign: 'center',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '16px',
    boxSizing: 'border-box',
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  const errorStyle: React.CSSProperties = {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    padding: '12px',
    borderRadius: '4px',
    marginBottom: '16px',
    fontSize: '14px',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>CorteQS Dashboard</h1>
        <form onSubmit={handleSubmit}>
          {error && <div style={errorStyle}>{error}</div>}
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e): void => setPassword(e.currentTarget.value)}
            style={inputStyle}
            disabled={isLoading}
          />
          <button type="submit" style={buttonStyle} disabled={isLoading}>
            {isLoading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
