"use client";

export default function LogoutConfirmModal({ open, onCancel, onConfirm, role = "pelanggan" }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/55 p-4 backdrop-blur-sm"><button aria-label="Tutup konfirmasi keluar" onClick={onCancel} className="absolute inset-0"/><section role="dialog" aria-modal="true" aria-labelledby="customer-logout-title" className="relative w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl"><span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-red-50 text-2xl">↪</span><h2 id="customer-logout-title" className="mt-5 text-xl font-black text-slate-900">Keluar dari akun?</h2><p className="mt-2 text-sm leading-6 text-slate-500">Sesi {role} akan diakhiri dan Anda akan kembali ke halaman utama.</p><div className="mt-6 grid grid-cols-2 gap-3"><button onClick={onCancel} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50">Batal</button><button onClick={onConfirm} className="rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white hover:bg-red-700">Ya, Keluar</button></div></section></div>;
}
