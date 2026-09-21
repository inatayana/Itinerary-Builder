# 🔐 USER AUTHENTICATION WORKFLOW
**Version:** 1.0  
**Authority Level:** PRODUCTION READY  
**Project:** Bali Car Charter & Intelligent Itinerary Builder

---

## 1. AUTHENTICATION ARCHITECTURE

### 1.1 Technology Stack
- **Provider:** Supabase (PostgreSQL + Auth)
- **API Layer:** Next.js App Router with Server Components
- **OAuth Providers:** Google, Apple, Email/Password, Magic Link
- **Security:** JWT tokens, RLS policies, session management
- **Token Storage:** HttpOnly cookies + localStorage (client-side)

### 1.2 User Roles & Permissions
```
ROLE_PERMISSIONS (Database Level)
├── SUPER_ADMIN (Owner)
│   ├── Full access to all modules
│   ├── Manage users, billing, drivers, destinations
│   └── All API endpoints
├── ADMIN (Regular)
│   ├── Manage fleet, bookings, drivers
│   ├── View analytics, generate reports
│   └── Specific subdomain access
├── DRIVER
│   ├── Access own assignments, navigation
│   ├── Update location, status, earnings
│   └── Limited booking view (own)
├── TRAVELER (General User)
│   ├── Book new charters, view itinerary
│   ├── Payment processing, booking history
│   ├── Location: /traveler/dashboard
│   └── Manage existing bookings
└── GUEST (Public)
    ├── Browse destinations, pricing
    ├── Start conversation with AI Concierge
    ├── No persistent account required
    └── Limited functionality
```

### 1.3 Authentication Flow
┌─────────────────────────────────────────────────────────────────┐
│                    LOGIN PAGE (Web/Mobile)                     │
├─────────────────────────────────────────────────────────────────┤
│ • Email/Password                                             │
│ • Google Sign-In                                             │
│ • Apple Sign-In                                              │
│ • Magic Link (Email)                                         │
│                                                               │
│ [ Continue with Google ]  [ Continue with Apple ]            │
│ [ Sign in with Email ]  [ Send Magic Link ]                   │
└─────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                  AUTHENTICATION SERVER                          │
│                                                               │
│ 1. Verify credentials / OAuth token                           │
│ 2. Generate JWT session                                     │
│ 3. Set HttpOnly cookie + localStorage                         │
│ 4. Create user profile in DB                                  │
│ 5. Return redirect to dashboard                               │
│                                                               │
│ Response: { success: true, user: {...}, session: {...} }      │
└─────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DASHBOARD REDIRECT                          │
│                                                               │
│ Based on user role:                                          │
│ • SUPER_ADMIN → /admin/dashboard                             │
│ • ADMIN → /admin/fleet                                       │
│ • DRIVER → /driver/app                                       │
│ • TRAVELER → /traveler/dashboard                               │
│ • GUEST → /explore (public)                                  │
│                                                               │
│ Redirect URL: /api/auth/callback?role=USER_TYPE&token=...     │
└─────────────────────────────────────────────────────────────────┘

---

## 2. USER REGISTRATION & ONBOARDING

### 2.1 Registration Types
- **Full Registration:** Email + Password + Profile creation
- **Social Registration:** Google/Apple OAuth
- **Guest Access:** Email only (limited functionality)

### 2.2 Profile Creation Workflow
┌─────────────────────────────────────────────────────────────────┐
│                    PROFILE CREATION FORM                        │
├─────────────────────────────────────────────────────────────────┤
│                                                               │
│ • Full Name *                                                │
│ • Phone Number (WA) *                                       │
│ • National ID / Passport (for verification)                  │
│ • Preferred Language (ID/EN)                                 │
│ • Emergency Contact                                         │
│                                                               │
│ [ ✓ Privacy Policy ]  [ ✓ Terms of Service ]                   │
│                                                               │
│ [ Save & Continue ]                                         │
│                                                               │
│ * Fields marked with * are required                          │
└─────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                  PROFILE VERIFICATION                           │
│                                                               │
│ 1. Send verification email                                   │
│ 2. Wait for email verification (24h)                          │
│ 3. Upload ID documents (Driver/Admin)                         │
│ 4. Background check (if driver/admin)                        │
│                                                               │
│ Status: PENDING → VERIFIED → REJECTED                        │
└─────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ROLE ASSIGNMENT                              │
│                                                               │
│ If Driver Upload:                                            │
│ • License Number                                              │
│ • Vehicle License Plate                                      │
│ • Vehicle Category (FCS v1.0)                                │
│ • Profile Photo (selfie + car)                               │
│ • Background check approval                                   │
│                                                               │
│ If Admin Upload:                                              │
│ • Employee ID                                                  │
│ • Department (Operations, Sales)                             │
│ • Manager approval                                           │
│                                                               │
│ Role assignment based on verification:                        │
│ • DRIVER → Access to /driver app                             │
│ • ADMIN → Access to /admin dashboard                          │
│ • SUPER_ADMIN → Created by owner during setup                  │
└─────────────────────────────────────────────────────────────────┘

---

## 3. SESSION MANAGEMENT & SECURITY

### 3.1 Token Structure
```json
{
  "user_id": "uuid",
  "role": "USER_ROLE",
  "email": "user@example.com",
  "phone": "+628123456789",
  "lang": "id",
  "iat": 1710000000,
  "exp": 1710003600,
  "jti": "unique-session-id"
}
```

### 3.2 HttpOnly Cookie Configuration
```javascript
// Server-side
cookie: {
  name: 'sb-auth-token',
  value: jwtToken,
  maxAge: 3600,
  httpOnly: true,
  secure: true, // HTTPS only
  sameSite: 'lax'
}
```

### 3.3 Rate Limiting & Protection
- **Login:** 5 attempts per IP per hour
- **Password Reset:** 3 requests per hour per email
- **Registration:** 1 account per email/phone
- **Session Timeout:** 24 hours inactive, 15 minutes active
- **Concurrent Sessions:** Max 2 devices per user

---

## 4. ROUTES & ACCESS CONTROL

### 4.1 Route Protection Middleware
```javascript
// Middleware structure
const protectedRoutes = {
  '/admin': ['SUPER_ADMIN', 'ADMIN'],
  '/admin/*': ['SUPER_ADMIN'],
  '/driver': ['DRIVER'],
  '/traveler': ['TRAVELER', 'GUEST'],
  '/api/v1/admin/*': ['SUPER_ADMIN'],
  '/api/v1/driver/*': ['DRIVER'],
  '/api/v1/traveler/*': ['TRAVELER', 'GUEST']
}
```

### 4.2 API Rate Limits
| Endpoint | Rate Limit | Authentication Required |
|----------|------------|--------------------------|
| `/api/v1/public/*` | 100/h IP | No |
| `/api/v1/traveler/*` | 50/h | Traveler Login |
| `/api/v1/driver/*` | 30/h | Driver Login |
| `/api/v1/admin/*` | 20/h | Admin Login |
| `/api/v1/webhooks/*` | 1000/h | API Key |

---

## 5. USER VERIFICATION & IDENTITY

### 5.1 KYC Process (Drivers/Admins)
┌─────────────────────────────────────────────────────────────────┐
│                    KYC VERIFICATION PROCESS                      │
├─────────────────────────────────────────────────────────────────┤
│                                                               │
│ 1. Document Upload (Driver: License + Car, Admin: ID Card)   │
│ 2. Automated OCR extraction                                   │
│ 3. Manual review (Quality Assurance Agent)                     │
│ 4. Database cross-check (KLADR/Police Database)                │
│ 5. Background check (criminal, credit)                        │
│                                                               │
│ Status Flow:                                                  │
│  [ PENDING UPLOAD ] → [ OCR PROCESSING ] → [ MANUAL REVIEW ] │
│                                               ↓              │
│                                        [ APPROVED ] [ REJECTED ]
│
│ Processing Time: < 24 hours for approval                      │
└─────────────────────────────────────────────────────────────────┘

### 5.2 Email Verification
- **Welcome Email:** Auto-sent on registration
- **Email Verification:** Required for full account access
- **Password Reset:** Magic link with 1-hour expiration
- **Email Change:** Requires re-verification

---

## 6. MULTILINGUAL SUPPORT (i18n)

### 6.1 Language Preference Storage
```json
{
  "user_id": "uuid",
  "profile": {
    "language": "id", // Default Bahasa Indonesia
    "timezone": "Asia/Makassar", // WITA
    "currency": "IDR"
  }
}
```

### 6.2 Language Routes
- `/en/` (English) - Default for international tourists
- `/id/` (Bahasa Indonesia) - Default for local drivers/admin
- Language switch persistent in session
- UI text stored in JSON files

---

## 7. ERROR HANDLING & MESSAGES

### 7.1 Common Error Codes
| Code | Description | Solution |
|------|-------------|----------|
| AUTH_001 | Invalid credentials | Check email/password, try "Forgot Password" |
| AUTH_002 | Email not verified | Check email inbox, resend verification |
| AUTH_003 | Account locked | Wait 24 hours or contact support |
| AUTH_004 | Insufficient permissions | Contact your administrator |
| AUTH_005 | Session expired | Please login again |
| AUTH_006 | Two-factor required | Configure 2FA in profile |

---

## 8. PRIVACY & COMPLIANCE

### 8.1 Data Protection
- **PII Encryption:** AES-256 for stored data
- **GDPR Compliance:** Explicit consent, data export/delete rights
- **PDPA Compliance:** Indonesian data privacy laws
- **Data Retention:** 7 years (bookings), 10 years (financial)

### 8.2 User Rights
- View all personal data stored
- Export data in machine-readable format
- Delete account and all associated data
- Opt-out of marketing communications
- Dispute incorrect data processing

---

## 9. API INTEGRATION POINTS

### 9.1 User Context for Other Services
```javascript
// User context passed to other APIs
{
  "user": {
    "id": "uuid",
    "role": "TRAVELER",
    "profile": { "language": "id", "currency": "IDR" },
    "permissions": ["book", "view itinerary"],
    "verified": true
  }
}
```

### 9.2 Webhooks for User Events
- **User Created:** Admin notification
- **Profile Updated:** Audit log
- **Login Attempt:** Security monitoring
- **Account Deleted:** Data cleanup trigger

---

## 10. MONITORING & ANALYTICS

### 10.1 Key Metrics
- **Authentication Success Rate:** Target > 99.5%
- **Login Failure Rate:** Alert > 3%
- **Session Duration:** Average 45 minutes
- **Multi-device Usage:** 15% of users
- **Password Reset Requests:** < 1% of users

### 10.2 Alert Conditions
- Failed login > 10 in 5 minutes
- New account fraud patterns
- Unusual geographic access
- Session hijacking attempts

---

## 11. EMERGENCY PROCEDURES

### 11.1 Account Compromise
1. **Immediate:** Lock user account
2. **Notify:** User via email + WhatsApp
3. **Investigate:** Security team 24/7 monitoring
4. **Recover:** Password reset + 2FA enable
5. **Report:** Incident to compliance team

### 11.2 Data Loss Prevention
- Auto-save user sessions
- Backup authentication data daily
- Geolocation verification for admin actions
- Multi-factor authentication for critical operations

---

## 12. IMPLEMENTATION CHECKLIST

### Phase 1: Core Setup
- [ ] Supabase project creation + PostGIS extension
- [ ] Database tables: users, profiles, sessions, verification
- [ ] RLS policies for each role
- [ ] Auth providers configuration (Google, Apple, Email)
- [ ] JWT secret configuration
- [ ] HttpOnly cookie setup

### Phase 2: Application Integration
- [ ] Middleware for route protection
- [ ] Custom hooks for auth state management
- [ ] Role-based UI component rendering
- [ ] API client with auth interceptors
- [ ] Loading states and error boundaries

### Phase 3: Security Hardening
- [ ] Rate limiting implementation
- [ ] Account lockout mechanism
- [ ] Password policy enforcement
- [ ] Email domain verification (for enterprise)
- [ ] 2FA optional setup

### Phase 4: User Experience
- [ ] Responsive login form (mobile-first)
- [ ] Social login buttons (Google, Apple)
- [ ] Password strength indicator
- [ ] Email verification flow
- [ ] Account recovery options

---

## 13. TESTING VALIDATION

### 13.1 Security Testing
- **OWASP Top 10:** All vulnerabilities addressed
- **Penetration Testing:** Quarterly
- **Token Validation:** JWT signature verification
- **Session Hijacking:** HttpOnly cookie implementation

### 13.2 Performance Testing
- **Login Time:** < 2 seconds
- **Concurrent Users:** 1000+ supported
- **Database Queries:** < 100ms average
- **Memory Usage:** < 500MB per 10k users

---

## 14. FUTURE ENHANCEMENTS

- **Biometric Authentication:** FaceID/TouchID
- **OAuth 2.0 with PKCE:** Mobile native apps
- **Single Sign-On (SSO):** Enterprise integration
- **Advanced 2FA:** TOTP apps, hardware keys
- **Adaptive Authentication:** Risk-based authentication
- **User Consent Management:** Privacy preference center

---

**END OF AUTHENTICATION WORKFLOW**

### Next Steps
1. **Phase 1 Implementation:** Setup Supabase + Auth
2. **Phase 2 Integration:** Application middleware
3. **Phase 3 Security:** Hardening and compliance
4. **Phase 4 Optimization:** Performance tuning

Authentication is the foundation of trust in Bali Car Charter platform.