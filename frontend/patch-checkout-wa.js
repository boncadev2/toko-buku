const fs = require('fs');
let content = fs.readFileSync('src/app/checkout/page.jsx', 'utf8');

// 1. Add const method to submit function
content = content.replace(
  'const submit = async (e) => {',
  'const submit = async (e) => {\n    const method = e.nativeEvent.submitter?.value || "midtrans";'
);

// 2. Replace the Midtrans block with a conditional block
const midtransBlock = `      try {
        const payRes = await fetch(\`\${apiUrl}/orders/\${payload.data.id}/payment/midtrans\`, { method: "POST", headers: authHeaders() });
        const payPayload = await payRes.json();
        if (payRes.ok && payPayload.data?.redirect_url) {
          window.location.href = payPayload.data.redirect_url;
        } else {
          setMessage(\`Pesanan berhasil dibuat, namun gagal memuat pembayaran. Silakan periksa halaman Pesanan Anda.\`);
          setTimeout(() => { window.location.href = user ? "/akun/pesanan" : "/"; }, 3000);
        }
      } catch (err) {
        setMessage(\`Gagal menghubungi sistem pembayaran.\`);
        setTimeout(() => { window.location.href = user ? "/akun/pesanan" : "/"; }, 3000);
      }`;

const newBlock = `      if (method === "wa") {
        setMessage(\`Mengarahkan ke WhatsApp...\`);
        try {
          const waRes = await fetch(\`\${apiUrl}/orders/\${payload.data.id}/whatsapp\`, { method: "POST", headers: authHeaders() });
          const waPayload = await waRes.json();
          if (waRes.ok && waPayload.data?.url) {
            window.location.href = waPayload.data.url;
          } else {
            setMessage("Gagal memuat link WhatsApp.");
            setTimeout(() => { window.location.href = user ? "/akun/pesanan" : "/"; }, 3000);
          }
        } catch(e) {
          setMessage("Gagal menghubungi server.");
        }
      } else {
${midtransBlock}
      }`;

// We also need to replace the setMessage line right before the block
content = content.replace(
  'setMessage(`Mengarahkan ke pembayaran untuk pesanan ${payload.data.number}...`);\n      \n      try {',
  '// no-op \n      try {' // actually just replace the try block directly, but keep the setMessage
);

// Let's do a robust replace
content = content.replace(
  'setMessage(`Mengarahkan ke pembayaran untuk pesanan ${payload.data.number}...`);',
  'if (method !== "wa") setMessage(`Mengarahkan ke pembayaran untuk pesanan ${payload.data.number}...`);'
);

content = content.replace(midtransBlock, newBlock);

// 3. Replace the single button with two buttons
const originalButton = '<button className="mt-4 w-full rounded-xl bg-blue-700 py-3 font-bold text-white">Buat Pesanan</button>';
const newButtons = `
  <button name="method" value="wa" className="mt-4 w-full rounded-xl bg-green-600 py-3 font-bold text-white shadow-sm hover:bg-green-700 transition flex items-center justify-center gap-2">💬 Pesan lewat WhatsApp</button>
  <button name="method" value="midtrans" className="mt-2 w-full rounded-xl bg-blue-700 py-3 font-bold text-white shadow-sm hover:bg-blue-800 transition">💳 Buat Pesanan & Bayar Online</button>
`;
content = content.replace(originalButton, newButtons);

fs.writeFileSync('src/app/checkout/page.jsx', content);

