"use client";

/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import StoreFooter from "../../components/StoreFooter";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";

function DynamicBookCard({ book }) {
  const formatter = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });
  let label = null;
  if (book.discount_type === 'percentage') label = "-" + parseInt(book.discount_value) + "%";
  else if (book.discount_type === 'fixed') label = "Promo";

  return <a href={`/buku/${book.slug}`} className="group rounded-2xl bg-white p-4 shadow-sm border border-stone-100 transition hover:-translate-y-1 hover:shadow-md">
    <div className="relative aspect-[3/4] rounded-xl bg-slate-100 p-0 overflow-hidden text-white">
      {book.cover_image_url ? <img src={book.cover_image_url} alt={book.title} className="w-full h-full object-cover" /> : <div className="p-3 w-full h-full bg-gradient-to-br from-blue-700 to-cyan-500 flex items-end"><b className="leading-tight">{book.title}</b></div>}
      {label && <span className="absolute right-2 top-2 rounded-full bg-white/95 px-2 py-1 text-[10px] font-bold text-stone-900 shadow-sm">{label}</span>}
    </div>
    <b className="mt-3 block truncate" title={book.title}>{book.title}</b>
    <small className="text-slate-500 block truncate">{book.category?.name || "Buku"}</small>
    <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
      <span className="font-bold text-blue-700">{formatter.format(book.price)}</span>
      {book.original_price && <span className="text-xs text-stone-400 line-through">{formatter.format(book.original_price)}</span>}
    </div>
  </a>;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const initQ = searchParams.get("q") || "";
  const initC = searchParams.get("kategori") || "Semua";

  const [query, setQuery] = useState(initQ);
  const [sort, setSort] = useState("relevant");
  const [category, setCategory] = useState(initC);
  
  const [categories, setCategories] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [settings, setSettings] = useState({});
  useEffect(() => { try { const c = JSON.parse(localStorage.getItem("app_settings") || "{}"); setSettings(prev => ({ ...prev, ...c })); } catch {} }, []);

  // Fetch Session & Categories
  useEffect(() => {
    const token = localStorage.getItem("token");
    const cartToken = localStorage.getItem("cart_token");
    const headers = { Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(cartToken ? { "X-Cart-Token": cartToken } : {}) };
    
    if (token) fetch(`${apiUrl}/auth/me`, { headers }).then((r) => r.ok ? r.json() : null).then((p) => setUser(p?.data || null));
    fetch(`${apiUrl}/cart`, { headers }).then((r) => r.ok ? r.json() : null).then((p) => {
      if (p?.meta?.cart_token) localStorage.setItem("cart_token", p.meta.cart_token);
      setCartCount((p?.data?.items || []).reduce((sum, item) => sum + Number(item.quantity || 0), 0));
    }).catch(() => null);

    fetch(`${apiUrl}/settings`).then(r => r.ok ? r.json() : null).then(p => ((d) => { localStorage.setItem("app_settings", JSON.stringify(typeof d === "function" ? d(settings) : d)); setSettings(d); })(p?.data || {}));
    fetch(`${apiUrl}/categories`).then(r => r.ok ? r.json() : null).then(p => {
      setCategories(p?.data || []);
    });
  }, []);

  // Fetch Books
  useEffect(() => {
    setLoading(true);
    let url = `${apiUrl}/books?per_page=20`;
    if (query) url += `&search=${encodeURIComponent(query)}`;
    if (category !== "Semua") {
      const catObj = categories.find(c => c.name === category || c.slug === category);
      if (catObj) url += `&category=${catObj.slug}`;
      else if (category.match(/^[a-z0-9-]+$/)) url += `&category=${category}`; // fallback if it's already a slug
    }
    
    let apiSort = "newest";
    if (sort === "low") apiSort = "price_asc";
    if (sort === "high") apiSort = "price_desc";
    url += `&sort=${apiSort}`;

    fetch(url).then(r => r.ok ? r.json() : null).then(p => {
      setResults(p?.data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [query, category, sort, categories]);

  const logout = () => { localStorage.removeItem("token"); window.location.href = "/"; };
  const appName = settings.app_name || "";
  const appLogo = settings.app_logo;

  return <>
    <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-[#fffdf8]/95 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4"><a href="/" className="flex items-center gap-2 font-black text-xl">{appLogo ? <img src={appLogo} alt={appName} className="h-8 w-8 rounded-lg object-contain" /> : <span className="grid h-8 w-8 place-items-center rounded-xl bg-blue-700 text-white">{(appName || " ")[0].toUpperCase()}</span>} {appName}</a><input className="min-w-0 flex-1 rounded-full border bg-white px-4 py-2 outline-blue-700" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari judul, penulis, atau ISBN"/><a href="/keranjang" className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-blue-200 bg-white text-lg text-blue-700" aria-label="Keranjang belanja">🛒<span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-blue-700 px-1 text-[9px] font-black text-white">{cartCount}</span></a>{user ? <div className="relative"><button onClick={() => setAccountOpen(!accountOpen)} className="rounded-full border-2 border-blue-700 px-4 py-2 font-bold">{user.name} ⌄</button>{accountOpen && <div className="absolute right-0 top-12 z-50 w-44 rounded-xl bg-white p-2 shadow-xl"><a className="block rounded-lg p-2 hover:bg-blue-50" href="/akun">Akun Saya</a><a className="block rounded-lg p-2 hover:bg-blue-50" href="/akun/pesanan">Pesanan Saya</a><button onClick={logout} className="w-full rounded-lg p-2 text-left font-bold text-red-600 hover:bg-red-50">Keluar</button></div>}</div> : <><a href="/auth/login" className="font-bold hidden sm:block">Masuk</a><a href="/auth/register" className="rounded-full bg-slate-950 px-4 py-2 font-bold text-white">Daftar</a></>}</div></header>
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[240px_1fr]">
      <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between"><b>Filter</b><button onClick={() => { setCategory("Semua"); setQuery(""); }} className="text-xs font-bold text-blue-700">Reset</button></div>
        <p className="mt-5 border-t pt-4 text-sm font-bold text-blue-950">Kategori</p>
        <div className="mt-3 grid gap-3 max-h-96 overflow-y-auto">
          <label className="flex cursor-pointer items-start gap-2 text-sm text-slate-700 hover:text-blue-700"><input type="radio" className="mt-0.5" checked={category === "Semua"} onChange={() => setCategory("Semua")}/>Semua Kategori</label>
          {categories.map((item) => <label key={item.id} className="flex cursor-pointer items-start gap-2 text-sm text-slate-700 hover:text-blue-700"><input type="radio" className="mt-0.5" checked={category === item.name || category === item.slug} onChange={() => setCategory(item.name)}/>{item.name}</label>)}
        </div>
      </aside>
      <section>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <b className="text-slate-700">{loading ? "Mencari..." : `${results.length} buku ditemukan`}</b>
          <select className="rounded-lg border bg-white px-3 py-1.5 text-sm outline-none" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="relevant">Paling relevan (Terbaru)</option>
            <option value="low">Harga terendah</option>
            <option value="high">Harga tertinggi</option>
          </select>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
          {!loading && results.length === 0 && <div className="col-span-full py-12 text-center text-slate-500">Buku yang Anda cari tidak ditemukan.</div>}
          {results.map((book) => <DynamicBookCard book={book} key={book.id} />)}
        </div>
      </section>
    </div>
  </>;
}

export default function Search() {
  return <main className="min-h-screen bg-[#f4f8ff] text-stone-900">
    <Suspense fallback={<div className="p-12 text-center">Memuat...</div>}>
      <SearchContent />
    </Suspense>
    <StoreFooter/>
  </main>;
}
