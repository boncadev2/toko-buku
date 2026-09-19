const fs = require('fs');

function fixFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Change fallback from "BukuPagi" to ""
  if (content.includes('|| "BukuPagi"')) {
    content = content.replace(/\|\| "BukuPagi"/g, '|| ""');
    changed = true;
  }

  // Fix any appName[0] to (appName || " ")[0] to prevent crashes
  if (content.includes('appName[0]')) {
    content = content.replace(/appName\[0\]/g, '(appName || " ")[0]');
    changed = true;
  }
  
  if (content.includes('site.app_name[0]')) {
    content = content.replace(/site\.app_name\[0\]/g, '(site.app_name || " ")[0]');
    changed = true;
  }
  
  if (content.includes('(form.app_name || "B")[0]')) {
    content = content.replace(/\(form\.app_name \|\| "B"\)\[0\]/g, '(form.app_name || " ")[0]');
    changed = true;
  }
  
  // Specifically for info page
  if (content.includes('(settings.app_name || "")[0]')) {
    content = content.replace(/\(settings\.app_name \|\| ""\)\[0\]/g, '(settings.app_name || " ")[0]');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log('Fixed', filePath);
  }
}

const files = [
  'src/app/page.jsx',
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
  'src/app/info/[slug]/client.jsx',
  'src/app/admin/pengaturan/page.jsx'
];

files.forEach(fixFile);
