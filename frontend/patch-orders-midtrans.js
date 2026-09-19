const fs = require('fs');
let content = fs.readFileSync('src/app/akun/pesanan/page.jsx', 'utf8');

// Insert payOrder function
const payOrderFunction = `
  const payOrder = async (orderId) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      setError("");
      const res = await fetch(\`\${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/orders/\${orderId}/payment/midtrans\`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: \`Bearer \${token}\` }
      });
      const payload = await res.json();
      if (res.ok && payload.data?.redirect_url) {
        window.location.href = payload.data.redirect_url;
      } else {
        setError(payload.message || "Gagal menghubungi layanan pembayaran.");
      }
    } catch {
      setError("Terjadi kesalahan saat memproses pembayaran.");
    }
  };
`;

content = content.replace(
  'const cartItems = cart?.items || [];',
  payOrderFunction + '\n  const cartItems = cart?.items || [];'
);

// Add "Bayar Sekarang" button to the order layout if status is 'pending_payment'
const originalOrderRender = `<div className="px-5 py-4">{order.items?.map((item) => <div key={item.id} className="flex justify-between gap-4 py-1 text-sm"><span className="truncate text-slate-600">{item.title} × {item.quantity}</span><b>{money(item.subtotal)}</b></div>)}</div>`;

const modifiedOrderRender = `<div className="px-5 py-4 border-b border-slate-50">{order.items?.map((item) => <div key={item.id} className="flex justify-between gap-4 py-1 text-sm"><span className="truncate text-slate-600">{item.title} × {item.quantity}</span><b>{money(item.subtotal)}</b></div>)}</div>
{order.status === 'pending_payment' && <div className="px-5 py-3 bg-amber-50/50 flex justify-end"><button onClick={() => payOrder(order.id)} className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-blue-800 transition">Bayar Sekarang ➔</button></div>}`;

content = content.replace(originalOrderRender, modifiedOrderRender);

fs.writeFileSync('src/app/akun/pesanan/page.jsx', content);

