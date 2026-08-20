"use client";

import { useEffect, useRef, useState } from "react";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "./LanguageContext";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const labels = language === "de" ? ["Über mich", "Projekte", "Kontakt"] : ["About", "Work", "Contact"];
  const links = ["#about", "#work", "#contact"];

  useEffect(() => {
    const root = document.documentElement;
    const updateNav = () => {
      root.dataset.navScrolled = window.scrollY > 140 ? "true" : "false";
    };

    updateNav();
    window.addEventListener("scroll", updateNav, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateNav);
      delete root.dataset.navScrolled;
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const closeOutside = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [open]);

  return (
    <div className="mobileNav" ref={menuRef}>
      <button
        className="mobileNavToggle"
        type="button"
        aria-label={open ? (language === "de" ? "Navigationsmenü schließen" : "Close navigation menu") : (language === "de" ? "Navigationsmenü öffnen" : "Open navigation menu")}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((current) => !current)}
      >
        <span className="mobileNavIcon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>
      {open && (
        <div className="mobileNavPanel" id="mobile-navigation">
          {links.map((href, index) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {labels[index]}
            </a>
          ))}
          <LanguageToggle className="languageToggleMobile" />
        </div>
      )}
    </div>
  );
}
