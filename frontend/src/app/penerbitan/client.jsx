"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SocialLinks from "../../components/SocialLinks";
import InfoModal from "../../components/InfoModal";
import LogoutConfirmModal from "../../components/LogoutConfirmModal";
import StoreMobileControls from "../../components/StoreMobileControls";
import "./penerbitan.css";

const PACKAGES = [
  {
    id: "hemat",
    index: "01 / 06",
    badge: "Untuk memulai",
    name: "Paket Terbit Hemat",
    desc: "Bagi penulis yang ingin mencetak karya dalam jumlah terbatas dengan proses penyuntingan dan penataan yang rapi.",
    price: "Rp725.000",
    spec: "A5 · Maks. 150 halaman · 5 eksemplar",
    features: [
      "Penyuntingan bahasa dasar dan penataan isi",
      "Desain sampul serta berkas siap cetak",
      "Lima eksemplar buku dan materi promosi dasar",
      "Pendampingan dan pengajuan ISBN melalui Perpusnas sesuai kelayakan buku",
    ],
  },
  {
    id: "bisnis",
    index: "02 / 06",
    badge: "Untuk menjangkau pembaca",
    name: "Paket Terbit Bisnis",
    desc: "Untuk naskah yang disiapkan sebagai buku bagi pembaca umum, dengan jumlah buku awal yang lebih banyak.",
    price: "Rp1.425.000",
    spec: "A5 · Maks. 150 halaman · 15 eksemplar",
    features: [
      "Seluruh layanan produksi dasar",
      "Lima belas eksemplar buku cetak",
      "Pencantuman buku pada katalog dan kanal penjualan Vidara yang tersedia",
      "Pendampingan dan pengajuan ISBN melalui Perpusnas sesuai kelayakan buku",
    ],
  },
  {
    id: "all-in-one",
    index: "03 / 06",
    badge: "Pendampingan lebih lengkap",
    name: "Paket Terbit All in One",
    desc: "Untuk penulis yang memerlukan penerbitan sekaligus bantuan menyiapkan dokumen pencatatan hak cipta.",
    price: "Rp1.675.000",
    spec: "A5 · Maks. 150 halaman · 15 eksemplar",
    features: [
      "Seluruh fasilitas Paket Terbit Bisnis",
      "Pendampingan administrasi pencatatan hak cipta",
      "Panduan kelengkapan dan kepemilikan dokumen karya",
      "Biaya resmi pencatatan dikonfirmasi sebelum pemesanan",
      "Pendampingan dan pengajuan ISBN melalui Perpusnas sesuai kelayakan buku",
    ],
  },
  {
    id: "konversi",
    index: "04 / 06",
    badge: "Dari kajian menjadi buku",
    name: "Paket Terbit Konversi",
    desc: "Untuk mengolah skripsi, tesis, disertasi, atau naskah penelitian menjadi buku yang utuh dan lebih nyaman dibaca.",
    price: "Rp2.050.000",
    spec: "A5 · Maks. 200 halaman · 5 eksemplar",
    features: [
      "Penelaahan struktur, sasaran pembaca, dan arah buku",
      "Adaptasi serta penyuntingan naskah akademik",
      "Desain sampul, tata isi, dan lima eksemplar",
      "Pendampingan dan pengajuan ISBN melalui Perpusnas sesuai kelayakan buku",
    ],
  },
  {
    id: "konversi-all-in-one",
    index: "05 / 06",
    badge: "Konversi dan dokumen karya",
    name: "Paket Konversi All in One",
    desc: "Untuk penulis yang ingin mengubah karya akademik menjadi buku sekaligus dibantu menyiapkan administrasi pencatatan hak cipta.",
    price: "Rp2.300.000",
    spec: "A5 · Maks. 200 halaman · 5 eksemplar",
    features: [
      "Seluruh layanan Paket Terbit Konversi",
      "Pendampingan administrasi pencatatan hak cipta",
      "Lima eksemplar buku dan materi promosi dasar",
      "Biaya resmi pencatatan dikonfirmasi sebelum pemesanan",
      "Pendampingan dan pengajuan ISBN melalui Perpusnas sesuai kelayakan buku",
    ],
  },
  {
    id: "prioritas",
    index: "06 / 06",
    badge: "Pilihan produksi khusus",
    name: "Paket Terbit Prioritas",
    desc: "Untuk buku yang memerlukan perhatian lebih pada unsur visual dan pengaturan teknis produksinya.",
    price: "Rp2.400.000",
    spec: "A5 · Maks. 150 halaman · 15 eksemplar",
    features: [
      "Penyuntingan, desain sampul, dan penataan isi",
      "Pengaturan bagian berwarna sesuai kesepakatan spesifikasi",
      "Lima belas eksemplar serta materi promosi dasar",
      "Pendampingan dan pengajuan ISBN melalui Perpusnas sesuai kelayakan buku",
    ],
  },
];

const generateMessage = (packageName) => {
  return `Halo, Vidara Books. Saya ingin berkonsultasi tentang ${packageName.toLowerCase()}.\n\nJenis naskah saya: …\nPerkiraan jumlah halaman: …\nMohon informasi tahapan dan spesifikasi penerbitannya. Terima kasih.`;
};

export default function PenerbitanClient() {
  const router = useRouter();

  // Settings & Marketplace State (from homepage)
  const [marketplace, setMarketplace] = useState({
    app_name: "Vidara Books",
    app_logo: null,
    store_address: "",
    show_app_name_desktop: "1",
    hero_image: "",
    shopee_url: "",
    tokopedia_url: "",
    youtube_url: "",
    whatsapp_url: "",
    facebook_url: "",
    instagram_url: "",
  });

  // Auth, User & Cart state (from homepage)
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [accountOpen, setAccountOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [infoModal, setInfoModal] = useState({ open: false, tab: "tentang" });

  // Publishing form state
  const [selectedPackage, setSelectedPackage] = useState("Belum menentukan paket");
  const [waMessage, setWaMessage] = useState(() => generateMessage("Belum menentukan paket"));

  // Load cached settings
  useEffect(() => {
    try {
      const cached = JSON.parse(localStorage.getItem("app_settings") || "{}");
      setMarketplace((prev) => ({ ...prev, ...cached }));
    } catch {}
  }, []);

  // Fetch settings from API
  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
    fetch(`${base}/settings`, { headers: { Accept: "application/json" } })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload) => {
        if (payload?.data) {
          localStorage.setItem("app_settings", JSON.stringify(payload.data));
          setMarketplace((old) => ({ ...old, ...(payload.data || {}) }));
        }
      })
      .catch(() => null);
  }, []);

  // Fetch cart
  useEffect(() => {
    const token = localStorage.getItem("token");
    const cartToken = localStorage.getItem("cart_token");
    const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
    fetch(`${base}/cart`, {
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(cartToken ? { "X-Cart-Token": cartToken } : {}),
      },
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Cart unavailable");
        return response.json();
      })
      .then((response) => {
        if (response.meta?.cart_token) localStorage.setItem("cart_token", response.meta.cart_token);
        setCartCount(
          (response.data?.items || []).reduce(
            (total, item) => total + Number(item.quantity || 0),
            0
          )
        );
      })
      .catch(() => null);
  }, []);

  // Fetch user auth
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuthLoading(false);
      return;
    }
    const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
    fetch(`${base}/auth/me`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Sesi tidak valid");
        return response.json();
      })
      .then((response) => {
        setUser(response.data);
        setAuthLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setAuthLoading(false);
      });
  }, []);

  const confirmLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setLogoutOpen(false);
  };

  const handlePackageChange = (pkgName) => {
    setSelectedPackage(pkgName);
    setWaMessage(generateMessage(pkgName));
  };

  const handlePick = (pkgName) => {
    handlePackageChange(pkgName);
    const target = document.getElementById("hubungi");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      const selectEl = document.getElementById("package-choice");
      if (selectEl) selectEl.focus({ preventScroll: true });
    }
  };

  // WhatsApp Destination URL
  const rawWa = marketplace?.whatsapp_url || "6285271524200";
  const cleanWaNumber = rawWa.replace(/[^0-9]/g, "") || "6285271524200";
  const waUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(waMessage)}`;

  // Header Brand and Logo
  const appName = marketplace.app_name || "";
  const appLogo = marketplace.app_logo;
  const logoEl = appLogo ? (
    <img
      src={appLogo}
      alt={appName}
      className="h-11 sm:h-12 w-auto max-w-[180px] sm:max-w-[220px] rounded-lg object-contain"
    />
  ) : (
    <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-700 text-xl font-black text-white">
      {(appName || " ")[0].toUpperCase()}
    </span>
  );
  const showAppNameDesktop =
    marketplace.show_app_name_desktop !== "0" && marketplace.show_app_name_desktop !== false;

  return (
    <main className="min-h-screen bg-[#fffdf8] text-stone-900">
      {/* Homepage Header */}
      <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-[#fffdf8]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-3 font-black">
            {logoEl}
            {showAppNameDesktop && (
              <span className="hidden sm:inline text-xl sm:text-2xl tracking-tight">
                {appName}
              </span>
            )}
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-stone-600 lg:flex">
            <Link href="/" className="hover:text-stone-900">
              Beranda
            </Link>
            <Link href="/penerbitan" className="hover:text-stone-900">
              Penerbitan
            </Link>
            <a
              href="/info/tentang"
              onClick={(e) => {
                e.preventDefault();
                setInfoModal({ open: true, tab: "tentang" });
              }}
              className="hover:text-stone-900"
            >
              Tentang Kami
            </a>
          </nav>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const q = new FormData(e.currentTarget).get("q")?.toString().trim();
              router.push(`/cari${q ? `?q=${encodeURIComponent(q)}` : ""}`);
            }}
            className="hidden max-w-sm flex-1 items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-stone-400 shadow-sm lg:flex"
          >
            ⌕
            <input
              name="q"
              className="w-full bg-transparent outline-none"
              placeholder="Cari judul, penulis, atau ISBN"
            />
          </form>
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/keranjang"
              className="relative grid h-10 w-10 place-items-center rounded-full border border-blue-200 bg-white text-lg text-blue-700"
            >
              🛒
              <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-blue-700 px-1 text-[9px] font-black text-white">
                {cartCount}
              </span>
            </Link>
            {authLoading ? (
              <div className="h-9 w-24 animate-pulse rounded-full bg-stone-200"></div>
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setAccountOpen(!accountOpen)}
                  className="flex items-center gap-2 rounded-full border-2 border-blue-700 bg-white py-1.5 pl-2 pr-3 text-sm font-bold text-slate-700"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-blue-600 text-white">
                    {user.name?.slice(0, 1).toUpperCase()}
                  </span>
                  <span className="max-w-28 truncate">{user.name}</span>
                  <span>⌄</span>
                </button>
                {accountOpen && (
                  <div className="absolute right-0 top-12 z-50 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                    <a
                      href={user.is_admin ? "/admin" : "/akun"}
                      className="block rounded-xl px-3 py-3 text-sm font-semibold hover:bg-blue-50"
                    >
                      👤 {user.is_admin ? "Dashboard Admin" : "Akun Saya"}
                    </a>
                    {!user.is_admin && (
                      <a
                        href="/akun/pesanan"
                        className="block rounded-xl px-3 py-3 text-sm font-semibold hover:bg-blue-50"
                      >
                        📦 Pesanan Saya
                      </a>
                    )}
                    <button
                      onClick={() => {
                        setAccountOpen(false);
                        setLogoutOpen(true);
                      }}
                      className="w-full rounded-xl px-3 py-3 text-left text-sm font-bold text-red-600 hover:bg-red-50"
                    >
                      ↪ Keluar
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/login" className="text-sm font-bold text-stone-700">
                  Masuk
                </Link>
                <Link
                  href="/auth/register"
                  className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white"
                >
                  Daftar
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <StoreMobileControls
        user={user}
        cartCount={cartCount}
        settings={marketplace}
        onLogout={() => {
          setAccountOpen(false);
          setLogoutOpen(true);
        }}
        onOpenInfo={(tab) => setInfoModal({ open: true, tab })}
      />

      {/* Penerbitan Content */}
      <div className="penerbitan-page">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-bg-media" aria-hidden="true">
            <picture>
              <source srcSet="/penerbitan-hero.webp" type="image/webp" />
              <img
                src="/penerbitan-hero.jpg"
                alt="Vidara Books Penerbitan"
                className="hero-bg-img"
              />
            </picture>
            <div className="hero-bg-overlay" />
          </div>
          <div className="wrap">
            <div className="hero-copy">
              <span className="eyebrow">Penerbitan · Vidara Books</span>
              <h1>
                Dari gagasan
                <br />
                menjadi buku.
              </h1>
              <p>
                Anda tidak harus datang dengan naskah yang sudah sempurna. Sebuah ide, draf yang belum
                selesai, catatan perjalanan, atau hasil penelitian bisa menjadi awal. Vidara Books
                mendampingi penulis dari pengembangan naskah, penyuntingan, desain, pengurusan ISBN
                melalui Perpustakaan Nasional, hingga buku siap dicetak. Agar gagasan yang berharga
                tidak berhenti sebagai berkas yang tersimpan.
              </p>
              <div className="hero-buttons">
                <a className="btn" href="#paket">
                  Lihat paket penerbitan <span>↘</span>
                </a>
                <a className="btn alt" href="#hubungi">
                  Konsultasikan naskah
                </a>
              </div>
              <div className="hero-mark">
                Rumah bagi gagasan yang layak berumur panjang.
              </div>
            </div>
          </div>
        </section>

        {/* Section: Mengenal Vidara Books */}
        <section className="section" id="tentang">
          <div className="wrap intro-grid">
            <div>
              <div className="eyebrow">Mengenal Vidara Books</div>
              <h2>Setiap naskah punya kebutuhan sendiri.</h2>
              <p className="lead">
                Vidara Books adalah jenama penerbitan dari Vidara Media Aksara. Kami mendampingi
                penulis, akademisi, pendidik, profesional, dan komunitas sejak penelaahan naskah
                hingga persiapan produksi. Setiap pekerjaan dimulai dengan memahami isi buku, siapa
                pembacanya, serta bentuk penerbitan yang paling sesuai. Kami tidak menganggap semua
                naskah dapat dikerjakan dengan cara yang sama.
              </p>
            </div>
            <div className="quote">
              “Buku yang baik tidak lahir hanya karena sebuah naskah selesai ditulis. Isinya perlu
              dipahami, dibentuk, dan dipertemukan dengan pembacanya.”
            </div>
          </div>
        </section>

        {/* Section: Cara Kami Bekerja */}
        <section className="section alt-bg">
          <div className="wrap">
            <div className="eyebrow">Cara kami bekerja</div>
            <h2>Lebih dari sekadar mencetak.</h2>
            <p className="lead">
              Kami melayani karya sastra, nonfiksi, biografi, sejarah, pendidikan, pemikiran, serta
              adaptasi karya akademik menjadi buku untuk pembaca yang lebih luas.
            </p>
            <div className="reasons">
              <div className="reason">
                <h3>Naskah dibaca sebelum dikerjakan</h3>
                <p>
                  Kami mendiskusikan kesiapan tulisan, tujuan terbit, dan kebutuhan perbaikannya
                  sehingga proses tidak berhenti pada urusan cetak.
                </p>
              </div>
              <div className="reason">
                <h3>Bentuk buku direncanakan dengan cermat</h3>
                <p>
                  Struktur, bahasa, tata isi, dan sampul dipertimbangkan sebagai satu kesatuan agar
                  nyaman dibaca.
                </p>
              </div>
              <div className="reason">
                <h3>Ruang lingkup pekerjaan jelas</h3>
                <p>
                  Spesifikasi cetak, jumlah eksemplar, revisi, serta biaya tambahan disepakati
                  sebelum pekerjaan dimulai.
                </p>
              </div>
              <div className="reason">
                <h3>Hak penulis dihormati</h3>
                <p>
                  Ketentuan penggunaan naskah, peredaran buku, dan perhitungan royalti dituangkan
                  dalam perjanjian yang dapat dibaca penulis.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: ISBN Feature & 6 Paket Penerbitan */}
        <section aria-labelledby="isbn-title" className="isbn-feature" id="layanan-isbn">
          <div className="wrap isbn-layout">
            <div>
              <div className="eyebrow">Layanan penerbitan Vidara Books</div>
              <h2 id="isbn-title">Buku Anda, dengan identitas ISBN.</h2>
              <p>
                Vidara Books telah terdaftar sebagai penerbit di Perpustakaan Nasional Republik
                Indonesia dan dapat mengurus ISBN untuk buku yang memenuhi persyaratan. Kami membantu
                menyiapkan data buku, kelengkapan administrasi, hingga pengajuan ISBN sebagai bagian
                dari proses penerbitan.
              </p>
              <p className="isbn-note">
                Pengurusan ISBN tersedia dalam keenam paket penerbitan. ISBN diterbitkan oleh
                Perpustakaan Nasional berdasarkan ketentuan yang berlaku; penerbitan nomor tidak
                dijamin untuk naskah yang belum memenuhi persyaratan.
              </p>
            </div>
            <div aria-label="Pengurusan ISBN" className="isbn-stamp">
              <strong>ISBN</strong>
              <span>Pengurusan ISBN</span>
              <small>Melalui Perpustakaan Nasional Republik Indonesia</small>
            </div>
          </div>
        </section>

        <section className="section" id="paket">
          <div className="wrap">
            <div className="headline-row">
              <div>
                <div className="eyebrow">Harga &amp; fasilitas</div>
                <h2>Pilih cara menerbitkan.</h2>
              </div>
              <p>
                Enam paket penerbitan dengan layanan pengurusan ISBN untuk naskah yang memenuhi syarat.
                Pilih sesuai kebutuhan penyuntingan, jumlah cetak, dan pengembangan buku Anda.
              </p>
            </div>
            <div className="packages">
              {PACKAGES.map((pkg) => (
                <article key={pkg.id} className="package" id={pkg.id}>
                  <div className="pack-top">
                    <span className="pack-index">{pkg.index}</span>
                    <span className="badge">{pkg.badge}</span>
                  </div>
                  <h3>{pkg.name}</h3>
                  <p className="pack-desc">{pkg.desc}</p>
                  <div className="price">{pkg.price}</div>
                  <p className="spec">{pkg.spec}</p>
                  <div className="pack-isbn">Pengurusan ISBN termasuk paket</div>
                  <ul>
                    {pkg.features.map((feat, fidx) => (
                      <li key={fidx}>{feat}</li>
                    ))}
                  </ul>
                  <button
                    className="pick"
                    data-paket={pkg.name}
                    type="button"
                    onClick={() => handlePick(pkg.name)}
                  >
                    Pilih paket <span>↗</span>
                  </button>
                </article>
              ))}
            </div>
            <p className="smallline">
              Harga menggunakan patokan A5 dan jumlah halaman sesuai paket. Spesifikasi cetak,
              layanan administrasi, serta biaya tambahan dijelaskan sebelum pemesanan.
            </p>
          </div>
        </section>

        {/* Section: Yang Anda Peroleh & Alur */}
        <section className="section alt-bg">
          <div className="wrap two-col">
            <div>
              <div className="eyebrow">Yang Anda peroleh</div>
              <h2>Penanganan naskah hingga produksi.</h2>
              <p>
                Setiap paket memuat layanan dasar berikut, dengan penyesuaian ruang lingkup sesuai
                kondisi naskah dan paket pilihan.
              </p>
              <ul className="essentials">
                <li>Diskusi awal mengenai kondisi naskah dan tujuan penerbitan.</li>
                <li>
                  Penyuntingan bahasa dasar, tata letak isi, dan desain sampul sesuai ruang lingkup
                  paket.
                </li>
                <li>
                  Pengurusan ISBN melalui Perpustakaan Nasional untuk buku yang memenuhi ketentuan.
                </li>
                <li>
                  Pembuatan poster promosi, pembatas buku, dan surat keterangan terbit dari Vidara
                  Books.
                </li>
                <li>
                  Penyiapan berkas cetak dan produksi buku dengan spesifikasi yang disepakati.
                </li>
                <li>
                  Peluang pemasaran melalui katalog Vidara Books serta kanal penjualan yang tersedia.
                </li>
                <li>
                  Royalti penulis 15% untuk penjualan yang dikelola Vidara, dengan dasar perhitungan
                  dan periode pelaporan diatur dalam perjanjian.
                </li>
              </ul>
            </div>
            <div id="alur">
              <div className="eyebrow">Tahapan kerja</div>
              <h2>Proses yang bisa diikuti penulis.</h2>
              <ol className="steps">
                <li>
                  <span>01</span>
                  <div>
                    <strong>Ceritakan naskah Anda</strong>
                    <p>
                      Sampaikan jenis karya, perkiraan jumlah halaman, serta tujuan penerbitannya.
                    </p>
                  </div>
                </li>
                <li>
                  <span>02</span>
                  <div>
                    <strong>Tentukan layanan</strong>
                    <p>
                      Kami menelaah kebutuhan naskah dan mendiskusikan paket serta spesifikasi yang
                      sesuai.
                    </p>
                  </div>
                </li>
                <li>
                  <span>03</span>
                  <div>
                    <strong>Siapkan buku</strong>
                    <p>
                      Naskah menjalani penyuntingan, desain, pemeriksaan akhir, dan penyiapan
                      pengajuan ISBN sesuai persyaratan.
                    </p>
                  </div>
                </li>
                <li>
                  <span>04</span>
                  <div>
                    <strong>Cetak dan salurkan</strong>
                    <p>
                      Buku diproduksi sesuai kesepakatan, lalu dapat ditawarkan melalui kanal yang
                      tersedia.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* Section: Pengelolaan Karya & Cetak Sesuai Kebutuhan */}
        <section className="section">
          <div className="wrap two-col">
            <div>
              <div className="eyebrow">Pengelolaan karya</div>
              <h2>Karya Anda, hak Anda.</h2>
              <p>
                Karya yang ditulis dengan sungguh-sungguh perlu dikelola dengan jelas. Pada paket yang
                memuat pendampingan pencatatan hak cipta, kami membantu menyiapkan dokumen dan
                administrasinya. Hak dan kewajiban penulis maupun penerbit dituangkan dalam perjanjian
                tertulis.
              </p>
            </div>
            <div className="callout">
              <span className="eyebrow">Layanan cetak</span>
              <h2>Cetak sesuai kebutuhan.</h2>
              <p>
                Di luar paket penerbitan, Vidara Books dapat menyiapkan cetak tambahan untuk penulis,
                lembaga, maupun komunitas. Jumlah eksemplar, ukuran, kertas, penggunaan warna, dan
                penyelesaian sampul didiskusikan lebih dahulu.
              </p>
              <a className="btn" href="#hubungi">
                Diskusikan kebutuhan cetak →
              </a>
            </div>
          </div>
        </section>

        {/* Section: Ketentuan */}
        <section className="section alt-bg" id="ketentuan">
          <div className="wrap">
            <div className="eyebrow">Sebelum memesan</div>
            <h2>Ketentuan yang perlu diketahui.</h2>
            <ol className="tandc">
              <li>
                Harga berlaku untuk buku hitam-putih ukuran standar (A5 atau setara) dengan batasan
                maksimal halaman sesuai paket, dihitung pada halaman buku jadi. Jika naskah lebih
                panjang, memakai bahan/ukuran berbeda, atau membutuhkan cetak berwarna tambahan,
                biaya disepakati terlebih dahulu.
              </li>
              <li>
                Pengurusan ISBN termasuk dalam layanan keenam paket bagi buku yang memenuhi kriteria
                Perpustakaan Nasional. Vidara Books mengajukan permohonan melalui akun penerbitnya;
                penerbitan ISBN tetap mengikuti penilaian dan ketentuan Perpustakaan Nasional. Harga
                paket merupakan biaya jasa penerbitan, bukan harga nomor ISBN.
              </li>
              <li>
                Paket Konversi mencakup adaptasi editorial dalam batas pekerjaan yang disepakati,
                bukan penulisan penelitian baru, penyediaan data, atau penulisan buku sepenuhnya dari
                awal.
              </li>
              <li>
                Pendampingan pencatatan hak cipta tidak sama dengan jaminan persetujuan. Biaya resmi
                pemerintah untuk pencatatan, jika diajukan, diberitahukan secara terpisah sebelum
                pembayaran.
              </li>
              <li>
                Penempatan buku pada platform digital atau marketplace lain memerlukan proses
                verifikasi, persetujuan platform, dan/atau kerja sama distribusi yang relevan. Tidak
                setiap judul otomatis diterima.
              </li>
              <li>
                Biaya pengiriman, cetak tambahan, dan pekerjaan di luar paket ditentukan berdasarkan
                permintaan dan dituangkan dalam penawaran tertulis.
              </li>
            </ol>
          </div>
        </section>

        {/* Section: FAQ */}
        <section className="section" id="faq">
          <div className="wrap">
            <div className="eyebrow">Tanya jawab</div>
            <h2>Hal yang sering ditanyakan.</h2>
            <div className="faq">
              <details>
                <summary>Apakah saya harus memiliki naskah yang sudah selesai?</summary>
                <p>
                  Tidak selalu. Anda dapat berkonsultasi sejak memiliki gagasan atau draf awal. Namun,
                  penulisan dari nol, pendampingan riset, atau pengembangan naskah besar di luar
                  cakupan paket akan ditawarkan secara terpisah.
                </p>
              </details>
              <details>
                <summary>Apakah Vidara Books dapat mengurus ISBN untuk buku saya?</summary>
                <p>
                  Ya. Vidara Books telah terdaftar sebagai penerbit di Perpustakaan Nasional dan
                  menyediakan pengurusan ISBN dalam setiap paket penerbitan. Kami menyiapkan berkas dan
                  mengajukannya untuk naskah yang memenuhi persyaratan. Keputusan penerbitan ISBN
                  berada pada Perpustakaan Nasional.
                </p>
              </details>
              <details>
                <summary>Bisakah skripsi atau tesis saya langsung diterbitkan sebagai buku?</summary>
                <p>
                  Naskah akademik biasanya perlu diadaptasi terlebih dahulu. Fokus Paket Konversi
                  adalah mengubah kerangka penulisan akademik menjadi buku yang memiliki alur dan
                  pembaca yang lebih luas, bukan sekadar mengganti sampul.
                </p>
              </details>
              <details>
                <summary>Bagaimana jika jumlah halaman melebihi batas paket?</summary>
                <p>
                  Vidara akan menyampaikan penyesuaian biaya berdasarkan jumlah halaman buku setelah
                  ditata, spesifikasi cetak, dan jumlah eksemplar yang diminta.
                </p>
              </details>
              <details>
                <summary>Bagaimana royalti penulis dihitung?</summary>
                <p>
                  Untuk penjualan yang ditangani Vidara Books, ketentuan royalti adalah 15%. Dasar
                  nilai penjualan, periode laporan, dan waktu pembayaran dijelaskan secara tertulis
                  dalam perjanjian sebelum buku dipasarkan.
                </p>
              </details>
              <details>
                <summary>Dapatkah buku saya dijual dalam format digital?</summary>
                <p>
                  Format digital dan pengajuan ke platform distribusi dapat dibicarakan berdasarkan
                  hak penerbitan, kesiapan berkas, dan ketersediaan akses platform. Penempatan buku
                  tidak otomatis dijamin.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* Section: Kontak & Message Generator */}
        <section className="section alt-bg" id="hubungi">
          <div className="wrap contact-box">
            <div>
              <div className="eyebrow">Mulai percakapan</div>
              <h2>Mari bicarakan buku Anda.</h2>
              <p>
                Anda tidak perlu memilih paket sebelum berkonsultasi. Ceritakan naskah dan tujuan
                penerbitan Anda. Kami dapat membantu menimbang pilihan yang paling sesuai.
              </p>
              <p className="fine">
                Pilih paket di samping untuk menyusun draf konsultasi, lalu kirimkan langsung via
                WhatsApp resmi Vidara Books.
              </p>
            </div>
            <div>
              <label htmlFor="package-choice">Paket yang ingin dikonsultasikan</label>
              <select
                id="package-choice"
                value={selectedPackage}
                onChange={(e) => handlePackageChange(e.target.value)}
              >
                <option value="Belum menentukan paket">Belum menentukan paket</option>
                <option value="Paket Terbit Hemat">Paket Terbit Hemat</option>
                <option value="Paket Terbit Bisnis">Paket Terbit Bisnis</option>
                <option value="Paket Terbit All in One">Paket Terbit All in One</option>
                <option value="Paket Terbit Konversi">Paket Terbit Konversi</option>
                <option value="Paket Konversi All in One">Paket Konversi All in One</option>
                <option value="Paket Terbit Prioritas">Paket Terbit Prioritas</option>
              </select>

              <label htmlFor="wa-message" style={{ marginTop: "20px" }}>
                Pesan untuk Vidara Books
              </label>
              <textarea
                id="wa-message"
                spellCheck="true"
                value={waMessage}
                onChange={(e) => setWaMessage(e.target.value)}
              ></textarea>

              <div className="form-actions" style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <a
                  className="btn"
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  Kirim via WhatsApp →
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Homepage Footer */}
      <section className="border-b border-stone-200 bg-orange-100">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-4 py-10 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <p className="text-xl font-black text-stone-950">
              Jangan sampai kehabisan cerita bagus.
            </p>
            <p className="mt-1 text-sm text-stone-600">
              Dapatkan kabar koleksi dan promo pilihan setiap minggu.
            </p>
          </div>
          <form className="flex w-full max-w-md gap-2" onSubmit={(event) => event.preventDefault()}>
            <input
              className="min-w-0 flex-1 rounded-xl border border-orange-200 bg-white px-4 py-3 text-sm outline-none"
              type="email"
              placeholder="Email kamu"
              aria-label="Email kamu"
            />
            <button className="rounded-xl bg-stone-950 px-4 py-3 text-sm font-bold text-white">
              Berlangganan
            </button>
          </form>
        </div>
      </section>

      <footer>
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
          <div>
            <div className="flex items-center font-black text-stone-950">
              {appLogo ? (
                <img
                  src={appLogo}
                  alt=""
                  className="h-10 sm:h-11 w-auto max-w-[180px] rounded-lg object-contain"
                />
              ) : (
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-orange-700 text-sm text-white">
                  {(appName || " ")[0].toUpperCase()}
                </span>
              )}
            </div>
            <p className="mt-4 max-w-sm whitespace-pre-line text-sm leading-6 text-stone-600">
              {marketplace.store_address || "Alamat toko belum diatur."}
            </p>
            <SocialLinks settings={marketplace} />
          </div>
          <div>
            <h2 className="font-bold">Jelajahi</h2>
            <div className="mt-4 grid gap-3 text-sm text-stone-600">
              <a href="/#kategori">Kategori</a>
              <a href="/#terbaru">Buku baru</a>
              <a href="/#terlaris">Terlaris</a>
              <a href="/#promo">Promo</a>
            </div>
          </div>
          <div>
            <h2 className="font-bold">Bantuan</h2>
            <div className="mt-4 grid gap-3 text-sm text-stone-600">
              <button
                type="button"
                onClick={() => setInfoModal({ open: true, tab: "tentang" })}
                className="text-left hover:text-stone-950 transition cursor-pointer"
              >
                Tentang kami
              </button>
              <Link
                href="/penerbitan"
                className="text-left font-semibold text-stone-950 hover:text-stone-950 transition cursor-pointer"
              >
                Layanan penerbitan
              </Link>
              <button
                type="button"
                onClick={() => setInfoModal({ open: true, tab: "cara-belanja" })}
                className="text-left hover:text-stone-950 transition cursor-pointer"
              >
                Cara belanja
              </button>
              <button
                type="button"
                onClick={() => setInfoModal({ open: true, tab: "pengiriman" })}
                className="text-left hover:text-stone-950 transition cursor-pointer"
              >
                Pengiriman
              </button>
              <button
                type="button"
                onClick={() => setInfoModal({ open: true, tab: "kontak" })}
                className="text-left hover:text-stone-950 transition cursor-pointer"
              >
                Hubungi kami
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-stone-200">
          <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-stone-500 sm:px-6 lg:px-8">
            © 2026. Dibuat untuk pembaca yang selalu ingin tahu.
          </p>
        </div>
      </footer>

      <LogoutConfirmModal
        open={logoutOpen}
        onCancel={() => setLogoutOpen(false)}
        onConfirm={confirmLogout}
      />
      <InfoModal
        open={infoModal.open}
        tab={infoModal.tab}
        onClose={() => setInfoModal((prev) => ({ ...prev, open: false }))}
        onTabChange={(tab) => setInfoModal({ open: true, tab })}
        settings={marketplace}
      />
    </main>
  );
}
