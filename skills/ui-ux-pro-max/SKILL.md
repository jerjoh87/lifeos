# UI/UX Pro Max Skill (LifeOS Adaptation)

Use this skill for premium interface redesign and polish work in LifeOS.

## When to Use
- UI redesign
- dashboard design
- mobile responsive fixes
- landing page design
- app screen polish
- fintech/luxury UI

## LifeOS Visual Direction
- Luxury dark mode with Apple + Linear-inspired minimalism.
- Glassmorphism surfaces (soft blur, layered translucency, subtle borders).
- Bento dashboard card layouts with clear hierarchy and quick-scannable metrics.
- Mobile-first composition that scales cleanly to desktop.
- Smooth, restrained Framer Motion transitions.
- Build with TailwindCSS + shadcn/ui primitives first, then customize.

## Premium UI/UX Reasoning Framework
1. Clarify user intent for each screen (primary action + secondary actions).
2. Reduce cognitive load (group related content, progressive disclosure).
3. Emphasize outcomes (status, progress, alerts, next action).
4. Design for trust (predictable patterns, data clarity, stable spacing).
5. Balance delight with speed (polish without hurting performance).

## Responsive Design Rules
- Start at iPhone width first; expand via progressive enhancement.
- Use adaptive layout shifts (stack -> split -> multi-column) at clear breakpoints.
- Preserve touch targets (>=44px), readable line lengths, and safe card padding.
- Prevent overflow/cutoff in cards, tables, and charts.
- Keep navigation adaptive: bottom nav on mobile, sidebar/topbar on desktop.

## Accessibility Checklist
- Maintain sufficient contrast for text, icons, and interactive states.
- Ensure visible focus styles and keyboard navigability.
- Use semantic headings and landmarks for screen-reader structure.
- Avoid color-only meaning; pair with labels/icons.
- Respect reduced-motion preferences for animated interactions.

## Fintech/SaaS Dashboard Patterns
- KPI row: balance, burn/spend, tasks due, goal progress, alerts.
- Action center: "What needs attention now" with prioritized cards.
- Timeline panel: upcoming tasks/events/bills.
- Insight cards: trends, anomalies, and AI recommendations.
- Empty states must provide clear CTAs and onboarding guidance.

## Color, Type, Spacing, Motion, Layout Rules
- Color: dark neutral foundation + 1-2 brand accents + semantic status colors.
- Typography: strong display headlines, compact readable body, consistent scale.
- Spacing: 8px spacing system; generous card breathing room.
- Motion: subtle entrance, hover, and state transitions (150-300ms typical).
- Layout: consistent grid, aligned card edges, predictable section rhythm.

## Implementation Notes
- Prefer reusable UI components over one-off styling.
- Keep class composition maintainable; extract shared variants.
- Validate polish on mobile and desktop before finalizing.
- Do not change core app functionality during UI-only tasks unless requested.
