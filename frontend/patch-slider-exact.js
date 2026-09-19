const fs = require('fs');

let content = fs.readFileSync('src/app/page.jsx', 'utf8');

const startIdx = content.indexOf('function CategorySlider({ categories, categoryColors }) {');
const endIdx = content.indexOf('export default function Home() {');

if (startIdx !== -1 && endIdx !== -1) {
  const newSlider = `function CategorySlider({ categories, categoryColors }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (categories.length === 0 || isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % categories.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [categories.length, isHovered]);

  useEffect(() => {
    if (containerRef.current && containerRef.current.children[currentIndex]) {
      const child = containerRef.current.children[currentIndex];
      child.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [currentIndex]);

  const handlePrev = (e) => { e.preventDefault(); setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length); };
  const handleNext = (e) => { e.preventDefault(); setCurrentIndex((prev) => (prev + 1) % categories.length); };

  if (categories.length === 0) return null;

  return (
    <div 
      className="relative group" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
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
        type="button"
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 grid h-12 w-12 place-items-center rounded-full bg-white text-stone-900 shadow-xl border border-stone-200 opacity-0 transition-all group-hover:opacity-100 hover:bg-stone-50 hover:scale-110 z-20 hidden sm:grid"
        aria-label="Sebelumnya"
      >
        ←
      </button>
      <button 
        type="button"
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 grid h-12 w-12 place-items-center rounded-full bg-white text-stone-900 shadow-xl border border-stone-200 opacity-0 transition-all group-hover:opacity-100 hover:bg-stone-50 hover:scale-110 z-20 hidden sm:grid"
        aria-label="Selanjutnya"
      >
        →
      </button>
    </div>
  );
}
`;

  content = content.slice(0, startIdx) + newSlider + '\n' + content.slice(endIdx);
  fs.writeFileSync('src/app/page.jsx', content);
}
