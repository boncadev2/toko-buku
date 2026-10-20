const fs = require('fs');
let content = fs.readFileSync('src/app/page.jsx', 'utf8');

content = content.replace(
  '    if (!token) return;',
  '    if (!token) { setAuthLoading(false); return; }'
);

content = content.replace(
  /fetch\(`\$\{process\.env\.NEXT_PUBLIC_API_URL \?\? "http:\/\/localhost:8080\/api"\}\/auth\/me`, \{ headers: \{ Authorization: `Bearer \$\{token\}`, Accept: "application\/json" \} \}\)\n\s*\.then\(async \(response\) => \{ if \(!response\.ok\) throw new Error\("Sesi tidak valid"\); return response\.json\(\); \}\)\n\s*\.then\(\(response\) => setUser\(response\.data\)\)\n\s*\.catch\(\(\) => localStorage\.removeItem\("token"\)\);/,
  'fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/auth/me`, { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } })\n      .then(async (response) => { if (!response.ok) throw new Error("Sesi tidak valid"); return response.json(); })\n      .then((response) => { setUser(response.data); setAuthLoading(false); })\n      .catch(() => { localStorage.removeItem("token"); setAuthLoading(false); });'
);

fs.writeFileSync('src/app/page.jsx', content);
