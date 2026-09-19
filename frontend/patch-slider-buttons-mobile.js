const fs = require('fs');
let content = fs.readFileSync('src/app/page.jsx', 'utf8');

// Prev button
content = content.replace(
  'className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 grid h-12 w-12 place-items-center rounded-full bg-white text-stone-900 shadow-xl border border-stone-200 opacity-0 transition-all group-hover:opacity-100 hover:bg-stone-50 hover:scale-110 z-20 hidden sm:grid"',
  'className="absolute left-1 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/90 backdrop-blur text-stone-900 shadow-lg border border-stone-200 opacity-100 sm:opacity-0 transition-all group-hover:opacity-100 hover:bg-white hover:scale-110 z-20"'
);

// Next button
content = content.replace(
  'className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 grid h-12 w-12 place-items-center rounded-full bg-white text-stone-900 shadow-xl border border-stone-200 opacity-0 transition-all group-hover:opacity-100 hover:bg-stone-50 hover:scale-110 z-20 hidden sm:grid"',
  'className="absolute right-1 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/90 backdrop-blur text-stone-900 shadow-lg border border-stone-200 opacity-100 sm:opacity-0 transition-all group-hover:opacity-100 hover:bg-white hover:scale-110 z-20"'
);

fs.writeFileSync('src/app/page.jsx', content);

