"use client";
import { useEffect, useState } from "react";
import AdminShell, { adminHeaders, ErrorBox, Loading } from "../../../components/AdminShell";
import { api } from "../../../lib/api";

export default function AdminStatistik() {
  const [data, setData] = useState(null), [error, setError] = useState("");
  
  useEffect(() => {
    api("/admin/visitors", { headers: adminHeaders() })
      .then(r => setData(r.data))
      .catch(() => setError("Gagal memuat statistik pengunjung. Pastikan Anda sudah menjalankan php artisan migrate."));
  }, []);

  if (error) return <AdminShell title="Statistik Pengunjung" description="Laporan kunjungan toko."><ErrorBox message={error}/></AdminShell>;
  if (!data) return <AdminShell title="Statistik Pengunjung" description="Laporan kunjungan toko."><Loading/></AdminShell>;

  const diffDaily = data.today - data.yesterday;
  const diffDailyPercent = data.yesterday > 0 ? ((diffDaily / data.yesterday) * 100).toFixed(1) : (data.today > 0 ? 100 : 0);
  
  const diffMonthly = data.this_month - data.last_month;
  const diffMonthlyPercent = data.last_month > 0 ? ((diffMonthly / data.last_month) * 100).toFixed(1) : (data.this_month > 0 ? 100 : 0);

  return (
    <AdminShell title="Statistik Pengunjung" description="Laporan kunjungan toko harian dan bulanan.">
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Hari Ini vs Kemarin</p>
          <div className="mt-4 flex items-end gap-4">
            <h3 className="text-5xl font-black text-slate-900">{data.today}</h3>
            <div className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-bold ${diffDaily >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
              {diffDaily >= 0 ? '↑' : '↓'} {Math.abs(diffDailyPercent)}%
            </div>
          </div>
          <p className="mt-2 text-sm text-slate-500">Kemarin: <b className="text-slate-700">{data.yesterday}</b> pengunjung</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Bulan Ini vs Bulan Lalu</p>
          <div className="mt-4 flex items-end gap-4">
            <h3 className="text-5xl font-black text-slate-900">{data.this_month}</h3>
            <div className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-bold ${diffMonthly >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
              {diffMonthly >= 0 ? '↑' : '↓'} {Math.abs(diffMonthlyPercent)}%
            </div>
          </div>
          <p className="mt-2 text-sm text-slate-500">Bulan Lalu: <b className="text-slate-700">{data.last_month}</b> pengunjung</p>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-black text-slate-900">Riwayat 30 Hari Terakhir</h3>
        <div className="mt-6 flex h-64 items-end gap-2 overflow-x-auto border-b border-slate-100 pb-2">
          {data.chart && data.chart.length > 0 ? data.chart.map((c, i) => {
            const max = Math.max(...data.chart.map(x => x.total));
            const height = max > 0 ? (c.total / max) * 100 : 0;
            return (
              <div key={i} className="group relative flex flex-1 flex-col justify-end min-w-[20px] h-full">
                <div 
                  className="w-full rounded-t-md bg-blue-100 transition-all group-hover:bg-blue-600" 
                  style={{ height: `${height}%`, minHeight: '4px' }}
                ></div>
                <div className="absolute -top-10 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-slate-900 px-2 py-1 text-xs text-white group-hover:block z-10">
                  {new Date(c.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'short'})}: {c.total}
                </div>
              </div>
            );
          }) : (
            <div className="w-full text-center text-slate-400 py-20 flex flex-col items-center justify-center">Belum ada data yang cukup untuk menampilkan grafik.</div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
