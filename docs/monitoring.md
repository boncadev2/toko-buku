# Monitoring Operasional

Pantau health endpoint `/api/health`, CPU/RAM/disk host, status container Docker, MySQL, Redis, Nginx, dan latency HTTP.

## Alert penting

- HTTP 5xx meningkat atau health check gagal
- Laravel error log meningkat
- Queue gagal atau backlog bertambah
- Payment webhook gagal/divalidasi ulang
- Disk hampir penuh atau backup gagal
- Database connection error atau query lambat

## Pemeriksaan cepat

```sh
docker compose ps
docker compose logs --tail=200 backend
docker compose exec backend php artisan queue:failed
curl -f http://localhost:8080/api/health
```

Simpan alert ke channel operasional dan gunakan escalation jika payment/order gagal.
