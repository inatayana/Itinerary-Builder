# 🔐 USER AUTHENTICATION WORKFLOW
**Version:** 1.0  
**Authority Level:** CONTROLLED  
**Project:** Bali Car Charter & Intelligent Itinerary Builder  
**Agent Ownership:** Backend & API Agent, Frontend & Adaptive UI Agent  

---

## 1. AUTHENTICATION ARCHITECTURE

### 1.1 Authentication Provider
* **Provider:** Supabase Auth (PostgreSQL + Auth0-compatible)
* **Domain:** `be` (Backend & API Agent)
* **Integration:** JWT tokens for API protection, session management for frontend

### 1.2 Authentication Flows

#### 1.2.1 User Registration
1. Frontend: Registration form (email, password, name)
2. Backend: Supabase Auth signup
3. Database: User profile creation
4. Realtime: User metadata updated to all connected clients

#### 1.2.2 User Login
1. Frontend: Login form (email, password, optional Google SSO)
2. Backend: Supabase Auth sign-in
3. API: JWT token generation and cookie/set session storage
4. Redirect: Role-based dashboard routing

#### 1.2.3 Session Management
1. JWT tokens stored in HTTP-only cookies
2. Supabase Realtime channels for user presence
3. Auto-refresh tokens every 30 minutes
4. Session timeout after 24 hours of inactivity

### 1.3 Role-Based Access Control
| User Role | Access Level | Permissions |
|-----------|--------------|-------------|
| **Admin** | Full Access | All operations, user management, analytics |
| **Driver** | Limited Access | Booking assignments, trip management |
| **User** | Basic Access | Booking creation, itinerary management |

### 1.4 Security Requirements
- Password complexity enforcement
- Email verification mandatory
- Two-factor authentication (2FA) for sensitive operations
- Rate limiting on authentication endpoints
- Device fingerprinting for anomaly detection

---

## 2. AUTHENTICATION ENDPOINTS (API_SPECIFICATION.md)

### 2.1 Public Endpoints
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Token refresh
- `POST /auth/forgot-password` - Password reset
- `POST /auth/verify-email` - Email verification

### 2.2 Protected Endpoints
- All API routes under `/api/` require authentication
- Exception: Public endpoints like `/api/rates`, `/api/destinations`
- Middleware validates JWT tokens before route handlers

### 2.3 Authentication Headers
```
Authorization: Bearer <jwt-token>
X-User-ID: <user-uuid>
X-User-Role: <admin|driver|user>
```

---

## 3. FRONTEND INTEGRATION (Frontend & Adaptive UI Agent)

### 3.1 React Authentication Hooks
Create hooks in `packages/shared/auth/`:

#### 3.1.1 `useAuth()`
- Manages authentication state
- Provides login/logout functions
- Auto-subscription to auth changes

#### 3.1.2 `useProtectedRoute()`
- Route protection wrapper
- Redirects unauthenticated users
- Role-based access control

#### 3.1.3 `useUserProfile()`
- Manages user profile state
- Handles profile updates
- Syncs with Supabase Realtime

### 3.2 UI Components
- Login/Register forms with validation
- Protected route guards
- User profile dropdown
- Role-based UI elements
- 2FA setup interface

### 3.3 Mobile Integration
- Biometric authentication support
- Push notification for security alerts
- Offline auth state persistence
- Device verification

---

## 4. BACKEND IMPLEMENTATION (Backend & API Agent)

### 4.1 Database Schema Extensions
Add tables to `packages/database/prisma/schema.prisma`:

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String
  name          String
  role          Role      @default(user)
  emailVerified Boolean   @default(false)
  twoFactorEnabled Boolean  @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  @@index([email])
}

model Session {
  id           String   @id @default(cuid())
  userId       String
  token        String   @unique
  expiresAt    DateTime
  createdAt    DateTime @default(now())
  
  user         User     @relation(fields: [userId], references: [id])
  
  @@index([userId])
  @@index([token])
}
```

### 4.2 Middleware Implementation
Create `packages/api/middleware/auth.ts`:
- JWT token validation
- Role-based access control
- Request logging for audit trails
- Rate limiting enforcement

### 4.3 API Service Functions
- User authentication service
- Password reset service
- Email verification service
- Session management service

---

## 5. OPERATIONAL PROCEDURES

### 5.1 Development Workflow
1. **Plan Mode:** Document authentication flows in `AUTHENTICATION_WORKFLOW.md`
2. **Build Mode:** Implement Supabase Auth configuration
3. **Quality Gate:** QA Agent validates all auth endpoints
4. **Deploy:** Production authentication service

### 5.2 Testing Strategy
- Unit tests for auth services
- Integration tests for protected endpoints
- Security tests for vulnerabilities
- Performance tests for auth latency

### 5.3 Monitoring & Alerting
- Failed login attempt tracking
- Account takeover detection
- Session anomaly monitoring
- Rate limit breach alerts

---

## 6. EMERGENCY PROCEDURES (STOP CONDITIONS)

**IMMEDIATE STOP if:**
1. Database authentication schema compromised
2. JWT secret key exposed
3. Password reset functionality bypassed
4. Session fixation vulnerability detected
5. Rate limiting controls disabled

**Escalation:** QA Agent → Chief Architect → Owner (WhatsApp immediate)
