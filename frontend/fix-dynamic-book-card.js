const fs = require('fs');

let content = fs.readFileSync('src/app/buku/[slug]/client.jsx', 'utf8');

const startIdx = content.indexOf('function DynamicBookCard');
const endIdx = content.indexOf('export default function BookDetailPage');

if (startIdx !== -1 && endIdx !== -1) {
  let subContent = content.substring(startIdx, endIdx);
  subContent = subContent.replace('Koleksi {settings?.app_name || ""}', 'Koleksi {appName || ""}');
  content = content.substring(0, startIdx) + subContent + content.substring(endIdx);
  fs.writeFileSync('src/app/buku/[slug]/client.jsx', content);
}
