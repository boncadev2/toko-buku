const fs = require('fs');

let content = fs.readFileSync('src/app/keranjang/page.jsx', 'utf8');
if (!content.includes('settings.app_name')) {
  // Add state
  content = content.replace(
    'const [message, setMessage] = useState("");',
    'const [message, setMessage] = useState("");\n  const [settings, setSettings] = useState({});'
  );
  
  // Fetch settings
  content = content.replace(
    'fetch(`${base}/cart`, { headers }).then(r => r.ok ? r.json() : null)',
    'fetch(`${base}/settings`).then(r => r.ok ? r.json() : null).then(p => setSettings(p?.data || {}));\n    fetch(`${base}/cart`, { headers }).then(r => r.ok ? r.json() : null)'
  );
  
  // Create logo
  content = content.replace(
    'const checkout = () => {',
    'const appName = settings.app_name || "bukupagi";\n  const appLogo = settings.app_logo;\n  const checkout = () => {'
  );
  
  // Replace header text
  content = content.replace(
    '<span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-700 text-white">B</span><span className="text-xl">bukupagi</span>',
    '{appLogo ? <img src={appLogo} alt={appName} className="h-9 w-9 rounded-xl object-contain" /> : <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-700 text-white">{appName[0].toUpperCase()}</span>}<span className="text-xl">{appName}</span>'
  );
  
  fs.writeFileSync('src/app/keranjang/page.jsx', content);
}
