const fs = require('fs');
let content = fs.readFileSync('src/app/admin/page.jsx', 'utf8');

const oldReturn = 'const visitorsWidget = <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur-sm border border-white/20 text-center"><p className="text-xs font-semibold text-blue-100 uppercase tracking-wider">👁️ Pengunjung Hari Ini</p><p className="mt-1 text-3xl font-black text-white">{kpi.visitors_today || 0}</p></div>;';
const newReturn = 'const visitorsWidget = <Link href="/admin/statistik" className="block rounded-2xl bg-white/10 px-5 py-4 backdrop-blur-sm border border-white/20 text-center transition hover:bg-white/20 hover:scale-105"><p className="text-xs font-semibold text-blue-100 uppercase tracking-wider">👁️ Pengunjung Hari Ini</p><p className="mt-1 text-3xl font-black text-white">{kpi.visitors_today || 0}</p></Link>;';

content = content.replace(oldReturn, newReturn);
fs.writeFileSync('src/app/admin/page.jsx', content);
