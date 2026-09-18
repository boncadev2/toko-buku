"use client";

/* eslint-disable @next/next/no-html-link-for-pages */
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "../../lib/api";
import LogoutConfirmModal from "../../components/LogoutConfirmModal";

const rupiah = (value) => `Rp${Number(value || 0).toLocaleString("id-ID")}`;
const statusLabel = (status) => String(status || "diproses").replaceAll("_", " ");

export default function AccountPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { window.location.href = "/auth/login"; return; }
    api("/account", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => setData(response.data))
      .catch(() => setError("Sesi Anda sudah berakhir. Silakan masuk kembali."));
  }, []);

  const logout = () => setLogoutOpen(true);
  const confirmLogout = () => { localStorage.removeItem("token"); window.location.href = "/"; };
  if (error) return <main className="grid min-h-screen place-items-center bg-[#f4f8ff] p-6"><section className="w-full max-w-md rounded-[28px] bg-white p-8 text-center shadow-xl shadow-blue-950/5"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-red-50 text-2xl">!</div><h1 className="mt-5 text-xl font-black text-slate-900">Tidak dapat membuka akun</h1><p className="mt-2 text-sm text-slate-500">{error}</p><Link href="/auth/login" className="mt-6 inline-flex rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white">Masuk kembali</Link></section></main>;
  if (!data) return <main className="grid min-h-screen place-items-center bg-[#f4f8ff]"><div className="text-center"><div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-700"/><p className="mt-4 text-sm font-semibold text-slate-500">Menyiapkan dashboard Anda…</p></div></main>;

  const { user, summary, recent_orders: orders = [], addresses = [] } = data;
  const firstName = user.name?.split(" ")[0] || "Pelanggan";
  const cards = [["📦", "Total Pesanan", summary.orders_count], ["⚡", "Pesanan Aktif", summary.active_orders_count], ["💳", "Total Belanja", rupiah(summary.total_spent)]];

  return <main className="min-h-screen bg-[#f4f8ff] text-slate-800">
    <header className="border-b border-blue-100 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4"><Link href="/" className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-700 text-lg text-white">📚</span><span><b className="block text-lg leading-none text-blue-950">BukuPagi</b><small className="text-[10px] font-bold uppercase tracking-widest text-blue-500">Toko buku online</small></span></Link><button onClick={() => setMenuOpen(true)} aria-label="Buka menu akun" className="grid h-11 w-11 place-items-center rounded-xl bg-blue-900 text-2xl text-white shadow-lg lg:hidden">☰</button><div className="relative hidden lg:block"><button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-3 rounded-full border border-blue-200 bg-white py-1.5 pl-2 pr-3"><span className="text-right text-sm"><b className="block">{user.name}</b><small className="text-slate-500">{user.email}</small></span><span className="grid h-10 w-10 place-items-center rounded-full bg-blue-100 font-black text-blue-700">{firstName.slice(0, 1)}</span><span className="text-slate-500">⌄</span></button>{profileOpen && <div className="absolute right-0 top-14 z-50 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"><Link href="/akun" className="block rounded-xl px-3 py-3 text-sm font-semibold hover:bg-blue-50">👤 Akun Saya</Link><Link href="/akun/pesanan" className="block rounded-xl px-3 py-3 text-sm font-semibold hover:bg-blue-50">📦 Pesanan Saya</Link><button onClick={logout} className="w-full rounded-xl px-3 py-3 text-left text-sm font-bold text-red-600 hover:bg-red-50">↪ Keluar</button></div>}</div></div></header>
    {menuOpen && <div className="fixed inset-0 z-50 lg:hidden"><button aria-label="Tutup menu" onClick={() => setMenuOpen(false)} className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm"/><aside className="relative h-full w-[82%] max-w-[300px] bg-gradient-to-b from-blue-950 to-blue-800 p-5 text-white shadow-2xl"><div className="mb-7 flex items-center justify-between"><b className="text-lg">Menu Akun</b><button onClick={() => setMenuOpen(false)} className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-xl">×</button></div><AccountNav/></aside></div>}
    <div className="mx-auto grid max-w-7xl gap-6 px-5 py-7 lg:grid-cols-[235px_1fr]">
      <aside className="hidden h-[280px] self-start rounded-3xl bg-gradient-to-b from-blue-950 to-blue-800 p-4 text-white shadow-xl shadow-blue-950/15 lg:block"><p className="px-3 pb-3 text-[11px] font-bold uppercase tracking-[.18em] text-blue-300">Menu akun</p><AccountNav/></aside>
      <section className="min-w-0"><div className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-800 via-blue-700 to-cyan-600 p-7 text-white shadow-xl shadow-blue-800/20"><p className="text-sm font-semibold text-blue-100">Selamat datang kembali,</p><h1 className="mt-1 text-3xl font-black sm:text-4xl">Halo, {firstName}! 👋</h1><p className="mt-3 max-w-xl text-sm leading-6 text-blue-100">Kelola pesanan dan informasi akun Anda dari satu tempat.</p><Link href="/cari" className="mt-6 inline-flex rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-blue-800 shadow">Cari buku favorit</Link></div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">{cards.map(([icon, label, value]) => <article key={label} className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-lg">{icon}</span><p className="mt-4 text-sm text-slate-500">{label}</p><p className="mt-1 text-2xl font-black text-slate-900">{value}</p></article>)}</div>
        <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_.85fr]"><section id="pesanan" className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-lg font-black">Pesanan terbaru</p><p className="mt-1 text-sm text-slate-500">Pantau status belanja Anda.</p></div><span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">{orders.length} pesanan</span></div>{orders.length ? <div className="mt-5 space-y-3">{orders.slice(0, 4).map((order) => <article key={order.id} className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-100 p-4"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50">📦</span><div className="min-w-[145px] flex-1"><b className="block text-sm text-slate-800">{order.number}</b><small className="text-slate-500">{new Date(order.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</small></div><span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold capitalize text-amber-700">{statusLabel(order.status)}</span><b className="text-sm text-slate-800">{rupiah(order.grand_total)}</b></article>)}</div> : <div className="mt-5 rounded-2xl bg-slate-50 px-5 py-9 text-center"><p className="text-3xl">🛍️</p><b className="mt-3 block">Belum ada pesanan</b><p className="mt-1 text-sm text-slate-500">Yuk, temukan buku pilihanmu hari ini.</p><Link href="/cari" className="mt-4 inline-block text-sm font-bold text-blue-700">Mulai belanja →</Link></div>}</section>
          <section id="alamat" className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm"><p className="text-lg font-black">Alamat pengiriman</p><p className="mt-1 text-sm text-slate-500">Alamat utama untuk pesanan Anda.</p>{addresses.length ? <div className="mt-5 rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-slate-600"><b className="block text-slate-800">{addresses[0].recipient_name || user.name}</b><p>{addresses[0].phone}</p><p>{addresses[0].address}, {addresses[0].city}</p></div> : <div className="mt-5 rounded-2xl border border-dashed border-blue-200 p-5 text-center"><p className="text-2xl">⌖</p><p className="mt-2 text-sm text-slate-500">Belum ada alamat tersimpan.</p><button className="mt-3 text-sm font-bold text-blue-700">+ Tambah alamat</button></div>}<div className="mt-6 rounded-2xl bg-cyan-50 p-4"><b className="text-sm text-cyan-900">Butuh bantuan?</b><p className="mt-1 text-xs leading-5 text-cyan-800">Tim BukuPagi siap membantu pesanan dan pengiriman Anda.</p><Link href="/info/kontak" className="mt-3 inline-block text-sm font-bold text-cyan-700">Hubungi kami →</Link></div></section></div>
      </section>
    </div><LogoutConfirmModal open={logoutOpen} onCancel={() => setLogoutOpen(false)} onConfirm={confirmLogout}/><footer className="border-t border-blue-100 bg-white"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-6 text-sm text-slate-500"><span>© 2026 BukuPagi. Semua hak dilindungi.</span><div className="flex gap-4"><Link href="/info/tentang">Tentang</Link><Link href="/info/kontak">Bantuan</Link><Link href="/info/pengiriman">Pengiriman</Link></div></div></footer>
  </main>;
}

function AccountNav() {
  return <nav className="space-y-1"><Link href="/akun" className="flex items-center gap-3 rounded-xl bg-white/15 px-3 py-3 text-sm font-bold">▦ Dashboard</Link><Link href="/akun/profil" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-blue-100 hover:bg-white/10">👤 Profil</Link><Link href="/akun/pesanan" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-blue-100 hover:bg-white/10">▣ Pesanan saya</Link><Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-blue-100 hover:bg-white/10">⌂ Kembali berbelanja</Link></nav>;
}
