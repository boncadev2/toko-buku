"use client";
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { use, useEffect, useState } from "react";
import { api } from "../../../lib/api";

const pages = {
  tentang: ["Tentang Kami", "about_us", "Bukupagi adalah toko buku online untuk membantu pembaca menemukan buku yang bermakna."],
  "tentang-kami": ["Tentang Kami", "about_us", "Bukupagi adalah toko buku online untuk membantu pembaca menemukan buku yang bermakna."],
  penerbitan: ["Layanan Penerbitan", "publishing_info", "Kami menyediakan layanan penerbitan buku secara profesional—mulai dari kurasi naskah, penyuntingan (editing), desain tata letak & sampul, pengurusan ISBN resmi, hingga percetakan dan distribusi. Hubungi kami untuk konsultasi penerbitan naskah Anda."],
  "cara-belanja": ["Cara Belanja", "shopping_guide", "Pilih buku, masukkan ke keranjang, lengkapi alamat, lalu lanjutkan ke pembayaran."],
  pengiriman: ["Pengiriman", "shipping_info", "Pilihan kurir dan biaya kirim ditampilkan saat checkout setelah alamat diisi."],
  kontak: ["Hubungi Kami", "contact_us", "Gunakan tombol WhatsApp di pojok kanan bawah untuk menghubungi Bukupagi."],
};

export default function InfoPage({ params }) {
  const { slug } = use(params);
  const [settings, setSettings] = useState({});
  useEffect(() => {
    if (slug === "penerbitan") {
      window.location.replace("/penerbitan");
    }
  }, [slug]);
  useEffect(() => { try { const c = JSON.parse(localStorage.getItem("app_settings") || "{}"); setSettings(prev => ({ ...prev, ...c })); } catch {} }, []);
  useEffect(() => { api("/settings").then((response) => ((d) => { localStorage.setItem("app_settings", JSON.stringify(typeof d === "function" ? d(settings) : d)); setSettings(d); })(response.data || {})).catch(() => null); }, []);
  const [title, key, fallback] = pages[slug] ?? ["Informasi", "", "Halaman yang Anda cari belum tersedia."];
  const showAppNameDesktop = settings.show_app_name_desktop !== "0" && settings.show_app_name_desktop !== false;
  return <main className="min-h-screen bg-[#f4f8ff] text-slate-900"><header className="border-b border-blue-100 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4"><a href="/" className="flex items-center gap-3">{settings.app_logo ? <img src={settings.app_logo} alt="" className="h-11 sm:h-12 w-auto max-w-[180px] rounded-lg object-contain"/> : <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-700 text-white text-xl font-black">{(settings.app_name || " ")[0].toUpperCase()}</span>}{showAppNameDesktop && <b className="hidden sm:inline text-lg sm:text-xl text-blue-950">{settings.app_name || ""}</b>}</a><a href="/" className="text-sm font-bold text-blue-700">← Kembali ke beranda</a></div></header><article className="mx-auto max-w-3xl px-5 py-12"><section className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm sm:p-12"><p className="text-sm font-bold text-blue-700">Informasi Toko</p><h1 className="mt-3 text-4xl font-black">{title}</h1><div className="mt-6 whitespace-pre-line text-lg leading-8 text-slate-600">{settings[key] || fallback}</div></section></article><footer className="border-t border-blue-100 bg-white"><div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3 px-5 py-6 text-sm text-slate-500"><span>© 2026.</span><div className="flex gap-4"><a href="/info/tentang">Tentang</a><a href="/penerbitan">Penerbitan</a><a href="/info/cara-belanja">Cara Belanja</a><a href="/info/pengiriman">Pengiriman</a><a href="/info/kontak">Hubungi Kami</a></div></div></footer></main>;
}
