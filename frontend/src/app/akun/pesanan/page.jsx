"use client";

/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import AccountMobileMenu from "../../../components/AccountMobileMenu";

const money = (value) => `Rp${Number(value || 0).toLocaleString("id-ID")}`;
const statusText = { pending_payment: "Menunggu pembayaran", paid: "Sudah dibayar", processing: "Diproses", packed: "Dikemas", shipped: "Dikirim", completed: "Selesai", cancelled: "Dibatalkan", refunded: "Dikembalikan" };
const statusStyle = { completed: "bg-emerald-50 text-emerald-700", cancelled: "bg-red-50 text-red-700", shipped: "bg-cyan-50 text-cyan-700", paid: "bg-blue-50 text-blue-700", pending_payment: "bg-amber-50 text-amber-700" };

export default function OrdersPage() {
  const [orders, setOrders] = useState(null);
  const [cart, setCart] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { window.location.href = "/auth/login"; return; }
    const headers = { Authorization: `Bearer ${token}`, ...(localStorage.getItem("cart_token") ? { "X-Cart-Token": localStorage.getItem("cart_token") } : {}) };
    Promise.all([api("/account/orders", { headers }), api("/cart", { headers })])
      .then(([orderResponse, cartResponse]) => {
        setOrders(Array.isArray(orderResponse.data) ? orderResponse.data : orderResponse.data?.data || []);
        setCart(cartResponse.data || { items: [], subtotal: 0 });
      })
      .catch(() => { setOrders([]); setCart({ items: [], subtotal: 0 }); setError("Data pesanan belum dapat dimuat."); });
  }, []);

  const cartItems = cart?.items || [];
  return <main className="flex min-h-screen flex-col bg-[#f4f8ff] text-slate-800">
    <header className="border-b border-blue-100 bg-white"><div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4"><a href="/" className="font-black text-blue-950">📚 BukuPagi</a><AccountMobileMenu active="orders"/><a href="/akun" className="hidden text-sm font-bold text-blue-700 lg:block">← Dashboard</a></div></header>
    <div className="mx-auto grid w-full max-w-7xl flex-1 gap-6 px-5 py-7 lg:grid-cols-[235px_1fr]"><Sidebar/><section className="min-w-0"><p className="text-sm font-semibold text-blue-700">Akun pelanggan</p><h1 className="mt-1 text-3xl font-black">Pesanan Saya</h1><p className="mt-2 text-sm text-slate-500">Pantau keranjang yang belum checkout dan seluruh riwayat pembelian Anda.</p>
      <section className="mt-7 overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-100 bg-gradient-to-r from-blue-950 to-blue-700 px-6 py-5 text-white"><div><h2 className="text-lg font-black">🛒 Belum checkout</h2><p className="mt-1 text-xs text-blue-100">Buku yang masih tersimpan di keranjang belanja.</p></div>{cartItems.length > 0 && <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold">{cartItems.reduce((sum, item) => sum + Number(item.quantity), 0)} buku</span>}</div>
        {!cart ? <p className="p-6 text-sm text-slate-500">Memuat keranjang…</p> : cartItems.length ? <div className="p-5"><div className="divide-y divide-slate-100">{cartItems.map((item) => <article key={item.id} className="flex items-center gap-4 py-4 first:pt-0"><span className="grid h-16 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-700 to-cyan-500 font-black text-white">B</span><div className="min-w-0 flex-1"><b className="block truncate text-slate-900">{item.title}</b><p className="mt-1 text-sm text-slate-500">{money(item.unit_price)} × {item.quantity}</p></div><b className="text-blue-700">{money(item.subtotal)}</b></article>)}</div><div className="mt-2 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-blue-50 p-4"><div><small className="text-slate-500">Subtotal keranjang</small><p className="text-xl font-black text-blue-800">{money(cart.subtotal)}</p></div><div className="flex gap-2"><a href="/keranjang" className="rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm font-bold text-blue-700">Lihat keranjang</a><a href="/keranjang" className="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-bold text-white">Pilih di keranjang</a></div></div></div> : <div className="p-8 text-center"><p className="text-3xl">🛍️</p><b className="mt-3 block">Tidak ada belanja yang tertunda</b><p className="mt-1 text-sm text-slate-500">Keranjang Anda saat ini kosong.</p><a href="/cari" className="mt-4 inline-flex rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-bold text-white">Cari buku</a></div>}
      </section>

      <section className="mt-7"><div className="flex items-end justify-between"><div><h2 className="text-xl font-black">Riwayat pembelian</h2><p className="mt-1 text-sm text-slate-500">Daftar pesanan yang pernah dibuat.</p></div>{orders && <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">{orders.length} pesanan</span>}</div>
        <div className="mt-4 space-y-4">{!orders ? <div className="rounded-2xl bg-white p-6 text-sm text-slate-500">Memuat riwayat pembelian…</div> : orders.length ? orders.map((order) => <article key={order.id} className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm"><div className="flex flex-wrap items-center gap-3 border-b border-slate-100 px-5 py-4"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50">📦</span><div className="min-w-[180px] flex-1"><b className="block text-slate-900">{order.number}</b><small className="text-slate-500">{new Date(order.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</small></div><span className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyle[order.status] || "bg-slate-100 text-slate-700"}`}>{statusText[order.status] || String(order.status).replaceAll("_", " ")}</span><b className="text-blue-800">{money(order.grand_total)}</b></div><div className="px-5 py-4">{order.items?.map((item) => <div key={item.id} className="flex justify-between gap-4 py-1 text-sm"><span className="truncate text-slate-600">{item.title} × {item.quantity}</span><b>{money(item.subtotal)}</b></div>)}</div></article>) : <div className="rounded-2xl bg-white p-10 text-center"><p className="text-3xl">📭</p><b className="mt-3 block">Belum ada riwayat pembelian</b><p className="mt-1 text-sm text-slate-500">Pesanan yang sudah dibuat akan muncul di sini.</p></div>}</div>
      </section>{error && <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>}</section></div><Footer/>
  </main>;
}

function Sidebar(){return <aside className="hidden h-[280px] self-start rounded-3xl bg-gradient-to-b from-blue-950 to-blue-800 p-4 text-white shadow-xl lg:block"><p className="px-3 pb-3 text-[11px] font-bold uppercase tracking-[.18em] text-blue-300">Menu akun</p><nav className="space-y-1"><a href="/akun" className="block rounded-xl px-3 py-3 text-sm text-blue-100">▦ Dashboard</a><a href="/akun/profil" className="block rounded-xl px-3 py-3 text-sm text-blue-100">👤 Profil</a><a href="/akun/pesanan" className="block rounded-xl bg-white/15 px-3 py-3 text-sm font-bold">▣ Pesanan saya</a><a href="/" className="block rounded-xl px-3 py-3 text-sm text-blue-100">⌂ Kembali berbelanja</a></nav></aside>}
function Footer(){return <footer className="mt-auto border-t border-blue-100 bg-white"><div className="mx-auto flex max-w-7xl justify-between px-5 py-6 text-sm text-slate-500"><span>© 2026 BukuPagi.</span><span>Bantuan · Pengiriman</span></div></footer>}
