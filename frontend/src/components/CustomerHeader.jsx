"use client";

/* eslint-disable @next/next/no-html-link-for-pages */
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "../lib/api";
import LogoutConfirmModal from "./LogoutConfirmModal";

const links = [
  ["dashboard", "/akun", "▦", "Dashboard"],
  ["profile", "/akun/profil", "👤", "Profil"],
  ["orders", "/akun/pesanan", "▣", "Pesanan saya"],
  ["shop", "/", "⌂", "Kembali berbelanja"],
];

export default function CustomerHeader({ user: suppliedUser = null, active = "" }) {
  const [fetchedUser, setFetchedUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [settings, setSettings] = useState(() => { try { return typeof window !== "undefined" ? JSON.parse(localStorage.getItem("app_settings") || "{}") : {}; } catch { return {}; } });
  const [logoutOpen, setLogoutOpen] = useState(false);

  useEffect(() => {
    if (suppliedUser) return;
    const token = localStorage.getItem("token");
    if (!token) return;
    api("/settings").then((response) => ((d) => { localStorage.setItem("app_settings", JSON.stringify(typeof d === "function" ? d(settings) : d)); setSettings(d); })(response.data || {})).catch(() => null);
    api("/auth/me", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => setFetchedUser(response.data)).catch(() => null);
  }, [suppliedUser]);

  const user = suppliedUser || fetchedUser;
  const firstName = user?.name?.split(" ")[0] || "Pelanggan";
  const confirmLogout = () => { localStorage.removeItem("token"); window.location.href = "/"; };

  const appName = settings.app_name || "";
  const appLogo = settings.app_logo;
  return <>
    <header className="sticky top-0 z-40 border-b border-blue-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-3">{appLogo ? <img src={appLogo} alt={appName} className="h-10 w-10 rounded-xl object-contain" /> : <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-700 text-lg text-white">{(appName || " ")[0].toUpperCase()}</span>}<span><b className="block text-lg leading-none text-blue-950">{appName}</b><small className="text-[10px] font-bold uppercase tracking-widest text-blue-500">Toko buku online</small></span></Link>
        {user ? <div className="flex items-center"><button onClick={() => setMenuOpen(true)} aria-label="Buka menu akun" className="grid h-11 w-11 place-items-center rounded-xl bg-blue-900 text-2xl text-white shadow-lg lg:hidden">☰</button><div className="relative hidden lg:block"><button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-3 rounded-full border border-blue-200 bg-white py-1.5 pl-2 pr-3"><span className="text-right text-sm"><b className="block">{user.name}</b><small className="text-slate-500">{user.email}</small></span><span className="grid h-10 w-10 place-items-center rounded-full bg-blue-100 font-black text-blue-700">{firstName.slice(0, 1)}</span><span className="text-slate-500">⌄</span></button>{profileOpen && <div className="absolute right-0 top-14 z-50 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"><Link href="/akun" className="block rounded-xl px-3 py-3 text-sm font-semibold hover:bg-blue-50">👤 Akun Saya</Link><Link href="/akun/pesanan" className="block rounded-xl px-3 py-3 text-sm font-semibold hover:bg-blue-50">📦 Pesanan Saya</Link><button onClick={() => setLogoutOpen(true)} className="w-full rounded-xl px-3 py-3 text-left text-sm font-bold text-red-600 hover:bg-red-50">↪ Keluar</button></div>}</div></div> : <div className="flex items-center gap-2"><Link href="/auth/login" className="text-sm font-bold text-blue-700">Masuk</Link><Link href="/auth/register" className="rounded-xl bg-blue-900 px-4 py-2.5 text-sm font-bold text-white">Daftar</Link></div>}
      </div>
    </header>

    {menuOpen && <div className="fixed inset-0 z-[80] lg:hidden"><button aria-label="Tutup menu" onClick={() => setMenuOpen(false)} className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm"/><aside className="relative flex h-full w-[82%] max-w-[300px] flex-col bg-gradient-to-b from-blue-950 to-blue-800 p-5 text-white shadow-2xl"><div className="mb-7 flex items-center justify-between"><div><b className="block text-lg">Menu Akun</b><small className="text-blue-200">{user?.name}</small></div><button onClick={() => setMenuOpen(false)} aria-label="Tutup" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-xl">×</button></div><nav className="space-y-1">{links.map(([key, href, icon, label]) => <Link key={key} href={href} onClick={() => setMenuOpen(false)} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm ${active === key ? "bg-white/15 font-bold text-white" : "text-blue-100 hover:bg-white/10"}`}>{icon}<span>{label}</span></Link>)}</nav><div className="mt-auto border-t border-white/15 pt-4"><button onClick={() => { setMenuOpen(false); setLogoutOpen(true); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold text-red-200 hover:bg-white/10">↪ <span>Keluar</span></button></div></aside></div>}

    <LogoutConfirmModal open={logoutOpen} onCancel={() => setLogoutOpen(false)} onConfirm={confirmLogout}/>
  </>;
}
