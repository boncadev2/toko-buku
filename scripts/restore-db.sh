#!/usr/bin/env sh
set -eu

backup_file="${1:?Gunakan: sh scripts/restore-db.sh path/backup.sql}"
test -f "$backup_file"
echo "PERINGATAN: restore akan menimpa database target."
docker compose exec -T mysql sh -c 'mysql -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE"' < "$backup_file"
echo "Restore selesai. Jalankan smoke test API dan migration status."
