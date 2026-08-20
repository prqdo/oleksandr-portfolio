"use client";

import { useRef } from "react";

export default function SkillBubbles({ skills, label }: { skills: readonly string[]; label: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const refs = useRef<Array<HTMLSpanElement | null>>([]);

  const reactTo = (index: number) => {
    if (!window.matchMedia("(min-width: 801px) and (hover: hover)").matches) return;
    const source = refs.current[index];
    if (!source) return;

    const sourceX = source.offsetLeft + source.offsetWidth / 2;
    const sourceY = source.offsetTop + source.offsetHeight / 2;
    containerRef.current?.classList.add("isBubbleActive");

    refs.current.forEach((element, itemIndex) => {
      if (!element) return;
      element.classList.toggle("isHovered", itemIndex === index);
      element.classList.toggle("isReacting", itemIndex !== index);
      if (itemIndex === index) {
        element.style.setProperty("--bubble-x", "0px");
        element.style.setProperty("--bubble-y", "0px");
        return;
      }
      const dx = element.offsetLeft + element.offsetWidth / 2 - sourceX;
      const dy = element.offsetTop + element.offsetHeight / 2 - sourceY;
      const distance = Math.max(Math.hypot(dx, dy), 1);
      const strength = Math.max(3, 17 - distance * 0.028);
      element.style.setProperty("--bubble-x", `${((dx / distance) * strength).toFixed(1)}px`);
      element.style.setProperty("--bubble-y", `${((dy / distance) * strength).toFixed(1)}px`);
    });
  };

  const settle = () => {
    containerRef.current?.classList.remove("isBubbleActive");
    refs.current.forEach((element) => {
      element?.classList.remove("isHovered", "isReacting");
      element?.style.setProperty("--bubble-x", "0px");
      element?.style.setProperty("--bubble-y", "0px");
    });
  };

  return (
    <div className="skillList" ref={containerRef} aria-label={label} onPointerLeave={settle}>
      {skills.map((skill, index) => (
        <span className="skillBubble" key={index} ref={(element) => { refs.current[index] = element; }} onPointerEnter={() => reactTo(index)}>
          {skill}
        </span>
      ))}
    </div>
  );
}
