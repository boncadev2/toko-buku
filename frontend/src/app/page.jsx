"use client";

/* eslint-disable @next/next/no-html-link-for-pages */

import { useEffect, useState } from "react";

const categories = [
  ["Fiksi & Sastra", "✦", "bg-rose-100 text-rose-800"],
  ["Pengembangan Diri", "☼", "bg-amber-100 text-amber-800"],
  ["Bisnis & Finansial", "↗", "bg-emerald-100 text-emerald-800"],
  ["Anak & Remaja", "☁", "bg-sky-100 text-sky-800"],
];

const shelves = [
  { id: "terbaru", eyebrow: "Segar dari rak", title: "Baru tiba", description: "Judul yang baru kami pilih untuk rakmu.", books: [
    ["Laut Bercerita", "Leila S. Chudori", "Rp115.000", "from-sky-950 to-cyan-700", "Baru"], ["The Comfort Book", "Matt Haig", "Rp129.000", "from-rose-500 to-orange-300", "Baru"], ["Atomic Habits", "James Clear", "Rp108.000", "from-amber-300 to-stone-800", "Pilihan"], ["Filosofi Teras", "Henry Manampiring", "Rp98.000", "from-indigo-950 to-violet-600", "Baru"],
  ] },
  { id: "terlaris", eyebrow: "Favorit pembaca", title: "Terlaris minggu ini", description: "Buku yang paling sering dibawa pulang minggu ini.", books: [
    ["Sapiens", "Yuval Noah Harari", "Rp145.000", "from-red-700 to-orange-500", "Terlaris"], ["Pulih", "Rasani", "Rp89.000", "from-teal-800 to-emerald-400", "Terlaris"], ["Berani Tidak Disukai", "Ichiro Kishimi", "Rp95.000", "from-orange-200 to-red-600", "Terlaris"], ["Rich Dad Poor Dad", "Robert T. Kiyosaki", "Rp112.000", "from-violet-950 to-purple-500", "Terlaris"],
  ] },
];

const discounts = [
  ["Cantik Itu Luka", "Eka Kurniawan", "Rp78.000", "from-fuchsia-800 to-pink-400", "-29%", "Rp110.000"], ["Bumi Manusia", "Pramoedya A. Toer", "Rp72.000", "from-amber-900 to-yellow-500", "-24%", "Rp95.000"], ["Sebuah Seni untuk Bersikap Bodo Amat", "Mark Manson", "Rp85.000", "from-lime-700 to-emerald-500", "-29%", "Rp120.000"], ["The Midnight Library", "Matt Haig", "Rp91.000", "from-blue-950 to-indigo-500", "-30%", "Rp130.000"],
];

function BookCard({ book }) {
  const [title, author, price, cover, label, originalPrice] = book;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return <article className="group min-w-0 rounded-2xl border border-stone-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
    <div className={`relative flex aspect-[3/4] items-end overflow-hidden rounded-xl bg-gradient-to-br ${cover} p-4 text-white shadow-inner`}>
      <span className="absolute right-2 top-2 rounded-full bg-white/95 px-2 py-1 text-[10px] font-bold text-stone-900">{label}</span>
      <div className="w-full border-l border-white/50 pl-3"><p className="text-[10px] font-medium uppercase tracking-[.18em] text-white/70">Koleksi bukupagi</p><h3 className="mt-2 text-lg font-black leading-tight">{title}</h3></div>
    </div>
    <div className="px-1 pb-1 pt-4"><h3 className="truncate font-bold" title={title}>{title}</h3><p className="mt-1 truncate text-sm text-stone-500">{author}</p><div className="mt-3 flex flex-wrap items-baseline gap-x-2"><span className="font-bold text-orange-700">{price}</span>{originalPrice && <span className="text-xs text-stone-400 line-through">{originalPrice}</span>}</div><a href={`/buku/${slug}`} className="mt-3 inline-flex text-xs font-bold text-blue-700 hover:text-blue-900">Lihat detail →</a></div>
  </article>;
}

function Shelf({ shelf }) {
  return <section id={shelf.id} className="scroll-mt-24 py-10 sm:py-14"><div className="mb-7 flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-orange-700">{shelf.eyebrow}</p><h2 className="mt-2 text-2xl font-black tracking-tight text-stone-950 sm:text-3xl">{shelf.title}</h2><p className="mt-2 text-sm text-stone-600">{shelf.description}</p></div><a href="#" className="text-sm font-bold text-orange-700">Lihat semua →</a></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">{shelf.books.map((book) => <BookCard book={book} key={book[0]} />)}</div></section>;
}

function FloatingOrderButtons({ cartCount }) {
  const channels = [
    { name: "Shopee", href: process.env.NEXT_PUBLIC_SHOPEE_URL ?? "#", color: "bg-[#ee4d2d]", logo: <span className="text-lg font-black italic">S</span> },
    { name: "Tokopedia", href: process.env.NEXT_PUBLIC_TOKOPEDIA_URL ?? "#", color: "bg-[#42b549]", logo: <span className="text-base font-black">T</span> },
    { name: "WhatsApp", href: process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "#", color: "bg-[#25d366]", logo: <span className="text-lg leading-none">☎</span> },
  ];

  return <aside className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7" aria-label="Pesan melalui marketplace">
    <span className="rounded-full bg-slate-950 px-3 py-1.5 text-xs font-bold text-white shadow-lg">Pesan cepat</span>
    <a href="/keranjang" className="relative grid h-12 w-12 place-items-center rounded-full bg-blue-700 text-xl text-white shadow-lg transition hover:scale-110 lg:hidden" aria-label="Keranjang belanja" title="Keranjang belanja">🛒<span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-black text-white">{cartCount}</span></a>
    {channels.map((channel) => <a key={channel.name} href={channel.href} target={channel.href === "#" ? undefined : "_blank"} rel={channel.href === "#" ? undefined : "noreferrer"} onClick={(event) => { if (channel.href === "#") event.preventDefault(); }} className={`group relative flex h-12 w-12 items-center justify-center rounded-full ${channel.color} text-white shadow-lg transition hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-200`} aria-label={`Pesan melalui ${channel.name}`} title={`Pesan melalui ${channel.name}`}><span className="grid h-8 w-8 place-items-center rounded-lg border border-white/30 bg-white/10" aria-hidden="true">{channel.logo}</span><span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-lg bg-slate-950 px-3 py-2 text-xs font-bold text-white shadow-lg group-hover:block group-focus:block">Pesan via {channel.name}</span></a>)}
  </aside>;
}

function AccountMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const initial = user.name?.trim().slice(0, 1).toUpperCase() || "A";
  const accountLink = user.is_admin ? "/admin" : "/akun";
  return <div className="relative"><button onClick={() => setOpen(!open)} className="flex items-center gap-2 rounded-full border-2 border-blue-700 bg-white p-1.5 text-sm font-bold text-slate-700 shadow-sm lg:py-1.5 lg:pl-2 lg:pr-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-blue-600 text-white">{initial}</span><span className="hidden max-w-28 truncate lg:block">{user.name}</span><span className="hidden text-xs text-slate-500 lg:block">⌄</span></button>{open && <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/15"><div className="border-b border-slate-100 px-3 py-2"><b className="block truncate text-sm text-slate-800">{user.name}</b><small className="block truncate text-slate-500">{user.email}</small></div><a href={accountLink} className="mt-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50">👤 {user.is_admin ? "Dashboard Admin" : "Akun Saya"}</a>{!user.is_admin && <a href="/akun/pesanan" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50">📦 Pesanan Saya</a>}<button onClick={onLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold text-red-600 hover:bg-red-50">↪ Keluar</button></div>}</div>;
}

export default function Home() {
  const [health, setHealth] = useState(null);
  const [healthError, setHealthError] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/health`).then(async (response) => { if (!response.ok) throw new Error("Health check failed"); return response.json(); }).then(({ data }) => setHealth(data)).catch(() => setHealthError(true));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const cartToken = localStorage.getItem("cart_token");
    const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
    fetch(`${base}/cart`, { headers: { Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(cartToken ? { "X-Cart-Token": cartToken } : {}) } })
      .then(async (response) => { if (!response.ok) throw new Error("Cart unavailable"); return response.json(); })
      .then((response) => { if (response.meta?.cart_token) localStorage.setItem("cart_token", response.meta.cart_token); setCartCount((response.data?.items || []).reduce((total, item) => total + Number(item.quantity || 0), 0)); })
      .catch(() => null);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/auth/me`, { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } })
      .then(async (response) => { if (!response.ok) throw new Error("Sesi tidak valid"); return response.json(); })
      .then((response) => setUser(response.data))
      .catch(() => localStorage.removeItem("token"));
  }, []);

  const logout = () => { localStorage.removeItem("token"); setUser(null); window.location.href = "/"; };

  useEffect(() => {
    const routes = { "Tentang kami": "/info/tentang", "Cara belanja": "/info/cara-belanja", Pengiriman: "/info/pengiriman", "Hubungi kami": "/info/kontak", "Lihat semua →": "/cari" };
    const onClick = (event) => { const link = event.target.closest('a[href="#"]'); if (link && routes[link.textContent.trim()]) { event.preventDefault(); window.location.href = routes[link.textContent.trim()]; } const button = event.target.closest("button"); if (button?.textContent.trim() === "Masuk") window.location.href = "/auth/login"; if (button?.textContent.trim() === "Daftar") window.location.href = "/auth/register"; };
    document.addEventListener("click", onClick); return () => document.removeEventListener("click", onClick);
  }, []);

  return <main className="min-h-screen bg-[#fffdf8] text-stone-900">
    <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-[#fffdf8]/95 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
      <a href="#beranda" className="flex items-center gap-2 font-black tracking-tight text-stone-950"><span className="grid h-9 w-9 place-items-center rounded-xl bg-orange-700 text-lg text-white">B</span><span className="text-xl">bukupagi</span></a>
      <nav className="hidden items-center gap-6 text-sm font-semibold text-stone-600 lg:flex" aria-label="Navigasi utama"><a className="text-stone-950" href="#beranda">Beranda</a><a href="#kategori">Kategori</a><a href="#terbaru">Buku Baru</a><a href="#promo">Promo</a></nav>
      <form className="hidden max-w-sm flex-1 items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-stone-400 shadow-sm lg:flex" onSubmit={(event) => { event.preventDefault(); const q = new FormData(event.currentTarget).get("q")?.toString().trim(); window.location.href = `/cari${q ? `?q=${encodeURIComponent(q)}` : ""}`; }}>⌕<input name="q" className="w-full bg-transparent outline-none" placeholder="Cari judul, penulis, atau ISBN" aria-label="Cari buku" /></form>
<div className="hidden items-center gap-3 lg:flex"><a href="/keranjang" className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-blue-200 bg-white text-lg text-blue-700 shadow-sm transition hover:bg-blue-50" aria-label="Keranjang belanja" title="Keranjang belanja">🛒<span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-blue-700 px-1 text-[9px] font-black text-white">{cartCount}</span></a>{user ? <AccountMenu user={user} onLogout={logout} /> : <div className="flex items-center gap-2"><button className="text-sm font-bold text-stone-700">Masuk</button><button className="rounded-full bg-stone-950 px-4 py-2 text-sm font-bold text-white">Daftar</button></div>}</div>
      <button className="grid h-10 w-10 place-items-center rounded-xl border border-stone-200 text-xl lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Buka menu" aria-expanded={menuOpen}>☰</button>
    </div>{menuOpen && <div className="border-t border-stone-200 bg-[#fffdf8] px-4 py-4 lg:hidden"><div className="mx-auto grid max-w-7xl gap-3 text-sm font-bold text-stone-700"><a href="#beranda" onClick={() => setMenuOpen(false)}>Beranda</a><a href="#kategori" onClick={() => setMenuOpen(false)}>Kategori</a><a href="#terbaru" onClick={() => setMenuOpen(false)}>Buku Baru</a><a href="#promo" onClick={() => setMenuOpen(false)}>Promo</a><label className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-3 py-2 font-normal text-stone-400">⌕<input className="w-full bg-transparent outline-none" placeholder="Cari buku" aria-label="Cari buku" /></label><div className="my-1 border-t border-stone-200"/>{user ? <div className="grid gap-2"><a href={user.is_admin ? "/admin" : "/akun"} className="rounded-xl px-3 py-2.5 hover:bg-blue-50">👤 Akun Saya</a><button onClick={logout} className="rounded-xl px-3 py-2.5 text-left font-bold text-red-600 hover:bg-red-50">↪ Keluar</button></div> : <div className="grid grid-cols-2 gap-2"><a href="/auth/login" className="rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-center">Masuk</a><a href="/auth/register" className="rounded-xl bg-stone-950 px-3 py-2.5 text-center text-white">Daftar</a></div>}</div></div>}</header>

    <section id="beranda" className="border-b border-stone-200 bg-[radial-gradient(circle_at_80%_10%,#fed7aa,transparent_32%),radial-gradient(circle_at_5%_90%,#fde68a,transparent_28%)]"><div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:py-24"><div><p className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-[.18em] text-orange-800">Temukan cerita berikutnya</p><h1 className="mt-5 max-w-2xl text-4xl font-black leading-[1.04] tracking-tight text-stone-950 sm:text-6xl">Buku yang baik, selalu menemukan pembacanya.</h1><p className="mt-5 max-w-xl text-base leading-7 text-stone-600 sm:text-lg">Pilihan buku untuk menemani rasa ingin tahu, ide besar, dan waktu tenangmu di rumah.</p><form className="mt-8 flex max-w-xl gap-2 rounded-2xl border border-stone-200 bg-white p-2 shadow-lg shadow-orange-950/5" onSubmit={(event) => { event.preventDefault(); const q = new FormData(event.currentTarget).get("q")?.toString().trim(); window.location.href = `/cari${q ? `?q=${encodeURIComponent(q)}` : ""}`; }}><input name="q" className="min-w-0 flex-1 px-3 text-sm outline-none" placeholder="Mau membaca apa hari ini?" aria-label="Cari koleksi buku" /><button className="shrink-0 rounded-xl bg-orange-700 px-4 py-3 text-sm font-bold text-white">Cari buku</button></form><div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-stone-600"><span>✓ Pilihan kurasi</span><span>✓ Promo mingguan</span><span>✓ Pengiriman ke seluruh Indonesia</span></div></div><div className="relative mx-auto w-full max-w-md"><div className="relative rounded-[2rem] bg-stone-950 p-6 shadow-2xl sm:p-8"><p className="text-xs font-bold uppercase tracking-[.25em] text-orange-300">Rekomendasi hari ini</p><div className="mt-7 grid grid-cols-[.8fr_1.2fr] items-end gap-5"><div className="aspect-[3/4] rounded-lg bg-gradient-to-br from-orange-300 via-red-600 to-stone-950 p-4 text-white shadow-xl"><p className="text-[9px] font-bold uppercase tracking-[.2em] text-white/70">Novel pilihan</p><p className="mt-5 text-xl font-black leading-none">Jendela<br />Masa Depan</p><p className="mt-8 text-xs">sebuah cerita untuk pulang</p></div><div><p className="text-sm text-stone-400">Baca, bayangkan, tumbuh.</p><h2 className="mt-2 text-3xl font-black leading-tight text-white">Satu halaman bisa mengubah harimu.</h2><a href="#terbaru" className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-stone-950">Mulai jelajahi →</a></div></div></div></div></div></section>

    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><section id="kategori" className="scroll-mt-24 py-12 sm:py-16"><div className="mb-7"><p className="text-xs font-bold uppercase tracking-[.2em] text-orange-700">Telusuri minatmu</p><h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Kategori pilihan</h2></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">{categories.map(([name, icon, color]) => <a href="#" className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md" key={name}><span className={`grid h-11 w-11 place-items-center rounded-xl text-xl ${color}`}>{icon}</span><h3 className="mt-5 font-bold">{name}</h3><p className="mt-1 text-sm text-stone-500">Jelajahi koleksi →</p></a>)}</div></section>{shelves.map((shelf) => <Shelf shelf={shelf} key={shelf.id} />)}</div>

    <section id="promo" className="scroll-mt-24 bg-stone-950 py-12 text-white sm:py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-orange-300">Harga terbaik</p><h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Diskon pilihan</h2><p className="mt-2 text-sm text-stone-300">Buku bagus, alasan lebih banyak untuk membaca.</p></div><span className="rounded-full border border-orange-400/50 px-4 py-2 text-sm font-bold text-orange-200">Promo terbatas</span></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">{discounts.map((book) => <BookCard book={book} key={book[0]} />)}</div></div></section>

    <section className="border-b border-stone-200 bg-orange-100"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-4 py-10 sm:px-6 md:flex-row md:items-center lg:px-8"><div><p className="text-xl font-black text-stone-950">Jangan sampai kehabisan cerita bagus.</p><p className="mt-1 text-sm text-stone-600">Dapatkan kabar koleksi dan promo pilihan setiap minggu.</p></div><form className="flex w-full max-w-md gap-2" onSubmit={(event) => event.preventDefault()}><input className="min-w-0 flex-1 rounded-xl border border-orange-200 bg-white px-4 py-3 text-sm outline-none" type="email" placeholder="Email kamu" aria-label="Email kamu" /><button className="rounded-xl bg-stone-950 px-4 py-3 text-sm font-bold text-white">Berlangganan</button></form></div></section>
    <footer><div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8"><div><div className="flex items-center gap-2 font-black text-stone-950"><span className="grid h-8 w-8 place-items-center rounded-lg bg-orange-700 text-sm text-white">B</span> bukupagi</div><p className="mt-4 max-w-sm text-sm leading-6 text-stone-600">Ruang kecil di internet untuk menemukan buku yang layak dibaca berulang kali.</p><p className={`mt-5 text-xs font-semibold ${health ? "text-emerald-700" : healthError ? "text-rose-700" : "text-amber-700"}`}>{health ? `● ${health.service} siap` : healthError ? "● API belum dapat dihubungi" : "● Memeriksa layanan…"}</p></div><div><h2 className="font-bold">Jelajahi</h2><div className="mt-4 grid gap-3 text-sm text-stone-600"><a href="#kategori">Kategori</a><a href="#terbaru">Buku baru</a><a href="#terlaris">Terlaris</a><a href="#promo">Promo</a></div></div><div><h2 className="font-bold">Bantuan</h2><div className="mt-4 grid gap-3 text-sm text-stone-600"><a href="#">Tentang kami</a><a href="#">Cara belanja</a><a href="#">Pengiriman</a><a href="#">Hubungi kami</a></div></div></div><div className="border-t border-stone-200"><p className="mx-auto max-w-7xl px-4 py-5 text-xs text-stone-500 sm:px-6 lg:px-8">© 2026 bukupagi. Dibuat untuk pembaca yang selalu ingin tahu.</p></div></footer>
    <FloatingOrderButtons cartCount={cartCount} />
  </main>;
}
