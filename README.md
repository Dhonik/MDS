# MDS – Fresh Produce Wholesale Platform

> **Application Name**: MDS – Fresh Produce Wholesale Platform  
> **Academic / Program Context**: Submitted for **Project Better Tomorrow (Review 1)**

---

## 🥬 Project Overview

**MDS – Fresh Produce Wholesale Platform** is a web-based fresh produce wholesale and retail catalog application built for MDS, a family-owned produce business operating across Kanyakumari District (Tamil Nadu, India) for nearly 50 years.

The platform bridges physical agricultural produce trading with modern web workflows, providing retail visibility for household consumers, structured wholesale enquiry pipelines for commercial buyers (hotels, restaurants, caterers, grocery stores), dedicated physical store hubs, and an authenticated administrative dashboard for managing operations, catalog items, and enquiries.

*(Note: "Project Better Tomorrow" is the overarching academic/program review framework under which this platform is submitted and evaluated; the application itself is the **MDS – Fresh Produce Wholesale Platform**).*

---

## 📊 Current Completion Status: 35% (Review 1 Milestone)

| Area | Completion | Status / Notes |
| :--- | :---: | :--- |
| **Frontend UI & Presentation** | **65%** | Core responsive pages, store views, produce catalogs, and forms implemented. |
| **Wholesale Enquiry System** | **50%** | Web form validation, database insertion, and automated WhatsApp link dispatch active. |
| **Admin Control Dashboard** | **40%** | Auth login, CRUD interfaces for products, stores, enquiries, gallery, and settings built. |
| **Database & Security Layer** | **40%** | Supabase PostgreSQL schema, RLS policies, and fallback local data layer implemented. |
| **Cloud Hosting & Production Deployment** | **0%** | Currently operating in local development and preview environment (**Pending**). |
| **End-User / Merchant Field Testing** | **0%** | Real-world validation with store managers and commercial buyers (**Pending**). |
| **Overall Project Progress** | **35%** | **Target scope for Review 1 achieved.** |

---

## 🌟 Key Features Implemented

- **Store Locator & Multi-Branch Profiles**: Dedicated profiles, opening hours, contact details, and Google Maps links for 3 physical branches:
  - *MDS Vegetable Shop (Thuckalay Market)*
  - *MDS Vegetable Shop (Nagercoil Market)*
  - *MDS Fruit Shop (Near Thuckalay Bus Stand)*
- **Wholesale Bulk Enquiry System**: Structured digital intake form capturing commercial requirements (business name, location, produce type, quantity, notes), persisting them to Supabase, and generating instant pre-filled WhatsApp messages.
- **Product / Vegetable / Fruit Catalogue**: Visual category browsing covering leafy vegetables, root crops, onions & potatoes, tomatoes, chillies/spices, seasonal vegetables, citrus, melons, tropical fruits, and bananas.
- **Admin Control Center (`#/admin`)**: Password-authenticated administrative interface allowing staff to manage store details, update product catalog availability, review and update customer enquiry statuses, upload photos to Supabase Storage, and modify business hotlines.
- **Dual-Mode Data Architecture**: Seamless automatic fallback to local verified datasets if Supabase credentials are not configured in `.env`, ensuring a zero-crash local preview experience.

---

## 🛠️ Technology Stack

- **Frontend**: React 18 (`react` 18.3.1, `react-dom` 18.3.1)
- **Language**: TypeScript (`typescript` 5.5.3)
- **Build Tool**: Vite (`vite` 5.4.2, `@vitejs/plugin-react` 4.3.1)
- **Styling**: Tailwind CSS (`tailwindcss` 3.4.11) with customized earthy produce palette
- **Backend & Database**: Supabase (`@supabase/supabase-js` 2.112.4) — PostgreSQL, Auth, Storage, and Row-Level Security (RLS)
- **Icons**: Custom zero-dependency SVG icon system

---

## 📁 Repository Structure

```text
MDS/
├── docs/                        # Review 1 Documentation Suite
│   ├── project-overview.md      # Platform overview, purpose, and architecture
│   ├── problem-statement.md     # Problem background and proposed solution
│   ├── completed-work.md        # Technical stack, implemented features & file evidence
│   └── ai-interaction.md        # AI interaction audit & development log
├── public/                      # Static assets and produce imagery
│   └── images/                  # Categorized images (vegetables, fruits, stores, hero)
├── src/
│   ├── components/              # Modular React UI components
│   │   ├── common/              # Toast, Icons, Loading Skeletons
│   │   ├── home/                # Hero, StoreOverview, Produce, Wholesale, Story, etc.
│   │   ├── layout/              # Navbar, Footer, MobileBottomBar
│   │   └── store/               # StoreDetailsPage
│   ├── data/                    # Local fallback datasets (stores, products, business)
│   ├── lib/                     # Supabase client and utility helpers
│   ├── pages/                   # Main views (HomePage, AdminDashboard, AdminLogin)
│   ├── services/                # Data services (auth, stores, products, enquiries, etc.)
│   ├── App.tsx                  # Root application & client hash router
│   ├── main.tsx                 # Entrypoint
│   └── index.css                # Global Tailwind CSS styles
├── supabase/
│   └── schema.sql               # PostgreSQL tables, RLS policies, and seed data
├── .env.example                 # Template for environment configuration
├── .gitignore                   # Git ignore rules (protecting .env secrets)
├── package.json                 # Project dependencies and npm scripts
└── tsconfig.json                # TypeScript compiler configuration
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### 2. Installation
```bash
# Navigate to the project directory
cd MDS

# Install dependencies
npm install
```

### 3. Environment Setup
Copy the `.env.example` template:
```bash
cp .env.example .env
```
Add your Supabase credentials to `.env`:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
*(Note: If left empty, the application gracefully operates in **Local Preview Mode** using bundled datasets.)*

### 4. Running Locally
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 5. Building for Production
```bash
npm run build
```

---

## 🔒 Security & Privacy
- Sensitive environment files (`.env`, `.env.*`) are ignored by Git and excluded from version control tracking.
- Row-Level Security (RLS) policies are configured in `supabase/schema.sql` to restrict write/update/delete operations to authenticated admins while permitting public read access to active store and product listings.

---

## 📖 Review 1 Documentation Suite
Detailed documentation for the Project Better Tomorrow Review 1 evaluation is available in the [`docs/`](./docs/) directory:
- [Project Overview](./docs/project-overview.md)
- [Problem Statement](./docs/problem-statement.md)
- [Completed Work & Implementation Evidence](./docs/completed-work.md)
- [AI Interaction Audit](./docs/ai-interaction.md)
