const fs = require('fs');
let content = fs.readFileSync('src/app/admin/page.jsx', 'utf8');

const oldMetrics = 'const metrics=[["🧾","Total Pesanan",kpi.orders,"/admin/pesanan"],["👥","Pelanggan Aktif",kpi.customers,"/admin/pelanggan"],["💰","Pendapatan",money(kpi.revenue),"/admin/keuangan"],["⏳","Menunggu Bayar",kpi.pending_payment,"/admin/pesanan"],["👁️","Pengunjung Hari Ini",kpi.visitors_today || 0,"#"]];';
const newMetrics = 'const metrics=[["🧾","Total Pesanan",kpi.orders,"/admin/pesanan"],["👥","Pelanggan Aktif",kpi.customers,"/admin/pelanggan"],["💰","Pendapatan",money(kpi.revenue),"/admin/keuangan"],["⏳","Menunggu Bayar",kpi.pending_payment,"/admin/pesanan"]];';

const oldGrid = 'className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5"';
const newGrid = 'className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"';

content = content.replace(oldMetrics, newMetrics);
content = content.replace(oldGrid, newGrid);

const oldReturn = 'return <AdminShell title="Dashboard Admin" description="Pantau penjualan, stok, pesanan, dan pelanggan toko.">';
const newReturn = 'const visitorsWidget = <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur-sm border border-white/20 text-center"><p className="text-xs font-semibold text-blue-100 uppercase tracking-wider">👁️ Pengunjung Hari Ini</p><p className="mt-1 text-3xl font-black text-white">{kpi.visitors_today || 0}</p></div>;\n  return <AdminShell title="Dashboard Admin" description="Pantau penjualan, stok, pesanan, dan pelanggan toko." headerRight={visitorsWidget}>';

content = content.replace(oldReturn, newReturn);

fs.writeFileSync('src/app/admin/page.jsx', content);
