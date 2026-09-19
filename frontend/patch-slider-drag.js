const fs = require('fs');
let content = fs.readFileSync('src/app/page.jsx', 'utf8');

const startIdx = content.indexOf('function CategorySlider({');
const endIdx = content.indexOf('export default function Home() {');

if (startIdx !== -1 && endIdx !== -1) {
  const newSlider = `function CategorySlider({ categories, categoryColors }) {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const isDown = useRef(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  
  useEffect(() => {
    if (categories.length === 0 || isHovered) return;
    const interval = setInterval(() => {
      if (containerRef.current) {
        const c = containerRef.current;
        if (c.scrollLeft + c.clientWidth >= c.scrollWidth - 10) {
          c.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          c.scrollBy({ left: c.children[0].clientWidth + 16, behavior: 'smooth' });
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [categories.length, isHovered]);

  const handlePrev = (e) => {
    e.preventDefault();
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -(containerRef.current.children[0].clientWidth + 16), behavior: 'smooth' });
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: containerRef.current.children[0].clientWidth + 16, behavior: 'smooth' });
    }
  };

  const onMouseDown = (e) => {
    isDown.current = true;
    isDragging.current = false;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
    containerRef.current.style.scrollSnapType = 'none';
    containerRef.current.style.scrollBehavior = 'auto';
  };
  const onMouseLeave = () => {
    isDown.current = false;
    if (containerRef.current) {
      containerRef.current.style.scrollSnapType = 'x mandatory';
      containerRef.current.style.scrollBehavior = 'smooth';
    }
  };
  const onMouseUp = () => {
    isDown.current = false;
    if (containerRef.current) {
      containerRef.current.style.scrollSnapType = 'x mandatory';
      containerRef.current.style.scrollBehavior = 'smooth';
    }
  };
  const onMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    isDragging.current = true;
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };
  const onClickLink = (e) => {
    if (isDragging.current) e.preventDefault();
  };

  if (categories.length === 0) return null;

  return (
    <div 
      className="relative group" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-2 cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((cat, i) => { 
          const style = categoryColors[i % categoryColors.length]; 
          return (
            <Link 
              href={\`/cari?kategori=\${cat.slug}\`} 
              onClick={onClickLink}
              className="group shrink-0 w-40 sm:w-48 lg:w-56 snap-center snap-always rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md select-none" 
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
