Here’s a drop-in `README.md` for the `rag-sync/` folder, plus a Makefile tweak that loads `.env`.

---

# RAG Sync

Generic, clonable RAG pipeline for n8n + Supabase (pgvector).

* Crawl web and ingest docs from Drive
* Chunk, embed, dedupe, upsert
* Scheduled sync with adds/updates/deletes
* Retrieval API via n8n webhooks
* In-DB audit view + snapshot exports
* All infra as code via Supabase CLI migrations

## Repo layout

```
rag-sync/
  supabase/
    config.toml
    migrations/
      20250912_000001_init_rag.sql
      20250912_000002_audit.sql
    seed/
      000_base_sources.sql
  workflows/
    rag_sync_orchestrator.json
    rag_ingest_web.json
    rag_ingest_gdrive.json
    rag_audit_export.json
  scripts/
    db_local_reset.sh
    db_push_remote.sh
    seed_remote.sh
  Makefile
  .env.example
  README.md
```

## Prerequisites

* Supabase CLI
* Docker (for local Supabase)
* psql
* n8n
* Optional services:

  * Firecrawl (web to Markdown)
  * Unstructured (PDF/DOCX parsing)

## Environment

Copy and fill:

```bash
cp .env.example .env
```

`.env.example` (keep lines as `KEY=VALUE` - no `export`):

```
SUPABASE_PROJECT_REF=your-project-ref
SUPABASE_DB_URL=postgresql://postgres:postgres@localhost:54322/postgres
OPENAI_API_KEY=
```

## First run (local)

```bash
# start local stack
make up

# apply all migrations and seeds locally
make db-reset
```

This creates:

* `rag_sources`, `rag_documents`, `rag_chunks`
* staging and sync logs
* `rag_audit_v` materialised view
* seed rows in `rag_sources`

## Migrations and seeds

* New migration: `make migrate-new name=add_whatever`
* Reset local DB: `make db-reset`
* Diff from live schema changes: `make db-diff name=rag_tuning`
* Push migrations to remote: `make db-push`
* Seed remote (simple SQL): `make seed-remote`

Notes:

* Migrations live in Git. Supabase tracks applied files in DB.
* For remote seeding there’s no first-class CLI command - `scripts/seed_remote.sh` pipes SQL via `psql`.

## n8n workflows

Import JSON from `workflows/`:

* `RAG - Sync Orchestrator` - scheduled runner
* `RAG - Ingest Web` - Firecrawl + upsert + delete
* `RAG - Ingest Google Drive` - Unstructured + upsert + delete
* `RAG - Audit - Export CSV` - weekly CSV to Drive/S3

Set environment values in n8n credentials:

* DB: use `SUPABASE_DB_URL` with service role
* `OPENAI_API_KEY`, optional `COHERE_API_KEY`
* `FIRECRAWL_API_URL`, `UNSTRUCTURED_API_URL`

## Scheduled sync

* Enable Cron in `RAG - Sync Orchestrator` (e.g. 02:15 daily)
* `rag_sources` controls what to crawl:

  * `type` in `('web','gdrive')`
  * `url`/`sitemap`/`depth` for web
  * `gdrive_folder_id` for Drive
* Deletion policy: anything absent from the latest snapshot is removed

  * Optionally add a grace counter if you want to avoid deletes on transient failures

## Retrieval

Exposed via `RAG - Query` (if you add it) or directly with SQL:

```sql
select * from rag_search(
  query_embedding := '<vector here>'::vector,
  match_limit := 8,
  source_types := null
);
```

Return fields: `chunk_id, document_id, url, content, score`.

## Auditing

* Live view: `refresh materialized view rag_audit_v; select * from rag_audit_v limit 100;`
* Snapshot current state for history:

```sql
select rag_audit_snapshot(null, 'weekly');
```

* `RAG - Audit - Export CSV` can dump that snapshot to Drive/S3.

## Deleting and pruning

Handled in sub-workflows:

* Upsert new/changed chunks
* Delete removed chunks for the source
* Prune empty documents
* Optionally `VACUUM ANALYZE rag_chunks`

## CI tips

* Run `supabase db push` in CI for migrations
* Gate on `psql` smoke query: `select 1 from rag_sources limit 1;`
* Commit exported n8n JSON to `workflows/` and review diffs

---

## Common commands

```bash
# start local and apply schema + seed
make up && make db-reset

# add a migration
make migrate-new name=add_indexes

# record schema changes as a diff
make db-diff name=tune_ivf

# push to remote project
SUPABASE_PROJECT_REF=abcd123 make db-push

# seed remote
SUPABASE_DB_URL='postgres://...' make seed-remote
```
