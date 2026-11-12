"use client";

import CursorGlow from "./CursorGlow";
import LanguageToggle from "./LanguageToggle";
import ViewportFocus from "./ViewportFocus";
import MobileNav from "./MobileNav";
import ProjectCarousel from "./ProjectCarousel";
import RevealOnScroll from "./RevealOnScroll";
import SkillBubbles from "./SkillBubbles";
import { useLanguage } from "./LanguageContext";

const copy = {
  en: {
    nav: ["About", "Work", "Contact"], navLabel: "Main navigation", homeLabel: "Oleksandr Sehechenko, home",
    heroLead: "Looks good", heroAccent: "Works better",
    intro: "Web developer with a Ukrainian state-recognized qualification in Computer Engineering and a focus on Computer Graphics and Web Design.",
    viewWork: "View my work", github: "GitHub profile", keyFacts: "Key facts", ects: "ECTS completed",
    qualificationLevel: "qualification level", germanProficiency: "German proficiency", aboutLabel: "01 / About",
    aboutTitle: "Technical foundations with a designer’s eye.",
    aboutText: "My training covered programming, databases, operating systems, networks, software engineering and information security alongside visual design and web development. I work fluently in English and have German skills at B1 level. During my recent placement at büro oeding in Flensburg, I created and presented a visual café concept with logo designs and mockups.",
    qualification: "Qualification", qualificationName: "Junior Specialist in Computer Engineering",
    qualificationDetail: "Computer Graphics & Web Design · Ukraine · 2022", languages: "Languages",
    ukrainian: "Ukrainian · native", russian: "Russian · fluent", english: "English · fluent",
    german: "German · B1", skillsLabel: "Technical skills",
    skills: ["HTML & CSS", "JavaScript", "Bootstrap", "PHP & SQL", "Node.js & npm", "React", "Git & GitHub", "Figma & Adobe CC"],
    projectsLabel: "02 / Projects", contactLabel: "03 / Contact", contactTitle: "Looking for a motivated web developer?",
    contactText: "I’m actively seeking a junior position in web development, web design or digital media in the Flensburg area. I combine practical design experience with frontend and backend development.",
  },
  de: {
    nav: ["Über mich", "Projekte", "Kontakt"], navLabel: "Hauptnavigation", homeLabel: "Oleksandr Sehechenko, Startseite",
    heroLead: "Sieht gut aus", heroAccent: "Läuft besser",
    intro: "Webentwickler mit einem staatlich anerkannten ukrainischen Abschluss in Computer Engineering und dem Schwerpunkt Computergrafik und Webdesign.",
    viewWork: "Projekte ansehen", github: "GitHub-Profil", keyFacts: "Wichtige Fakten", ects: "ECTS abgeschlossen",
    qualificationLevel: "Qualifikationsniveau", germanProficiency: "Deutschkenntnisse", aboutLabel: "01 / Über mich",
    aboutTitle: "Technische Grundlagen mit einem Auge für Design.",
    aboutText: "Meine Ausbildung umfasste Programmierung, Datenbanken, Betriebssysteme, Netzwerke, Softwareentwicklung und Informationssicherheit sowie visuelles Design und Webentwicklung. Ich spreche fließend Englisch und verfüge über Deutschkenntnisse auf B1-Niveau. Während meines Praktikums bei büro oeding in Flensburg habe ich ein visuelles Cafékonzept mit Logo und Mockups entwickelt und präsentiert.",
    qualification: "Qualifikation", qualificationName: "Junior Specialist in Computer Engineering",
    qualificationDetail: "Computergrafik & Webdesign · Ukraine · 2022", languages: "Sprachen",
    ukrainian: "Ukrainisch · Muttersprache", russian: "Russisch · fließend", english: "Englisch · fließend",
    german: "Deutsch · B1", skillsLabel: "Technische Kenntnisse",
    skills: ["HTML & CSS", "JavaScript", "Bootstrap", "PHP & SQL", "Node.js & npm", "React", "Git & GitHub", "Figma & Adobe CC"],
    projectsLabel: "02 / Projekte", contactLabel: "03 / Kontakt", contactTitle: "Suchen Sie einen motivierten Webentwickler?",
    contactText: "Ich suche aktuell eine Junior-Position in der Webentwicklung, im Webdesign oder im Bereich digitale Medien im Raum Flensburg. Dabei verbinde ich praktische Gestaltungserfahrung mit Frontend- und Backend-Entwicklung.",
  },
} as const;

export default function Home() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <main>
      <CursorGlow /><ViewportFocus /><RevealOnScroll />
      <nav className="nav" aria-label={t.navLabel}>
        <a className="brand" href="#top" aria-label={t.homeLabel}>OS<span>.</span></a>
        <div className="navDesktopMenu"><div className="navLinks"><a href="#about">{t.nav[0]}</a><a href="#work">{t.nav[1]}</a><a href="#contact">{t.nav[2]}</a></div><LanguageToggle /></div>
        <MobileNav />
      </nav>
      <section className="hero" id="top">
        <h1><span className="heroLead" data-viewport-focus data-focus-tone="blue"><span className="heroTextFlicker heroTextFlickerLead">{t.heroLead}</span></span><span className="heroAccent" data-viewport-focus data-focus-tone="purple"><span className="heroTextFlicker heroTextFlickerAccent">{t.heroAccent}</span></span></h1>
        <p className="intro">{t.intro}</p>
        <div className="heroActions"><a className="primaryButton" href="#work">{t.viewWork}</a><a className="textLink" href="https://github.com/prqdo" target="_blank" rel="noreferrer">{t.github} <span aria-hidden="true">↗</span></a></div>
        <div className="heroMeta" aria-label={t.keyFacts} data-reveal="up"><div data-viewport-focus data-focus-tone="blue"><strong>180</strong><span>{t.ects}</span></div><div data-viewport-focus data-focus-tone="blue"><strong>EQF 5</strong><span>{t.qualificationLevel}</span></div><div data-viewport-focus data-focus-tone="blue"><strong>B1</strong><span>{t.germanProficiency}</span></div></div>
      </section>
      <section className="about section" id="about" data-reveal="up">
        <p className="sectionNumber">{t.aboutLabel}</p>
        <div><h2 data-viewport-focus data-focus-tone="purple">{t.aboutTitle}</h2><p data-viewport-focus data-focus-tone="blue">{t.aboutText}</p><div className="detailGrid"><div data-reveal="left" data-viewport-focus data-focus-tone="purple"><strong>{t.qualification}</strong><span>{t.qualificationName}</span><small>{t.qualificationDetail}</small></div><div data-reveal="right" data-viewport-focus data-focus-tone="purple"><strong>{t.languages}</strong><span>{t.ukrainian}</span><span>{t.russian}</span><span>{t.english}</span><span>{t.german}</span></div></div><div className="skillBlock" data-reveal="up"><SkillBubbles skills={t.skills} label={t.skillsLabel} /></div></div>
      </section>
      <section className="work section" id="work" data-reveal="up"><p className="sectionNumber">{t.projectsLabel}</p><ProjectCarousel /></section>
      <section className="contact section" id="contact" data-reveal="up"><p className="sectionNumber">{t.contactLabel}</p><div><h2 data-viewport-focus data-focus-tone="purple">{t.contactTitle}</h2><p data-viewport-focus data-focus-tone="blue">{t.contactText}</p><div className="contactLinks"><a href="mailto:fusiiion@protonmail.com">fusiiion@protonmail.com</a><a href="tel:+491604274683">+49 160 427 4683</a><a href="https://github.com/prqdo" target="_blank" rel="noreferrer">github.com/prqdo <span aria-hidden="true">↗</span></a></div></div></section>
      <footer><span>Oleksandr Sehechenko</span><span>Flensburg · 2026</span></footer>
    </main>
  );
}
