const fs = require('fs');

let content = fs.readFileSync('src/components/CustomerHeader.jsx', 'utf8');

if (!content.includes('const appName = settings.app_name')) {
  content = content.replace(
    'return <>',
    'const appName = settings.app_name || "BukuPagi";\n  const appLogo = settings.app_logo;\n  return <>'
  );
  fs.writeFileSync('src/components/CustomerHeader.jsx', content);
}
