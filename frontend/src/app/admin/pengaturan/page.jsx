"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import AdminShell, { adminHeaders, ErrorBox, Loading } from "../../../components/AdminShell";

const defaults = {
  app_name: "", app_logo: "", store_address: "",
  show_app_name_desktop: "1",
  hero_image: "",
  show_recommendation: "1",
  hero_eyebrow: "Rumah bagi gagasan yang layak berumur panjang",
  hero_title: "Dari Gagasan Menjadi Karya Abadi",
  hero_description: "Penerbitan buku untuk setiap ide, cerita, pemikiran yang layak dibaca lebih lama.",
  recommendation_label: "Rekomendasi hari ini",
  recommendation_book_title: "Jendela Masa Depan",
  recommendation_book_subtitle: "sebuah cerita untuk pulang",
  recommendation_kicker: "Baca, bayangkan, tumbuh.",
  recommendation_title: "Satu halaman bisa mengubah harimu.",
  about_us: "", shopping_guide: "", shipping_info: "", contact_us: "",
  shopee_url: "", tokopedia_url: "", youtube_url: "", whatsapp_url: "", facebook_url: "", instagram_url: "",
};

const mainHeroFields = [
  ["hero_eyebrow", "Label Hero", "Teks kecil di atas judul utama."],
  ["hero_title", "Judul Utama Landing Page", "Judul besar yang pertama dilihat pelanggan."],
  ["hero_description", "Deskripsi Landing Page", "Paragraf penjelas di bawah judul utama."],
];

const recommendationFields = [
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
  const [heroImage, setHeroImage] = useState(null);
  const [heroPreview, setHeroPreview] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api("/settings").then((response) => {
      const values = Object.fromEntries(Object.entries({ ...defaults, ...response.data }).map(([key, value]) => [key, value ?? ""]));
      setForm(values);
      setPreview(values.app_logo || "");
      setHeroPreview(values.hero_image || "/hero.jpg");
    }).catch(() => setError("Pengaturan tidak dapat dimuat."));
  }, []);

  const change = (key, value) => setForm((old) => ({ ...old, [key]: value }));
  const save = async (event) => {
    event.preventDefault(); setSaving(true); setError(""); setNotice("");
    const body = new FormData();
    Object.keys(defaults).filter((key) => key !== "app_logo" && key !== "hero_image").forEach((key, index) => {
      body.append(`settings[${index}][key]`, key);
      body.append(`settings[${index}][value]`, form[key] || "");
      body.append(`settings[${index}][is_secret]`, "0");
    });
    if (logo) body.append("logo", logo);
    if (heroImage) body.append("hero_image", heroImage);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/admin/settings`, { method: "POST", headers: adminHeaders(), body });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(Object.values(payload.errors || {}).flat().join(" ") || payload.message || "Pengaturan gagal disimpan.");
      setForm((old) => ({ ...old, ...payload.data }));
      setPreview(payload.data?.app_logo || preview);
      setHeroPreview(payload.data?.hero_image || heroPreview);
      setLogo(null);
      setHeroImage(null);
      if (payload.data) {
        try {
          const currentSettings = JSON.parse(localStorage.getItem("app_settings") || "{}");
          localStorage.setItem("app_settings", JSON.stringify({ ...currentSettings, ...payload.data }));
          window.dispatchEvent(new Event("storage"));
        } catch {}
      }
      setNotice("Pengaturan berhasil disimpan dan sudah aktif pada halaman publik.");
    } catch (saveError) { setError(saveError.message); }
    finally { setSaving(false); }
  };

  if (!form) return <AdminShell title="Pengaturan" description="Kelola identitas dan informasi toko.">{error ? <ErrorBox message={error}/> : <Loading/>}</AdminShell>;

  return <AdminShell title="Pengaturan" description="Kelola identitas, landing page, dan informasi toko.">
    <form onSubmit={save} className="mt-6 space-y-6">
      <Card title="Identitas Aplikasi" description="Nama dan logo utama yang ditampilkan pada aplikasi.">
        <div className="grid gap-5 md:grid-cols-[1fr_320px]">
          <TextField label="Nama aplikasi" value={form.app_name} onChange={(value) => change("app_name", value)} required/>
          <div>
            <p className="text-xs font-bold text-slate-600">Logo aplikasi</p>
            <div className="mt-2 flex items-center gap-4">
              {preview ? (
                <img src={preview} alt="Logo aplikasi" className="h-20 w-20 rounded-2xl border bg-slate-50 object-contain p-2 shadow-sm"/>
              ) : (
                <span className="grid h-20 w-20 place-items-center rounded-2xl bg-blue-700 text-3xl font-black text-white">{(form.app_name || " ")[0].toUpperCase()}</span>
              )}
              <div className="min-w-0 flex-1 space-y-1.5">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/svg+xml"
                  onChange={(event) => {
                    const file = event.target.files?.[0] || null;
                    setLogo(file);
                    if (file) setPreview(URL.createObjectURL(file));
                  }}
                  className="input file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:font-bold file:text-blue-700"
                />
                <small className="block text-[11px] text-slate-400">PNG, JPG, WebP, atau SVG. Maksimal 5 MB.</small>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <label htmlFor="show_app_name_desktop" className="text-xs font-bold text-slate-800 cursor-pointer">
                Nama Aplikasi Mode Desktop
              </label>
              <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold ${form.show_app_name_desktop !== "0" ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600"}`}>
                {form.show_app_name_desktop !== "0" ? "Tampil (Visible)" : "Disembunyikan (Hidden)"}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-slate-500">
              Sembunyikan atau tampilkan teks nama aplikasi di samping logo pada layar komputer/desktop (pada mode HP otomatis disembunyikan).
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              id="show_app_name_desktop"
              checked={form.show_app_name_desktop !== "0" && form.show_app_name_desktop !== false}
              onChange={(e) => change("show_app_name_desktop", e.target.checked ? "1" : "0")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </Card>

      <Card title="Hero" description="Atur gambar, teks utama, dan kartu rekomendasi pada bagian atas landing page.">
        <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50/40 p-5">
          <p className="text-xs font-bold text-slate-700">Gambar Hero Landing Page</p>
          <p className="mt-1 text-xs text-slate-500">Gambar ilustrasi atau foto buku yang ditampilkan di sebelah kanan teks utama hero.</p>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
            {heroPreview ? (
              <div className="relative aspect-[16/10] w-full max-w-[260px] overflow-hidden rounded-2xl border bg-white shadow-sm">
                <img src={heroPreview} alt="Preview Gambar Hero" className="h-full w-full object-cover"/>
              </div>
            ) : (
              <div className="grid aspect-[16/10] w-full max-w-[260px] place-items-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 text-xs font-bold text-slate-400">
                Belum ada gambar
              </div>
            )}
            <div className="min-w-0 flex-1 space-y-2">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(event) => {
                  const file = event.target.files?.[0] || null;
                  setHeroImage(file);
                  if (file) setHeroPreview(URL.createObjectURL(file));
                }}
                className="input file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:font-bold file:text-blue-700"
              />
              <small className="block text-[11px] text-slate-400">Format: JPG, PNG, atau WebP. Rekomendasi rasio 4:3 atau 16:10. Maksimal 5 MB.</small>
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {mainHeroFields.map(([key, label, help]) => (
            <TextField
              key={key}
              label={label}
              help={help}
              value={form[key]}
              onChange={(value) => change(key, value)}
              textarea={key === "hero_description"}
            />
          ))}
        </div>

        {/* Setting Hide / Show Kartu Rekomendasi */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <span>Kartu Rekomendasi Hari Ini</span>
                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold ${form.show_recommendation !== "0" ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600"}`}>
                  {form.show_recommendation !== "0" ? "Tampil (Visible)" : "Disembunyikan (Hidden)"}
                </span>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Aktifkan sakelar ini untuk menampilkan kartu rekomendasi di sisi kanan hero, atau matikan untuk menyembunyikannya (*hide*).
              </p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center shrink-0">
              <input
                type="checkbox"
                checked={form.show_recommendation !== "0" && form.show_recommendation !== false}
                onChange={(e) => change("show_recommendation", e.target.checked ? "1" : "0")}
                className="peer sr-only"
              />
              <div className="peer h-7 w-12 rounded-full bg-slate-300 after:absolute after:left-[3px] after:top-[3px] after:h-5.5 after:w-5.5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-5 peer-checked:after:border-white peer-focus:outline-none shadow-inner" />
            </label>
          </div>

          <div className={`mt-5 pt-5 border-t border-slate-200 transition-opacity duration-200 ${form.show_recommendation === "0" ? "opacity-50" : "opacity-100"}`}>
            <p className="text-xs font-bold text-slate-700 mb-3">Konten Kartu Rekomendasi</p>
            <div className="grid gap-5 md:grid-cols-2">
              {recommendationFields.map(([key, label, help]) => (
                <TextField
                  key={key}
                  label={label}
                  help={help}
                  value={form[key]}
                  onChange={(value) => change(key, value)}
                  textarea={key === "recommendation_title"}
                />
              ))}
            </div>
          </div>
        </div>
      </Card>

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
