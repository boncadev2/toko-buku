"use client";

/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { api } from "../lib/api";

const menu = [
  ["/admin", "▦", "Dashboard"],
  ["/admin/pesanan", "▣", "Pesanan"],
  ["/admin/produk", "▤", "Produk"],
  ["/admin/inventori", "◫", "Inventori"],
  ["/admin/pelanggan", "◉", "Pelanggan"],
  ["/admin/keuangan", "◈", "Keuangan"],
  ["/admin/pengaturan", "⚙", "Pengaturan"],
];

export function adminHeaders() {
  const token = typeof window === "undefined" ? "" : localStorage.getItem("token");
  return { Accept: "application/json", Authorization: `Bearer ${token}` };
}

export default function AdminShell({ title, description, children }) {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [site, setSite] = useState({ app_name: "BukuPagi", app_logo: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { window.location.href = "/auth/login"; return; }
    api("/auth/me", { headers: adminHeaders() }).then((payload) => {
      if (!payload.data?.is_admin) window.location.href = "/akun";
      else setUser(payload.data);
    }).catch(() => {
      localStorage.removeItem("token");
      window.location.href = "/auth/login";
    });
  }, []);

  useEffect(() => { api("/settings").then((payload) => setSite((old) => ({ ...old, ...payload.data }))).catch(() => null); }, []);

  const logout = () => setLogoutOpen(true);
  const confirmLogout = () => { localStorage.removeItem("token"); window.location.href = "/"; };

  return <main className="flex min-h-screen flex-col bg-[#f4f7fb] text-slate-800">
    <header className="sticky top-0 z-40 border-b border-blue-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4">
        <a href="/" className="flex items-center gap-3">{site.app_logo ? <img src={site.app_logo} alt={site.app_name} className="h-10 w-10 rounded-xl object-contain"/> : <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-700 text-lg text-white">📚</span>}<span><b className="block text-lg leading-none text-blue-950">{site.app_name || "BukuPagi"}</b><small className="text-[10px] font-bold uppercase tracking-widest text-blue-500">Toko buku online</small></span></a>
        <div className="flex items-center gap-2"><div className="relative hidden lg:block"><button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-3 rounded-full border border-blue-200 bg-white py-1.5 pl-3 pr-2"><span className="text-right text-sm"><b className="block">{user?.name || "Administrator"}</b><small className="text-slate-500">{user?.email || "Akun admin"}</small></span><span className="grid h-10 w-10 place-items-center rounded-full bg-blue-100 font-black text-blue-700">{user?.name?.slice(0, 1).toUpperCase() || "A"}</span><span className="pr-1 text-slate-500">⌄</span></button>{profileOpen && <div className="absolute right-0 top-14 z-50 w-48 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"><button onClick={logout} className="w-full rounded-xl px-3 py-3 text-left text-sm font-bold text-red-600 hover:bg-red-50">↪ Keluar</button></div>}</div><button onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center rounded-xl bg-blue-900 text-2xl text-white shadow-lg lg:hidden">☰</button></div>
      </div>
      {open && <nav className="grid gap-1 border-t bg-white p-3 lg:hidden">{menu.map(([href, icon, label]) => <a key={href} href={href} className={`rounded-xl px-4 py-3 text-sm font-bold ${pathname === href ? "bg-blue-700 text-white" : "text-slate-600"}`}>{icon} {label}</a>)}<button onClick={logout} className="rounded-xl px-4 py-3 text-left text-sm font-bold text-red-600">↪ Keluar</button></nav>}
    </header>

    <div className="mx-auto grid w-full max-w-[1440px] flex-1 gap-6 px-4 py-6 sm:px-5 lg:grid-cols-[240px_1fr]">
      <aside className="hidden h-fit rounded-3xl bg-slate-950 p-4 text-white shadow-xl lg:block"><p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[.2em] text-slate-400">Operasional</p><nav className="space-y-1">{menu.map(([href, icon, label]) => <a key={href} href={href} className={`block rounded-xl px-3 py-3 text-sm font-bold ${pathname === href ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-white/10"}`}>{icon} {label}</a>)}</nav><a href="/" className="mt-7 block rounded-xl border border-white/10 px-3 py-3 text-sm text-slate-300">← Lihat toko</a></aside>
      <section className="min-w-0"><div className="rounded-3xl bg-gradient-to-r from-blue-800 to-indigo-700 p-6 text-white shadow-lg sm:p-7"><p className="text-sm font-semibold text-blue-100">BukuPagi Admin</p><h1 className="mt-1 text-2xl font-black sm:text-3xl">{title}</h1><p className="mt-2 text-sm text-blue-100">{description}</p></div>{children}</section>
    </div>

    {logoutOpen && <div className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/55 p-4 backdrop-blur-sm"><section role="dialog" aria-modal="true" aria-labelledby="logout-title" className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl"><span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-red-50 text-2xl">↪</span><h2 id="logout-title" className="mt-5 text-xl font-black text-slate-900">Keluar dari akun?</h2><p className="mt-2 text-sm leading-6 text-slate-500">Sesi admin akan diakhiri dan Anda akan kembali ke halaman utama.</p><div className="mt-6 grid grid-cols-2 gap-3"><button onClick={() => setLogoutOpen(false)} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50">Batal</button><button onClick={confirmLogout} className="rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white hover:bg-red-700">Ya, Keluar</button></div></section></div>}

    <footer className="mt-8 border-t border-blue-100 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-6 text-sm text-slate-500">
        <span>© 2026 BukuPagi. Semua hak dilindungi.</span>
        <div className="flex gap-4"><a href="/info/tentang" className="hover:text-blue-700">Tentang</a><a href="/info/kontak" className="hover:text-blue-700">Bantuan</a><a href="/info/pengiriman" className="hover:text-blue-700">Pengiriman</a></div>
      </div>
    </footer>
  </main>;
}

export function Loading() { return <div className="mt-6 rounded-3xl bg-white p-10 text-center text-sm text-slate-500">Memuat data…</div>; }
export function ErrorBox({ message }) { return <div className="mt-6 rounded-3xl border border-rose-200 bg-rose-50 p-6 text-sm font-semibold text-rose-700">{message}</div>; }
export const money = (value) => `Rp${Number(value || 0).toLocaleString("id-ID")}`;
