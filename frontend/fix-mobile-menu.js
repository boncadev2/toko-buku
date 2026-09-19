const fs = require('fs');
let content = fs.readFileSync('src/app/page.jsx', 'utf8');

if (!content.includes('StoreMobileControls')) {
  // 1. Add import
  content = content.replace(
    'import LogoutConfirmModal from "../components/LogoutConfirmModal";',
    'import LogoutConfirmModal from "../components/LogoutConfirmModal";\nimport StoreMobileControls from "../components/StoreMobileControls";'
  );
  
  // 2. Add component after </header>
  content = content.replace(
    '</header>\n    \n    <section id="beranda"',
    '</header>\n    <StoreMobileControls user={user} cartCount={cartCount} onLogout={() => { setAccountOpen(false); setLogoutOpen(true); }} />\n    <section id="beranda"'
  );
  
  fs.writeFileSync('src/app/page.jsx', content);
  console.log("Patched successfully");
} else {
  console.log("Already patched");
}
