const fs = require('fs');

let content = fs.readFileSync('src/app/page.jsx', 'utf8');

// Replace the slice(0, 4) in fetch so it gets all categories
content = content.replace(
  'setDbCategories(p.data.slice(0, 4))',
  'setDbCategories(p.data)'
);

const sliderComponent = `
function CategorySlider({ categories, categoryColors }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = require("react").useRef(null);
  
  useEffect(() => {
    if (categories.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % categories.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [categories.length]);

  useEffect(() => {
    if (containerRef.current && containerRef.current.children[currentIndex]) {
      const child = containerRef.current.children[currentIndex];
      const scrollLeft = child.offsetLeft - containerRef.current.offsetLeft - (containerRef.current.clientWidth / 2) + (child.clientWidth / 2);
      containerRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [currentIndex]);

  const prev = () => setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length);
  const next = () => setCurrentIndex((prev) => (prev + 1) % categories.length);

  if (categories.length === 0) return null;

  return (
    <div className="relative group">
      <div 
        ref={containerRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((cat, i) => { 
          const style = categoryColors[i % categoryColors.length]; 
          return (
            <Link 
              href={\`/cari?kategori=\${cat.slug}\`} 
              className="group shrink-0 w-40 sm:w-48 lg:w-56 snap-center snap-always rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md" 
              key={cat.id}
            >
              <span className={\`grid h-11 w-11 place-items-center rounded-xl text-xl \${style.color}\`}>{style.icon}</span>
              <h3 className="mt-5 font-bold truncate" title={cat.name}>{cat.name}</h3>
              <p className="mt-1 text-sm text-stone-500">Jelajahi koleksi →</p>
            </Link>
          );
        })}
      </div>
      
      <button 
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 grid h-10 w-10 place-items-center rounded-full bg-white text-stone-900 shadow-lg border border-stone-200 opacity-0 transition group-hover:opacity-100 hover:bg-stone-50 hover:scale-110 z-10 hidden sm:grid"
        aria-label="Sebelumnya"
      >
        ←
      </button>
      <button 
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 grid h-10 w-10 place-items-center rounded-full bg-white text-stone-900 shadow-lg border border-stone-200 opacity-0 transition group-hover:opacity-100 hover:bg-stone-50 hover:scale-110 z-10 hidden sm:grid"
        aria-label="Selanjutnya"
      >
        →
      </button>
    </div>
  );
}
`;

// Insert sliderComponent before export default function Home
content = content.replace(
  'export default function Home() {',
  sliderComponent + '\nexport default function Home() {'
);

// Add missing css for scrollbar hide
content = content.replace(
  'import "./globals.css";',
  'import "./globals.css";\nimport { useRef } from "react";' // Wait, I already used require("react") inline. I will just do it inline. No need to add imports.
);

// Replace the grid container with CategorySlider
content = content.replace(
  /<div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">\{dbCategories\.map\(\(cat, i\) => \{ const style = categoryColors\[i % categoryColors\.length\]; return <Link href=\{`\/cari\?kategori=\$\{cat\.slug\}`\} className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md" key=\{cat\.id\}><span className=\{`grid h-11 w-11 place-items-center rounded-xl text-xl \$\{style\.color\}`\}>\{style\.icon\}<\/span><h3 className="mt-5 font-bold truncate" title=\{cat\.name\}>\{cat\.name\}<\/h3><p className="mt-1 text-sm text-stone-500">Jelajahi koleksi →<\/p><\/Link> \}\)\}<\/div>/,
  '<CategorySlider categories={dbCategories} categoryColors={categoryColors} />'
);

// Replace global css to add .scrollbar-hide
fs.writeFileSync('src/app/page.jsx', content);

let css = fs.readFileSync('src/app/globals.css', 'utf8');
if (!css.includes('.scrollbar-hide')) {
  css += `\n\n@layer utilities {\n  .scrollbar-hide::-webkit-scrollbar {\n    display: none;\n  }\n  .scrollbar-hide {\n    -ms-overflow-style: none;\n    scrollbar-width: none;\n  }\n}\n`;
  fs.writeFileSync('src/app/globals.css', css);
}

