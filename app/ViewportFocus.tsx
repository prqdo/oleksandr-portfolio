"use client";

import { useEffect } from "react";

const FOCUS_QUERY = "(max-width: 1100px), (hover: none), (pointer: coarse)";

export default function ViewportFocus() {
  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia(FOCUS_QUERY);
    const portraitPhone = window.matchMedia("(max-width: 600px) and (orientation: portrait)");
    const landscapePhone = window.matchMedia(
      "(max-height: 600px) and (orientation: landscape) and (pointer: coarse)",
    );
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-viewport-focus]"),
    );
    const heroHeading = document.querySelector<HTMLElement>(".hero h1");
    let frame = 0;
    let alternatePulse = false;
    let heroAnimationPlayed = false;
    let heroWasLeft = false;
    let lastScrollY = window.scrollY;
    let scrollDirection: "up" | "down" = "down";

    const clearFocus = () => {
      elements.forEach((element) => delete element.dataset.viewportFocused);
      delete root.dataset.viewportFocusActive;
      delete root.dataset.cursorTone;
      if (heroHeading) delete heroHeading.dataset.focusPulse;
      heroAnimationPlayed = false;
      heroWasLeft = false;
    };

    const activate = (element: HTMLElement | null) => {
      elements.forEach((candidate) => {
        if (candidate === element) candidate.dataset.viewportFocused = "true";
        else delete candidate.dataset.viewportFocused;
      });

      if (!element) {
        delete root.dataset.viewportFocusActive;
        delete root.dataset.cursorTone;
        if (heroHeading) delete heroHeading.dataset.focusPulse;
        return;
      }

      root.dataset.viewportFocusActive = "true";
      root.dataset.cursorTone = element.dataset.focusTone ?? "blue";
      if (
        heroHeading &&
        !heroAnimationPlayed &&
        (element.classList.contains("heroLead") || element.classList.contains("heroAccent"))
      ) {
        alternatePulse = !alternatePulse;
        heroHeading.dataset.focusPulse = alternatePulse ? "a" : "b";
        heroAnimationPlayed = true;
        heroWasLeft = false;
      }
    };

    const updateFocus = () => {
      frame = 0;
      if (!media.matches) {
        clearFocus();
        return;
      }

      const positions = elements.map((element) => {
        const rect = element.getBoundingClientRect();
        const portraitOnly =
          element.parentElement?.classList.contains("heroMeta") ||
          element.parentElement?.classList.contains("detailGrid");
        const focusAllowed = !portraitOnly || portraitPhone.matches;
        return {
          element,
          center: rect.top + rect.height / 2,
          visible: focusAllowed && rect.bottom > 72 && rect.top < window.innerHeight - 40,
        };
      });
      const headlineIsVisible = positions.some(
        ({ element, visible }) =>
          visible && (element.classList.contains("heroLead") || element.classList.contains("heroAccent")),
      );
      if (window.scrollY <= Math.min(72, window.innerHeight * 0.1)) {
        const lead = positions.find(
          ({ element, visible }) => visible && element.classList.contains("heroLead"),
        );
        if (lead) {
          activate(lead.element);
          return;
        }
      }
      if (heroAnimationPlayed && !headlineIsVisible) heroWasLeft = true;
      if (heroAnimationPlayed && heroWasLeft && scrollDirection === "up") {
        heroAnimationPlayed = false;
        heroWasLeft = false;
        if (heroHeading) delete heroHeading.dataset.focusPulse;
      }

      const landscape = window.innerWidth > window.innerHeight;
      const focusLine = window.innerHeight * (headlineIsVisible ? (landscape ? 0.5 : 0.34) : 0.48);
      const nearest = positions
        .filter(({ visible }) => visible)
        .map((position) => ({ ...position, distance: Math.abs(position.center - focusLine) }))
        .sort((a, b) => a.distance - b.distance)[0];

      activate(nearest && nearest.distance < window.innerHeight * 0.42 ? nearest.element : null);
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateFocus);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY - 1) scrollDirection = "up";
      else if (currentScrollY > lastScrollY + 1) scrollDirection = "down";
      lastScrollY = currentScrollY;
      requestUpdate();
    };

    const handleLandscapeCardTap = (event: Event) => {
      if (!landscapePhone.matches) return;

      const target = event.currentTarget as HTMLElement;
      activate(target.dataset.viewportFocused === "true" ? null : target);
    };

    const detailCards = elements.filter((element) =>
      element.parentElement?.classList.contains("detailGrid"),
    );
    detailCards.forEach((card) => card.addEventListener("click", handleLandscapeCardTap));

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    media.addEventListener("change", requestUpdate);
    portraitPhone.addEventListener("change", requestUpdate);
    landscapePhone.addEventListener("change", requestUpdate);
    requestUpdate();

    return () => {
      cancelAnimationFrame(frame);
      clearFocus();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", requestUpdate);
      media.removeEventListener("change", requestUpdate);
      portraitPhone.removeEventListener("change", requestUpdate);
      landscapePhone.removeEventListener("change", requestUpdate);
      detailCards.forEach((card) => card.removeEventListener("click", handleLandscapeCardTap));
    };
  }, []);

  return null;
}
