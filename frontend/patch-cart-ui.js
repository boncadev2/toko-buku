const fs = require('fs');
let content = fs.readFileSync('src/app/keranjang/page.jsx', 'utf8');

const originalItemUI = \`<div className="min-w-0 flex-1"><b className="block truncate">{item.title}</b><p className="mt-1 text-sm font-bold text-blue-700">{money(item.unit_price)}</p></div>\`;
const modifiedItemUI = \`<div className="min-w-0 flex-1"><b className="block truncate">{item.title}</b><div className="mt-1 flex items-baseline gap-2"><span className="text-sm font-bold text-blue-700">{money(item.unit_price)}</span>{item.original_price && <span className="text-[10px] text-slate-400 line-through">{money(item.original_price)}</span>}</div></div>\`;

content = content.replace(originalItemUI, modifiedItemUI);
fs.writeFileSync('src/app/keranjang/page.jsx', content);

