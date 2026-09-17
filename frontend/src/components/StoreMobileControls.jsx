"use client";

/* eslint-disable @next/next/no-html-link-for-pages */

import { useEffect, useState } from "react";

export default function StoreMobileControls({ user, cartCount = 0, onLogout }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const elements = document.querySelectorAll('header > div > a[aria-label="Keranjang belanja"], header > div > a[href="/auth/login"], header > div > a[href="/auth/register"], header > div > div.relative');
    elements.forEach((element) => element.classList.add("max-lg:hidden"));
    return () => elements.forEach((element) => element.classList.remove("max-lg:hidden"));
  }, []);
  return <div className="lg:hidden"><button onClick={() => setOpen(!open)} className="fixed right-4 top-4 z-50 grid h-10 w-10 place-items-center rounded-xl border border-stone-200 bg-[#fffdf8] text-xl shadow-sm" aria-label="Buka menu">☰</button><a href="/keranjang" className="fixed bottom-52 right-4 z-40 grid h-12 w-12 place-items-center rounded-full bg-blue-700 text-xl text-white shadow-lg" aria-label="Keranjang belanja">🛒<span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-black">{cartCount}</span></a>{open && <div className="fixed left-0 right-0 top-[73px] z-50 border-t border-stone-200 bg-[#fffdf8] px-4 py-4 shadow-xl"><nav className="grid gap-3 text-sm font-bold text-stone-700"><a href="/">Beranda</a><a href="/#kategori">Kategori</a><a href="/#terbaru">Buku Baru</a><a href="/#promo">Promo</a><div className="my-1 border-t border-stone-200"/>{user ? <><a href={user.is_admin ? "/admin" : "/akun"} className="rounded-xl px-3 py-2 hover:bg-blue-50">👤 Akun Saya</a><button onClick={onLogout} className="rounded-xl px-3 py-2 text-left text-red-600 hover:bg-red-50">↪ Keluar</button></> : <div className="grid grid-cols-2 gap-2"><a href="/auth/login" className="rounded-xl border bg-white px-3 py-2.5 text-center">Masuk</a><a href="/auth/register" className="rounded-xl bg-stone-950 px-3 py-2.5 text-center text-white">Daftar</a></div>}</nav></div>}</div>;
}
