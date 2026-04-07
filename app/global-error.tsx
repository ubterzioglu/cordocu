'use client';

import React from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps): React.ReactElement {
  return (
    <html>
      <body>
        <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
          <h1>Bir hata oluştu</h1>
          <p>Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.</p>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '4px', textAlign: 'left', overflow: 'auto' }}>
            {error.message}
          </pre>
          <button 
            onClick={reset}
            style={{ padding: '10px 20px', marginTop: '20px', cursor: 'pointer' }}
          >
            Yeniden Dene
          </button>
        </div>
      </body>
    </html>
  );
}
