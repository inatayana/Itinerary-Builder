# 🎛️ PRE-CODING CONTROL PACKAGE & DEFINITION OF DONE
**Version:** 1.1  
**Authority Level:** CONTROLLED  
**Project:** Bali Car Charter — Quality Control

---

## 1. GLOSARIUM CONTEXT LOKAL BALI

* **Melukat:** Ritual penyucian diri secara spiritual menggunakan air suci di pura (misal: Tirta Empul).
* **Ngapit Jalan:** Situasi penutupan atau penyempitan jalan akibat adanya upacara adat Hindu Bali.
* **Subak:** Sistem irigasi tradisional Bali yang menjadi ciri khas pemandangan sawah berundak (misal: Jatiluwih/Tegallalang).
* **Jam Padat Lokal:** Kemacetan rutin di area Canggu, Seminyak, Kuta, dan Central Ubud yang terjadi pada pukul 16:00 – 19:30 WITA.

---

## 2. DECISION LOG (CATATAN KEPUTUSAN)

| ID Keputusan | Topik | Status | Keputusan Terkunci |
| :--- | :--- | :--- | :--- |
| **DEC-001** | Model Penetapan Harga | **LOCKED** | Harga charter wajib *per vehicle*, include Driver English + BBM. |
| **DEC-002** | Saluran Utama Komunikasi | **LOCKED** | Meta WhatsApp Cloud API menjadi channel utama interaksi & konfirmasi booking. |
| **DEC-003** | Model Monorepo Tech Stack | **LOCKED** | Turborepo + Next.js 14+ + TypeScript Strict + TanStack Query + Zustand. |
| **DEC-004** | Payment Gateway | **LOCKED** | Xendit sebagai Primary payment (Kartu Kredit Internasional + Disbursement API). |
| **DEC-005** | Maps Solution | **LOCKED** | Mapbox GL JS (50k loads free/month) + Google Places Autocomplete. |
| **DEC-006** | Routing Engine | **LOCKED** | OSRM di-host via Fly.io/Render + Bali Traffic Multipliers. |
| **DEC-007** | AI Engine | **LOCKED** | Gemini 1.5 Flash Free API + RAG (FCS v1.0 + Destinations). |
| **DEC-008** | Database Architecture | **LOCKED** | Supabase PostgreSQL + PostGIS + RLS Policies. |
| **DEC-009** | Authentication | **LOCKED** | Supabase Auth + custom profile system (6 roles). |
| **DEC-010** | Komisi Driver Mitra UMKM | **PENDING OWNER DECISION** | Persentase bagi hasil jika driver mengantar ke toko oleh-oleh mitra. |

---

## 3. NON-FUNCTIONAL REQUIREMENTS (NFR)

### 3.1 Performance & Response Time
1. **API Response Time:** Waktu tanggap mesin kalkulasi rute & rekomendasi armada < 500ms (untuk production latency budget).
2. **Mobile Accessibility:** Tampilan PWA Mobile wajib ringan dan dapat diakses dengan koneksi 3G/4G lambat. Target ukuran bundle < 2MB.
3. **Data Security:** Informasi pribadi traveler (nomor telepon, nomor paspor, detail penerbangan) wajib dienkripsi.
4. **Search Optimization:** 90% page load in < 2.5 seconds (Core Web Vitals)
5. **Offline Capability:** PWA harus dapat menyimpan itinerary untuk penggunaan offline hingga 24 jam.

### 3.2 Security & Privacy
1. **Authentication:** JWT + HttpOnly cookies, multi-factor optional
2. **Authorization:** RBAC dengan 6 role levels (Super Admin, Admin, Driver, Traveler, Guest, etc.)
3. **Data Encryption:** AES-256 untuk data sensitif di database
4. **GDPR Compliance:** Data export/delete rights, explicit consent
5. **Payment Security:** PCI-DSS compliant untuk payment processing
6. **API Security:** Rate limiting, API key authentication for internal services

### 3.3 Scalability & Availability
1. **Concurrent Users:** Support 1000+ concurrent users (peak hour)
2. **Load Balancing:** Horizontal scaling untuk stateless services
3. **Database Scaling:** Read replicas untuk query-heavy operations
4. **CDN:** Cloudflare Pages untuk static assets
5. **Backup Strategy:** Daily automated backups + disaster recovery

### 3.4 Monitoring & Observability
1. **Application Performance Monitoring:** APM untuk semua services
2. **Error Tracking:** Real-time alerting untuk error rate > 1%
3. **Log Aggregation:** Centralized logging dengan structured format
4. **Health Checks:** `/health` endpoints untuk all services
5. **Metrics Dashboard:** Real-time monitoring untuk key business metrics

---

## 4. DEFINITION OF DONE (DoD) UNTUK AGEN AI

Suatu tugas pengembangan dinyatakan **SELESAI (DONE)** jika dan hanya jika memenuhi checklist berikut:

### 4.1 Code & Implementation Standards
* [ ] Kode aplikasi telah diimplementasikan sesuai skema arsitektur data Bali Car Charter
* [ ] Menggunakan TypeScript strict mode (100% type checking)
* [ ] Semua route dan API endpoints di-documentasikan (OpenAPI 3.1)
* [ ] RLS policies diterapkan di database Supabase
* [ ] CI/CD pipeline lulus semua linting, typecheck, dan tests
* [ ] Semua environment variables aman (tanpa secrets di code)

### 4.2 Functional Correctness
* [ ] Hasil rekomendasi rute tidak memicu kemacetan ekstrem (*backtracking-free*)
* [ ] Pemilihan armada tervalidasi 100% sesuai aturan kapasitas penumpang & bagasi di FCS v1.0
* [ ] Seluruh pengujian unit (*unit test*) untuk kalkulasi harga dan logika *Auto-Split* berhasil bernilai PASS
* [ ] Tidak ada penambahan fitur di luar batasan spesifikasi yang telah disetujui
* [ ] Semua function calls untuk Agen AI menggunakan skema yang didefinisikan (error handling included)
* [ ] Multi-agent communication protocol diimplementasikan (CloudEvents v1.0)

### 4.3 Performance & Quality
* [ ] Core Web Vitals optimal: LCP < 2.5s, FID < 100ms, CLS < 0.1
* [ ] Mobile-first responsive design (iOS/Android compatibility)
* [ ] Loading performance target: Bundle size < 2MB untuk PWA
* [ ] Accessibility compliance: WCAG 2.1 AA (screen reader, keyboard navigation)
* [ ] SEO optimization: 90% pagespeed, structured data (JSON-LD)
* [ ] Internationalization: Bahasa Indonesia + English ready from launch

### 4.4 Security & Compliance
* [ ] All PII encrypted at rest and in transit
* [ ] Role-based access control (6+ roles) with principle of least privilege
* [ ] Rate limiting implemented untuk semua API endpoints
* [ ] Error handling tidak membocorkan informasi sensitif
* [ ] Data retention policies implemented (GDPR, PDPA compliant)
* [ ] Webhook security (HMAC signature verification)

### 4.5 Testing & Validation
* [ ] Unit tests: >90% coverage untuk semua pure functions
* [ ] Integration tests: end-to-end booking flow
* [ ] Contract tests: API specification compliance
* [ ] Performance testing: 1000 concurrent users simulation
* [ ] Security testing: penetration testing & vulnerability scanning
* [ ] Cross-browser testing: Chrome, Safari, Firefox, Edge, all mobile browsers

### 4.6 Deployment & Operations
* [ ] CI/CD pipeline (GitHub Actions) dengan all stages
* [ ] Automated testing di semua environment (dev/staging/prod)
* [ ] Blue-green deployment strategy
* [ ] Rollback procedures documented
* [ ] Monitoring dan alerting setup (Prometheus + Grafana)
* [ ] Documentation handover untuk operasi dan maintenance

---

## 5. DEVICE & BROWSER COMPATIBILITY MATRIX

### 5.1 Supported Devices
| Device Type | Browser Version | Status | Notes |
|-------------|-----------------|--------|-------|
| **Desktop** | Chrome >= 120 | ✅ Stable | Full feature set |
| | Firefox >= 118 | ✅ Stable | Full feature set |
| | Edge >= 120 | ✅ Stable | Full feature set |
| | Safari >= 17 | ✅ Stable | Full feature set |
| **Mobile Web** | Chrome Android >= 120 | ✅ Stable | PWA installable |
| | Safari iOS >= 17 | ✅ Stable | PWA installable |
| | Samsung Internet >= 25 | ✅ Stable | Limited features |
| | UC Browser >= 13 | ⚠️ Limited | Testing phase |

### 5.2 PWA Features Support
| Feature | iOS Safari | Android Chrome | Requirements |
|---------|-----------|---------------|--------------|
| **App Install** | ✅ Available | ✅ Available | Service Worker ready |
| **Offline Mode** | ✅ Available | ✅ Available | Cache strategy implemented |
| **Push Notifications** | ✅ Available | ✅ Available | Web Push API ready |
| **Background Sync** | ✅ Available | ✅ Available | SyncManager ready |
| **Fingerprint Access** | ⚠️ Limited | ✅ Available | Biometrics API |
| **Camera Access** | ✅ Available | ✅ Available | Camera permission required |

### 5.3 Browser Matrix Testing
| Browser | Viewport Testing | Feature Testing | Automated Testing |
|---------|------------------|-----------------|------------------|
| Chrome Desktop | ✅ | ✅ | ✅ Full |
| Firefox Desktop | ✅ | ✅ | ✅ Full |
| Edge Desktop | ✅ | ✅ | ✅ Full |
| Safari Desktop | ✅ | ✅ | ✅ Full |
| Chrome Mobile | ✅ | ✅ | ✅ Full |
| Safari Mobile | ✅ | ✅ | ✅ Full |
| Samsung Internet | ✅ | ✅ | ⚠️ Limited |

---

## 6. CI/CD PIPELINE SPECIFICATIONS

### 6.1 GitHub Actions Workflow
```yaml
# .github/workflows/ci.yml
name: Bali Car Charter CI/CD
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [20.x]
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'pnpm'
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      - name: Run lint
        run: pnpm run lint
      - name: Run typecheck
        run: pnpm run typecheck
      - name: Run tests
        run: pnpm run test
      - name: Build applications
        run: pnpm run build

  deployment:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'pnpm'
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      - name: Run lint & tests
        run: pnpm run lint && pnpm run test
      - name: Build applications
        run: pnpm run build
      - name: Deploy to Vercel
        uses: ./.github/actions/deploy-vercel
```

### 6.2 Linting Configuration
| Tool | Configuration File | Rules |
|------|-------------------|-------|
| **ESLint** | `.eslintrc.cjs` | Next.js recommended + TypeScript |
| **Prettier** | `.prettierrc` | Code formatting consistency |
| **TypeScript** | `tsconfig.json` | Strict mode + noEmit |
| **Tailwind CSS** | `tailwind.config.js` | Design system tokens |
| **Stylelint** | `.stylelintrc` | CSS consistency |

### 6.3 Test Strategy
| Test Type | Coverage Target | Tools |
|-----------|-----------------|-------|
| **Unit Tests** | > 90% | Vitest + @testing-library/react |
| **Integration Tests** | > 80% | Playwright |
| **Contract Tests** | > 70% | Pact |
| **Performance Tests** | Load testing | k6 |
| **Security Tests** | OWASP compliance | Snyk, OWASP ZAP |

---

## 7. MONITORING & ALERTING SETUP

### 7.1 Metrics Collection
```yaml
# Example Prometheus configuration
scrape_configs:
  - job_name: 'nextjs-app'
    static_configs:
      - targets: ['localhost:3000']
    metrics_path: '/api/metrics'
    metrics_relabel_configs:
      - source_labels: [__name__]
        target_label: __name__
        replacement: 'balicarcharter_${__name__}'
```

### 7.2 Alert Conditions
| Alert Type | Condition | Severity | Action |
|------------|-----------|----------|--------|
| **High Error Rate** | Error rate > 5% for 2 minutes | Critical | Immediate notification |
| **Slow Response Time** | Response time > 2x SLA for 5 minutes | Warning | Performance investigation |
| **Database Connection** | DB connection pool < 10% | Warning | Scale resources |
| **Payment Failure** | Payment failure rate > 2% | High | Manual review |
| **Authentication Failure** | Login failure rate > 10% | High | Security alert |
| **Cache Miss Ratio** | Cache hit ratio < 80% for 10 minutes | Warning | Cache optimization |

---

## 8. DEPLOYMENT STRATEGY

### 8.1 Environment Matrix
| Environment | URL | Deployment Method | CI/CD Pipeline |
|-------------|-----|------------------|----------------|
| **Development** | https://dev.balicarcharter.com | GitHub Actions | auto-approval |
| **Staging** | https://staging.balicarcharter.com | GitHub Actions | manual approval |
| **Production** | https://balicarcharter.com | GitHub Actions | manual approval |

### 8.2 Blue-Green Deployment
```yaml
# Deploy strategy for zero-downtime updates
deployment:
  strategy: blue-green
  source: main
  target: production
  rollback:
    auto: true
    window: 15 minutes
    health_check: /health
```

---

## 9. DOCUMENT CONTROL & VERSIONING

### 9.1 Document Version History
- **v1.0:** Initial version (2026-09-20)
- **v1.1:** Enhanced dengan CI/CD, accessibility, device matrix

### 9.2 Review Schedule
- **Weekly:** Automated test results review
- **Monthly:** Performance metrics analysis
- **Quarterly:** Document update and version bump
- **Annual:** Complete document revision

### 9.3 Change Management
| Change Type | Impact Level | Approval Required | Backout Plan |
|-------------|--------------|-------------------|--------------|
| **Bug Fix** | Low | Auto-approval | Immediate |
| **Feature Add** | Medium | Review & approval | 24 hours |
| **Configuration Change** | High | Manual approval | 48 hours |
| **API Breaking** | Critical | Owner approval | 72 hours |

---

## 10. COMPLIANCE CHECKLIST

### 10.1 Security Compliance
- [ ] PCI-DSS compliance for payment processing
- [ ] GDPR compliance for data privacy
- [ ] PDPA compliance for Indonesian regulations
- [ ] OWASP Top 10 addressed
- [ ] Security audits performed

### 10.2 Accessibility Compliance
- [ ] WCAG 2.1 AA compliance
- [ ] Screen reader support
- [ ] Keyboard navigation
- [ ] Color contrast ratios
- [ ] Focus management

### 10.3 Performance Compliance
- [ ] Core Web Vitals targets met
- [ ] Mobile performance optimization
- [ ] Loading time targets
- [ ] Resource usage limits

---

## 11. EMERGENCY PROCEDURES

### 11.1 Critical Error Response
1. **Immediate:** Alert operations team
2. **Investigation:** Root cause analysis
3. **Mitigation:** Temporary workaround if needed
4. **Recovery:** Full system restoration
5. **Post-mortem:** Documentation of incident

### 11.2 Data Breach Protocol
1. **Contain:** Isolate affected systems
2. **Notify:** Stakeholders and affected users
3. **Investigate:** Root cause analysis
4. **Remediate:** Fix security vulnerabilities
5. **Report:** Regulatory authorities if required

---

## 12. FUTURE ENHANCEMENTS

### 12.1 Technical Upgrades
- **Next.js 15:** App Router optimizations
- **TypeScript 5:** Better type checking
- **Vercel Edge Functions:** Serverless deployment
- **AI Integration:** OpenAI/Gemini multimodal support

### 12.2 Feature Enhancements
- **Real-time Chat:** WebSocket-based messaging
- **Voice Assistant:** Speech-to-text integration
- **AR Navigation:** Augmented reality driving
- **Smart Contracts:** Blockchain-based booking

---

**END OF PRE-CODING CONTROL PACKAGE**

*Document implemented for production-ready multi-agent AI operations with comprehensive quality control*