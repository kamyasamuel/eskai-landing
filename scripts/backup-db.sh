#!/usr/bin/env bash
# Consistent, rotating backup of the Eskai landing SQLite database.
# Installed via cron: see scripts/install-backup-cron.sh
set -euo pipefail

# Cron runs with a minimal environment; be explicit about where the tools live.
export PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

CONTAINER="${ESKAI_CONTAINER:-eskai-landing-landing-1}"
BACKUP_DIR="${ESKAI_BACKUP_DIR:-/home/admin/eskai-landing/backups}"
RETENTION_DAYS="${ESKAI_BACKUP_RETENTION_DAYS:-30}"
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STAMP="$(date +%Y-%m-%d-%H%M%S)"

mkdir -p "$BACKUP_DIR"

if ! docker ps --format '{{.Names}}' | grep -qx "$CONTAINER"; then
  echo "backup: container $CONTAINER is not running" >&2
  exit 1
fi

# 1. Consistent snapshot inside the container
docker exec -i "$CONTAINER" node - /tmp/eskai-backup.db < "$REPO_DIR/scripts/backup-sqlite.js" >/dev/null

# 2. Copy it out and compress
docker cp "$CONTAINER:/tmp/eskai-backup.db" "$BACKUP_DIR/eskai-$STAMP.db"
docker exec "$CONTAINER" rm -f /tmp/eskai-backup.db
gzip -f "$BACKUP_DIR/eskai-$STAMP.db"

# 3. Verify the archive is readable and rotate old copies
gzip -t "$BACKUP_DIR/eskai-$STAMP.db.gz"
find "$BACKUP_DIR" -name 'eskai-*.db.gz' -type f -mtime "+$RETENTION_DAYS" -delete

echo "backup: $BACKUP_DIR/eskai-$STAMP.db.gz ($(du -h "$BACKUP_DIR/eskai-$STAMP.db.gz" | cut -f1))"
