# Toko Buku Online

Fondasi monorepo untuk toko buku online. Phase 1 menyediakan Laravel 12 REST API, Next.js, MySQL 8, Redis, Nginx 1.29 Alpine, dan Mailpit.

## Menjalankan

```bash
sh scripts/setup.sh
# Isi MYSQL_PASSWORD dan MYSQL_ROOT_PASSWORD pada .env.
docker compose up --build
```

- Storefront: http://localhost:8080
- Health API: http://localhost:8080/api/health
- Mailpit: http://localhost:8025

Jalankan pengujian backend dengan:

```bash
docker compose exec -T \
  -e APP_ENV=testing \
  -e DB_CONNECTION=sqlite \
  -e DB_DATABASE=:memory: \
  -e CACHE_STORE=array \
  -e SESSION_DRIVER=array \
  -e QUEUE_CONNECTION=sync \
  -e MAIL_MAILER=array \
  backend php artisan test
```
