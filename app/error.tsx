'use client';

import React from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps): React.ReactElement {
  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Hata</h1>
      <p>Bir şeyler yanlış gitti.</p>
      <pre style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '4px', textAlign: 'left', overflow: 'auto' }}>
        {error.message}
      </pre>
      <button 
        onClick={reset}
        style={{ padding: '10px 20px', marginTop: '20px', cursor: 'pointer' }}
      >
        Tekrar Dene
      </button>
    </div>
  );
}
