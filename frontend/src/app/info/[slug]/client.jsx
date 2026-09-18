"use client";
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { use, useEffect, useState } from "react";
import { api } from "../../../lib/api";

const pages = {
  tentang: ["Tentang Kami", "about_us", "Bukupagi adalah toko buku online untuk membantu pembaca menemukan buku yang bermakna."],
  "cara-belanja": ["Cara Belanja", "shopping_guide", "Pilih buku, masukkan ke keranjang, lengkapi alamat, lalu lanjutkan ke pembayaran."],
  pengiriman: ["Pengiriman", "shipping_info", "Pilihan kurir dan biaya kirim ditampilkan saat checkout setelah alamat diisi."],
  kontak: ["Hubungi Kami", "contact_us", "Gunakan tombol WhatsApp di pojok kanan bawah untuk menghubungi Bukupagi."],
};

export default function InfoPage({ params }) {
  const { slug } = use(params);
  const [settings, setSettings] = useState({});
  useEffect(() => { api("/settings").then((response) => setSettings(response.data || {})).catch(() => null); }, []);
  const [title, key, fallback] = pages[slug] ?? ["Informasi", "", "Halaman yang Anda cari belum tersedia."];
  return <main className="min-h-screen bg-[#f4f8ff] text-slate-900"><header className="border-b border-blue-100 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4"><a href="/" className="flex items-center gap-3">{settings.app_logo ? <img src={settings.app_logo} alt="" className="h-10 w-10 rounded-xl object-contain"/> : <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-700 text-white">📚</span>}<b className="text-lg text-blue-950">{settings.app_name || "BukuPagi"}</b></a><a href="/" className="text-sm font-bold text-blue-700">← Kembali ke beranda</a></div></header><article className="mx-auto max-w-3xl px-5 py-12"><section className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm sm:p-12"><p className="text-sm font-bold text-blue-700">Informasi BukuPagi</p><h1 className="mt-3 text-4xl font-black">{title}</h1><div className="mt-6 whitespace-pre-line text-lg leading-8 text-slate-600">{settings[key] || fallback}</div></section></article><footer className="border-t border-blue-100 bg-white"><div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3 px-5 py-6 text-sm text-slate-500"><span>© 2026 {settings.app_name || "BukuPagi"}.</span><div className="flex gap-4"><a href="/info/tentang">Tentang</a><a href="/info/cara-belanja">Cara Belanja</a><a href="/info/pengiriman">Pengiriman</a><a href="/info/kontak">Hubungi Kami</a></div></div></footer></main>;
}
