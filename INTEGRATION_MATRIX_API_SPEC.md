# 🔌 INTEGRATION MATRIX & API FUNCTION CALLING SPECIFICATION
**Version:** 2.0  
**Authority Level:** CONTROLLED  
**Project:** Bali Car Charter — Backend Engine

---

## 1. INTEGRASI LAYANAN PIHAK KETIGA

| Layanan API | Fungsi Utama | Keterangan & Batasan |
| :--- | :--- | :--- |
| **Mapbox GL JS** | Geocoding, Distance Matrix, Directions API | Mengkalkulasi jarak real-time & jalur en-route (50.000 loads free/bln) |
| **Supabase Realtime** | WebSocket Events, Presence | Sync status driver & inventory secara real-time |
| **Xendit API** | Payment Gateway, Disbursement | Virtual Account, Credit Card, QRIS, Driver Payout |
| **Meta WhatsApp Cloud API** | Concierge Chatbot, Notifikasi Booking, E-Voucher | Channel komunikasi utama dengan traveler |
| **Google Places API** | Tempat Autocomplete, Details | Auto-complete destinasi & pencarian lokasi |
| **OSRM Engine** | Routing & Distance Calculation | Self-hosted di Fly.io/Render, Traffic multipliers |
| **Gemini API** | AI Concierge, Intent Recognition | Gemini 1.5 Flash Free API + RAG untuk FCS & Destinations |

---

## 2. CONTRACT FUNCTION CALLING AGEN AI

Seluruh Agen AI yang melayani percakapan pelanggan **WAJIB** menggunakan skema panggilan fungsi (*Tool Use*) berikut dan **DILARANG** menghitung harga/durasi secara manual.

### Function 1: `calculate_itinerary_and_fleet`

#### Input Payload (JSON):
```json
{
  "request_id": "req-889102",
  "origin": {
    "location_name": "Grand Hyatt Nusa Dua",
    "coordinates": { "lat": -8.8012, "lng": 115.2341 }
  },
  "destination_ids": [
    "dest-gianyar-ubud-001",
    "dest-gianyar-tampaksiring-001"
  ],
  "passengers": {
    "adults": 4,
    "children": 1
  },
  "luggage": {
    "large_suitcases": 3,
    "cabin_bags": 2
  },
  "travel_date": "2026-10-15",
  "duration_preference": "full_day",
  "timezone": "Asia/Makassar"
}
```

#### Output Response (JSON System Response):
```json
{
  "status": "SUCCESS",
  "request_id": "req-889102",
  "itinerary_validation": {
    "is_split_required": false,
    "total_days": 1,
    "total_estimated_duration_minutes": 510,
    "formatted_duration": "8 Jam 30 Menit",
    "traffic_multiplier": 1.3,
    "backtracking_free": true
  },
  "recommended_fleet": {
    "category": "Premium MPV Charter",
    "models": ["Innova Reborn", "Innova Zenix"],
    "reason": "Kapasitas 5 Pax + 3 Koper Besar cocok dengan standar FCS v1.0 Premium MPV.",
    "vehicle_spec": {
      "length_cm": 485,
      "width_cm": 187,
      "seating_capacity": 6,
      "luggage_capacity": "4 large suitcases + 5 cabin bags"
    }
  },
  "pricing_breakdown": {
    "charter_base_rate_idr": 1,400,000,
    "zone_surcharge_idr": 0,
    "seasonal_multiplier_idr": 0,
    "total_price_idr": 1,820,000,
    "currency": "IDR",
    "price_per_vehicle": true,
    "payment_methods": ["credit_card", "bank_transfer", "qris", "ovo", "gopay"],
    "payment_deadline_minutes": 30
  },
  "en_route_suggestions": [
    {
      "location_id": "dest-gianyar-tirta-empul-001",
      "name": "Tirta Empul Temple",
      "distance_from_previous": 12.5,
      "estimated_time": 25,
      "reason": "Spiritual purification site, 10-minute detour"
    }
  ],
  "booking_action_link": "[https://balicarcharter.com/checkout?ref=req-889102](https://balicarcharter.com/checkout?ref=req-889102)",
  "driver_english_level": "fluent",
  "available_drivers": [
    {
      "driver_id": "drv-001",
      "name": "I Wayan Astawa",
      "rating": 4.8,
      "languages": ["English", "Indonesian"],
      "vehicle": "Toyota Innova Zenix (Silver)"
    }
  ]
}
```

### Function 2: `validateFleetAgainstFCS`

#### Input:
```json
{
  "pax": 5,
  "luggage": {
    "large_suitcases": 3,
    "cabin_bags": 2
  },
  "fleet_category": "Premium MPV Charter",
  "zone": "South Bali",
  "duration_hours": 10
}
```

#### Output:
```json
{
  "is_valid": true,
  "validation_errors": [],
  "recommended_category": "Premium MPV Charter",
  "alternative_categories": [
    "Executive Van Charter",
    "Large Group Van Charter"
  ],
  "details": {
    "capacity_match": true,
    "zone_compliance": true,
    "duration_suitable": true
  }
}
```

### Function 3: `getAvailableDrivers`

#### Input:
```json
{
  "fleet_category": "Premium MPV Charter",
  "location": {
    "lat": -8.8012,
    "lng": 115.2341
  },
  "radius_km": 10,
  "rating_min": 4.5,
  "language": "English"
}
```

#### Output:
```json
{
  "available_drivers": [
    {
      "driver_id": "drv-001",
      "name": "I Wayan Astawa",
      "phone": "+6281234567890",
      "rating": 4.8,
      "languages": ["English", "Indonesian"],
      "avatar_url": "https://storage.balicarcharter.com/drivers/001/avatar.jpg",
      "vehicle_info": "Toyota Innova Zenix 2023",
      "distance_km": 2.5,
      "eta_arrival": "2026-10-14T09:30:00+08:00",
      "available_until": "2026-10-15T18:00:00+08:00"
    }
  ],
  "total_available": 3
}
```

### Function 4: `checkDestinationRelevance`

#### Input:
```json
{
  "destination_id": "dest-gianyar-ubud-001",
  "traveler_preferences": {
    "interest": ["temple", "culture", "nature"],
    "difficulty_level": "moderate"
  },
  "current_location": {
    "lat": -8.8012,
    "lng": 115.2341
  }
}
```

#### Output:
```json
{
  "is_relevant": true,
  "relevance_score": 0.85,
  "reason": "Matches traveler interests in culture & nature",
  "recommended_order": 1,
  "estimated_visit_time": 120,
    "alternative_destinations": [
    {
      "location_id": "dest-badung-uluwatu-001",
      "name": "Uluwatu Temple",
      "distance_km": 25.3,
      "match_score": 0.78,
      "reason": "Matches culture interest, closer to route"
    }
  ]
}
```

### Function 5: `validateEnglishDriver`

#### Input:
```json
{
  "driver_id": "drv-001",
  "destination_ids": ["dest-gianyar-ubud-001"],
  "traveler_count": 4
}
```

#### Output:
```json
{
  "is_valid": true,
  "english_proficiency": "fluent",
  "certification_id": "ENG-2023-001",
  "test_scores": {
    "toefl": 580,
    "speaking": 95,
    "writing": 88,
    "listening": 92
  },
  "driver_bio": "I Wayan Astawa has been working with Bali Car Charter since 2020...",
  "id_verification": {
    "verified": true,
    "id_type": "passport",
    "expiry_date": "2028-12-31"
  }
}
```

### Function 6: `calculateRouteWithTraffic`

#### Input:
```json
{
  "start_coords": { "lat": -8.8012, "lng": 115.2341 },
  "end_coords": { "lat": -8.5704, "lng": 115.4869 },
  " waypoints": [
    { "lat": -8.6850, "lng": 115.1026 }
  ],
  "travel_date": "2026-10-15",
  "timezone": "Asia/Makassar"
}
```

#### Output:
```json
{
  "total_distance_km": 45.8,
  "estimated_time_minutes": 78,
  "route_summary": "Via Jl. Ngurah Rai, Jl. Tol Bali Mandara, Jl. By Pass Ngurah Rai",
  "traffic_multiplier": 1.3,
  "real_time_status": "normal",
  "alternative_routes": [
    {
      "route_id": "alt-001",
      "distance_km": 47.2,
      "estimated_time_minutes": 85,
      "reason": "Less traffic, longer distance"
    }
  ],
  "road_conditions": {
    "traffic_jam": false,
    "construction": false,
    "weather": "clear"
  }
}
```

### Function 7: `validateDriverSchedule`

#### Input:
```json
{
  "driver_id": "drv-001",
  "date": "2026-10-15",
  "estimated_duration_hours": 10
}
```

#### Output:
```json
{
  "is_available": true,
  "bookable_slots": [
    {
      "start_time": "2026-10-15T08:00:00+08:00",
      "end_time": "2026-10-15T18:00:00+08:00",
      "confirmed": false
    }
  ],
  "conflicts": [],
  "driver_status": "available"
}
```

### Function 8: `generatePaymentLink`

#### Input:
```json
{
  "request_id": "req-889102",
  "amount_idr": 1820000,
  "currency": "IDR",
  "payment_methods": ["credit_card", "bank_transfer"],
  "customer_info": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+6281234567890"
  }
}
```

#### Output:
```json
{
  "payment_link": "https://payment.xendit.co/balicarcharter/req-889102",
  "qr_code_url": "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=payment_req_889102",
  "expiry_minutes": 30,
  "payment_status": "pending",
  "bank_accounts": [
    {
      "bank_code": "014",
      "account_number": "1234567890",
      "account_name": "Bali Car Charter",
      "bank_name": "BCA"
    }
  ],
  "virtual_account": "8885123456789012"
}
```

### Function 9: `getDestinationDetails`

#### Input:
```json
{
  "destination_id": "dest-gianyar-ubud-001",
  "language": "id"
}
```

#### Output:
```json
{
  "destination_id": "dest-gianyar-ubud-001",
  "name": "Monkey Forest Sanctuary Ubud",
  "coordinates": { "lat": -8.5704, "lng": 115.4869 },
  "zone": "Central Bali",
  "description": "Ancient sacred forest home to hundreds of macaques",
  "highlights": [
    "Historical Site",
    "Wildlife Watching",
    "Cultural Experience"
  ],
  "visitor_info": {
    "opening_hours": "08:00-18:00",
    "average_visit_time_minutes": 120,
    "difficulty_level": "easy"
  },
  "pricing": {
    "entry_fee_idr": 15000,
    "guide_service_idr": 200000
  },
  "tags": ["temple", "nature", "cultural", "family-friendly"],
  "images": [
    "https://storage.balicarcharter.com/destinations/001/main.jpg",
    "https"://storage.balicarcharter.com/destinations/001/view2.jpg"
  ]
}
```

### Function 10: `validateBookingConstraints`

#### Input:
```json
{
  "traveler_id": "trv-001",
  "destination_ids": ["dest-gianyar-ubud-001", "dest-badung-uluwatu-001"],
  "travel_date": "2026-10-15",
  "fleet_category": "Premium MPV Charter"
}
```

#### Output:
```json
{
  "is_valid": true,
  "constraint_violations": [],
  "auto_split_suggestion": {
    "requires_split": false,
    "reason": "Within single day limits"
  },
  "recommendations": {
    "optimal_timing": "09:00-11:00",
    "avoid_times": "15:00-17:00"
  }
}
```

---

## 3. WAKTU & SINYAL TIMEOUT

### 3.1 Service Level Agreements (SLA)
| Function | Max Response Time | Rate Limit |
|----------|-------------------|------------|
| `calculate_itinerary_and_fleet` | 500ms | 1000/s |
| `validateFleetAgainstFCS` | 200ms | 5000/s |
| `getAvailableDrivers` | 300ms | 3000/s |
| `checkDestinationRelevance` | 150ms | 5000/s |
| `validateEnglishDriver` | 100ms | 5000/s |
| `calculateRouteWithTraffic` | 400ms | 2000/s |
| `validateDriverSchedule` | 200ms | 3000/s |
| `generatePaymentLink` | 500ms | 100/s |
| `getDestinationDetails` | 150ms | 5000/s |
| `validateBookingConstraints` | 200ms | 3000/s |

### 3.2 Error Codes
| Code | Description | Resolution |
|------|-------------|------------|
| ERR-001 | Invalid request format | Check input validation |
| ERR-002 | FCS validation failed | Check passenger/luggage constraints |
| ERR-003 | Driver not available | Try different time slot |
| ERR-004 | Insufficient English proficiency | Request different driver |
| ERR-005 | Route calculation failed | Try alternative route |
| ERR-006 | Payment gateway error | Try different payment method |
| ERR-007 | Destination not found | Try different location |
| ERR-008 | Session expired | Please login again |
| ERR-009 | Rate limit exceeded | Wait and try again |
| ERR-010 | Internal server error | Contact support |

---

## 4. WEBHOOK INTEGRATION

### 4.1 Payment Webhooks
```json
{
  "event": "payment.completed",
  "data": {
    "payment_id": "pay-889102",
    "amount": 1820000,
    "currency": "IDR",
    "status": "completed",
    "timestamp": "2026-10-14T10:30:00Z",
    "metadata": {
      "request_id": "req-889102",
      "booking_reference": "BCC-20261014-001"
    }
  }
}
```

### 4.2 Driver Assignment Webhooks
```json
{
  "event": "driver.assigned",
  "data": {
    "booking_id": "bkg-889102",
    "driver_id": "drv-001",
    "vehicle_info": "Toyota Innova Zenix",
    "estimated_pickup": "2026-10-14T09:30:00+08:00",
    "contact_phone": "+6281234567890"
  }
}
```

---

## 5. MONGO DB & CACHE STRATEGY

### 5.1 Database Schema untuk Function Caching
```sql
-- Function result cache
CREATE TABLE function_cache (
  key VARCHAR(255) PRIMARY KEY,
  result JSONB NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Traveler preferences cache
CREATE TABLE traveler_preferences (
  traveler_id UUID PRIMARY KEY,
  preferences JSONB NOT NULL,
  last_updated TIMESTAMP DEFAULT NOW()
);

-- Driver cache
CREATE TABLE driver_cache (
  driver_id UUID PRIMARY KEY,
  profile_data JSONB NOT NULL,
  availability JSONB NOT NULL,
  last_updated TIMESTAMP DEFAULT NOW()
);
```

### 5.2 Redis Cache Strategy
- **TTL:** 1 hour untuk itinerary calculation results
- **Key Pattern:** `calc:{hash_of_request_params}`
- **Warm up:** Pre-cache popular routes dan destinasi

---

## 6. ANALITIK & MONITORING

### 6.1 Key Performance Metrics
| Metric | Target | Measurement |
|--------|--------|-------------|
| **Function Response Time** | < 500ms | Application Monitoring |
| **Success Rate** | > 99.5% | APM tools |
| **Error Rate** | < 0.5% | Error tracking |
| **Cache Hit Ratio** | > 80% | Redis monitoring |
| **Database Query Time** | < 100ms | Database monitoring |

### 6.2 Alert Conditions
- Response time > 2x SLA for > 5 minutes
- Error rate > 5% for > 2 minutes
- Cache miss ratio > 20% for > 10 minutes

---

## 7. FUTURE ENHANCEMENT

### 7.1 New Function Proposals
- `analyze_trend_patterns`: Analisis perjalanan berdasarkan musim dan hari libur
- `optimize_route_planning`: Optimasi rute menggunakan ML predictions
- `personalized_itinerary_builder`: AI untuk personalisasi berdasarkan riwayat perjalanan
- `multilingual_support`: Dynamic language detection dan translation
- `voice_concierge`: Integration dengan WhatsApp Voice API

### 7.2 Architecture Scalability
- **Horizontal Scaling:** Load balancer untuk function calling
- **Database Scaling:** Read replicas untuk query-heavy operations
- **Cache Scaling:** Redis cluster untuk high-traffic periods
- **API Gateway:** Rate limiting, authentication, monitoring

---

## 8. IMPLEMENTATION CHECKLIST

### Phase 1: Core Function Implementation
- [ ] Implement `calculate_itinerary_and_fleet` dengan OSRM integration
- [ ] Implement `validateFleetAgainstFCS` dengan FCS v1.0 rules
- [ ] Implement caching layer untuk frequently accessed data
- [ ] Setup comprehensive error handling dan retry logic
- [ ] Implement rate limiting dan throttling

### Phase 2: Integration & Testing
- [ ] End-to-end testing untuk semua function calls
- [ ] Performance testing dengan simulated load
- [ ] Security testing untuk authentication dan authorization
- [ ] Disaster recovery testing untuk function availability

### Phase 3: Monitoring & Optimization
- [ ] Setup APM monitoring untuk semua function calls
- [ ] Implement alerting untuk SLA violations
- [ ] Performance tuning berdasarkan real-world usage
- [ ] Cache warm-up strategies

---

## 9. DOCUMENT CONTROL

**Document Version History:**
- **v1.0:** Initial version (2026-09-20)
- **v2.0:** Enhanced dengan 10+ function signatures, improved error handling

**Review Schedule:**
- **Monthly:** API specification review
- **Quarterly:** Function performance and SLA analysis
- **Annual:** Complete API specification revision

---

**END OF INTEGRATION MATRIX & API SPECIFICATION**

*Document implemented for production-ready multi-agent AI operations with Function Calling capabilities*