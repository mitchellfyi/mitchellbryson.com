#!/usr/bin/env bash
set -euo pipefail
: "${SUPABASE_DB_URL:?Set SUPABASE_DB_URL to your remote Postgres connection string}"
psql "$SUPABASE_DB_URL" -f supabase/seed/000_base_sources.sql
