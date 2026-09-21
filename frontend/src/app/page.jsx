"use client";

/* eslint-disable @next/next/no-html-link-for-pages */

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LogoutConfirmModal from "../components/LogoutConfirmModal";
import StoreMobileControls from "../components/StoreMobileControls";
import MarketplaceFloatingButtons from "../components/MarketplaceFloatingButtons";

const categoryColors = [
  { icon: "✦", color: "bg-rose-100 text-rose-800" },
  { icon: "☼", color: "bg-amber-100 text-amber-800" },
  { icon: "↗", color: "bg-emerald-100 text-emerald-800" },
  { icon: "☁", color: "bg-sky-100 text-sky-800" },
  { icon: "★", color: "bg-purple-100 text-purple-800" },
  { icon: "◈", color: "bg-indigo-100 text-indigo-800" },
  { icon: "◉", color: "bg-teal-100 text-teal-800" },
  { icon: "◫", color: "bg-fuchsia-100 text-fuchsia-800" },
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

function BookCard({ book, appName = "" }) {
  const [title, author, price, cover, label, originalPrice] = book;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return <article className="group min-w-0 rounded-2xl border border-stone-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
    <div className={`relative flex aspect-[3/4] items-end overflow-hidden rounded-xl bg-gradient-to-br ${cover} p-4 text-white shadow-inner`}>
      <span className="absolute right-2 top-2 rounded-full bg-white/95 px-2 py-1 text-[10px] font-bold text-stone-900">{label}</span>
      <div className="w-full border-l border-white/50 pl-3"><p className="text-[10px] font-medium uppercase tracking-[.18em] text-white/70">Koleksi {appName}</p><h3 className="mt-2 text-lg font-black leading-tight">{title}</h3></div>
    </div>
    <div className="px-1 pb-1 pt-4"><h3 className="truncate font-bold" title={title}>{title}</h3><p className="mt-1 truncate text-sm text-stone-500">{author}</p><div className="mt-3 flex flex-wrap items-baseline gap-x-2"><span className="font-bold text-orange-700">{price}</span>{originalPrice && <span className="text-xs text-stone-400 line-through">{originalPrice}</span>}</div><a href={`/buku/${slug}`} className="mt-3 inline-flex text-xs font-bold text-blue-700 hover:text-blue-900">Lihat detail →</a></div>
  </article>;
}


function DynamicBookCard({ book, label, coverClass, appName = "" }) {
  const title = book.title;
  const author = book.author || "Tanpa Penulis";
  
  const formatter = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });
  const price = formatter.format(book.price);
  const originalPrice = book.original_price ? formatter.format(book.original_price) : null;
  
  const slug = book.slug;
  const coverUrl = book.cover_image_url;
  
  // Calculate discount label if not provided
  if (!label && book.discount_type === 'percentage') {
    label = "-" + parseInt(book.discount_value) + "%";
  } else if (!label && book.discount_type === 'fixed') {
    label = "Promo";
  }

  return <article className="group min-w-0 rounded-2xl border border-stone-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
    <div className={`relative flex aspect-[3/4] items-end overflow-hidden rounded-xl ${!coverUrl ? 'bg-gradient-to-br ' + (coverClass || 'from-rose-500 to-orange-300') : 'bg-slate-100'} p-0 text-white shadow-inner`}>
      {coverUrl ? <img src={coverUrl} alt={title} className="w-full h-full object-cover" /> : <div className="p-4 w-full h-full flex flex-col justify-end"><div className="w-full border-l border-white/50 pl-3"><p className="text-[10px] font-medium uppercase tracking-[.18em] text-white/70">Koleksi {appName}</p><h3 className="mt-2 text-lg font-black leading-tight">{title}</h3></div></div>}
      {label && <span className="absolute right-2 top-2 rounded-full bg-white/95 px-2 py-1 text-[10px] font-bold text-stone-900 shadow-sm">{label}</span>}
    </div>
    <div className="px-1 pb-1 pt-4"><h3 className="truncate font-bold" title={title}>{title}</h3><p className="mt-1 truncate text-sm text-stone-500">{author}</p><div className="mt-3 flex flex-wrap items-baseline gap-x-2"><span className="font-bold text-orange-700">{price}</span>{originalPrice && <span className="text-xs text-stone-400 line-through">{originalPrice}</span>}</div><Link href={`/buku/${slug}`} className="mt-3 inline-flex text-xs font-bold text-blue-700 hover:text-blue-900">Lihat detail →</Link></div>
  </article>;
}

function Shelf({ shelf, dynamicBooks, appName = "" }) {
  const booksToRender = dynamicBooks && dynamicBooks.length > 0 ? dynamicBooks : shelf.books;
  
  let link = "/cari";
  if (shelf.id === "terbaru") link = "/cari?sort=newest";
  else if (shelf.id === "terlaris") link = "/cari?sort=bestseller";
  else if (shelf.id === "promo") link = "/cari?sort=promo";

  return <section id={shelf.id} className="scroll-mt-24 py-10 sm:py-14"><div className="mb-7 flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-orange-700">{shelf.eyebrow}</p><h2 className="mt-2 text-2xl font-black tracking-tight text-stone-950 sm:text-3xl">{shelf.title}</h2><p className="mt-2 text-sm text-stone-600">{shelf.description}</p></div><Link href={link} className="text-sm font-bold text-orange-700">Lihat semua →</Link></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">{booksToRender === dynamicBooks ? booksToRender.map(book => <DynamicBookCard book={book} key={book.id} appName={appName} />) : booksToRender.map(book => <BookCard book={book} key={book[0]} appName={appName} />)}</div></section>;
}

function FloatingOrderButtons({ cartCount }) {
  return <MarketplaceFloatingButtons cartCount={cartCount} showCart />;
}

function SocialLinks({ settings }) {
  const links = [
    ["YouTube", settings.youtube_url, "bg-red-600", <svg key="yt" viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2 12a29 29 0 0 0 .4 4.8 2.8 2.8 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.8 2.8 0 0 0 2-2A29 29 0 0 0 22 12a29 29 0 0 0-.4-4.8ZM10 15.4V8.6l6 3.4-6 3.4Z"/></svg>],
    ["WhatsApp", settings.whatsapp_url, "bg-[#25d366]", <span key="wa" className="text-lg">☎</span>],
    ["Facebook", settings.facebook_url, "bg-[#1877f2]", <span key="fb" className="text-xl font-black">f</span>],
    ["Instagram", settings.instagram_url, "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400", <svg key="ig" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" className="fill-current stroke-none"/></svg>],
  ];
  return <div className="mt-5 flex flex-wrap gap-2" aria-label="Media sosial">{links.map(([name, href, color, icon]) => <a key={name} href={href || "#"} target={href ? "_blank" : undefined} rel={href ? "noreferrer" : undefined} onClick={(event) => { if (!href) event.preventDefault(); }} aria-label={name} title={href ? name : `${name} belum diatur`} className={`grid h-10 w-10 place-items-center rounded-full text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${href ? color : "bg-slate-300"}`}>{icon}</a>)}</div>;
}

function AccountMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const initial = user.name?.trim().slice(0, 1).toUpperCase() || "A";
  const accountLink = user.is_admin ? "/admin" : "/akun";
  return <div className="relative"><button onClick={() => setOpen(!open)} className="flex items-center gap-2 rounded-full border-2 border-blue-700 bg-white p-1.5 text-sm font-bold text-slate-700 shadow-sm lg:py-1.5 lg:pl-2 lg:pr-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-blue-600 text-white">{initial}</span><span className="hidden max-w-28 truncate lg:block">{user.name}</span><span className="hidden text-xs text-slate-500 lg:block">⌄</span></button>{open && <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/15"><div className="border-b border-slate-100 px-3 py-2"><b className="block truncate text-sm text-slate-800">{user.name}</b><small className="block truncate text-slate-500">{user.email}</small></div><a href={accountLink} className="mt-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50">👤 {user.is_admin ? "Dashboard Admin" : "Akun Saya"}</a>{!user.is_admin && <a href="/akun/pesanan" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50">📦 Pesanan Saya</a>}<button onClick={onLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold text-red-600 hover:bg-red-50">↪ Keluar</button></div>}</div>;
}


function CategorySlider({ categories, categoryColors }) {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const isDown = useRef(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  
  useEffect(() => {
    if (categories.length === 0 || isHovered) return;
    const interval = setInterval(() => {
      if (containerRef.current) {
        const c = containerRef.current;
        if (c.scrollLeft + c.clientWidth >= c.scrollWidth - 10) {
          c.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          c.scrollBy({ left: c.children[0].clientWidth + 16, behavior: 'smooth' });
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [categories.length, isHovered]);

  const handlePrev = (e) => {
    e.preventDefault();
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -(containerRef.current.children[0].clientWidth + 16), behavior: 'smooth' });
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: containerRef.current.children[0].clientWidth + 16, behavior: 'smooth' });
    }
  };

  const onMouseDown = (e) => {
    isDown.current = true;
    isDragging.current = false;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
    containerRef.current.style.scrollSnapType = 'none';
    containerRef.current.style.scrollBehavior = 'auto';
  };
  const onMouseLeave = () => {
    isDown.current = false;
    if (containerRef.current) {
      containerRef.current.style.scrollSnapType = 'x mandatory';
      containerRef.current.style.scrollBehavior = 'smooth';
    }
  };
  const onMouseUp = () => {
    isDown.current = false;
    if (containerRef.current) {
      containerRef.current.style.scrollSnapType = 'x mandatory';
      containerRef.current.style.scrollBehavior = 'smooth';
    }
  };
  const onMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    isDragging.current = true;
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };
  const onClickLink = (e) => {
    if (isDragging.current) e.preventDefault();
  };

  if (categories.length === 0) return null;

  return (
    <div 
      className="relative group" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-2 cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((cat, i) => { 
          const style = categoryColors[i % categoryColors.length]; 
          return (
            <Link 
              href={`/cari?kategori=${cat.slug}`} 
              onClick={onClickLink}
              className="group shrink-0 w-40 sm:w-48 lg:w-56 snap-center snap-always rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md select-none" 
              key={cat.id}
            >
              <span className={`grid h-11 w-11 place-items-center rounded-xl text-xl ${style.color}`}>{style.icon}</span>
              <h3 className="mt-5 font-bold truncate" title={cat.name}>{cat.name}</h3>
              <p className="mt-1 text-sm text-stone-500">Jelajahi koleksi →</p>
            </Link>
          );
        })}
      </div>
      
      <button 
        type="button"
        onClick={handlePrev}
        className="absolute left-1 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/90 backdrop-blur text-stone-900 shadow-lg border border-stone-200 opacity-100 sm:opacity-0 transition-all group-hover:opacity-100 hover:bg-white hover:scale-110 z-20"
        aria-label="Sebelumnya"
      >
        ←
      </button>
      <button 
        type="button"
        onClick={handleNext}
        className="absolute right-1 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/90 backdrop-blur text-stone-900 shadow-lg border border-stone-200 opacity-100 sm:opacity-0 transition-all group-hover:opacity-100 hover:bg-white hover:scale-110 z-20"
        aria-label="Selanjutnya"
      >
        →
      </button>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [authLoading, setAuthLoading] = useState(true);
  const [health, setHealth] = useState(null);
  const [healthError, setHealthError] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [promoBooks, setPromoBooks] = useState(null);
  const [latestBooks, setLatestBooks] = useState(null);
  const [bestsellerBooks, setBestsellerBooks] = useState(null);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [dbCategories, setDbCategories] = useState([]);
  const [marketplace, setMarketplace] = useState({ store_address: "", hero_eyebrow: "", hero_title: "", hero_description: "", recommendation_label: "", recommendation_book_title: "", recommendation_book_subtitle: "", recommendation_kicker: "", recommendation_title: "", shopee_url: "", tokopedia_url: "", youtube_url: "", whatsapp_url: "", facebook_url: "", instagram_url: "" });
  
  useEffect(() => {
    try {
      const c = JSON.parse(localStorage.getItem("app_settings") || "{}");
      setMarketplace(prev => ({ ...prev, ...c }));
    } catch {}
  }, []);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/health`).then(async (response) => { if (!response.ok) throw new Error("Health check failed"); return response.json(); }).then(({ data }) => setHealth(data)).catch(() => setHealthError(true));
    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/categories`).then(r => r.ok ? r.json() : null).then(p => { if (p?.data) setDbCategories(p.data); }).catch(() => null);
    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/settings`, { headers: { Accept: "application/json" } }).then((response) => response.ok ? response.json() : null).then((payload) => { if (payload?.data) localStorage.setItem("app_settings", JSON.stringify(payload.data)); setMarketplace((old) => ({ ...old, ...(payload?.data || {}) })); }).catch(() => null);
    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/books?sort=promo&per_page=4`).then((r) => r.ok ? r.json() : null).then((payload) => payload?.data && setPromoBooks(payload.data)).catch(() => null);
    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/books?sort=newest&per_page=4`).then((r) => r.ok ? r.json() : null).then((payload) => payload?.data && setLatestBooks(payload.data)).catch(() => null);
    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/books?sort=bestseller&per_page=4`).then((r) => r.ok ? r.json() : null).then((payload) => payload?.data && setBestsellerBooks(payload.data)).catch(() => null);
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
    if (!token) { setAuthLoading(false); return; }
    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/auth/me`, { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } })
      .then(async (response) => { if (!response.ok) throw new Error("Sesi tidak valid"); return response.json(); })
      .then((response) => { setUser(response.data); setAuthLoading(false); })
      .catch(() => { localStorage.removeItem("token"); setAuthLoading(false); });
  }, []);

  const confirmLogout = () => { localStorage.removeItem("token"); setUser(null); setLogoutOpen(false); };

  function SocialLinks() {
    return <div className="mt-5 flex gap-4 text-stone-400"><a href="#" className="hover:text-stone-900">Twitter</a><a href="#" className="hover:text-stone-900">Instagram</a><a href="#" className="hover:text-stone-900">Facebook</a></div>;
  }

  const appName = marketplace.app_name || "";
  const appLogo = marketplace.app_logo;
  const logoEl = appLogo ? <img src={appLogo} alt={appName} className="h-9 w-9 rounded-xl object-contain" /> : <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-700 text-lg text-white">{(appName || " ")[0].toUpperCase()}</span>;
  
  return <main className="min-h-screen bg-[#fffdf8] text-stone-900">
    <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-[#fffdf8]/95 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8"><Link href="/" className="flex shrink-0 items-center gap-2 font-black">{logoEl}<span className="text-xl">{appName}</span></Link><nav className="hidden items-center gap-6 text-sm font-semibold text-stone-600 lg:flex"><Link href="#kategori" className="hover:text-stone-900">Kategori</Link><Link href="#terbaru" className="hover:text-stone-900">Buku Baru</Link><Link href="#promo" className="hover:text-stone-900">Promo</Link></nav><form onSubmit={(e) => { e.preventDefault(); const q = new FormData(e.currentTarget).get("q")?.toString().trim(); router.push(`/cari${q ? `?q=${encodeURIComponent(q)}` : ""}`); }} className="hidden max-w-sm flex-1 items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-stone-400 shadow-sm lg:flex">⌕<input name="q" className="w-full bg-transparent outline-none" placeholder="Cari judul, penulis, atau ISBN" /></form><div className="hidden items-center gap-3 lg:flex"><Link href="/keranjang" className="relative grid h-10 w-10 place-items-center rounded-full border border-blue-200 bg-white text-lg text-blue-700">🛒<span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-blue-700 px-1 text-[9px] font-black text-white">{cartCount}</span></Link>{authLoading ? <div className="h-9 w-24 animate-pulse rounded-full bg-stone-200"></div> : user ? <div className="relative"><button onClick={() => setAccountOpen(!accountOpen)} className="flex items-center gap-2 rounded-full border-2 border-blue-700 bg-white py-1.5 pl-2 pr-3 text-sm font-bold text-slate-700"><span className="grid h-8 w-8 place-items-center rounded-full bg-blue-600 text-white">{user.name?.slice(0, 1).toUpperCase()}</span><span className="max-w-28 truncate">{user.name}</span><span>⌄</span></button>{accountOpen && <div className="absolute right-0 top-12 z-50 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"><a href={user.is_admin ? "/admin" : "/akun"} className="block rounded-xl px-3 py-3 text-sm font-semibold hover:bg-blue-50">👤 {user.is_admin ? "Dashboard Admin" : "Akun Saya"}</a>{!user.is_admin && <a href="/akun/pesanan" className="block rounded-xl px-3 py-3 text-sm font-semibold hover:bg-blue-50">📦 Pesanan Saya</a>}<button onClick={() => { setAccountOpen(false); setLogoutOpen(true); }} className="w-full rounded-xl px-3 py-3 text-left text-sm font-bold text-red-600 hover:bg-red-50">↪ Keluar</button></div>}</div> : <><Link href="/auth/login" className="text-sm font-bold text-stone-700">Masuk</Link><Link href="/auth/register" className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white">Daftar</Link></>}</div></div></header>
    <StoreMobileControls user={user} cartCount={cartCount} onLogout={() => { setAccountOpen(false); setLogoutOpen(true); }} />
    <section id="beranda" className="border-b border-stone-200 bg-[radial-gradient(circle_at_80%_10%,#fed7aa,transparent_32%),radial-gradient(circle_at_5%_90%,#fde68a,transparent_28%)]"><div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:py-24"><div><p className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-[.18em] text-orange-800">{marketplace.hero_eyebrow || "Temukan cerita berikutnya"}</p><h1 className="mt-5 max-w-2xl text-4xl font-black leading-[1.04] tracking-tight text-stone-950 sm:text-6xl">{marketplace.hero_title || "Buku yang baik, selalu menemukan pembacanya."}</h1><p className="mt-5 max-w-xl text-base leading-7 text-stone-600 sm:text-lg">{marketplace.hero_description || "Pilihan buku untuk menemani rasa ingin tahu, ide besar, dan waktu tenangmu di rumah."}</p><form className="mt-8 flex max-w-xl gap-2 rounded-2xl border border-stone-200 bg-white p-2 shadow-lg shadow-orange-950/5" onSubmit={(event) => { event.preventDefault(); const q = new FormData(event.currentTarget).get("q")?.toString().trim(); router.push( `/cari${q ? `?q=${encodeURIComponent(q)}` : ""}`); }}><input name="q" className="min-w-0 flex-1 px-3 text-sm outline-none" placeholder="Mau membaca apa hari ini?" aria-label="Cari koleksi buku" /><button className="shrink-0 rounded-xl bg-orange-700 px-4 py-3 text-sm font-bold text-white">Cari buku</button></form><div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-stone-600"><span>✓ Pilihan kurasi</span><span>✓ Promo mingguan</span><span>✓ Pengiriman ke seluruh Indonesia</span></div></div><div className="relative mx-auto w-full max-w-md"><div className="relative rounded-[2rem] bg-stone-950 p-6 shadow-2xl sm:p-8"><p className="text-xs font-bold uppercase tracking-[.25em] text-orange-300">{marketplace.recommendation_label || "Rekomendasi hari ini"}</p><div className="mt-7 grid grid-cols-[.8fr_1.2fr] items-end gap-5"><div className="aspect-[3/4] rounded-lg bg-gradient-to-br from-orange-300 via-red-600 to-stone-950 p-4 text-white shadow-xl"><p className="text-[9px] font-bold uppercase tracking-[.2em] text-white/70">Novel pilihan</p><p className="mt-5 whitespace-pre-line text-xl font-black leading-none">{marketplace.recommendation_book_title || "Jendela Masa Depan"}</p><p className="mt-8 text-xs">{marketplace.recommendation_book_subtitle || "sebuah cerita untuk pulang"}</p></div><div><p className="text-sm text-stone-400">{marketplace.recommendation_kicker || "Baca, bayangkan, tumbuh."}</p><h2 className="mt-2 text-3xl font-black leading-tight text-white">{marketplace.recommendation_title || "Satu halaman bisa mengubah harimu."}</h2><a href="#terbaru" className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-stone-950">Mulai jelajahi →</a></div></div></div></div></div></section>
    
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><section id="kategori" className="scroll-mt-24 py-12 sm:py-16"><div className="mb-7"><p className="text-xs font-bold uppercase tracking-[.2em] text-orange-700">Telusuri minatmu</p><h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Kategori pilihan</h2></div><CategorySlider categories={dbCategories} categoryColors={categoryColors} /></section>{shelves.map((shelf) => <Shelf shelf={shelf} key={shelf.id} appName={appName} dynamicBooks={shelf.id === "terbaru" ? latestBooks : shelf.id === "terlaris" ? bestsellerBooks : null} />)}</div>
    
    <section id="promo" className="scroll-mt-24 bg-stone-950 py-12 text-white sm:py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-orange-300">Harga terbaik</p><h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Diskon pilihan</h2><p className="mt-2 text-sm text-stone-300">Buku bagus, alasan lebih banyak untuk membaca.</p></div><Link href="/cari?sort=promo" className="rounded-full border border-orange-400/50 px-4 py-2 text-sm font-bold text-orange-200 hover:bg-orange-900/50 transition cursor-pointer">Promo terbatas ➔</Link></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">{promoBooks && promoBooks.length > 0 ? promoBooks.map((book) => <DynamicBookCard book={book} key={book.id} />) : discounts.map((book) => <BookCard book={book} key={book[0]} />)}</div></div></section>
    
    <section className="border-b border-stone-200 bg-orange-100"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-4 py-10 sm:px-6 md:flex-row md:items-center lg:px-8"><div><p className="text-xl font-black text-stone-950">Jangan sampai kehabisan cerita bagus.</p><p className="mt-1 text-sm text-stone-600">Dapatkan kabar koleksi dan promo pilihan setiap minggu.</p></div><form className="flex w-full max-w-md gap-2" onSubmit={(event) => event.preventDefault()}><input className="min-w-0 flex-1 rounded-xl border border-orange-200 bg-white px-4 py-3 text-sm outline-none" type="email" placeholder="Email kamu" aria-label="Email kamu" /><button className="rounded-xl bg-stone-950 px-4 py-3 text-sm font-bold text-white">Berlangganan</button></form></div></section>
    <footer><div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8"><div><div className="flex items-center gap-2 font-black text-stone-950">{appLogo ? <img src={appLogo} alt={appName} className="h-8 w-8 rounded-lg object-contain" /> : <span className="grid h-8 w-8 place-items-center rounded-lg bg-orange-700 text-sm text-white">{(appName || " ")[0].toUpperCase()}</span>} {appName}</div><p className="mt-4 max-w-sm whitespace-pre-line text-sm leading-6 text-stone-600">{marketplace.store_address || "Alamat toko belum diatur."}</p><SocialLinks settings={marketplace}/><p className={`mt-5 text-xs font-semibold ${health ? "text-emerald-700" : healthError ? "text-rose-700" : "text-amber-700"}`}>{health ? `● ${health.service} siap` : healthError ? "● API belum dapat dihubungi" : "● Memeriksa layanan…"}</p></div><div><h2 className="font-bold">Jelajahi</h2><div className="mt-4 grid gap-3 text-sm text-stone-600"><a href="#kategori">Kategori</a><a href="#terbaru">Buku baru</a><a href="#terlaris">Terlaris</a><a href="#promo">Promo</a></div></div><div><h2 className="font-bold">Bantuan</h2><div className="mt-4 grid gap-3 text-sm text-stone-600"><a href="#">Tentang kami</a><a href="#">Cara belanja</a><a href="#">Pengiriman</a><a href="#">Hubungi kami</a></div></div></div><div className="border-t border-stone-200"><p className="mx-auto max-w-7xl px-4 py-5 text-xs text-stone-500 sm:px-6 lg:px-8">© 2026 {appName}. Dibuat untuk pembaca yang selalu ingin tahu.</p></div></footer>
    <FloatingOrderButtons cartCount={cartCount} marketplace={marketplace} />
    <LogoutConfirmModal open={logoutOpen} onCancel={() => setLogoutOpen(false)} onConfirm={confirmLogout}/>
  </main>;
}
