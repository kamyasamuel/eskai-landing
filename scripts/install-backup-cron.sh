#!/usr/bin/env bash
# Installs a daily 04:30 cron entry for the landing database backup (idempotent).
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# /var/log is not writable as this user, and a failed redirect means cron never
# runs the command at all. Log somewhere the user owns.
LOG_DIR="${ESKAI_LOG_DIR:-$HOME/.eskai/logs}"
mkdir -p "$LOG_DIR"
ENTRY="30 4 * * * $REPO_DIR/scripts/backup-db.sh >> $LOG_DIR/eskai-landing-backup.log 2>&1"

chmod +x "$REPO_DIR/scripts/backup-db.sh"
( crontab -l 2>/dev/null | grep -v 'scripts/backup-db.sh' ; echo "$ENTRY" ) | crontab -
echo "installed cron: $ENTRY"
