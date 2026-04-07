'use client'

export default function DraftNotPage() {
  return (
    <div style={{ height: 'calc(100vh - 80px)' }}>
      <iframe
        src="/draft-not"
        style={{ width: '100%', height: '100%', border: 'none' }}
        loading="lazy"
      />
    </div>
  )
}
