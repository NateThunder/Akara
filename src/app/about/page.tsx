import type { Metadata } from "next";
import SiteHeader from "../site-header";
import HomeFooter, { EnquiryBanner } from "../home-footer";

export const metadata: Metadata = {
  title: "Our Story | Akara Bakery Glasgow",
  description: "From Lewa's home kitchen in 2016 to a neighbourhood bakery in Glasgow. Discover the story behind Akara Bakery.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="about-page">
        <section className="about-story" aria-labelledby="about-heading">
          <div className="about-copy about-intro">
            <p className="about-eyebrow">Akara Bakery · Our story</p>
            <h1 id="about-heading">A little cake.<br />A lot of heart.</h1>
            <p>Lewa began baking celebration cakes from home in 2016, under a different name. Red velvet was the favourite then, and it still is today.</p>
            <p>In 2019, Akara opened its doors with a simple wish: to be a joyful neighbourhood bakery that feels like home.</p>
            <a className="about-link" href="/shop/all">Find your favourite <span aria-hidden="true">&rarr;</span></a>
          </div>
          <div className="about-photo about-portrait">
            <img src="/about-original.jpg" alt="Akara Bakery's original story portrait, surrounded by buttercream celebration cakes" width={1500} height={2000} fetchPriority="high" />
          </div>
        </section>

        <section className="about-story about-everyday" aria-labelledby="about-baking-heading">
          <div className="about-photo about-cakes">
            <img src="/Video/Banner Carosel/banner-6.webp" alt="A selection of layered cake slices with sponge and buttercream" width={1600} height={1200} loading="lazy" />
          </div>
          <div className="about-copy">
            <p className="about-eyebrow">Your neighbourhood bakery</p>
            <h2 id="about-baking-heading">For celebrations.<br />And just because.</h2>
            <p>Familiar textures, unexpected flavours. Our bakes bring a fresh twist to the classics, from a slice with your coffee to a cake for a moment worth celebrating.</p>
            <p>That first celebration cake menu has grown to include wedding cakes, savoury bakes and catering. There&apos;s always something to gather around.</p>
            <a className="about-link" href="/bespoke-cakes">A cake for your occasion <span aria-hidden="true">&rarr;</span></a>
          </div>
        </section>

        <section className="about-team" aria-labelledby="about-team-heading">
          <p className="about-eyebrow">Join our team</p>
          <h2 id="about-team-heading">Make someone&apos;s day.<br />Bake with us.</h2>
          <p>We&apos;re always happy to hear from talented people who would love to be part of Akara Bakery.</p>
          <a className="about-link" href="/contact">Reach out <span aria-hidden="true">&rarr;</span></a>
        </section>
        <EnquiryBanner />
      </main>
      <HomeFooter />
    </>
  );
}
