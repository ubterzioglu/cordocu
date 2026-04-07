'use client'

export default function TakipPage() {
  return (
    <div style={{ height: 'calc(100vh - 80px)' }}>
      <iframe
        src="/takip"
        style={{ width: '100%', height: '100%', border: 'none' }}
        loading="lazy"
      />
    </div>
  )
}
