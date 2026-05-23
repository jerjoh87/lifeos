# LifeOS Data Migration Plan (localStorage -> Supabase)

## Scope
Prepare migration layer only. Do **not** switch UI modules to Supabase yet.

## Adapter architecture
- Interfaces: `lib/data/adapters/interfaces.ts`
- Local default adapters: `lib/data/adapters/local/index.ts`
- Supabase stubs (safe fallback): `lib/data/adapters/supabase/index.ts`
- Migration status utility: `lib/data/migration-plan.ts`

## Modules covered
- tasks
- goals
- habits
- planner_items
- finance_items
- vault_notes
- assistant_messages
- automations

## Migration strategy
1. Detect existing local data with local adapters.
2. Transform local records to Supabase table shape.
3. Attach `local_id` mapping (via metadata/aux table) for dedupe.
4. Upsert to avoid duplicate imports.
5. Preserve timestamps where available (`created_at`, `updated_at`).
6. Mark module migration complete in `MIGRATION_STATUS_KEY`.

## Duplicate prevention
- Use per-module upsert keys scoped by user + local_id.
- Never import module if migration status already true unless force flag is set.

## Safety behavior
- If Supabase env/package unavailable, Supabase adapters return clear errors.
- Local adapters remain source of truth until migration switch is explicitly enabled.

## Deferred (not in this phase)
- No UI rewiring to Supabase data.
- No OpenAI/Stripe changes.
- No destructive localStorage cleanup after migration yet.
