# Project Overview — MDS – Fresh Produce Wholesale Platform

## 1. Executive Summary
**MDS – Fresh Produce Wholesale Platform** is a web-based fresh produce wholesale and retail catalog application developed for MDS, a family-owned agricultural produce enterprise operating across Kanyakumari District (Tamil Nadu, India) for nearly 50 years.

This document serves as the project overview submitted for **Project Better Tomorrow (Review 1)**.

> **Clarification of Terminology**:  
> - **MDS – Fresh Produce Wholesale Platform**: The actual web application and digital system being built.  
> - **Project Better Tomorrow**: The academic/program review framework and evaluation track under which this project milestone is submitted.

The platform provides an authentic digital presence that connects retail shoppers with physical store counters while offering structured wholesale enquiry pipelines for commercial buyers (hotels, restaurants, caterers, grocery stores) alongside a protected administrative management dashboard.

---

## 2. Project Purpose & Core Objectives

### Purpose
To solve store discoverability, wholesale sourcing friction, and operational coordination challenges for an established fresh produce business without disrupting traditional early morning market dynamics.

### Core Objectives:
1. **Multi-Store Digital Discoverability**: Centralize operational data, opening hours (6:30 AM – 10:00 PM), contact hotlines, and Google Maps navigation for MDS's 3 physical branches:
   - *MDS Vegetable Shop (Thuckalay Market)*
   - *MDS Vegetable Shop (Nagercoil Market)*
   - *MDS Fruit Shop (Near Thuckalay Bus Stand)*
2. **Wholesale & Commercial Enquiry Pipeline**: Enable bulk produce buyers (hotels, restaurants, caterers, grocery shops) to submit structured orders online, persisting them into a database and triggering formatted WhatsApp chats for instant dispatch communication.
3. **Product & Seasonal Produce Transparency**: Provide an organized digital catalogue of vegetable and fruit categories with seasonal indicators, availability status, and flexible unit specifications.
4. **Administrative Operations Center**: Provide a secure administrative dashboard for managing stores, product catalog availability, incoming customer enquiries, gallery assets, and global business contact hotlines.
5. **Zero-Crash Local Resilience**: Guarantee complete frontend functionality through local static fallback data when external cloud services or environment variables are not configured.

---

## 3. Current Implemented Functionality

The platform consists of two main areas: **Public Web Application** and **Admin Dashboard**.

### Public Web Application
- **Hero & Core Value Proposition**: Highlights MDS's nearly 50-year heritage with immediate call-to-action triggers for store discovery and bulk wholesale enquiries.
- **Store Showcase & Deep Linking**: Detailed overview of all three physical stores with client-side hash routing (`#/stores/:slug`) and embedded interactive Google Maps.
- **Vegetable & Fruit Produce Catalogues**: Visual category browsing covering leafy vegetables, root produce, onions & potatoes, tomatoes, chillies/spices, seasonal harvests, citrus, melons, tropical fruits, and bananas.
- **Commercial vs. Retail Segmentation**: Distinct informational sections tailored for everyday family shoppers versus high-volume commercial buyers.
- **Wholesale Bulk Enquiry Form**: Validated intake form capturing client name, business name, phone, delivery location, produce requirement, and quantity. Submits to Supabase and opens pre-formatted WhatsApp chat.
- **Heritage & Timeline**: Chronological narrative documenting MDS's evolution from humble market trading to a 3-branch regional presence.
- **Mobile Sticky Action Bar**: Bottom navigation on mobile devices with one-tap access to store locations and phone calling.
- **Notification Toast**: Responsive feedback alerts for form submissions and user actions.

### Admin Dashboard (`#/admin`)
- **Supabase Authentication**: Email/password authentication flow with session persistence.
- **Operational Metrics**: Summary counters for active stores, listed products, pending enquiries, and gallery items.
- **Store Management**: CRUD interface to update store hours, phone numbers, map URLs, and public visibility.
- **Product Catalog Management**: Add, edit, and delete vegetable and fruit items with category tags, pricing, and stock status.
- **Enquiry Management**: Filter and review incoming enquiries with status workflows (`new`, `contacted`, `completed`, `cancelled`) and instant WhatsApp/dial triggers.
- **Gallery & Storage**: Integration with Supabase Storage (`mds-images` bucket) to manage photo assets.
- **Business Settings**: Key-value store for global business hotlines, business hours, and addresses.

---

## 4. Current Status: 35% Completed (Review 1)

- **Completed for Review 1**: Full frontend architecture (React 18, TypeScript, Tailwind CSS, Vite), Supabase schema and RLS policies, local data fallback layer, admin dashboard, and documentation suite.
- **Current Completion**: **35%** (focused on core application architecture, catalogue presentation, enquiry intake, and admin management).
- **Pending Milestones**: Production deployment/domain setup, gathering high-resolution on-site store photographs, multi-language localization (Tamil/English), and real-world merchant field validation.
