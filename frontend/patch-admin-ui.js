const fs = require('fs');
let content = fs.readFileSync('src/app/admin/page.jsx', 'utf8');

const oldMetrics = 'const metrics=[["🧾","Total Pesanan",kpi.orders,"/admin/pesanan"],["👥","Pelanggan Aktif",kpi.customers,"/admin/pelanggan"],["💰","Pendapatan",money(kpi.revenue),"/admin/keuangan"],["⏳","Menunggu Bayar",kpi.pending_payment,"/admin/pesanan"]];';
const newMetrics = 'const metrics=[["🧾","Total Pesanan",kpi.orders,"/admin/pesanan"],["👥","Pelanggan Aktif",kpi.customers,"/admin/pelanggan"],["💰","Pendapatan",money(kpi.revenue),"/admin/keuangan"],["⏳","Menunggu Bayar",kpi.pending_payment,"/admin/pesanan"],["👁️","Pengunjung Hari Ini",kpi.visitors_today || 0,"#"]];';

const oldGrid = 'className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"';
const newGrid = 'className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5"';

content = content.replace(oldMetrics, newMetrics);
content = content.replace(oldGrid, newGrid);

fs.writeFileSync('src/app/admin/page.jsx', content);
