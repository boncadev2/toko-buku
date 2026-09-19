const fs = require('fs');
let content = fs.readFileSync('src/app/akun/pesanan/page.jsx', 'utf8');

const payOrderBlock = \`  const payOrder = async (orderId) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      setError("");
      const res = await fetch(\\\`\${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/orders/\${orderId}/payment/midtrans\\\`, { method: "POST", headers: { Authorization: \\\`Bearer \${token}\\\`, Accept: "application/json" } });
      const payload = await res.json();
      if (res.ok && payload.data?.redirect_url) {
        window.location.href = payload.data.redirect_url;
      } else {
        setError(payload.message || "Gagal membuat link pembayaran online.");
      }
    } catch {
      setError("Terjadi kesalahan saat memproses pembayaran.");
    }
  };\`;

const payViaWABlock = \`  const payViaWA = async (orderId) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      setError("");
      const res = await fetch(\\\`\${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/orders/\${orderId}/whatsapp\\\`, { method: "POST", headers: { Authorization: \\\`Bearer \${token}\\\`, Accept: "application/json" } });
      const payload = await res.json();
      if (res.ok && payload.data?.url) {
        window.location.href = payload.data.url;
      } else {
        setError(payload.message || "Gagal memuat link WhatsApp.");
      }
    } catch {
      setError("Terjadi kesalahan saat memproses pesanan WhatsApp.");
    }
  };\`;

content = content.replace(payOrderBlock, payOrderBlock + '\\n\\n' + payViaWABlock);

const buttonsBlock = \`<button onClick={() => payOrder(selectedOrder.id)} className="w-full sm:w-auto whitespace-nowrap rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-blue-800 transition">
                    Bayar Sekarang ➔
                  </button>\`;

const newButtonsBlock = \`<div className="flex flex-col gap-2 w-full sm:w-auto">
                    <button onClick={() => payOrder(selectedOrder.id)} className="w-full sm:w-auto whitespace-nowrap rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-blue-800 transition">
                      Bayar Sekarang ➔
                    </button>
                    <button onClick={() => payViaWA(selectedOrder.id)} className="w-full sm:w-auto whitespace-nowrap rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-green-700 transition">
                      Bayar via WhatsApp
                    </button>
                  </div>\`;

content = content.replace(buttonsBlock, newButtonsBlock);

fs.writeFileSync('src/app/akun/pesanan/page.jsx', content);
