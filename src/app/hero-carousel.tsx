"use client";

import { useEffect, useState } from "react";

const slides = Array.from({ length: 6 }, (_, index) => `/Carosel3/carousel-${index + 1}.webp`);

export default function HeroCarousel() {
  const [active, setActive] = useState(0);

  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive((current) => (current + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);


  return (
    <>

    <section className="cake-hero home-joy-hero" aria-label="Celebration cakes" aria-roledescription="carousel">
      <div className="hero-photographs">
        <div aria-hidden="true">
          {slides.map((src, index) => (
            // Native images keep the pre-optimized local assets portable across hosts.
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt="" className={`hero-photograph${active === index ? " is-active" : ""}`} fetchPriority={index === 0 ? "high" : "low"} decoding="async" />
          ))}
        </div>

      </div>
      <div className="hero-copy-blur" aria-hidden="true" />
      <div className="hero-copy">
        <p className="hero-eyebrow">Your neighbourhood bakery, Glasgow</p>
        <h1>A little<br />slice of <em>joy.</em></h1>
        <p className="hero-description">Big days. Small wins. Just-because Tuesdays.<br />There’s always a reason for cake.</p>
        <div className="hero-actions">
          <a className="hero-button hero-button-primary" href="/shop/all">Find your happy cake <span aria-hidden="true">↗</span></a>
        </div>
        <p className="hero-handmade"><span aria-hidden="true">✳</span> Handmade with love in Dennistoun.</p>
      </div>
    </section>
    <ul className="hero-joy-strip" aria-label="Made with care">
      {["Made from scratch", "A little extra love", "Never just a cake", "Always a good idea"].map((message) => <li key={message}>{message}<span aria-hidden="true">✳</span></li>)}
    </ul>
    </>
  );
}
