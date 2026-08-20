"use client";

import { useEffect } from "react";

const MOBILE_QUERY = "(max-width: 600px)";

export default function MobileFocus() {
  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia(MOBILE_QUERY);
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-mobile-focus]"),
    );
    const heroHeading = document.querySelector<HTMLElement>(".hero h1");
    const heroLines = elements.filter(
      (element) => element.classList.contains("heroLead") || element.classList.contains("heroAccent"),
    );
    let frame = 0;
    let touchedElement: HTMLElement | null = null;
    let touchLockUntil = 0;
    let scrollStarted = window.scrollY > 4;
    let alternatePulse = false;
    let heroAnimationPlayed = false;
    let heroWasLeft = false;
    let lastScrollY = window.scrollY;
    let scrollDirection: "up" | "down" = "down";

    const clearFocus = () => {
      elements.forEach((element) => delete element.dataset.mobileFocused);
      delete root.dataset.mobileFocusActive;
      delete root.dataset.cursorTone;
      if (heroHeading) delete heroHeading.dataset.mobilePulse;
      heroAnimationPlayed = false;
      heroWasLeft = false;
    };

    const activate = (element: HTMLElement | null) => {
      elements.forEach((candidate) => {
        if (candidate === element) candidate.dataset.mobileFocused = "true";
        else delete candidate.dataset.mobileFocused;
      });

      if (!element) {
        delete root.dataset.mobileFocusActive;
        delete root.dataset.cursorTone;
        if (heroHeading) delete heroHeading.dataset.mobilePulse;
        return;
      }

      root.dataset.mobileFocusActive = "true";
      root.dataset.cursorTone = element.dataset.focusTone ?? "blue";
      if (
        heroHeading &&
        !heroAnimationPlayed &&
        (element.classList.contains("heroLead") || element.classList.contains("heroAccent"))
      ) {
        alternatePulse = !alternatePulse;
        heroHeading.dataset.mobilePulse = alternatePulse ? "a" : "b";
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

      if (!scrollStarted && !touchedElement) {
        clearFocus();
        return;
      }

      if (touchedElement && performance.now() < touchLockUntil) {
        activate(touchedElement);
        return;
      }

      touchedElement = null;
      const positions = elements.map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          element,
          center: rect.top + rect.height / 2,
          visible: rect.bottom > 72 && rect.top < window.innerHeight - 40,
        };
      });
      const headlineIsVisible = positions.some(
        ({ element, visible }) =>
          visible && (element.classList.contains("heroLead") || element.classList.contains("heroAccent")),
      );
      if (heroAnimationPlayed && !headlineIsVisible) heroWasLeft = true;
      if (heroAnimationPlayed && heroWasLeft && scrollDirection === "up") {
        heroAnimationPlayed = false;
        heroWasLeft = false;
        if (heroHeading) delete heroHeading.dataset.mobilePulse;
      }
      const focusLine = window.innerHeight * (headlineIsVisible ? 0.34 : 0.48);
      const measurements = positions.map((position) => ({
        ...position,
        distance: Math.abs(position.center - focusLine),
      }));
      const nearest = measurements
        .filter(({ visible }) => visible)
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
      if (Math.abs(window.scrollY) > 4) scrollStarted = true;
      requestUpdate();
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!media.matches) return;
      const target = (event.target as Element).closest<HTMLElement>("[data-mobile-focus]");
      if (!target) return;
      touchedElement = target;
      touchLockUntil = performance.now() + 650;
      activate(target);
    };

    const handleHeadlineEnter = (event: PointerEvent) => {
      if (!media.matches || event.pointerType !== "mouse") return;
      activate(event.currentTarget as HTMLElement);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    document.addEventListener("pointerdown", handlePointerDown, { passive: true });
    heroLines.forEach((element) => element.addEventListener("pointerenter", handleHeadlineEnter));
    media.addEventListener("change", requestUpdate);
    requestUpdate();

    return () => {
      cancelAnimationFrame(frame);
      clearFocus();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", requestUpdate);
      document.removeEventListener("pointerdown", handlePointerDown);
      heroLines.forEach((element) => element.removeEventListener("pointerenter", handleHeadlineEnter));
      media.removeEventListener("change", requestUpdate);
    };
  }, []);

  return null;
}
