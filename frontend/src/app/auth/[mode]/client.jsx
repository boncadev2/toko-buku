"use client";
/* eslint-disable @next/next/no-html-link-for-pages */
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Decorative background blobs for a modern touch */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>

      <div className="w-full max-w-[400px] relative z-10">
        {/* Header / Logo */}
        <div className="text-center mb-8 animate-fade-in-up">
          <Link href="/" className="inline-flex items-center justify-center gap-2 text-2xl font-bold text-blue-600 transition-transform hover:scale-105 active:scale-95">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c1.66 0 3.192.482 4.5 1.307A.75.75 0 0023 19.25V5.006a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
              </svg>
            </div>
            Bukupagi
          </Link>
          <h2 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900">
            {login ? "Masuk ke akun Anda" : "Daftar akun baru"}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {login ? "Belum punya akun? " : "Sudah punya akun? "}
            <Link href={login ? "/auth/register" : "/auth/login"} className="font-medium text-blue-600 hover:text-blue-500 hover:underline transition-all">
              {login ? "Daftar sekarang" : "Masuk di sini"}
            </Link>
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-white/80 backdrop-blur-xl px-6 py-8 sm:px-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 animate-fade-in-up delay-100">
          <form onSubmit={submit} className="space-y-5">
            {!login && (
              <div className="animate-fade-in-up delay-200">
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">Nama Lengkap</label>
                <div className="mt-1.5 relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="block w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 sm:text-sm transition-all duration-300"
                    placeholder="Nama Anda"
                  />
                </div>
              </div>
            )}

            <div className="animate-fade-in-up delay-200">
              <label htmlFor="login" className="block text-sm font-medium text-slate-700">
                {login ? "Email atau Nomor HP" : "Alamat Email"}
              </label>
              <div className="mt-1.5 relative">
                <input
                  id="login"
                  name={login ? "login" : "email"}
                  type={login ? "text" : "email"}
                  required
                  className="block w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 sm:text-sm transition-all duration-300"
                  placeholder={login ? "email@contoh.com" : "email@contoh.com"}
                />
              </div>
            </div>

            <div className="animate-fade-in-up delay-300">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
                {login && (
                  <Link href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">Lupa password?</Link>
                )}
              </div>
              <div className="mt-1.5 relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 sm:text-sm transition-all duration-300"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="animate-fade-in-up delay-300 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full justify-center items-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 hover:shadow-blue-600/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Memproses...
                  </>
                ) : (
                  <>
                    {login ? "Masuk ke Akun" : "Daftar Sekarang"}
                    <span className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                      &rarr;
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {message && (
          <div className="mt-4 rounded-xl bg-red-50 p-4 border border-red-100 flex shadow-sm animate-fade-in-up">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
            </svg>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">{message}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
