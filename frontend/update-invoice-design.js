const fs = require('fs');
let content = fs.readFileSync('src/app/akun/pesanan/page.jsx', 'utf8');

// The old function body starts right after `printWindow.document.write(\`` and ends at `\`);`
const newHTML = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Faktur \${data.invoice_number}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
    body { font-family: 'Inter', sans-serif; color: #334155; background: #f8fafc; margin: 0; padding: 40px; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .invoice-container { max-width: 800px; margin: 0 auto; background: #ffffff; padding: 50px; border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); }
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #e2e8f0; padding-bottom: 30px; margin-bottom: 40px; }
    .brand h1 { font-size: 28px; font-weight: 800; color: #1d4ed8; margin: 0 0 5px 0; letter-spacing: -0.5px; }
    .brand p { margin: 0; color: #64748b; font-size: 14px; }
    .invoice-details { text-align: right; }
    .invoice-details h2 { margin: 0 0 10px 0; font-size: 32px; color: #0f172a; text-transform: uppercase; letter-spacing: 2px; }
    .badge { display: inline-block; padding: 6px 12px; border-radius: 99px; font-size: 12px; font-weight: 600; text-transform: uppercase; background: #dcfce7; color: #166534; margin-bottom: 15px; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 40px; }
    .info-block h3 { font-size: 12px; text-transform: uppercase; color: #94a3b8; letter-spacing: 1px; margin: 0 0 10px 0; }
    .info-block p { margin: 0; line-height: 1.6; font-size: 14px; color: #0f172a; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
    th { background: #f1f5f9; color: #475569; font-weight: 600; text-transform: uppercase; font-size: 12px; padding: 15px; text-align: left; }
    td { padding: 15px; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
    td.amount { text-align: right; font-weight: 600; }
    th.amount { text-align: right; }
    .summary-box { width: 350px; margin-left: auto; background: #f8fafc; padding: 25px; border-radius: 12px; }
    .summary-line { display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 14px; color: #475569; }
    .summary-line.discount { color: #ef4444; }
    .summary-line.total { margin-top: 20px; padding-top: 20px; border-top: 2px dashed #cbd5e1; font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 0; }
    .footer { margin-top: 60px; text-align: center; color: #94a3b8; font-size: 13px; border-top: 1px solid #e2e8f0; padding-top: 20px; }
    @media print { body { background: #fff; padding: 0; } .invoice-container { box-shadow: none; padding: 0; } }
  </style>
</head>
<body>
  <div class="invoice-container">
    <div class="header">
      <div class="brand">
        <h1>TOKO BUKU</h1>
        <p>Jl. Literasi No. 123, Jakarta Raya<br>hello@tokobuku.com • 0812-3456-7890</p>
      </div>
      <div class="invoice-details">
        <h2>FAKTUR</h2>
        <span class="badge">\${data.status.replaceAll('_', ' ')}</span>
        <p style="margin:0; font-size:14px; color:#64748b">
          No. <strong>\${data.invoice_number}</strong><br>
          Tgl. \${new Date().toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}
        </p>
      </div>
    </div>
    
    <div class="info-grid">
      <div class="info-block">
        <h3>Ditagihkan Kepada:</h3>
        <p><strong>\${data.customer.name}</strong><br>\${data.customer.phone}<br>\${data.customer.address}</p>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Deskripsi Item</th>
          <th class="amount">Harga</th>
          <th style="text-align:center">Qty</th>
          <th class="amount">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        \${data.items.map(i => "<tr><td><strong>" + i.title + "</strong></td><td class='amount'>" + money(i.unit_price) + "</td><td style='text-align:center'>" + i.quantity + "</td><td class='amount'>" + money(i.subtotal) + "</td></tr>").join('')}
      </tbody>
    </table>

    <div class="summary-box">
      <div class="summary-line"><span>Subtotal Produk</span> <span>\${money(data.subtotal)}</span></div>
      <div class="summary-line discount"><span>Diskon</span> <span>-\${money(data.discount)}</span></div>
      <div class="summary-line"><span>Ongkos Kirim</span> <span>\${money(data.shipping)}</span></div>
      <div class="summary-line total"><span>TOTAL</span> <span style="color:#1d4ed8">\${money(data.total)}</span></div>
    </div>

    <div class="footer">
      <p>Terima kasih atas pesanan Anda! Jika Anda memiliki pertanyaan mengenai faktur ini, silakan hubungi kami.</p>
    </div>
  </div>
  <script>window.onload = function() { setTimeout(function(){ window.print(); }, 500); }</script>
</body>
</html>`;

const oldContent = content.match(/printWindow\.document\.write\(`([\s\S]*?)`\);/)[1];
content = content.replace(oldContent, newHTML);

fs.writeFileSync('src/app/akun/pesanan/page.jsx', content);
