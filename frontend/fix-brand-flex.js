const fs = require('fs');
let content = fs.readFileSync('src/app/akun/pesanan/page.jsx', 'utf8');

const badBrandLine = "${settings.app_logo ? '<img src=\"' + settings.app_logo + '\" alt=\"Logo\" style=\"max-height: 50px; margin-bottom: 5px; display: block;\">' : ''}\n        <h1 style=\"margin: 0 0 5px 0;\">${settings.app_name || 'TOKO BUKU'}</h1>";

const goodBrandLine = "<div style=\"display: flex; align-items: center; gap: 12px; margin-bottom: 10px;\">\n          ${settings.app_logo ? '<img src=\"' + settings.app_logo + '\" alt=\"Logo\" style=\"max-height: 45px; display: block;\">' : ''}\n          <h1 style=\"margin: 0; font-size: 26px;\">${settings.app_name || 'TOKO BUKU'}</h1>\n        </div>";

content = content.replace(badBrandLine, goodBrandLine);
fs.writeFileSync('src/app/akun/pesanan/page.jsx', content);
