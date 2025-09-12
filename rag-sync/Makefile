# Load .env into Make and export to shell
ifneq (,$(wildcard .env))
include .env
export
endif

PROJECT_REF ?= $(SUPABASE_PROJECT_REF)
ENV ?= dev

init:
	@supabase init

up:
	@supabase start

migrate-new:
	@test "$(name)" != "" || (echo "Usage: make migrate-new name=add_x"; exit 1)
	@supabase migration new "$(name)"

db-reset:
	@supabase db reset

db-diff:
	@test "$(name)" != "" || (echo "Usage: make db-diff name=diff_x"; exit 1)
	@supabase db diff -f $(shell date +%Y%m%d_%H%M%S)_$(name).sql

db-push:
	@test "$(SUPABASE_DB_URL)" != "" || (echo "Set SUPABASE_DB_URL or pass SUPABASE_DB_URL=..."; exit 1)
	@supabase db push --db-url $(SUPABASE_DB_URL)

seed-remote:
	@test "$(SUPABASE_DB_URL)" != "" || (echo "Set SUPABASE_DB_URL in .env"; exit 1)
	@./scripts/seed_remote.sh
