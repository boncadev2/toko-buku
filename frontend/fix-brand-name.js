const fs = require('fs');
let content = fs.readFileSync('src/app/akun/pesanan/page.jsx', 'utf8');

const badBrandLine = "${settings.app_logo ? '<img src=\"' + settings.app_logo + '\" alt=\"Logo\" style=\"max-height: 50px; margin-bottom: 10px;\">' : '<h1>' + (settings.app_name || 'TOKO BUKU') + '</h1>'}";

const goodBrandLine = "${settings.app_logo ? '<img src=\"' + settings.app_logo + '\" alt=\"Logo\" style=\"max-height: 50px; margin-bottom: 5px; display: block;\">' : ''}\n        <h1 style=\"margin: 0 0 5px 0;\">${settings.app_name || 'TOKO BUKU'}</h1>";

content = content.replace(badBrandLine, goodBrandLine);
fs.writeFileSync('src/app/akun/pesanan/page.jsx', content);
