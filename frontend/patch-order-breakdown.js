const fs = require('fs');
let content = fs.readFileSync('src/app/akun/pesanan/page.jsx', 'utf8');

const originalSummary = `<div className="mt-6 rounded-2xl bg-blue-50 p-5">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Total Belanja</span>
                <b className="text-xl text-blue-800">{money(selectedOrder.grand_total)}</b>
              </div>
            </div>`;

const modifiedSummary = `<div className="mt-6 rounded-2xl bg-blue-50 p-5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 text-sm">Total Harga Buku</span>
                <b className="text-slate-900 text-sm">{money(selectedOrder.subtotal)}</b>
              </div>
              {Number(selectedOrder.discount_total) > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 text-sm">Total Diskon</span>
                  <b className="text-emerald-600 text-sm">-{money(selectedOrder.discount_total)}</b>
                </div>
              )}
              {Number(selectedOrder.shipping_total) > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 text-sm">Ongkos Kirim</span>
                  <b className="text-slate-900 text-sm">{money(selectedOrder.shipping_total)}</b>
                </div>
              )}
              <hr className="border-blue-200/60 my-2" />
              <div className="flex justify-between items-center pt-1">
                <span className="font-bold text-slate-800">Total Pembayaran</span>
                <b className="text-xl text-blue-800">{money(selectedOrder.grand_total)}</b>
              </div>
            </div>`;

content = content.replace(originalSummary, modifiedSummary);
fs.writeFileSync('src/app/akun/pesanan/page.jsx', content);

