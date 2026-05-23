# LifeOS MVP Plan (Phase 1)

## Product North Star
LifeOS is an AI-powered personal operating system that unifies productivity, planning, and finance into one premium experience. The MVP focuses on daily retention loops: plan -> execute -> reflect -> improve.

## MVP Scope (6 Features)
1. **AI Dashboard** (`/dashboard`)
2. **AI Assistant (Jordan AI)** (`/assistant`)
3. **Smart Calendar + Planner** (`/calendar`)
4. **Tasks + Goals** (`/tasks`, `/goals`)
5. **Financial Hub (manual tracking)** (`/finance`)
6. **Knowledge Vault** (`/vault`)

> Automation reminders/check-ins are included in MVP via scheduled notifications and assistant nudges, not a full automation marketplace.

## Recommended Architecture

### Frontend
- Next.js App Router + React + TypeScript
- TailwindCSS + shadcn/ui + Framer Motion
- Mobile-first responsive layout
- Route groups:
  - `(auth)` for login/signup
  - `(onboarding)` for setup flow
  - `(app)` for authenticated product routes

### Backend
- Next.js Route Handlers for API (`app/api/...`)
- Service layer in `lib/services`
- Domain modules in `lib/domain`

### Data/Auth/Storage
- Supabase Auth (email/password + OAuth later)
- Supabase Postgres for core entities
- Supabase Storage for avatars/attachments
- Realtime for reminders and live dashboard widgets

### AI
- OpenAI API through server-side endpoint only
- AI orchestration layer:
  - Prompt templates (`lib/ai/prompts`)
  - Tool adapters (tasks, goals, calendar, finance)
  - Memory retrieval from `ai_memories` and `notes`

### Billing
- Stripe subscriptions:
  - Free, Pro, Family, Executive AI
- Webhooks handled in `/api/stripe/webhook`

## App Information Architecture

### Core Routes
- `/dashboard`
- `/assistant`
- `/calendar`
- `/tasks`
- `/goals`
- `/finance`
- `/automation` (lightweight reminders/check-ins first)
- `/vault`
- `/settings`

### Navigation
- Mobile: bottom tab navigation
- Desktop: left sidebar + top command/search bar

## Data Model (MVP)

### Tables
- `profiles`
- `tasks`
- `goals`
- `goal_milestones`
- `habits`
- `routines`
- `calendar_events`
- `reminders`
- `finance_accounts` (manual)
- `finance_transactions` (manual)
- `subscriptions`
- `notes`
- `ai_memories`

### Key Principles
- Every record scoped by `user_id`
- Soft delete (`deleted_at`) for recovery
- Audit fields on all tables (`created_at`, `updated_at`)

## MVP UX Requirements
- Dark-first luxury theme with glass cards and soft glow accents
- Smooth but subtle motion (avoid heavy animation)
- Zero overflow issues on small iPhone screens
- Performance budget first: defer non-critical animations

## Execution Plan (4 Weeks)

### Week 1: Foundation
- Project architecture + design system tokens
- Auth flow (signup/login)
- Onboarding wizard (profile, goals, routine)
- Dashboard shell + responsive nav

### Week 2: Productivity Core
- Tasks CRUD + reminders
- Goals + milestone progress
- Habits streak basics

### Week 3: AI Layer
- Jordan AI chat UI
- Contextual suggestions on dashboard
- Daily summary generation
- Task/goal breakdown assistance

### Week 4: Finance + Beta Hardening
- Bill reminders
- Subscription tracker
- Budget categories + spend summaries
- QA pass + analytics + beta launch checklist

## Non-Goals for MVP
- Plaid integration
- Native mobile apps
- Multi-user/family collaboration
- Full automation marketplace
- Advanced investing analytics

## Definition of Done (MVP)
- User can onboard and see a personalized dashboard
- User can manage tasks/goals/calendar and receive reminders
- User can chat with AI assistant and get actionable plans
- User can track manual finance items with bill/subscription visibility
- Product is fully responsive and deploy-ready

## Immediate Next Build Steps
1. Scaffold Next.js app route groups and shared layout shell
2. Add Supabase auth + protected routes
3. Build onboarding flow screens and persistence
4. Implement dashboard widgets with placeholder data contracts
5. Add base table schemas/migrations in Supabase
