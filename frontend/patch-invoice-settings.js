const fs = require('fs');
let content = fs.readFileSync('src/app/akun/pesanan/page.jsx', 'utf8');

const oldHeaderBlock = `      <div class="brand">
        <h1>TOKO BUKU</h1>
        <p>Jl. Literasi No. 123, Jakarta Raya<br>hello@tokobuku.com • 0812-3456-7890</p>
      </div>`;

const newHeaderBlock = `      <div class="brand">
        \${settings.app_logo ? \\\`<img src="\${settings.app_logo}" alt="Logo" style="max-height: 50px; margin-bottom: 10px;">\\\` : \\\`<h1>\${settings.app_name || 'TOKO BUKU'}</h1>\\\`}
        <p style="white-space: pre-line">\${settings.store_address || 'Alamat belum diatur'}\\n\${settings.contact_us || ''}</p>
      </div>`;

content = content.replace(oldHeaderBlock, newHeaderBlock);
fs.writeFileSync('src/app/akun/pesanan/page.jsx', content);
