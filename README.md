# Project Space

Plataforma pública para visualizar projetos.

## Stack

- Next.js 16 (App Router)
- Supabase (Auth + Database)
- Tailwind CSS 4 + shadcn/ui
- TypeScript

## Configuração

1. Crie um projeto no [Supabase](https://supabase.com).
2. Execute o SQL abaixo no SQL Editor do Supabase:

```sql
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  created_by uuid references auth.users(id)
);

alter table public.projects enable row level security;

create policy "Qualquer pessoa pode ver projetos"
  on public.projects for select
  using (true);

create policy "Utilizadores autenticados podem inserir"
  on public.projects for insert
  with check (auth.role() = 'authenticated');

create policy "Utilizadores autenticados podem atualizar"
  on public.projects for update
  using (auth.role() = 'authenticated');

create policy "Utilizadores autenticados podem apagar"
  on public.projects for delete
  using (auth.role() = 'authenticated');
```

3. Ative o provider **Google** em Authentication → Providers.
4. Configure as Redirect URLs em Authentication → URL Configuration (inclua `http://localhost:3000/**` e `http://localhost:3001/**`).
5. Copie `.env.example` para `.env.local` e preencha as variáveis.

```bash
cp .env.example .env.local
```

6. Instale e rode:

```bash
pnpm install
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Notas

- Este app é apenas de leitura.
- O painel de administração fica no repositório `project-space-admin`.
