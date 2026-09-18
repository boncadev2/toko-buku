const fs = require('fs');
let content = fs.readFileSync('src/app/buku/[slug]/page.jsx', 'utf8');

const componentToAdd = `
function DynamicBookCard({ book, label, coverClass }) {
  const title = book.title;
  const author = book.author || "Tanpa Penulis";
  
  const formatter = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });
  const price = formatter.format(book.price);
  const originalPrice = book.original_price ? formatter.format(book.original_price) : null;
  
  const slug = book.slug;
  const coverUrl = book.cover_image_url;
  
  if (!label && book.discount_type === 'percentage') {
    label = "-" + parseInt(book.discount_value) + "%";
  } else if (!label && book.discount_type === 'fixed') {
    label = "Promo";
  }

  return <article className="group min-w-0 rounded-2xl border border-stone-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
    <div className={\`relative flex aspect-[3/4] items-end overflow-hidden rounded-xl \${!coverUrl ? 'bg-gradient-to-br ' + (coverClass || 'from-rose-500 to-orange-300') : 'bg-slate-100'} p-0 text-white shadow-inner\`}>
      {coverUrl ? <img src={coverUrl} alt={title} className="w-full h-full object-cover" /> : <div className="p-4 w-full h-full flex flex-col justify-end"><div className="w-full border-l border-white/50 pl-3"><p className="text-[10px] font-medium uppercase tracking-[.18em] text-white/70">Koleksi bukupagi</p><h3 className="mt-2 text-lg font-black leading-tight">{title}</h3></div></div>}
      {label && <span className="absolute right-2 top-2 rounded-full bg-white/95 px-2 py-1 text-[10px] font-bold text-stone-900 shadow-sm">{label}</span>}
    </div>
    <div className="px-1 pb-1 pt-4"><h3 className="truncate font-bold" title={title}>{title}</h3><p className="mt-1 truncate text-sm text-stone-500">{author}</p><div className="mt-3 flex flex-wrap items-baseline gap-x-2"><span className="font-bold text-orange-700">{price}</span>{originalPrice && <span className="text-xs text-stone-400 line-through">{originalPrice}</span>}</div><a href={\`/buku/\${slug}\`} className="mt-3 inline-flex text-xs font-bold text-blue-700 hover:text-blue-900">Lihat detail →</a></div>
  </article>;
}
`;

content = content.replace('export default function BookDetailPage({ params }) {', componentToAdd + '\nexport default function BookDetailPage({ params }) {');

// Add relatedBooks state
content = content.replace(
  'const [notice, setNotice] = useState("");',
  'const [notice, setNotice] = useState("");\n  const [relatedBooks, setRelatedBooks] = useState([]);'
);

// Fetch related books
content = content.replace(
  '.then(payload => { setBook(payload?.data || null); setLoading(false); })',
  '.then(payload => { \n        const b = payload?.data || null;\n        setBook(b); setLoading(false);\n        if (b && b.category?.slug) {\n          fetch(`${base}/books?category=${b.category.slug}&per_page=5`)\n            .then(r => r.ok ? r.json() : null)\n            .then(res => {\n              if (res && res.data) {\n                setRelatedBooks(res.data.filter(x => x.id !== b.id).slice(0, 4));\n              }\n            }).catch(() => null);\n        }\n      })'
);

// Add Related Books section right after </section> that closes the grid
content = content.replace(
  '</aside></section></div></main>;',
  `</aside></section>
    
    {relatedBooks.length > 0 && <section className="mt-16 border-t border-stone-200 pt-10 pb-16">
      <div className="mb-7 flex items-end justify-between"><h2 className="text-xl font-black">Buku Terkait</h2><a href={\`/cari?kategori=\${book.category?.slug}\`} className="text-sm font-bold text-blue-700">Lihat selengkapnya →</a></div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">{relatedBooks.map(b => <DynamicBookCard book={b} key={b.id} coverClass="from-slate-800 to-stone-500" />)}</div>
    </section>}
  
  </div></main>;`
);

fs.writeFileSync('src/app/buku/[slug]/page.jsx', content);
