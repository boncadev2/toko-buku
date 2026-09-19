const fs = require('fs');

let content = fs.readFileSync('src/components/CustomerHeader.jsx', 'utf8');

content = content.replace(
  'api("/auth/me"',
  'api("/settings").then((response) => setSettings(response.data || {})).catch(() => null);\n    api("/auth/me"'
);

fs.writeFileSync('src/components/CustomerHeader.jsx', content);

