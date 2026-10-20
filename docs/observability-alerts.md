# Observability and Alerts

## Alert thresholds

- Health check gagal: segera alert
- HTTP 5xx > 1% selama 5 menit: high
- Queue failed job > 0: high
- Payment webhook gagal: critical
- p95 API > 2 detik selama 10 menit: medium
- CPU/RAM > 85% atau disk > 80%: high
- SSL berlaku kurang dari 14 hari: medium
- Storage upload gagal atau DB connection error: high

## Runbook ringkas

1. Cek health endpoint dan `docker compose ps`.
2. Periksa Laravel log serta failed queue.
3. Korelasikan error dengan deploy, webhook, atau database latency.
4. Jika checkout/payment terdampak, hentikan perubahan non-kritis dan lakukan rollback sesuai runbook.
5. Catat insiden, dampak, tindakan, dan follow-up.
