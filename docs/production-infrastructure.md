# Production Infrastructure

## Prasyarat

- VPS dengan Docker dan Docker Compose
- Domain yang DNS-nya mengarah ke VPS
- Persistent volume untuk MySQL dan storage Laravel
- Redis, queue worker, scheduler, firewall, dan TLS certificate

## Environment separation

Gunakan `.env.production` di host deployment, tidak di repository. Pastikan `APP_ENV=production`, `APP_DEBUG=false`, `APP_URL` memakai domain HTTPS, dan semua key payment/shipping/WhatsApp hanya tersedia pada backend.

## Services

- Nginx menangani HTTPS dan reverse proxy.
- Backend Laravel menjalankan migration, queue worker, dan scheduler.
- Frontend Next.js berjalan sebagai service terpisah.
- MySQL/Redis memakai persistent volume dan tidak diekspos ke internet.

## Launch checks

1. Backup database sebelum deploy.
2. Build image dan jalankan `docker compose up -d --build`.
3. Jalankan `php artisan migrate --force`, `storage:link`, dan `optimize`.
4. Verifikasi health API, checkout, callback Midtrans, Biteship, dan WhatsApp.
5. Pastikan firewall hanya membuka 80/443/SSH terbatas serta renewal SSL berjalan.
