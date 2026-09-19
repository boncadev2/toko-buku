"use client";
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react-hooks/set-state-in-effect */
import { use, useEffect, useState } from "react";
import StoreMobileControls from "../../../components/StoreMobileControls";

const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";

function money(amount) { return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(amount); }

function Header({ user, cartCount, logout, settings }) { const [open, setOpen] = useState(false); const appName = settings?.app_name || ""; const appLogo = settings?.app_logo; return <><header className="sticky top-0 z-30 border-b border-stone-200/80 bg-[#fffdf8]/95 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8"><a href="/" className="flex shrink-0 items-center gap-2 font-black">{appLogo ? <img src={appLogo} alt={appName} className="h-9 w-9 rounded-xl object-contain" /> : <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-700 text-lg text-white">{(appName || " ")[0].toUpperCase()}</span>}<span className="text-xl">{appName}</span></a><nav className="hidden items-center gap-6 text-sm font-semibold text-stone-600 lg:flex"><a href="/">Beranda</a><a href="/#kategori">Kategori</a><a href="/#terbaru">Buku Baru</a><a href="/#promo">Promo</a></nav><form onSubmit={(e) => { e.preventDefault(); const q = new FormData(e.currentTarget).get("q")?.toString().trim(); window.location.href = `/cari${q ? `?q=${encodeURIComponent(q)}` : ""}`; }} className="hidden max-w-sm flex-1 items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-stone-400 shadow-sm lg:flex">⌕<input name="q" className="w-full bg-transparent outline-none" placeholder="Cari judul, penulis, atau ISBN" /></form><div className="hidden items-center gap-3 lg:flex"><a href="/keranjang" className="relative grid h-10 w-10 place-items-center rounded-full border border-blue-200 bg-white text-lg text-blue-700">🛒<span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-blue-700 px-1 text-[9px] font-black text-white">{cartCount}</span></a>{user ? <div className="relative"><button onClick={() => setOpen(!open)} className="flex items-center gap-2 rounded-full border-2 border-blue-700 bg-white py-1.5 pl-2 pr-3 text-sm font-bold text-slate-700"><span className="grid h-8 w-8 place-items-center rounded-full bg-blue-600 text-white">{user.name?.slice(0, 1).toUpperCase()}</span><span className="max-w-28 truncate">{user.name}</span><span>⌄</span></button>{open && <div className="absolute right-0 top-12 z-50 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"><a href={user.is_admin ? "/admin" : "/akun"} className="block rounded-xl px-3 py-3 text-sm font-semibold hover:bg-blue-50">👤 {user.is_admin ? "Dashboard Admin" : "Akun Saya"}</a>{!user.is_admin && <a href="/akun/pesanan" className="block rounded-xl px-3 py-3 text-sm font-semibold hover:bg-blue-50">📦 Pesanan Saya</a>}<button onClick={logout} className="w-full rounded-xl px-3 py-3 text-left text-sm font-bold text-red-600 hover:bg-red-50">↪ Keluar</button></div>}</div> : <><a href="/auth/login" className="text-sm font-bold text-stone-700">Masuk</a><a href="/auth/register" className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white">Daftar</a></>}</div></div></header><StoreMobileControls user={user} cartCount={cartCount} onLogout={logout}/></>; }


function DynamicBookCard({ book, label, coverClass, appName = "" }) {
  const title = book.title;
  const author = book.author || "Tanpa Penulis";
  
  const formatter = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });
  const price = formatter.format(book.price);
  const originalPrice = book.original_price ? formatter.format(book.original_price) : null;
  
  const slug = book.slug;
  const coverUrl = book.cover_image_url;
  
  if (!label && book.discount_type === 'percentage') {
    label = "-" + parseInt(book.discount_value) + "%";
  } else if (!label && book.discount_type === 'fixed') {
    label = "Promo";
  }

  return <article className="group min-w-0 rounded-2xl border border-stone-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
    <div className={`relative flex aspect-[3/4] items-end overflow-hidden rounded-xl ${!coverUrl ? 'bg-gradient-to-br ' + (coverClass || 'from-rose-500 to-orange-300') : 'bg-slate-100'} p-0 text-white shadow-inner`}>
      {coverUrl ? <img src={coverUrl} alt={title} className="w-full h-full object-cover" /> : <div className="p-4 w-full h-full flex flex-col justify-end"><div className="w-full border-l border-white/50 pl-3"><p className="text-[10px] font-medium uppercase tracking-[.18em] text-white/70">Koleksi {appName || ""}</p><h3 className="mt-2 text-lg font-black leading-tight">{title}</h3></div></div>}
      {label && <span className="absolute right-2 top-2 rounded-full bg-white/95 px-2 py-1 text-[10px] font-bold text-stone-900 shadow-sm">{label}</span>}
    </div>
    <div className="px-1 pb-1 pt-4"><h3 className="truncate font-bold" title={title}>{title}</h3><p className="mt-1 truncate text-sm text-stone-500">{author}</p><div className="mt-3 flex flex-wrap items-baseline gap-x-2"><span className="font-bold text-orange-700">{price}</span>{originalPrice && <span className="text-xs text-stone-400 line-through">{originalPrice}</span>}</div><a href={`/buku/${slug}`} className="mt-3 inline-flex text-xs font-bold text-blue-700 hover:text-blue-900">Lihat detail →</a></div>
  </article>;
}

export default function BookDetailPage({ params }) { 
  const { slug } = use(params); 
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); 
  const [user, setUser] = useState(null); 
  const [cartCount, setCartCount] = useState(0); 
  const [notice, setNotice] = useState("");
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [settings, setSettings] = useState(() => { try { return typeof window !== "undefined" ? JSON.parse(localStorage.getItem("app_settings") || "{}") : {}; } catch { return {}; } }); 
  
  const cartHeaders = () => { 
    const token = localStorage.getItem("token"), guest = localStorage.getItem("cart_token"); 
    return { Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(guest ? { "X-Cart-Token": guest } : {}) }; 
  }; 
  
  const refreshCart = async () => { 
    const response = await fetch(`${base}/cart`, { headers: cartHeaders() }); 
    const payload = await response.json(); 
    if (payload.meta?.cart_token) localStorage.setItem("cart_token", payload.meta.cart_token); 
    setCartCount((payload.data?.items || []).reduce((sum, item) => sum + Number(item.quantity || 0), 0)); 
    return payload; 
  }; 
  
  useEffect(() => { 
    const token = localStorage.getItem("token"); 
    if (token) fetch(`${base}/auth/me`, { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } }).then((r) => r.ok ? r.json() : null).then((data) => setUser(data?.data || null)); 
    refreshCart().catch(() => null);
    fetch(`${base}/settings`).then(r => r.ok ? r.json() : null).then(p => ((d) => { localStorage.setItem("app_settings", JSON.stringify(typeof d === "function" ? d(settings) : d)); setSettings(d); })(p?.data || {})); 
    
    fetch(`${base}/books/${slug}`)
      .then(r => r.ok ? r.json() : null)
      .then(payload => { 
        const b = payload?.data || null;
        setBook(b); setLoading(false);
        if (b && b.category?.slug) {
          fetch(`${base}/books?category=${b.category.slug}&per_page=5`)
            .then(r => r.ok ? r.json() : null)
            .then(res => {
              if (res && res.data) {
                setRelatedBooks(res.data.filter(x => x.id !== b.id).slice(0, 4));
              }
            }).catch(() => null);
        }
      })
      .catch(() => setLoading(false));
  }, [slug]); 
  
  const add = async (checkout) => { 
    if (!book) return;
    setNotice("Menambahkan buku…"); 
    try { 
      const response = await fetch(`${base}/cart/items`, { method: "POST", headers: { ...cartHeaders(), "Content-Type": "application/json" }, body: JSON.stringify({ book_id: book.id, quantity }) }); 
      if (!response.ok) throw new Error(); 
      const payload = await response.json(); 
      if (payload.meta?.cart_token) localStorage.setItem("cart_token", payload.meta.cart_token); 
      setCartCount((payload.data?.items || []).reduce((sum, item) => sum + Number(item.quantity || 0), 0)); 
      if (checkout) window.location.href = "/keranjang"; else setNotice("✓ Buku ditambahkan ke keranjang"); 
    } catch { setNotice("Produk belum tersedia di katalog."); } 
  }; 
  
  const logout = () => { localStorage.removeItem("token"); window.location.href = "/"; }; 
  
  if (loading) return <div className="min-h-screen bg-[#fffdf8] flex items-center justify-center">Memuat...</div>;
  if (!book) return <div className="min-h-screen bg-[#fffdf8] flex items-center justify-center">Buku tidak ditemukan.</div>;
  
  const cover = "from-blue-950 via-blue-700 to-cyan-400";
  
  return <main className="min-h-screen bg-[#fffdf8] text-stone-900"><Header user={user} cartCount={cartCount} logout={logout} settings={settings}/><div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"><nav className="text-sm text-stone-500"><a href="/">Beranda</a><span className="mx-2">/</span><a href="/cari">Buku</a><span className="mx-2">/</span>{book.title}</nav><section className="mt-6 grid gap-8 lg:grid-cols-[.72fr_1.12fr_.8fr]"><div className={`flex aspect-[3/4] items-end overflow-hidden rounded-2xl bg-gradient-to-br ${cover} p-0 text-white shadow-xl`}>{book.cover_image_url ? <img src={book.cover_image_url} alt={book.title} className="w-full h-full object-cover" /> : <div className="p-7 w-full h-full flex flex-col justify-end"><div className="border-l border-white/50 pl-3"><p className="text-xs uppercase tracking-widest text-white/70">Koleksi {settings?.app_name || ""}</p><h1 className="mt-3 text-3xl font-black leading-tight">{book.title}</h1></div></div>}</div><article><p className="text-sm font-semibold text-blue-700">{book.category?.name || "Buku"}</p><h2 className="mt-2 text-3xl font-black sm:text-4xl">{book.title}</h2><p className="mt-3 text-sm text-stone-600">oleh <b>{book.author || "Tanpa Penulis"}</b></p><div className="mt-5 flex gap-3 text-sm">{book.rating > 0 ? <b className="text-amber-500">★ {String(book.rating).replace(".", ",")}</b> : <span className="text-stone-400">Belum ada ulasan</span>}<span className="text-stone-500">({book.views_count || 0} dilihat)</span><span className="text-stone-500">{book.sold_count || 0} terjual</span></div><div className="mt-6 rounded-2xl bg-blue-50 px-5 py-4 flex flex-wrap gap-x-4 items-center"><p className="text-3xl font-black text-blue-700">{money(book.price)}</p>{book.original_price && <p className="text-xl font-bold text-stone-400 line-through decoration-rose-500/50">{money(book.original_price)}</p>}<p className="mt-1 w-full text-xs text-stone-500">Harga belum termasuk ongkir.</p></div><div className="mt-7 border-t border-stone-200 pt-6"><p className="font-bold">Deskripsi</p><p className="mt-3 leading-7 text-stone-600 whitespace-pre-wrap">{book.description || book.short_description || `Buku pilihan yang dikurasi ${settings?.app_name || ""} untuk menemani rasa ingin tahu dan waktu membaca Anda.`}</p></div><div className="mt-7 border-t border-stone-200 pt-6 pb-6"><h2 className="font-bold">Detail Buku</h2><dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2"><div><dt className="text-stone-500">Penerbit</dt><dd className="mt-1 font-bold">{book.publisher || "-"}</dd></div><div><dt className="text-stone-500">Tahun Terbit</dt><dd className="mt-1 font-bold">{book.publication_year || "-"}</dd></div><div><dt className="text-stone-500">Halaman</dt><dd className="mt-1 font-bold">{book.pages || "-"}</dd></div><div><dt className="text-stone-500">ISBN</dt><dd className="mt-1 font-bold">{book.isbn || "-"}</dd></div><div><dt className="text-stone-500">Berat</dt><dd className="mt-1 font-bold">{book.weight ? `${book.weight} gram` : "-"}</dd></div><div><dt className="text-stone-500">SKU</dt><dd className="mt-1 font-bold">{book.sku || "-"}</dd></div></dl></div></article><aside className="h-fit rounded-2xl border border-stone-200 bg-white p-5 shadow-sm lg:sticky lg:top-24"><h2 className="font-black">Atur jumlah & beli</h2><div className="mt-5 flex items-center justify-between"><span className="text-sm text-stone-600">Jumlah</span><div className="flex overflow-hidden rounded-lg border"><button onClick={() => setQuantity((n) => Math.max(1,n-1))} className="h-9 w-9">−</button><span className="grid w-9 place-items-center border-x text-sm font-bold">{quantity}</span><button onClick={() => setQuantity((n) => Math.min(book.stock || 10,n+1))} className="h-9 w-9">+</button></div></div><p className="mt-2 text-right text-xs text-stone-500">Stok tersisa: {book.stock}</p><button onClick={() => add(false)} disabled={book.stock <= 0} className="mt-6 w-full rounded-xl border border-blue-700 py-3 text-sm font-bold text-blue-700 disabled:opacity-50">+ Masukkan Keranjang</button><button onClick={() => add(true)} disabled={book.stock <= 0} className="mt-3 w-full rounded-xl bg-blue-700 py-3 text-sm font-bold text-white disabled:opacity-50">Beli Sekarang</button>{notice && <p className="mt-3 text-center text-xs font-bold text-blue-700">{notice}</p>}</aside></section>
    
    {relatedBooks.length > 0 && <section className="mt-16 border-t border-stone-200 pt-10 pb-16">
      <div className="mb-7 flex items-end justify-between"><h2 className="text-xl font-black">Buku Terkait</h2><a href={`/cari?kategori=${book.category?.slug}`} className="text-sm font-bold text-blue-700">Lihat selengkapnya →</a></div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">{relatedBooks.map(b => <DynamicBookCard book={b} key={b.id} coverClass="from-slate-800 to-stone-500" appName={settings?.app_name || ""} />)}</div>
    </section>}
  
  </div>

    <section className="border-t border-stone-200 bg-orange-100"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-4 py-10 sm:px-6 md:flex-row md:items-center lg:px-8"><div><p className="text-xl font-black text-stone-950">Jangan sampai kehabisan cerita bagus.</p><p className="mt-1 text-sm text-stone-600">Dapatkan kabar koleksi dan promo pilihan setiap minggu.</p></div><form className="flex w-full max-w-md gap-2" onSubmit={(event) => event.preventDefault()}><input className="min-w-0 flex-1 rounded-xl border border-orange-200 bg-white px-4 py-3 text-sm outline-none" type="email" placeholder="Email kamu" aria-label="Email kamu" /><button className="rounded-xl bg-stone-950 px-4 py-3 text-sm font-bold text-white">Berlangganan</button></form></div></section>
    <footer className="bg-[#fffdf8]"><div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8"><div><div className="flex items-center gap-2 font-black text-stone-950">{settings?.app_logo ? <img src={settings.app_logo} alt={settings.app_name || ""} className="h-8 w-8 rounded-lg object-contain" /> : <span className="grid h-8 w-8 place-items-center rounded-lg bg-orange-700 text-sm text-white">{(settings?.app_name || "")[0].toUpperCase()}</span>} {settings?.app_name || ""}</div><p className="mt-4 max-w-sm whitespace-pre-line text-sm leading-6 text-stone-600">Jalan Literasi No. 42, Kota Imaji, Indonesia</p><div className="mt-5 flex gap-4 text-stone-400"><a href="#" className="hover:text-stone-900">Twitter</a><a href="#" className="hover:text-stone-900">Instagram</a><a href="#" className="hover:text-stone-900">Facebook</a></div></div><div><h2 className="font-bold">Jelajahi</h2><div className="mt-4 grid gap-3 text-sm text-stone-600"><a href="/#kategori">Kategori</a><a href="/#terbaru">Buku baru</a><a href="/#terlaris">Terlaris</a><a href="/#promo">Promo</a></div></div><div><h2 className="font-bold">Bantuan</h2><div className="mt-4 grid gap-3 text-sm text-stone-600"><a href="#">Tentang kami</a><a href="#">Cara belanja</a><a href="#">Pengiriman</a><a href="#">Hubungi kami</a></div></div></div><div className="border-t border-stone-200"><p className="mx-auto max-w-7xl px-4 py-5 text-xs text-stone-500 sm:px-6 lg:px-8">© 2026 {settings?.app_name || ""}. Dibuat untuk pembaca yang selalu ingin tahu.</p></div></footer>

  </main>; 
}
