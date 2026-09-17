"use client";

import { useState } from "react";

export default function AccountMobileMenu({ active = "" }) {
  const [open, setOpen] = useState(false);
  const links = [["dashboard", "/akun", "▦", "Dashboard"], ["profile", "/akun/profil", "👤", "Profil"], ["orders", "/akun/pesanan", "▣", "Pesanan saya"], ["shop", "/", "⌂", "Kembali berbelanja"]];
  return <><button onClick={() => setOpen(true)} aria-label="Buka menu akun" className="grid h-11 w-11 place-items-center rounded-xl bg-blue-900 text-2xl text-white shadow-lg lg:hidden">☰</button>{open && <div className="fixed inset-0 z-50 lg:hidden"><button aria-label="Tutup menu" onClick={() => setOpen(false)} className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm"/><aside className="relative h-full w-[82%] max-w-[300px] bg-gradient-to-b from-blue-950 to-blue-800 p-5 text-white shadow-2xl"><div className="mb-7 flex items-center justify-between"><b className="text-lg">Menu Akun</b><button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-xl">×</button></div><nav className="space-y-1">{links.map(([key, href, icon, label]) => <a key={key} href={href} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm ${active === key ? "bg-white/15 font-bold text-white" : "text-blue-100 hover:bg-white/10"}`}>{icon} {label}</a>)}</nav></aside></div>}</>;
}
