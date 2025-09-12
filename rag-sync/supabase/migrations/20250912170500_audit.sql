-- human-readable audit materialized view
drop materialized view if exists rag_audit_v;
create materialized view rag_audit_v as
select
  s.id as source_id,
  s.type as source_type,
  d.source_uri,
  coalesce(d.title, split_part(d.source_uri,'/',3)) as title,
  d.fetched_at,
  d.last_modified,
  d.bytes,
  c.chunk_index,
  left(c.content, 200) as preview
from rag_sources s
join rag_documents d on d.source_id = s.id
join rag_chunks c on c.document_id = d.id
order by s.type, d.source_uri, c.chunk_index;

create index if not exists idx_audit_source on rag_audit_v(source_type, source_uri);

-- snapshot tables to store audits by run
create table if not exists rag_audit_snapshots (
  id uuid primary key default gen_random_uuid(),
  generated_at timestamptz not null default now(),
  source_id uuid references rag_sources(id) on delete set null,
  notes text
);

create table if not exists rag_audit_snapshot_rows (
  snapshot_id uuid not null references rag_audit_snapshots(id) on delete cascade,
  source_type text,
  source_uri text,
  title text,
  fetched_at timestamptz,
  last_modified timestamptz,
  bytes int,
  chunk_index int,
  preview text
);

-- convenience function to snapshot the current audit view
create or replace function rag_audit_snapshot(p_source_id uuid default null, p_notes text default null)
returns uuid language plpgsql as $$
declare sid uuid;
begin
  insert into rag_audit_snapshots(source_id, notes) values (p_source_id, p_notes) returning id into sid;
  insert into rag_audit_snapshot_rows(snapshot_id, source_type, source_uri, title, fetched_at, last_modified, bytes, chunk_index, preview)
  select sid, source_type, source_uri, title, fetched_at, last_modified, bytes, chunk_index, preview
  from rag_audit_v
  where p_source_id is null or source_id = p_source_id;
  return sid;
end;
$$;
