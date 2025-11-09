-- Criar tabela site_users no Supabase
-- Execute este SQL no SQL Editor do projeto do site (não do app)

create table if not exists site_users (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text unique not null,
  cpf text,
  phone text,
  password text,
  status text default 'pending_payment',
  created_at timestamp default now()
);

-- Habilitar RLS
alter table public.site_users enable row level security;

-- Policy para permitir inserção anônima
create policy "permit_insert_site_users"
on site_users
for insert
to anon
with check (true);

-- Policy para permitir seleção (ajuste conforme necessário)
create policy "permit_select_own_user"
on site_users
for select
to anon
using (true);

