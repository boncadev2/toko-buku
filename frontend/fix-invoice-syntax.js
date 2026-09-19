const fs = require('fs');
let content = fs.readFileSync('src/app/akun/pesanan/page.jsx', 'utf8');

const badLine = '              ${data.items.map(i => \\`<tr><td>${i.title}</td><td>${money(i.unit_price)}</td><td>${i.quantity}</td><td>${money(i.subtotal)}</td></tr>\\`).join(\'\')}';
const goodLine = '              ${data.items.map(i => "<tr><td>" + i.title + "</td><td>" + money(i.unit_price) + "</td><td>" + i.quantity + "</td><td>" + money(i.subtotal) + "</td></tr>").join(\'\')}';

content = content.replace(badLine, goodLine);
fs.writeFileSync('src/app/akun/pesanan/page.jsx', content);
