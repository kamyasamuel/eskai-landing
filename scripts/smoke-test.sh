#!/usr/bin/env bash
# Post-deploy smoke test. Asserts the security and submission invariants that
# were previously broken. Usage:
#   scripts/smoke-test.sh [base_url]
# Set ESKAI_SITE_API_KEY to also test authenticated reads.
set -uo pipefail

BASE="${1:-http://localhost:8080}"
KEY="${ESKAI_SITE_API_KEY:-}"
pass=0; fail=0

ck() {
  if [ "$2" = "$3" ]; then echo "PASS  $1"; pass=$((pass+1));
  else echo "FAIL  $1 (want $2, got $3)"; fail=$((fail+1)); fi
}
c() { curl -s -o /dev/null -w '%{http_code}' "$@"; }

echo "Smoke testing $BASE"
echo

echo "-- authentication --"
ck "legacy applications GET requires auth" 401 "$(c "$BASE/api/applications")"
ck "v1 applications requires auth" 401 "$(c "$BASE/api/v1/applications")"
ck "v1 stats requires auth" 401 "$(c "$BASE/api/v1/stats")"
ck "v1 analytics requires auth" 401 "$(c "$BASE/api/v1/analytics")"
ck "v1 export requires auth" 401 "$(c "$BASE/api/v1/export")"
ck "seed requires a token" 401 "$(c -X POST -H 'Content-Type: application/json' -d '{}' "$BASE/api/seed")"
ck "login seed path is gone" 405 "$(c -X PUT "$BASE/api/auth/login?seed=1" -H 'Content-Type: application/json' -d '{}')"

echo
echo "-- submission --"
ck "incomplete submission rejected" 400 "$(c -X POST -H 'Content-Type: application/json' -d '{"fullName":"Smoke","email":"smoke@example.com","role":"Tester"}' "$BASE/api/applications")"

echo
echo "-- seo --"
ck "robots.txt served" 200 "$(c "$BASE/robots.txt")"
ck "sitemap.xml served" 200 "$(c "$BASE/sitemap.xml")"

if [ -n "$KEY" ]; then
  echo
  echo "-- authenticated reads --"
  ck "v1 applications with key" 200 "$(c -H "Authorization: Bearer $KEY" "$BASE/api/v1/applications")"
  ck "v1 stats with key" 200 "$(c -H "Authorization: Bearer $KEY" "$BASE/api/v1/stats")"
fi

echo
echo "passed=$pass failed=$fail"
[ "$fail" -eq 0 ]
