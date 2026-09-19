const fs = require('fs');

function replaceInFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Inject settings state and fetch if not present
  if (!content.includes('settings.app_name') && content.includes('useEffect(()')) {
    if (!content.includes('const [settings, setSettings]')) {
      content = content.replace(
        'useEffect(()',
        'const [settings, setSettings] = useState({});\n  const appName = settings.app_name || "BukuPagi";\n  const appLogo = settings.app_logo;\n  useEffect(()'
      );
      content = content.replace(
        'api("/auth/me"',
        'api("/settings").then(r => setSettings(r.data||{})).catch(()=>null);\n    api("/auth/me"'
      );
      content = content.replace(
        'api("/account"',
        'api("/settings").then(r => setSettings(r.data||{})).catch(()=>null);\n    api("/account"'
      );
    }
  }

  // Common replacements
  content = content.replace(/BukuPagi/g, '{appName}');
  content = content.replace(/{appName} Admin/g, '{appName} Admin');
  
  // Specific headers
  content = content.replace(
    '<span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-700 text-lg text-white">📚</span><span><b className="block text-lg leading-none text-blue-950">{appName}</b>',
    '{appLogo ? <img src={appLogo} alt={appName} className="h-10 w-10 rounded-xl object-contain" /> : <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-700 text-lg text-white">{appName[0].toUpperCase()}</span>}<span><b className="block text-lg leading-none text-blue-950">{appName}</b>'
  );
  
  content = content.replace(
    '<Link href="/" className="font-black text-blue-950">📚 {appName}</Link>',
    '<Link href="/" className="flex items-center gap-2 font-black text-blue-950">{appLogo ? <img src={appLogo} alt={appName} className="h-8 w-8 rounded-lg object-contain" /> : <span>📚</span>} {appName}</Link>'
  );

  fs.writeFileSync(filePath, content);
}

replaceInFile('src/app/akun/page.jsx');
replaceInFile('src/app/akun/alamat/page.jsx');
replaceInFile('src/app/akun/pesanan/page.jsx');
replaceInFile('src/app/akun/profil/page.jsx');

