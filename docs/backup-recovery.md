# Backup dan Recovery Database

## Backup

Jalankan dari root project:

```sh
sh scripts/backup-db.sh
```

Simpan hasil `.sql` ke storage offsite terenkripsi. Jalankan backup database harian dan full backup mingguan, lalu terapkan retention sesuai kebijakan operasional.

## Restore

Pastikan nama file backup sudah diverifikasi. Restore akan menulis ulang database target.

```sh
docker compose exec -T mysql sh -c 'mysql -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE"' < backups/toko-buku-YYYYMMDD-HHMMSS.sql
```

Skrip ekuivalen tersedia di `scripts/restore-db.sh`. Gunakan hanya pada environment restore yang terpisah atau setelah konfirmasi target database.

## Restore Test

Lakukan secara berkala pada environment non-production:

1. Buat database kosong khusus test restore.
2. Restore file backup ke database tersebut.
3. Jalankan `php artisan migrate:status` dan smoke test API health/cart/order.
4. Catat waktu restore, ukuran backup, dan hasil verifikasi.
