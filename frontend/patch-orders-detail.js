const fs = require('fs');

let content = fs.readFileSync('src/app/akun/pesanan/page.jsx', 'utf8');

// We need to add selectedOrder state
content = content.replace(
  'const [error, setError] = useState("");',
  'const [error, setError] = useState("");\n  const [selectedOrder, setSelectedOrder] = useState(null);'
);

// We need to replace the entire <section className="mt-7"> that renders orders
// To do this, we can find the section and replace it.
const orderSectionStart = '<section className="mt-7"><div className="flex items-end justify-between"><div><h2 className="text-xl font-black">Riwayat pembelian</h2>';
const errorTag = '</section>{error && <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>}</section></div><Footer appName={appName}/>';

const startIndex = content.indexOf(orderSectionStart);
const endIndex = content.indexOf(errorTag);

if (startIndex !== -1 && endIndex !== -1) {
  const newSection = `
      <section className="mt-7">
        {!selectedOrder ? (
          <>
            <div className="flex items-end justify-between">
              <div><h2 className="text-xl font-black">Riwayat pembelian</h2><p className="mt-1 text-sm text-slate-500">Daftar pesanan yang pernah dibuat.</p></div>
              {orders && <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">{orders.length} pesanan</span>}
            </div>
            <div className="mt-4 space-y-4">
              {!orders ? (
                <div className="rounded-2xl bg-white p-6 text-sm text-slate-500">Memuat riwayat pembelian…</div>
              ) : orders.length ? (
                orders.map((order) => (
                  <article key={order.id} className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm hover:shadow-md transition cursor-pointer" onClick={() => setSelectedOrder(order)}>
                    <div className="flex flex-wrap items-center gap-3 px-5 py-4">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50">📦</span>
                      <div className="min-w-[180px] flex-1">
                        <b className="block text-slate-900">{order.number}</b>
                        <small className="text-slate-500">{new Date(order.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</small>
                      </div>
                      <span className={\`rounded-full px-3 py-1 text-xs font-bold \${statusStyle[order.status] || "bg-slate-100 text-slate-700"}\`}>{statusText[order.status] || String(order.status).replaceAll("_", " ")}</span>
                      <b className="text-blue-800">{money(order.grand_total)}</b>
                      <span className="text-blue-700 font-bold ml-2">Lihat Detail ➔</span>
                    </div>
                  </article>
                ))
              ) : (
                <div className="rounded-2xl bg-white p-10 text-center"><p className="text-3xl">📭</p><b className="mt-3 block">Belum ada riwayat pembelian</b><p className="mt-1 text-sm text-slate-500">Pesanan yang sudah dibuat akan muncul di sini.</p></div>
              )}
            </div>
          </>
        ) : (
          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
            <button onClick={() => setSelectedOrder(null)} className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900">
              ← Kembali ke daftar pesanan
            </button>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <p className="text-sm text-slate-500">Detail Pesanan</p>
                <h2 className="text-2xl font-black">{selectedOrder.number}</h2>
                <p className="text-sm mt-1 text-slate-500">{new Date(selectedOrder.created_at).toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" })}</p>
              </div>
              <span className={\`rounded-full px-4 py-1.5 text-sm font-bold \${statusStyle[selectedOrder.status] || "bg-slate-100 text-slate-700"}\`}>{statusText[selectedOrder.status] || String(selectedOrder.status).replaceAll("_", " ")}</span>
            </div>
            
            <div className="mt-6">
              <h3 className="font-bold text-slate-900 mb-3">Produk yang dibeli</h3>
              <div className="space-y-3">
                {selectedOrder.items?.map((item) => (
                  <div key={item.id} className="flex justify-between items-center rounded-xl bg-slate-50 p-4">
                    <div>
                      <p className="font-bold text-slate-900">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.quantity} x {money(item.unit_price)}</p>
                    </div>
                    <b className="text-slate-900">{money(item.subtotal)}</b>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-blue-50 p-5">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Total Belanja</span>
                <b className="text-xl text-blue-800">{money(selectedOrder.grand_total)}</b>
              </div>
            </div>

            {selectedOrder.status === 'pending_payment' && (
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
            )}
          </div>
        )}
  `;

  content = content.substring(0, startIndex) + newSection + content.substring(endIndex);
  fs.writeFileSync('src/app/akun/pesanan/page.jsx', content);
} else {
  console.log("Could not find boundaries.");
}
