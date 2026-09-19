const fs = require('fs');

// --- 1. Patch src/app/page.jsx ---
let pageContent = fs.readFileSync('src/app/page.jsx', 'utf8');

// Add appName and appLogo constants inside Home()
pageContent = pageContent.replace(
  'return <main className="min-h-screen bg-[#fffdf8] text-stone-900">',
  `const appName = marketplace.app_name || "bukupagi";
  const appLogo = marketplace.app_logo;
  const logoEl = appLogo ? <img src={appLogo} alt={appName} className="h-9 w-9 rounded-xl object-contain" /> : <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-700 text-lg text-white">{appName[0].toUpperCase()}</span>;
  
  return <main className="min-h-screen bg-[#fffdf8] text-stone-900">`
);

// Replace header logo
pageContent = pageContent.replace(
  '<span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-700 text-lg text-white">B</span><span className="text-xl">bukupagi</span>',
  '{logoEl}<span className="text-xl">{appName}</span>'
);

// Replace footer logo
pageContent = pageContent.replace(
  '<span className="grid h-8 w-8 place-items-center rounded-lg bg-orange-700 text-sm text-white">B</span> bukupagi</div>',
  '{appLogo ? <img src={appLogo} alt={appName} className="h-8 w-8 rounded-lg object-contain" /> : <span className="grid h-8 w-8 place-items-center rounded-lg bg-orange-700 text-sm text-white">{appName[0].toUpperCase()}</span>} {appName}</div>'
);

// Replace footer copyright
pageContent = pageContent.replace(
  '© 2026 bukupagi.',
  '© 2026 {appName}.'
);

// Fix BookCard and DynamicBookCard fallback text
pageContent = pageContent.replace(/Koleksi bukupagi/g, 'Koleksi {appName}');

fs.writeFileSync('src/app/page.jsx', pageContent);

// --- 2. Patch src/app/cari/page.jsx ---
let cariContent = fs.readFileSync('src/app/cari/page.jsx', 'utf8');

if (!cariContent.includes('const [settings, setSettings] = useState({});')) {
  cariContent = cariContent.replace(
    'const [cartCount, setCartCount] = useState(0);',
    'const [cartCount, setCartCount] = useState(0);\n  const [settings, setSettings] = useState({});'
  );
  
  cariContent = cariContent.replace(
    'fetch(`${apiUrl}/categories`).then(r => r.ok ? r.json() : null).then(p => {',
    'fetch(`${apiUrl}/settings`).then(r => r.ok ? r.json() : null).then(p => setSettings(p?.data || {}));\n    fetch(`${apiUrl}/categories`).then(r => r.ok ? r.json() : null).then(p => {'
  );
  
  cariContent = cariContent.replace(
    'const logout = () => { localStorage.removeItem("token"); window.location.href = "/"; };',
    'const logout = () => { localStorage.removeItem("token"); window.location.href = "/"; };\n  const appName = settings.app_name || "bukupagi";\n  const appLogo = settings.app_logo;'
  );
  
  cariContent = cariContent.replace(
    '<a href="/" className="font-black text-xl">📚 bukupagi</a>',
    '<a href="/" className="flex items-center gap-2 font-black text-xl">{appLogo ? <img src={appLogo} alt={appName} className="h-8 w-8 rounded-lg object-contain" /> : <span>📚</span>} {appName}</a>'
  );

  fs.writeFileSync('src/app/cari/page.jsx', cariContent);
}

// --- 3. Patch src/app/buku/[slug]/client.jsx ---
let detailContent = fs.readFileSync('src/app/buku/[slug]/client.jsx', 'utf8');
if (!detailContent.includes('settings.app_name')) {
  detailContent = detailContent.replace(
    'function Header({ user, cartCount, logout }) { const [open, setOpen] = useState(false); return',
    'function Header({ user, cartCount, logout, settings }) { const [open, setOpen] = useState(false); const appName = settings?.app_name || "bukupagi"; const appLogo = settings?.app_logo; return'
  );
  
  detailContent = detailContent.replace(
    '<span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-700 text-lg text-white">B</span><span className="text-xl">bukupagi</span>',
    '{appLogo ? <img src={appLogo} alt={appName} className="h-9 w-9 rounded-xl object-contain" /> : <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-700 text-lg text-white">{appName[0].toUpperCase()}</span>}<span className="text-xl">{appName}</span>'
  );
  
  // Footer inside detail page
  detailContent = detailContent.replace(
    '<span className="grid h-8 w-8 place-items-center rounded-lg bg-orange-700 text-sm text-white">B</span> bukupagi</div>',
    '{settings?.app_logo ? <img src={settings.app_logo} alt={settings.app_name || "bukupagi"} className="h-8 w-8 rounded-lg object-contain" /> : <span className="grid h-8 w-8 place-items-center rounded-lg bg-orange-700 text-sm text-white">{(settings?.app_name || "bukupagi")[0].toUpperCase()}</span>} {settings?.app_name || "bukupagi"}</div>'
  );
  
  detailContent = detailContent.replace(
    '© 2026 bukupagi.',
    '© 2026 {settings?.app_name || "bukupagi"}.'
  );
  
  // Fetch settings in detail page
  detailContent = detailContent.replace(
    'const [relatedBooks, setRelatedBooks] = useState([]);',
    'const [relatedBooks, setRelatedBooks] = useState([]);\n  const [settings, setSettings] = useState({});'
  );
  
  detailContent = detailContent.replace(
    'refreshCart().catch(() => null);',
    'refreshCart().catch(() => null);\n    fetch(`${base}/settings`).then(r => r.ok ? r.json() : null).then(p => setSettings(p?.data || {}));'
  );
  
  // Pass settings to Header
  detailContent = detailContent.replace(
    '<Header user={user} cartCount={cartCount} logout={logout}/>',
    '<Header user={user} cartCount={cartCount} logout={logout} settings={settings}/>'
  );
  
  // Replace "Koleksi bukupagi" in placeholders
  detailContent = detailContent.replace(/Koleksi bukupagi/g, 'Koleksi {settings?.app_name || "bukupagi"}');
  
  fs.writeFileSync('src/app/buku/[slug]/client.jsx', detailContent);
}

