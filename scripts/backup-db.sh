#!/usr/bin/env sh
set -eu

backup_dir="${1:-./backups}"
timestamp="$(date +%Y%m%d-%H%M%S)"
mkdir -p "$backup_dir"

docker compose exec -T mysql sh -c 'mysqldump -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE"' > "$backup_dir/toko-buku-$timestamp.sql"
echo "Backup dibuat: $backup_dir/toko-buku-$timestamp.sql"
