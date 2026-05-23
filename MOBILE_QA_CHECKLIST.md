# MOBILE QA CHECKLIST (LifeOS)

Manual checks for mobile stability before release.

## Target viewport
- [ ] Validate all core routes at **390px width** (iPhone baseline).

## Keyboard open states
- [ ] On `/assistant`, focus chat input and verify bottom nav does not block typing/send controls.
- [ ] On `/tasks`, `/planner`, and `/finance`, focus form fields and ensure active input remains visible.

## Long pages
- [ ] Scroll to the end of long modules (`/tasks`, `/planner`, `/finance`) and verify final controls are not hidden behind bottom navigation.

## Bottom nav clearance
- [ ] Confirm content uses enough bottom padding to clear fixed nav + safe area inset.
- [ ] Confirm no interactive CTA/button is obscured by bottom nav at page end.

## More sheet usability
- [ ] Open More sheet from bottom nav and verify secondary routes are visible and tappable.
- [ ] Tap backdrop to close sheet.
- [ ] Navigate via Vault/Automation/Settings and verify sheet closes on route change.

## Overflow checks
- [ ] Verify no horizontal scrolling on core pages.
- [ ] Verify long labels/values truncate or wrap gracefully without layout breaking.
- [ ] Confirm bottom nav labels/icons do not overlap at 390px.
