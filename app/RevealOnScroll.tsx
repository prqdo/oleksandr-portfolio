"use client";

import { useEffect } from "react";

export default function RevealOnScroll() {
  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const skillList = document.querySelector<HTMLElement>(".skillList");
    let previousScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      root.dataset.scrollDirection = currentScrollY < previousScrollY ? "up" : "down";
      previousScrollY = currentScrollY;
    };

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.dataset.revealed = "true";
      });
      if (skillList) skillList.dataset.skillsActive = "true";
      return;
    }

    root.dataset.revealReady = "true";
    root.dataset.scrollDirection = "down";
    window.addEventListener("scroll", updateScrollDirection, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            element.dataset.revealed = "true";
          } else {
            delete element.dataset.revealed;
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((element) => observer.observe(element));

    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            element.dataset.skillsActive = "true";
          } else {
            delete element.dataset.skillsActive;
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -10% 0px" },
    );

    if (skillList) skillObserver.observe(skillList);

    return () => {
      observer.disconnect();
      skillObserver.disconnect();
      window.removeEventListener("scroll", updateScrollDirection);
      delete root.dataset.revealReady;
      delete root.dataset.scrollDirection;
    };
  }, []);

  return null;
}
