import type { Metadata } from "next";
import SiteHeader from "../site-header";
import HomeFooter from "../home-footer";
import StoryMotion from "./story-motion";

export const metadata: Metadata = {
  title: "Our Story | Akara Bakery Glasgow",
  description: "From Lewa's home kitchen in 2016 to your neighbourhood bakery. Discover our story and visit Akara at 537 Duke Street, Glasgow.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <StoryMotion>
        <section className="story-hero" aria-labelledby="story-heading">
          <div className="story-hero-copy">
            <p className="story-eyebrow">Akara Bakery &middot; Glasgow</p>
            <h1 id="story-heading"><img src="/Video/About/header.webp" alt="Our story" width={1116} height={870} /></h1>
            <p className="story-hero-intro">A little home <em>away from home.</em></p>
            <p className="story-body">From celebration cakes in a home kitchen to a neighbourhood bakery on Duke Street. Come on in.</p>
            <a className="story-link" href="#our-beginnings">Meet Akara <span aria-hidden="true">&darr;</span></a>
          </div>
          <figure className="story-photo story-hero-photo">
            <img src="/Video/shop2.webp" alt="Sunlight filling the tables and wooden chairs inside Akara Bakery" width={1000} height={667} fetchPriority="high" />
            <img className="story-wordmark" src="/Video/About/wordmark-white.webp" alt="" aria-hidden="true" width={1000} height={667} />
            <figcaption>A place to pause.<br />Something delicious to stay for.</figcaption>
          </figure>
        </section>

        <section id="our-beginnings" className="story-panel story-founder" aria-labelledby="story-beginnings-heading">
          <div className="story-panel-copy">
            <p className="story-eyebrow">Small beginnings</p>
            <h2 id="story-beginnings-heading" className="story-display">Since<br /><span>2016.</span></h2>
            <h3>It started with a cake.</h3>
            <p className="story-body">Lewa started Akara as a home celebration cake business in 2016, under a different name. Back then, red velvet was her best seller. It still is today.</p>
            <p className="story-body">A simple celebration cake menu was the beginning of something that would grow into a bakery of its own.</p>
            <a className="story-link" href="#bakery-today">From a kitchen to Akara <span aria-hidden="true">&rarr;</span></a>
          </div>
          <figure className="story-photo story-founder-photo">
            <img src="/Video/Lewa.webp" alt="Lewa decorating a celebration cake at Akara Bakery" width={1017} height={1344} loading="lazy" />
          </figure>
        </section>

        <section id="bakery-today" className="story-panel story-today" aria-labelledby="story-today-heading">
          <div className="story-panel-copy">
            <p className="story-eyebrow">Our doors opened in 2019</p>
            <h2 id="story-today-heading" className="story-display">Made with<br /><em>joy.</em></h2>
            <h3>Classic bakes. A little twist.</h3>
            <p className="story-body">Since opening our doors in 2019, Akara has been known for delicious bakes and unique flavours that riff off classic textures with a modern twist.</p>
            <p className="story-body">Today, that little cake menu has grown to include wedding cakes, savoury bakes and a delicious catering menu.</p>
            <a className="story-link" href="/shop/all">Explore our bakes <span aria-hidden="true">&rarr;</span></a>
          </div>
          <figure className="story-photo story-shop-photo">
            <img src="/Video/Banner Carosel/banner-6.webp" alt="A tray of Akara's cake slices with layers of sponge and buttercream" width={1600} height={1200} loading="lazy" />
          </figure>
        </section>

        <section className="story-neighbourhood" aria-labelledby="story-neighbourhood-heading">
          <div className="story-welcome-copy">
          <p className="story-eyebrow">Your official neighbourhood bakery</p>
          <h2 id="story-neighbourhood-heading">Good bakes.<br /><em>A warm welcome.</em></h2>
          <p className="story-body">Our goal is simple: to create a joyous place for every customer, with something delicious and a feeling of home.</p>
          <a className="story-link" href="#visit-akara">Find your way here <span aria-hidden="true">&darr;</span></a>
          </div>
          <figure className="story-photo story-welcome-photo">
            <img src="/Video/shop.webp" alt="The sunny window and welcoming entrance to Akara Bakery on Duke Street" width={1000} height={1333} loading="lazy" />
          </figure>
        </section>

        <section id="visit-akara" className="story-visit" aria-labelledby="story-visit-heading">
          <div className="story-visit-details">
            <div>
              <p className="story-eyebrow">Find us on Duke Street</p>
              <h2 id="story-visit-heading">Come on <em>in.</em></h2>
            </div>
            <div>
              <h3>Visit the bakery</h3>
              <address>537 Duke Street<br />Glasgow, G31 1DL</address>
              <a className="story-link" href="https://www.google.com/maps/dir/?api=1&destination=537+Duke+Street+Glasgow+G31+1DL">Get directions <span aria-hidden="true">&#8599;</span></a>
            </div>
            <div>
              <h3>Opening hours</h3>
              <p>Thursday&ndash;Sunday<br />9am&ndash;4pm</p>
              <a className="story-link" href="/contact">Get in touch <span aria-hidden="true">&rarr;</span></a>
            </div>
          </div>
          <iframe className="story-map" title="Map showing Akara Bakery at 537 Duke Street, Glasgow" src="https://maps.google.com/maps?q=Akara%20Bakery%20537%20Duke%20Street%20Glasgow%20G31%201DL&z=16&output=embed" width="1440" height="480" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        </section>
      </StoryMotion>
      <HomeFooter />
    </>
  );
}
