const fs = require('fs');
let content = fs.readFileSync('src/app/page.jsx', 'utf8');

const badMarketplace = `  const [marketplace, setMarketplace] = useState(() => {
    try { 
      const c = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("app_settings") || "{}") : {};
      return { store_address: "", hero_eyebrow: "", hero_title: "", hero_description: "", recommendation_label: "", recommendation_book_title: "", recommendation_book_subtitle: "", recommendation_kicker: "", recommendation_title: "", shopee_url: "", tokopedia_url: "", youtube_url: "", whatsapp_url: "", facebook_url: "", instagram_url: "", ...c };
    } catch { return {}; }
  });`;

const goodMarketplace = `  const [marketplace, setMarketplace] = useState({ store_address: "", hero_eyebrow: "", hero_title: "", hero_description: "", recommendation_label: "", recommendation_book_title: "", recommendation_book_subtitle: "", recommendation_kicker: "", recommendation_title: "", shopee_url: "", tokopedia_url: "", youtube_url: "", whatsapp_url: "", facebook_url: "", instagram_url: "" });
  
  useEffect(() => {
    try {
      const c = JSON.parse(localStorage.getItem("app_settings") || "{}");
      setMarketplace(prev => ({ ...prev, ...c }));
    } catch {}
  }, []);`;

content = content.replace(badMarketplace, goodMarketplace);
fs.writeFileSync('src/app/page.jsx', content);
