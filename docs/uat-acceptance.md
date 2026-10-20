# UAT Acceptance Testing

Gunakan environment UAT terpisah dengan data dummy realistis. Catat hasil sebagai PASS atau FAIL, bukti, severity, dan owner tindak lanjut.

| Peran | Skenario | Hasil yang diharapkan |
| --- | --- | --- |
| Guest | Cari buku, tambah cart, checkout | Harga/stok tervalidasi dan order pending payment dibuat |
| Customer | Login, merge cart, lihat histori | Cart tergabung dan data milik customer saja yang terlihat |
| Admin | Kelola buku dan order | Hanya permission yang sesuai dapat melakukan aksi |
| Warehouse | Lihat order dan stok rendah | Data stok serta movement akurat |
| Finance | Lihat laporan finance | Gross/net sales, refund, dan expense konsisten |
| Customer Service | Ubah status order | Histori status tercatat |
| Owner | Dashboard KPI | KPI sesuai data UAT |

## Klasifikasi defect

- Critical: checkout/payment/data loss/security breach
- High: fitur inti tidak dapat digunakan
- Medium: hasil salah dengan workaround
- Low: UI, copy, atau ketidaknyamanan minor

Jangan gunakan data pelanggan asli atau credential production di UAT.
