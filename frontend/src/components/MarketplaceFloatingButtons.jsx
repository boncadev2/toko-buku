"use client";

import { useEffect, useState } from "react";

function ShopeeLogo() {
  return <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" aria-hidden="true"><path d="M8.2 11.8h15.6l1.1 14.1H7.1L8.2 11.8Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/><path d="M11.5 12V9.5a4.5 4.5 0 0 1 9 0V12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/><path d="M19.5 16.8c-1-.7-2.1-1-3.4-1-1.7 0-2.8.7-2.8 1.8 0 2.8 6.5 1.3 6.5 4.8 0 1.5-1.4 2.6-3.7 2.6-1.5 0-2.8-.4-3.8-1.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;
}

function TokopediaLogo() {
  return <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" aria-hidden="true"><path d="M6.2 11.2c.2-3.2 2.7-5.7 5.8-5.7 1.5 0 2.9.6 4 1.6a5.7 5.7 0 0 1 4-1.6c3.1 0 5.6 2.5 5.8 5.7l-1.1 12.4c-.2 2-1.8 3.4-3.7 3.4H11c-1.9 0-3.5-1.4-3.7-3.4L6.2 11.2Z" fill="white"/><circle cx="11.8" cy="13.9" r="3.2" fill="#42B549"/><circle cx="20.2" cy="13.9" r="3.2" fill="#42B549"/><circle cx="11.8" cy="13.9" r="1.2" fill="white"/><circle cx="20.2" cy="13.9" r="1.2" fill="white"/><path d="M13.2 20.2c1.8 1.3 3.8 1.3 5.6 0" stroke="#42B549" strokeWidth="1.7" strokeLinecap="round"/></svg>;
}

function WhatsAppLogo() {
  return <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current" aria-hidden="true"><path d="M16 4.2A11.5 11.5 0 0 0 6.1 21.6L4.5 27.5l6-1.6A11.5 11.5 0 1 0 16 4.2Zm0 20.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.5.9.9-3.4-.2-.4A9.3 9.3 0 1 1 16 25Zm5.1-6.9c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2l-1 1.2c-.2.2-.4.2-.7.1-1.8-.9-3-1.7-4.2-3.8-.3-.5.3-.5.9-1.7.1-.2 0-.4 0-.6l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-1 1-.9 2.4.1 4.3 1.9 3.7 4.7 5.2 7.7 6.1 2.9.8 3.5-1.1 3.7-1.8.1-.3.1-.7-.1-.8-.1 0-.3-.1-.6-.2Z"/></svg>;
}

export default function MarketplaceFloatingButtons({ cartCount = 0, showCart = false }) {
  const [settings, setSettings] = useState({ shopee_url: "", tokopedia_url: "", whatsapp_url: "" });

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
    fetch(`${base}/settings`, { headers: { Accept: "application/json" } })
      .then((response) => response.ok ? response.json() : null)
      .then((payload) => setSettings((old) => ({ ...old, ...(payload?.data || {}) })))
      .catch(() => null);
  }, []);

  const channels = [
    ["Shopee", settings.shopee_url || process.env.NEXT_PUBLIC_SHOPEE_URL || "", "bg-[#EE4D2D]", <ShopeeLogo key="shopee" />],
    ["Tokopedia", settings.tokopedia_url || process.env.NEXT_PUBLIC_TOKOPEDIA_URL || "", "bg-[#42B549]", <TokopediaLogo key="tokopedia" />],
    ["WhatsApp", settings.whatsapp_url || process.env.NEXT_PUBLIC_WHATSAPP_URL || "", "bg-[#25D366]", <WhatsAppLogo key="whatsapp" />],
  ];

  return <aside className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7" aria-label="Pesan melalui marketplace">
    <span className="rounded-full bg-slate-950 px-3 py-1.5 text-xs font-bold text-white shadow-lg">Pesan cepat</span>
    {showCart && <a href="/keranjang" className="relative grid h-12 w-12 place-items-center rounded-full border border-slate-200 bg-white text-xl text-blue-700 shadow-lg transition hover:scale-110" aria-label="Keranjang belanja" title="Keranjang belanja">🛒<span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-black text-white">{cartCount}</span></a>}
    {channels.map(([name, href, color, logo]) => <a key={name} href={href || "#"} target={href ? "_blank" : undefined} rel={href ? "noreferrer" : undefined} onClick={(event) => { if (!href) event.preventDefault(); }} className={`group relative grid h-12 w-12 place-items-center rounded-full text-white shadow-lg transition hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-200 ${color}`} aria-label={`Pesan melalui ${name}`} title={href ? `Pesan melalui ${name}` : `${name} belum diatur`}><span className="grid place-items-center">{logo}</span><span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-lg bg-slate-950 px-3 py-2 text-xs font-bold text-white group-hover:block group-focus:block">Pesan via {name}</span></a>)}
  </aside>;
}
