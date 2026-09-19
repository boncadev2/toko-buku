const fs = require('fs');
let content = fs.readFileSync('src/app/akun/pesanan/page.jsx', 'utf8');

const printInvoiceFunc = `
  const printInvoice = async (orderId) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch(\`\${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/orders/\${orderId}/invoice\`, { headers: { Authorization: 'Bearer ' + token } });
      const { data } = await res.json();
      if (!data) return;

      const printWindow = window.open("", "_blank");
      printWindow.document.write(\`
        <html><head><title>Faktur \${data.invoice_number}</title>
        <style>
          body { font-family: system-ui, sans-serif; padding: 40px; color: #333; max-width: 800px; margin: 0 auto; }
          .header { border-bottom: 2px solid #eee; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: flex-end; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          th, td { text-align: left; padding: 12px; border-bottom: 1px solid #eee; }
          th { background: #f8fafc; }
          .total { text-align: right; margin-top: 20px; font-size: 1.2em; }
          @media print { body { padding: 0; } }
        </style>
        </head><body>
          <div class="header">
            <div>
              <h1 style="margin:0 0 10px 0; color:#1d4ed8">FAKTUR PEMBAYARAN</h1>
              <p style="margin:0"><strong>\${data.invoice_number}</strong></p>
            </div>
            <div style="text-align:right">
              <h2 style="margin:0; color:#059669">\${data.status.toUpperCase()}</h2>
            </div>
          </div>
          <div style="margin-bottom:30px">
            <h3 style="margin-bottom:10px">Diterbitkan untuk:</h3>
            <p style="margin:0; line-height:1.5"><strong>\${data.customer.name}</strong><br>\${data.customer.phone}<br>\${data.customer.address}</p>
          </div>
          <table>
            <thead><tr><th>Buku</th><th>Harga</th><th>Jumlah</th><th>Subtotal</th></tr></thead>
            <tbody>
              \${data.items.map(i => \\\`<tr><td>\${i.title}</td><td>\${money(i.unit_price)}</td><td>\${i.quantity}</td><td>\${money(i.subtotal)}</td></tr>\\\`).join('')}
            </tbody>
          </table>
          <div style="width:300px; margin-left:auto;">
            <div style="display:flex; justify-content:space-between; margin-bottom:10px;"><span>Subtotal:</span> <span>\${money(data.subtotal)}</span></div>
            <div style="display:flex; justify-content:space-between; margin-bottom:10px; color:#ef4444"><span>Diskon:</span> <span>-\${money(data.discount)}</span></div>
            <div style="display:flex; justify-content:space-between; margin-bottom:10px;"><span>Ongkos Kirim:</span> <span>\${money(data.shipping)}</span></div>
            <hr style="border:none; border-top:2px solid #eee; margin:15px 0">
            <div style="display:flex; justify-content:space-between; font-weight:black; font-size:1.2em"><span>TOTAL:</span> <span style="color:#1d4ed8">\${money(data.total)}</span></div>
          </div>
          <script>window.onload = function() { window.print(); }</script>
        </body></html>
      \`);
      printWindow.document.close();
    } catch {
      alert("Gagal memuat faktur.");
    }
  };
`;

content = content.replace('  const cancelOrder = async', printInvoiceFunc + '\n\n  const cancelOrder = async');

const oldHeader = '<span className={`rounded-full px-4 py-1.5 text-sm font-bold ${statusStyle[selectedOrder.status] || "bg-slate-100 text-slate-700"}`}>{statusText[selectedOrder.status] || String(selectedOrder.status).replaceAll("_", " ")}</span>';

const newHeader = '<div className="flex flex-col items-end gap-3">' + oldHeader + '{[\'paid\', \'processing\', \'packed\', \'shipped\', \'completed\'].includes(selectedOrder.status) && <button onClick={() => printInvoice(selectedOrder.id)} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 flex items-center gap-2">📄 Unduh Faktur</button>}</div>';

content = content.replace(oldHeader, newHeader);

fs.writeFileSync('src/app/akun/pesanan/page.jsx', content);
