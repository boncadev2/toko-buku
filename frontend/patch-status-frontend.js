const fs = require('fs');
let content = fs.readFileSync('src/app/akun/pesanan/page.jsx', 'utf8');

content = content.replace(
  'pending_payment: "Menunggu pembayaran", paid: "Sudah dibayar"',
  'pending_payment: "Menunggu pembayaran", manual_payment: "Menunggu bayar manual", paid: "Sudah dibayar"'
);

content = content.replace(
  'pending_payment: "bg-amber-50 text-amber-700"',
  'pending_payment: "bg-amber-50 text-amber-700", manual_payment: "bg-orange-50 text-orange-700"'
);

const pendingPaymentBlock = `{selectedOrder.status === 'pending_payment' && (
              <div className="mt-8 border-t border-slate-100 pt-6">
                <div className="rounded-2xl bg-amber-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-amber-200">
                  <div>
                    <h3 className="font-black text-amber-900">Menunggu Pembayaran</h3>
                    <p className="text-sm text-amber-700 mt-1">Segera selesaikan pembayaran agar pesanan dapat diproses.</p>
                  </div>
                  <button onClick={() => payOrder(selectedOrder.id)} className="w-full sm:w-auto whitespace-nowrap rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-blue-800 transition">
                    Bayar Sekarang ➔
                  </button>
                </div>
              </div>
            )}`;

const manualPaymentBlock = `{selectedOrder.status === 'manual_payment' && (
              <div className="mt-8 border-t border-slate-100 pt-6">
                <div className="rounded-2xl bg-orange-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-orange-200">
                  <div>
                    <h3 className="font-black text-orange-900">Pemesanan via WhatsApp</h3>
                    <p className="text-sm text-orange-700 mt-1">Pesanan Anda sedang dalam konfirmasi oleh Admin. Silakan periksa pesan masuk WhatsApp Anda secara berkala.</p>
                  </div>
                  <a href="/keranjang" onClick={(e) => { e.preventDefault(); alert('Hubungi admin di WhatsApp untuk menyelesaikan.'); }} className="w-full text-center sm:w-auto whitespace-nowrap rounded-xl bg-orange-600 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-orange-700 transition">
                    Cek WhatsApp ➔
                  </a>
                </div>
              </div>
            )}`;

content = content.replace(pendingPaymentBlock, pendingPaymentBlock + '\\n\\n            ' + manualPaymentBlock);

fs.writeFileSync('src/app/akun/pesanan/page.jsx', content);
