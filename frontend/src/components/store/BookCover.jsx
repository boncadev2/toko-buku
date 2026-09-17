export default function BookCover({ title, cover = "from-blue-950 to-cyan-500", className = "" }) {
  return <div className={`flex aspect-[3/4] items-end rounded-xl bg-gradient-to-br ${cover} p-4 text-white shadow-sm ${className}`}><div className="border-l border-white/50 pl-3"><p className="text-[9px] uppercase tracking-[.18em] text-white/70">Bukupagi</p><p className="mt-2 text-lg font-black leading-tight">{title}</p></div></div>;
}
