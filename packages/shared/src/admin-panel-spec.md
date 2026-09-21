# 🖥️ ADMIN PANEL SPECIFICATION
**Version:** 1.0  
**Authority Level:** PRODUCTION READY  
**Project:** Bali Car Charter & Intelligent Itinerary Builder

---

## 1. ADMIN PANEL ARCHITECTURE

### 1.1 System Overview
Admin Panel is the central management interface for Bali Car Charter operations. It provides comprehensive control over all business operations including fleet management, booking management, user management, driver management, pricing configuration, and analytics.

### 1.2 Access Control
- **Super Admin:** Full access to all modules and settings
- **Admin:** Limited access to specific modules with role-based permissions
- **Manager:** Access to operational modules and reports

### 1.3 Technology Stack
- **Framework:** Next.js 14/15 App Router
- **State Management:** TanStack Query + Zustand
- **Styling:** Tailwind CSS
- **Charts:** Recharts + Chart.js
- **API Integration:** Supabase (PostgreSQL + Auth)
- **Authentication:** Supabase Auth with role-based access control
- **Date Handling:** date-fns + date-fns-tz

---

## 2. MAIN DASHBOARD

### 2.1 KPI Overview Cards
```
┌─────────────────────────────────────────────────────────────────┐
│                   KPI OVERVIEW DASHBOARD                         │
├─────────────────────────────────────────────────────────────────┤
│ 📊 Total Revenue (24h)     💰 IDR 15,800,000                    │
│ 🚗 Active Bookings         🚙 42 bookings                      │
│ 👥 Active Drivers          👤 18 drivers                       │
│ ⭐ Customer Satisfaction   ⭐ 4.7/5                              │
│ 📦 Fleet Availability      🚐 85% available                     │
│ 💳 Payment Success Rate   ✅ 98.5%                              │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Quick Action Buttons
- **New Booking:** Create instant bookings
- **Add Driver:** Register new drivers
- **Add Vehicle:** Register new vehicles
- **Set Pricing:** Update price matrix
- **Generate Report:** Export analytics
- **Send Notification:** Broadcast messages

### 2.3 Real-time Notifications
- **Critical Alerts:** System errors, payment failures
- **Operational Updates:** Driver availability changes
- **Business Alerts:** Revenue targets, KPI deviations
- **System Alerts:** Maintenance, updates, backups

---

## 3. FLEET MANAGEMENT

### 3.1 Vehicle Management Module

#### 3.1 Vehicle Registry
| Vehicle ID | Category | Model | License Plate | Status | Driver Assigned | Capacity | Last Maintenance |
|------------|----------|-------|---------------|--------|-----------------|----------|------------------|
| VEH-001    | Premium MPV | Innova Zenix | B1234AA | Available | I Wayan A | 6 pax | 2024-01-15 |
| VEH-002    | Executive Van | Hiace Premio | B5678BB | In Service | Made S | 12 pax | 2024-01-20 |
| VEH-003    | Family MPV | Xpander | B9012CC | Available | - | 6 pax | 2024-02-01 |

#### 3.2 Vehicle Actions
- **View Details:** Complete vehicle information
- **Edit Information:** Update vehicle data
- **Assign Driver:** Assign/unassign drivers
- **Maintenance Schedule:** Set maintenance reminders
- **Pricing Configuration:** Update vehicle pricing
- **Status Management:** Set availability status
- **Photo Gallery:** Add/update vehicle images

### 3.2 Driver Management Module

#### 3.2.1 Driver Registry
| Driver ID | Name | License No | Category | Status | Rating | Experience | English Level |
|-----------|------|------------|----------|--------|--------|------------|---------------|
| DRV-001   | I Wayan A | B1234CD | Premium MPV | Active | 4.8 | 5 years | Fluent |
| DRV-002   | Made S | B5678EF | Executive Van | Active | 4.5 | 4 years | Good |
| DRV-003   | Nyoman G | B9012GH | Family MPV | Inactive | 4.2 | 3 years | Intermediate |

#### 3.2.2 Driver Actions
- **View Profile:** Complete driver information
- **Edit Profile:** Update driver details
- **License Verification:** Check and update licenses
- **Background Check Status:** Update verification status
- **Performance Review:** Update ratings and notes
- **Schedule Management:** Set availability calendar
- **Document Management:** Upload documents

### 3.3 Fleet Analytics

#### 3.3.1 Fleet Utilization
- **Total Vehicles:** 45
- **Available Vehicles:** 18 (40%)
- **In Service:** 27 (60%)
- **Maintenance Required:** 3 (7%)
- **Decommissioned:** 4 (9%)

#### 3.3.2 Capacity Planning
- **Peak Hours:** 12:00-18:00
- **Average Utilization:** 78%
- **Peak Utilization:** 92%
- **Off-peak Utilization:** 45%

---

## 4. BOOKING MANAGEMENT

### 4.1 Booking Registry

#### 4.1.1 Search & Filter Panel
- **Date Range:** Date picker with presets
- **Status Filter:** All/Confirmed/Pending/Cancelled
- **Category Filter:** All/Premium/Executive/Van
- **Driver Filter:** All/Assigned/Unassigned
- **Customer Filter:** Search by name, phone, email

#### 4.1.2 Booking List View
| Booking Ref | Customer | Vehicle | Date | Time | Status | Amount | Driver |
|-------------|----------|---------|------|------|--------|--------|--------|
| BCC-001234 | John Doe | Innova Zenix | 2024-10-15 | 09:00 | Confirmed | IDR 1,400,000 | I Wayan A |
| BCC-001235 | Jane Smith | Hiace Premio | 2024-10-15 | 14:00 | Pending | IDR 1,800,000 | Made S |
| BCC-001236 | Robert Wilson | Xpander | 2024-10-16 | 10:00 | Confirmed | IDR 1,200,000 | - |

#### 4.1.3 Booking Actions
- **View Details:** Complete booking information
- **Edit Booking:** Update booking details
- **Assign Driver:** Assign driver to booking
- **Change Status:** Update booking status
- **Cancel Booking:** Cancel with reason
- **Generate Invoice:** Create invoice PDF
- **Send Confirmation:** Send WhatsApp/Email

### 4.2 Quick Booking Wizard

#### 4.2.1 Step 1: Customer Information
- **Name:** Required
- **Phone:** Required
- **Email:** Optional but recommended
- **Nationality:** Dropdown
- **Passenger Count:** Number input
- **Luggage Count:** Number input

#### 4.2.2 Step 2: Travel Details
- **Pick-up Location:** Autocomplete search
- **Pick-up Date:** Date picker
- **Pick-up Time:** Time picker
- **Duration:** Dropdown (Half-day, Full-day, etc.)
- **Number of Destinations:** Number input

#### 4.2.3 Step 3: Vehicle Selection
- **Category:** Grid view with icons
- **Model:** List view with details
- **Driver:** List view with ratings
- **Pricing:** Dynamic pricing display

#### 4.2.4 Step 4: Confirmation
- **Summary:** All booking details
- **Price Breakdown:** Detailed pricing
- **Terms & Conditions:** Checkbox
- **Payment Method:** Select
- **Submit:** Create booking

---

## 5. PRICING MANAGEMENT

### 5.1 Pricing Matrix

#### 5.1.1 Base Rates
| Category | South Bali | Central Bali | East Bali | North Bali | West Bali |
|----------|------------|--------------|-----------|------------|-----------|
| Compact MPV | IDR 200,000 | IDR 350,000 | IDR 600,000 | IDR 650,000 | IDR 750,000 |
| Premium MPV | IDR 350,000 | IDR 500,000 | IDR 850,000 | IDR 900,000 | IDR 1,050,000 |
| Executive Van | IDR 550,000 | IDR 800,000 | IDR 1,300,000 | IDR 1,400,000 | IDR 1,600,000 |
| Large Group Van | IDR 650,000 | IDR 950,000 | IDR 1,500,000 | IDR 1,600,000 | IDR 1,800,000 |

#### 5.1.2 Daily Charter Rates
| Duration | Rate Multiplier | Weekend Premium | Holiday Premium |
|----------|----------------|-----------------|----------------|
| Half-Day (5-6 hours) | 1.0x | 1.2x | 1.5x |
| Full-Day (9-10 hours) | 1.0x | 1.3x | 1.6x |
| Extended Day (10-12 hours) | 1.2x | 1.5x | 1.8x |

#### 5.1.3 Overtime Pricing
- **Regular Overtime:** 15% per hour
- **Peak Overtime:** 25% per hour
- **Maximum Overtime:** 3 hours

### 5.2 Pricing Configuration Actions
- **Add New Rates:** Create new price tiers
- **Edit Existing Rates:** Update current rates
- **Seasonal Pricing:** Configure seasonal multipliers
- **Zone Surcharges:** Update zone-based pricing
- **Promotional Pricing:** Create special offers
- **Bulk Updates:** Import/export pricing data

### 5.3 Pricing Analytics

#### 5.3.1 Revenue Breakdown
- **Daily Revenue:** IDR 15,800,000
- **Monthly Revenue:** IDR 474,000,000
- **Yearly Revenue:** IDR 5,688,000,000
- **Average Booking Value:** IDR 1,400,000

#### 5.3.2 Price Performance
- **Price Sensitivity:** High (elastic demand)
- **Weekend Premium:** 30% higher than weekdays
- **Peak Season:** 45% premium pricing
- **Off-peak Discount:** 15% reduction

---

## 6. USER MANAGEMENT

### 6.1 User Registry

#### 6.1.1 User Search & Filter
- **Name/Search:** Full-text search
- **Role Filter:** Admin/Driver/Traveler
- **Status Filter:** Active/Inactive/Verified/Unverified
- **Date Range:** Registration date filter

#### 6.1.2 User List View
| User ID | Name | Email | Phone | Role | Status | Joined Date | Last Login |
|---------|------|-------|-------|------|--------|-------------|------------|
| USR-001 | I Made Sari | made@email.com | +6281234567890 | Driver | Active | 2023-08-15 | 2024-10-10 |
| USR-002 | John Doe | john@email.com | +6281234567891 | Traveler | Verified | 2023-09-20 | 2024-10-09 |
| USR-003 | Jane Smith | jane@email.com | +6281234567892 | Admin | Active | 2023-10-25 | 2024-10-08 |

#### 6.1.3 User Actions
- **View Profile:** Complete user information
- **Edit Profile:** Update user details
- **Role Assignment:** Change user roles
- **Password Reset:** Generate reset link
- **Send Verification:** Resend verification emails
- **Account Status:** Activate/deactivate accounts
- **Permission Management:** Manage user permissions

### 6.2 User Permissions Matrix
```
┌─────────────────────────────────────────────────────────────────┐
│                    PERMISSION MATRIX                            │
├─────────────────────────────────────────────────────────────────┤
│ Module              │ Super Admin │ Admin │ Driver │ Traveler │
│--------------------|-------------|-------|--------|----------|
│ Fleet Management   │ ✅          │ ✅    │ ❌     │ ❌       |
│ Booking Management │ ✅          │ ✅    │ ✅     │ ✅       |
│ Pricing Management │ ✅          │ ✅    │ ❌     │ ❌       |
│ Driver Management  │ ✅          │ ✅    │ ✅     │ ❌       |
│ User Management    │ ✅          │ ✅    │ ❌     │ ❌       |
│ Analytics          │ ✅          │ ✅    │ ✅     │ ✅       |
│ Settings           │ ✅          │ ✅    │ ❌     │ ❌       |
│ Reports            │ ✅          │ ✅    │ ✅     │ ✅       |
│ Notifications      │ ✅          │ ✅    │ ✅     │ ✅       |
└─────────────────────────────────────────────────────────────────┘
```

---

## 7. DESTINATION MANAGEMENT

### 7.1 Destination Registry

#### 7.1.1 Destination Search & Filter
- **Name/Search:** Full-text search
- **Zone Filter:** South/Central/East/North/West Bali
- **Type Filter:** Temple/beach/rice-terrace/cultural
- **Rating Filter:** 1-5 stars
- **Status Filter:** Active/Inactive

#### 7.1.2 Destination List View
| Destination ID | Name | Zone | Type | Rating | Status | Created Date |
|----------------|------|------|------|--------|--------|--------------|
| DEST-001       | Ubud Monkey Forest | Central Bali | Cultural | 4.5 | Active | 2023-08-10 |
| DEST-002       | Uluwatu Temple | South Bali | Temple | 4.8 | Active | 2023-08-15 |
| DEST-003       | Tanah Lot | South Bali | Temple | 4.7 | Active | 2023-08-20 |

#### 7.1.3 Destination Actions
- **View Details:** Complete destination information
- **Edit Information:** Update destination data
- **Photo Gallery:** Add/update images
- **Rating Management:** Update ratings
- **Status Management:** Activate/deactivate
- **SEO Optimization:** Configure SEO settings
- **Geofence Setup:** Configure boundary

---

## 8. ANALYTICS & REPORTS

### 8.1 Analytics Dashboard

#### 8.1.1 Key Performance Indicators
- **Daily Revenue Trend:** Line chart with 30-day view
- **Booking Volume:** Bar chart with breakdown by category
- **Customer Satisfaction:** Gauge chart with rating distribution
- **Fleet Utilization:** Pie chart with availability status
- **Payment Success Rate:** Donut chart with status breakdown

#### 8.1.2 Real-time Metrics
- **Current Bookings:** 42 active bookings
- **Revenue Today:** IDR 15,800,000
- **Driver Availability:** 18 available drivers
- **System Performance:** 99.9% uptime

### 8.2 Report Generation

#### 8.2.1 Report Types
- **Daily Report:** Daily operations summary
- **Weekly Report:** Weekly performance metrics
- **Monthly Report:** Monthly business analysis
- **Quarterly Report:** Quarterly strategic review
- **Custom Report:** User-defined parameters

#### 8.2.2 Report Export Options
- **PDF:** Printable reports
- **Excel:** Spreadsheet format
- **CSV:** Data import ready
- **JSON:** API integration ready
- **Email:** Automated email delivery

### 8.3 Analytics Actions
- **Generate Reports:** Create new reports
- **Schedule Reports:** Automated report generation
- **Export Data:** Export to various formats
- **View History:** Access previous reports
- **Data Visualization:** Interactive charts and graphs

---

## 9. NOTIFICATIONS & COMMUNICATIONS

### 9.1 Notification Center

#### 9.1.1 Notification Types
- **System Alerts:** Critical system notifications
- **Operational Updates:** Booking/driver status changes
- **Business Alerts:** Revenue/ KPI deviations
- **User Notifications:** Account/activity updates
- **Marketing Campaigns:** Promotional messages

#### 9.1.2 Notification Channels
- **In-App:** Real-time notifications
- **Email:** Scheduled/automated emails
- **WhatsApp:** Instant messaging
- **Push Notifications:** Mobile app alerts
- **SMS:** Text message alerts

### 9.2 Communication History

#### 9.2.1 Communication Registry
| Message ID | Recipient | Type | Content | Status | Sent At |
|------------|-----------|------|---------|--------|---------|
| MSG-001    | John Doe  | Email | Booking confirmation | Sent | 2024-10-14 10:30 |
| MSG-002    | I Wayan A | WhatsApp | Driver assignment | Sent | 2024-10-14 11:00 |
| MSG-003    | Jane Smith | Email | Password reset | Sent | 2024-10-14 11:30 |
| MSG-004    | Robert W | WhatsApp | Booking reminder | Sent | 2024-10-14 12:00 |

### 9.3 Communication Actions
- **Send Message:** Compose and send messages
- **Template Management:** Manage message templates
- **Campaign Management:** Create campaigns
- **Delivery Reports:** View delivery status
- **History Review:** Access communication history

---

## 10. SETTINGS & CONFIGURATION

### 10.1 System Settings

#### 10.1.1 General Settings
- **Company Name:** Bali Car Charter
- **Contact Email:** info@balicarcharter.com
- **Phone Number:** +62-812-3456-7890
- **Address:** Jl. Contoh No. 123, Denpasar
- **Business Hours:** 08:00 - 20:00

#### 10.1.2 Language Settings
- **Default Language:** Bahasa Indonesia
- **Available Languages:** English, Bahasa Indonesia
- **Date Format:** dd/mm/yyyy
- **Time Format:** 24-hour

### 10.2 Operational Settings

#### 10.2.1 Booking Settings
- **Default Duration:** Full-day (10 hours)
- **Overtime Policy:** 15% per hour
- **Cancellation Policy:** 48 hours advance
- **Deposit Required:** No
- **Payment Methods:** All enabled

#### 10.2.2 Driver Settings
- **Minimum Experience:** 3 years
- **English Requirement:** Required
- **Background Check:** Mandatory
- **Working Hours:** 8 hours max per day

### 10.3 System Configuration Actions
- **Update Settings:** Modify system configurations
- **Backup Configuration:** Set up automated backups
- **Security Settings:** Configure security policies
- **Integration Settings:** Configure external integrations
- **Maintenance Mode:** Enable/disable maintenance

---

## 11. USER ACCESS LEVELS

### 11.1 Access Levels Overview

| Access Level | Description | Permissions |
|--------------|-------------|-------------|
| **Super Admin** | Full system access | All permissions |
| **Admin** | Business operations access | Most permissions |
| **Manager** | Operational access | Limited permissions |
| **Driver** | Personal operations access | Self-service only |
| **Traveler** | Booking and service access | Limited permissions |

### 11.2 Role-Based Access Control
```
┌─────────────────────────────────────────────────────────────────┐
│                    ROLE-BASED ACCESS CONTROL                     │
├─────────────────────────────────────────────────────────────────┤
│ Feature                      │ Super Admin │ Admin │ Manager │ Driver │ Traveler │
│------------------------------|-------------|-------|--------|--------|----------|
│ Fleet Management             │ ✅          │ ✅    │ ❌     │ ❌     │ ❌       │
│ Booking Management           │ ✅          │ ✅    │ ✅     │ ✅     │ ✅       │
│ Pricing Management           │ ✅          │ ✅    │ ❌     │ ❌     │ ❌       │
│ Driver Management            │ ✅          │ ✅    │ ✅     │ ✅     │ ❌       │
│ User Management              │ ✅          │ ✅    │ ❌     │ ❌     │ ❌       │
│ Analytics                    │ ✅          │ ✅    │ ✅     │ ✅     │ ✅       │
│ Settings                     │ ✅          │ ✅    │ ❌     │ ❌     │ ❌       │
│ Reports                      │ ✅          │ ✅    │ ✅     │ ✅     │ ✅       │
│ Notifications                │ ✅          │ ✅    │ ✅     │ ✅     │ ✅       │
│ Maintenance Mode             │ ✅          │ ❌    │ ❌     │ ❌     │ ❌       │
│ User Account Management      │ ✅          │ ❌    │ ❌     │ ❌     │ ❌       │
│ System Configuration         │ ✅          │ ❌    │ ❌     │ ❌     │ ❌       │
│ API Access                   │ ✅          │ ✅    │ ✅     │ ✅     │ ✅       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 12. SUPPORT & HELP

### 12.1 Help Center

#### 12.1.1 Documentation
- **User Guide:** Step-by-step tutorials
- **FAQ:** Common questions and answers
- **Video Tutorials:** Visual learning materials
- **API Documentation:** Technical documentation

#### 12.1.2 Support Channels
- **Help Center:** self-service support
- **Live Chat:** Real-time assistance
- **Email Support:** support@balicarcharter.com
- **Phone Support:** +62-812-3456-7890
- **Community Forum:** User discussions

### 12.2 Training & Resources

#### 12.2.1 Training Programs
- **New User Onboarding:** Complete setup process
- **Admin Training:** Advanced features
- **Driver Training:** Driver app usage
- **Security Training:** Best practices

#### 12.2.2 Resources Library
- **Templates:** Document templates
- **Checklists:** Process checklists
- **Best Practices:** Operational guidelines
- **Case Studies:** Success stories

---

## 13. SECURITY & COMPLIANCE

### 13.1 Security Settings

#### 13.1.1 Access Control
- **Multi-Factor Authentication:** Enabled for all roles
- **Session Timeout:** 30 minutes inactivity
- **Password Policy:** Minimum requirements
- **IP Whitelist:** Optional for admin users

#### 13.1.2 Audit Logging
- **User Actions:** Complete audit trail
- **System Changes:** Configuration changes
- **Data Access:** Read/write operations
- **Security Events:** Failed login attempts

### 13.2 Compliance Settings

#### 13.2.1 Legal Compliance
- **Data Privacy:** GDPR/PDPA compliance
- **Payment Security:** PCI-DSS compliance
- **Tax Compliance:** Indonesian tax regulations
- **Labor Law:** Driver employment compliance

---

## 14. MOBILE APP INTEGRATION

### 14.1 Driver App Features

#### 14.1.1 Core Features
- **Profile Management:** Update driver information
- **Schedule Management:** View assignments
- **Real-time Location:** GPS tracking
- **Communication:** In-app messaging
- **Earnings Management:** View payouts
- **Document Upload:** Submit documents

#### 14.1.2 Driver App Actions
- **Accept Bookings:** Quick acceptance
- **Start Trip:** Log trip start
- **End Trip:** Log trip completion
- **Update Status:** Change availability
- **Request Support:** Contact support
- **Rate Customers:** Provide feedback

---

## 15. FOOTER & QUICK LINKS

### 15.1 Quick Access
- **Dashboard:** Overview and KPIs
- **Bookings:** Booking management
- **Fleet:** Vehicle and driver management
- **Analytics:** Business analytics
- **Reports:** Report generation
- **Settings:** System configuration

### 15.2 Support Links
- **Help Center:** Documentation and guides
- **Contact Us:** Support contact information
- **Privacy Policy:** Data protection policy
- **Terms of Service:** Usage terms
- **Cookie Policy:** Cookie usage policy

---

## 16. IMPLEMENTATION CHECKLIST

### Phase 1: Core Setup
- [ ] Database schema implementation
- [ ] Authentication and authorization setup
- [ ] User roles and permissions configuration
- [ ] Basic admin dashboard creation
- [ ] Fleet and driver management setup
- [ ] Booking management implementation

### Phase 2: Feature Development
- [ ] Advanced booking wizard
- [ ] Pricing management system
- [ ] Destination management
- [ ] Analytics dashboard
- [ ] Notification system
- [ ] Reporting module

### Phase 3: Advanced Features
- [ ] Mobile app integration
- [ ] API integrations
- [ ] Advanced security features
- [ ] Automation workflows
- [ ] Custom reporting
- [ ] Multilingual support

### Phase 4: Quality Assurance
- [ ] User acceptance testing
- [ ] Performance optimization
- [ ] Security testing
- [ ] Accessibility compliance
- [ ] Documentation completion
- [ ] Training materials

---

## 17. CHANGELOG

### Version History
- **v1.0:** Initial release
- **v1.1:** Enhanced user permissions
- **v1.2:** Advanced analytics features
- **v1.3:** Mobile app integration
- **v1.4:** Security enhancements

---

**END OF ADMIN PANEL SPECIFICATION**

*Admin panel designed for comprehensive business management with role-based access control, advanced analytics, and operational efficiency*