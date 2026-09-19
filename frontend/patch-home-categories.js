const fs = require('fs');

let content = fs.readFileSync('src/app/page.jsx', 'utf8');

// Replace the static categories array
content = content.replace(
  /const categories = \[\s+\["Fiksi & Sastra", "✦", "bg-rose-100 text-rose-800"\],\s+\["Pengembangan Diri", "☼", "bg-amber-100 text-amber-800"\],\s+\["Bisnis & Finansial", "↗", "bg-emerald-100 text-emerald-800"\],\s+\["Anak & Remaja", "☁", "bg-sky-100 text-sky-800"\],\s+\];/m,
  `const categoryColors = [
  { icon: "✦", color: "bg-rose-100 text-rose-800" },
  { icon: "☼", color: "bg-amber-100 text-amber-800" },
  { icon: "↗", color: "bg-emerald-100 text-emerald-800" },
  { icon: "☁", color: "bg-sky-100 text-sky-800" },
  { icon: "★", color: "bg-purple-100 text-purple-800" },
  { icon: "◈", color: "bg-indigo-100 text-indigo-800" },
  { icon: "◉", color: "bg-teal-100 text-teal-800" },
  { icon: "◫", color: "bg-fuchsia-100 text-fuchsia-800" },
];`
);

// Add state for dbCategories in Home
if (!content.includes('const [dbCategories, setDbCategories] = useState([]);')) {
  content = content.replace(
    'const [marketplace, setMarketplace] = useState(() => {',
    'const [dbCategories, setDbCategories] = useState([]);\n  const [marketplace, setMarketplace] = useState(() => {'
  );
}

// Add fetch for categories in Home's useEffect
content = content.replace(
  'fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/settings`',
  'fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/categories`).then(r => r.ok ? r.json() : null).then(p => { if (p?.data) setDbCategories(p.data.slice(0, 4)); }).catch(() => null);\n    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/settings`'
);

// Update rendering mapping
content = content.replace(
  '{categories.map(([name, icon, color]) => <Link href="/cari" className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md" key={name}><span className={`grid h-11 w-11 place-items-center rounded-xl text-xl ${color}`}>{icon}</span><h3 className="mt-5 font-bold">{name}</h3><p className="mt-1 text-sm text-stone-500">Jelajahi koleksi →</p></Link>)}',
  '{dbCategories.map((cat, i) => { const style = categoryColors[i % categoryColors.length]; return <Link href={`/cari?kategori=${cat.slug}`} className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md" key={cat.id}><span className={`grid h-11 w-11 place-items-center rounded-xl text-xl ${style.color}`}>{style.icon}</span><h3 className="mt-5 font-bold truncate" title={cat.name}>{cat.name}</h3><p className="mt-1 text-sm text-stone-500">Jelajahi koleksi →</p></Link> })}'
);

fs.writeFileSync('src/app/page.jsx', content);
