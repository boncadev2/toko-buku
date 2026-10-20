"use client";

export default function SocialLinks({ settings = {} }) {
  const items = [
    {
      name: "YouTube",
      url: settings?.youtube_url,
      bgColor: "bg-red-600 hover:bg-red-700",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
    {
      name: "Facebook",
      url: settings?.facebook_url,
      bgColor: "bg-[#1877f2] hover:bg-blue-700",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: settings?.instagram_url,
      bgColor: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-90",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      ),
    },
  ];

  // Hanya tampilkan yang URL-nya sudah diisi di database (tidak kosong)
  const activeLinks = items.filter(
    (item) => typeof item.url === "string" && item.url.trim().length > 0
  );

  // Jika semua kosong di database, jangan tampilkan apa-apa
  if (activeLinks.length === 0) return null;

  return (
    <div className="mt-5 flex items-center gap-2.5" aria-label="Media Sosial">
      {activeLinks.map((item) => (
        <a
          key={item.name}
          href={item.url.trim()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.name}
          title={item.name}
          className={`grid h-9 w-9 place-items-center rounded-full text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${item.bgColor}`}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}
