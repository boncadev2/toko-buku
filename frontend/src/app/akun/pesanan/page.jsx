"use client";

/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "../../../lib/api";
import CustomerHeader from "../../../components/CustomerHeader";

const money = (value) => `Rp${Number(value || 0).toLocaleString("id-ID")}`;
const statusText = { pending_payment: "Menunggu pembayaran", manual_payment: "Menunggu bayar manual", paid: "Sudah dibayar", processing: "Diproses", packed: "Dikemas", shipped: "Dikirim", completed: "Selesai", cancelled: "Dibatalkan", refunded: "Dikembalikan" };
const statusStyle = { completed: "bg-emerald-50 text-emerald-700", cancelled: "bg-red-50 text-red-700", shipped: "bg-cyan-50 text-cyan-700", paid: "bg-blue-50 text-blue-700", pending_payment: "bg-amber-50 text-amber-700", manual_payment: "bg-orange-50 text-orange-700" };

export default function OrdersPage() {
  const [orders, setOrders] = useState(null);
  const [cart, setCart] = useState(null);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [settings, setSettings] = useState(() => { try { return typeof window !== "undefined" ? JSON.parse(localStorage.getItem("app_settings") || "{}") : {}; } catch { return {}; } });
  const appName = settings.app_name || "";
  const appLogo = settings.app_logo;
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

  

  const printInvoice = async (orderId) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/orders/${orderId}/invoice`, { headers: { Authorization: 'Bearer ' + token } });
      const { data } = await res.json();
      if (!data) return;

      const printWindow = window.open("", "_blank");
      printWindow.document.write(`<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Faktur ${data.invoice_number}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
    body { font-family: 'Inter', sans-serif; color: #334155; background: #f8fafc; margin: 0; padding: 40px; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .invoice-container { max-width: 800px; margin: 0 auto; background: #ffffff; padding: 50px; border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); }
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #e2e8f0; padding-bottom: 30px; margin-bottom: 40px; }
    .brand h1 { font-size: 28px; font-weight: 800; color: #1d4ed8; margin: 0 0 5px 0; letter-spacing: -0.5px; }
    .brand p { margin: 0; color: #64748b; font-size: 14px; }
    .invoice-details { text-align: right; }
    .invoice-details h2 { margin: 0 0 10px 0; font-size: 32px; color: #0f172a; text-transform: uppercase; letter-spacing: 2px; }
    .badge { display: inline-block; padding: 6px 12px; border-radius: 99px; font-size: 12px; font-weight: 600; text-transform: uppercase; background: #dcfce7; color: #166534; margin-bottom: 15px; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 40px; }
    .info-block h3 { font-size: 12px; text-transform: uppercase; color: #94a3b8; letter-spacing: 1px; margin: 0 0 10px 0; }
    .info-block p { margin: 0; line-height: 1.6; font-size: 14px; color: #0f172a; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
    th { background: #f1f5f9; color: #475569; font-weight: 600; text-transform: uppercase; font-size: 12px; padding: 15px; text-align: left; }
    td { padding: 15px; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
    td.amount { text-align: right; font-weight: 600; }
    th.amount { text-align: right; }
    .summary-box { width: 350px; margin-left: auto; background: #f8fafc; padding: 25px; border-radius: 12px; }
    .summary-line { display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 14px; color: #475569; }
    .summary-line.discount { color: #ef4444; }
    .summary-line.total { margin-top: 20px; padding-top: 20px; border-top: 2px dashed #cbd5e1; font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 0; }
    .footer { margin-top: 60px; text-align: center; color: #94a3b8; font-size: 13px; border-top: 1px solid #e2e8f0; padding-top: 20px; }
    @media print { body { background: #fff; padding: 0; } .invoice-container { box-shadow: none; padding: 0; } }
  </style>
</head>
<body>
  <div class="invoice-container">
    <div class="header">
      <div class="brand">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
          ${settings.app_logo ? '<img src="' + settings.app_logo + '" alt="Logo" style="max-height: 45px; display: block;">' : ''}
          <h1 style="margin: 0; font-size: 26px;">${settings.app_name || 'TOKO BUKU'}</h1>
        </div>
        <p style="white-space: pre-line">${settings.store_address || 'Alamat belum diatur'}\n${settings.contact_us || ''}</p>
      </div>
      <div class="invoice-details">
        <h2>FAKTUR</h2>
        <span class="badge">${data.status.replaceAll('_', ' ')}</span>
        <p style="margin:0; font-size:14px; color:#64748b">
          No. <strong>${data.invoice_number}</strong><br>
          Tgl. ${new Date().toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}
        </p>
      </div>
    </div>
    
    <div class="info-grid">
      <div class="info-block">
        <h3>Ditagihkan Kepada:</h3>
        <p><strong>${data.customer.name}</strong><br>${data.customer.phone}<br>${data.customer.address}</p>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Deskripsi Item</th>
          <th class="amount">Harga</th>
          <th style="text-align:center">Qty</th>
          <th class="amount">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        ${data.items.map(i => "<tr><td><strong>" + i.title + "</strong></td><td class='amount'>" + money(i.unit_price) + "</td><td style='text-align:center'>" + i.quantity + "</td><td class='amount'>" + money(i.subtotal) + "</td></tr>").join('')}
      </tbody>
    </table>

    <div class="summary-box">
      <div class="summary-line"><span>Subtotal Produk</span> <span>${money(data.subtotal)}</span></div>
      <div class="summary-line discount"><span>Diskon</span> <span>-${money(data.discount)}</span></div>
      <div class="summary-line"><span>Ongkos Kirim</span> <span>${money(data.shipping)}</span></div>
      <div class="summary-line total"><span>TOTAL</span> <span style="color:#1d4ed8">${money(data.total)}</span></div>
    </div>

    <div class="footer">
      <p>Terima kasih atas pesanan Anda! Jika Anda memiliki pertanyaan mengenai faktur ini, silakan hubungi kami.</p>
    </div>
  </div>
  <script>window.onload = function() { setTimeout(function(){ window.print(); }, 500); }</script>
</body>
</html>`);
      printWindow.document.close();
    } catch {
      alert("Gagal memuat faktur.");
    }
  };


  const cancelOrder = async (orderId) => {
    if (!confirm("Apakah Anda yakin ingin membatalkan pesanan ini?")) return;
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      setError("");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/orders/${orderId}/cancel`, { method: "POST", headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } });
      if (res.ok) {
        window.location.reload();
      } else {
        const payload = await res.json();
        setError(payload.message || "Gagal membatalkan pesanan.");
      }
    } catch {
      setError("Terjadi kesalahan saat membatalkan pesanan.");
    }
  };

  const payViaWA = async (orderId) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      setError("");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/orders/${orderId}/whatsapp`, { method: "POST", headers: { Authorization: `Bearer ${token}`, Accept: "application/json", "Content-Type": "application/json" } });
      const payload = await res.json();
      if (res.ok && payload.data?.url) {
        window.location.href = payload.data.url;
      } else {
        setError(payload.message || "Gagal memuat link WhatsApp.");
      }
    } catch {
      setError("Terjadi kesalahan saat memproses pesanan WhatsApp.");
    }
  };

  const payOrder = async (orderId) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      setError("");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/orders/${orderId}/payment/midtrans`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${token}` }
      });
      const payload = await res.json();
      if (res.ok && payload.data?.redirect_url) {
        window.location.href = payload.data.redirect_url;
      } else {
        setError(payload.message || "Gagal menghubungi layanan pembayaran.");
      }
    } catch {
      setError("Terjadi kesalahan saat memproses pembayaran.");
    }
  };

  const cartItems = cart?.items || [];
  return <main className="flex min-h-screen flex-col bg-[#f4f8ff] text-slate-800">
    <CustomerHeader active="orders"/>
    <div className="mx-auto grid w-full max-w-7xl flex-1 gap-6 px-5 py-7 lg:grid-cols-[235px_1fr]"><Sidebar/><section className="min-w-0"><p className="text-sm font-semibold text-blue-700">Akun pelanggan</p><h1 className="mt-1 text-3xl font-black">Pesanan Saya</h1><p className="mt-2 text-sm text-slate-500">Pantau keranjang yang belum checkout dan seluruh riwayat pembelian Anda.</p>
      <section className="mt-7 overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-100 bg-gradient-to-r from-blue-950 to-blue-700 px-6 py-5 text-white"><div><h2 className="text-lg font-black">🛒 Belum checkout</h2><p className="mt-1 text-xs text-blue-100">Buku yang masih tersimpan di keranjang belanja.</p></div>{cartItems.length > 0 && <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold">{cartItems.reduce((sum, item) => sum + Number(item.quantity), 0)} buku</span>}</div>
        {!cart ? <p className="p-6 text-sm text-slate-500">Memuat keranjang…</p> : cartItems.length ? <div className="p-5"><div className="divide-y divide-slate-100">{cartItems.map((item) => <article key={item.id} className="flex items-center gap-4 py-4 first:pt-0"><span className="grid h-16 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-700 to-cyan-500 font-black text-white">B</span><div className="min-w-0 flex-1"><b className="block truncate text-slate-900">{item.title}</b><p className="mt-1 text-sm text-slate-500">{money(item.unit_price)} × {item.quantity}</p></div><b className="text-blue-700">{money(item.subtotal)}</b></article>)}</div><div className="mt-2 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-blue-50 p-4"><div><small className="text-slate-500">Subtotal keranjang</small><p className="text-xl font-black text-blue-800">{money(cart.subtotal)}</p></div><div className="flex gap-2"><Link href="/keranjang" className="rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm font-bold text-blue-700">Lihat keranjang</Link><Link href="/keranjang" className="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-bold text-white">Pilih di keranjang</Link></div></div></div> : <div className="p-8 text-center"><p className="text-3xl">🛍️</p><b className="mt-3 block">Tidak ada belanja yang tertunda</b><p className="mt-1 text-sm text-slate-500">Keranjang Anda saat ini kosong.</p><Link href="/cari" className="mt-4 inline-flex rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-bold text-white">Cari buku</Link></div>}
      </section>

      
      <section className="mt-7">
        {!selectedOrder ? (
          <>
            <div className="flex items-end justify-between">
              <div><h2 className="text-xl font-black">Riwayat pembelian</h2><p className="mt-1 text-sm text-slate-500">Daftar pesanan yang pernah dibuat.</p></div>
              {orders && <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">{orders.length} pesanan</span>}
            </div>
            <div className="mt-4 space-y-4">
              {!orders ? (
                <div className="rounded-2xl bg-white p-6 text-sm text-slate-500">Memuat riwayat pembelian…</div>
              ) : orders.length ? (
                orders.map((order) => (
                  <article key={order.id} className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm hover:shadow-md transition cursor-pointer" onClick={() => setSelectedOrder(order)}>
                    <div className="flex flex-wrap items-center gap-3 px-5 py-4">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50">📦</span>
                      <div className="min-w-[180px] flex-1">
                        <b className="block text-slate-900">{order.number}</b>
                        <small className="text-slate-500">{new Date(order.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</small>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyle[order.status] || "bg-slate-100 text-slate-700"}`}>{statusText[order.status] || String(order.status).replaceAll("_", " ")}</span>
                      <b className="text-blue-800">{money(order.grand_total)}</b>
                      
                    </div>
                  </article>
                ))
              ) : (
                <div className="rounded-2xl bg-white p-10 text-center"><p className="text-3xl">📭</p><b className="mt-3 block">Belum ada riwayat pembelian</b><p className="mt-1 text-sm text-slate-500">Pesanan yang sudah dibuat akan muncul di sini.</p></div>
              )}
            </div>
          </>
        ) : (
          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
            <button onClick={() => setSelectedOrder(null)} className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900">
              ← Kembali ke daftar pesanan
            </button>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <p className="text-sm text-slate-500">Detail Pesanan</p>
                <h2 className="text-2xl font-black">{selectedOrder.number}</h2>
                <p className="text-sm mt-1 text-slate-500">{new Date(selectedOrder.created_at).toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" })}</p>
              </div>
              <div className="flex flex-col items-end gap-3"><span className={`rounded-full px-4 py-1.5 text-sm font-bold ${statusStyle[selectedOrder.status] || "bg-slate-100 text-slate-700"}`}>{statusText[selectedOrder.status] || String(selectedOrder.status).replaceAll("_", " ")}</span>{['paid', 'processing', 'packed', 'shipped', 'completed'].includes(selectedOrder.status) && <button onClick={() => printInvoice(selectedOrder.id)} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 flex items-center gap-2">📄 Unduh Faktur</button>}</div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-bold text-slate-900 mb-3">Produk yang dibeli</h3>
              <div className="space-y-3">
                {selectedOrder.items?.map((item) => (
                  <div key={item.id} className="flex justify-between items-center rounded-xl bg-slate-50 p-4">
                    <div>
                      <p className="font-bold text-slate-900">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.quantity} x {money(item.unit_price)}</p>
                    </div>
                    <b className="text-slate-900">{money(item.subtotal)}</b>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-blue-50 p-5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 text-sm">Total Harga Buku</span>
                <b className="text-slate-900 text-sm">{money(selectedOrder.subtotal)}</b>
              </div>
              {Number(selectedOrder.discount_total) > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 text-sm">Total Diskon</span>
                  <b className="text-emerald-600 text-sm">-{money(selectedOrder.discount_total)}</b>
                </div>
              )}
              {Number(selectedOrder.shipping_total) > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 text-sm">Ongkos Kirim</span>
                  <b className="text-slate-900 text-sm">{money(selectedOrder.shipping_total)}</b>
                </div>
              )}
              <hr className="border-blue-200/60 my-2" />
              <div className="flex justify-between items-center pt-1">
                <span className="font-bold text-slate-800">Total Pembayaran</span>
                <b className="text-xl text-blue-800">{money(selectedOrder.grand_total)}</b>
              </div>
            </div>

            {selectedOrder.status === 'pending_payment' && (
              <div className="mt-8 border-t border-slate-100 pt-6">
                <div className="rounded-2xl bg-amber-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-amber-200">
                  <div>
                    <h3 className="font-black text-amber-900">Menunggu Pembayaran</h3>
                    <p className="text-sm text-amber-700 mt-1">Segera selesaikan pembayaran agar pesanan dapat diproses.</p>
                  </div>
                  <div className="flex flex-col gap-2 w-full sm:w-auto">
                    <button onClick={() => payOrder(selectedOrder.id)} className="w-full sm:w-auto whitespace-nowrap rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-blue-800 transition">
                      Bayar Sekarang ➔
                    </button>
                    <button onClick={() => payViaWA(selectedOrder.id)} className="w-full sm:w-auto whitespace-nowrap rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-green-700 transition">
                      Bayar via WhatsApp ➔
                    </button>
                    <button onClick={() => cancelOrder(selectedOrder.id)} className="w-full sm:w-auto whitespace-nowrap rounded-xl border border-red-200 text-red-600 hover:bg-red-50 px-6 py-3 text-sm font-bold transition">
                      Batalkan Pesanan
                    </button>
                  </div>
                </div>
              </div>
            )}

            {selectedOrder.status === 'manual_payment' && (
              <div className="mt-8 border-t border-slate-100 pt-6">
                <div className="rounded-2xl bg-orange-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-orange-200">
                  <div>
                    <h3 className="font-black text-orange-900">Pemesanan via WhatsApp</h3>
                    <p className="text-sm text-orange-700 mt-1">Pesanan Anda sedang dalam konfirmasi oleh Admin. Silakan periksa pesan masuk WhatsApp Anda secara berkala.</p>
                  </div>
                  <div className="flex flex-col gap-2 w-full sm:w-auto">
                  <button onClick={() => payOrder(selectedOrder.id)} className="w-full sm:w-auto whitespace-nowrap rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-blue-800 transition">
                      Bayar Online (Midtrans) ➔
                    </button>
                  <a href="/keranjang" onClick={(e) => { e.preventDefault(); alert('Hubungi admin di WhatsApp untuk menyelesaikan.'); }} className="w-full text-center sm:w-auto whitespace-nowrap rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-green-700 transition">
                    Cek WhatsApp ➔
                  </a>
                  <button onClick={() => cancelOrder(selectedOrder.id)} className="w-full sm:w-auto whitespace-nowrap rounded-xl border border-red-200 text-red-600 hover:bg-red-50 px-6 py-3 text-sm font-bold transition">
                      Batalkan Pesanan
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
  </section>{error && <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>}</section></div><Footer appName={appName}/>
  </main>;
}

function Sidebar(){return <aside className="hidden h-[280px] self-start rounded-3xl bg-gradient-to-b from-blue-950 to-blue-800 p-4 text-white shadow-xl lg:block"><p className="px-3 pb-3 text-[11px] font-bold uppercase tracking-[.18em] text-blue-300">Menu akun</p><nav className="space-y-1"><Link href="/akun" className="block rounded-xl px-3 py-3 text-sm text-blue-100">▦ Dashboard</Link><Link href="/akun/profil" className="block rounded-xl px-3 py-3 text-sm text-blue-100">👤 Profil</Link><Link href="/akun/pesanan" className="block rounded-xl bg-white/15 px-3 py-3 text-sm font-bold">▣ Pesanan saya</Link><Link href="/" className="block rounded-xl px-3 py-3 text-sm text-blue-100">⌂ Kembali berbelanja</Link></nav></aside>}
function Footer({appName}){return <footer className="mt-auto border-t border-blue-100 bg-white"><div className="mx-auto flex max-w-7xl justify-between px-5 py-6 text-sm text-slate-500"><span>© 2026 {appName}.</span><span>Bantuan · Pengiriman</span></div></footer>}
