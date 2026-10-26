"use client";

import { useEffect } from "react";

const tabMeta = {
  tentang: {
    title: "Tentang Kami",
    icon: "📖",
    key: "about_us",
    badge: "Profil & Visi",
    fallback: (appName, address) => (
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Selamat datang di <strong className="text-slate-900">{appName || "Toko Buku Kami"}</strong>. Kami adalah penerbitan dan toko buku yang berdedikasi untuk merawat gagasan bermakna, menyebarkan inspirasi, serta menyajikan karya-karya pilihan bagi para pembaca yang selalu haus akan wawasan.
        </p>
        <p>
          Setiap buku dalam koleksi kami dikurasi dengan cermat—mulai dari sastra, filsafat, pengembangan diri, hingga sains dan sejarah—untuk menemani rasa ingin tahu, ide besar, serta waktu tenang Anda di rumah.
        </p>
        {address && (
          <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-900">Alamat Toko</p>
            <p className="mt-1 text-xs sm:text-sm text-slate-700 whitespace-pre-line">{address}</p>
          </div>
        )}
      </div>
    ),
  },
  penerbitan: {
    title: "Layanan Penerbitan",
    icon: "✍️",
    key: "publishing_info",
    badge: "Terbitkan Bukumu",
    fallback: (appName, address, settings) => (
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Ingin menerbitkan buku impian Anda? <strong className="text-slate-900">{appName || "Kami"}</strong> menyediakan layanan penerbitan lengkap dan profesional bagi penulis independen, akademisi, komunitas, maupun organisasi.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 pt-1">
          <div className="rounded-2xl border border-orange-100 bg-orange-50/50 p-4">
            <p className="font-bold text-slate-900">📝 Kurasi &amp; Editorial</p>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">Proofreading, penyelarasan tata bahasa, dan kurasi naskah agar karya Anda berbobot dan nyaman dibaca.</p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-orange-50/50 p-4">
            <p className="font-bold text-slate-900">🎨 Desain Sampul &amp; Layout</p>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">Desain visual sampul memikat serta tata letak isi buku yang rapi, elegan, dan proporsional.</p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-orange-50/50 p-4">
            <p className="font-bold text-slate-900">🔖 Legalitas &amp; ISBN Resmi</p>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">Pengurusan ISBN resmi Perpustakaan Nasional RI dan barcode penerbitan untuk legalitas karya Anda.</p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-orange-50/50 p-4">
            <p className="font-bold text-slate-900">🖨️ Percetakan &amp; Distribusi</p>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">Pilihan cetak print-on-demand maupun cetak massal, dengan kesempatan distribusi di katalog toko.</p>
          </div>
        </div>
        {settings?.whatsapp_url && (
          <div className="mt-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="font-bold text-emerald-950">Konsultasi Naskah Anda</p>
              <p className="text-xs text-emerald-800 mt-0.5">Diskusikan naskah dan rencana penerbitan bersama tim redaksi kami.</p>
            </div>
            <a
              href={settings.whatsapp_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow hover:bg-emerald-700 transition shrink-0"
            >
              Kirim Naskah via WA ➔
            </a>
          </div>
        )}
      </div>
    ),
  },
  "cara-belanja": {
    title: "Cara Belanja",
    icon: "🛒",
    key: "shopping_guide",
    badge: "Panduan Pemesanan",
    fallback: () => (
      <div className="space-y-3.5 text-sm text-slate-600">
        <div className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blue-700 text-xs font-black text-white">1</span>
          <div>
            <strong className="block text-slate-900">Pilih Buku Impian Anda</strong>
            <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">Jelajahi koleksi melalui beranda, kategori, atau fitur pencarian untuk menemukan buku yang ingin Anda baca.</p>
          </div>
        </div>
        <div className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blue-700 text-xs font-black text-white">2</span>
          <div>
            <strong className="block text-slate-900">Masukkan ke Keranjang</strong>
            <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">Klik tombol &ldquo;Masukkan Keranjang&rdquo; atau pilih &ldquo;Beli Sekarang&rdquo; untuk langsung lanjut ke proses pembelian.</p>
          </div>
        </div>
        <div className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blue-700 text-xs font-black text-white">3</span>
          <div>
            <strong className="block text-slate-900">Lengkapi Alamat Pengiriman</strong>
            <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">Isi nama penerima, nomor WhatsApp, serta alamat tujuan secara lengkap untuk kalkulasi ongkir kurir otomatis.</p>
          </div>
        </div>
        <div className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blue-700 text-xs font-black text-white">4</span>
          <div>
            <strong className="block text-slate-900">Pembayaran Aman & Cepat</strong>
            <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">Pilih metode pembayaran (Transfer Bank / Virtual Account / QRIS / E-Wallet) dan selesaikan transaksi Anda.</p>
          </div>
        </div>
        <div className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-600 text-xs font-black text-white">5</span>
          <div>
            <strong className="block text-slate-900">Pesanan Diproses & Dikirim</strong>
            <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">Buku akan dikemas dengan bubble wrap aman dan resi pelacakan pengiriman akan langsung diinfokan ke akun Anda.</p>
          </div>
        </div>
      </div>
    ),
  },
  pengiriman: {
    title: "Informasi Pengiriman",
    icon: "🚚",
    key: "shipping_info",
    badge: "Ekspedisi & Estimasi",
    fallback: () => (
      <div className="space-y-4 text-sm leading-relaxed text-slate-600">
        <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-4">
          <p className="font-bold text-slate-900">📦 Jangkauan Pengiriman</p>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">Kami melayani pengiriman ke seluruh kota, kabupaten, dan pelosok wilayah Indonesia.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="font-bold text-slate-900">⏱ Estimasi Waktu</p>
            <ul className="mt-2 space-y-1 text-xs text-slate-600">
              <li>• <strong>Pulau Jawa:</strong> 1 – 3 hari kerja</li>
              <li>• <strong>Luar Pulau Jawa:</strong> 3 – 7 hari kerja</li>
              <li>• <em>(Tergantung kurir yang dipilih saat checkout)</em></li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="font-bold text-slate-900">🛡 Standar Pengemasan</p>
            <p className="mt-2 text-xs text-slate-600">Setiap pesanan buku dilapisi <strong>bubble wrap tebal</strong> dan pelindung sudut untuk mencegah buku terbentur atau terlipat di perjalanan.</p>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-3.5 text-xs text-slate-500">
          💡 Biaya pengiriman dan pilihan kurir (JNE, SiCepat, J&amp;T, dll.) akan dihitung secara otomatis dan transparan di halaman checkout sesuai berat buku dan kota tujuan.
        </div>
      </div>
    ),
  },
  kontak: {
    title: "Hubungi Kami",
    icon: "💬",
    key: "contact_us",
    badge: "Customer Care",
    fallback: (appName, address, settings) => (
      <div className="space-y-4 text-sm text-slate-600">
        <p>
          Ada pertanyaan seputar ketersediaan buku, status pesanan, atau kerja sama penerbitan naskah? Kami siap melayani Anda setiap hari kerja.
        </p>

        {settings.whatsapp_url && (
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="font-bold text-emerald-950 flex items-center gap-1.5">
                <span>WhatsApp Customer Care</span>
              </p>
              <p className="text-xs text-emerald-800 mt-0.5">Respon cepat setiap Senin – Sabtu (09.00 – 17.00 WIB)</p>
            </div>
            <a
              href={settings.whatsapp_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow hover:bg-emerald-700 transition"
            >
              Chat WhatsApp ➔
            </a>
          </div>
        )}

        {address && (
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="font-bold text-slate-900 text-xs uppercase tracking-wider">Kantor &amp; Gudang</p>
            <p className="mt-1 text-xs sm:text-sm text-slate-700 whitespace-pre-line">{address}</p>
          </div>
        )}

        {(settings.shopee_url || settings.tokopedia_url) && (
          <div className="pt-2">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tersedia Juga di Marketplace:</p>
            <div className="flex flex-wrap gap-2">
              {settings.shopee_url && (
                <a
                  href={settings.shopee_url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-bold text-[#EE4D2D] hover:bg-orange-100 transition"
                >
                  Shopee Mall ➔
                </a>
              )}
              {settings.tokopedia_url && (
                <a
                  href={settings.tokopedia_url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-[#03AC0E] hover:bg-emerald-100 transition"
                >
                  Tokopedia Official ➔
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    ),
  },
};

export default function InfoModal({ open, tab = "tentang", onClose, onTabChange, settings = {} }) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const currentTab = tabMeta[tab] ? tab : "tentang";
  const meta = tabMeta[currentTab];
  const appName = settings.app_name || "";
  const address = settings.store_address || "";
  const customContent = settings[meta.key]?.trim?.() ? settings[meta.key] : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-modal-title"
      className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/60 p-4 backdrop-blur-sm transition-all"
    >
      <button
        type="button"
        aria-label="Tutup modal informasi"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />

      <section className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white shadow-2xl transition-all max-h-[90vh] flex flex-col">
        {/* Header Modal */}
        <div className="relative border-b border-stone-100 bg-[#fffdf8] px-6 py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-orange-100 text-xl shadow-sm">
                {meta.icon}
              </span>
              <div>
                <h2 id="info-modal-title" className="text-xl font-black text-stone-950">
                  {meta.title}
                </h2>
                <p className="text-xs font-semibold text-orange-800">{meta.badge}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup"
              className="grid h-9 w-9 place-items-center rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-900 transition font-bold text-lg"
            >
              ✕
            </button>
          </div>

          {/* Tab Selector Navigasi Cepat */}
          <div className="mt-4 flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {Object.entries(tabMeta).map(([tabKey, item]) => {
              const active = tabKey === currentTab;
              return (
                <button
                  key={tabKey}
                  type="button"
                  onClick={() => onTabChange?.(tabKey)}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                    active
                      ? "bg-stone-950 text-white shadow-sm"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Isi Konten Modal */}
        <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-thin">
          {customContent ? (
            <div className="space-y-4">
              <div className="whitespace-pre-line text-sm sm:text-base leading-relaxed text-slate-700">
                {customContent}
              </div>
              {(currentTab === "kontak" || currentTab === "penerbitan") && settings.whatsapp_url && (
                <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <p className="font-bold text-emerald-950 flex items-center gap-1.5">
                      <span>{currentTab === "penerbitan" ? "Konsultasi Penerbitan" : "WhatsApp Customer Care"}</span>
                    </p>
                    <p className="text-xs text-emerald-800 mt-0.5">{currentTab === "penerbitan" ? "Diskusikan naskah dan rencana penerbitan bersama tim redaksi" : "Respon cepat setiap Senin – Sabtu (09.00 – 17.00 WIB)"}</p>
                  </div>
                  <a
                    href={settings.whatsapp_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow hover:bg-emerald-700 transition"
                  >
                    {currentTab === "penerbitan" ? "Kirim Naskah via WA ➔" : "Chat WhatsApp ➔"}
                  </a>
                </div>
              )}
              {currentTab === "tentang" && address && (
                <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-900">Alamat Toko</p>
                  <p className="mt-1 text-xs sm:text-sm text-slate-700 whitespace-pre-line">{address}</p>
                </div>
              )}
            </div>
          ) : (
            meta.fallback(appName, address, settings)
          )}
        </div>

        {/* Footer Modal */}
        <div className="border-t border-stone-100 bg-[#fffdf8] px-6 py-3.5 flex items-center justify-between">
          <span className="text-[11px] text-stone-500">© 2026</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-stone-950 px-5 py-2 text-xs font-bold text-white hover:bg-stone-800 transition shadow"
          >
            Tutup
          </button>
        </div>
      </section>
    </div>
  );
}
