"use client";

/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import CustomerHeader from "../../../components/CustomerHeader";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
const provinces = ["Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Kepulauan Riau", "Jambi", "Sumatera Selatan", "Kepulauan Bangka Belitung", "Bengkulu", "Lampung", "DKI Jakarta", "Banten", "Jawa Barat", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur", "Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur", "Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara", "Sulawesi Utara", "Gorontalo", "Sulawesi Tengah", "Sulawesi Barat", "Sulawesi Selatan", "Sulawesi Tenggara", "Maluku", "Maluku Utara", "Papua Barat", "Papua Barat Daya", "Papua", "Papua Tengah", "Papua Pegunungan", "Papua Selatan"];

export default function ProfilePage() {
  const [account, setAccount] = useState(null);
  const [location, setLocation] = useState({ province: "", city: "", district: "", postal_code: "", biteship_area_id: "" });
  const [cityText, setCityText] = useState(""); const [districtText, setDistrictText] = useState("");
  const [cities, setCities] = useState([]); const [districts, setDistricts] = useState([]);
  const [areaCandidates, setAreaCandidates] = useState([]);
  const [loadingArea, setLoadingArea] = useState(false); const [message, setMessage] = useState("");
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
  const headers = { Accept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${token}` };

  const load = async () => { const response = await fetch(`${apiUrl}/account`, { headers }); if (!response.ok) throw new Error(); const payload = await response.json(); setAccount(payload.data); };
  useEffect(() => { if (!token) { window.location.href = "/auth/login"; return; } load().catch(() => setMessage("Profil belum dapat dimuat.")); }, []);

  const search = async (query) => { setLoadingArea(true); try { const response = await fetch(`${apiUrl}/shipping/areas?query=${encodeURIComponent(query)}`); const payload = await response.json(); return payload.data || []; } finally { setLoadingArea(false); } };
  useEffect(() => { if (!location.province || cityText.length < 2 || cityText === location.city) return; const timer = setTimeout(async () => { const areas = await search(`${cityText}, ${location.province}`); const unique = new Map(); areas.forEach((area) => { const city = area.administrative_division_level_2_name; if (city) unique.set(city, area); }); setCities([...unique.values()]); }, 500); return () => clearTimeout(timer); }, [cityText, location.city, location.province]);
  useEffect(() => { if (!location.city || districtText.length < 2 || districtText === location.district) return; const timer = setTimeout(async () => { const areas = await search(`${districtText}, ${location.city}, ${location.province}`); setDistricts(areas.filter((area) => area.administrative_division_level_2_name === location.city)); }, 500); return () => clearTimeout(timer); }, [districtText, location.city, location.district, location.province]);

  const resolveArea = async (next) => {
    let exact = areaCandidates.find((area) => String(area.postal_code) === next.postal_code && area.administrative_division_level_3_name === next.district);
    if (!exact) {
      const areas = await search(`${next.district}, ${next.city}, ${next.province}, ${next.postal_code}`);
      exact = areas.find((area) => String(area.postal_code) === next.postal_code && area.administrative_division_level_3_name === next.district && area.administrative_division_level_2_name === next.city);
    }
    if (!exact) return null;
    const verified = { ...next, biteship_area_id: exact.id };
    setLocation(verified);
    return verified;
  };

  const verifyPostal = async (postal_code) => {
    if (postal_code.length !== 5 || !location.district) return setLocation((old) => ({ ...old, postal_code, biteship_area_id: "" }));
    const verified = await resolveArea({ ...location, postal_code, biteship_area_id: "" });
    if (!verified) setLocation((old) => ({ ...old, postal_code, biteship_area_id: "" }));
    setMessage(verified ? "Lokasi dan kode pos berhasil diverifikasi Biteship." : "Kode pos tidak cocok dengan kecamatan.");
  };

  const save = async (event) => {
    event.preventDefault(); const form = new FormData(event.currentTarget);
    let verifiedLocation = location;
    if (!verifiedLocation.biteship_area_id && verifiedLocation.district && verifiedLocation.postal_code.length === 5) {
      setMessage("Memverifikasi alamat dengan Biteship…");
      verifiedLocation = await resolveArea(verifiedLocation);
    }
    if (!verifiedLocation?.biteship_area_id) return setMessage("Kode pos tidak cocok. Pilih kembali kecamatan lalu periksa kode pos.");
    const body = { label: form.get("label"), recipient_name: form.get("recipient_name"), phone: form.get("phone"), address_line_1: form.get("address_line_1"), subdistrict: form.get("subdistrict"), ...verifiedLocation, is_default: form.get("is_default") === "on" };
    const response = await fetch(`${apiUrl}/account/addresses`, { method: "POST", headers, body: JSON.stringify(body) }); const payload = await response.json();
    if (!response.ok) return setMessage(payload.errors?.address?.[0] || payload.message || "Alamat gagal disimpan.");
    setMessage("Alamat pengiriman berhasil disimpan dan terhubung ke Biteship."); event.currentTarget.reset(); setLocation({ province: "", city: "", district: "", postal_code: "", biteship_area_id: "" }); setCityText(""); setDistrictText(""); await load();
  };

  const remove = async (id) => { if (!confirm("Hapus alamat ini?")) return; await fetch(`${apiUrl}/account/addresses/${id}`, { method: "DELETE", headers }); await load(); };

  return <main className="flex min-h-screen flex-col bg-[#f4f8ff] text-slate-800"><CustomerHeader user={account?.user} active="profile"/>
    <div className="mx-auto grid w-full max-w-7xl flex-1 gap-6 px-5 py-7 lg:grid-cols-[235px_1fr]"><Sidebar/><section><p className="text-sm font-semibold text-blue-700">Akun pelanggan</p><h1 className="mt-1 text-3xl font-black">Profil & Alamat Pengiriman</h1><p className="mt-2 text-sm text-slate-500">Alamat terverifikasi akan otomatis dipakai Biteship ketika menghitung ongkir.</p>
      {account && <div className="mt-6 rounded-3xl bg-gradient-to-r from-blue-900 to-blue-700 p-6 text-white"><b className="text-xl">{account.user.name}</b><p className="mt-1 text-sm text-blue-100">{account.user.email} · {account.user.phone || "Nomor telepon belum diisi"}</p></div>}
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_.9fr]"><form onSubmit={save} className="rounded-3xl bg-white p-6 shadow-sm"><h2 className="text-lg font-black">Tambah alamat</h2><div className="mt-5 grid gap-4 sm:grid-cols-2"><Input name="label" label="Label alamat" placeholder="Rumah / Kantor"/><Input name="recipient_name" label="Nama penerima" required/><Input name="phone" label="Nomor telepon" required/>
        <Field label="Provinsi"><select required value={location.province} onChange={(e) => { setLocation({ province: e.target.value, city: "", district: "", postal_code: "", biteship_area_id: "" }); setCityText(""); setDistrictText(""); }} className="rounded-xl border bg-white p-3"><option value="">Pilih provinsi</option>{provinces.map((province) => <option key={province}>{province}</option>)}</select></Field>
        <Combo label="Kabupaten / Kota" value={cityText} disabled={!location.province} options={cities.map((area) => ({ key: area.administrative_division_level_2_name, title: area.administrative_division_level_2_name, area }))} onChange={(value) => { setCityText(value); setLocation((old) => ({ ...old, city: "", district: "", biteship_area_id: "" })); }} onSelect={(item) => { const city = item.area.administrative_division_level_2_name; setLocation((old) => ({ ...old, city, district: "", biteship_area_id: "" })); setCityText(city); setCities([]); setDistrictText(""); }}/>
        <Combo label="Kecamatan" value={districtText} disabled={!location.city} options={districts.map((area) => ({ key: area.id, title: area.administrative_division_level_3_name, subtitle: area.name, area }))} onChange={(value) => { setDistrictText(value); setAreaCandidates([]); setLocation((old) => ({ ...old, district: "", biteship_area_id: "" })); }} onSelect={(item) => { const district = item.area.administrative_division_level_3_name; setAreaCandidates(districts.filter((area) => area.administrative_division_level_3_name === district)); setLocation((old) => ({ ...old, district, biteship_area_id: "" })); setDistrictText(district); setDistricts([]); }}/>
        <Input name="subdistrict" label="Kelurahan / Desa" required/><Field label="Kode pos"><input required inputMode="numeric" maxLength={5} value={location.postal_code} onChange={(e) => verifyPostal(e.target.value.replace(/\D/g, "").slice(0, 5))} placeholder="5 digit kode pos" className="rounded-xl border p-3"/></Field><label className="grid gap-1 text-xs font-bold text-slate-600 sm:col-span-2"><span>Alamat lengkap</span><textarea name="address_line_1" required placeholder="Nama jalan, nomor rumah, RT/RW, dan patokan" className="min-h-24 rounded-xl border p-3 text-base font-normal"/></label><label className="flex items-center gap-2 text-sm sm:col-span-2"><input type="checkbox" name="is_default"/> Jadikan alamat utama</label></div>
        {loadingArea && <p className="mt-3 text-sm text-blue-700">Memeriksa data Biteship…</p>}{location.biteship_area_id && <p className="mt-3 rounded-xl bg-emerald-50 p-3 text-sm font-bold text-emerald-700">✓ Alamat terverifikasi Biteship</p>}<button className="mt-5 rounded-xl bg-blue-700 px-6 py-3 font-bold text-white">Simpan alamat</button>{message && <p className="mt-4 text-sm font-semibold text-blue-700">{message}</p>}</form>
        <section className="space-y-4"><h2 className="text-lg font-black">Alamat tersimpan</h2>{account?.addresses?.length ? account.addresses.map((address) => <article key={address.id} className="rounded-3xl bg-white p-5 shadow-sm"><div className="flex justify-between"><b>{address.label || "Alamat"}</b>{address.is_default && <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">Utama</span>}</div><p className="mt-3 text-sm font-semibold">{address.recipient_name} · {address.phone}</p><p className="mt-2 text-sm leading-6 text-slate-600">{address.address_line_1}, Kel. {address.subdistrict}, Kec. {address.district}, {address.city}, {address.province} {address.postal_code}</p><p className={`mt-3 text-xs font-bold ${address.biteship_area_id ? "text-emerald-600" : "text-amber-600"}`}>{address.biteship_area_id ? "✓ Terhubung Biteship" : "Belum terverifikasi Biteship"}</p><button onClick={() => remove(address.id)} className="mt-4 text-sm font-bold text-red-600">Hapus alamat</button></article>) : <div className="rounded-3xl bg-white p-8 text-center text-sm text-slate-500">Belum ada alamat tersimpan.</div>}</section></div>
    </section></div><footer className="mt-auto border-t border-blue-100 bg-white py-6 text-center text-sm text-slate-500">© 2026 BukuPagi.</footer></main>;
}

function Sidebar(){return <aside className="hidden h-[280px] self-start rounded-3xl bg-gradient-to-b from-blue-950 to-blue-800 p-4 text-white shadow-xl lg:block"><p className="px-3 pb-3 text-[11px] font-bold uppercase tracking-[.18em] text-blue-300">Menu akun</p><nav className="space-y-1"><a href="/akun" className="block rounded-xl px-3 py-3 text-sm text-blue-100">▦ Dashboard</a><a href="/akun/profil" className="block rounded-xl bg-white/15 px-3 py-3 text-sm font-bold">👤 Profil</a><a href="/akun/pesanan" className="block rounded-xl px-3 py-3 text-sm text-blue-100">▣ Pesanan saya</a><a href="/" className="block rounded-xl px-3 py-3 text-sm text-blue-100">⌂ Kembali berbelanja</a></nav></aside>}
function Field({label,children}){return <label className="grid gap-1 text-xs font-bold text-slate-600"><span>{label}</span>{children}</label>}
function Input({label,...props}){return <Field label={label}><input {...props} className="rounded-xl border p-3 text-base font-normal"/></Field>}
function Combo({label,value,disabled,options,onChange,onSelect}){return <div className="relative grid gap-1 text-xs font-bold text-slate-600"><span>{label}</span><input required disabled={disabled} value={value} onChange={(e)=>onChange(e.target.value)} placeholder={disabled?"Pilih lokasi sebelumnya":"Ketik minimal 2 huruf"} className="rounded-xl border p-3 text-base font-normal disabled:bg-slate-100"/>{options.length>0&&<div className="absolute top-full z-20 mt-1 max-h-60 w-full overflow-auto rounded-xl border bg-white p-1 shadow-xl">{options.map((item)=><button type="button" key={item.key} onClick={()=>onSelect(item)} className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-blue-50"><b>{item.title}</b>{item.subtitle&&<small className="block text-slate-500">{item.subtitle}</small>}</button>)}</div>}</div>}
