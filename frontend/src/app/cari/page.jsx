"use client";

/* eslint-disable @next/next/no-html-link-for-pages */
import { useEffect, useMemo, useState } from "react";
import StoreFooter from "../../components/StoreFooter";

const books = [["Laut Bercerita","Fiksi & Sastra",115000],["Atomic Habits","Pengembangan Diri",108000],["Filosofi Teras","Pengembangan Diri",98000],["Bumi Manusia","Fiksi & Sastra",95000]];
const categories = ["Semua", "Fiksi & Sastra", "Pengembangan Diri"];
const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";

export default function Search() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("relevant");
  const [category, setCategory] = useState("Semua");
  const [priceRange, setPriceRange] = useState("all");
  const [user, setUser] = useState(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const cartToken = localStorage.getItem("cart_token");
    const headers = { Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(cartToken ? { "X-Cart-Token": cartToken } : {}) };
    if (token) fetch(`${apiUrl}/auth/me`, { headers }).then((response) => response.ok ? response.json() : null).then((payload) => setUser(payload?.data || null));
    fetch(`${apiUrl}/cart`, { headers }).then((response) => response.ok ? response.json() : null).then((payload) => {
      if (payload?.meta?.cart_token) localStorage.setItem("cart_token", payload.meta.cart_token);
      setCartCount((payload?.data?.items || []).reduce((sum, item) => sum + Number(item.quantity || 0), 0));
    }).catch(() => null);
  }, []);

  const results = useMemo(() => books.filter(([title, itemCategory, price]) => title.toLowerCase().includes(query.toLowerCase()) && (category === "Semua" || itemCategory === category) && (priceRange === "all" || (priceRange === "under" ? price < 100000 : price >= 100000))).sort((a,b) => sort === "low" ? a[2]-b[2] : sort === "high" ? b[2]-a[2] : 0), [query, sort, category, priceRange]);
  const logout = () => { localStorage.removeItem("token"); window.location.href = "/"; };

  return <main className="min-h-screen bg-[#f4f8ff]"><header className="sticky top-0 z-30 border-b border-stone-200/80 bg-[#fffdf8]/95 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4"><a href="/" className="font-black text-xl">📚 bukupagi</a><input className="min-w-0 flex-1 rounded-full border bg-white px-4 py-2" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari judul, penulis, atau ISBN"/><a href="/keranjang" className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-blue-200 bg-white text-lg text-blue-700" aria-label="Keranjang belanja">🛒<span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-blue-700 px-1 text-[9px] font-black text-white">{cartCount}</span></a>{user ? <div className="relative"><button onClick={() => setAccountOpen(!accountOpen)} className="rounded-full border-2 border-blue-700 px-4 py-2 font-bold">{user.name} ⌄</button>{accountOpen && <div className="absolute right-0 top-12 z-50 w-44 rounded-xl bg-white p-2 shadow-xl"><a className="block rounded-lg p-2 hover:bg-blue-50" href="/akun">Akun Saya</a><a className="block rounded-lg p-2 hover:bg-blue-50" href="/akun/pesanan">Pesanan Saya</a><button onClick={logout} className="w-full rounded-lg p-2 text-left font-bold text-red-600 hover:bg-red-50">Keluar</button></div>}</div> : <><a href="/auth/login" className="font-bold">Masuk</a><a href="/auth/register" className="rounded-full bg-slate-950 px-4 py-2 font-bold text-white">Daftar</a></>}</div></header><div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[240px_1fr]"><aside className="h-fit rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><b>Filter pencarian</b><button onClick={() => { setCategory("Semua"); setPriceRange("all"); }} className="text-xs font-bold text-blue-700">Reset</button></div><p className="mt-5 border-t pt-4 text-sm font-bold">Kategori</p><div className="mt-3 grid gap-2">{categories.map((item) => <label key={item} className="flex cursor-pointer items-center gap-2 text-sm text-slate-600"><input type="radio" checked={category === item} onChange={() => setCategory(item)}/>{item}</label>)}</div><p className="mt-5 border-t pt-4 text-sm font-bold">Harga</p><div className="mt-3 grid gap-2">{[["all","Semua harga"],["under","Di bawah Rp100.000"],["above","Rp100.000 ke atas"]].map(([value,label]) => <label key={value} className="flex cursor-pointer items-center gap-2 text-sm text-slate-600"><input type="radio" checked={priceRange === value} onChange={() => setPriceRange(value)}/>{label}</label>)}</div></aside><section><div className="flex justify-between"><b>{results.length} buku ditemukan</b><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="relevant">Paling relevan</option><option value="low">Harga terendah</option><option value="high">Harga tertinggi</option></select></div><div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">{results.map(([title, itemCategory, price]) => <a href={`/buku/${title.toLowerCase().replaceAll(" ", "-")}`} key={title} className="rounded-2xl bg-white p-4 shadow"><div className="aspect-[3/4] rounded-xl bg-blue-700 p-3 text-white">{title}</div><b className="mt-3 block">{title}</b><small className="text-slate-500">{itemCategory}</small><p>Rp{price.toLocaleString("id-ID")}</p></a>)}</div></section></div><StoreFooter/></main>;
}
