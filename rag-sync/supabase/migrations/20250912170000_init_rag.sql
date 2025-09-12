-- 20250912_000001_init_rag.sql

-- extensions
create extension if not exists vector;
create extension if not exists pg_trgm;

-- sources registry
create table if not exists rag_sources (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('web','gdrive','s3','github')),
  url text,
  sitemap text,
  depth int default 1,
  gdrive_folder_id text,
  parser_options jsonb not null default '{}'::jsonb,
  enabled boolean not null default true,
  created_at timestamptz not null default now()
);

-- documents
create table if not exists rag_documents (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references rag_sources(id) on delete cascade,
  source_type text not null,
  source_uri text not null,
  title text,
  etag text,
  last_modified timestamptz,
  content_sha256 text not null,
  bytes int,
  lang text,
  crawl_depth int default 0,
  fetched_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (source_type, source_uri)
);

-- chunks
create table if not exists rag_chunks (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references rag_documents(id) on delete cascade,
  chunk_index int not null,
  content text not null,
  tokens int,
  embedding vector(1536), -- 1536 dims to allow IVFFlat index
  content_sha256 text not null,
  headings text[],
  url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (document_id, chunk_index)
);

-- staging per sync run
create table if not exists rag_staging_chunks (
  sync_run_id uuid not null,
  source_id uuid not null references rag_sources(id) on delete cascade,
  document_id uuid not null,
  chunk_index int not null,
  content text not null,
  content_sha256 text not null,
  headings text[],
  url text,
  embedding vector(1536), -- match live table
  primary key (sync_run_id, document_id, chunk_index)
);

-- sync run log
create table if not exists rag_sync_runs (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references rag_sources(id) on delete cascade,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  docs_upserted int default 0,
  chunks_added int default 0,
  chunks_deleted int default 0,
  status text default 'ok',
  error text
);

-- search helpers
alter table rag_chunks
  add column if not exists tsv tsvector
  generated always as (to_tsvector('english', content)) stored;

create index if not exists idx_chunks_tsv on rag_chunks using gin(tsv);

-- ANN index: IVFFlat with cosine
create index if not exists idx_chunks_embedding_cosine
  on rag_chunks using ivfflat (embedding vector_cosine_ops) with (lists = 100);

create index if not exists idx_docs_sha on rag_documents(content_sha256);
create index if not exists idx_chunks_sha on rag_chunks(content_sha256);

-- updated_at triggers
create or replace function set_timestamp() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_docs_set_timestamp
before update on rag_documents
for each row execute function set_timestamp();

create trigger trg_chunks_set_timestamp
before update on rag_chunks
for each row execute function set_timestamp();

-- retrieval helper expects 1536-dim vectors
create or replace function rag_search(
  query_embedding vector(1536),
  match_limit int,
  source_types text[] default null
) returns table (
  chunk_id uuid,
  document_id uuid,
  url text,
  content text,
  score float
) language sql stable as $$
  select c.id, c.document_id, c.url, c.content,
         1 - (c.embedding <=> query_embedding) as score
  from rag_chunks c
  join rag_documents d on d.id = c.document_id
  where source_types is null or d.source_type = any(source_types)
  order by c.embedding <=> query_embedding
  limit match_limit;
$$;
