# Performance and Load Testing

## Baseline endpoints

- `GET /api/health`
- `GET /api/books?per_page=12`
- `GET /api/search?search=buku`
- `POST /api/checkout/preview`
- `POST /api/checkout` dengan cart dan stok terbatas

## Scenario

1. Jalankan 20–50 virtual users untuk katalog/search.
2. Jalankan concurrent checkout pada buku stok rendah.
3. Catat p50/p95 latency, HTTP 5xx, error database, CPU/RAM, Redis, dan slow query.
4. Pastikan hanya satu checkout sukses ketika quantity bersaing terhadap stok terakhir.

## Gate

Jangan gunakan production payment atau data customer asli. Jalankan di staging/UAT dan lakukan backup database sebelum test write endpoint.
