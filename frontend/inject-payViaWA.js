const fs = require('fs');
let content = fs.readFileSync('src/app/akun/pesanan/page.jsx', 'utf8');

const payViaWABlock = \`
  const payViaWA = async (orderId) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      setError("");
      const res = await fetch(\\\`\${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/orders/\${orderId}/whatsapp\\\`, { method: "POST", headers: { Authorization: \\\`Bearer \${token}\\\`, Accept: "application/json", "Content-Type": "application/json" } });
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

content = content.replace('  const payOrder = async', payViaWABlock + '\\n\\n  const payOrder = async');

fs.writeFileSync('src/app/akun/pesanan/page.jsx', content);
