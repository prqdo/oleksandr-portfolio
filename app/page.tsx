"use client";

import CursorGlow from "./CursorGlow";
import LanguageToggle from "./LanguageToggle";
import MobileNav from "./MobileNav";
import ProjectCarousel from "./ProjectCarousel";
import RevealOnScroll from "./RevealOnScroll";
import SkillBubbles from "./SkillBubbles";
import { useLanguage } from "./LanguageContext";

const copy = {
  en: {
    nav: ["About", "Work", "Contact"], navLabel: "Main navigation", homeLabel: "Oleksandr Sehechenko, home",
    availabilityLabel: "Contact me about an IT MAG in Flensburg", availability: "Available for an IT MAG in Flensburg",
    eyebrow: ["Computer engineering", "Web development", "Web design"], eyebrowMobile: ["Engineering", "Web development", "Design"],
    heroLead: "Looks good", heroAccent: "Works better",
    intro: "Web developer with a Ukrainian state-recognized qualification in Computer Engineering and a focus on Computer Graphics and Web Design.",
    viewWork: "View my work", github: "GitHub profile", keyFacts: "Key facts", ects: "ECTS completed",
    qualificationLevel: "qualification level", germanResult: "German exam · result pending", aboutLabel: "01 / About",
    aboutTitle: "Technical foundations with a designer’s eye.",
    aboutText: "My training covered programming, databases, operating systems, networks, software engineering and information security alongside visual design and web development. I work fluently in English. I have completed my German B1 examination and am awaiting the result while attending a three-week “Leben in Deutschland” course.",
    qualification: "Qualification", qualificationName: "Junior Specialist in Computer Engineering",
    qualificationDetail: "Computer Graphics & Web Design · Ukraine · 2022", languages: "Languages",
    ukrainian: "Ukrainian · native", russian: "Russian · fluent", english: "English · fluent",
    german: "German · B1 exam completed, result pending", skillsLabel: "Technical skills",
    skills: ["HTML & CSS", "JavaScript", "Bootstrap", "PHP & SQL", "Node.js & npm", "React · refreshing", "Git & GitHub", "Figma & Photoshop"],
    projectsLabel: "02 / Projects", contactLabel: "03 / Contact", contactTitle: "Looking for a motivated web developer?",
    contactText: "I’m currently available for a Jobcenter-supported, two-week IT work placement in the Flensburg area, with the goal of moving into employment or an Ausbildung.",
  },
  de: {
    nav: ["Über mich", "Projekte", "Kontakt"], navLabel: "Hauptnavigation", homeLabel: "Oleksandr Sehechenko, Startseite",
    availabilityLabel: "Kontaktieren Sie mich wegen eines IT-MAG in Flensburg", availability: "Verfügbar für ein IT-MAG in Flensburg",
    eyebrow: ["Computertechnik", "Webentwicklung", "Webdesign"], eyebrowMobile: ["Technik", "Webentwicklung", "Design"],
    heroLead: "Sieht gut aus", heroAccent: "Läuft besser",
    intro: "Webentwickler mit einem staatlich anerkannten ukrainischen Abschluss in Computer Engineering und dem Schwerpunkt Computergrafik und Webdesign.",
    viewWork: "Projekte ansehen", github: "GitHub-Profil", keyFacts: "Wichtige Fakten", ects: "ECTS abgeschlossen",
    qualificationLevel: "Qualifikationsniveau", germanResult: "Deutschprüfung · Ergebnis ausstehend", aboutLabel: "01 / Über mich",
    aboutTitle: "Technische Grundlagen mit einem Auge für Design.",
    aboutText: "Meine Ausbildung umfasste Programmierung, Datenbanken, Betriebssysteme, Netzwerke, Softwareentwicklung und Informationssicherheit sowie visuelles Design und Webentwicklung. Ich spreche fließend Englisch. Die Deutschprüfung auf B1-Niveau habe ich abgeschlossen und warte derzeit auf das Ergebnis. Gleichzeitig besuche ich einen dreiwöchigen Kurs „Leben in Deutschland“.",
    qualification: "Qualifikation", qualificationName: "Junior Specialist in Computer Engineering",
    qualificationDetail: "Computergrafik & Webdesign · Ukraine · 2022", languages: "Sprachen",
    ukrainian: "Ukrainisch · Muttersprache", russian: "Russisch · fließend", english: "Englisch · fließend",
    german: "Deutsch · B1-Prüfung abgeschlossen, Ergebnis ausstehend", skillsLabel: "Technische Kenntnisse",
    skills: ["HTML & CSS", "JavaScript", "Bootstrap", "PHP & SQL", "Node.js & npm", "React · Auffrischung", "Git & GitHub", "Figma & Photoshop"],
    projectsLabel: "02 / Projekte", contactLabel: "03 / Kontakt", contactTitle: "Suchen Sie einen motivierten Webentwickler?",
    contactText: "Ich bin derzeit für ein vom Jobcenter unterstütztes, zweiwöchiges IT-Praktikum im Raum Flensburg verfügbar – mit dem Ziel, anschließend in eine Beschäftigung oder Ausbildung überzugehen.",
  },
} as const;

export default function Home() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <main>
      <CursorGlow /><RevealOnScroll />
      <nav className="nav" aria-label={t.navLabel}>
        <a className="brand" href="#top" aria-label={t.homeLabel}>OS<span>.</span></a>
        <div className="navDesktopMenu"><div className="navLinks"><a href="#about">{t.nav[0]}</a><a href="#work">{t.nav[1]}</a><a href="#contact">{t.nav[2]}</a></div><LanguageToggle /></div>
        <MobileNav />
      </nav>
      <section className="hero" id="top">
        <a className="availability" href="#contact" aria-label={t.availabilityLabel}><span className="availabilityDot" aria-hidden="true" /><span className="availabilityDesktop">{t.availability}</span><span className="availabilityMobile">IT MAG · Flensburg</span></a>
        <p className="eyebrow"><span className="eyebrowDesktop"><span className="eyebrowItem">{t.eyebrow[0]}</span><span className="eyebrowDot" aria-hidden="true">·</span><span className="eyebrowItem">{t.eyebrow[1]}</span><span className="eyebrowDot" aria-hidden="true">·</span><span className="eyebrowItem">{t.eyebrow[2]}</span></span><span className="eyebrowMobile"><span className="eyebrowItem">{t.eyebrowMobile[0]}</span><span className="eyebrowDot" aria-hidden="true">·</span><span className="eyebrowItem">{t.eyebrowMobile[1]}</span><span className="eyebrowDot" aria-hidden="true">·</span><span className="eyebrowItem">{t.eyebrowMobile[2]}</span></span></p>
        <h1><span className="heroLead"><span className="heroTextFlicker heroTextFlickerLead">{t.heroLead}</span></span><span className="heroAccent"><span className="heroTextFlicker heroTextFlickerAccent">{t.heroAccent}</span></span></h1>
        <p className="intro">{t.intro}</p>
        <div className="heroActions"><a className="primaryButton" href="#work">{t.viewWork}</a><a className="textLink" href="https://github.com/prqdo" target="_blank" rel="noreferrer">{t.github} <span aria-hidden="true">↗</span></a></div>
        <div className="heroMeta" aria-label={t.keyFacts} data-reveal="up"><div><strong>180</strong><span>{t.ects}</span></div><div><strong>EQF 5</strong><span>{t.qualificationLevel}</span></div><div><strong>B1</strong><span>{t.germanResult}</span></div></div>
      </section>
      <section className="about section" id="about" data-reveal="up">
        <p className="sectionNumber">{t.aboutLabel}</p>
        <div><h2>{t.aboutTitle}</h2><p>{t.aboutText}</p><div className="detailGrid"><div data-reveal="left"><strong>{t.qualification}</strong><span>{t.qualificationName}</span><small>{t.qualificationDetail}</small></div><div data-reveal="right"><strong>{t.languages}</strong><span>{t.ukrainian}</span><span>{t.russian}</span><span>{t.english}</span><small>{t.german}</small></div></div><div className="skillBlock" data-reveal="up"><SkillBubbles skills={t.skills} label={t.skillsLabel} /></div></div>
      </section>
      <section className="work section" id="work" data-reveal="up"><p className="sectionNumber">{t.projectsLabel}</p><ProjectCarousel /></section>
      <section className="contact section" id="contact" data-reveal="up"><p className="sectionNumber">{t.contactLabel}</p><div><h2>{t.contactTitle}</h2><p>{t.contactText}</p><div className="contactLinks"><a href="mailto:fusiiion@protonmail.com">fusiiion@protonmail.com</a><a href="tel:+491604274683">+49 160 427 4683</a><a href="https://github.com/prqdo" target="_blank" rel="noreferrer">github.com/prqdo <span aria-hidden="true">↗</span></a></div></div></section>
      <footer><span>Oleksandr Sehechenko</span><span>Flensburg · 2026</span></footer>
    </main>
  );
}
