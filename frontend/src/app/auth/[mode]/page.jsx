"use client";

/* eslint-disable @next/next/no-html-link-for-pages */
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../../lib/api";

export default function AuthPage({ params }) {
  const { mode } = use(params);
  const router = useRouter();
  const login = mode === "login";
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault(); setMessage(""); setLoading(true);
    const form = new FormData(event.currentTarget);
    try {
      const data = await api(`/auth/${login ? "login" : "register"}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(login ? { login: form.get("login"), password: form.get("password") } : { name: form.get("name"), email: form.get("email"), password: form.get("password"), password_confirmation: form.get("password") }) });
      localStorage.setItem("token", data.data.token);
      router.push(data.data.user?.is_admin ? "/admin" : "/akun");
    } catch (error) {
      if (error.status === 429) setMessage("Terlalu banyak percobaan masuk. Tunggu sebentar lalu coba kembali.");
      else if (error.status === 422) setMessage(error.data?.errors?.login?.[0] || Object.values(error.data?.errors || {}).flat()[0] || "Data yang dimasukkan belum valid.");
      else setMessage("Layanan login belum dapat dihubungi. Silakan coba kembali.");
    } finally { setLoading(false); }
  };

  return <main className="grid min-h-screen place-items-center bg-blue-50 p-4"><form onSubmit={submit} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm"><a href="/" className="text-sm font-bold text-blue-700">← Bukupagi</a><h1 className="mt-6 text-3xl font-black">{login ? "Masuk" : "Daftar"}</h1>{!login && <input name="name" required placeholder="Nama" className="mt-6 w-full rounded-xl border p-3"/>}<input name={login ? "login" : "email"} type={login ? "text" : "email"} required placeholder={login ? "Email atau nomor HP" : "Email"} className="mt-3 w-full rounded-xl border p-3"/><input name="password" type="password" required placeholder="Password" className="mt-3 w-full rounded-xl border p-3"/><button disabled={loading} className="mt-5 w-full rounded-xl bg-blue-700 p-3 font-bold text-white disabled:opacity-50">{loading ? "Memproses…" : login ? "Masuk" : "Buat akun"}</button>{message && <p className="mt-4 rounded-xl bg-rose-50 p-3 text-sm font-semibold text-rose-600">{message}</p>}</form></main>;
}
