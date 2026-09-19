const fs = require('fs');
let content = fs.readFileSync('src/app/checkout/page.jsx', 'utf8');

const originalButtons = \`  <button name="method" value="wa" className="mt-4 w-full rounded-xl bg-green-600 py-3 font-bold text-white shadow-sm hover:bg-green-700 transition flex items-center justify-center gap-2">💬 Pesan lewat WhatsApp</button>
  <button name="method" value="midtrans" className="mt-2 w-full rounded-xl bg-blue-700 py-3 font-bold text-white shadow-sm hover:bg-blue-800 transition">💳 Buat Pesanan & Bayar Online</button>\`;

const newButtons = \`  <button name="method" value="midtrans" className="mt-4 w-full rounded-xl bg-blue-700 py-3 font-bold text-white shadow-sm hover:bg-blue-800 transition">💳 Buat Pesanan & Bayar Online</button>
  <button name="method" value="wa" className="mt-2 w-full rounded-xl bg-green-600 py-3 font-bold text-white shadow-sm hover:bg-green-700 transition flex items-center justify-center gap-2">💬 Pesan lewat WhatsApp</button>\`;

content = content.replace(originalButtons, newButtons);
fs.writeFileSync('src/app/checkout/page.jsx', content);
