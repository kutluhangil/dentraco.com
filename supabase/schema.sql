-- Dentraco — önerilen Supabase şeması (taslak). Prototip bu şemayı henüz kullanmaz.

create type user_role as enum ('user', 'admin');
create type review_status as enum ('pending', 'published', 'rejected');
create type target_type as enum ('doctor', 'hospital');

create table profiles (
  id uuid primary key references auth.users on delete cascade,
  name text not null check (char_length(name) between 3 and 60),
  role user_role not null default 'user',
  suspended boolean not null default false,
  created_at timestamptz not null default now()
);

create table hospitals (
  id text primary key,
  slug text unique not null,
  name text not null,
  type text not null,
  city text not null,
  district text not null,
  address text not null,
  phone text,
  email text,
  website text,
  lat double precision,
  lon double precision,
  founded int,
  chairs int,
  summary text not null,
  about text[] not null default '{}',
  treatments text[] not null default '{}',
  amenities text[] not null default '{}',
  hours jsonb not null default '[]',
  image text,
  interior_image text
);

create table doctors (
  id text primary key,
  slug text unique not null,
  hospital_id text not null references hospitals on delete cascade,
  title text not null,
  first_name text not null,
  last_name text not null,
  specialty text not null,
  birth_year int,
  graduation_year int not null,
  languages text[] not null default '{}',
  headline text not null,
  about text[] not null default '{}',
  thesis text,
  education jsonb not null default '[]',
  experience jsonb not null default '[]',
  certificates jsonb not null default '[]',
  memberships text[] not null default '{}',
  publications text[] not null default '{}',
  focus text[] not null default '{}',
  working_days text[] not null default '{}',
  image text
);
create index on doctors (hospital_id);
create index on doctors (specialty);

create table reviews (
  id uuid primary key default gen_random_uuid(),
  target_type target_type not null,
  target_id text not null,
  user_id uuid references profiles on delete cascade,
  author_name text not null,
  rating smallint not null check (rating between 1 and 5),
  title text not null check (char_length(title) between 4 and 80),
  body text not null check (char_length(body) between 30 and 1000),
  treatment text,
  visit_date text,
  status review_status not null default 'pending',
  flags jsonb not null default '[]',
  reject_reason text,
  moderated_by uuid references profiles,
  moderated_at timestamptz,
  is_sample boolean not null default false,
  created_at timestamptz not null default now(),
  unique (user_id, target_type, target_id)
);
create index on reviews (target_type, target_id, status);

create table articles (
  id text primary key,
  slug text unique not null,
  title text not null,
  summary text not null,
  category text not null,
  reviewer_id text references doctors on delete set null,
  body text not null,
  cover text,
  sources jsonb not null default '[]',
  reading_minutes int not null default 1,
  published boolean not null default false,
  updated_at timestamptz not null default now()
);

create view rating_summaries as
  select target_type, target_id, avg(rating)::numeric(3,2) as average, count(*) as count
  from reviews where status = 'published'
  group by target_type, target_id;

-- Yardımcı: oturumdaki kullanıcı yönetici mi?
create function is_admin() returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from profiles where id = auth.uid() and role = 'admin' and not suspended);
$$;

alter table profiles enable row level security;
alter table hospitals enable row level security;
alter table doctors enable row level security;
alter table reviews enable row level security;
alter table articles enable row level security;

create policy "profil: kendi kaydı" on profiles for select using (id = auth.uid() or is_admin());
create policy "profil: kendi adını günceller" on profiles for update using (id = auth.uid()) with check (role = (select role from profiles where id = auth.uid()));
create policy "profil: yönetici" on profiles for all using (is_admin());

create policy "hastane: herkes okur" on hospitals for select using (true);
create policy "hastane: yönetici yazar" on hospitals for all using (is_admin()) with check (is_admin());

create policy "doktor: herkes okur" on doctors for select using (true);
create policy "doktor: yönetici yazar" on doctors for all using (is_admin()) with check (is_admin());

create policy "yazı: yayındakiler" on articles for select using (published or is_admin());
create policy "yazı: yönetici yazar" on articles for all using (is_admin()) with check (is_admin());

create policy "yorum: yayındakiler ve kendi yorumları" on reviews for select using (status = 'published' or user_id = auth.uid() or is_admin());
create policy "yorum: üye ekler (beklemede)" on reviews for insert with check (
  user_id = auth.uid() and status = 'pending'
  and not exists (select 1 from profiles where id = auth.uid() and suspended)
);
create policy "yorum: yönetici yönetir" on reviews for update using (is_admin()) with check (is_admin());
create policy "yorum: yönetici siler" on reviews for delete using (is_admin());
