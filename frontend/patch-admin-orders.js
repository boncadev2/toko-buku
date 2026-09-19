const fs = require('fs');
let content = fs.readFileSync('src/app/admin/pesanan/page.jsx', 'utf8');

content = content.replace(
  'const update=async(id,next)=>{try{await',
  'const update=async(id,next)=>{if(!window.confirm(`Apakah Anda yakin ingin mengubah status menjadi "${next.replaceAll(\'_\', \' \')}"?`)) return; try{await'
);

fs.writeFileSync('src/app/admin/pesanan/page.jsx', content);
