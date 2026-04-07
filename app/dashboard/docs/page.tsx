'use client'

const links = [
  { icon: '📁', color: '#f5a623', label: 'Ana Google Drive Klasörü', href: 'https://drive.google.com/drive/u/0/folders/1WAvBnJvh9E2jEt23aohe8P4UpbVBjVGi' },
  { icon: '📄', color: '#4a9eff', label: 'BA tarafından hazırlanan MVP Dökümanı', href: 'https://docs.google.com/document/d/1zOeZCRetchpm3S0b_eyZCabGvQsWRVBT/edit' },
  { icon: '📄', color: '#2dd4a0', label: 'Şehir Elçileri Mantığı Dökümanı', href: 'https://docs.google.com/document/d/13sJqSbpow5r3zWym8FMzw-vVFc8bud-P/edit' },
  { icon: '📊', color: '#7c6dfa', label: 'Ekip / Görev / Ücret / Hisse Taslak Dosyası', href: 'https://docs.google.com/spreadsheets/d/1iBU6P27-fEgvxOU0-lr84zM7Y7PXqn2A6yoPRGp_KTk/edit' },
  { icon: '🔗', color: '#f06b4a', label: 'Lovable Proje Linki', href: 'https://lovable.dev/projects/05c49c32-31cc-4117-bfde-5c2b4bf472a1?magic_link=mc_631ca0be-0d0a-4b8c-b067-13fecd638031' },
  { icon: '🌐', color: '#f06faa', label: 'diasporanet-connect.lovable.app', href: 'https://diasporanet-connect.lovable.app/' },
  { icon: '🔗', color: '#888', label: 'QS Networks', href: 'https://www.qualtronsinclair.com/qs-networks' },
  { icon: '🔗', color: '#888', label: 'tuerkischeaerzte.de', href: 'https://tuerkischeaerzte.de/' },
  { icon: '🔗', color: '#888', label: 'almanya101.de', href: 'https://www.almanya101.de/index.html' },
]

const auditPrompt = `You are a senior product architect and startup CTO.
Analyze the following MVP platform (CorteQS) as a complete system.
Break it down into:
1. All user types (personas)
2. All features (grouped by category)
3. Missing features (critical gaps)
4. Revenue models (existing + potential)
5. Commission structures
6. Subscription tiers
7. Dashboard structures (for each user type)
8. Backend requirements (APIs, database models)
9. UX/UI issues and improvements
10. Feature prioritization by versions (V1/V2/V3)

Then convert everything into a structured product backlog.
Be brutally honest and think like a product scaling globally.`

export default function DocsPage() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '28px 24px' }}>
      <div style={{ background: '#18181f', border: '1px solid #2a2a38', borderRadius: 12, padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#aaa', marginBottom: 14, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Dökümanlar & Linkler
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 14px',
                background: '#ffffff06',
                border: '1px solid #2a2a38',
                borderRadius: 8,
                textDecoration: 'none',
                color: '#ccc',
                fontSize: 13,
                transition: 'background 0.15s',
              }}
            >
              <span style={{ color: link.color }}>{link.icon}</span>
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div style={{ background: '#18181f', border: '1px solid #2a2a38', borderRadius: 12, padding: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#aaa', marginBottom: 14, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Audit Prompt (GPT / Claude)
        </div>
        <div
          style={{
            background: '#0a0a10',
            border: '1px solid #2a2a38',
            borderRadius: 8,
            padding: 14,
            fontSize: 12,
            color: '#aaa',
            fontFamily: 'monospace',
            lineHeight: 1.8,
            whiteSpace: 'pre-wrap',
          }}
        >
          {auditPrompt}
        </div>
      </div>
    </div>
  )
}
