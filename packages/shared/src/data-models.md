# 📊 DATA MODELS
**Version:** 1.0  
**Authority Level:** PRODUCTION READY  
**Project:** Bali Car Charter & Intelligent Itinerary Builder

---

## 1. DATABASE ARCHITECTURE OVERVIEW

### 1.1 Schema Design Principles
- **Relational Model:** Normalized schema for data integrity
- **Spatial Extension:** PostGIS for geographic queries and route planning
- **Performance:** Strategic indexing for high-frequency queries
- **Security:** Row-level security (RLS) for data access control
- **Scalability:** Partitioning strategy for growth

### 1.2 ER Diagram Overview
```
┌─────────────────────────────────────────────────────────────────┐
│                    DATABASE SCHEMA OVERVIEW                     │
├─────────────────────────────────────────────────────────────────┤
│                                                               │
│ Users & Authentication:                                      │
│ ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐ │
│ │ users           │   │ profiles        │   │ sessions        │ │
│ │ auth_providers  │   │ preferences     │   │ tokens          │ │
│ │ roles           │   │ notifications   │   │ mfa_factors     │ │
│ └─────────────────┘   └─────────────────┘   └─────────────────┘ │
│                                                               │
│ Core Business Data:                                           │
│ ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐ │
│ │ fleet           │   │ vehicles        │   │ drivers         │ │
│ │ bookings        │   │ destinations    │   │ itineraries     │ │
│ │ payments        │   │ bookings_items   │   │ reviews         │ │
│ │ zones           │   │ promotions      │   │ coupons         │ │
│ └─────────────────┘   └─────────────────┘   └─────────────────┘ │
│                                                               │
│ Analytics & Integration:                                      │
│ ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐ │
│ │ analytics       │   │ webhooks        │   │ audit_logs      │ │
│ │ reports         │   │ integration_logs│   │ system_logs     │ │
│ │ user_sessions   │   │ geo_events      │   │ activity_logs   │ │
│ └─────────────────┘   └─────────────────┘   └─────────────────┘ │
│                                                               │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. CORE TABLES

### 2.1 Users Table (`users`)
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    avatar_url TEXT,
    date_of_birth DATE,
    nationality VARCHAR(50),
    emergency_contact JSONB,
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    email_verified_at TIMESTAMP,
    phone_verified_at TIMESTAMP,
    last_login_at TIMESTAMP,
    failed_login_attempts INT DEFAULT 0,
    account_locked_until TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    
    -- RLS Policies
    CONSTRAINT users_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_active ON users(is_active);
CREATE INDEX idx_users_verified ON users(is_verified);
```

### 2.2 Profiles Table (`profiles`)
```sql
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    language VARCHAR(10) DEFAULT 'en',
    timezone VARCHAR(50) DEFAULT 'Asia/Makassar',
    currency VARCHAR(3) DEFAULT 'IDR',
    gender VARCHAR(10),
    date_of_birth DATE,
    nationality VARCHAR(50),
    emergency_contact JSONB,
    preferences JSONB DEFAULT '{}',
    marketing_consent BOOLEAN DEFAULT false,
    terms_accepted_at TIMESTAMP NOT NULL,
    privacy_policy_accepted_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT profiles_language_check CHECK (language IN ('en', 'id')),
    CONSTRAINT profiles_currency_check CHECK (length(currency) = 3)
);

-- Indexes
CREATE INDEX idx_profiles_language ON profiles(language);
CREATE INDEX idx_profiles_timezone ON profiles(timezone);
```

### 2.3 Roles Table (`roles`)
```sql
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    level INT NOT NULL, -- Hierarchy level
    permissions JSONB DEFAULT '{}',
    is_system BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT roles_level_check CHECK (level >= 1)
);

-- Indexes
CREATE INDEX idx_roles_name ON roles(name);
CREATE INDEX idx_roles_level ON roles(level);
```

### 2.4 User Roles Junction Table (`user_roles`)
```sql
CREATE TABLE user_roles (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    assigned_by UUID REFERENCES users(id),
    expires_at TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    
    PRIMARY KEY (user_id, role_id),
    CONSTRAINT user_roles_expires_after_assigned CHECK (
        expires_at IS NULL OR expires_at > assigned_at
    )
);

-- Indexes
CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX idx_user_roles_role_id ON user_roles(role_id);
CREATE INDEX idx_user_roles_active ON user_roles(is_active);
```

### 2.5 Fleet Categories Table (`fleet_categories`)
```sql
CREATE TABLE fleet_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon_url TEXT,
    capacity_passengers INT NOT NULL,
    capacity_luggage_large INT NOT NULL,
    capacity_luggage_cabin INT NOT NULL,
    base_rate_idr DECIMAL(10,2) NOT NULL,
    weekend_rate_idr DECIMAL(10,2) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    
    CONSTRAINT fleet_categories_capacity_positive CHECK (
        capacity_passengers > 0 AND 
        capacity_luggage_large >= 0 AND 
        capacity_luggage_cabin >= 0
    ),
    CONSTRAINT fleet_categories_rate_positive CHECK (
        base_rate_idr >= 0 AND weekend_rate_idr >= 0
    )
);

-- Indexes
CREATE INDEX idx_fleet_categories_name ON fleet_categories(name);
CREATE INDEX idx_fleet_categories_active ON fleet_categories(is_active);
```

### 2.6 Vehicles Table (`vehicles`)
```sql
CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vehicle_id VARCHAR(20) NOT NULL UNIQUE,
    category_id UUID REFERENCES fleet_categories(id),
    driver_id UUID REFERENCES users(id),
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    color VARCHAR(30) NOT NULL,
    license_plate VARCHAR(20) NOT NULL,
    seating_capacity INT NOT NULL,
    luggage_capacity_large INT NOT NULL,
    luggage_capacity_cabin INT NOT NULL,
    fuel_type VARCHAR(20) NOT NULL,
    transmission_type VARCHAR(20) NOT NULL,
    ac_enabled BOOLEAN DEFAULT true,
    price_per_day_idr DECIMAL(10,2) NOT NULL,
    price_per_weekend_idr DECIMAL(10,2) NOT NULL,
    is_available BOOLEAN DEFAULT true,
    current_location JSONB,
    last_maintenance_at TIMESTAMP,
    next_maintenance_at TIMESTAMP,
    notes TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    
    CONSTRAINT vehicles_capacity_positive CHECK (
        seating_capacity > 0 AND 
        luggage_capacity_large >= 0 AND 
        luggage_capacity_cabin >= 0
    ),
    CONSTRAINT vehicles_year_valid CHECK (year >= 2010 AND year <= EXTRACT(YEAR FROM CURRENT_DATE) + 1)
);

-- Indexes
CREATE INDEX idx_vehicles_category_id ON vehicles(category_id);
CREATE INDEX idx_vehicles_driver_id ON vehicles(driver_id);
CREATE INDEX idx_vehicles_is_available ON vehicles(is_available);
CREATE INDEX idx_vehicles_license_plate ON vehicles(license_plate);
```

### 2.7 Drivers Table (`drivers`)
```sql
CREATE TABLE drivers (
    id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    license_number VARCHAR(50) NOT NULL UNIQUE,
    license_expiry DATE NOT NULL,
    category_id UUID REFERENCES fleet_categories(id),
    vehicle_id UUID REFERENCES vehicles(id),
    languages JSONB DEFAULT '[]',
    driving_experience_years INT NOT NULL,
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_trips_completed INT DEFAULT 0,
    is_english_speaker BOOLEAN DEFAULT true,
    is_background_checked BOOLEAN DEFAULT false,
    background_check_date TIMESTAMP,
    is_available BOOLEAN DEFAULT true,
    current_location JSONB,
    wallet_balance_idr DECIMAL(10,2) DEFAULT 0.00,
    upi_id VARCHAR(100), -- For Xendit disbursement
    bank_account JSONB,
    emergency_contact JSONB,
    vehicle_insurance_expiry DATE,
    personal_insurance_expiry DATE,
    is_active BOOLEAN DEFAULT true,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    
    CONSTRAINT drivers_license_expiry_future CHECK (license_expiry > CURRENT_DATE),
    CONSTRAINT drivers_experience_positive CHECK (driving_experience_years >= 0),
    CONSTRAINT drivers_rating_range CHECK (rating >= 0 AND rating <= 5),
    CONSTRAINT drivers_total_trips_non_negative CHECK (total_trips_completed >= 0)
);

-- Indexes
CREATE INDEX idx_drivers_category_id ON drivers(category_id);
CREATE INDEX idx_drivers_vehicle_id ON drivers(vehicle_id);
CREATE INDEX idx_drivers_is_available ON drivers(is_available);
CREATE INDEX idx_drivers_is_english_speaker ON drivers(is_english_speaker);
CREATE INDEX idx_drivers_rating ON drivers(rating);
```

### 2.8 Destinations Table (`destinations`)
```sql
CREATE TABLE destinations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    description TEXT,
    description_en TEXT,
    description_id TEXT,
    coordinates JSONB NOT NULL,
    zone_id UUID REFERENCES zones(id),
    address TEXT,
    phone_number VARCHAR(20),
    website_url TEXT,
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_reviews INT DEFAULT 0,
    visit_time_minutes INT,
    difficulty_level VARCHAR(20) DEFAULT 'easy',
    highlights JSONB DEFAULT '[]',
    facilities JSONB DEFAULT '[]',
    images JSONB DEFAULT '[]',
    opening_hours JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    
    CONSTRAINT destinations_coordinates_valid CHECK (
        (coordinates->>'lat')::float >= -90 AND (coordinates->>'lat')::float <= 90 AND
        (coordinates->>'lng')::float >= -180 AND (coordinates->>'lng')::float <= 180
    ),
    CONSTRAINT destinations_rating_range CHECK (rating >= 0 AND rating <= 5),
    CONSTRAINT destinations_visit_time_positive CHECK (visit_time_minutes > 0)
);

-- Indexes
CREATE INDEX idx_destinations_slug ON destinations(slug);
CREATE INDEX idx_destinations_zone_id ON destinations(zone_id);
CREATE INDEX idx_destinations_is_active ON destinations(is_active);
CREATE INDEX idx_destinations_rating ON destinations(rating);

-- GIST index for spatial queries
CREATE INDEX idx_destinations_coordinates ON destinations USING GIST ((coordinates->>'lat')::float, (coordinates->>'lng')::float);
```

### 2.9 Zones Table (`zones`)
```sql
CREATE TABLE zones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    description_en TEXT,
    description_id TEXT,
    color VARCHAR(20) NOT NULL,
    boundary_polygon JSONB,
    estimated_driving_time_minutes INT,
    estimated_fare_min_idr DECIMAL(10,2),
    estimated_fare_max_idr DECIMAL(10,2),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    
    CONSTRAINT zones_color_valid CHECK (color ~* '^#[0-9A-F]{6}$'),
    CONSTRAINT zones_fare_range CHECK (estimated_fare_min_idr <= estimated_fare_max_idr)
);

-- Indexes
CREATE INDEX idx_zones_slug ON zones(slug);
CREATE INDEX idx_zones_is_active ON zones(is_active);
```

### 2.10 Bookings Table (`bookings`)
```sql
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_reference VARCHAR(20) NOT NULL UNIQUE,
    traveler_id UUID REFERENCES users(id) ON DELETE CASCADE,
    driver_id UUID REFERENCES drivers(id),
    vehicle_id UUID REFERENCES vehicles(id),
    origin_location_id UUID REFERENCES locations(id),
    status VARCHAR(30) NOT NULL DEFAULT 'pending',
    booking_type VARCHAR(20) NOT NULL, -- charter, airport_transfer, tour
    duration_hours DECIMAL(5,2) NOT NULL,
    scheduled_start_time TIMESTAMP NOT NULL,
    scheduled_end_time TIMESTAMP NOT NULL,
    actual_start_time TIMESTAMP,
    actual_end_time TIMESTAMP,
    base_fare_idr DECIMAL(10,2) NOT NULL,
    tax_idr DECIMAL(10,2) NOT NULL,
    discount_idr DECIMAL(10,2) DEFAULT 0,
    total_fare_idr DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'IDR',
    payment_status VARCHAR(20) DEFAULT 'pending', -- pending, paid, refunded, failed
    payment_method VARCHAR(50), -- credit_card, bank_transfer, qris, ovo, gopay
    payment_reference VARCHAR(100),
    xendit_payment_id VARCHAR(100),
    driver_payout_id VARCHAR(100),
    driver_payout_status VARCHAR(20), -- pending, paid, failed
    driver_payout_amount_idr DECIMAL(10,2),
    driver_payout_at TIMESTAMP,
    zone_surcharge_idr DECIMAL(10,2) DEFAULT 0,
    seasonal_multiplier DECIMAL(5,2) DEFAULT 1.0,
    cancellation_policy VARCHAR(50) DEFAULT 'flexible',
    cancellation_reason TEXT,
    cancellation_fee_idr DECIMAL(10,2) DEFAULT 0,
    special_requests TEXT,
    internal_notes TEXT,
    customer_notes TEXT,
    itinerary_id UUID REFERENCES itineraries(id),
    is_recurring BOOLEAN DEFAULT false,
    recurrence_pattern JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    
    CONSTRAINT bookings_status_valid CHECK (status IN ('pending', 'confirmed', 'active', 'completed', 'cancelled', 'no_show', 'refunded')),
    CONSTRAINT bookings_payment_status_valid CHECK (payment_status IN ('pending', 'paid', 'refunded', 'failed')),
    CONSTRAINT bookings_payment_method_valid CHECK (payment_method IN ('credit_card', 'bank_transfer', 'qris', 'ovo', 'gopay', 'cash')),
    CONSTRAINT bookings_duration_positive CHECK (duration_hours > 0),
    CONSTRAINT bookings_total_fare_positive CHECK (total_fare_idr > 0),
    CONSTRAINT bookings_schedule_valid CHECK (scheduled_end_time > scheduled_start_time)
);

-- Indexes
CREATE INDEX idx_bookings_reference ON bookings(booking_reference);
CREATE INDEX idx_bookings_traveler_id ON bookings(traveler_id);
CREATE INDEX idx_bookings_driver_id ON bookings(driver_id);
CREATE INDEX idx_bookings_vehicle_id ON bookings(vehicle_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_payment_status ON bookings(payment_status);
CREATE INDEX idx_bookings_scheduled_start_time ON bookings(scheduled_start_time);
CREATE INDEX idx_bookings_created_at ON bookings(created_at);
```

### 2.11 Itineraries Table (`itineraries`)
```sql
CREATE TABLE itineraries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    description_en TEXT,
    description_id TEXT,
    start_location_id UUID REFERENCES locations(id),
    end_location_id UUID REFERENCES locations(id),
    total_duration_minutes INT NOT NULL,
    total_distance_km DECIMAL(8,2),
    average_speed_kmh DECIMAL(8,2),
    is_multi_day BOOLEAN DEFAULT false,
    day_plans JSONB DEFAULT '[]',
    daily_breakdown JSONB DEFAULT '[]',
    weather_considerations JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    
    CONSTRAINT itineraries_total_duration_positive CHECK (total_duration_minutes > 0)
);

-- Indexes
CREATE INDEX idx_itineraries_booking_id ON itineraries(booking_id);
CREATE INDEX idx_itineraries_start_location_id ON itineraries(start_location_id);
CREATE INDEX idx_itineraries_end_location_id ON itineraries(end_location_id);
```

### 2.12 Locations Table (`locations`)
```sql
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    description TEXT,
    coordinates JSONB NOT NULL,
    location_type VARCHAR(30) NOT NULL, -- hotel, destination, airport, landmark
    zone_id UUID REFERENCES zones(id),
    address TEXT,
    phone_number VARCHAR(20),
    website_url TEXT,
    rating DECIMAL(3,2),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    
    CONSTRAINT locations_coordinates_valid CHECK (
        (coordinates->>'lat')::float >= -90 AND (coordinates->>'lat')::float <= 90 AND
        (coordinates->>'lng')::float >= -180 AND (coordinates->>'lng')::float <= 180
    )
);

-- Indexes
CREATE INDEX idx_locations_slug ON locations(slug);
CREATE INDEX idx_locations_location_type ON locations(location_type);
CREATE INDEX idx_locations_zone_id ON locations(zone_id);
CREATE INDEX idx_locations_is_active ON locations(is_active);

-- GIST index for spatial queries
CREATE INDEX idx_locations_coordinates ON locations USING GIST ((coordinates->>'lat')::float, (coordinates->>'lng')::float);
```

### 2.13 Payments Table (`payments`)
```sql
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    payment_method VARCHAR(50) NOT NULL,
    payment_provider VARCHAR(50) NOT NULL, -- xendit, midtrans, stripe
    transaction_id VARCHAR(100) NOT NULL UNIQUE,
    amount_idr DECIMAL(10,2) NOT NULL,
    fee_idr DECIMAL(10,2) NOT NULL,
    net_amount_idr DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'IDR',
    status VARCHAR(20) NOT NULL, -- pending, completed, failed, refunded
    paid_at TIMESTAMP,
    refunded_at TIMESTAMP,
    refund_id VARCHAR(100),
    xendit_invoice_id VARCHAR(100),
    xendit_payment_id VARCHAR(100),
    xendit_disbursement_id VARCHAR(100),
    failure_reason TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    
    CONSTRAINT payments_status_valid CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    CONSTRAINT payments_amount_positive CHECK (amount_idr > 0),
    CONSTRAINT payments_fee_positive CHECK (fee_idr >= 0),
    CONSTRAINT payments_net_positive CHECK (net_amount_idr > 0)
);

-- Indexes
CREATE INDEX idx_payments_booking_id ON payments(booking_id);
CREATE INDEX idx_payments_transaction_id ON payments(transaction_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_created_at ON payments(created_at);
```

### 2.14 Reviews Table (`reviews`)
```sql
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    reviewer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    reviewee_id UUID REFERENCES users(id) ON DELETE CASCADE,
    rating DECIMAL(3,2) NOT NULL,
    title VARCHAR(200),
    comment TEXT,
    is_verified BOOLEAN DEFAULT false,
    is_public BOOLEAN DEFAULT true,
    response_text TEXT,
    response_at TIMESTAMP,
    response_by UUID REFERENCES users(id),
    helpful_count INT DEFAULT 0,
    flags_count INT DEFAULT 0,
    moderation_status VARCHAR(20) DEFAULT 'approved', -- approved, pending, rejected
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    
    CONSTRAINT reviews_rating_range CHECK (rating >= 1 AND rating <= 5),
    CONSTRAINT reviews_status_valid CHECK (moderation_status IN ('approved', 'pending', 'rejected')),
    CONSTRAINT reviews_reviewer_not_reviewee CHECK (reviewer_id != reviewee_id),
    CONSTRAINT reviews_unique_review CHECK (booking_id = reviewer_id)
);

-- Indexes
CREATE INDEX idx_reviews_booking_id ON reviews(booking_id);
CREATE INDEX idx_reviews_reviewer_id ON reviews(reviewer_id);
CREATE INDEX idx_reviews_reviewee_id ON reviews(reviewee_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_is_verified ON reviews(is_verified);
CREATE INDEX idx_reviews_moderation_status ON reviews(moderation_status);
```

### 2.15 Promotions Table (`promotions`)
```sql
CREATE TABLE promotions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    description_en TEXT,
    description_id TEXT,
    discount_type VARCHAR(20) NOT NULL, -- percentage, fixed_amount
    discount_value DECIMAL(10,2) NOT NULL,
    minimum_purchase_idr DECIMAL(10,2),
    maximum_discount_idr DECIMAL(10,2),
    usage_limit INT,
    used_count INT DEFAULT 0,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    applicable_categories JSONB DEFAULT '[]',
    applicable_zones JSONB DEFAULT '[]',
    applicable_booking_types JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    
    CONSTRAINT promotions_discount_positive CHECK (discount_value > 0),
    CONSTRAINT promotions_dates_valid CHECK (end_date > start_date),
    CONSTRAINT promotions_usage_limit_positive CHECK (usage_limit IS NULL OR usage_limit > 0),
    CONSTRAINT promotions_used_count_valid CHECK (used_count <= usage_limit)
);

-- Indexes
CREATE INDEX idx_promotions_code ON promotions(code);
CREATE INDEX idx_promotions_is_active ON promotions(is_active);
CREATE INDEX idx_promotions_dates ON promotions(start_date, end_date);
```

### 2.16 Webhooks Table (`webhooks`)
```sql
CREATE TABLE webhooks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type VARCHAR(100) NOT NULL,
    source VARCHAR(100) NOT NULL,
    payload JSONB NOT NULL,
    headers JSONB DEFAULT '{}',
    processed_at TIMESTAMP,
    processing_attempts INT DEFAULT 0,
    last_error TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT webhooks_processed_at_check CHECK (
        processed_at IS NULL OR processed_at >= created_at
    )
);

-- Indexes
CREATE INDEX idx_webhooks_event_type ON webhooks(event_type);
CREATE INDEX idx_webhooks_source ON webhooks(source);
CREATE INDEX idx_webhooks_processed_at ON webhooks(processed_at);
CREATE INDEX idx_webhooks_processing_attempts ON webhooks(processing_attempts);
```

---

## 3. INDEXING STRATEGY

### 3.1 Critical Indexes for Performance
```sql
-- High-frequency queries
CREATE INDEX idx_bookings_traveler_status ON bookings(traveler_id, status);
CREATE INDEX idx_bookings_driver_status ON bookings(driver_id, status);
CREATE INDEX idx_bookings_vehicle_status ON bookings(vehicle_id, status);
CREATE INDEX idx_bookings_payment_status ON bookings(payment_status);

-- Spatial queries
CREATE INDEX idx_locations_coordinates_gist ON locations USING GIST ((coordinates->>'lat')::float, (coordinates->>'lng')::float);
CREATE INDEX idx_destinations_coordinates_gist ON destinations USING GIST ((coordinates->>'lat')::float, (coordinates->>'lng')::float);

-- Authentication & authorization
CREATE INDEX idx_user_roles_user_role ON user_roles(user_id, role_id);
CREATE INDEX idx_user_roles_active ON user_roles(is_active);

-- Analytics & reporting
CREATE INDEX idx_bookings_created_at_idx ON bookings(created_at DESC);
CREATE INDEX idx_payments_created_at_idx ON payments(created_at DESC);
```

### 3.2 Composite Indexes for Complex Queries
```sql
-- Booking searches with filters
CREATE INDEX idx_bookings_search ON bookings (
    traveler_id, status, scheduled_start_time DESC
);

-- Driver availability queries
CREATE INDEX idx_drivers_availability ON drivers (
    category_id, is_available, is_english_speaker, rating DESC
);

-- Vehicle availability
CREATE INDEX idx_vehicles_availability ON vehicles (
    category_id, is_available, is_active
);

-- Destination searches with spatial filtering
CREATE INDEX idx_destinations_search ON destinations (
    zone_id, is_active, rating DESC
);
```

---

## 4. ROW LEVEL SECURITY (RLS) POLICIES

### 4.1 Users Table RLS
```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own profile
CREATE POLICY users_select_own ON users
    FOR SELECT
    TO authenticated
    USING (id = auth.uid());

-- Policy: Users can update their own profile
CREATE POLICY users_update_own ON users
    FOR UPDATE
    TO authenticated
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- Policy: Admins can view all users
CREATE POLICY users_select_all ON users
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM user_roles ur
            JOIN roles r ON ur.role_id = r.id
            WHERE ur.user_id = auth.uid()
            AND r.name IN ('admin', 'super_admin')
            AND ur.is_active = true
        )
    );
```

### 4.2 Profiles Table RLS
```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can view their own profile
CREATE POLICY profiles_select_own ON profiles
    FOR SELECT
    TO authenticated
    USING (id = auth.uid());

-- Users can update their own profile
CREATE POLICY profiles_update_own ON profiles
    FOR UPDATE
    TO authenticated
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- Admins can view all profiles
CREATE POLICY profiles_select_all ON profiles
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM user_roles ur
            JOIN roles r ON ur.role_id = r.id
            WHERE ur.user_id = auth.uid()
            AND r.name IN ('admin', 'super_admin')
            AND ur.is_active = true
        )
    );
```

### 4.3 Booking Table RLS
```sql
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Users can view their own bookings
CREATE POLICY bookings_select_own ON bookings
    FOR SELECT
    TO authenticated
    USING (traveler_id = auth.uid());

-- Drivers can view their assigned bookings
CREATE POLICY bookings_select_driver ON bookings
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM drivers
            WHERE drivers.id = bookings.driver_id
            AND drivers.id = auth.uid()
        )
    );

-- Admins can view all bookings
CREATE POLICY bookings_select_all ON bookings
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM user_roles ur
            JOIN roles r ON ur.role_id = r.id
            WHERE ur.user_id = auth.uid()
            AND r.name IN ('admin', 'super_admin')
            AND ur.is_active = true
        )
    );

-- Users can create their own bookings
CREATE POLICY bookings_insert_own ON bookings
    FOR INSERT
    TO authenticated
    WITH CHECK (traveler_id = auth.uid());

-- Users can update their own bookings (if not already started)
CREATE POLICY bookings_update_own ON bookings
    FOR UPDATE
    TO authenticated
    USING (
        traveler_id = auth.uid()
        AND status IN ('pending', 'confirmed')
    );
```

---

## 5. DATABASE TRIGGERS & FUNCTIONS

### 5.1 Audit Trigger Function
```sql
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO audit_logs (
        table_name,
        operation_type,
        record_id,
        old_data,
        new_data,
        performed_by,
        performed_at
    ) VALUES (
        TG_TABLE_NAME,
        TG_OP,
        COALESCE(OLD.id, NEW.id),
        CASE WHEN TG_OP = 'DELETE' THEN row_to_json(OLD) ELSE NULL::jsonb END,
        CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW) ELSE NULL::jsonb END,
        auth.uid(),
        CURRENT_TIMESTAMP
    );
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;
```

### 5.2 Trigger Setup for Tables
```sql
-- Create triggers for audit logging
CREATE TRIGGER audit_users_trigger
    AFTER INSERT OR UPDATE OR DELETE ON users
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_profiles_trigger
    AFTER INSERT OR UPDATE OR DELETE ON profiles
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_bookings_trigger
    AFTER INSERT OR UPDATE OR DELETE ON bookings
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

-- ... continue for other important tables
```

---

## 6. ANALYTICS TABLES

### 6.1 Daily Metrics Table (`daily_metrics`)
```sql
CREATE TABLE daily_metrics (
    date DATE PRIMARY KEY,
    bookings_count INT DEFAULT 0,
    revenue_idr DECIMAL(12,2) DEFAULT 0,
    average_booking_value_idr DECIMAL(10,2) DEFAULT 0,
    driver_assignments_count INT DEFAULT 0,
    customer_satisfaction_score DECIMAL(3,2) DEFAULT 0,
    cancellations_count INT DEFAULT 0,
    new_users_count INT DEFAULT 0,
    active_users_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 6.2 User Journey Table (`user_journey_events`)
```sql
CREATE TABLE user_journey_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    event_type VARCHAR(50) NOT NULL,
    event_data JSONB DEFAULT '{}',
    session_id VARCHAR(100),
    page_url TEXT,
    user_agent TEXT,
    ip_address INET,
    device_type VARCHAR(20),
    browser_type VARCHAR(50),
    event_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT user_journey_events_user_id_check CHECK (user_id IS NOT NULL)
);

-- Indexes
CREATE INDEX idx_user_journey_events_user_id ON user_journey_events(user_id);
CREATE INDEX idx_user_journey_events_event_type ON user_journey_events(event_type);
CREATE INDEX idx_user_journey_events_timestamp ON user_journey_events(event_timestamp);
```

---

## 7. DATA MIGRATION

### 7.1 Migration Versioning
```sql
CREATE TABLE schema_migrations (
    id SERIAL PRIMARY KEY,
    version VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    applied_by VARCHAR(100)
);
```

### 7.2 Sample Migration Example
```sql
-- 2024_01_01_000001_create_users_table.sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 8. PERFORMANCE TUNING

### 8.1 Connection Pooling Configuration
```sql
-- PostgreSQL connection pool settings
ALTER SYSTEM SET max_connections = 200;
ALTER SYSTEM SET effective_cache_size = '4GB';
ALTER SYSTEM SET shared_buffers = '1GB';
ALTER SYSTEM SET work_mem = '64MB';
ALTER SYSTEM SET maintenance_work_mem = '256MB';

SELECT pg_reload_conf();
```

### 8.2 Query Optimization
```sql
-- Example of optimized query with proper indexing
EXPLAIN ANALYZE
SELECT b.*, v.make, v.model, v.category_id
FROM bookings b
JOIN vehicles v ON b.vehicle_id = v.id
WHERE b.traveler_id = $1
    AND b.status = 'confirmed'
    AND b.scheduled_start_time > NOW()
ORDER BY b.scheduled_start_time ASC
LIMIT 50;
```

---

## 9. SECURITY CONSIDERATIONS

### 9.1 Sensitive Data Handling
- **PII Encryption:** All personally identifiable information encrypted at rest
- **Token Security:** JWT tokens with short expiration times
- **Session Management:** Secure, HttpOnly cookies with CSRF protection
- **Access Control:** Role-based access control with principle of least privilege

### 9.2 Compliance Requirements
- **GDPR:** Explicit consent, data export/delete rights
- **PDPA:** Indonesian data privacy regulations
- **PCI-DSS:** Payment card industry standards for payment processing
- **SOX:** Financial data integrity and audit trails

---

## 10. MONITORING & MAINTENANCE

### 10.1 Health Check Endpoints
```sql
-- Database health check
SELECT 
    (SELECT count(*) FROM users) as user_count,
    (SELECT count(*) FROM bookings WHERE status = 'active') as active_bookings,
    (SELECT avg(rating) FROM reviews) as average_rating,
    CURRENT_TIMESTAMP as db_health_check;

-- Performance metrics
SELECT 
    schemaname,
    tablename,
    n_tup_ins,
    n_tup_upd,
    n_tup_del,
    last_vacuum,
    last_autovacuum
FROM pg_stat_user_tables
WHERE last_autovacuum IS NULL OR last_vacuum IS NULL;
```

### 10.2 Backup Strategy
- **Daily Backups:** Full database backup each day
- **Point-in-Time Recovery:** Enable for all tables
- **Cross-Region Replication:** Backup to secondary region
- **Testing:** Weekly restore testing

---

## 11. FUTURE ENHANCEMENT

### 11.1 Data Model Extensions
- **Real-time Location Tracking:** Add continuous GPS tracking tables
- **AI Training Data:** Separate table for ML model training
- **A/B Testing:** Experimentation framework tables
- **Personalization:** User preference learning tables

### 11.2 Scaling Strategy
- **Read Replicas:** Horizontal scaling for query load
- **Sharding:** Partition large tables by date or geography
- **Caching Layer:** Redis cluster for high-frequency queries
- **Edge Caching:** Cloudflare KV for global performance

---

## 12. DOCUMENTATION & REFERENCES

### 12.1 Related Documents
- `TECHNICAL_ARCHITECTURE.md` - System architecture overview
- `SECURITY_SPEC.md` - Security controls and compliance
- `API_SPECIFICATION.md` - API contracts and documentation
- `TESTING_STRATEGY.md` - Testing approach and coverage
- `DEPLOYMENT_OPS.md` - Deployment and operations procedures

### 12.2 References
- PostgreSQL Documentation: https://www.postgresql.org/docs/
- PostGIS Documentation: https://postgis.net/docs/
- Supabase Documentation: https://supabase.com/docs
- Next.js Documentation: https://nextjs.org/docs
- Tailwind CSS Documentation: https://tailwindcss.com/docs

---

## 13. CHANGELOG

### Version History
- **v1.0:** Initial schema release
- **v1.1:** Added RLS policies, audit logging
- **v1.2:** Performance optimization, new indexes
- **v1.3:** Analytics tables, monitoring setup
- **v1.4:** Security enhancements, compliance updates

---

**END OF DATA MODELS DOCUMENT**

*Database schema designed for production-ready, scalable, and secure Bali Car Charter platform with comprehensive multi-agent AI integration*