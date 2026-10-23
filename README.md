# FinTalent Partners v2.0 — Modern Finance, CA & Tax Placement Studio

Bridging premier **Chartered Accountants (CA)**, **CMAs**, **Tax Advisors**, **Audit Managers**, **FP&A Leaders**, and **CA Articleship Trainees** with leading CA Firms, MNC Shared Services, and high-growth Startups across India.

---

## Key UX & Product Highlights

- **Zero-Turnaround Instant Role & Talent Finder (`Hero` + `LiveExchange`)**:
  - **For Candidates**: Browse open mandates across Mumbai, Bengaluru, Delhi NCR, and Pune with real-time search, domain pills, and city filters. Tap **Apply in 60s** on any job card to pre-fill role, domain, city, and compensation automatically.
  - **For Recruiters & Firms**: Toggle instantly to the **Pre-Vetted Talent Pool** to review ICAI-screened finance profiles, notice periods, and skills. Tap **Shortlist Profile** to request the full verified CV and callback in seconds.
- **Single-Screen Express Action Studio (`ActionStudio`)**:
  - **60-Second Candidate Fast-Drop**: Single-card application with 1-tap Qualification chips, Domain chips, Experience/City/CTC quick presets, and drag-and-drop PDF resume upload.
  - **45-Second Recruiter Mandate Desk**: 1-tap role presets (`Audit Senior`, `FP&A Lead`, `GST Lead`, `Direct Tax Manager`, `Article Trainee`, `SAP Controller`) that sync straight to the Live Open Roles Board and Supabase.
- **Passwordless Live Application Tracker (`StatusTrackerModal`)**:
  - Instant 5-stage recruitment pipeline status lookup using **Mobile Number + Date of Birth**, complete with saved passkey autofill and live HR remarks.
- **Staff Recruitment Command Console (`AdminPortal`)**:
  - Accessible via footer trigger or `#admin` hash (`admin@fintalentpartners.com` / `admin123`).
  - Live candidate pipeline stage updates, HR notes sync, direct WhatsApp/Phone triggers, CSV export, firm mandate management, and instant job publishing.
- **Dual Signature Themes**:
  - **Obsidian Acid Studio (`dark`)** & **Warm Studio Cream (`light`)** powered by custom architectural/3D editorial imagery, **Bricolage Grotesque**, **Plus Jakarta Sans**, and **JetBrains Mono**.

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite 8, Tailwind CSS v4, Motion (`motion/react`), Lucide Icons
- **Cloud Backend & Storage**: Supabase PostgreSQL (`candidates`, `firm_requests`) + Supabase Storage (`resumes` PDF bucket) with resilient local sync fallback

---

## Quick Start

```bash
npm install
npm run dev
```

### Production Build & Type Check

```bash
npm run lint
npm run build
```

---

## Project Structure

```text
public/
  images/
    hero-finance-studio.jpg     # Golden-hour BKC executive finance studio backdrop
    candidate-card-bg.jpg       # 3D glass torus & acid-lime ribbon artwork
    recruiter-card-bg.jpg       # Copper & sapphire executive skybridge twilight visual
    workspace-abstract-bg.jpg   # Neo-geometric 3D architectural relief backdrop
src/
  components/
    Header.tsx                  # Floating glass/brutalist capsule nav bar
    Hero.tsx                    # Dual-persona hero with instant search & quick filters
    CredibilityStrip.tsx        # High-contrast kinetic ticker tape
    LiveExchange.tsx            # Real-time Open Roles & Pre-Vetted Talent finder
    ActionStudio.tsx            # Single-screen Candidate & Recruiter fast workspace
    CandidateForm.tsx           # 60-second single-card resume submission form
    EmployerForm.tsx            # 45-second hiring mandate form with 1-tap presets
    Specializations.tsx         # 6-vertical interactive finance bento grid
    TrustSection.tsx            # Principal search desk (Amii Ma'am) & quick FAQ
    Footer.tsx                  # Regional desks & staff console access
    StatusTrackerModal.tsx      # 5-stage live candidate pipeline tracker
    CelebrationModal.tsx        # Confetti confirmation + passkey summary
    AdminPortal.tsx             # Full staff ATS & live role publisher
  context/
    ThemeContext.tsx            # Persistent dark/light studio theme provider
  lib/
    supabase.ts                 # Supabase client, queries, storage & local sync cache
    confetti.ts                 # Celebration particle burst helper
```
