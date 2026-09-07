<div align="center">
  
# YUGEN

**The comprehensive digital infrastructure for YUGEN Model United Nations.**
A full-stack event management platform handling delegate registrations, committee allocations, revenue tracking, and public information dissemination.
[Source](https://github.com/ruthwwikreddy/yugen) · Built by [Ruthwik Reddy](https://www.ruthwikreddy.live/)
MIT licensed · React + TypeScript · Firebase Powered
</div>

---

## Table of contents
1. [What YUGEN does](#1-what-yugen-does)
2. [Core Architecture](#2-core-architecture)
3. [Key Modules](#3-key-modules)
4. [Quick start](#4-quick-start)
5. [Admin Capabilities](#5-admin-capabilities)
6. [Tech Stack](#6-tech-stack)
7. [Contributing](#7-contributing)
8. [License](#8-license)

---

## 1. What YUGEN does

| Capability | Detail |
|---|---|
| **Delegate Lifecycle** | Manages the complete flow from registration $\rightarrow$ payment $\rightarrow$ confirmation $\rightarrow$ allocation. |
| **Allocation Engine** | Admin tools to import committee matrices and automatically assign portfolios to delegates. |
| **Revenue Tracking** | Real-time dashboard monitoring early-bird and priority round payments via UPI. |
| **Information Hub** | Publicly accessible resources, background guides, and schedule for all participants. |
| **Admin Control** | Password-protected backend to manage delegate data and send allocation emails. |

## 2. Core Architecture

```
Delegate/User             YUGEN Platform (React/TS)             Firebase Cloud
─────────────────         ────────────────────────            ────────────────────────
Register for Event   ─────▶  Registration Wizard      ──────▶    Firestore (Registrations)
Submit Payment       ─────▶  UPI Payment Integration   ──────▶    Firestore (Payment Status)
Check Portfolio      ◀─────  Public Allocations Page   ◀──────    Firestore (Allocations)
                                                                       │
                                                                       ▼
Admin User           ─────▶  Admin Dashboard          ◀──────    Secure Admin Auth
Import CSV Matrix    ─────▶  Allocation Engine        ──────▶    Update Portfolios
Send Allocations     ─────▶  Email Dispatcher         ──────▶    Notify Delegates
```

## 3. Key Modules

- **Registration Wizard**: A multi-step form with validation and payment tracking.
- **Allocation System**: Logic to map delegates to specific countries/portfolios based on committee matrices.
- **Admin Dashboard**: A secure area for the Secretariat to manage the event's operational data.
- **Public Resources**: A centralized hub for background guides and event documentation.

## 4. Quick start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ruthwwikreddy/yugen.git
   cd yugen
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Firebase**:
   Create a `.env` file and add your Firebase configuration keys.

4. **Run locally**:
   ```bash
   npm run dev
   ```

## 5. Admin Capabilities

The `/admin` portal provides the Secretariat with powerful tools:
- **Registration Management**: View and edit all delegate details.
- **CSV Import**: Bulk upload committee matrices for fast allocation.
- **Revenue Monitoring**: Track total fees collected across different registration rounds.
- **Allocation Dispatch**: Trigger notification emails to delegates once portfolios are assigned.

## 6. Tech Stack

- **Frontend**: React 18, TypeScript, Vite.
- **Styling**: Tailwind CSS / Custom CSS (Glassmorphism).
- **Backend/Database**: Firebase Firestore, Firebase Auth.
- **Deployment**: Vercel.

## 7. Contributing
This is a specialized event platform. Contributions regarding performance, UI/UX enhancements, or new admin features are welcome.

## 8. License
Released under the **MIT License** — feel free to adapt this infrastructure for your own MUN or event management needs.
