"use client";

/* eslint-disable @next/next/no-html-link-for-pages */
import { useEffect, useState } from "react";
import StoreMobileControls from "./StoreMobileControls";

export default function StoreFooter() {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [settings, setSettings] = useState({ store_address: "" });
  useEffect(() => { try { const c = JSON.parse(localStorage.getItem("app_settings") || "{}"); setSettings(prev => ({ ...prev, ...c })); } catch {} }, []);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
    const token = localStorage.getItem("token"), guest = localStorage.getItem("cart_token");
    const headers = { Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(guest ? { "X-Cart-Token": guest } : {}) };
    if (token) fetch(`${base}/auth/me`, { headers }).then((response) => response.ok ? response.json() : null).then((payload) => setUser(payload?.data || null));
    fetch(`${base}/cart`, { headers }).then((response) => response.ok ? response.json() : null).then((payload) => setCartCount((payload?.data?.items || []).reduce((sum, item) => sum + Number(item.quantity || 0), 0)));
    fetch(`${base}/settings`, { headers: { Accept: "application/json" } }).then((response) => response.ok ? response.json() : null).then((payload) => ((d) => { localStorage.setItem("app_settings", JSON.stringify(typeof d === "function" ? d(settings) : d)); setSettings(d); })((old) => ({ ...old, ...(payload?.data || {}) }))).catch(() => null);
  }, []);

  const logout = () => { localStorage.removeItem("token"); window.location.href = "/"; };
  const appName = settings.app_name || "";
  const appLogo = settings.app_logo;
  return <><StoreMobileControls user={user} cartCount={cartCount} onLogout={logout}/><footer><section className="border-b border-stone-200 bg-blue-100"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-4 py-10 sm:px-6 md:flex-row md:items-center lg:px-8"><div><p className="text-xl font-black text-stone-950">Jangan sampai kehabisan cerita bagus.</p><p className="mt-1 text-sm text-stone-600">Dapatkan kabar koleksi dan promo pilihan setiap minggu.</p></div><form className="flex w-full max-w-md gap-2" onSubmit={(event) => event.preventDefault()}><input className="min-w-0 flex-1 rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm" type="email" placeholder="Email kamu"/><button className="rounded-xl bg-stone-950 px-4 py-3 text-sm font-bold text-white">Berlangganan</button></form></div></section><div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8"><div><div className="flex items-center gap-2 font-black text-stone-950">{appLogo ? <img src={appLogo} alt={appName} className="h-8 w-8 rounded-lg object-contain" /> : <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-700 text-sm text-white">{(appName || " ")[0].toUpperCase()}</span>} {appName}</div><p className="mt-4 max-w-sm whitespace-pre-line text-sm leading-6 text-stone-600">{settings.store_address || "Alamat toko belum diatur."}</p></div><div><h2 className="font-bold">Jelajahi</h2><div className="mt-4 grid gap-3 text-sm text-stone-600"><a href="/cari">Kategori</a><a href="/cari">Buku baru</a><a href="/cari">Terlaris</a><a href="/">Promo</a></div></div><div><h2 className="font-bold">Bantuan</h2><div className="mt-4 grid gap-3 text-sm text-stone-600"><a href="/info/tentang">Tentang kami</a><a href="/info/cara-belanja">Cara belanja</a><a href="/info/pengiriman">Pengiriman</a><a href="/info/kontak">Hubungi kami</a></div></div></div><div className="border-t border-stone-200"><p className="mx-auto max-w-7xl px-4 py-5 text-xs text-stone-500 sm:px-6 lg:px-8">© 2026 {appName}. Dibuat untuk pembaca yang selalu ingin tahu.</p></div></footer></>;
}
