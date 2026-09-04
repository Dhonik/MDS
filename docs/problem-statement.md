# Problem Statement & Proposed Solution — MDS

> **Application Name**: MDS – Fresh Produce Wholesale Platform  
> **Academic / Program Context**: Submitted for **Project Better Tomorrow (Review 1)**

---

## 1. Problem Statement

### 1.1 Context
In traditional agricultural produce distribution across regional centers (such as Kanyakumari District, Tamil Nadu), fresh produce trade relies heavily on physical, early-morning market interactions. Established family-owned enterprises like MDS possess deep sourcing networks, community trust, and significant operational volume across multiple physical stores. However, without a dedicated digital presence, their daily operations encounter key structural bottlenecks:

### 1.2 Fragmented Store Discovery & Information Asymmetry
- **Multi-Store Invisibility**: Customers who frequent one branch (e.g., Thuckalay Vegetable Market) often remain unaware of companion outlets (e.g., the dedicated Fruit Shop near Thuckalay Bus Stand or the regional wholesale counter in Nagercoil Market).
- **Unreachable Operating Data**: Information on operating hours (6:30 AM to 10:00 PM), verified contact numbers, and precise Google Maps coordinates are scattered or unavailable online.

### 1.3 Inefficient Wholesale Enquiry & Sourcing Workflows
- **Informal Communication**: Bulk buyers (hotels, restaurants, caterers, grocery stores) must rely on unorganized phone calls or physical store visits to verify availability for high-volume staples (onions, potatoes, tomatoes) or seasonal fruits.
- **Lack of Enquiry Tracking**: Without a centralized digital intake desk, wholesale requests are susceptible to being missed or delayed during busy market morning trading hours.

### 1.4 Produce Catalog & Seasonal Transparency Gaps
- **Lack of Category Visibility**: Commercial buyers lack a structured digital catalogue to check which vegetable types (leafy greens, root crops, gourds, chillies/spices) or fruit varieties are in stock.
- **Dynamic Pricing Constraints**: Static prices on agricultural goods are misleading due to daily market rate fluctuations. Buyers need structured produce categories with customizable unit specifications.

### 1.5 Content & Operational Management Friction
- **Administrative Complexity**: Local produce merchants need an intuitive, lightweight administrative dashboard to update store hours, manage product availability, and track incoming customer enquiries without the overhead of heavy enterprise ERP software.

---

## 2. Proposed Solution

The **MDS – Fresh Produce Wholesale Platform** addresses these challenges by delivering a streamlined, high-speed web application tailored specifically to the operational realities of fresh produce wholesale and retail commerce.

### 2.1 Centralized Multi-Store Hub & Navigation
- Showcases all 3 physical store branches with clear categorizations (`Vegetables`, `Fruits`), detailed descriptions, direct phone hotlines, and interactive Google Maps links.
- Supports client-side deep linking (`#/stores/:slug`) for direct branch sharing.

### 2.2 Dual-Tier Commercial Architecture (Retail + Wholesale)
- **Retail Consumers**: Provides effortless browsing of fresh produce categories, seasonal highlights, and store operating hours for family shopping.
- **Wholesale Clients**: Provides a dedicated **Wholesale Bulk Enquiry System** collecting structured information (buyer name, business name, phone, delivery location, produce requirement, quantity, and notes).

### 2.3 Automated Dual-Channel Enquiry Processing
- **Database Persistence**: Securely stores all submitted enquiries in Supabase PostgreSQL with timestamped status tracking (`new`, `contacted`, `completed`, `cancelled`).
- **Instant WhatsApp Dispatch**: Automatically constructs and triggers pre-formatted WhatsApp messages to connect buyers directly with MDS wholesale dispatch staff.

### 2.4 Resilient Dual-Mode Data Layer (Supabase + Local Fallback)
- Fully functional backend integration with Supabase (PostgreSQL, Auth, Storage, Row-Level Security).
- Zero-crash **Local Fallback Mode**: If Supabase environment variables are omitted or offline, the platform automatically serves verified local static datasets (`stores.ts`, `products.ts`, `business.ts`).

### 2.5 Admin Control Center (`#/admin`)
- Secure password-authenticated administrative dashboard enabling staff to manage physical store details, toggle product availability, process wholesale enquiries, upload photos to Supabase Storage, and update business contact hotlines.

---

## 3. Scope & Boundaries (Review 1)

- **Included in Review 1 Scope**:
  - Full responsive web frontend (React 18, TypeScript, Tailwind CSS, Vite).
  - Multi-store locator and branch detail pages.
  - Vegetable and fruit produce catalogue presentation.
  - Wholesale bulk enquiry intake with automated WhatsApp generation.
  - Supabase schema, RLS policies, and admin authentication.
  - Admin management dashboard (CRUD for stores, products, enquiries, gallery, settings).
  - Dual-mode local data fallback resilience.
- **Excluded / Out of Scope for Current Phase**:
  - In-app payment gateway processing (wholesale produce pricing relies on daily physical auction rates and custom quotes).
  - Live GPS delivery fleet tracking.
  - Third-party courier API integrations.
