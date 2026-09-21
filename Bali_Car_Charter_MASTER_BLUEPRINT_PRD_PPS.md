# 🏛️ BALI CAR CHARTER & INTELLIGENT ITINERARY BUILDER
## Master Blueprint, PRD, PPS & Multi-Agent AI Governance System v2.0

**Version:** 2.0  
**Authority Level:** PRODUCTION READY  
**Project:** Bali Car Charter & Intelligent Itinerary Builder  
**Last Updated:** 2026-09-21

---

## 1. RINGKASAN EKSEKUTIF & VISI PRODUK

### 1.1 Visi
Menjadikan **Bali Car Charter** sebagai platform penyedia transportasi berfasilitas pengemudi fasih berbahasa Inggris (*English Speaking Driver*) dan penyusun *Intelligent Spatial Routing* terdepan di Bali.

### 1.2 Misi Utama
* Mengatasi masalah utama wisatawan: Rencana perjalanan yang tidak efisien, memutar arah (*backtracking*), serta kelelahan pengemudi akibat persilangan zona yang ekstrem.
* Menyediakan pemesanan **Car Charter + Driver Bahasa Inggris** transparan per kendaraan (*per vehicle*).
* Menyediakan *Itinerary Builder* interaktif berbasis zona geofencing dan kedekatan lokasi (*en-route proximity*).

### 1.3 Arsitektur Teknis Dasar (Referensi TECHNICAL_ARCHITECTURE.md v2.0)
**Tech Stack:** Next.js 14+ App Router + React Native/Expo (Mobile Wrapper)
- **Frontend:** TypeScript Strict + TanStack Query + Zustand
- **Backend:** Turborepo monorepo dengan packages: ui, config, shared, database, api
- **Auth:** Supabase PostgreSQL + Auth (RLS policies)
- **Maps:** Mapbox GL JS (50k loads free/month) + Google Places Autocomplete
- **Routing:** OSRM di-host via Fly.io/Render + Bali Traffic Multipliers
- **Payment:** Xendit (Primary) with real-time disbursement API
- **WhatsApp:** Meta WhatsApp Cloud API (1,000 service conversations free/month)
- **AI:** Gemini 1.5 Flash Free API + RAG (FCS v1.0 + Destinations)

### 1.4 KPI & Success Metrics
| KPI | Target | Measurement |
|-----|--------|-------------|
| **Core Web Vitals** | LCP < 2.5s, CLS < 0.1 | Google PageSpeed Insights |
| **User Registration** | 100 new users/day | Analytics dashboard |
| **Booking Conversion** | 15% from itinerary to booking | Funnel analysis |
| **Driver Availability** | 95% response time < 30 seconds | Real-time dashboard |
| **API Response Time** | < 500ms | Performance monitoring |
| **SEO Rankings** | Top 3 for 80% key keywords | Ahrefs/SEMrush |
| **Customer Satisfaction** | NPS > 50 | Post-trip surveys |

---

## 2. PRODUCT REQUIREMENTS DOCUMENT (PRD)

### 2.1 Arsitektur UI/UX Adaptive (Desktop Web vs Mobile App UI)

#### Desktop & Tablet (Layar Besar: >= 768px)
* **Visual Mode:** Dashboard Multi-Pane responsif.
* **Layout Split-Screen:** 
  * *Sisi Kiri (50%):* Dynamic Interactive Map Canvas (Mapbox/Google Maps) menampilkan pin destinasi, garis rute, dan estimasi waktu tempuh.
  * *Sisi Kanan (50%):* Itinerary Timeline Builder, Kartu Destinasi, dan Panel Pemilihan Armada Car Charter.

#### Mobile Devices (Layar Kecil: < 768px)
* **Visual Mode:** Progressive Web App (PWA) / Native App-like Feeling.
* **Layout Mechanics:**
  * Navigation Bar bawah (*Bottom Navigation*): Explore, Builder, Booking, Concierge AI.
  * Bottom Sheet UI untuk detail destinasi dan ringkasan harga.
  * *Swipeable Cards* untuk mengatur urutan destinasi (*drag-and-drop*).
  * Floating Action Bar untuk konfirmasi pemesanan kendaraan.

---

### 2.2 Taksonomi URL Organik SEO & Hirarki Area
`https://balicarcharter.com/id/bali/[kabupaten]/[area]/[destination-slug]`

*Contoh URL Real:*
`https://balicarcharter.com/id/bali/gianyar/ubud/monkey-forest-sanctuary-ubud`
`https://balicarcharter.com/id/bali/badung/uluwatu/uluwatu-temple`

Bali Car Charter dapat mengambil alih pasar melalui tiga pilar utama: Hyper-Local Intelligence, Dynamic Itinerary Builder, dan Autonomous AI Agent via perpesanan langsung (WhatsApp).

1. Strategi Niche & Formulasi Produk CPO
OTA internasional menjual produk secara terpisah (misal: hanya tiket atau hanya sewa mobil). Bali Car Charter dapat menjual pengalaman tersinkronisasi (living itinerary).

Formula Penamaan Produk
[Mikro-Lokasi/Kawasan] + [Pengalaman/Aktivitas Spesifik] + [Keunggulan/Hook Utama]

Contoh 1: “Jalan Rahasia Jatiluwih: Sunset Electric Bike & Local Culinary Immersion (Smart Real-Time Routing)”

Contoh 2: “Ubud Hidden Waterfalls & Sacred Healing: Private Eco-Tour dengan AI Personal Concierge”

Niche Baru yang Belum Digarap OTA Global
Context-Aware Dynamic Itinerary: Itinerary yang secara otomatis menyesuaikan rute jika terjadi kemacetan di Canggu/Ubud atau ada penutupan jalan akibat upacara adat.

Direct Local Node Integration: Menghubungkan wisatawan langsung dengan pemandu lokal, UMKM, dan hidden gems tanpa komisi tinggi khas OTA internasional.

2. Arsitektur Agen AI Bali Car Charter
Agen AI Bali Car Charter bertindak sebagai perwakilan layanan pelanggan, manajer reservasi, dan pemandu pribadi 24/7.

┌─────────────────────────────────────────────────────────┐
│                   Customer (WhatsApp/Web)               │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                 Bali Car Charter AI Orchestrator                  │
├────────────────────────────┬────────────────────────────┤
│  • CS & Concierge Agent    │Menjawab pertanyaaan & saran│
│  • Booking Engine Agent    │Cek inventoris & bayar      │
│  • Operations & Follow-up  │Pengingat & tracking driver │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│              Database & API Integrations                │
│    (Inventory, Payment Gateway, Driver/Guide App)       │
└─────────────────────────────────────────────────────────┘
Discovery & Consultation Agent: Memahami kebutuhan wisatawan melalui percakapan alami, lalu menyusun rekomendasi tur kustom secara instan.

Booking & Payment Agent: Memeriksa ketersediaan jadwal pengemudi/pemandu, mengunci kuota, dan menerbitkan tautan pembayaran (payment link) langsung di percakapan.

Post-Booking & Operations Agent: Mengirimkan konfirmasi, pengingat penjemputan real-time, melacak posisi driver, serta meminta ulasan setelah perjalanan selesai.

3. Komparasi Keunggulan Bali Car Charter vs OTA Internasional
Indikator	OTA Internasional (Klook / Viator)	Bali Car Charter Platform
Format Produk	Katalog tur statis terpisah	Dynamic Intelligent Itinerary terintegrasi
Layanan Pelanggan	Bot kaku / ticket support lambat	Agen AI conversational via WhatsApp (seperti teman lokal)
Konteks Lokal	Data umum, sering terlambat update	Real-time local context (upacara, cuaca, trafik)
Strategi Mesin Pencari	SEO tradisional (kata kunci umum)	GEO (Generative Engine Optimization) untuk AI search
4. Hal yang Perlu Disiapkan
A. Data & Knowledge Base (Pondasi AI)
Katalog Inventory Terstruktur: Detail tur, durasi, base price, kapasitas, dan ketersediaan driver atau guide.

Penyusunan Local Context Knowledge: Database rute alternatif, jadwal upacara adat, rekomendasi kuliner lokal, dan info cuaca mikro.

Dokumen SOP & FAQ: Panduan penanganan pembatalan, kebijakan refund, situasi darurat, dan standar pelayanan lapangan.

B. Infrastruktur Teknis & Framework AI
LLM Orchestration & RAG (Retrieval-Augmented Generation): Sistem untuk menghubungkan AI dengan database Bali Car Charter agar AI menjawab dengan tepat tanpa memberikan informasi palsu (hallucination).

Function Calling / Tool Use API: Menghubungkan AI dengan booking engine dan payment gateway (seperti Midtrans/Xendit) untuk memproses transaksi langsung.

WhatsApp Business API: Kanal utama komunikasi agar wisatawan tidak perlu mengunduh aplikasi baru.

C. GEO & SEO Strategy (Generative Engine Optimization)
Structured Data Markup (JSON-LD): Penandaan kode pada platform agar produk Bali Car Charter dapat dibaca dan direkomendasikan langsung oleh mesin pencari AI (seperti Google AI Overviews, Perplexity, dan ChatGPT).

Integrasi Directions & Location: Menghubungkan titik lokasi tur langsung ke Google Maps API untuk optimasi local search.

D. Operational & Human-in-the-Loop
Sistem Escalation/Fallback: Alur kerja otomatis untuk mengalihkan percakapan dari Agen AI ke tim manusia jika terjadi kendala kritis atau keluhan khusus di lapangan.

