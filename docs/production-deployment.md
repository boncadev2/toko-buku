# Production Deployment

1. Isi `.env` production dengan secret baru, `APP_ENV=production`, `APP_DEBUG=false`, domain HTTPS, database, Redis, mail, dan provider payment/shipping.
2. Jalankan `docker compose up -d --build`.
3. Jalankan `docker compose exec backend php artisan migrate --force`.
4. Jalankan `docker compose exec backend php artisan storage:link` dan `php artisan optimize`.
5. Konfigurasikan reverse proxy/Nginx dengan TLS certificate, redirect HTTP ke HTTPS, serta security headers.
6. Jalankan queue worker dan scheduler sebagai service terpisah; pantau failed jobs.
7. Verifikasi `/api/health`, storefront, upload storage, Mailpit diganti mail provider, dan log rotation.

Jangan commit `.env`, credential payment, database password, atau private key.
