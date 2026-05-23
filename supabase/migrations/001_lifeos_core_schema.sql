-- LifeOS core schema
create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  completed boolean not null default false,
  reminder_time text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  progress integer not null default 0 check (progress between 0 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.habits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  streak integer not null default 0 check (streak >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.planner_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  day_key date not null,
  start_time text not null,
  end_time text not null,
  item_type text not null check (item_type in ('timeblock','routine','reminder')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.finance_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  item_kind text not null check (item_kind in ('bill','subscription','budget')),
  name text not null,
  amount numeric(12,2) not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.assistant_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('user','assistant')),
  content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.assistant_prompt_usage (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  prompt text not null,
  usage_count integer not null default 0 check (usage_count >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, prompt)
);

create table if not exists public.automations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  enabled boolean not null default true,
  config jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.vault_notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text,
  body text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- triggers
create trigger set_updated_at_profiles before update on public.profiles for each row execute function public.set_updated_at();
create trigger set_updated_at_tasks before update on public.tasks for each row execute function public.set_updated_at();
create trigger set_updated_at_goals before update on public.goals for each row execute function public.set_updated_at();
create trigger set_updated_at_habits before update on public.habits for each row execute function public.set_updated_at();
create trigger set_updated_at_planner_items before update on public.planner_items for each row execute function public.set_updated_at();
create trigger set_updated_at_finance_items before update on public.finance_items for each row execute function public.set_updated_at();
create trigger set_updated_at_assistant_messages before update on public.assistant_messages for each row execute function public.set_updated_at();
create trigger set_updated_at_assistant_prompt_usage before update on public.assistant_prompt_usage for each row execute function public.set_updated_at();
create trigger set_updated_at_automations before update on public.automations for each row execute function public.set_updated_at();
create trigger set_updated_at_vault_notes before update on public.vault_notes for each row execute function public.set_updated_at();

-- RLS
alter table public.profiles enable row level security;
alter table public.tasks enable row level security;
alter table public.goals enable row level security;
alter table public.habits enable row level security;
alter table public.planner_items enable row level security;
alter table public.finance_items enable row level security;
alter table public.assistant_messages enable row level security;
alter table public.assistant_prompt_usage enable row level security;
alter table public.automations enable row level security;
alter table public.vault_notes enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);

create policy "tasks_own_all" on public.tasks for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "goals_own_all" on public.goals for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "habits_own_all" on public.habits for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "planner_items_own_all" on public.planner_items for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "finance_items_own_all" on public.finance_items for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "assistant_messages_own_all" on public.assistant_messages for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "assistant_prompt_usage_own_all" on public.assistant_prompt_usage for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "automations_own_all" on public.automations for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "vault_notes_own_all" on public.vault_notes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
