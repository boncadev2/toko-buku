"use client";

/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import AdminShell, { adminHeaders, ErrorBox, Loading, money } from "../../../components/AdminShell";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
const emptyBook = { category_id: "", sku: "", slug: "", title: "", author: "", publisher: "", publication_year: "", isbn: "", pages: "", short_description: "", description: "", cost_price: "", price: "", weight: "", stock: 0, minimum_stock: 3, is_featured: false, is_active: true };
const slugify = (value) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function ProductsPage() {
  const [books, setBooks] = useState(null);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyBook);
  const [cover, setCover] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const response = await api(`/admin/books?per_page=100${search ? `&search=${encodeURIComponent(search)}` : ""}`, { headers: adminHeaders() });
      setBooks(response.data || []);
      setError("");
    } catch { setError("Data produk tidak dapat dimuat."); }
  };

  useEffect(() => {
    load();
    api("/categories").then((response) => setCategories(response.data || [])).catch(() => setCategories([]));
  }, []);

  const openCreate = () => { setEditing(null); setForm(emptyBook); setCover(null); setNotice(""); setFormOpen(true); };
  const openEdit = (book) => {
    setEditing(book);
    setForm(Object.fromEntries(Object.keys(emptyBook).map((key) => [key, book[key] ?? emptyBook[key]])));
    setCover(null); setNotice(""); setFormOpen(true);
  };
  const closeForm = () => { if (!saving) setFormOpen(false); };
  const change = (key, value) => setForm((old) => ({ ...old, [key]: value }));
  const titleChange = (value) => setForm((old) => ({ ...old, title: value, slug: editing || old.slug ? old.slug : slugify(value) }));

  const save = async (event) => {
    event.preventDefault(); setSaving(true); setError(""); setNotice("");
    const body = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== "" && value !== null) body.append(key, typeof value === "boolean" ? (value ? "1" : "0") : value);
    });
    if (cover) body.append("cover_image", cover);
    if (editing) body.append("_method", "PUT");
    try {
      const response = await fetch(`${apiUrl}/admin/books${editing ? `/${editing.id}` : ""}`, { method: "POST", headers: adminHeaders(), body });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        const validation = Object.values(payload.errors || {}).flat().join(" ");
        throw new Error(validation || payload.message || "Produk gagal disimpan.");
      }
      setNotice(editing ? "Produk berhasil diperbarui." : "Produk berhasil ditambahkan.");
      setFormOpen(false); await load();
    } catch (saveError) { setError(saveError.message); }
    finally { setSaving(false); }
  };

  const remove = async (book) => {
    if (!window.confirm(`Hapus produk “${book.title}”?`)) return;
    try {
      await api(`/admin/books/${book.id}`, { method: "DELETE", headers: adminHeaders() });
      setNotice("Produk berhasil dihapus."); await load();
    } catch { setError("Produk tidak dapat dihapus. Periksa apakah produk masih digunakan pesanan."); }
  };

  return <AdminShell title="Produk" description="Tambah, ubah, dan kelola seluruh katalog buku toko.">
    <div className="mt-6 flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm sm:flex-row">
      <form onSubmit={(event) => { event.preventDefault(); load(); }} className="flex min-w-0 flex-1 gap-3"><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari judul, penulis, ISBN, atau SKU" className="min-w-0 flex-1 rounded-xl border px-4 py-3 text-sm"/><button className="rounded-xl border border-blue-200 px-5 py-3 text-sm font-bold text-blue-700">Cari</button></form>
      <button onClick={openCreate} className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white">+ Tambah Produk</button>
    </div>
    {notice && <div className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm font-bold text-emerald-700">✓ {notice}</div>}
    {error && <ErrorBox message={error}/>} 
    {!books ? <Loading/> : <div className="mt-6 overflow-x-auto rounded-3xl bg-white p-5 shadow-sm"><table className="w-full min-w-[920px] text-left text-sm"><thead className="border-b text-xs uppercase tracking-wide text-slate-400"><tr><th className="pb-3">Produk</th><th>Kategori</th><th>Harga</th><th>Stok</th><th>Status</th><th className="text-right">Aksi</th></tr></thead><tbody>{books.map((book) => <tr key={book.id} className="border-b border-slate-100"><td className="py-4"><div className="flex items-center gap-3">{book.cover_image_url ? <img src={book.cover_image_url} alt="" className="h-16 w-12 rounded-lg object-cover"/> : <span className="grid h-16 w-12 place-items-center rounded-lg bg-blue-50 text-xl">📘</span>}<div><b className="block max-w-64 truncate">{book.title}</b><small className="text-slate-500">{book.author || "Tanpa penulis"} · {book.sku}</small></div></div></td><td>{book.category?.name || "—"}</td><td className="font-bold text-blue-700">{money(book.price)}</td><td><b>{book.stock}</b><small className="block text-slate-400">Min. {book.minimum_stock}</small></td><td><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${book.is_active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{book.is_active ? "Aktif" : "Nonaktif"}</span></td><td><div className="flex justify-end gap-2"><button onClick={() => openEdit(book)} className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700">Edit</button><button onClick={() => remove(book)} className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700">Hapus</button></div></td></tr>)}</tbody></table>{!books.length && <p className="py-10 text-center text-slate-400">Produk tidak ditemukan.</p>}</div>}

    {formOpen && <div className="fixed inset-0 z-[70] overflow-y-auto bg-slate-950/55 p-4 backdrop-blur-sm"><div className="mx-auto my-5 w-full max-w-4xl rounded-3xl bg-white shadow-2xl"><div className="sticky top-0 z-10 flex items-center justify-between rounded-t-3xl border-b bg-white px-6 py-5"><div><h2 className="text-xl font-black">{editing ? "Edit Produk" : "Tambah Produk"}</h2><p className="text-sm text-slate-500">Lengkapi informasi buku dan stok.</p></div><button onClick={closeForm} className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-xl">×</button></div><form onSubmit={save} className="p-6"><div className="grid gap-5 md:grid-cols-2"><Field label="Judul buku *"><input required value={form.title} onChange={(event) => titleChange(event.target.value)} className="input"/></Field><Field label="Kategori *"><select required value={form.category_id} onChange={(event) => change("category_id", event.target.value)} className="input"><option value="">Pilih kategori</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></Field><Field label="SKU *"><input required value={form.sku} onChange={(event) => change("sku", event.target.value)} className="input" placeholder="BK-001"/></Field><Field label="Slug *"><input required value={form.slug} onChange={(event) => change("slug", slugify(event.target.value))} className="input"/></Field><Field label="Penulis"><input value={form.author} onChange={(event) => change("author", event.target.value)} className="input"/></Field><Field label="Penerbit"><input value={form.publisher} onChange={(event) => change("publisher", event.target.value)} className="input"/></Field><Field label="ISBN"><input value={form.isbn} onChange={(event) => change("isbn", event.target.value)} className="input"/></Field><Field label="Tahun terbit"><input type="number" min="1000" max="9999" value={form.publication_year} onChange={(event) => change("publication_year", event.target.value)} className="input"/></Field><Field label="Jumlah halaman"><input type="number" min="1" value={form.pages} onChange={(event) => change("pages", event.target.value)} className="input"/></Field><Field label="Berat (gram)"><input type="number" min="0" value={form.weight} onChange={(event) => change("weight", event.target.value)} className="input"/></Field><Field label="Harga modal *"><input required type="number" min="0" value={form.cost_price} onChange={(event) => change("cost_price", event.target.value)} className="input"/></Field><Field label="Harga jual *"><input required type="number" min="0" value={form.price} onChange={(event) => change("price", event.target.value)} className="input"/></Field><Field label="Stok *"><input required type="number" min="0" value={form.stock} onChange={(event) => change("stock", event.target.value)} className="input"/></Field><Field label="Batas minimum stok *"><input required type="number" min="0" value={form.minimum_stock} onChange={(event) => change("minimum_stock", event.target.value)} className="input"/></Field><Field label="Sampul buku"><input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => setCover(event.target.files?.[0] || null)} className="input file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:font-bold file:text-blue-700"/>{editing?.cover_image_url && !cover && <small className="mt-1 text-slate-400">Kosongkan jika sampul tidak diubah.</small>}</Field><div className="grid content-center gap-3"><label className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={Boolean(form.is_active)} onChange={(event) => change("is_active", event.target.checked)} className="h-4 w-4"/> Tampilkan produk di toko</label><label className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={Boolean(form.is_featured)} onChange={(event) => change("is_featured", event.target.checked)} className="h-4 w-4"/> Jadikan produk unggulan</label></div><Field label="Deskripsi singkat" wide><textarea value={form.short_description} onChange={(event) => change("short_description", event.target.value)} className="input min-h-20"/></Field><Field label="Deskripsi lengkap" wide><textarea value={form.description} onChange={(event) => change("description", event.target.value)} className="input min-h-28"/></Field></div><div className="mt-7 flex justify-end gap-3 border-t pt-5"><button type="button" onClick={closeForm} className="rounded-xl border px-5 py-3 text-sm font-bold text-slate-600">Batal</button><button disabled={saving} className="rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white disabled:opacity-50">{saving ? "Menyimpan…" : editing ? "Simpan Perubahan" : "Tambah Produk"}</button></div></form></div></div>}
  </AdminShell>;
}

function Field({ label, wide = false, children }) { return <label className={`grid gap-1.5 text-xs font-bold text-slate-600 ${wide ? "md:col-span-2" : ""}`}><span>{label}</span>{children}</label>; }
