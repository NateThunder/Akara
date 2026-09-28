"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function StoryMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const main = root.current;
    if (!main) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stop = () => {};

    const setup = () => {
      stop();
      if (preference.matches) return;
      const photos = Array.from(main.querySelectorAll<HTMLElement>(".story-photo"));
      const copy = Array.from(main.querySelectorAll<HTMLElement>(
        ".story-panel-copy > *, .story-welcome-copy > *, .story-visit-details > div",
      ));
      let frame = 0;
      const update = () => {
        frame = 0;
        const viewport = window.innerHeight;
        photos.forEach((photo) => {
          const rect = photo.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top > viewport) return;
          const progress = Math.max(-1, Math.min(1,
            (viewport / 2 - (rect.top + rect.height / 2)) / ((viewport + rect.height) / 2),
          ));
          const isHero = photo.classList.contains("story-hero-photo");
          const isPortrait = photo.classList.contains("story-founder-photo");
          photo.style.setProperty("--story-drift", `${progress * rect.height * (isHero ? 0.2 : isPortrait ? 0.02 : 0.075)}px`);
          if (isHero) {
            photo.style.setProperty("--story-wordmark-drift", `${-Math.max(0, progress) * rect.height * 0.12}px`);
          }
        });
      };
      const schedule = () => {
        if (!frame) frame = window.requestAnimationFrame(update);
      };
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("story-revealed");
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.12 });

      main.dataset.motion = "enabled";
      copy.forEach((element) => observer.observe(element));
      update();
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      stop = () => {
        observer.disconnect();
        window.cancelAnimationFrame(frame);
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        delete main.dataset.motion;
        photos.forEach((photo) => {
          photo.style.removeProperty("--story-drift");
          photo.style.removeProperty("--story-wordmark-drift");
        });
        copy.forEach((element) => element.classList.remove("story-revealed"));
      };
    };
    setup();
    preference.addEventListener("change", setup);
    return () => {
      stop();
      preference.removeEventListener("change", setup);
    };
  }, []);

  return <main ref={root} className="akara-story">{children}</main>;
}
