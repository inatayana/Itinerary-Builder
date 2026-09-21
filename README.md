# Bali Car Charter
Platform penyedia transportasi berfasilitas pengemudi fasih berbahasa Inggris dan penyusun Intelligent Itinerary Builder terdepan di Bali.

## 🚀 Quick Start

### Prerequisites
- Node.js >= 20.0.0
- pnpm >= 9.0.0
- Supabase account (free tier)
- Mapbox account (free tier, 50k loads/month)

### Installation

```bash
# 1. Clone repository
git clone https://github.com/inatayana/Itinerary-Builder.git
cd Itinerary-Builder

# 2. Install dependencies
pnpm install

# 3. Setup environment
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# 4. Push database schema to Supabase
cd packages/database
pnpm db:generate
pnpm db:push

# 5. Start development servers
pnpm dev
```

### Environment Variables
Copy `.env.example` to `.env.local` and fill in your credentials:
- `DATABASE_URL` — Supabase PostgreSQL connection string
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon key
- `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` — Mapbox access token
- `XENDIT_API_KEY` — Xendit payment gateway API key
- `GEMINI_API_KEY` — Gemini AI API key

## 📁 Project Structure

```
packages/
├── database/          # Prisma ORM & PostgreSQL schema
├── ui/                # Shared UI components (Tailwind CSS)
├── config/            # App configuration & constants
├── shared/            # Shared utilities, schemas, types
└── api/               # Backend API functions & routes

apps/
├── web/               # Main Next.js web application (PWA)
├── admin/             # Admin Panel (Next.js)
└── driver/            # Driver App (Next.js)
```

## 🛠️ Development

### Available Scripts
```bash
pnpm dev              # Start all apps in dev mode
pnpm build            # Build all apps for production
pnpm lint             # Run ESLint on all packages
pnpm typecheck        # TypeScript type checking
pnpm test             # Run all tests
pnpm db:generate      # Generate Prisma Client
pnpm db:push          # Push schema to Supabase
pnpm db:studio        # Open Prisma Studio (GUI)
```

### Tech Stack
- **Framework**: Next.js 14/15 App Router
- **Language**: TypeScript (Strict Mode)
- **Database**: Supabase PostgreSQL + PostGIS
- **Authentication**: Supabase Auth (JWT + RLS)
- **State Management**: TanStack Query + Zustand
- **Styling**: Tailwind CSS
- **Maps**: Mapbox GL JS + Google Places API
- **Routing**: OSRM Engine (Fly.io/Render)
- **Payment**: Xendit (Primary)
- **AI**: Gemini 1.5 Flash Free API + RAG
- **WhatsApp**: Meta WhatsApp Cloud API

## 🌐 URLs
- **Web App**: http://localhost:3000
- **Admin Panel**: http://localhost:3001
- **Driver App**: http://localhost:3002

## 📚 Documentation
All project specifications are in the `packages/shared/src/` directory:
- `technical-architecture.md` — System architecture
- `data-models.md` — Database schema & relationships
- `integration-matrix.md` — API specifications & function calling
- `ui-ux-specification.md` — Design tokens & component library
- `admin-panel-spec.md` — Admin dashboard requirements
- `driver-app-spec.md` — Driver mobile app requirements
- `testing-strategy.md` — Testing approach & coverage
- `security-spec.md` — Security controls & compliance
- `deployment-ops.md` — Deployment & operations
- `agent-communication-protocol.md` — Multi-agent AI communication
- `seo-geo-strategy.md` — SEO & GEO optimization

## 🤝 Contributing
All development follows the `AGENTS.md` governance protocol:
1. PLAN MODE for analysis, specifications, documentation
2. BUILD MODE for code implementation (requires Readiness Gate = PASS)

## 📄 License
MIT License — Bali Car Charter 2026
