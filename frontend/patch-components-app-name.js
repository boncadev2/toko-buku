const fs = require('fs');

// --- 1. Patch StoreFooter.jsx ---
let storeFooter = fs.readFileSync('src/components/StoreFooter.jsx', 'utf8');
storeFooter = storeFooter.replace(
  'const logout = () => { localStorage.removeItem("token"); window.location.href = "/"; };',
  'const logout = () => { localStorage.removeItem("token"); window.location.href = "/"; };\n  const appName = settings.app_name || "BukuPagi";\n  const appLogo = settings.app_logo;'
);
storeFooter = storeFooter.replace(
  '<span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-700 text-sm text-white">B</span> bukupagi</div>',
  '{appLogo ? <img src={appLogo} alt={appName} className="h-8 w-8 rounded-lg object-contain" /> : <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-700 text-sm text-white">{appName[0].toUpperCase()}</span>} {appName}</div>'
);
storeFooter = storeFooter.replace(
  '© 2026 bukupagi.',
  '© 2026 {appName}.'
);
fs.writeFileSync('src/components/StoreFooter.jsx', storeFooter);

// --- 2. Patch CustomerHeader.jsx ---
let customerHeader = fs.readFileSync('src/components/CustomerHeader.jsx', 'utf8');
if (!customerHeader.includes('const [settings, setSettings] = useState({});')) {
  customerHeader = customerHeader.replace(
    'const [menuOpen, setMenuOpen] = useState(false);',
    'const [menuOpen, setMenuOpen] = useState(false);\n  const [settings, setSettings] = useState({});'
  );
  customerHeader = customerHeader.replace(
    'fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/cart`, { headers }).then((response) => response.ok ? response.json() : null).then((payload) => setCartCount((payload?.data?.items || []).reduce((sum, item) => sum + Number(item.quantity || 0), 0)));',
    'fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/cart`, { headers }).then((response) => response.ok ? response.json() : null).then((payload) => setCartCount((payload?.data?.items || []).reduce((sum, item) => sum + Number(item.quantity || 0), 0)));\n    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/settings`, { headers: { Accept: "application/json" } }).then((response) => response.ok ? response.json() : null).then((payload) => setSettings((old) => ({ ...old, ...(payload?.data || {}) }))).catch(() => null);'
  );
  customerHeader = customerHeader.replace(
    'return <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-[#fffdf8]/95 backdrop-blur">',
    'const appName = settings.app_name || "BukuPagi";\n  const appLogo = settings.app_logo;\n  return <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-[#fffdf8]/95 backdrop-blur">'
  );
  customerHeader = customerHeader.replace(
    '<span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-700 text-lg text-white">📚</span><span><b className="block text-lg leading-none text-blue-950">BukuPagi</b>',
    '{appLogo ? <img src={appLogo} alt={appName} className="h-10 w-10 rounded-xl object-contain" /> : <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-700 text-lg text-white">{appName[0].toUpperCase()}</span>}<span><b className="block text-lg leading-none text-blue-950">{appName}</b>'
  );
  fs.writeFileSync('src/components/CustomerHeader.jsx', customerHeader);
}

// --- 3. Patch AdminShell.jsx ---
let adminShell = fs.readFileSync('src/components/AdminShell.jsx', 'utf8');
adminShell = adminShell.replace(/BukuPagi Admin/g, '{site.app_name || "BukuPagi"} Admin');
adminShell = adminShell.replace(/© 2026 BukuPagi\./g, '© 2026 {site.app_name || "BukuPagi"}.');
fs.writeFileSync('src/components/AdminShell.jsx', adminShell);

// --- 4. Patch BookCover.jsx ---
let bookCover = fs.readFileSync('src/components/store/BookCover.jsx', 'utf8');
bookCover = bookCover.replace(
  '<p className="text-[9px] uppercase tracking-[.18em] text-white/70">Bukupagi</p>',
  ''
);
fs.writeFileSync('src/components/store/BookCover.jsx', bookCover);

