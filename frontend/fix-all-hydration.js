const fs = require('fs');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = require('path').join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(dirPath);
  });
}

walk('src', (filePath) => {
  if (filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Pattern 1: AdminShell.jsx
    const badAdmin = /const \[site, setSite\] = useState\(\(\) => \{ try \{ const c = typeof window !== "undefined" \? JSON\.parse\(localStorage\.getItem\("app_settings"\) \|\| "\{\}"\) : \{\}; return \{ app_name: "", app_logo: "", \.\.\.c \}; \} catch \{ return \{ app_name: "", app_logo: "" \}; \} \}\);/;
    const goodAdmin = `const [site, setSite] = useState({ app_name: "", app_logo: "" });\n  useEffect(() => { try { const c = JSON.parse(localStorage.getItem("app_settings") || "{}"); setSite(prev => ({ ...prev, ...c })); } catch {} }, []);`;
    if (badAdmin.test(content)) { content = content.replace(badAdmin, goodAdmin); changed = true; }

    // Pattern 2: StoreFooter.jsx
    const badFooter = /const \[settings, setSettings\] = useState\(\(\) => \{ try \{ const c = typeof window !== "undefined" \? JSON\.parse\(localStorage\.getItem\("app_settings"\) \|\| "\{\}"\) : \{\}; return \{ store_address: "", \.\.\.c \}; \} catch \{ return \{ store_address: "" \}; \} \}\);/;
    const goodFooter = `const [settings, setSettings] = useState({ store_address: "" });\n  useEffect(() => { try { const c = JSON.parse(localStorage.getItem("app_settings") || "{}"); setSettings(prev => ({ ...prev, ...c })); } catch {} }, []);`;
    if (badFooter.test(content)) { content = content.replace(badFooter, goodFooter); changed = true; }

    // Pattern 3: general settings
    const badSettings = /const \[settings, setSettings\] = useState\(\(\) => \{ try \{ return typeof window !== "undefined" \? JSON\.parse\(localStorage\.getItem\("app_settings"\) \|\| "\{\}"\) : \{\}; \} catch \{ return \{\}; \} \}\);/g;
    const goodSettings = `const [settings, setSettings] = useState({});\n  useEffect(() => { try { const c = JSON.parse(localStorage.getItem("app_settings") || "{}"); setSettings(prev => ({ ...prev, ...c })); } catch {} }, []);`;
    if (badSettings.test(content)) { content = content.replace(badSettings, goodSettings); changed = true; }

    if (changed) {
      if (!content.includes('useEffect(')) {
         content = 'import { useEffect } from "react";\n' + content;
      }
      fs.writeFileSync(filePath, content);
      console.log('Fixed', filePath);
    }
  }
});
