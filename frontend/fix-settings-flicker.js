const fs = require('fs');

// We will replace `const [settings, setSettings] = useState({});`
// with `const [settings, setSettings] = useState(() => { try { return JSON.parse(localStorage.getItem("app_settings") || "{}"); } catch { return {}; } });`
// And we need to intercept the `fetch` or `api` calls that do `setSettings(payload.data)` to also save to `localStorage`.

const useStateReplace = 'const [settings, setSettings] = useState(() => { try { return typeof window !== "undefined" ? JSON.parse(localStorage.getItem("app_settings") || "{}") : {}; } catch { return {}; } });';

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  if (content.includes('const [settings, setSettings] = useState({});')) {
    content = content.replace('const [settings, setSettings] = useState({});', useStateReplace);
    changed = true;
  }
  
  if (content.includes('const [settings, setSettings] = useState({ store_address: "" });')) {
    content = content.replace(
      'const [settings, setSettings] = useState({ store_address: "" });',
      'const [settings, setSettings] = useState(() => { try { const c = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("app_settings") || "{}") : {}; return { store_address: "", ...c }; } catch { return { store_address: "" }; } });'
    );
    changed = true;
  }
  
  if (content.includes('const [site, setSite] = useState({ app_name: "BukuPagi", app_logo: "" });')) {
    content = content.replace(
      'const [site, setSite] = useState({ app_name: "BukuPagi", app_logo: "" });',
      'const [site, setSite] = useState(() => { try { const c = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("app_settings") || "{}") : {}; return { app_name: "BukuPagi", app_logo: "", ...c }; } catch { return { app_name: "BukuPagi", app_logo: "" }; } });'
    );
    changed = true;
  }

  // Update setSettings(...) calls
  // Common patterns:
  // setSettings(p?.data || {})
  // setSettings(r.data||{})
  // setSettings((old) => ({ ...old, ...(payload?.data || {}) }))
  // setMarketplace(payload.data) (in page.jsx, wait, marketplace is separate!)

  // We can just add a global interceptor or update the code to save to localStorage.
  // Easiest is to replace `setSettings(x)` with `{ const data = x; localStorage.setItem("app_settings", JSON.stringify(data)); setSettings(data); }`
  // But regexing that is tricky. Let's just do a blanket replace for the API callbacks.
  content = content.replace(
    /setSettings\((.+?\bdata\b.*?)\)/g,
    '((d) => { localStorage.setItem("app_settings", JSON.stringify(typeof d === "function" ? d(settings) : d)); setSettings(d); })($1)'
  );
  content = content.replace(
    /setSite\((.+?\bdata\b.*?)\)/g,
    '((d) => { localStorage.setItem("app_settings", JSON.stringify(typeof d === "function" ? d(site) : d)); setSite(d); })($1)'
  );

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`Patched ${filePath}`);
  }
}

// Special case for marketplace in src/app/page.jsx
let pageContent = fs.readFileSync('src/app/page.jsx', 'utf8');
if (pageContent.includes('const [marketplace, setMarketplace] = useState({});')) {
  pageContent = pageContent.replace(
    'const [marketplace, setMarketplace] = useState({});',
    'const [marketplace, setMarketplace] = useState(() => { try { return typeof window !== "undefined" ? JSON.parse(localStorage.getItem("app_settings") || "{}") : {}; } catch { return {}; } });'
  );
  pageContent = pageContent.replace(
    /setMarketplace\(payload\.data\)/g,
    '{ localStorage.setItem("app_settings", JSON.stringify(payload.data)); setMarketplace(payload.data); }'
  );
  fs.writeFileSync('src/app/page.jsx', pageContent);
  console.log('Patched src/app/page.jsx');
}

const files = [
  'src/app/cari/page.jsx',
  'src/app/buku/[slug]/client.jsx',
  'src/app/keranjang/page.jsx',
  'src/app/akun/page.jsx',
  'src/app/akun/alamat/page.jsx',
  'src/app/akun/pesanan/page.jsx',
  'src/app/akun/profil/page.jsx',
  'src/components/CustomerHeader.jsx',
  'src/components/StoreFooter.jsx',
  'src/components/AdminShell.jsx',
  'src/app/info/[slug]/client.jsx'
];

files.forEach(f => {
  if (fs.existsSync(f)) processFile(f);
});

