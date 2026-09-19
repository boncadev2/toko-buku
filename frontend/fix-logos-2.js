const fs = require('fs');

let info = fs.readFileSync('src/app/info/[slug]/client.jsx', 'utf8');
info = info.replace(
  '<span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-700 text-white">📚</span>',
  '<span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-700 text-white text-lg">{(settings.app_name || "BukuPagi")[0].toUpperCase()}</span>'
);
fs.writeFileSync('src/app/info/[slug]/client.jsx', info);

let peng = fs.readFileSync('src/app/admin/pengaturan/page.jsx', 'utf8');
peng = peng.replace(
  '<span className="grid h-20 w-20 place-items-center rounded-2xl bg-blue-700 text-3xl text-white">📚</span>',
  '<span className="grid h-20 w-20 place-items-center rounded-2xl bg-blue-700 text-3xl text-white">{(form.app_name || "B")[0].toUpperCase()}</span>'
);
fs.writeFileSync('src/app/admin/pengaturan/page.jsx', peng);
