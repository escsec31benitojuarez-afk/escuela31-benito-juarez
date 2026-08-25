-- Aula Digital Benito Juárez V1.0.0
-- Esquema mínimo y políticas RLS. Ejecutar una sola vez en Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.subjects (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('admin','teacher','student')),
  course_id uuid references public.courses(id) on delete restrict,
  active boolean not null default true,
  display_name text not null,
  created_at timestamptz not null default now(),
  constraint student_requires_course check (role <> 'student' or course_id is not null)
);

create table if not exists public.course_subjects (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  subject_id uuid not null references public.subjects(id) on delete restrict,
  resource_url text,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique (course_id, subject_id),
  constraint valid_resource_url check (resource_url is null or resource_url ~ '^https://drive\\.google\\.com/')
);

create table if not exists public.teacher_assignments (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.profiles(id) on delete cascade,
  course_subject_id uuid not null references public.course_subjects(id) on delete cascade,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (teacher_id, course_subject_id)
);

create index if not exists idx_profiles_course on public.profiles(course_id);
create index if not exists idx_course_subjects_course on public.course_subjects(course_id);
create index if not exists idx_course_subjects_subject on public.course_subjects(subject_id);
create index if not exists idx_teacher_assignments_teacher on public.teacher_assignments(teacher_id);

create or replace function public.is_active_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin' and p.active) $$;

revoke all on function public.is_active_admin() from public;
grant execute on function public.is_active_admin() to authenticated;

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.subjects enable row level security;
alter table public.course_subjects enable row level security;
alter table public.teacher_assignments enable row level security;

drop policy if exists profiles_select_own_or_admin on public.profiles;
create policy profiles_select_own_or_admin on public.profiles for select to authenticated
using (id = auth.uid() or public.is_active_admin());

drop policy if exists profiles_admin_write on public.profiles;
create policy profiles_admin_write on public.profiles for all to authenticated
using (public.is_active_admin()) with check (public.is_active_admin());

drop policy if exists courses_authorized_select on public.courses;
create policy courses_authorized_select on public.courses for select to authenticated using (
  public.is_active_admin() or (
    active and exists (select 1 from public.profiles p where p.id = auth.uid() and p.active and p.course_id = courses.id)
  ) or (
    active and exists (
      select 1 from public.teacher_assignments ta
      join public.course_subjects cs on cs.id = ta.course_subject_id
      join public.profiles p on p.id = ta.teacher_id
      where ta.teacher_id = auth.uid() and ta.active and p.active and cs.active and cs.course_id = courses.id
    )
  )
);

drop policy if exists courses_admin_write on public.courses;
create policy courses_admin_write on public.courses for all to authenticated
using (public.is_active_admin()) with check (public.is_active_admin());

drop policy if exists subjects_authorized_select on public.subjects;
create policy subjects_authorized_select on public.subjects for select to authenticated using (
  public.is_active_admin() or (
    active and exists (
      select 1 from public.course_subjects cs
      join public.profiles p on p.course_id = cs.course_id
      where p.id = auth.uid() and p.active and cs.active and cs.subject_id = subjects.id
    )
  ) or (
    active and exists (
      select 1 from public.teacher_assignments ta
      join public.course_subjects cs on cs.id = ta.course_subject_id
      join public.profiles p on p.id = ta.teacher_id
      where ta.teacher_id = auth.uid() and ta.active and p.active and cs.active and cs.subject_id = subjects.id
    )
  )
);

drop policy if exists subjects_admin_write on public.subjects;
create policy subjects_admin_write on public.subjects for all to authenticated
using (public.is_active_admin()) with check (public.is_active_admin());

drop policy if exists course_subjects_authorized_select on public.course_subjects;
create policy course_subjects_authorized_select on public.course_subjects for select to authenticated using (
  public.is_active_admin() or (
    active and exists (select 1 from public.profiles p where p.id = auth.uid() and p.active and p.course_id = course_subjects.course_id)
  ) or (
    active and exists (
      select 1 from public.teacher_assignments ta
      join public.profiles p on p.id = ta.teacher_id
      where ta.teacher_id = auth.uid() and ta.active and p.active and ta.course_subject_id = course_subjects.id
    )
  )
);

drop policy if exists course_subjects_admin_write on public.course_subjects;
create policy course_subjects_admin_write on public.course_subjects for all to authenticated
using (public.is_active_admin()) with check (public.is_active_admin());

drop policy if exists teacher_assignments_select_own_or_admin on public.teacher_assignments;
create policy teacher_assignments_select_own_or_admin on public.teacher_assignments for select to authenticated
using (teacher_id = auth.uid() or public.is_active_admin());

drop policy if exists teacher_assignments_admin_write on public.teacher_assignments;
create policy teacher_assignments_admin_write on public.teacher_assignments for all to authenticated
using (public.is_active_admin()) with check (public.is_active_admin());

revoke all on public.profiles, public.courses, public.subjects, public.course_subjects, public.teacher_assignments from anon;
grant select, insert, update, delete on public.profiles, public.courses, public.subjects, public.course_subjects, public.teacher_assignments to authenticated;
