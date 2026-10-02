import type { Metadata } from "next";
import SiteHeader from "../site-header";
import HomeFooter, { EnquiryBanner } from "../home-footer";
import BespokeEnquiry from "../custom-cakes/bespoke-enquiry";

export const metadata: Metadata = {
  title: "Bespoke Cakes | Akara Bakery Glasgow",
  description: "A cake made for your moment. Explore bespoke cake inspiration and talk to Akara Bakery in Glasgow about your celebration.",
};

const steps = [
  { title: "Get in touch", text: "Tell us about your event, ideas and colours.", path: "M21 11a8 8 0 0 1-8 8H7l-5 3 2-6a8 8 0 1 1 17-5Z" },
  { title: "We design", text: "We create a design and quote just for you.", path: "m4 16-1 5 5-1L21 7l-4-4L4 16Zm11-11 4 4M4 16l4 4" },
  { title: "We bake & create", text: "Your cake is handmade with care and attention.", path: "M3 21h18M5 21V11h14v10M5 15c2 3 3-3 5 0s3-3 5 0 3-2 4 0M8 11V7m4 4V7m4 4V7M8 4v1m4-3v3m4-1v1" },
  { title: "You celebrate", text: "Collect or arrange delivery, ready to enjoy.", path: "M20 5c-3-3-7-1-8 2-1-3-5-5-8-2s-1 7 8 15c9-8 11-12 8-15Z" },
];

const inspiration = [
  { image: 1, name: "Botanical details", alt: "Buttercream cakes decorated with delicate pressed flowers" },
  { image: 2, name: "A little romance", alt: "Pink piped celebration cake with cherries and red ribbons" },
  { image: 3, name: "Made with love", alt: "White buttercream cake decorated with small red hearts" },
  { image: 4, name: "Something colourful", alt: "Celebration cake topped with colourful tropical fruit" },
  { image: 5, name: "Naturally elegant", alt: "Two-tier cake with flowers, foliage and gold leaf" },
];

export default function BespokeCakesPage() {
  return (
    <>
      <SiteHeader />
      <main className="bespoke-page">
        <section className="bespoke-process bespoke-container" aria-labelledby="process-heading">
          <h2 id="process-heading">How it works</h2>
          <ol className="bespoke-steps">
            {steps.map((step, index) => (
              <li key={step.title}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d={step.path} /></svg>
                <h3>{index + 1}. {step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="bespoke-inspiration bespoke-container" aria-labelledby="inspiration-heading">
          <header className="bespoke-section-heading">
            <p className="bespoke-eyebrow">A few ideas to get you started</p>
            <h2 id="inspiration-heading">Inspiration</h2>
            <p>Flowers, colour, a favourite detail. Every celebration has its own story.</p>
          </header>
          <div className="bespoke-gallery">
            {inspiration.map((cake) => (
              <figure key={cake.image}>
                <div className="bespoke-gallery-image"><img src={`/Video/Banner Carosel/banner-${cake.image}.webp`} alt={cake.alt} width={480} height={600} loading="lazy" /></div>
                <figcaption>{cake.name}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="bespoke-guidance bespoke-container" aria-label="Planning your bespoke cake">
          <article>
            <svg className="bespoke-guidance-icon" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
              <path d="M5 18 18 8l17 10v17H5V18Zm0 0h30M5 25h30M5 31h30M5 21c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2 2 2 6 0" />
              <circle cx="21" cy="10" r="3.5" />
              <path d="M21 6.5c0-2 2-3 4-3" />
            </svg>
            <h2>Flavours</h2>
            <p>Tell us your favourites and we&apos;ll help you find the right combination. Share any dietary requirements when you enquire.</p>
            <a href="/contact">Let&apos;s talk flavours <span aria-hidden="true">&rarr;</span></a>
          </article>
          <article>
            <svg className="bespoke-guidance-icon" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
              <path d="M7 5v29M5 7l2-2 2 2M5 32l2 2 2-2M5 5h4M5 34h4M17 7v27h18M15 9l2-2 2 2M33 32l2 2-2 2M26 17l4 4M25 19l3-3M28 22l3-3" />
              <circle cx="17" cy="6" r="1.5" />
            </svg>
            <h2>Sizes &amp; prices</h2>
            <p>From intimate gatherings to bigger celebrations, we&apos;ll guide you on size and provide a quote for your design.</p>
            <a href="/contact">Discuss your cake <span aria-hidden="true">&rarr;</span></a>
          </article>
          <article>
            <svg className="bespoke-guidance-icon" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
              <path d="M5 9h30v26H5V9Zm0 8h30M12 5v8M28 5v8" />
              <path d="M12 23h1m6 0h1m6 0h1M12 29h1m6 0h1m6 0h1" />
            </svg>
            <h2>A date in mind?</h2>
            <p>Get in touch with your celebration date as early as possible, especially for weekends. We&apos;ll confirm availability with you.</p>
            <a href="/contact">Check availability <span aria-hidden="true">&rarr;</span></a>
          </article>
        </section>
        <BespokeEnquiry eyebrow="Start your bespoke order" />
        <EnquiryBanner href="/contact" />
      </main>
      <HomeFooter />
    </>
  );
}
