const fs = require('fs');
let content = fs.readFileSync('src/app/page.jsx', 'utf8');

// 1. Add accountOpen state
if (!content.includes('accountOpen')) {
  content = content.replace(
    'const [logoutOpen, setLogoutOpen] = useState(false);',
    'const [logoutOpen, setLogoutOpen] = useState(false);\n  const [accountOpen, setAccountOpen] = useState(false);'
  );
}

// 2. Replace the exact button HTML
const oldStr = 'user ? <div className="relative"><button onClick={() => setLogoutOpen(true)} className="flex items-center gap-2 rounded-full border-2 border-blue-700 bg-white py-1.5 pl-2 pr-3 text-sm font-bold text-slate-700"><span className="grid h-8 w-8 place-items-center rounded-full bg-blue-600 text-white">{user.name?.slice(0, 1).toUpperCase()}</span><span className="max-w-28 truncate">{user.name}</span></button></div> :';

const newStr = 'user ? <div className="relative"><button onClick={() => setAccountOpen(!accountOpen)} className="flex items-center gap-2 rounded-full border-2 border-blue-700 bg-white py-1.5 pl-2 pr-3 text-sm font-bold text-slate-700"><span className="grid h-8 w-8 place-items-center rounded-full bg-blue-600 text-white">{user.name?.slice(0, 1).toUpperCase()}</span><span className="max-w-28 truncate">{user.name}</span><span>⌄</span></button>{accountOpen && <div className="absolute right-0 top-12 z-50 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"><a href={user.is_admin ? "/admin" : "/akun"} className="block rounded-xl px-3 py-3 text-sm font-semibold hover:bg-blue-50">👤 {user.is_admin ? "Dashboard Admin" : "Akun Saya"}</a>{!user.is_admin && <a href="/akun/pesanan" className="block rounded-xl px-3 py-3 text-sm font-semibold hover:bg-blue-50">📦 Pesanan Saya</a>}<button onClick={() => { setAccountOpen(false); setLogoutOpen(true); }} className="w-full rounded-xl px-3 py-3 text-left text-sm font-bold text-red-600 hover:bg-red-50">↪ Keluar</button></div>}</div> :';

content = content.replace(oldStr, newStr);

fs.writeFileSync('src/app/page.jsx', content);
