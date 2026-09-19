const fs = require('fs');
let content = fs.readFileSync('src/app/page.jsx', 'utf8');

const regex = /const \[marketplace, setMarketplace\] = useState\(\{[\s\S]*?\}\);/;
const replaceStr = `const [marketplace, setMarketplace] = useState(() => {
    try { 
      const c = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("app_settings") || "{}") : {};
      return { store_address: "", hero_eyebrow: "", hero_title: "", hero_description: "", recommendation_label: "", recommendation_book_title: "", recommendation_book_subtitle: "", recommendation_kicker: "", recommendation_title: "", shopee_url: "", tokopedia_url: "", youtube_url: "", whatsapp_url: "", facebook_url: "", instagram_url: "", ...c };
    } catch { return {}; }
  });`;

content = content.replace(regex, replaceStr);

content = content.replace(
  /setMarketplace\(\(old\) => \(\{ \.\.\.old, \.\.\.\(payload\?\.data \|\| \{\}\) \}\)\)/,
  '{ if (payload?.data) localStorage.setItem("app_settings", JSON.stringify(payload.data)); setMarketplace((old) => ({ ...old, ...(payload?.data || {}) })); }'
);

fs.writeFileSync('src/app/page.jsx', content);
