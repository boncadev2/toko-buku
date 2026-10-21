"use client";

import { useEffect } from "react";

export default function DynamicFavicon() {
  useEffect(() => {
    function setFavicon(url) {
      if (!url) return;
      try {
        let iconLink = document.querySelector("link[rel*='icon']");
        if (!iconLink) {
          iconLink = document.createElement("link");
          iconLink.rel = "shortcut icon";
          document.head.appendChild(iconLink);
        }
        iconLink.href = url;

        let appleLink = document.querySelector("link[rel='apple-touch-icon']");
        if (appleLink) {
          appleLink.href = url;
        }
      } catch {}
    }

    try {
      const stored = JSON.parse(localStorage.getItem("app_settings") || "{}");
      if (stored?.app_logo) {
        setFavicon(stored.app_logo);
      }
    } catch {}

    const onStorage = () => {
      try {
        const fresh = JSON.parse(localStorage.getItem("app_settings") || "{}");
        if (fresh?.app_logo) {
          setFavicon(fresh.app_logo);
        }
      } catch {}
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return null;
}
