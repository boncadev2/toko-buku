const fs = require('fs');

function fixFooter(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Make Footer take appName as prop
  content = content.replace(
    'const Footer=()=>',
    'const Footer=({appName})=>'
  );
  content = content.replace(
    'function Footer(){',
    'function Footer({appName}){',
  );
  
  // Pass appName to Footer
  content = content.replace(
    /<Footer\/>/g,
    '<Footer appName={appName}/>'
  );

  fs.writeFileSync(filePath, content);
}

fixFooter('src/app/akun/alamat/page.jsx');
fixFooter('src/app/akun/pesanan/page.jsx');

