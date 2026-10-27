"use client";

import React, { useEffect, useState, useRef } from "react";
import themesData from "../../assets/bobine-themes.json";
import type { PortalStrings } from "@/content/portal-content";

interface HeaderProps {
  strings: PortalStrings;
  langLinks: [string, string];
}

interface ThemeMeta {
  label: string;
  bg: string;
  accent: string;
  isDark: boolean;
  desc: string;
}

const themeMeta = themesData.themeMeta as Record<string, ThemeMeta>;
const lightThemes = themesData.lightThemes;
const darkThemes = themesData.darkThemes;
const allThemes = [...lightThemes, ...darkThemes];

export default function Header({ strings, langLinks }: HeaderProps) {
  const isFr = strings.lang === "fr";
  const [activeTheme, setActiveTheme] = useState("lavande");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);

  const pickerRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Initial theme detection from cookie or localStorage
    try {
      const match = document.cookie.match(/(?:^|; )bobine-theme=([\w-]+)/);
      const stored = (match && match[1]) || localStorage.getItem("bobineweb-theme") || "lavande";
      if (allThemes.includes(stored)) {
        setActiveTheme(stored);
        document.documentElement.setAttribute("data-theme", stored);
      }
    } catch {
      // ignore
    }
  }, []);

  const applyTheme = (theme: string) => {
    if (!allThemes.includes(theme)) return;
    setActiveTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("bobineweb-theme", theme);
      document.cookie = `bobine-theme=${theme};path=/;max-age=31536000;SameSite=Lax`;
    } catch {
      // ignore
    }
  };

  const handleCycleTheme = () => {
    const currentIndex = allThemes.indexOf(activeTheme);
    const nextTheme = allThemes[(currentIndex + 1) % allThemes.length];
    applyTheme(nextTheme);
  };

  const openPalette = () => {
    const currentMeta = themeMeta[activeTheme];
    setActiveGroup(currentMeta?.isDark ? "dark" : "light");
    setPaletteOpen(true);
  };

  const closePalette = (focusToggle = true) => {
    setPaletteOpen(false);
    if (focusToggle && toggleBtnRef.current) {
      toggleBtnRef.current.focus();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!paletteOpen) return;
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopImmediatePropagation();
        closePalette(true);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        closePalette(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [paletteOpen]);

  const activeLabel = themeMeta[activeTheme]?.label || "Lavande";

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a href={strings.site} className="brand" aria-label="Bobine">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo_bobine_entier.png" alt="Bobine" width={112} height={28} />
          <span>{strings.brandNote}</span>
        </a>

        <button
          type="button"
          className="menu-btn"
          id="menuBtn"
          aria-expanded={menuOpen}
          aria-controls="siteNav"
          aria-label={strings.menu}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="icon-mask" style={{ "--src": "url(/icons/ui/menu.svg)" } as React.CSSProperties} aria-hidden="true" />
        </button>

        <nav
          className={`header-nav ${menuOpen ? "is-open" : ""}`}
          id="siteNav"
          aria-label={strings.navLabel}
        >
          {strings.nav.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
          <a href="/bobine.gpg" download>
            {strings.keyFile}
          </a>
          <a className="btn" href={strings.cta[0]}>
            {strings.cta[1]}
          </a>

          <div className="header-controls">
            <nav className="locale-switcher" aria-label="Langue / Language">
              <a
                className={`locale-switcher__link${strings.lang === "en" ? " is-active" : ""}`}
                href={langLinks[0]}
                aria-current={strings.lang === "en" ? "true" : undefined}
              >
                EN
              </a>
              <a
                className={`locale-switcher__link${isFr ? " is-active" : ""}`}
                href={langLinks[1]}
                aria-current={isFr ? "true" : undefined}
              >
                FR
              </a>
            </nav>

            <div className="theme-switcher-wrapper" id="themePicker" ref={pickerRef}>
              <div className="theme-switcher-pill-group">
                <button
                  type="button"
                  className="theme-switcher-btn"
                  id="themeCycle"
                  aria-label={`${isFr ? "Thème actif : " : "Current theme: "}${activeLabel}${isFr ? ". Thème suivant" : ". Next theme"}`}
                  onClick={handleCycleTheme}
                >
                  <span className="theme-swatch-icon" data-theme={activeTheme} aria-hidden="true" />
                  <span className="theme-switcher-btn__label">{activeLabel}</span>
                </button>
                <button
                  type="button"
                  className="theme-switcher-arrow-btn"
                  id="themeToggle"
                  ref={toggleBtnRef}
                  aria-label={isFr ? "Ouvrir les 16 thèmes" : "Open all 16 themes"}
                  aria-expanded={paletteOpen}
                  aria-haspopup="dialog"
                  aria-controls="themePalette"
                  onClick={() => (paletteOpen ? closePalette(false) : openPalette())}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className={`chevron-flip ${paletteOpen ? "is-open" : ""}`}
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </div>

              <div
                className="theme-dropdown-modal"
                id="themePalette"
                role="dialog"
                aria-label={isFr ? "Palette des thèmes" : "Theme palette"}
                hidden={!paletteOpen}
              >
                <div className="theme-segmented-control" role="tablist" aria-label={strings.themeLabel}>
                  <button
                    type="button"
                    role="tab"
                    className={`theme-segment-btn ${activeGroup === "light" ? "is-active" : ""}`}
                    data-theme-group="light"
                    aria-selected={activeGroup === "light"}
                    onClick={() => setActiveGroup("light")}
                  >
                    {isFr ? "Thèmes Clairs" : "Light themes"}
                    <span className="theme-segment-count">{lightThemes.length}</span>
                  </button>
                  <button
                    type="button"
                    role="tab"
                    className={`theme-segment-btn ${activeGroup === "dark" ? "is-active" : ""}`}
                    data-theme-group="dark"
                    aria-selected={activeGroup === "dark"}
                    onClick={() => setActiveGroup("dark")}
                  >
                    {isFr ? "Thèmes Sombres" : "Dark themes"}
                    <span className="theme-segment-count">{darkThemes.length}</span>
                  </button>
                </div>

                <div className="theme-grid" role="listbox" aria-label={strings.themeLabel}>
                  {allThemes.map((id) => {
                    const m = themeMeta[id];
                    const isVisible = (activeGroup === "dark") === m.isDark;
                    return (
                      <button
                        key={id}
                        type="button"
                        role="option"
                        className="theme-card-option"
                        data-theme-value={id}
                        data-dark={String(m.isDark)}
                        data-label={m.label}
                        aria-selected={activeTheme === id}
                        hidden={!isVisible}
                        onClick={() => {
                          applyTheme(id);
                          closePalette(true);
                        }}
                      >
                        <span className="theme-card-option__swatch-wrapper">
                          <span className="theme-card-option__swatch" />
                        </span>
                        <span className="theme-card-option__info">
                          <span className="theme-card-option__name">{m.label}</span>
                          <span className="theme-card-option__desc">{m.desc}</span>
                        </span>
                        <span className="theme-card-option__check" aria-hidden="true">
                          ✓
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
