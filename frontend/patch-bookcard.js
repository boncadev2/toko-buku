const fs = require('fs');
let content = fs.readFileSync('src/app/page.jsx', 'utf8');

const dynamicBookCard = `
function DynamicBookCard({ book, label, coverClass }) {
  const title = book.title;
  const author = book.author || "Tanpa Penulis";
  
  const formatter = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });
  const price = formatter.format(book.price);
  const originalPrice = book.original_price ? formatter.format(book.original_price) : null;
  
  const slug = book.slug;
  const coverUrl = book.cover_image_url;
  
  // Calculate discount label if not provided
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
    <div className="px-1 pb-1 pt-4"><h3 className="truncate font-bold" title={title}>{title}</h3><p className="mt-1 truncate text-sm text-stone-500">{author}</p><div className="mt-3 flex flex-wrap items-baseline gap-x-2"><span className="font-bold text-orange-700">{price}</span>{originalPrice && <span className="text-xs text-stone-400 line-through">{originalPrice}</span>}</div><Link href={\`/buku/\${slug}\`} className="mt-3 inline-flex text-xs font-bold text-blue-700 hover:text-blue-900">Lihat detail →</Link></div>
  </article>;
}
`;

content = content.replace('function Shelf({ shelf }) {', dynamicBookCard + '\nfunction Shelf({ shelf }) {');
fs.writeFileSync('src/app/page.jsx', content);
