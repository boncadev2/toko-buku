const fs = require('fs');

function replaceEmojiLogo(filePath, nameVar) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace <span>📚</span>
  content = content.replace(
    /<span>📚<\/span>/g,
    `<span className="grid h-8 w-8 place-items-center rounded-xl bg-blue-700 text-white">{${nameVar}[0].toUpperCase()}</span>`
  );
  
  // Replace <span className="...">📚</span>
  content = content.replace(
    /<span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-700 text-lg text-white">📚<\/span>/g,
    `<span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-700 text-lg text-white">{${nameVar}[0].toUpperCase()}</span>`
  );

  fs.writeFileSync(filePath, content);
}

replaceEmojiLogo('src/components/AdminShell.jsx', 'site.app_name');
replaceEmojiLogo('src/app/cari/page.jsx', 'appName');
replaceEmojiLogo('src/app/info/[slug]/client.jsx', '(settings?.app_name || "BukuPagi")');

replaceEmojiLogo('src/app/akun/page.jsx', 'appName');
replaceEmojiLogo('src/app/akun/alamat/page.jsx', 'appName');
replaceEmojiLogo('src/app/akun/pesanan/page.jsx', 'appName');
replaceEmojiLogo('src/app/akun/profil/page.jsx', 'appName');

