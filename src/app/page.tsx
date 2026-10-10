import SiteHeader from "./site-header";
import HeroCarousel from "./hero-carousel";
import HomeFooter, { EnquiryBanner } from "./home-footer";



const favourites = [
  { name: "Celebration Cakes", image: "/Video/Banner Carosel/banner-2.webp", alt: "Pink celebration cake with piped icing, cherries and red ribbons" },
  { name: "Wedding Cakes", image: "/Video/Banner Carosel/banner-5.webp", alt: "Two-tier wedding cake decorated with flowers and gold leaf" },
  { name: "Cupcakes", image: "/Video/Cup Cakes/Cupcakes in box.png", alt: "Box of six assorted cupcakes topped with buttercream, berries, cherries and crumbs" },
  { name: "Custom Cakes", image: "/Video/Banner Carosel/banner-3.webp", alt: "White buttercream birthday cake decorated with small red hearts", href: "/custom-cakes" },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="home-main">
        <HeroCarousel />
        <section className="bakery-story" aria-labelledby="bakery-story-heading">
          <div className="bakery-story-copy">
            <h2 id="bakery-story-heading">Made from scratch.<br />Made for you.</h2>
            <p>
              We believe the best cakes start with the best ingredients and a
              whole lot of care. Whether you have a clear idea in mind or need a
              little inspiration, we&apos;re here to create something unforgettable.
            </p>
            <a className="bakery-story-about" href="/about">
              About Akara Bakery <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
          <div className="bakery-story-image">
            <img
              src="/Video/Banner Carosel/banner-6.webp"
              alt="A tray of handmade cake slices with layers of sponge and buttercream"
              width={1600}
              height={1200}
              loading="lazy"
            />
          </div>
        </section>
        <section className="favourites" aria-labelledby="favourites-heading">
          <header className="favourites-heading">
            <h2 id="favourites-heading">Shop our favourites</h2>
            <p>From show-stopping celebration cakes to sweet little treats.</p>
          </header>
          <div className="favourites-grid">
            {favourites.map((category) => (
              <article className="favourite" key={category.name}>
                <div className="favourite-image">
                  <img
                    src={category.image}
                    alt={category.alt}
                    width={640}
                    height={640}
                    loading="lazy"
                  />
                </div>
                <div className="favourite-caption">
                  <h3>{category.name}</h3>
                  <a className="favourite-shop" href={category.href ?? "/shop/all"}>
                    Shop now <span aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <EnquiryBanner />
      </main>
      <HomeFooter />
    </>
  );
}
