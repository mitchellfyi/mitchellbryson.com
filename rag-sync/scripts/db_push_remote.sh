#!/usr/bin/env bash
set -euo pipefail
: "${SUPABASE_PROJECT_REF:?Set SUPABASE_PROJECT_REF}"
supabase db push --project-ref "$SUPABASE_PROJECT_REF"
