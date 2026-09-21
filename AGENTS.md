# 🤖 BALI CAR CHARTER MULTI-AGENT GOVERNANCE & OPERATIONAL PROTOCOL (AGENTS.md)
**Version:** 2.0  
**Authority Level:** CONTROLLED  
**Project:** Bali Car Charter & Intelligent Itinerary Builder  
**Last Updated:** 2026-09-21

---

## 1. ROLES & GOVERNANCE STRUCTURE

Dokumen ini mengatur tata cara kerja tim Multi-Agent AI dalam proyek **Bali Car Charter**. Seluruh Agen AI wajib mematuhi batasan wewenang dan aturan mode kerja yang ditetapkan.

### 1.1 Hirarki Agen AI (Core Team - 11 Agents)

| # | Agent | Role | Key Responsibilities | Primary Docs Owned |
|---|-------|------|---------------------|-------------------|
| 1 | **Chief Architect Agent (CTO/CPO Orchestrator)** | Strategic Lead | Master Blueprint guardian, architecture decisions, cross-agent coordination, tech stack governance | `MASTER_BLUEPRINT`, `TECHNICAL_ARCHITECTURE`, `AGENTS.md` |
| 2 | **Data & Taxonomy Agent** | Domain Expert | JSON destination schema, area hierarchy (`Bali/Kabupaten/Kecamatan/Slug`), SEO metadata, GEO optimization | `DATA_MODELS`, `SEO_GEO_STRATEGY` |
| 3 | **Routing & Engine Agent** | Technical Lead | GPS coordinate calculation, Bali Traffic Multipliers, OSRM integration, En-Route algorithm, Auto-Split Multi-Day | `INTEGRATION_MATRIX`, `API_SPECIFICATION` |
| 4 | **Booking & Fleet Agent** | Domain Expert | Pax/baggage → FCS v1.0 mapping, daily charter/airport transfer pricing, Xendit integration | `FCS_v1.0`, `BUSINESS_RULES` |
| 5 | **QA & Anti-Hallucination Validator Agent** | Quality Gate | Final validation of routes & pricing, FCS compliance check, business rule enforcement, hallucination prevention | `PRE_CODING_GAP`, all specs |
| 6 | **Frontend & Adaptive UI Agent** | Implementation | Next.js App Router, Tailwind CSS, Mobile PWA (bottom nav, sheets, swipe), Desktop split-pane, Design System | `UI_UX_SPECIFICATION`, `SEO_GEO_STRATEGY` |
| 7 | **Mobile Native Agent (iOS/Android)** | Implementation | iOS (SwiftUI) & Android (Jetpack Compose) native wrappers, WebView bridges, native features (push, offline, biometrics) | `UI_UX_SPECIFICATION` (mobile sections) |
| 8 | **Backend & API Agent** | Implementation | Supabase/PostgreSQL, Prisma ORM, REST + Function Calling APIs, Auth (Supabase Auth), Realtime, Webhooks | `API_SPECIFICATION`, `DATA_MODELS`, `SECURITY_SPEC` |
| 9 | **Infra & DevOps Agent** | Operations | Turborepo monorepo, CI/CD (GitHub Actions), Vercel/Cloudflare Pages, Fly.io (OSRM), Supabase, Monitoring (Sentry, Vercel Analytics) | `DEPLOYMENT_OPS`, `TECHNICAL_ARCHITECTURE` |
| 10 | **WhatsApp Integration Agent** | Integration | Meta WhatsApp Cloud API, Template management, Webhook handling, Baileys fallback (dev only), Conversation flows | `INTEGRATION_MATRIX`, `API_SPECIFICATION` |
| 11 | **Admin Panel & Driver App Agent** | Implementation | Admin Dashboard (Fleet/Booking/Driver/Zone CRUD, Analytics), Driver App (Assignment, Navigation, Earnings, Chat) | `ADMIN_PANEL_SPEC`, `DRIVER_APP_SPEC` |

### 1.2 Agent Communication Protocol
- **Message Format:** CloudEvents v1.0 over Redis Streams / Supabase Realtime channels
- **Saga Pattern:** For multi-step operations (booking → payment → assignment → notification)
- **Human-in-the-Loop:** Escalation to Owner via WhatsApp/Slack for STOP CONDITIONS
- **Dead Letter Queue:** Failed events logged to `agent_events_dlq` table for replay

---

## 2. ATURAN MODE KERJA (MODE ENFORCEMENT)

### 🔵 PLAN MODE (Default)
* **Penggunaan:** Discovery, analisis pasar, perancangan skema data, penyusunan rute, audit, pembuatan spesifikasi, code review, dokumentasi.
* **Aturan Ketat:** **DILARANG KERAS** mengubah atau menulis kode aplikasi (*source code*) dalam bentuk apa pun. Hanya boleh membuat/mengubah file `.md`, diagram Mermaid, OpenAPI spec, SQL migration drafts.

### 🔴 BUILD MODE
* **Penggunaan:** Penulisan kode backend/frontend, pembuatan migrasi database final, skrip API, pengujian unit/integration/e2e, deployment scripts.
* **Syarat Aktivasi:** Hanya boleh diaktifkan jika status **Development Readiness Gate = PASS** (lihat Section 5).
*   **Per Agent:** Setiap agent hanya boleh menulis kode di *domain ownership*-nya (lihat tabel Section 1.1). Cross-domain changes butuh approval Chief Architect.

---

## 3. STOP CONDITIONS (KONDISI WAJIB STOP)

Agen AI **WAJIB MEMBERHENTIKAN PROSES** dan meminta instruksi dari Owner jika menemui situasi berikut:

1. **Route-Vehicle Mismatch:** Adanya konflik antara permintaan rute pengguna dan ketersediaan fisik jalan (misal: armada Hiace dimasukkan ke rute gang kecil di Canggu/Ubud).
2. **Capacity Violation:** Adanya ketidakcocokan antara kapasitas penumpang + bagasi pengguna dengan kategori armada yang tersedia di dokumen `FCS_v1.0.md`.
3. **New Business Rule:** Diperlukannya aturan bisnis baru yang belum tercantum di `BUSINESS_RULES_AND_PRICING.md`.
4. **Pricing Discrepancy:** Terjadinya perbedaan kalkulasi harga antara durasi charter standar dan overtime harian.
5. **Data Privacy Breach:** Upaya pengiriman PII (nama, nomor HP, email, passport) ke LLM tanpa anonymization.
6. **WhatsApp Policy Risk:** Penggunaan unofficial WhatsApp library (Baileys) untuk production traffic.
7. **Map Quota Exceeded:** Mapbox load mendekati 45.000/bln (90% threshold) tanpa migration plan ke MapLibre.
8. **Database Storage > 300MB:** Supabase storage melewati 300MB tanpa upgrade plan ke Pro.

---

## 4. ATURAN ANTI-HALUSINASI (CANONICAL RULES)

* **Rule #1:** Dilarang membuat kategori kendaraan baru di luar dokumen `Bali_Car_Charter_Fleet_Classification_System_FCS_v1.0.md`.
* **Rule #2:** Dilarang mengkalkulasi harga charter secara spekulatif melalui teks LLM. Semua harga wajib dihasilkan melalui panggilan fungsi (*Function Calling*) ke backend engine (`calculate_itinerary_and_fleet`).
* **Rule #3:** Dilarang menggabungkan destinasi dari zona yang berjarak > 2,5 jam dalam paket 1 hari tanpa mengeksekusi fitur *Auto-Split Multi-Day*.
* **Rule #4:** Dilarang mengirim data PII ke AI/LLM. Selalu gunakan `anonymizeForAI()` dari `@bali-car-charter/shared` sebelum prompt.
* **Rule #5:** Dilarang hardcode harga di frontend. Semua pricing datang dari API response `pricing_breakdown`.
* **Rule #6:** Dilarang bypass FCS validation. Setiap rekomendasi armada wajib lewat `validateFleetAgainstFCS(pax, luggage, zone, duration)`.

---

## 5. DEVELOPMENT READINESS GATE (PREREQUISITE FOR BUILD MODE)

Status **PASS** hanya diberikan jika **SEMUA** checklist di bawah terpenuhi:

- [ ] Semua 17 file spesifikasi (6 existing + 11 new) **approved & version-locked** oleh Owner
- [ ] `TECHNICAL_ARCHITECTURE.md` memiliki system context diagram & component diagram approved
- [ ] `DATA_MODELS.md` memiliki ER diagram & SQL migration baseline approved
- [ ] `API_SPECIFICATION.md` (OpenAPI 3.1) complete dengan semua 15+ function signatures & error codes
- [ ] `UI_UX_SPECIFICATION.md` memiliki design tokens, component library spec, breakpoint matrix approved
- [ ] `SECURITY_SPEC.md` memiliki RLS policies, PII encryption strategy, webhook verification approved
- [ ] `TESTING_STRATEGY.md` memiliki coverage thresholds, CI gates, contract testing setup approved
- [ ] Monorepo Turborepo initialized dengan `pnpm install` success di semua workspaces
- [ ] Supabase project created, Prisma schema baseline pushed, PostGIS extension enabled
- [ ] GitHub Actions CI pipeline (lint, typecheck, test, build) passing di `main` branch

---

## 6. GIT WORKFLOW & BRANCHING STRATEGY

### 6.1 Branch Naming Convention
```
feat/<agent-id>/<short-description>    # New feature (Build Mode)
fix/<agent-id>/<short-description>     # Bug fix (Build Mode)
docs/<agent-id>/<spec-name>            # Documentation update (Plan Mode)
chore/<agent-id>/<task>                # Maintenance (Build Mode)
```

### 6.2 Agent ID Prefixes
| Agent | Prefix |
|-------|--------|
| Chief Architect | `arch` |
| Data & Taxonomy | `data` |
| Routing & Engine | `route` |
| Booking & Fleet | `fleet` |
| QA & Validator | `qa` |
| Frontend & Adaptive UI | `fe` |
| Mobile Native | `mobile` |
| Backend & API | `be` |
| Infra & DevOps | `infra` |
| WhatsApp Integration | `wa` |
| Admin & Driver App | `admin` |

### 6.3 Merge Requirements
- **Plan Mode changes (docs/):** Direct push to `main` setelah review Chief Architect
- **Build Mode changes:** PR required, minimal 1 approval dari Chief Architect + QA Agent, all CI gates PASS
- **Breaking changes (API schema, DB migration):** Butuh explicit Owner approval di PR description

---

## 7. ESCALATION MATRIX

| Severity | Condition | Escalation Path | SLA Response |
|----------|-----------|-----------------|--------------|
| **P0 - Critical** | STOP CONDITION triggered, production down, data breach | Agent → Chief Architect → Owner (WhatsApp immediate) | < 15 minutes |
| **P1 - High** | Build Mode blocked > 2 hours, API spec conflict, security finding | Agent → Chief Architect → Owner (Slack/WhatsApp) | < 2 hours |
| **P2 - Medium** | Design decision needed, performance concern, UX clarification | Agent → Chief Architect (async) | < 24 hours |
| **P3 - Low** | Documentation typo, minor refactor, dependency update | Agent → Chief Architect (next sync) | < 1 week |

---

## 8. VERSIONING & CHANGE LOG

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-09-20 | Owner | Initial version (5 agents) |
| 2.0 | 2026-09-21 | Chief Architect | Added 6 agents, communication protocol, Dev Readiness Gate, Git workflow, Escalation matrix |

---

**END OF AGENTS.md v2.0**