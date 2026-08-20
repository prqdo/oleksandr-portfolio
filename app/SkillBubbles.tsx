"use client";

import { useEffect, useRef } from "react";

export default function SkillBubbles({ skills, label }: { skills: readonly string[]; label: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const refs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    let frame = 0;

    const updateWheel = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const mobile = window.matchMedia("(max-width: 600px)").matches;

        if (!mobile) {
          refs.current.forEach((element) => {
            element?.classList.remove("isWheelFocused");
            element?.style.removeProperty("--wheel-scale");
            element?.style.removeProperty("--wheel-opacity");
          });
          return;
        }

        const focusLine = window.innerHeight * 0.52;
        const falloff = window.innerHeight * 0.34;
        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;
        const measurements = refs.current.map((element) => {
          if (!element) return null;
          const bounds = element.getBoundingClientRect();
          return Math.abs(bounds.top + bounds.height / 2 - focusLine);
        });

        measurements.forEach((distance, index) => {
          if (distance === null) return;
          const ratio = Math.min(distance / falloff, 1);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }

          const element = refs.current[index];
          element?.style.setProperty("--wheel-scale", (1 - ratio * 0.18).toFixed(3));
          element?.style.setProperty("--wheel-opacity", (1 - ratio * 0.42).toFixed(3));
        });

        refs.current.forEach((element, index) => {
          element?.classList.toggle("isWheelFocused", index === closestIndex);
        });
      });
    };

    updateWheel();
    window.addEventListener("scroll", updateWheel, { passive: true });
    window.addEventListener("resize", updateWheel);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateWheel);
      window.removeEventListener("resize", updateWheel);
    };
  }, []);

  const reactTo = (index: number) => {
    if (!window.matchMedia("(min-width: 601px)").matches) return;
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
    <div className="skillList" ref={containerRef} aria-label={label} role="list" onPointerLeave={settle}>
      {skills.map((skill, index) => (
        <span className="skillBubble" role="listitem" key={index} ref={(element) => { refs.current[index] = element; }} onPointerEnter={() => reactTo(index)}>
          {skill}
        </span>
      ))}
    </div>
  );
}
