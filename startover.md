# CorteQS - Comprehensive Project Documentation

**Last Updated:** April 7, 2026

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Development Guidelines (AGENTS.md)](#development-guidelines)
3. [HTML Dashboard Content](#html-dashboard-content)
4. [Project Status Dashboard](#project-status)

---

## Project Overview

**cordocu** is a Next.js 14 TypeScript application serving as the dashboard for CorteQS project status and management. It uses React 18, Supabase for backend services, and inline styles (no CSS framework).

### Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript
- **Styling:** Inline styles (no CSS framework)
- **Backend:** Supabase (PostgreSQL)
- **Authentication:** Next.js Middleware + Cookie-based

---

## Development Guidelines

### Build, Test & Lint Commands

#### Development
```bash
npm run dev
```
Starts the Next.js dev server on `http://localhost:3000`.

#### Build
```bash
npm run build
```
Compiles TypeScript and generates optimized Next.js production build.

#### Production Start
```bash
npm start
```
Runs the built application (requires `npm run build` first).

#### Type Checking
```bash
npx tsc --noEmit
```
Validates TypeScript without emitting output.

**Note:** No test or linting scripts are currently configured. Add `@testing-library/react`, `vitest`, and `eslint` if test coverage is needed.

### Code Style Guidelines

#### TypeScript & Type Safety

- **Strict mode enabled** (`"strict": true` in `tsconfig.json`)
- Always use explicit return types on functions:
  ```typescript
  async function handleSubmit(e: React.FormEvent): Promise<void> { }
  ```
- Use `React.FormEvent`, `React.ChangeEvent`, etc. for event handlers
- Import types from `next/server` for middleware/API handlers: `NextRequest`, `NextResponse`
- Avoid `any`; use `unknown` with type guards when necessary

#### Imports & File Structure

- **ESM imports** (no CommonJS)
- Path alias `@/*` points to root directory
- Organize imports in groups (Next.js, React, then local):
  ```typescript
  import { NextRequest, NextResponse } from 'next/server'
  import { useState } from 'react'
  import { supabase } from '@/lib/supabase'
  ```
- Server components: no `'use client'` directive
- Client components: add `'use client'` at the top

#### Formatting & Naming

- **Line length**: No hard limit; readability first
- **Quotes**: Single quotes for strings
- **Semicolons**: Use them consistently
- **Function names**: camelCase for functions; PascalCase for React components
- **Variable names**: camelCase; avoid abbreviations (e.g., `password` not `pwd`)
- **Constants**: camelCase if file-scoped; `UPPER_SNAKE_CASE` for global constants

#### Component Structure (React/Next.js)

- Define components as default exports when single-export files:
  ```typescript
  export default function HomePage() { }
  ```
- Use React hooks for state: `useState`, `useRouter`, `useCallback`
- Extract inline styles to objects for readability if repeated
- Keep JSX readable; inline small style objects are acceptable for one-off uses

#### Error Handling

- **API routes**: Return `NextResponse.json()` with proper status codes (401, 404, 500)
- **Client-side**: Catch fetch errors; set error state for display
- **Environment variables**: Always check with guards before use:
  ```typescript
  const token = process.env.NEXT_PUBLIC_TOKEN
  if (!token) throw new Error('Missing NEXT_PUBLIC_TOKEN')
  ```
- **Async operations**: Wrap in try-catch or `.catch()` with meaningful error messages

#### Environment & Secrets

- Prefix **public** env vars with `NEXT_PUBLIC_` (accessible in browser)
- Private env vars (no prefix) are server-only
- Store secrets in `.env.local` (never commit)
- Load from `process.env` with null checks

#### Middleware & Authentication

- Use Next.js middleware (`middleware.ts`) for route protection
- Check auth cookies before redirecting:
  ```typescript
  const authCookie = request.cookies.get('auth')?.value
  ```
- Set cookies with `response.cookies.set()` with security options:
  - `httpOnly: true` (no JS access)
  - `sameSite: 'lax'` or `'strict'`
  - `secure: true` in production

### Directory Structure

```
cordocu/
├── app/                    # Next.js App Router
│   ├── api/                # API routes
│   ├── dashboard/          # Dashboard pages
│   ├── login/              # Login page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── lib/                    # Utilities & clients
│   ├── supabase.ts         # Supabase client
│   ├── supabase-server.ts  # Server utilities
│   └── admin-auth.ts       # Admin authentication
├── middleware.ts           # Next.js middleware
├── public/                 # Static files (HTML dashboards)
├── tsconfig.json           # TypeScript config
├── next.config.js          # Next.js config
└── package.json            # Dependencies
```

### Common Patterns

#### Supabase Client Initialization
```typescript
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(url, anonKey)
```

#### API Route Structure
```typescript
export async function POST(request: NextRequest) {
  const data = await request.json()
  // validation and business logic
  return NextResponse.json({ result }, { status: 200 })
}
```

#### Protected Routes
- Checked in `middleware.ts` via `PUBLIC_PATHS` list
- Redirects unauthenticated users to `/`

### Summary for Agents

1. **TypeScript strict mode** — all functions must have explicit return types
2. **Use path aliases** — `@/lib`, `@/app` for imports
3. **Protect routes** via middleware; check cookies for auth
4. **Validate env vars** before use
5. **Handle errors gracefully** — return proper HTTP status codes
6. **Keep styles inline** — no external CSS framework
7. **Component naming** — PascalCase; use `'use client'` for interactivity
8. **No hardcoded secrets** — store in `.env.local`

---

## HTML Dashboard Content

### Overview

The project includes two static HTML dashboards served from the `public/` folder:

1. **corteqs_dashboard.html** - Main operations dashboard
2. **status.html** - MVP project status tracker

### Middleware Configuration

The middleware now properly handles static HTML files:

```typescript
// middleware.ts
const PUBLIC_PATHS = ['/', '/api/auth', '/corteqs_dashboard.html', '/status.html']

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.html).*)'],
}
```

**Key Fix:** HTML files are excluded from middleware processing using `.*\.html` in the matcher, allowing them to be served directly from the `public/` folder.

### Dashboard Navigation

The main dashboard (`corteqs_dashboard.html`) contains the following sections:

- **Neden?** - Project purpose and rationale
- **Draft Not** - Draft notes and brainstorming
- **Genel Bakış** - General overview with KPIs
- **Dökümanlar** - Links to external documentation
- **Takip Tablosu** - Progress tracking
- **Özet** - Summary of decisions and tasks
- **Domain Ownership** - Domain-based organizational structure
- **Features** - Product features by version (V1, V2, V3)
- **Gelir Modeli** - Revenue models and streams
- **Audit** - Audit and verification section
- **Project Status** - Project tracking
- **Landing Page** - Landing page details

### Access Control

- Unauthenticated users are redirected to the login page (`/`)
- Login requires password: `baubt2026!`
- After successful authentication, users are redirected to `/corteqs_dashboard.html`
- Authentication is maintained via `auth=true` cookie

---

## Project Status

### Current State (MVP v2.0)

| Category | Status | Progress |
|----------|--------|----------|
| Vizyon & Kapsam | ✅ Tamam | 6/6 |
| Kullanıcı Rolleri | ✅ Tamam | 6/6 |
| Arama & AI | ⚠️ Kısmen | 6/7 |
| İçerik & Veri | ❌ Geliştirilecek | 2/7 |
| UI/UX Tasarımı | ✅ Tamam | 6/6 |
| Teknik Altyapı | ❌ Değerlendirme Gerekli | 3/8 |
| Pazarlama & Lansman | ✅ Tamam | 5/5 |
| Gelir Modelleri | ✅ Tamam | 5/5 |

**Overall Progress:** 65% (41/55 completed)

### Critical Priorities

1. **Supabase Auth & Database Setup** - User authentication and database infrastructure
2. **User Roles System** - Individual, Consultant, Business, Organization roles and permissions
3. **Business Claim System** - Business ownership verification
4. **Moderation Panel** - Content approval, spam control, reporting system

### Timeline

- **Mart 2026:** Frontend setup, Supabase configuration
- **Nisan 2026:** Auth & User Management implementation
- **Mayıs 2026:** Core features (Danışmanlar, dernekler, işletmeler)
- **Haziran 2026:** Beta launch with limited user group
- **Ağustos 2026:** Public MVP launch

### Key Features

#### V1 - Must Have
- User Profile (Kullanıcı Profili)
- Service Requests (Hizmet Talebi)
- Admin Dashboard (Admin Dashboard)
- News Module (Haberler)
- Business Listings (İşletme Listesi)
- Events (Etkinlikler)
- Consultant Module (Danışman Modülü)
- Hospital Booking (Hospital Booking)

#### V2 - Growth
- WhatsApp Bot
- City Ambassador Program
- Welcome Package (Hoşgeldin Paketi)
- Job Listings (İş İlanları)
- Blog Competition (Blog Yarışması)
- Jukebox (İşletme müzik sistemi)
- Discount Coupons
- WhatsApp Group Categorization

#### V3 - Scale
- Event Sponsor Management
- Interaction Pool Integration
- Multi-Diaspora Support
- Notetaker Integration
- Jukebox - Standalone App
- TV/Radio Integration

### Revenue Models

1. **Individual Consultant** - Claiming & Opportunities (Bireysel Danışman)
2. **Business Subscription** - Restaurant, market, service subscriptions
3. **Event Sponsorship** - Featured listings, invitations, revenue share
4. **Welcome Package** - Sponsored products (bank cards, transfers, flights)
5. **Organizations & Foundations** - Consulate, association, foundation management
6. **Blogger/Vlogger** - City Ambassador program with revenue share

### Domain Ownership Model

The project uses domain-based ownership structure:

| Domain | Owner | KPIs |
|--------|-------|------|
| **Supply** | Head of Supply / BD Lead | Onboard advisors, active advisors, partners |
| **Demand** | Growth / Community Lead | WAU, new users, ambassador output, engagement |
| **Transaction** | Revenue / Monetization Lead | GMV, net revenue, take rate, conversion |
| **Experience** | Product Manager | Feature adoption, drop-off rate, activation |
| **Platform Core** | CTO | Uptime, API latency, bug rate, deploy frequency |
| **Support & CRM** | Customer Success Lead | Response time, resolution time, retention, NPS |

### Tools & Stack

**Current:**
- Frontend: React, TypeScript, Vite
- Styling: Tailwind CSS, shadcn/ui
- Forms: React Hook Form, Zod validation

**Planned:**
- Backend: Supabase + PostgreSQL
- Auth: Supabase Auth
- Storage: Supabase Storage
- Functions: Edge Functions

**Future (V2+):**
- Mobile: React Native
- Payments: Stripe
- AI: OpenAI API
- Caching: Redis
- Deployment: Docker, CI/CD

### Security Checklist

- ✅ RLS Policies activated
- ✅ Input validation (Zod)
- ⏳ Rate limiting (pending)
- ⏳ HTTPS/SSL (production)
- ⏳ CORS configuration

### Next Steps

1. Complete Supabase project setup
2. Implement authentication system (email/password + OAuth)
3. Create database tables for profiles, consultants, businesses, events
4. Build role-based authorization system
5. Develop core CRUD operations for all content types
6. Implement event management system
7. Build business claim and moderation systems
8. Prepare beta launch

---

## Important Links

- **Google Drive:** https://drive.google.com/drive/u/0/folders/1WAvBnJvh9E2jEt23aohe8P4UpbVBjVGi
- **MVP Documentation:** https://docs.google.com/document/d/1zOeZCRetchpm3S0b_eyZCabGvQsWRVBT/edit
- **Lovable Project:** https://lovable.dev/projects/05c49c32-31cc-4117-bfde-5c2b4bf472a1
- **Live Demo:** https://diasporanet-connect.lovable.app/

---

## Team

- **Burak** (Co-Founder)
- **Barış** (Co-Founder)

---

## Environment Variables

See `.env.local` for local development:

```
NEXT_PUBLIC_SUPABASE_URL=https://injprdrsklkxgnaiixzh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_key>
SUPABASE_SERVICE_ROLE_KEY=<service_role_key>
SUPABASE_ACCESS_TOKEN=<access_token>
APP_PASSWORD=baubt2026!
```

**Never commit `.env.local` to version control.**

---

## Troubleshooting

### Dashboard Not Loading

**Problem:** Dashboard redirects to homepage or middleware loop

**Solution:** Verify middleware configuration in `middleware.ts`:
- HTML files must be in `PUBLIC_PATHS`
- Matcher must exclude `*.html` files
- Auth cookie must be set correctly (`auth=true`)

**Verify:**
```bash
# Check middleware matcher
grep -n "matcher" middleware.ts

# Check public paths
grep -n "PUBLIC_PATHS" middleware.ts
```

### Static Files Not Served

**Problem:** `.html` or other static files return 404

**Solution:** Ensure files are in the `public/` directory and middleware is not intercepting them:
```bash
# List public files
ls -la public/

# Verify middleware doesn't block static files
npx tsc --noEmit
```

### Authentication Issues

**Problem:** Login not working or session lost

**Solution:** 
1. Verify app password in `.env.local`
2. Check cookies in browser DevTools
3. Ensure auth cookie is `httpOnly=true, sameSite=lax`

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-04-07 | Initial setup, middleware fixes |
| 2.0 | TBD | Supabase integration |
| 3.0 | TBD | Advanced features & scaling |

---

**Last Updated:** 2026-04-07  
**Maintained By:** Development Team  
**Status:** Active Development
