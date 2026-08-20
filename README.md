# Oleksandr Sehechenko — Portfolio

Personal portfolio of Oleksandr Sehechenko, a web developer in
Flensburg focused on web development and web design.

## About

I hold a Ukrainian Junior Specialist qualification in Computer Engineering,
with a specialization in Computer Graphics and Web Design. This portfolio
presents my skills, background, and current projects while I pursue an IT
Praktikum, Ausbildung, or junior opportunity in Germany.

## Technologies

- React and TypeScript (currently learning)
- HTML and responsive CSS
- vinext and Vite
- Git and GitHub

## Prerequisites

- Node.js `>=22.13.0`

## Quick Start

```bash
npm install
npm run dev
npm run build
```

## Architecture

- `page.tsx` contains the bilingual page content and section structure.
- `LanguageContext` stores the English/German preference in local storage.
- `ProjectCarousel` manages automatic rotation, swipe gestures, pause states,
  keyboard access, and the active project.
- `MobileFocus` maps the element nearest the phone viewport's focus line to the
  same visual language used by desktop hover interactions.
- `CursorGlow` follows pointer and touch coordinates and changes tone with the
  focused content.
- `RevealOnScroll` and `SkillBubbles` use animation frames and intersection
  observers so scrolling does not trigger React renders on every pixel.

The visual effects are progressive enhancement: the content and navigation
remain usable when motion is reduced or JavaScript-driven animation is absent.

## Deployment

The portfolio deploys as a Cloudflare Worker. Its public address is managed
through the `portfolio` Worker configuration in `wrangler.jsonc`.

## Contact

- Email: [fusiiion@protonmail.com](mailto:fusiiion@protonmail.com)
- Phone: [+49 160 427 4683](tel:+491604274683)
- GitHub: [@prqdo](https://github.com/prqdo)
