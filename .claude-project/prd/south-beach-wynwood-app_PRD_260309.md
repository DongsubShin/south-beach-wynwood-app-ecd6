# South Beach & Wynwood Barbers — Product Requirements Document

**Version:** 1.0  
**Date:** 2023-10-27  
**Status:** Draft  

---

## 0. Project Overview

### Product

**Name:** South Beach & Wynwood Barbers App  
**Type:** Web Application (Customer-facing) + Admin/Staff Dashboard  
**Deadline:** Q1 2024  
**Status:** Draft  

### Description

A custom-built, multi-location booking and shop management platform designed specifically for South Beach Cuts and Wynwood Barbers. The system replaces the existing Vagaro implementation to provide a seamless, branded experience that handles high-volume walk-ins, scheduled appointments, automated SMS marketing, and complex commission structures for a team of 12+ barbers across two premium Miami locations.

### Goals

1. **Operational Efficiency:** Streamline the transition between scheduled appointments and the walk-in queue to maximize chair utilization.
2. **Brand Independence:** Move away from third-party marketplaces (Vagaro) to own the customer data and reduce per-transaction/subscription overhead.
3. **Retention & Loyalty:** Implement a native loyalty program that rewards frequent clients and encourages multi-location visits.
4. **Financial Transparency:** Automate commission tracking and reporting for barbers to ensure 100% accuracy in weekly payouts.

### Target Audience

| Audience | Description |
|----------|-------------|
| **Primary** | Local Miami residents and tourists seeking premium grooming services in South Beach or Wynwood. |
| **Secondary** | Professional barbers (12+) requiring schedule management and earnings transparency. |
| **Tertiary** | Shop owners/managers needing high-level analytics and multi-location control. |

### User Types

| Type | DB Value | Description | Key Actions |
|------|----------|-------------|-------------|
| **Customer** | `0` | End-user booking a haircut | Select location, book barber, join queue, track loyalty points. |
| **Barber** | `1` | Service provider | View personal schedule, manage walk-in status, view commission reports. |
| **Manager** | `50` | Shop supervisor | Manage shop-wide queue, override bookings, view daily shop totals. |
| **Owner** | `99` | Platform administrator | Full access to all locations, financial data, and system settings. |

### User Status

| Status | DB Value | Behavior |
|--------|----------|----------|
| **Active** | `0` | Full access to booking and profile features. |
| **Suspended** | `1` | Restricted from booking (usually due to repeated no-shows). |
| **Withdrawn** | `2` | Account deactivated; data anonymized after 30 days. |

### MVP Scope

**Included:**
- Multi-location selector (South Beach vs. Wynwood).
- Real-time Appointment Booking & Walk-in Queue management.
- SMS Notifications for reminders and "You're next" alerts.
- Barber-specific commission tracking and reporting.
- Integrated Loyalty Program (Points per dollar spent).
- Stripe Payment Integration for deposits and full payments.

**Excluded (deferred):**
- In-app chat between barber and client.
- Inventory/Retail product management (Phase 2).
- Native iOS/Android mobile apps (Phase 1 is Web-responsive).

---

## 1. Terminology

### Core Concepts

| Term | Definition |
|------|------------|
| **The Shop** | Refers to either the South Beach or Wynwood physical location. |
| **Walk-in Queue** | A digital waitlist for clients physically present or nearby without an appointment. |
| **Service Tier** | Different pricing levels based on barber seniority (e.g., Master Barber vs. Junior). |
| **No-Show Protection** | A policy where a credit card is required to hold a slot, charging a fee if the client fails to appear. |

### User Roles

| Role | Description |
|------|-------------|
| **Guest** | Unauthenticated user who can view availability and location info. |
| **Client** | Authenticated user with booking history and loyalty points. |
| **Staff** | Barbers who can only see their own dashboard and clients. |
| **Admin** | Owners who can see cross-location financial analytics. |

### Status Values

| Enum | Values | Description |
|------|--------|-------------|
| **AppointmentStatus** | `PENDING`, `CONFIRMED`, `CHECKED_IN`, `COMPLETED`, `CANCELLED`, `NO_SHOW` | The lifecycle of a booking. |
| **QueueStatus** | `WAITING`, `CALLED`, `IN_CHAIR`, `FINISHED` | The lifecycle of a walk-in client. |
| **PaymentStatus** | `UNPAID`, `DEPOSIT_PAID`, `PAID_IN_FULL`, `REFUNDED` | Financial state of the transaction. |

---

## 2. System Modules

### Module 1 — Booking Engine & Scheduler

Handles the complex logic of matching barber availability, service duration, and location hours.

#### Main Features
1. **Dynamic Availability:** Calculates slots based on barber working hours minus existing appointments and blocked time.
2. **Multi-Service Booking:** Allows clients to select multiple services (e.g., Haircut + Beard Trim) in one slot.
3. **Barber Preference:** Option to book "Any Barber" or a specific professional.

#### Technical Flow
1. User selects Location -> Service -> Barber.
2. Frontend requests available slots for the specific Barber/Date.
3. Backend checks `appointments` table and `barber_schedules` table.
4. User selects time and enters payment info.
5. On success:
   - Appointment record created with `CONFIRMED` status.
   - SMS sent via Twilio to Client and Barber.
   - Calendar updated in real-time via WebSockets.

---

### Module 2 — Walk-in Queue Management

A digital "Take a Number" system that integrates with the physical shop flow.

#### Main Features
1. **Wait-time Estimation:** Algorithmically calculates wait time based on average service duration and current queue length.
2. **SMS "Ready" Alerts:** Automatically texts the client when they are 2nd in line.
3. **Kiosk Mode:** A simplified interface for a tablet at the shop entrance.

#### Technical Flow
1. Client scans QR code at shop or uses the app to "Join Queue."
2. System validates client is within a specific geographic radius (optional) or simply adds to list.
3. Backend assigns `QueueStatus: WAITING`.
4. Manager moves client to `CALLED` status.
5. SMS triggered: "Your barber is ready! Please head to the chair."

---

### Module 3 — Commission & Analytics

The financial engine that calculates payouts for the 12 barbers.

#### Main Features
1. **Custom Commission Rates:** Set per-barber percentages (e.g., 60/40 split).
2. **Tip Tracking:** Separates service revenue from tips for tax reporting.
3. **Daily/Weekly/Monthly Reports:** Exportable CSVs for payroll.

#### Technical Flow
1. Appointment is marked `COMPLETED`.
2. System calculates: `(Service Price * Barber Rate) + Tips`.
3. Record added to `commissions` table linked to the Barber and Location.
4. Admin Dashboard aggregates these records into a real-time "Revenue vs. Payout" chart.

---

## 3. User Application (Customer Facing)

### 3.1 Page Architecture

**Stack:** React (Vite), React Router, Tailwind CSS, TanStack Query.

#### Route Groups
| Group | Access |
|-------|--------|
| Public | Landing, Location Select, Barber Profiles |
| Auth | Login, Signup, OTP Verification |
| Protected | Booking Flow, My Appointments, Loyalty Dashboard |

#### Page Map

**Public**
| Route | Page |
|-------|------|
| `/` | Landing Page (Brand Story) |
| `/locations` | Location Selector (South Beach vs. Wynwood) |
| `/barbers/:location` | Barber Gallery & Profiles |

**Auth**
| Route | Page |
|-------|------|
| `/auth/login` | Phone Number / SMS Login |
| `/auth/verify` | OTP Verification |

**Protected**
| Route | Page |
|-------|------|
| `/book` | Booking Stepper (Service -> Barber -> Time) |
| `/queue` | Join Walk-in Queue |
| `/profile` | My Appointments & Loyalty Points |
| `/loyalty` | Rewards Catalog |

---

### 3.2 Feature List by Page

#### `/locations` — Location Selector
- Toggle between "South Beach" and "Wynwood".
- Displays address, hours, and "Current Wait Time" for walk-ins.
- Visual map integration (Google Maps).

#### `/book` — Booking Stepper
- **Service Selection:** Categorized list (Haircuts, Shaves, Combos).
- **Barber Selection:** Grid of barbers with avatars, bios, and "Next Available" badges.
- **Time Picker:** Calendar view with 15-minute increments.
- **Payment:** Stripe Elements integration for card-on-file.

#### `/profile` — My Dashboard
- **Upcoming Bookings:** Card view with "Add to Calendar" and "Cancel" (subject to policy).
- **Loyalty Status:** Progress bar showing points until next free service.
- **History:** List of past services and barbers.

---

## 4. Admin Dashboard (Staff & Owner)

### 4.1 Page Architecture

**Access:** Staff/Admin/Owner roles only.

| Route | Page |
|-------|------|
| `/admin` | Real-time Shop Overview |
| `/admin/calendar` | Master Schedule (Drag & Drop) |
| `/admin/queue` | Live Queue Management |
| `/admin/clients` | CRM / Client Database |
| `/admin/staff` | Barber Management & Commissions |
| `/admin/reports` | Financial Analytics |
| `/admin/settings` | Shop Configuration |

---

### 4.2 Feature List by Page

#### `/admin/calendar` — Master Schedule
- Multi-column view (one column per barber).
- Drag-and-drop to reschedule appointments.
- Color-coded blocks (Confirmed, Checked-in, Completed).
- "Block Time" functionality for breaks or meetings.

#### `/admin/queue` — Live Queue Management
- List of waiting clients with "Time Waiting" counter.
- Manual "Add to Queue" for walk-ins who don't use the app.
- "Assign Barber" dropdown for general walk-ins.
- One-click "Send SMS" to notify client.

#### `/admin/staff` — Barber Management
- **Profile Edit:** Name, bio, photo, and services offered.
- **Schedule Setup:** Recurring weekly hours and vacation overrides.
- **Commission Config:** Set base % and any flat-fee bonuses.
- **Performance Stats:** Individual retention rates and average ticket value.

#### `/admin/reports` — Financial Analytics
- **Revenue Breakdown:** Total sales, tips, and taxes per location.
- **Commission Report:** Table showing `Barber Name | Total Sales | Commission Due | Tips | Total Payout`.
- **Export:** One-click CSV export for QuickBooks/Payroll.

---

## 5. Tech Stack

### Architecture

The system follows a modern monolithic-service architecture for rapid deployment and consistency.

```
south-beach-wynwood-app/
├── backend/    ← NestJS API (Node.js)
├── frontend/   ← React (Vite) Customer App
└── admin/      ← React (Vite) Admin Dashboard
```

### Technologies

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Backend | NestJS | 10.x | Scalable API architecture |
| Language | TypeScript | 5.x | Type safety across full stack |
| ORM | TypeORM | 0.3.x | Database mapping and migrations |
| Database | PostgreSQL | 15 | Relational data for complex queries |
| Frontend | React | 18.x | UI Library |
| Styling | Tailwind CSS | 3.x | Utility-first responsive design |
| Real-time | Socket.io | 4.x | Live calendar and queue updates |
| Payments | Stripe | — | Payment processing and card storage |
| SMS | Twilio | — | Transactional SMS and OTP |

### Third-Party Integrations

| Service | Purpose |
|---------|---------|
| **Stripe** | Handling deposits, no-show fees, and full payments. |
| **Twilio** | SMS reminders, queue alerts, and login OTP. |
| **Google Maps API** | Location distance calculation and address autocomplete. |
| **Cloudinary** | Hosting barber profile photos and shop gallery images. |

### Key Decisions

| Decision | Rationale |
|----------|-----------|
| **PostgreSQL** | Essential for handling complex relationships between barbers, schedules, and multi-location transactions. |
| **WebSockets** | Necessary for the Admin Calendar so multiple receptionists/managers see updates without refreshing. |
| **SMS-only Auth** | High-end barbershop clients prefer quick phone-based login over remembering passwords. |

---

## 6. Open Questions

| # | Question | Context / Impact | Owner | Status |
|:-:|----------|-----------------|-------|--------|
| 1 | **Cancellation Policy?** | Do we charge 50% or 100% for no-shows? Needs to be in the UI. | Client | ⏳ Open |
| 2 | **Existing Data?** | Can we export client history from Vagaro to seed the new CRM? | Client | ⏳ Open |
| 3 | **Hardware?** | Will there be a dedicated tablet/kiosk at the front desk for walk-ins? | Client | ⏳ Open |
| 4 | **Commission Tiers?** | Does the % change if a barber hits a certain weekly revenue target? | Client | ⏳ Open |
| 5 | **SMS Costs?** | With 12 barbers, SMS volume will be high. Confirm budget for Twilio. | Client | ⏳ Open |