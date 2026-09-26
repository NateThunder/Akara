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
        <article className="about-journal" aria-labelledby="about-heading">
          <section className="journal-opening">
            <div className="journal-intro">
              <p className="journal-label">Akara Bakery</p>
              <h1 id="about-heading" className="journal-title">
                <img src="/Video/About/header.webp" alt="Our story" width={1116} height={870} fetchPriority="high" />
              </h1>
              <p className="journal-body journal-first-paragraph">Lewa started Akara Bakery as a home celebration cake business back in 2016 under a different name. Back then red velvet was her best seller, and it still is today.</p>
            </div>
            <figure className="journal-figure journal-portrait">
              <img className="journal-shape journal-square" src="/Video/About/teal-square.webp" alt="" width={600} height={599} aria-hidden="true" />
              <div className="journal-image">
                <img src="/Video/About/portrait.webp" alt="Akara Bakery's founder surrounded by buttercream celebration cakes" width={1100} height={1467} fetchPriority="high" />
              </div>
              <figcaption className="journal-location"><span aria-hidden="true">✳</span>Glasgow</figcaption>
            </figure>
          </section>

          <section className="journal-baking" aria-label="The bakery today">
            <figure className="journal-figure journal-shop">
              <img className="journal-shape journal-circle" src="/Video/About/teal-circle.webp" alt="" width={480} height={481} loading="lazy" aria-hidden="true" />
              <div className="journal-image">
                <img src="/Video/shop.webp" alt="Sunlight falling across Akara Café and Bakery's front window" width={1000} height={1333} loading="lazy" />
              </div>
              <figcaption className="journal-since">Since 2019</figcaption>
            </figure>
            <div className="journal-baking-copy">
              <p className="journal-label">Since 2019</p>
              <p className="journal-body">Since opening their doors in 2019, Akara Bakery has been known for their delicious bakes and unique flavours that riff off classic textures with a modern twist.</p>
              <p className="journal-body">What was once a simple celebration cake menu has expanded to include wedding cakes, savoury bakes and a delicious catering menu.</p>
              <a className="journal-link" href="/shop/all">Explore our bakes <span aria-hidden="true">&rarr;</span></a>
              <figure className="journal-figure journal-shop-interior">
                <div className="journal-image">
                  <img src="/Video/shop2.webp" alt="Wooden chairs and tables beside the sunny window inside Akara Bakery" width={1000} height={667} loading="lazy" />
                </div>
              </figure>
            </div>
          </section>

          <section className="journal-closing" aria-labelledby="journal-neighbourhood">
            <div>
              <p className="journal-label">Our mission</p>
              <h2 id="journal-neighbourhood">Your official<br />neighbourhood<br />bakery.</h2>
            </div>
            <p className="journal-body">The goal is to create a joyous place for each customer that feels like a delicious home away from home.</p>
          </section>
        </article>
        <EnquiryBanner />
      </main>
      <HomeFooter />
    </>
  );
}

