const fs = require('fs');

const file = 'src/app/buku/[slug]/client.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  '"Buku pilihan yang dikurasi {settings?.app_name || ""} untuk menemani rasa ingin tahu dan waktu membaca Anda."',
  '\`Buku pilihan yang dikurasi \${settings?.app_name || ""} untuk menemani rasa ingin tahu dan waktu membaca Anda.\`'
);

fs.writeFileSync(file, content);
