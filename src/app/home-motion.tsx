"use client";

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

/** One scroll clock for the homepage. All animation styles revert on cleanup. */
export default function HomeMotion() {
  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>(".editorial-home");
    const hero = root?.querySelector<HTMLElement>(".editorial-hero");
    const photo = root?.querySelector<HTMLElement>(".editorial-hero-photo");
    const image = photo?.querySelector("img");
    if (!root || !hero || !photo || !image) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);
    const media = gsap.matchMedia();
    let disposed = false;
    media.add({
      all: "all",
      desktop: "(min-width: 1024px)",
      finePointer: "(hover: hover) and (pointer: fine)",
      reduced: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      const { desktop, finePointer, reduced } = context.conditions!;
      if (reduced) return;
      root.setAttribute("data-scroll-motion", "");

      let lenis: Lenis | undefined;
      let tick: ((time: number) => void) | undefined;
      let syncAnchor: (() => void) | undefined;
      if (desktop && finePointer) {
        lenis = new Lenis({
          autoRaf: false,
          lerp: 0.16,
          smoothWheel: true,
          syncTouch: false,
          // Keep normal URLs, hash history, keyboard focus and native anchor jumps.
          anchors: false,
          stopInertiaOnNavigate: true,
          prevent: (node) => node.matches("dialog, [data-lenis-prevent], textarea, select"),
          virtualScroll: () => !document.querySelector("dialog[open]"),
        });
        lenis.on("scroll", ScrollTrigger.update);
        tick = (time) => lenis?.raf(time * 1000);
        gsap.ticker.add(tick);
        syncAnchor = () => lenis?.scrollTo(window.scrollY, { immediate: true });
        window.addEventListener("hashchange", syncAnchor);
      }

      const heroTimeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          id: "home-hero",
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      heroTimeline.fromTo(image, { scale: 1 }, { scale: desktop ? 1.2 : 1.14 }, 0);
      heroTimeline.fromTo(photo, { y: 0 }, {
        y: () => hero.offsetHeight * (desktop ? 0.34 : 0.2),
      }, 0);
      heroTimeline.fromTo(root.querySelector(".editorial-hero-copy"), { y: 0 }, {
        y: () => -hero.offsetHeight * (desktop ? 0.1 : 0.06),
      }, 0);

      const intro = root.querySelector<HTMLElement>(".editorial-intro");
      const heading = intro?.querySelector("h2");
      let headingSplit: SplitText | undefined;
      if (intro && heading) {
        headingSplit = SplitText.create(heading, {
          type: "lines", mask: "lines", autoSplit: true,
          linesClass: "intro-reveal-line",
          onSplit: (split) => gsap.from(split.lines, {
            yPercent: 101, rotation: 12, transformOrigin: "left center",
            duration: 1.2, delay: 0.15, stagger: { amount: 0.3 }, ease: "expo.out",
            scrollTrigger: {
              id: "home-intro-heading", trigger: intro, start: "top 85%",
              once: true,
            },
          }),
        });
        gsap.from(intro.querySelector("p"), {
          y: 20, opacity: 0, duration: 0.9, delay: 0.3, ease: "power2.out",
          scrollTrigger: { id: "home-intro-copy", trigger: intro, start: "top 85%", once: true },
        });
      }
      const slices = root.querySelector<HTMLElement>(".editorial-slice-image");
      if (slices) {
        gsap.fromTo(slices.querySelector("img"), { scale: desktop ? 1.1 : 1.04 }, {
          scale: 1, ease: "none",
          scrollTrigger: {
            id: "home-flavours", trigger: slices, start: "top bottom", end: "bottom center",
            scrub: true, invalidateOnRefresh: true,
          },
        });
      }
      // GSAP's matchMedia context reverts all timelines, triggers and inline transforms.
      return () => {
        headingSplit?.revert();
        if (syncAnchor) window.removeEventListener("hashchange", syncAnchor);
        if (tick) gsap.ticker.remove(tick);
        lenis?.off("scroll", ScrollTrigger.update);
        lenis?.destroy();
        root.removeAttribute("data-scroll-motion");
      };
    }, root);

    // Refresh measurements after fonts/images settle, never in the scroll loop.
    const refresh = () => { if (!disposed) ScrollTrigger.refresh(); };
    document.fonts.ready.then(refresh);
    const images = [...root.querySelectorAll("img")];
    images.forEach((item) => item.addEventListener("load", refresh));
    return () => {
      disposed = true;
      images.forEach((item) => item.removeEventListener("load", refresh));
      media.revert();
    };
  }, []);
  return null;
}
