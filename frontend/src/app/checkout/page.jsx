"use client";

/* eslint-disable @next/next/no-html-link-for-pages */
import { useEffect, useState } from "react";
import CustomerHeader from "../../components/CustomerHeader";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
const money = (value) => `Rp${Number(value || 0).toLocaleString("id-ID")}`;
const provinces = ["Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Kepulauan Riau", "Jambi", "Sumatera Selatan", "Kepulauan Bangka Belitung", "Bengkulu", "Lampung", "DKI Jakarta", "Banten", "Jawa Barat", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur", "Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur", "Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara", "Sulawesi Utara", "Gorontalo", "Sulawesi Tengah", "Sulawesi Barat", "Sulawesi Selatan", "Sulawesi Tenggara", "Maluku", "Maluku Utara", "Papua Barat", "Papua Barat Daya", "Papua", "Papua Tengah", "Papua Pegunungan", "Papua Selatan"];

export default function CheckoutPage() {
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [cart, setCart] = useState(null);
  const [itemIds, setItemIds] = useState([]);
  const [message, setMessage] = useState("");
  const [quotes, setQuotes] = useState([]);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [shippingLoading, setShippingLoading] = useState(false);
  const [location, setLocation] = useState({ province: "", city: "", district: "", postal_code: "", area_id: "" });
  const [cityQuery, setCityQuery] = useState("");
  const [districtQuery, setDistrictQuery] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [areaLoading, setAreaLoading] = useState(false);

  const authHeaders = () => {
    const token = localStorage.getItem("token");
    const cartToken = localStorage.getItem("cart_token");
    return { Accept: "application/json", "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(cartToken ? { "X-Cart-Token": cartToken } : {}) };
  };

  const calculateShipping = async (address) => {
    if (!address?.province || !address?.city || String(address?.postal_code || "").length < 5) return;
    setShippingLoading(true); setQuotes([]); setSelectedQuote(null);
    try {
      const selectedIds = JSON.parse(localStorage.getItem("checkout_item_ids") || "[]");
      const response = await fetch(`${apiUrl}/shipping/quote`, { method: "POST", headers: authHeaders(), body: JSON.stringify({ ...address, area_id: address.area_id || address.biteship_area_id || "", item_ids: selectedIds }) });
      const payload = await response.json();
      const available = Array.isArray(payload.data) ? payload.data : [];
      setQuotes(available); setSelectedQuote(available[0] || null);
    } catch { setMessage("Ongkir belum dapat dihitung."); }
    finally { setShippingLoading(false); }
  };

  const searchAreas = async (query) => {
    setAreaLoading(true);
    try {
      const response = await fetch(`${apiUrl}/shipping/areas?query=${encodeURIComponent(query)}`, { headers: { Accept: "application/json" } });
      const payload = await response.json();
      return Array.isArray(payload.data) ? payload.data : [];
    } catch { setMessage("Daftar wilayah Biteship belum dapat dimuat."); return []; }
    finally { setAreaLoading(false); }
  };

  useEffect(() => {
    fetch(`${apiUrl}/cart`, { headers: authHeaders() })
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok) throw new Error();
        if (payload.meta?.cart_token) localStorage.setItem("cart_token", payload.meta.cart_token);
        setCart(payload.data);
        const availableIds=(payload.data?.items||[]).map((item)=>item.id);
        const savedIds=JSON.parse(localStorage.getItem("checkout_item_ids")||"[]").filter((id)=>availableIds.includes(id));
        const selectedIds=savedIds.length?savedIds:availableIds;
        if (!selectedIds.length) {
          window.location.href = localStorage.getItem("token") ? "/akun/pesanan" : "/keranjang";
          return;
        }
        setItemIds(selectedIds); localStorage.setItem("checkout_item_ids",JSON.stringify(selectedIds));
      })
      .catch(() => setMessage("Ringkasan keranjang belum dapat dimuat."));
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) { window.location.href = "/auth/login?redirect=/checkout"; return; }
    Promise.all([fetch(`${apiUrl}/auth/me`, { headers: authHeaders() }).then((r) => r.json()), fetch(`${apiUrl}/account`, { headers: authHeaders() }).then((r) => r.json())]).then(([me, account]) => {
      setUser(me.data); const saved = account.data?.addresses || []; setAddresses(saved);
      const preferred = saved.find((address) => address.is_default) || saved[0];
      if (preferred) { setSelectedAddress(String(preferred.id)); calculateShipping(preferred); }
    }).catch(() => setMessage("Data akun belum dapat dimuat."));
  }, []);

  useEffect(() => {
    if (!location.province || cityQuery.trim().length < 2 || cityQuery === location.city) return;
    const timer = setTimeout(async () => {
      const areas = await searchAreas(`${cityQuery}, ${location.province}`);
      const unique = new Map();
      areas.forEach((area) => { const city = area.administrative_division_level_2_name; if (city) unique.set(city, area); });
      setCityOptions([...unique.values()]);
    }, 500);
    return () => clearTimeout(timer);
  }, [cityQuery, location.city, location.province]);

  useEffect(() => {
    if (!location.city || districtQuery.trim().length < 2 || districtQuery === location.district) return;
    const timer = setTimeout(async () => {
      const areas = await searchAreas(`${districtQuery}, ${location.city}, ${location.province}`);
      setDistrictOptions(areas.filter((area) => area.administrative_division_level_2_name === location.city));
    }, 500);
    return () => clearTimeout(timer);
  }, [districtQuery, location.city, location.district, location.province]);

  const submit = async (event) => { const method = event.nativeEvent.submitter?.value || "midtrans";
    event.preventDefault(); setMessage("Memeriksa pesanan…"); const form = new FormData(event.currentTarget); let address;
    if (user) {
      const saved = addresses.find((item) => String(item.id) === selectedAddress);
      if (!saved) return setMessage("Pilih alamat pengiriman terlebih dahulu.");
      address = { recipient_name: saved.recipient_name, phone: saved.phone, address_line_1: saved.address_line_1, city: saved.city, province: saved.province, postal_code: saved.postal_code };
    } else {
      if (!location.area_id) return setMessage("Pilih kecamatan dari dropdown Biteship.");
      if (!selectedQuote) return setMessage("Pilih layanan pengiriman terlebih dahulu.");
      address = { recipient_name: form.get("recipient_name"), phone: form.get("phone"), province: location.province, city: location.city, postal_code: location.postal_code, address_line_1: `${form.get("street")}, Kecamatan ${location.district}` };
    }
    if (!itemIds.length) return setMessage("Pilih minimal satu buku dari halaman keranjang.");
    const check = await fetch(`${apiUrl}/checkout/preview`, { method: "POST", headers: authHeaders(), body: JSON.stringify(user ? { address_id: Number(selectedAddress), item_ids: itemIds } : { guest_address: address, item_ids: itemIds }) });
    const checked = await check.json(); if (!check.ok) return setMessage(checked.message || "Periksa kembali alamat dan keranjang Anda.");
    const response = await fetch(`${apiUrl}/checkout`, { method: "POST", headers: authHeaders(), body: JSON.stringify({ address, item_ids: itemIds, shipping_cost: selectedQuote ? Number(selectedQuote.cost ?? selectedQuote.price ?? selectedQuote.final_price ?? 0) : 0 }) });
    const payload = await response.json(); 
    if(response.ok) {
      localStorage.removeItem("checkout_item_ids");
      // no-op 
      if (method === "wa") {
        setMessage(`Mengarahkan ke WhatsApp...`);
        try {
          const waRes = await fetch(`${apiUrl}/orders/${payload.data.id}/whatsapp`, { method: "POST", headers: authHeaders() });
          const waPayload = await waRes.json();
          if (waRes.ok && waPayload.data?.url) {
            window.location.href = waPayload.data.url;
          } else {
            setMessage("Gagal memuat link WhatsApp.");
            setTimeout(() => { window.location.href = user ? "/akun/pesanan" : "/"; }, 3000);
          }
        } catch(e) {
          setMessage("Gagal menghubungi server.");
        }
      } else {
      try {
        const payRes = await fetch(`${apiUrl}/orders/${payload.data.id}/payment/midtrans`, { method: "POST", headers: authHeaders() });
        const payPayload = await payRes.json();
        if (payRes.ok && payPayload.data?.redirect_url) {
          window.location.href = payPayload.data.redirect_url;
        } else {
          setMessage(`Pesanan berhasil dibuat, namun gagal memuat pembayaran. Silakan periksa halaman Pesanan Anda.`);
          setTimeout(() => { window.location.href = user ? "/akun/pesanan" : "/"; }, 3000);
        }
      } catch (err) {
        setMessage(`Gagal menghubungi sistem pembayaran.`);
        setTimeout(() => { window.location.href = user ? "/akun/pesanan" : "/"; }, 3000);
      }
      }
    } else {
      setMessage(payload.message || "Pesanan belum dapat dibuat.");
    }
  };

  const selectCity = (area) => {
    const city = area.administrative_division_level_2_name;
    setLocation((old) => ({ ...old, city, district: "", area_id: "" })); setCityQuery(city); setDistrictQuery(""); setCityOptions([]); setDistrictOptions([]); setQuotes([]);
  };
  const selectDistrict = (area) => {
    const next = { ...location, district: area.administrative_division_level_3_name, area_id: area.id };
    setLocation(next); setDistrictQuery(next.district); setDistrictOptions([]); if (next.postal_code.length === 5) calculateShipping(next);
  };

  const verifyPostalAndCalculate = async (next) => {
    const areas = await searchAreas(`${next.district}, ${next.city}, ${next.province}, ${next.postal_code}`);
    const exact = areas.find((area) => String(area.postal_code) === next.postal_code && area.administrative_division_level_3_name === next.district && area.administrative_division_level_2_name === next.city);
    if (!exact) {
      setQuotes([]); setSelectedQuote(null); setMessage("Kode pos tidak cocok dengan kecamatan yang dipilih."); return;
    }
    const verified = { ...next, area_id: exact.id };
    setLocation(verified); setMessage(""); calculateShipping(verified);
  };

  const selectedSubtotal = (cart?.items || []).filter((item) => itemIds.includes(item.id)).reduce((sum, item) => sum + Number(item.subtotal), 0);

  return <main className="min-h-screen bg-[#f4f8ff] text-slate-900">
    <CustomerHeader user={user} active=""/>
    <form onSubmit={submit} className="mx-auto grid max-w-5xl gap-6 px-5 py-9 lg:grid-cols-[1fr_320px]">
      <section className="rounded-3xl bg-white p-6 shadow-sm"><p className="text-sm font-semibold text-blue-700">Langkah checkout</p><h1 className="mt-1 text-3xl font-black">Alamat pengiriman</h1>
        {user ? <div className="mt-6"><p className="mb-3 text-sm font-bold">Pilih alamat tersimpan</p>{addresses.length ? <div className="grid gap-3">{addresses.map((address) => <label key={address.id} className={`cursor-pointer rounded-2xl border p-4 ${selectedAddress === String(address.id) ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}><input type="radio" className="mr-2" checked={selectedAddress === String(address.id)} onChange={() => { setSelectedAddress(String(address.id)); calculateShipping(address); }}/><b>{address.label || "Alamat"}</b><p className="mt-2 text-sm text-slate-600">{address.recipient_name} · {address.phone}</p><p className="mt-1 text-sm text-slate-500">{address.address_line_1}, {address.city}, {address.province} {address.postal_code}</p></label>)}</div> : <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800">Belum ada alamat tersimpan. Tambahkan alamat melalui halaman akun.</p>}</div> :
        <div className="mt-6 grid gap-4 sm:grid-cols-2"><input name="recipient_name" required placeholder="Nama penerima" className="rounded-xl border p-3"/><input name="phone" required placeholder="Nomor telepon" className="rounded-xl border p-3"/>
          <Field label="Provinsi"><select required value={location.province} onChange={(e) => { setLocation({ province: e.target.value, city: "", district: "", postal_code: location.postal_code, area_id: "" }); setCityQuery(""); setDistrictQuery(""); setQuotes([]); }} className="rounded-xl border bg-white p-3 text-base font-normal text-slate-900"><option value="">Pilih provinsi</option>{provinces.map((item) => <option key={item}>{item}</option>)}</select></Field>
          <Combo label="Kabupaten / Kota" disabled={!location.province} value={cityQuery} placeholder={location.province ? "Ketik minimal 2 huruf" : "Pilih provinsi dahulu"} onChange={(value) => { setCityQuery(value); setLocation((old) => ({ ...old, city: "", district: "", area_id: "" })); }} options={cityOptions.map((area) => ({ key: area.administrative_division_level_2_name, title: area.administrative_division_level_2_name, area }))} onSelect={(item) => selectCity(item.area)}/>
          <Combo label="Kecamatan" disabled={!location.city} value={districtQuery} placeholder={location.city ? "Ketik minimal 2 huruf" : "Pilih kabupaten/kota dahulu"} onChange={(value) => { setDistrictQuery(value); setLocation((old) => ({ ...old, district: "", area_id: "" })); }} options={districtOptions.map((area) => ({ key: area.id, title: area.administrative_division_level_3_name, subtitle: area.name, area }))} onSelect={(item) => selectDistrict(item.area)}/>
          <Field label="Kode pos"><input required inputMode="numeric" maxLength={5} value={location.postal_code} onChange={(e) => { const postal_code = e.target.value.replace(/\D/g, "").slice(0, 5); const next = { ...location, postal_code, area_id: postal_code.length === 5 ? location.area_id : "" }; setLocation(next); if (next.district && postal_code.length === 5) verifyPostalAndCalculate(next); }} placeholder="Ketik 5 digit kode pos" className="rounded-xl border p-3 text-base font-normal text-slate-900"/></Field>
          <textarea name="street" required placeholder="Nama jalan, nomor rumah, RT/RW, patokan" className="min-h-28 rounded-xl border p-3 sm:col-span-2"/>{areaLoading && <p className="text-xs font-semibold text-blue-700 sm:col-span-2">Mencari wilayah resmi Biteship…</p>}{location.area_id && <p className="rounded-xl bg-emerald-50 p-3 text-xs font-semibold text-emerald-700 sm:col-span-2">✓ Wilayah terverifikasi Biteship: {location.district}, {location.city}, {location.province}</p>}
        </div>}
        <div className="mt-7 border-t pt-6"><h2 className="font-black">Pilihan pengiriman</h2>{shippingLoading ? <p className="mt-3 text-sm text-blue-700">Menghitung ongkir…</p> : quotes.length ? <div className="mt-3 grid gap-2">{quotes.slice(0, 6).map((quote, index) => <Quote key={index} quote={quote} selected={selectedQuote === quote} onSelect={() => setSelectedQuote(quote)}/>)}</div> : <p className="mt-3 text-sm text-slate-500">Pilih wilayah dari dropdown Biteship dan ketik kode pos untuk melihat ongkir.</p>}</div>
      </section>
      <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm"><h2 className="font-black">Konfirmasi checkout</h2><p className="mt-2 text-sm leading-6 text-slate-500">{itemIds.length} item keranjang dipilih. Ongkir diperbarui sesuai lokasi.</p><div className="mt-5 space-y-3 rounded-xl bg-blue-50 p-4 text-sm"><div className="flex justify-between"><span>Subtotal belanja</span><b>{cart ? money(selectedSubtotal) : "Memuat…"}</b></div><div className="flex justify-between"><span>Ongkir</span><b>{selectedQuote ? money(selectedQuote.cost ?? selectedQuote.price ?? selectedQuote.final_price) : "—"}</b></div><div className="flex justify-between border-t border-blue-200 pt-3 text-base"><b>Total belanja</b><b className="text-blue-700">{cart ? money(selectedSubtotal + Number(selectedQuote?.cost ?? selectedQuote?.price ?? selectedQuote?.final_price ?? 0)) : "—"}</b></div></div><a href="/keranjang" className="mt-4 block text-center text-sm font-bold text-blue-700">Ubah pilihan buku</a>
  <button name="method" value="midtrans" className="mt-4 w-full rounded-xl bg-blue-700 py-3 font-bold text-white shadow-sm hover:bg-blue-800 transition">💳 Buat Pesanan & Bayar Online</button>
  <button name="method" value="wa" className="mt-2 w-full rounded-xl bg-green-600 py-3 font-bold text-white shadow-sm hover:bg-green-700 transition flex items-center justify-center gap-2">💬 Pesan lewat WhatsApp</button>
{message && <p className="mt-4 text-sm font-semibold text-blue-700">{message}</p>}</aside>
    </form>
  </main>;
}

function Field({ label, children }) { return <label className="grid gap-1 text-xs font-bold text-slate-600"><span>{label}</span>{children}</label>; }
function Combo({ label, disabled, value, placeholder, onChange, options, onSelect }) { return <div className="relative grid gap-1 text-xs font-bold text-slate-600"><span>{label}</span><input required disabled={disabled} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} autoComplete="off" className="rounded-xl border p-3 text-base font-normal text-slate-900 disabled:bg-slate-100"/>{options.length > 0 && <div className="absolute top-full z-20 mt-1 max-h-60 w-full overflow-auto rounded-xl border bg-white p-1 shadow-xl">{options.map((item) => <button type="button" key={item.key} onClick={() => onSelect(item)} className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium hover:bg-blue-50"><b>{item.title}</b>{item.subtitle && <small className="block text-slate-500">{item.subtitle}</small>}</button>)}</div>}</div>; }
function Quote({ quote, selected, onSelect }) { const cost = Number(quote.cost ?? quote.price ?? quote.final_price ?? 0); const courier = quote.courier_name ?? quote.courier ?? quote.company ?? "Kurir"; const service = quote.courier_service_name ?? quote.service ?? quote.type ?? "Reguler"; return <label className={`flex cursor-pointer justify-between rounded-xl border p-4 ${selected ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}><span><b className="block text-sm">{courier} · {service}</b><small className="text-slate-500">{quote.duration ?? quote.eta ?? "Estimasi mengikuti kurir"}</small></span><b className="text-blue-700">{money(cost)}</b><input type="radio" className="sr-only" checked={selected} onChange={onSelect}/></label>; }
