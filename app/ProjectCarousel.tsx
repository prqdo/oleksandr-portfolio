"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageContext";

const projectCopy = {
  en: [
    { key: "portfolio", status: "Current project · 2026", title: "Portfolio Website", description: "The website you’re viewing now. I designed and built it to present my background, skills and availability while refreshing my frontend development knowledge.", tags: ["React", "Responsive CSS", "Interaction design"], repoHref: "https://github.com/prqdo/oleksandr-portfolio" },
    { key: "klarlauf", status: "Live project · 2026", title: "Klarlauf", description: "A full-stack order-management tool for small creative teams, with editing, workflow filters and permanent storage in a Cloudflare database.", tags: ["React", "TypeScript", "Cloudflare D1"], repoHref: "https://github.com/prqdo/Klarlauf", liveHref: "https://klarlauf.sehechenko.workers.dev" },
  ],
  de: [
    { key: "portfolio", status: "Aktuelles Projekt · 2026", title: "Portfolio-Website", description: "Die Website, die Sie gerade ansehen. Ich habe sie gestaltet und entwickelt, um meinen Hintergrund, meine Kenntnisse und meine Verfügbarkeit zu präsentieren und gleichzeitig mein Frontend-Wissen aufzufrischen.", tags: ["React", "Responsives CSS", "Interaktionsdesign"], repoHref: "https://github.com/prqdo/oleksandr-portfolio" },
    { key: "klarlauf", status: "Live-Projekt · 2026", title: "Klarlauf", description: "Ein Full-Stack-Auftragsmanagement für kleine Kreativteams – mit Bearbeitung, Workflow-Filtern und dauerhafter Speicherung in einer Cloudflare-Datenbank.", tags: ["React", "TypeScript", "Cloudflare D1"], repoHref: "https://github.com/prqdo/Klarlauf", liveHref: "https://klarlauf.sehechenko.workers.dev" },
  ],
} as const;

export default function ProjectCarousel() {
  const { language } = useLanguage();
  const projects = projectCopy[language];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const didDrag = useRef(false);

  const move = useCallback((direction: number) => {
    setActive((current) => (current + direction + projects.length) % projects.length);
  }, [projects.length]);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => move(1), 8000);
    return () => window.clearTimeout(timer);
  }, [active, move, paused]);

  return (
    <div
      className="projectCarousel"
      role="region"
      aria-roledescription="carousel"
      aria-label={language === "de" ? "Portfolio-Projekte" : "Portfolio projects"}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
      onPointerDown={(event) => {
        if (event.pointerType === "mouse" && event.button !== 0) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        setPaused(true);
        pointerStart.current = event.clientX;
        didDrag.current = false;
        setIsDragging(true);
      }}
      onPointerMove={(event) => {
        if (pointerStart.current === null) return;
        const distance = event.clientX - pointerStart.current;
        if (Math.abs(distance) > 8) didDrag.current = true;
        setDragOffset(distance);
      }}
      onPointerUp={(event) => {
        if (pointerStart.current === null) return;
        const distance = event.clientX - pointerStart.current;
        if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
        pointerStart.current = null;
        setDragOffset(0);
        setIsDragging(false);
        setPaused(event.pointerType === "mouse");
      }}
      onPointerCancel={() => {
        pointerStart.current = null;
        setDragOffset(0);
        setIsDragging(false);
        setPaused(false);
      }}
      onClickCapture={(event) => {
        if (didDrag.current) {
          event.preventDefault();
          event.stopPropagation();
          didDrag.current = false;
        }
      }}
    >
      <div className="carouselViewport">
        <div className={`carouselTrack${isDragging ? " isDragging" : ""}`} style={{ transform: `translateX(calc(-${active * 100}% + ${dragOffset}px))` }}>
          {projects.map((project, index) => (
            <article
              className={`carouselSlide carouselSlide--${project.key}`}
              key={project.key}
              aria-hidden={active !== index}
              aria-label={`${project.title}, ${project.status}`}
            >
              <div className="carouselProjectCopy">
                <p className="projectStatus">{project.status}</p>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <div className="projectTags" aria-label={`${project.title} technologies`}>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <div className="projectLinks">
                  {"liveHref" in project && project.liveHref && <a className="projectLink" href={project.liveHref} target="_blank" rel="noreferrer" tabIndex={active === index ? 0 : -1}>{language === "de" ? "Live ansehen" : "View live"} <span aria-hidden="true">↗</span></a>}
                  <a className="projectLink" href={project.repoHref} target="_blank" rel="noreferrer" tabIndex={active === index ? 0 : -1}>{language === "de" ? "Code auf GitHub" : "View code"} <span aria-hidden="true">↗</span></a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="carouselDots" aria-label="Choose project">
        {projects.map((project, index) => (
          <button key={project.key} type="button" className={active === index ? "isActive" : ""} onClick={() => setActive(index)} aria-label={language === "de" ? `${project.title} anzeigen` : `Show ${project.title}`} aria-current={active === index ? "true" : undefined} />
        ))}
      </div>
    </div>
  );
}
