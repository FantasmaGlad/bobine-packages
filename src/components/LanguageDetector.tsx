"use client";

import { useEffect } from "react";

export default function LanguageDetector({ currentLang }: { currentLang: "en" | "fr" }) {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const langParam = params.get("lang") || params.get("locale");
      if (langParam === "fr" && currentLang !== "fr") {
        window.location.replace("/fr/");
        return;
      }
      if (langParam === "en" && currentLang !== "en") {
        window.location.replace("/");
        return;
      }
      if (currentLang === "en" && !langParam) {
        const browserLang = navigator.language || "";
        if (browserLang.toLowerCase().startsWith("fr")) {
          const pref = localStorage.getItem("bobine-lang");
          if (pref === "en") return;
          window.location.replace("/fr/");
        }
      }
    } catch {
      // ignore
    }
  }, [currentLang]);

  return null;
}
