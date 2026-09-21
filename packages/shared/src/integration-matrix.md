# 🔌 INTEGRATION MATRIX & API FUNCTION CALLING SPECIFICATION
**Version:** 1.0  
**Authority Level:** CONTROLLED   
**Project:** Bali Car Charter — Backend Engine

---

## 1. SERVICE INTEGRATION MATRIX

| Service Provider | Service Name | API Endpoint | Integration Type | Status |
|------------------|--------------|--------------|------------------|---------|
| **Mapbox** | Mapbox GL JS | `/api/maps/*` | Frontend Library | Production |
| **Supabase** | Realtime | `wss://realtime.supabase.co` | WebSocket | Production |
| **Xendit** | Xendit API | `/api/payments/*` | Payment Gateway | Production |
| **Meta** | WhatsApp Cloud API | `/api/whatsapp/*` | Communication | Production |
| **Google** | Places API | `places.googleapis.com` | Autocomplete | Production |
| **OpenStreetMap** | OSM | `/api/routing/*` | Routing Engine | Production |
| **Groq** | Groq API | `/api/ai/*` | AI Services | Production |
| **Supabase** | PostgreSQL | `/api/db/*` | Database | Production |

---

## 2. API FUNCTION CALLING SPECIFICATIONS

### 2.1 Core Backend API Functions

#### 2.1.1 `calculate_itinerary_and_fleet` Function
**Purpose:** Calculate optimal itinerary and recommend fleet based on passenger requirements

**Input Parameters:**
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
  "timezone": "Asia/Makassar",
  "traffic_multiplier": 1.3,
  "fcs_validation": true
}
```

**Output Response:**
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
    "backtracking_free": true,
    "auto_split_applied": false
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
  "booking_action_link": "https://balicarcharter.com/checkout?ref=req-889102",
  "driver_english_level": "fluent",
  "available_drivers": [
    {
      "driver_id": "drv-001",
      "name": "I Wayan Astawa",
      "rating": 4.8,
      "languages": ["English", "Indonesian"],
      "avatar_url": "https://storage.balicarcharter.com/drivers/001/avatar.jpg",
      "vehicle": "Toyota Innova Zenix (Silver)",
      "distance_km": 2.5,
      "eta_arrival": "2026-10-14T09:30:00+08:00",
      "available_until": "2026-10-15T18:00:00+08:00"
    }
  ]
}
```

#### 2.1.2 `validateFleetAgainstFCS` Function
**Purpose:** Validate fleet recommendations against FCS v1.0 standards

**Input:**
```json
{
  "pax": 5,
  "luggage": {
    "large_suitcases": 3,
    "cabin_bags": 2
  },
  "fleet_category": "Premium MPV Charter",
  "zone": "South Bali",
  "duration_hours": 10,
  "comfort_tier": "Premium"
}
```

**Output:**
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
    "duration_suitable": true,
    "comfort_tier_approved": true,
    "luggage_handling": "optimal"
  },
  "fcs_compliance": {
    "fcs_version": "v1.0",
    "validation_rules_applied": [
      "passenger_capacity",
      "luggage_capacity",
      "zone_restriction",
      "duration_limit"
    ]
  }
}
```

#### 2.1.3 `getAvailableDrivers` Function
**Purpose:** Get list of available drivers for a specific vehicle category

**Input:**
```json
{
  "fleet_category": "Premium MPV Charter",
  "location": {
    "lat": -8.8012,
    "lng": 115.2341
  },
  "radius_km": 10,
  "rating_min": 4.5,
  "language": "English",
  "availability_date": "2026-10-15",
  "pickup_time": "2026-10-14T09:30:00+08:00",
  "filters": {
    "is_english_speaker": true,
    "has_background_check": true,
    "is_available": true
  }
}
```

**Output:**
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
      "available_until": "2026-10-15T18:00:00+08:00",
      "english_proficiency": "fluent",
      "background_check_status": "completed",
      "wallet_balance_idr": 5000000,
      "total_trips_completed": 150,
      "is_available": true
    }
  ],
  "total_available": 3,
  "search_criteria": {
    "fleet_category": "Premium MPV Charter",
    "radius_km": 10,
    "rating_min": 4.5,
    "language": "English"
  }
}
```

#### 2.1.4 `checkDestinationRelevance` Function
**Purpose:** Check if destination is relevant to traveler's preferences and itinerary

**Input:**
```json
{
  "destination_id": "dest-gianyar-ubud-001",
  "traveler_preferences": {
    "interest": ["temple", "culture", "nature"],
    "difficulty_level": "moderate",
    "duration_preference": "full_day"
  },
  "current_location": {
    "lat": -8.8012,
    "lng": 115.2341
  },
  "travel_date": "2026-10-15",
  "itinerary_context": {
    "existing_destinations": ["dest-gianyar-ubud-001"],
    "current_day": 1
  }
}
```

**Output:**
```json
{
  "is_relevant": true,
  "relevance_score": 0.85,
  "reason": "Matches traveler interests in culture & nature",
  "recommended_order": 1,
  "estimated_visit_time": 120,
  "compatibility_with_existing": "high",
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

#### 2.1.5 `validateEnglishDriver` Function
**Purpose:** Validate driver's English proficiency and certification

**Input:**
```json
{
  "driver_id": "drv-001",
  "destination_ids": ["dest-gianyar-ubud-001"],
  "traveler_count": 4,
  "validation_type": "full"
}
```

**Output:**
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
    "expiry_date": "2028-12-31",
    "issuing_country": "Indonesia"
  },
  "background_check": {
    "status": "completed",
    "criminal_record_check": true,
    "driving_license_valid": true,
    "check_date": "2023-06-15"
  },
  "compliance": {
    "fcs_rules_applied": true,
    "bali_local_regulations": true,
    "tourist_safety_standards": true
  }
}
```

#### 2.1.6 `calculateRouteWithTraffic` Function
**Purpose:** Calculate optimized route considering traffic conditions and Bali-specific factors

**Input:**
```json
{
  "start_coords": { "lat": -8.8012, "lng": 115.2341 },
  "end_coords": { "lat": -8.5704, "lng": 115.4869 },
  "waypoints": [
    { "lat": -8.6850, "lng": 115.1026 }
  ],
  "travel_date": "2026-10-15",
  "timezone": "Asia/Makassar",
  "vehicle_type": "Premium MPV Charter",
  "traffic_data_source": "real_time",
  "consider_holidays": true
}
```

**Output:**
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
  },
  "bali_specific_factors": {
    "ngapit_jalan_risk": false,
    "tourist_area_congestion": true,
    "road_narrowing_risk": false,
    "village_ceremony_impact": false
  }
}
```

#### 2.1.7 `validateDriverSchedule` Function
**Purpose:** Validate driver availability for specific dates/times

**Input:**
```json
{
  "driver_id": "drv-001",
  "date": "2026-10-15",
  "estimated_duration_hours": 10,
  "pickup_location": {
    "lat": -8.8012,
    "lng": 115.2341
  },
  "destination_locations": [
    { "lat": -8.5704, "lng": 115.4869 }
  ]
}
```

**Output:**
```json
{
  "is_available": true,
  "bookable_slots": [
    {
      "start_time": "2026-10-15T08:00:00+08:00",
      "end_time": "2026-10-15T18:00:00+08:00",
      "confirmed": false,
      "availability_confirmed_by": "driver"
    }
  ],
  "conflicts": [],
  "driver_status": "available",
  "maximum_working_hours": 10,
  "breaks_required": [
    {
      "start_time": "2026-10-15T12:00:00+08:00",
      "end_time": "2026-10-15T13:00:00+08:00",
      "type": "lunch_break"
    }
  ],
  "shift_restriction_violations": []
}
```

#### 2.1.8 `generatePaymentLink` Function
**Purpose:** Generate payment link for booking

**Input:**
```json
{
  "request_id": "req-889102",
  "amount_idr": 1820000,
  "currency": "IDR",
  "payment_methods": ["credit_card", "bank_transfer"],
  "customer_info": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+6281234567890",
    "billing_address": {
      "street": "Jl. Contoh No. 123",
      "city": "Denpasar",
      "country": "Indonesia",
      "postal_code": "80000"
    }
  },
  "metadata": {
    "booking_reference": "BCC-20261014-001",
    "traveler_id": "trv-001",
    "vehicle_category": "Premium MPV Charter",
    "duration_days": 1
  }
}
```

**Output:**
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
    },
    {
      "bank_code": "008",
      "account_number": "0987654321",
      "account_name": "Bali Car Charter",
      "bank_name": "Mandiri"
    }
  ],
  "virtual_account": "8885123456789012",
  "redirect_url": "https://balicarcharter.com/payment-success?req=req-889102",
  "webhook_url": "https://api.balicarcharter.com/webhooks/xendit/payments"
}
```

#### 2.1.9 `getDestinationDetails` Function
**Purpose:** Get detailed information about a destination

**Input:**
```json
{
  "destination_id": "dest-gianyar-ubud-001",
  "language": "id",
  "include_details": true,
  "include_pricing": true,
  "include_accessibility": true
}
```

**Output:**
```json
{
  "destination_id": "dest-gianyar-ubud-001",
  "name": "Monkey Forest Sanctuary Ubud",
  "slug": "ubud/monkey-forest-sanctuary-ubud",
  "coordinates": { "lat": -8.5704, "lng": 115.4869 },
  "zone": "Central Bali",
  "description": "Ancient sacred forest home to hundreds of macaques",
  "description_en": "Ancient sacred forest home to hundreds of macaques",
  "description_id": "Hutan suci kuno tempat ratusan kera tinggal",
  "highlights": [
    "Historical Site",
    "Wildlife Watching",
    "Cultural Experience"
  ],
  "visit_time_minutes": 120,
  "difficulty_level": "easy",
  "opening_hours": {
    "weekday": "08:00-18:00",
    "weekend": "08:00-18:00",
    "holidays": "08:00-18:00"
  },
  "pricing": {
    "entry_fee_idr": 15000,
    "guide_service_idr": 200000,
    "parking_fee_idr": 5000
  },
  "facilities": [
    "restrooms",
    "parking",
    "gift_shop",
    "cafeteria"
  ],
  "tags": [
    "temple",
    "nature",
    "cultural",
    "family-friendly"
  ],
  "images": [
    "https://storage.balicarcharter.com/destinations/001/main.jpg",
    "https://storage.balicarcharter.com/destinations/001/view2.jpg",
    "https://storage.balicarcharter.com/destinations/001/view3.jpg"
  ],
  "location_details": {
    "address": "Jl. Monkey Forest, Ubud, Gianyar Regency",
    "nearest_town": "Ubud",
    "estimated_travel_time_from_center": "15 minutes"
  },
  "accessibility": {
    "wheelchair_friendly": true,
    "parking_available": true,
    "restroom_facilities": true,
    "guided_tour_available": true
  },
  "similar_destinations": [
    {
      "destination_id": "dest-gianyar-tirta-empul-001",
      "name": "Tirta Empul Temple",
      "distance_km": 8.5,
      "similarity_score": 0.75
    }
  ],
  "seo_metadata": {
    "meta_title": "Monkey Forest Ubud - Cultural Experience in Bali",
    "meta_description": "Visit Monkey Forest Ubud, a sacred forest with hundreds of macaques. Cultural experience in central Bali.",
    "keywords": "monkey forest ubud, bali temple, cultural experience"
  }
}
```

#### 2.1.10 `validateBookingConstraints` Function
**Purpose:** Validate booking constraints and auto-split if necessary

**Input:**
```json
{
  "traveler_id": "trv-001",
  "destination_ids": ["dest-gianyar-ubud-001", "dest-badung-uluwatu-001"],
  "travel_date": "2026-10-15",
  "fleet_category": "Premium MPV Charter",
  "duration_preference": "full_day",
  "budget_max_idr": 5000000,
  "vehicle_constraints": {
    "max_passengers": 6,
    "max_luggage": 4
  }
}
```

**Output:**
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
    "avoid_times": "15:00-17:00",
    "route_optimization": "add tirta-empul-for-balance"
  },
  "pricing_breakdown": {
    "base_fare_idr": 1,400,000,
    "zone_surcharges_total_idr": 0,
    "discounts_applied_idr": 0,
    "total_price_idr": 1,820,000,
    "seasonal_multiplier_applied": false
  },
  "capacity_validation": {
    "total_passengers": 4,
    "total_luggage": 3,
    "capacity_violation": false,
    "fleet_recommended": "Premium MPV Charter"
  }
}
```

---

## 3. SERVICE INTEGRATION SPECIFICATIONS

### 3.1 WhatsApp Integration Specifications

#### 3.1.1 WhatsApp Webhook Payload
```json
{
  "object": "whatsapp_business_account",
  "entry": [
    {
      "id": "1234567890",
      "changes": [
        {
          "value": {
            "messaging_product": "whatsapp",
            "phone_number_id": "123456789",
            "status": "verified",
            "token": "ABC123DEF456"
          },
          "field": "messages"
        }
      ]
    }
  ]
}
```

#### 3.1.2 Message Templates
```json
{
  "template_name": "booking_confirmation",
  "language": "id",
  "components": [
    {
      "type": "body",
      "parameters": [
        {
          "type": "text",
          "text": "John Doe"
        },
        {
          "type": "text",
          "text": "Premium MPV Charter"
        },
        {
          "type": "text",
          "text": "2026-10-15"
        },
        {
          "type": "text",
          "text": "08:00"
        }
      ]
    }
  ]
}
```

### 3.2 Xendit Payment Integration Specifications

#### 3.2.1 Payment Webhook Payload
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
      "booking_reference": "BCC-20261014-001",
      "traveler_id": "trv-001"
    }
  }
}
```

#### 3.2.2 Driver Disbursement Specifications
```json
{
  "disburse_to_bank_account": {
    "bank_code": "014",
    "account_number": "1234567890",
    "account_holder_name": "I Wayan Astawa"
  },
  "amount": 1820000,
  "fee": 18200,
  "description": "Driver payout for booking BCC-20261014-001",
  "reference_id": "disb-889102"
}
```

---

## 4. ERROR HANDLING & MONITORING

### 4.1 Error Response Standards
```json
{
  "success": false,
  "error": {
    "code": "ERR-001",
    "message": "Invalid request parameters",
    "details": {
      "field": "destination_ids",
      "issue": "Must be array of strings",
      "valid_values": ["dest-gianyar-ubud-001", "dest-gianyar-tampaksiring-001"]
    },
    "timestamp": "2026-10-14T10:30:00Z",
    "request_id": "req-889102"
  }
}
```

### 4.2 Logging Standards
```json
{
  "log_level": "INFO",
  "timestamp": "2026-10-14T10:30:00Z",
  "service": "calculate_itinerary_and_fleet",
  "request_id": "req-889102",
  "user_id": "trv-001",
  "parameters": {
    "destination_ids": ["dest-gianyar-ubud-001"],
    "duration_preference": "full_day"
  },
  "response_time_ms": 245,
  "success": true,
  "error_code": null
}
```

---

## 5. SECURITY & COMPLIANCE

### 5.1 API Security Standards
```yaml
security_headers:
  - name: "Content-Security-Policy"
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.example.com; style-src 'self' 'unsafe-inline'"
  - name: "X-Frame-Options"
    value: "DENY"
  - name: "X-Content-Type-Options"
    value: "nosniff"
  - name: "Referrer-Policy"
    value: "strict-origin-when-cross-origin"
```

### 5.2 Data Privacy Compliance
```json
{
  "gdpr_compliance": true,
  "data_retention_days": 2555,
  "data_subject_rights": [
    "access",
    "rectification",
    "erasure",
    "portability",
    "objection"
  ],
  "consent_records": {
    "terms_accepted_at": "2026-09-20T10:00:00Z",
    "privacy_policy_accepted_at": "2026-09-20T10:05:00Z",
    "marketing_consent": false,
    "data_processing_consent": true
  }
}
```

---

## 6. PERFORMANCE & MONITORING

### 6.1 Service Level Agreements (SLA)
| Function | Target Response Time | Availability | Error Rate |
|----------|---------------------|--------------|------------|
| `calculate_itinerary_and_fleet` | < 500ms | 99.9% | < 0.5% |
| `validateFleetAgainstFCS` | < 200ms | 99.95% | < 0.1% |
| `getAvailableDrivers` | < 300ms | 99.9% | < 0.5% |
| `checkDestinationRelevance` | < 150ms | 99.95% | < 0.1% |
| `validateEnglishDriver` | < 100ms | 99.95% | < 0.1% |
| `calculateRouteWithTraffic` | < 400ms | 99.9% | < 0.5% |
| `validateDriverSchedule` | < 200ms | 99.95% | < 0.1% |
| `generatePaymentLink` | < 500ms | 99.9% | < 0.5% |
| `getDestinationDetails` | < 150ms | 99.95% | < 0.1% |
| `validateBookingConstraints` | < 200ms | 99.95% | < 0.1% |

### 6.2 Monitoring Metrics
```yaml
metrics:
  - name: "function_response_time"
    type: "histogram"
    buckets: [10, 50, 100, 200, 500, 1000]
  
  - name: "function_error_rate"
    type: "counter"
    filters:
      - "error:true"
  
  - name: "cache_hit_ratio"
    type: "gauge"
    target: "> 80%"
  
  - name: "database_connection_pool"
    type: "gauge"
    target: "< 90%"
```

---

## 7. DEPLOYMENT & INFRASTRUCTURE

### 7.1 Docker Configuration
```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

FROM node:20-alpine AS runner

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

EXPOSE 3000

CMD ["node", "dist/server.js"]
```

### 7.2 Kubernetes Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: bali-car-charter-api
  labels:
    app: bali-car-charter
    component: api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: bali-car-charter
      component: api
  template:
    metadata:
      labels:
        app: bali-car-charter
        component: api
    spec:
      containers:
      - name: api
        image: balicarcharter/api:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: url
        - name: REDIS_URL
          valueFrom:
            secretKeyRef:
              name: redis-config
              key: url
        resources:
          requests:
            cpu: 100m
            memory: 128Mi
          limits:
            cpu: 500m
            memory: 512Mi
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
```

---

## 8. TESTING & VALIDATION

### 8.1 Test Coverage Requirements
| Test Type | Coverage Target | Description |
|-----------|-----------------|-------------|
| **Unit Tests** | > 90% | Individual functions and classes |
| **Integration Tests** | > 80% | API endpoints and service integration |
| **Contract Tests** | > 70% | OpenAPI specification compliance |
| **Performance Tests** | < 500ms response time | Load testing with 1000+ concurrent users |
| **Security Tests** | OWASP compliance | Penetration testing and vulnerability scanning |

### 8.2 Test Data Management
```json
{
  "test_data": {
    "users": {
      "valid": [
        {
          "id": "trv-001",
          "email": "test@example.com",
          "role": "traveler",
          "verified": true
        }
      ],
      "invalid": [
        {
          "id": "invalid-id",
          "email": "invalid-email",
          "role": "unknown",
          "verified": false
        }
      ]
    },
    "fleet_categories": {
      "valid": [
        {
          "id": "cat-premium-mpv",
          "name": "Premium MPV Charter",
          "capacity_passengers": 6
        }
      ]
    },
    "destinations": {
      "valid": [
        {
          "id": "dest-gianyar-ubud-001",
          "name": "Monkey Forest Sanctuary Ubud",
          "zone": "Central Bali"
        }
      ]
    }
  }
}
```

---

## 9. DOCUMENTATION & REFERENCES

### 9.1 API Documentation
- **OpenAPI Specification:** `/api/docs/openapi.json`
- **Interactive Documentation:** `https://api.balicarcharter.com/docs`
- **API Reference:** `https://docs.balicarcharter.com/api`

### 9.2 Developer Documentation
- **Architecture Overview:** `ARCHITECTURE.md`
- **Development Guidelines:** `DEVELOPMENT.md`
- **Deployment Procedures:** `DEPLOYMENT.md`
- **Testing Strategy:** `TESTING.md`

### 9.3 Related Documentation
- `TECHNICAL_ARCHITECTURE.md` - Technical architecture specifications
- `DATA_MODELS.md` - Database schema and relationships
- `SECURITY_SPEC.md` - Security controls and compliance
- `TESTING_STRATEGY.md` - Testing approach and validation
- `DEPLOYMENT_OPS.md` - Deployment and operations procedures

---

## 10. VERSION CONTROL & RELEASE MANAGEMENT

### 10.1 Git Branch Strategy
```
feature/<agent-id>/<short-description>  # New feature
fix/<agent-id>/<short-description>       # Bug fix
docs/<agent-id>/<spec-name>              # Documentation update
chore/<agent-id>/<task>                  # Maintenance
```

### 10.2 Release Process
1. **Feature Freeze:** 2 weeks before release
2. **Feature Branch Testing:** Automated testing
3. **Staging Environment:** Manual testing and validation
4. **Production Deployment:** Blue-green deployment
5. **Monitoring & Alerting:** Post-release monitoring
6. **Documentation Update:** Release notes and changelog

---

## 11. CONTACT & SUPPORT

### 11.1 Support Channels
- **Technical Support:** support@balicarcharter.com
- **Bug Reports:** bugs@balicarcharter.com
- **Feature Requests:** features@balicarcharter.com
- **Emergency Support:** +62-812-3456-7890 (24/7)

### 11.2 Documentation Resources
- **API Documentation:** `https://docs.balicarcharter.com/api`
- **User Guide:** `https://docs.balicarcharter.com/user`
- **Developer Portal:** `https://docs.balicarcharter.com/developers`

---

## 12. COMPLIANCE & REGULATORY

### 12.1 Legal Compliance
- **Indonesia Law:** All Indonesian regulations and laws
- **GDPR:** EU data protection regulations
- **CCPA:** California consumer privacy
- **PCI-DSS:** Payment card industry standards
- **PDPA:** Indonesian data privacy regulations

### 12.2 Regulatory Requirements
```json
{
  "regulatory_compliance": {
    "indonesia": {
      "business_license": true,
      "tax_compliance": true,
      "labor_laws": true
    },
    "gdpr": {
      "data_protection_officer": true,
      "data_subject_rights": true,
      "data_breach_notification": true
    },
    "ccpa": {
      "consumer_rights": true,
      "privacy_policy": true
    },
    "pci_dss": {
      "cardholder_data_security": true,
      "access_control": true,
      "monitoring_logging": true
    }
  }
}
```

---

## 13. FUTURE ENHANCEMENT

### 13.1 Planned Enhancements
- **GraphQL Support:** Query optimization for complex data fetching
- **Real-time Updates:** WebSocket-based real-time communication
- **Advanced Analytics:** Machine learning for predictive insights
- **Multi-language Support:** Additional language translations
- **Mobile App Native Features:** Native mobile app capabilities

### 13.2 Technology Roadmap
```yaml
roadmap:
  version: "2.0"
  features:
    - name: "GraphQL API"
      status: "planned"
      priority: "high"
      estimate: "Q1 2025"
    
    - name: "Real-time Updates"
      status: "planned"
      priority: "medium"
      estimate: "Q2 2025"
    
    - name: "Advanced Analytics"
      status: "planned"
      priority: "high"
      estimate: "Q3 2025"
    
    - name: "Multi-language Support"
      status: "planned"
      priority: "medium"
      estimate: "Q2 2025"
    
    - name: "Mobile Native Features"
      status: "planned"
      priority: "high"
      estimate: "Q4 2025"
```

---

## 14. APPENDIX

### 14.1 Glossary of Terms
- **API:** Application Programming Interface
- **FCS:** Fleet Classification System
- **GIST:** Generalized Search Tree (PostgreSQL spatial index)
- **JSON:** JavaScript Object Notation
- **JWT:** JSON Web Token
- **RLS:** Row Level Security
- **RSS:** Really Simple Syndication
- **SLA:** Service Level Agreement
- **UI:** User Interface
- **UX:** User Experience

### 14.2 Acronyms
| Acronym | Description |
|---------|-------------|
| **AI** | Artificial Intelligence |
| **API** | Application Programming Interface |
| **AWS** | Amazon Web Services |
| **CDN** | Content Delivery Network |
| **CI/CD** | Continuous Integration / Continuous Deployment |
| **DB** | Database |
| **GDP** | Gross Domestic Product |
| **JSON** | JavaScript Object Notation |
| **JWT** | JSON Web Token |
| **K8s** | Kubernetes |
| **NFR** | Non-Functional Requirements |
| **ORM** | Object Relational Mapping |
| **PDF** | Portable Document Format |
| **PII** | Personally Identifiable Information |
| **QRS** | Quality, Reliability, Security |
| **REST** | Representational State Transfer |
| **RLS** | Row Level Security |
| **SaaS** | Software as a Service |
| **SQL** | Structured Query Language |
| **TLS** | Transport Layer Security |
| **UI** | User Interface |
| **UX** | User Experience |
| **VCS** | Version Control System |
| **VM** | Virtual Machine |
| **VPC** | Virtual Private Cloud |

---

## 15. REFERENCE DOCUMENTS

- `TECHNICAL_ARCHITECTURE.md` - Technical architecture specifications
- `DATA_MODELS.md` - Database schema and relationships
- `SECURITY_SPEC.md` - Security controls and compliance
- `TESTING_STRATEGY.md` - Testing approach and validation
- `DEPLOYMENT_OPS.md` - Deployment and operations procedures
- `AGENT_COMMUNICATION_PROTOCOL.md` - Agent communication standards
- `SEO_GEO_STRATEGY.md` - Search engine optimization and geo-targeting

---

**END OF INTEGRATION MATRIX & API SPECIFICATION**

*Document implemented for production-ready multi-agent AI operations with comprehensive service integration and function calling capabilities*