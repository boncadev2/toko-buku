const fs = require('fs');

function replace(file, searchValue, replaceValue) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.split(searchValue).join(replaceValue);
    fs.writeFileSync(file, content);
  }
}

replace('src/app/page.jsx', 'appName = "BukuPagi"', 'appName = ""');
replace('src/components/AdminShell.jsx', 'app_name: "BukuPagi"', 'app_name: ""');
replace('src/app/admin/pengaturan/page.jsx', 'app_name: "BukuPagi"', 'app_name: ""');

// Admin descriptions
replace('src/app/admin/page.jsx', 'pelanggan BukuPagi.', 'pelanggan toko.');
replace('src/app/admin/pelanggan/page.jsx', 'di BukuPagi.', 'di toko ini.');

// Info descriptions
replace('src/app/info/[slug]/client.jsx', 'Informasi BukuPagi', 'Informasi Toko');

