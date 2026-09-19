const fs = require('fs');

let content = fs.readFileSync('src/app/checkout/page.jsx', 'utf8');

const originalLogic = `    const response = await fetch(\`\${apiUrl}/checkout\`, { method: "POST", headers: authHeaders(), body: JSON.stringify({ address, item_ids: itemIds }) });
    const payload = await response.json(); if(response.ok)localStorage.removeItem("checkout_item_ids"); setMessage(response.ok ? \`Pesanan \${payload.data.number} berhasil dibuat.\` : payload.message || "Pesanan belum dapat dibuat.");`;

const newLogic = `    const response = await fetch(\`\${apiUrl}/checkout\`, { method: "POST", headers: authHeaders(), body: JSON.stringify({ address, item_ids: itemIds }) });
    const payload = await response.json(); 
    if(response.ok) {
      localStorage.removeItem("checkout_item_ids");
      setMessage(\`Mengarahkan ke pembayaran untuk pesanan \${payload.data.number}...\`);
      
      try {
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
      }
    } else {
      setMessage(payload.message || "Pesanan belum dapat dibuat.");
    }`;

content = content.replace(originalLogic, newLogic);
fs.writeFileSync('src/app/checkout/page.jsx', content);

