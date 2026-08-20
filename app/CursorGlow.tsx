"use client";

import { useEffect } from "react";

export default function CursorGlow() {
  useEffect(() => {
    const root = document.documentElement;
    const hero = document.querySelector<HTMLElement>("#top");
    const heroLead = document.querySelector<HTMLElement>(".heroLead");
    const heroAccent = document.querySelector<HTMLElement>(".heroAccent");
    let frame = 0;

    const updateGlow = (clientX: number, clientY: number) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty("--cursor-x", `${clientX}px`);
        root.style.setProperty("--cursor-y", `${clientY}px`);
        root.style.setProperty("--cursor-opacity", "1");
      });
    };
    const moveGlow = (event: PointerEvent) => updateGlow(event.clientX, event.clientY);
    const moveTouchGlow = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) updateGlow(touch.clientX, touch.clientY);
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

    window.addEventListener("pointerdown", moveGlow, { passive: true });
    window.addEventListener("pointermove", moveGlow, { passive: true });
    window.addEventListener("touchstart", moveTouchGlow, { passive: true });
    window.addEventListener("touchmove", moveTouchGlow, { passive: true });
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
      window.removeEventListener("pointerdown", moveGlow);
      window.removeEventListener("pointermove", moveGlow);
      window.removeEventListener("touchstart", moveTouchGlow);
      window.removeEventListener("touchmove", moveTouchGlow);
      document.documentElement.removeEventListener("pointerleave", hideGlow);
      heroLead?.removeEventListener("pointerenter", setBlueGlow);
      heroLead?.removeEventListener("pointerleave", resetGlowTone);
      heroAccent?.removeEventListener("pointerenter", setPurpleGlow);
      heroAccent?.removeEventListener("pointerleave", resetGlowTone);
    };
  }, []);

  return <div className="cursorGlow" aria-hidden="true" />;
}
