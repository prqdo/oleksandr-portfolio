"use client";

import { useEffect } from "react";

export default function CursorGlow() {
  useEffect(() => {
    const root = document.documentElement;
    const hero = document.querySelector<HTMLElement>("#top");
    const heroLead = document.querySelector<HTMLElement>(".heroLead");
    const heroAccent = document.querySelector<HTMLElement>(".heroAccent");
    let frame = 0;

    const moveGlow = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty("--cursor-x", `${event.clientX}px`);
        root.style.setProperty("--cursor-y", `${event.clientY}px`);
        root.style.setProperty("--cursor-opacity", "1");
      });
    };

    const setBlueGlow = () => {
      root.dataset.cursorTone = "blue";
    };
    const setPurpleGlow = () => {
      root.dataset.cursorTone = "purple";
    };
    const resetGlowTone = () => {
      delete root.dataset.cursorTone;
    };
    const hideGlow = () => {
      root.style.setProperty("--cursor-opacity", "0");
      resetGlowTone();
    };

    window.addEventListener("pointermove", moveGlow, { passive: true });
    document.documentElement.addEventListener("pointerleave", hideGlow);
    heroLead?.addEventListener("pointerenter", setBlueGlow);
    heroLead?.addEventListener("pointerleave", resetGlowTone);
    heroAccent?.addEventListener("pointerenter", setPurpleGlow);
    heroAccent?.addEventListener("pointerleave", resetGlowTone);

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        root.dataset.heroActive = entry.isIntersecting ? "true" : "false";
      },
      { threshold: 0.35 },
    );

    if (hero) {
      heroObserver.observe(hero);
    }

    return () => {
      cancelAnimationFrame(frame);
      heroObserver.disconnect();
      delete root.dataset.heroActive;
      delete root.dataset.cursorTone;
      window.removeEventListener("pointermove", moveGlow);
      document.documentElement.removeEventListener("pointerleave", hideGlow);
      heroLead?.removeEventListener("pointerenter", setBlueGlow);
      heroLead?.removeEventListener("pointerleave", resetGlowTone);
      heroAccent?.removeEventListener("pointerenter", setPurpleGlow);
      heroAccent?.removeEventListener("pointerleave", resetGlowTone);
    };
  }, []);

  return <div className="cursorGlow" aria-hidden="true" />;
}
