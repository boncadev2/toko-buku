const fs = require('fs');
let content = fs.readFileSync('src/app/page.jsx', 'utf8');

content = content.replace(
  'const [menuOpen, setMenuOpen] = useState(false);',
  'const [menuOpen, setMenuOpen] = useState(false);\n  const [promoBooks, setPromoBooks] = useState(null);'
);

content = content.replace(
  /fetch\(`\$\{process\.env\.NEXT_PUBLIC_API_URL \?\? "http:\/\/localhost:8080\/api"\}\/settings`, \{ headers: \{ Accept: "application\/json" \} \}\)\.then[^\n]+;/,
  '$&\n    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/books?sort=promo&per_page=4`).then((r) => r.ok ? r.json() : null).then((payload) => payload?.data && setPromoBooks(payload.data)).catch(() => null);'
);

// Replace the #promo section to use promoBooks if available, otherwise discounts.
content = content.replace(
  /<section id="promo".*?{discounts\.map\(\(book\) => <BookCard book=\{book\} key=\{book\[0\]\} \/>\)}<\/div><\/div><\/section>/,
  '<section id="promo" className="scroll-mt-24 bg-stone-950 py-12 text-white sm:py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-orange-300">Harga terbaik</p><h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Diskon pilihan</h2><p className="mt-2 text-sm text-stone-300">Buku bagus, alasan lebih banyak untuk membaca.</p></div><span className="rounded-full border border-orange-400/50 px-4 py-2 text-sm font-bold text-orange-200">Promo terbatas</span></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">{promoBooks ? promoBooks.map((book) => <DynamicBookCard book={book} key={book.id} />) : discounts.map((book) => <BookCard book={book} key={book[0]} />)}</div></div></section>'
);

fs.writeFileSync('src/app/page.jsx', content);
