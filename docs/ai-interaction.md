# AI Interaction Audit & Development Log — MDS

> **Application Name**: MDS – Fresh Produce Wholesale Platform  
> **Academic / Program Context**: Submitted for **Project Better Tomorrow (Review 1)**

---

## 1. Transparency & Integrity Statement

This document provides a transparent, auditable log of AI tool usage during the development and review preparation for **MDS – Fresh Produce Wholesale Platform**.

### Important Clarifications:
- **No AI Features Inside the Application**: The application itself is a deterministic web platform (React, TypeScript, Supabase, Tailwind CSS) and **does NOT contain any built-in AI, machine learning, or automated prompt features**.
- **Role of AI**: AI tools were utilized strictly as external coding assistants (pair-programming, scaffolding boilerplate, code syntax analysis, Git security review, and documentation formatting).
- **Code Review Protocol**: All code, queries, and documentation suggestions generated with AI assistance were reviewed, tested, and verified by the developer before being retained in the repository.

---

## 2. AI Assistance Breakdown by Development Phase

| Development Area | Scope of AI Assistance | Developer Review & Verification Method | Status / Evidence |
| :--- | :--- | :--- | :--- |
| **Documentation Preparation** | Generating structured markdown documentation (`project-overview.md`, `problem-statement.md`, `completed-work.md`, `ai-interaction.md`, `README.md`). | Manually verified against actual file paths and component names in the repository. | **Verified & Retained** in `docs/` and `README.md` |
| **Git Security Audit** | Identifying `.env` in Git tracking and generating untracking command (`git rm --cached .env`). | Executed and confirmed via `git ls-files .env` that local secret values were preserved and untracked. | **Verified & Applied** |
| **TypeScript / Component Boilerplate** | Scaffolding initial component layouts, typed interfaces, and SVG icon vector paths. | Compiled via TypeScript (`tsc -b`) and tested in browser development server. | **Verified & Retained** in `src/` |
| **Supabase Schema & RLS Scaffolding** | Authoring SQL schema boilerplate for tables (`stores`, `products`, `enquiries`, `gallery`, `business_settings`) and Row-Level Security policies. | Inspected SQL constraints, foreign keys, and policy conditions against business requirements. | **Verified & Retained** in `supabase/schema.sql` |

---

## 3. Human vs. AI Responsibility Matrix

| Area | Responsible Party | Description |
| :--- | :--- | :--- |
| **Business Requirements & Scope** | Developer / Human | Defining MDS physical store locations, product lines, wholesale workflow, and nearly 50-year heritage narrative. |
| **Code Implementation & Review** | Developer / Human | Selecting architectural patterns, testing UI behavior, confirming responsive layout, and ensuring zero-crash fallback. |
| **Boilerplate & Syntax Generation** | AI Tool | Assisting in drafting repetitive TypeScript interfaces, HTML skeleton loaders, and initial SQL templates. |
| **Documentation Structuring** | AI Tool + Human Review | Formatting review documentation to match academic evaluation standards based on repository evidence. |
| **Real-World User Testing** | Human (Pending) | Field testing with store operators and buyers (**Marked as PENDING**; no synthetic feedback created). |

---

## 4. Hallucination Prevention & Validation Protocol

To maintain academic and professional integrity:
1. **No Fabricated User Testing**: No artificial customer interviews, satisfaction statistics, or simulated test results were created. All user validation is explicitly marked as **PENDING**.
2. **File Path Verification**: Every file path, component import, and service method referenced in documentation was verified against the repository filesystem.
3. **No Phantom Dependencies**: All documented dependencies (`react`, `react-dom`, `@supabase/supabase-js`, `tailwindcss`, `vite`, `typescript`) exist in `package.json`.
