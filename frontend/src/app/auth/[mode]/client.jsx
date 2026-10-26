"use client";
/* eslint-disable @next/next/no-html-link-for-pages */
import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "../../../lib/api";

// Helper untuk memastikan URL logo mengarah ke domain backend yang tepat
function resolveMediaUrl(url) {
  if (!url || typeof url !== "string") return "";

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
  let backendOrigin = "";
  if (apiUrl) {
    try {
      backendOrigin = new URL(apiUrl).origin;
    } catch {}
  }

  // Jika URL gambar mengarah ke localhost tapi NEXT_PUBLIC_API_URL mengarah ke domain hosting
  if (backendOrigin && !backendOrigin.includes("localhost") && url.includes("localhost")) {
    try {
      const parsed = new URL(url);
      return `${backendOrigin}${parsed.pathname}${parsed.search}`;
    } catch {}
  }

  // Jika URL gambar berupa path relatif (/media/... atau /storage/...)
  if (url.startsWith("/")) {
    return backendOrigin ? `${backendOrigin}${url}` : url;
  }

  return url;
}

export default function AuthPage({ params }) {
  const { mode } = use(params);
  const router = useRouter();

  const isLogin = mode === "login";
  const isForgotPassword = mode === "forgot-password";
  const isRegister = !isLogin && !isForgotPassword;

  const [message, setMessage] = useState("");
  const [successNotice, setSuccessNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Data identitas toko (judul & logo) diambil langsung dari database
  const [settings, setSettings] = useState({
    app_name: "",
    app_logo: "",
    store_address: "",
  });
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    // 1. Ambil dari cache localStorage agar cepat tanpa flicker
    try {
      const cached = JSON.parse(localStorage.getItem("app_settings") || "{}");
      if (cached && (cached.app_name || cached.app_logo)) {
        setSettings((prev) => ({ ...prev, ...cached }));
      }
    } catch {}

    // 2. Fetch data langsung dari database backend (/settings)
    api("/settings")
      .then((res) => {
        if (res?.data) {
          setSettings((prev) => ({ ...prev, ...res.data }));
          try {
            localStorage.setItem("app_settings", JSON.stringify(res.data));
          } catch {}
        }
      })
      .catch(() => {
        // Fallback fetch jika ada perbedaan konfigurasi
        const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
        fetch(`${apiUrl}/settings`, { headers: { Accept: "application/json" } })
          .then((r) => (r.ok ? r.json() : null))
          .then((res) => {
            if (res?.data) {
              setSettings((prev) => ({ ...prev, ...res.data }));
              try {
                localStorage.setItem("app_settings", JSON.stringify(res.data));
              } catch {}
            }
          })
          .catch(() => null);
      });
  }, []);

  const appName = settings.app_name?.trim() || "";
  const rawLogo = settings.app_logo?.trim() || "";
  const logoSrc = !logoError && rawLogo ? resolveMediaUrl(rawLogo) : null;

  // Set document title dinamis dari database
  useEffect(() => {
    const storeTitle = appName || "Toko Buku";
    const pageTitle = isLogin
      ? `Masuk - ${storeTitle}`
      : isForgotPassword
      ? `Lupa Kata Sandi - ${storeTitle}`
      : `Daftar Akun Baru - ${storeTitle}`;
    document.title = pageTitle;
  }, [isLogin, isForgotPassword, appName]);

  const submit = async (event) => {
    event.preventDefault();
    setMessage("");
    setSuccessNotice("");
    setLoading(true);

    const form = new FormData(event.currentTarget);

    if (isForgotPassword) {
      const email = form.get("email")?.toString().trim();
      try {
        const data = await api("/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        setSuccessNotice(data.message || "Tautan reset kata sandi telah dikirim ke email Anda.");
      } catch (error) {
        if (error.status === 422) {
          setMessage(error.data?.errors?.email?.[0] || error.data?.message || "Email tidak valid.");
        } else if (error.data?.message) {
          setMessage(error.data.message);
        } else {
          const targetApi = process.env.NEXT_PUBLIC_API_URL || "server backend";
          setMessage(`Layanan backend (${targetApi}) belum dapat dihubungi. Pastikan server backend sudah aktif.`);
        }
      } finally {
        setLoading(false);
      }
      return;
    }

    if (isRegister) {
      const password = form.get("password")?.toString();
      const passwordConfirmation = form.get("password_confirmation")?.toString();
      if (password !== passwordConfirmation) {
        setMessage("Konfirmasi kata sandi tidak cocok. Silakan periksa kembali.");
        setLoading(false);
        return;
      }
    }

    try {
      const bodyPayload = isLogin
        ? {
            login: form.get("login")?.toString().trim(),
            password: form.get("password")?.toString(),
          }
        : {
            name: form.get("name")?.toString().trim(),
            email: form.get("email")?.toString().trim(),
            phone: form.get("phone")?.toString().trim() || undefined,
            password: form.get("password")?.toString(),
            password_confirmation: form.get("password_confirmation")?.toString(),
          };

      const data = await api(`/auth/${isLogin ? "login" : "register"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyPayload),
      });

      localStorage.setItem("token", data.data.token);
      const redirectParams = new URLSearchParams(window.location.search);
      const redirectTo = redirectParams.get("redirect") || (data.data.user?.is_admin ? "/admin" : "/akun");
      router.push(redirectTo);
    } catch (error) {
      if (error.status === 429) {
        setMessage("Terlalu banyak percobaan masuk. Tunggu beberapa saat lalu coba kembali.");
      } else if (error.status === 422) {
        setMessage(
          error.data?.errors?.login?.[0] ||
          error.data?.errors?.email?.[0] ||
          error.data?.errors?.password?.[0] ||
          error.data?.errors?.name?.[0] ||
          error.data?.errors?.phone?.[0] ||
          Object.values(error.data?.errors || {}).flat()[0] ||
          error.data?.message ||
          "Data yang dimasukkan belum valid."
        );
      } else if (error.status === 401) {
        setMessage(error.data?.message || "Email / nomor telepon atau kata sandi tidak cocok.");
      } else if (error.data?.message) {
        setMessage(error.data.message);
      } else {
        const targetApi = process.env.NEXT_PUBLIC_API_URL || "server backend";
        setMessage(`Layanan backend (${targetApi}) belum dapat dihubungi. Pastikan server backend sudah aktif.`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-3 sm:p-6 lg:p-10 relative overflow-hidden">
      {/* Background glowing ambient elements */}
      <div className="absolute top-0 -left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse pointer-events-none" />
      <div className="absolute bottom-0 -right-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse pointer-events-none" style={{ animationDelay: "3s" }} />

      {/* Main Container Card */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(30,58,138,0.12)] border border-slate-200/80 overflow-hidden relative z-10 grid grid-cols-1 lg:grid-cols-12 animate-fade-in-up">
        
        {/* LEFT PANEL - Brand / Hero Showcase (Desktop only) */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white p-8 sm:p-10 flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-blue-400/10 blur-2xl pointer-events-none" />

          {/* Top: Logo & Judul Toko dari Database */}
          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-3.5 group transition-transform hover:scale-[1.02]">
              {logoSrc ? (
                <div className="p-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-md">
                  <img
                    src={logoSrc}
                    alt={appName || "Logo"}
                    onError={() => setLogoError(true)}
                    className="h-12 w-auto max-w-[170px] object-contain rounded-lg"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-blue-600/40 border border-blue-400/30">
                  {(appName || "T").slice(0, 1).toUpperCase()}
                </div>
              )}
              <div>
                <span className="text-2xl font-black tracking-tight text-white block leading-tight">
                  {appName || "Toko Buku"}
                </span>
                <span className="text-[11px] font-semibold text-blue-300 uppercase tracking-widest mt-0.5 block">
                  Toko Buku &amp; Penerbitan
                </span>
              </div>
            </Link>
          </div>

          {/* Middle: Keunggulan Toko */}
          <div className="my-8 relative z-10 space-y-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-200 border border-blue-400/20 mb-3">
                Ruang Literasi &amp; Karya Pilihan
              </span>
              <h2 className="text-2xl font-black leading-tight text-white tracking-tight">
                {isLogin
                  ? `Selamat datang kembali di ${appName || "toko buku kami"}.`
                  : isForgotPassword
                  ? "Akses kembali akun dan koleksi favorit Anda."
                  : `Mulai perjalanan membaca bersama ${appName || "kami"}.`}
              </h2>
              <p className="mt-3 text-sm text-blue-200/80 leading-relaxed">
                Temukan koleksi buku original berkualitas dari berbagai genre, promo menarik, dan layanan pengiriman terpercaya.
              </p>
            </div>

            <div className="space-y-3.5 pt-2 border-t border-white/10 text-xs font-medium text-blue-100">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-800/60 border border-blue-400/20 flex items-center justify-center text-blue-300 shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span>100% Koleksi Buku Asli &amp; Berkualitas</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-800/60 border border-blue-400/20 flex items-center justify-center text-blue-300 shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <span>Pengiriman Cepat &amp; Kemasan Ekstra Aman</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-800/60 border border-blue-400/20 flex items-center justify-center text-blue-300 shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span>Kemudahan Lacak Pesanan Realtime</span>
              </div>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="relative z-10 text-[11px] text-blue-300/70 border-t border-white/10 pt-4 flex items-center justify-between">
            <span>&copy; {new Date().getFullYear()} {appName || "Toko Buku"}</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Sistem Aktif
            </span>
          </div>
        </div>

        {/* RIGHT PANEL - Authentication Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-center bg-white">
          
          {/* Top Bar: Return Link & Mode Tabs */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Kembali ke Beranda</span>
            </Link>

            {!isForgotPassword && (
              <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200/80 text-xs font-bold">
                <Link
                  href="/auth/login"
                  className={`px-3.5 py-1.5 rounded-lg transition-all ${
                    isLogin
                      ? "bg-white text-blue-700 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Masuk
                </Link>
                <Link
                  href="/auth/register"
                  className={`px-3.5 py-1.5 rounded-lg transition-all ${
                    isRegister
                      ? "bg-white text-blue-700 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>

          {/* Logo & Judul Toko Header (Diambil dari Database) */}
          <div className="flex items-center gap-3.5 mb-6">
            {logoSrc ? (
              <div className="shrink-0 p-1.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                <img
                  src={logoSrc}
                  alt={appName || "Logo Toko"}
                  onError={() => setLogoError(true)}
                  className="h-11 sm:h-12 w-auto max-w-[160px] object-contain rounded-xl"
                />
              </div>
            ) : appName ? (
              <div className="shrink-0 w-11 h-11 rounded-2xl bg-blue-700 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-700/20">
                {appName.slice(0, 1).toUpperCase()}
              </div>
            ) : null}

            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                {isLogin
                  ? appName ? `Masuk ke ${appName}` : "Masuk ke Akun Anda"
                  : isForgotPassword
                  ? appName ? `Lupa Sandi - ${appName}` : "Lupa Kata Sandi"
                  : appName ? `Daftar Akun ${appName}` : "Daftar Akun Baru"}
              </h1>
              <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                {isLogin
                  ? `Silakan masuk ke akun Anda untuk melanjutkan belanja${appName ? ` di ${appName}` : ""}.`
                  : isForgotPassword
                  ? "Masukkan alamat email yang terdaftar untuk menerima tautan pemulihan kata sandi."
                  : `Lengkapi formulir di bawah ini untuk mulai berbelanja${appName ? ` di ${appName}` : ""}.`}
              </p>
            </div>
          </div>

          {/* Success Notification */}
          {successNotice && (
            <div className="mb-5 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-900 flex items-start gap-3 shadow-sm">
              <svg className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm">
                <p className="font-bold">Berhasil Terkirim</p>
                <p className="mt-0.5 text-emerald-800">{successNotice}</p>
                <Link href="/auth/login" className="inline-block mt-2 font-bold text-emerald-700 hover:underline">
                  &larr; Kembali ke halaman Masuk
                </Link>
              </div>
            </div>
          )}

          {/* Error Notification */}
          {message && (
            <div className="mb-5 rounded-2xl bg-rose-50 border border-rose-200 p-4 text-rose-900 flex items-start gap-3 shadow-sm">
              <svg className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div className="text-sm">
                <p className="font-bold">Perhatian</p>
                <p className="mt-0.5 text-rose-700">{message}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={submit} className="space-y-4">
            
            {/* Mode Register: Nama Lengkap */}
            {isRegister && (
              <div>
                <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Nama Lengkap Anda"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50/60 hover:bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 rounded-xl text-slate-900 text-sm font-medium transition-all outline-none"
                  />
                </div>
              </div>
            )}

            {/* Email / Login Identifier */}
            {isLogin ? (
              <div>
                <label htmlFor="login" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Email atau Nomor HP
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                    </svg>
                  </div>
                  <input
                    id="login"
                    name="login"
                    type="text"
                    required
                    autoComplete="username"
                    placeholder="nama@email.com atau 08123456789"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50/60 hover:bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 rounded-xl text-slate-900 text-sm font-medium transition-all outline-none"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Alamat Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="nama@email.com"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50/60 hover:bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 rounded-xl text-slate-900 text-sm font-medium transition-all outline-none"
                  />
                </div>
              </div>
            )}

            {/* Mode Register: Nomor HP (Opsional) */}
            {isRegister && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Nomor WhatsApp / HP
                  </label>
                  <span className="text-[11px] text-slate-400 font-medium">Opsional</span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="081234567890 (untuk kurir / info pengiriman)"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50/60 hover:bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 rounded-xl text-slate-900 text-sm font-medium transition-all outline-none"
                  />
                </div>
              </div>
            )}

            {/* Password Field (for Login and Register) */}
            {!isForgotPassword && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Kata Sandi
                  </label>
                  {isLogin && (
                    <Link
                      href="/auth/forgot-password"
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Lupa sandi?
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-11 py-3 bg-slate-50/60 hover:bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 rounded-xl text-slate-900 text-sm font-medium transition-all outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {isRegister && (
                  <p className="mt-1 text-[11px] text-slate-500 font-medium">
                    Minimal 8 karakter, wajib kombinasi huruf besar, huruf kecil, dan angka.
                  </p>
                )}
              </div>
            )}

            {/* Mode Register: Konfirmasi Kata Sandi */}
            {isRegister && (
              <div>
                <label htmlFor="password_confirmation" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Ulangi Kata Sandi
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <input
                    id="password_confirmation"
                    name="password_confirmation"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    autoComplete="new-password"
                    placeholder="Ulangi kata sandi Anda"
                    className="w-full pl-11 pr-11 py-3 bg-slate-50/60 hover:bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 rounded-xl text-slate-900 text-sm font-medium transition-all outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Sembunyikan konfirmasi kata sandi" : "Tampilkan konfirmasi kata sandi"}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Mode Login: Ingat Saya */}
            {isLogin && (
              <div className="flex items-center pt-1">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="remember" className="ml-2.5 block text-xs font-semibold text-slate-600 cursor-pointer">
                  Ingat sesi saya di perangkat ini
                </label>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full justify-center items-center gap-2 rounded-xl bg-blue-700 hover:bg-blue-800 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-700/25 transition-all duration-200 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {isLogin
                        ? "Masuk ke Akun"
                        : isForgotPassword
                        ? "Kirim Tautan Reset Sandi"
                        : "Daftar Akun Baru"}
                    </span>
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Bottom Switcher */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            {isLogin ? (
              <p className="text-sm text-slate-600">
                Belum memiliki akun{appName ? ` ${appName}` : ""}?{" "}
                <Link
                  href="/auth/register"
                  className="font-bold text-blue-700 hover:text-blue-800 hover:underline transition-colors"
                >
                  Daftar akun sekarang
                </Link>
              </p>
            ) : isForgotPassword ? (
              <p className="text-sm text-slate-600">
                Sudah ingat kata sandi Anda?{" "}
                <Link
                  href="/auth/login"
                  className="font-bold text-blue-700 hover:text-blue-800 hover:underline transition-colors"
                >
                  Masuk di sini
                </Link>
              </p>
            ) : (
              <p className="text-sm text-slate-600">
                Sudah memiliki akun terdaftar?{" "}
                <Link
                  href="/auth/login"
                  className="font-bold text-blue-700 hover:text-blue-800 hover:underline transition-colors"
                >
                  Masuk di sini
                </Link>
              </p>
            )}
          </div>

          {/* Security Assurance Badge */}
          <div className="mt-5 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Koneksi aman &amp; data terlindungi enkripsi standar industri</span>
          </div>

        </div>
      </div>
    </main>
  );
}
