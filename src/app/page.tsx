import HomeMotion from "./home-motion";
import SiteHeader from "./site-header";
import HomeFooter from "./home-footer";

export default function Home() {
  return <>
    <SiteHeader overlay />
    <main id="main-content" tabIndex={-1} className="editorial-home">
      <HomeMotion />
      <section className="editorial-hero" aria-labelledby="joy-heading">
        <div className="editorial-hero-copy">
          <h1 id="joy-heading">Our cake<br />philosophy<br />is <em>joy.</em></h1>
          <p>Extraordinary cakes. Unexpected flavours.<br />Made with a little imagination.</p>
          <a className="hero-button editorial-hero-outline" href="/shop/all">Explore our cakes</a>
        </div>
        <div className="editorial-hero-photo"><img src="/Video/Carosel2/banner-cakes-3.webp" alt="Handmade celebration cakes with chocolate and berry buttercream, fresh fruit and piped decorations" width={1600} height={1200} fetchPriority="high" /></div>
      </section>

      <section className="editorial-intro" aria-label="Welcome to Akara">
        <h2>Because life’s sweetest moments deserve extraordinary flavour, effortless beauty <em>&amp; overflowing joy.</em></h2>
        <p>We are based in the heart of Dennistoun in Glasgow. Here, you can order your celebration cakes, enquire about wedding cakes or come by the bakery for a slice of our cake specials and a cup of coffee.</p>
      </section>

        <section className="bakery-story signature-feature" aria-labelledby="bakery-story-heading">
          <div className="bakery-story-copy">
            <p className="signature-feature-label">Signature flavours</p>
            <h2 id="bakery-story-heading">It&apos;s what&apos;s <em>inside</em> that counts.</h2>
            <p className="signature-feature-subtitle">Made from scratch. Made for you.</p>
            <p>
              Thoughtfully crafted cakes, where unexpected flavours meet beautiful
              design. Made for moments worth remembering.
            </p>
            <a className="bakery-story-about hero-button hero-button-primary" href="/shop/all?category=Cakes">
              Explore our flavours <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
          <a className="bakery-story-image" href="/shop/all?category=Cakes" aria-label="Explore signature flavours">
            <img
              src="/Video/Banner Carosel/banner-6.webp"
              alt="A tray of handmade cake slices with layers of sponge and buttercream"
              width={1600}
              height={1200}
              loading="lazy"
            />
          </a>
        </section>

      <section className="favourites favourites-three" aria-labelledby="favourites-heading">
        <header className="favourites-heading">
          <h2 id="favourites-heading">Shop our favourites</h2>
          <p>From show-stopping celebration cakes to sweet little treats.</p>
        </header>
        <div className="favourites-grid">
          {[
            { name: "Wedding Cakes", image: "/Video/Banner Carosel/banner-5.webp", alt: "Two-tier wedding cake decorated with fresh flowers", href: "/contact" },
            { name: "Cupcakes", image: "/Video/Cup Cakes/cupcakes.webp", alt: "Box of assorted cupcakes with buttercream and fruit", href: "/shop/all?category=Cupcakes" },
            { name: "Custom Cakes", image: "/Video/Banner Carosel/banner-3.webp", alt: "White birthday cake decorated with small red hearts", href: "/custom-cakes" },
          ].map((category) => <article className="favourite" key={category.name}>
            <a className="favourite-image" href={category.href} aria-label={`Explore ${category.name}`}>
              <span className="favourite-image-crop"><img src={category.image} alt={category.alt} width={640} height={640} loading="lazy" /></span>
            </a>
            <div className="favourite-caption"><h3>{category.name}</h3><a className="favourite-shop" href={category.href}>Shop now <span aria-hidden="true">&rarr;</span></a></div>
          </article>)}
        </div>
      </section>

    </main>
    <HomeFooter />
  </>;
}
