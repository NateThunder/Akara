"use client";

import { useEffect, useState } from "react";

const slides = Array.from({ length: 7 }, (_,index) => `/Video/Banner Carosel/banner-${index + 1}.webp`);

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
    <section className="cake-hero" aria-label="Celebration cakes" aria-roledescription="carousel">
      <div className="hero-photographs" aria-hidden="true">
        {slides.map((src, index) => (
          // Native images keep the pre-optimized local assets portable across hosts.
          // eslint-disable-next-line @next/next/no-img-element
          <img key={src} src={src} alt="" className={`hero-photograph${active === index ? " is-active" : ""}`} fetchPriority={index === 0 ? "high" : "low"} decoding="async" />
        ))}
      </div>
      <div className="hero-copy">
        <p className="hero-eyebrow">Our cake philosophy is joy.</p>
        <h1>We are an artisan cake shop and cafe bakery specialising in unique custom celebration and wedding cakes in Glasgow!</h1>
        <p className="hero-description">Beautifully handmade cakes for birthdays, weddings and every special occasion.</p>
        <div className="hero-actions">
          <a className="hero-button hero-button-primary" href="/shop/all">Shop cakes</a>
          <a className="hero-button hero-button-secondary" href="/contact">Custom orders</a>
        </div>
      </div>
    </section>
  );
}
