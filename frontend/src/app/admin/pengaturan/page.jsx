"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import AdminShell, { adminHeaders, ErrorBox, Loading } from "../../../components/AdminShell";

const defaults = {
  app_name: "", app_logo: "", store_address: "",
  hero_eyebrow: "Temukan cerita berikutnya",
  hero_title: "Buku yang baik, selalu menemukan pembacanya.",
  hero_description: "Pilihan buku untuk menemani rasa ingin tahu, ide besar, dan waktu tenangmu di rumah.",
  recommendation_label: "Rekomendasi hari ini",
  recommendation_book_title: "Jendela Masa Depan",
  recommendation_book_subtitle: "sebuah cerita untuk pulang",
  recommendation_kicker: "Baca, bayangkan, tumbuh.",
  recommendation_title: "Satu halaman bisa mengubah harimu.",
  about_us: "", shopping_guide: "", shipping_info: "", contact_us: "",
  shopee_url: "", tokopedia_url: "", youtube_url: "", whatsapp_url: "", facebook_url: "", instagram_url: "",
};

const heroFields = [
  ["hero_eyebrow", "Label Hero", "Teks kecil di atas judul utama."],
  ["hero_title", "Judul Utama Landing Page", "Judul besar yang pertama dilihat pelanggan."],
  ["hero_description", "Deskripsi Landing Page", "Paragraf penjelas di bawah judul utama."],
  ["recommendation_label", "Label Kartu Rekomendasi", "Contoh: Rekomendasi hari ini."],
  ["recommendation_book_title", "Judul Buku Rekomendasi", "Nama buku pada sampul rekomendasi."],
  ["recommendation_book_subtitle", "Subjudul Buku Rekomendasi", "Teks pendek di bawah judul buku."],
  ["recommendation_kicker", "Teks Pembuka Rekomendasi", "Contoh: Baca, bayangkan, tumbuh."],
  ["recommendation_title", "Judul Ajakan Rekomendasi", "Judul besar pada sisi kanan kartu."],
];

const informationFields = [
  ["store_address", "Alamat Toko", "Alamat lengkap yang ditampilkan pada footer."],
  ["about_us", "Tentang Kami", "Profil, visi, dan nilai toko."],
  ["shopping_guide", "Cara Belanja", "Langkah pelanggan melakukan pembelian."],
  ["shipping_info", "Pengiriman", "Informasi kurir, estimasi, dan ketentuan pengiriman."],
  ["contact_us", "Hubungi Kami", "Layanan pelanggan, WhatsApp, email, dan jam operasional."],
];

export default function SettingsPage() {
  const [form, setForm] = useState(null);
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api("/settings").then((response) => {
      const values = Object.fromEntries(Object.entries({ ...defaults, ...response.data }).map(([key, value]) => [key, value ?? ""]));
      setForm(values); setPreview(values.app_logo || "");
    }).catch(() => setError("Pengaturan tidak dapat dimuat."));
  }, []);

  const change = (key, value) => setForm((old) => ({ ...old, [key]: value }));
  const save = async (event) => {
    event.preventDefault(); setSaving(true); setError(""); setNotice("");
    const body = new FormData();
    Object.keys(defaults).filter((key) => key !== "app_logo").forEach((key, index) => {
      body.append(`settings[${index}][key]`, key);
      body.append(`settings[${index}][value]`, form[key] || "");
      body.append(`settings[${index}][is_secret]`, "0");
    });
    if (logo) body.append("logo", logo);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/admin/settings`, { method: "POST", headers: adminHeaders(), body });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(Object.values(payload.errors || {}).flat().join(" ") || payload.message || "Pengaturan gagal disimpan.");
      setForm((old) => ({ ...old, ...payload.data })); setPreview(payload.data?.app_logo || preview); setLogo(null);
      setNotice("Pengaturan berhasil disimpan dan sudah aktif pada halaman publik.");
    } catch (saveError) { setError(saveError.message); }
    finally { setSaving(false); }
  };

  if (!form) return <AdminShell title="Pengaturan" description="Kelola identitas dan informasi toko.">{error ? <ErrorBox message={error}/> : <Loading/>}</AdminShell>;

  return <AdminShell title="Pengaturan" description="Kelola identitas, landing page, dan informasi toko.">
    <form onSubmit={save} className="mt-6 space-y-6">
      <Card title="Identitas Aplikasi" description="Nama dan logo utama yang ditampilkan pada aplikasi."><div className="grid gap-5 md:grid-cols-[1fr_260px]"><TextField label="Nama aplikasi" value={form.app_name} onChange={(value) => change("app_name", value)} required/><div><p className="text-xs font-bold text-slate-600">Logo aplikasi</p><div className="mt-2 flex items-center gap-4">{preview ? <img src={preview} alt="Logo aplikasi" className="h-20 w-20 rounded-2xl border object-contain p-2"/> : <span className="grid h-20 w-20 place-items-center rounded-2xl bg-blue-700 text-3xl text-white">{(form.app_name || " ")[0].toUpperCase()}</span>}<input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" onChange={(event) => { const file = event.target.files?.[0] || null; setLogo(file); if (file) setPreview(URL.createObjectURL(file)); }} className="min-w-0 text-xs"/></div><small className="mt-2 block text-slate-400">PNG, JPG, WebP, atau SVG. Maksimal 2 MB.</small></div></div></Card>

      <Card title="Hero" description="Atur teks utama dan kartu rekomendasi pada bagian atas landing page."><div className="grid gap-5 md:grid-cols-2">{heroFields.map(([key, label, help]) => <TextField key={key} label={label} help={help} value={form[key]} onChange={(value) => change(key, value)} textarea={key === "hero_description" || key === "recommendation_title"}/>)}</div></Card>

      <Card title="Tautan Marketplace" description="URL untuk floating button Pesan Cepat."><div className="grid gap-5 md:grid-cols-2"><TextField label="Link toko Shopee" type="url" value={form.shopee_url} onChange={(value) => change("shopee_url", value)} placeholder="https://shopee.co.id/nama-toko"/><TextField label="Link toko Tokopedia" type="url" value={form.tokopedia_url} onChange={(value) => change("tokopedia_url", value)} placeholder="https://www.tokopedia.com/nama-toko"/></div></Card>

      <Card title="Media Sosial" description="Ikon media sosial yang ditampilkan pada footer."><div className="grid gap-5 md:grid-cols-2">{[["youtube_url","YouTube","https://youtube.com/@nama-channel"],["whatsapp_url","WhatsApp","https://wa.me/628xxxxxxxxxx"],["facebook_url","Facebook","https://facebook.com/nama-halaman"],["instagram_url","Instagram","https://instagram.com/nama-akun"]].map(([key, label, placeholder]) => <TextField key={key} label={`Link ${label}`} type="url" value={form[key]} onChange={(value) => change(key, value)} placeholder={placeholder}/>)}</div></Card>

      <Card title="Halaman Informasi" description="Konten alamat dan menu bantuan publik."><div className="grid gap-5">{informationFields.map(([key, label, help]) => <TextField key={key} label={label} help={help} value={form[key]} onChange={(value) => change(key, value)} textarea/>)}</div></Card>

      {error && <ErrorBox message={error}/>} {notice && <div className="rounded-2xl bg-emerald-50 p-4 text-sm font-bold text-emerald-700">✓ {notice}</div>}
      <div className="sticky bottom-4 flex justify-end"><button disabled={saving} className="rounded-xl bg-blue-700 px-7 py-3.5 text-sm font-bold text-white shadow-lg disabled:opacity-50">{saving ? "Menyimpan…" : "Simpan Pengaturan"}</button></div>
    </form>
  </AdminShell>;
}

function Card({ title, description, children }) { return <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm"><h2 className="text-lg font-black">{title}</h2><p className="mt-1 text-sm text-slate-500">{description}</p><div className="mt-5">{children}</div></section>; }
function TextField({ label, help, value, onChange, textarea = false, type = "text", ...props }) { const controlClass = `input ${textarea ? "min-h-28" : ""}`; return <label className="grid content-start gap-1.5 text-xs font-bold text-slate-600"><span>{label}</span>{textarea ? <textarea value={value || ""} onChange={(event) => onChange(event.target.value)} className={controlClass} {...props}/> : <input type={type} value={value || ""} onChange={(event) => onChange(event.target.value)} className={controlClass} {...props}/>} {help && <small className="font-normal text-slate-400">{help}</small>}</label>; }
