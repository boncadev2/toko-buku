const fs = require('fs');
let content = fs.readFileSync('src/app/buku/[slug]/page.jsx', 'utf8');

const footerHtml = `
    <section className="border-t border-stone-200 bg-orange-100"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-4 py-10 sm:px-6 md:flex-row md:items-center lg:px-8"><div><p className="text-xl font-black text-stone-950">Jangan sampai kehabisan cerita bagus.</p><p className="mt-1 text-sm text-stone-600">Dapatkan kabar koleksi dan promo pilihan setiap minggu.</p></div><form className="flex w-full max-w-md gap-2" onSubmit={(event) => event.preventDefault()}><input className="min-w-0 flex-1 rounded-xl border border-orange-200 bg-white px-4 py-3 text-sm outline-none" type="email" placeholder="Email kamu" aria-label="Email kamu" /><button className="rounded-xl bg-stone-950 px-4 py-3 text-sm font-bold text-white">Berlangganan</button></form></div></section>
    <footer className="bg-[#fffdf8]"><div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8"><div><div className="flex items-center gap-2 font-black text-stone-950"><span className="grid h-8 w-8 place-items-center rounded-lg bg-orange-700 text-sm text-white">B</span> bukupagi</div><p className="mt-4 max-w-sm whitespace-pre-line text-sm leading-6 text-stone-600">Jalan Literasi No. 42, Kota Imaji, Indonesia</p><div className="mt-5 flex gap-4 text-stone-400"><a href="#" className="hover:text-stone-900">Twitter</a><a href="#" className="hover:text-stone-900">Instagram</a><a href="#" className="hover:text-stone-900">Facebook</a></div></div><div><h2 className="font-bold">Jelajahi</h2><div className="mt-4 grid gap-3 text-sm text-stone-600"><a href="/#kategori">Kategori</a><a href="/#terbaru">Buku baru</a><a href="/#terlaris">Terlaris</a><a href="/#promo">Promo</a></div></div><div><h2 className="font-bold">Bantuan</h2><div className="mt-4 grid gap-3 text-sm text-stone-600"><a href="#">Tentang kami</a><a href="#">Cara belanja</a><a href="#">Pengiriman</a><a href="#">Hubungi kami</a></div></div></div><div className="border-t border-stone-200"><p className="mx-auto max-w-7xl px-4 py-5 text-xs text-stone-500 sm:px-6 lg:px-8">© 2026 bukupagi. Dibuat untuk pembaca yang selalu ingin tahu.</p></div></footer>
`;

content = content.replace(
  '  </div></main>;',
  '  </div>\n' + footerHtml + '\n  </main>;'
);

fs.writeFileSync('src/app/buku/[slug]/page.jsx', content);
