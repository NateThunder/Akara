import HomeMotion from "./home-motion";
import SiteHeader from "./site-header";
import HomeFooter from "./home-footer";

export default function Home() {
  return <>
    <SiteHeader overlay />
    <main className="editorial-home">
      <HomeMotion />
      <section className="editorial-hero" aria-labelledby="joy-heading">
        <div className="editorial-hero-copy">
          <h1 id="joy-heading">Our cake<br />philosophy<br />is <em>joy.</em></h1>
          <p>Extraordinary cakes. Unexpected flavours.<br />Made with a little imagination.</p>
          <a className="hero-button editorial-hero-outline" href="/shop/all">Explore our cakes</a>
        </div>
        <div className="editorial-hero-photo"><img src="/Video/Carosel2/banner1.webp" alt="Nine handmade celebration cakes with chocolate, berry and vanilla buttercream, fruit and piped decorations" width={1600} height={1200} fetchPriority="high" /></div>
      </section>

      <section className="editorial-intro" aria-label="Welcome to Akara">
        <h2>Because life’s sweetest moments deserve extraordinary flavour, effortless beauty <em>&amp; overflowing joy.</em></h2>
        <p>We are based in the heart of Dennistoun in Glasgow. Here, you can order your celebration cakes, enquire about wedding cakes or come by the bakery for a slice of our cake specials and a cup of coffee.</p>
      </section>

      <section id="signature-flavours" className="editorial-signatures" aria-labelledby="signature-heading">
        <header>
          <p className="editorial-label">Signature flavours</p>
          <h2 id="signature-heading">It’s what’s <em>inside</em> that counts.</h2>
          <p>Beautiful on the outside. A little extraordinary within.</p>
          <a className="editorial-text-link" href="/shop/all?category=Cakes">Explore our flavours <span aria-hidden="true">&rarr;</span></a>
        </header>
        <div className="editorial-flavour-feature">
          <div className="editorial-slice-image">
            <img src="/Video/Banner Carosel/banner-6.webp" alt="A close view of handmade cake slices, showing layers of sponge, fruit and buttercream" width={1600} height={1200} loading="lazy" />
          </div>
          <nav className="editorial-flavour-links" aria-label="Explore signature flavours">
            <a href="/shop/lemonlavenderblueberry">Lemon, lavender &amp; blueberry <span aria-hidden="true">&#8599;</span></a>
            <a href="/shop/earlgreyberry">Earl Grey &amp; mixed berry <span aria-hidden="true">&#8599;</span></a>
            <a href="/shop/passionfruitcoconutcake">Coconut, cardamom &amp; passionfruit <span aria-hidden="true">&#8599;</span></a>
          </nav>
        </div>
      </section>

      <section className="editorial-treats" aria-labelledby="treats-heading">
        <header><p className="editorial-label">Little reasons to celebrate</p><h2 id="treats-heading">Joy comes in <em>all sizes.</em></h2><p>A box to share. A little something just for you.</p></header>
        <div className="editorial-treat-grid">
          <a href="/shop/all?category=Cupcakes" className="editorial-treat"><div><img src="/Video/Cup Cakes/cupcakes.webp" alt="Assorted cupcakes topped with buttercream, berries and cherries" width={1000} height={1000} loading="lazy" /></div><h3>Cupcakes</h3><span className="editorial-text-link">Shop little treats <span aria-hidden="true">→</span></span></a>
          <a href="/shop/all?category=Cheesecakes" className="editorial-treat"><div><img src="/Video/Cheesecakes/strawberries-cream.webp" alt="Strawberries and cream cheesecake topped with fresh strawberries" width={1000} height={1000} loading="lazy" /></div><h3>Cheesecakes</h3><span className="editorial-text-link">Find your slice <span aria-hidden="true">→</span></span></a>
        </div>
        <p className="editorial-dietary">A little joy for more of us. Explore our <a href="/shop/all?category=Vegan%20Cakes">vegan</a> and <a href="/shop/all?category=Gluten%20Free%20Cakes">gluten-free cakes</a>.</p>
      </section>

      <section id="weddings" className="editorial-weddings" aria-labelledby="wedding-heading">
        <div className="editorial-wedding-photo"><img src="/Video/Banner Carosel/banner-5.webp" alt="Two-tier wedding cake with green buttercream, fresh flowers and gold leaf" width={1000} height={1300} loading="lazy" /></div>
        <div className="editorial-wedding-copy"><p className="editorial-label">For your sweetest day</p><h2 id="wedding-heading">Made for your<br /><em>kind of love.</em></h2><p>Extraordinary flavour, thoughtful details and a cake that feels like you. Let’s make something beautiful for your wedding day.</p><a className="hero-button hero-button-primary" href="/contact">Let’s talk wedding cakes <span aria-hidden="true">↗</span></a><a className="editorial-text-link" href="/custom-cakes">Another occasion? Explore custom cakes <span aria-hidden="true">→</span></a></div>
      </section>

      <section className="editorial-faq" id="faqs" aria-labelledby="faq-heading"><p className="editorial-label">A little help</p><h2 id="faq-heading">Good things to know.</h2><details><summary>Where can I find you?</summary><p>Visit us at 537 Duke Street, Dennistoun, Glasgow, G31 1DL. <a href="/contact">Find opening hours and directions</a>.</p></details><details><summary>How do I order a cake?</summary><p><a href="/shop/all">Explore the cake collection</a> and choose your options, or <a href="/custom-cakes">create a custom cake</a>. For wedding cakes and special requests, <a href="/contact">get in touch</a>.</p></details><details><summary>Do you offer vegan and gluten-free cakes?</summary><p>Yes, explore the vegan and gluten-free collections in our shop. Please contact us to discuss any allergies or dietary requirements before ordering.</p></details></section>
    </main>
    <HomeFooter />
  </>;
}
