import HeroCarousel from "./hero-carousel";
import HomeFooter, { EnquiryBanner } from "./home-footer";

const navigation = [
  "Shop",
  "Celebration Cakes",
  "Cupcakes & Treats",
  "About",
  "Gallery",
  "Contact",
];

const favourites = [
  { name: "Celebration Cakes", image: "/Video/Banner Carosel/banner-2.webp", alt: "Pink celebration cake with piped icing, cherries and red ribbons" },
  { name: "Wedding Cakes", image: "/Video/Banner Carosel/banner-5.webp", alt: "Two-tier wedding cake decorated with flowers and gold leaf" },
  { name: "Cupcakes & Treats", image: "/Video/Cup Cakes/Cupcakes in box.png", alt: "Box of six assorted cupcakes topped with buttercream, berries, cherries and crumbs" },
  { name: "Cake Slices", image: "/Video/Banner Carosel/banner-6.webp", alt: "A selection of layered cake slices with buttercream filling" },
];

// Display-only product details until the shop catalogue is connected.
const bestsellers = [
  { name: "Cherry Celebration Cake", image: "/Video/Banner Carosel/banner-2.webp", alt: "Pink buttercream cake with cherries and red ribbons", price: "£45.00" },
  { name: "Floral Celebration Cake", image: "/Video/Banner Carosel/banner-1.webp", alt: "Buttercream cakes decorated with pressed flowers", price: "£45.00" },
  { name: "Assorted Cupcake Box", image: "/Video/Cup Cakes/Cupcakes in box.png", alt: "Six cupcakes with assorted buttercream and fruit toppings", price: "£18.00" },
  { name: "Heart Celebration Cake", image: "/Video/Banner Carosel/banner-3.webp", alt: "White celebration cake decorated with small red hearts", price: "£45.00" },
  { name: "Tropical Fruit Cake", image: "/Video/Banner Carosel/banner-4.webp", alt: "Buttercream tray cake decorated with tropical fruit", price: "£40.00" },
];

export default function Home() {
  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="/" aria-label="Akara Bakery home">
          <img
            className="site-logo"
            src="/Video/logo white.png"
            alt="Akara Bakery"
          />
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map((label) => (
            <a key={label} role="link" aria-disabled="true">
              {label}
              {label === "Shop" && (
                <svg className="nav-chevron" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="m3 4.5 3 3 3-3" />
                </svg>
              )}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button type="button" aria-label="Search (coming soon)" disabled>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m16 16 4.5 4.5" />
            </svg>
          </button>
          <button type="button" aria-label="Account (coming soon)" disabled>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="7" r="3.5" />
              <path d="M4.5 21v-2a7.5 7.5 0 0 1 15 0v2Z" />
            </svg>
          </button>
          <button type="button" aria-label="Shopping bag (coming soon)" disabled>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 7.5h14l1 13H4l1-13Z" />
              <path d="M8.5 9V6a3.5 3.5 0 0 1 7 0v3" />
            </svg>
          </button>
        </div>
      </header>
      <ul className="service-strip" aria-label="Bakery services">
        <li>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 9c0 4.5-6 9-6 9S6 13.5 6 9a6 6 0 1 1 12 0Z" />
            <circle cx="12" cy="9" r="2" />
            <path d="M8 18.5c-2 .4-3 1-3 1.5 0 1.1 3.1 2 7 2s7-.9 7-2c0-.5-1-1.1-3-1.5" />
          </svg>
          <span>Handmade in Glasgow</span>
        </li>
        <li>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 16H2V5h12v11H7m7-8h4l4 4v4h-2m-6 0h2M18 8v4h4" />
            <circle cx="5" cy="17" r="2" />
            <circle cx="18" cy="17" r="2" />
          </svg>
          <span>Collection &amp; local delivery</span>
        </li>
        <li>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 3C10 2 4 6 4 12a7 7 0 0 0 7 7c6 0 10-6 9-16Z" />
            <path d="M3 21 15 9m-7 7v-5m0 5h5" />
          </svg>
          <span>Vegan options available</span>
        </li>
      </ul>
      <main>
        <HeroCarousel />
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
                  <span className="favourite-shop" aria-label="Shop now (coming soon)">
                    Shop now <span aria-hidden="true">→</span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="bakery-story" aria-labelledby="bakery-story-heading">
          <div className="bakery-story-copy">
            <h2 id="bakery-story-heading">Made from scratch.<br />Made for you.</h2>
            <span className="bakery-story-rule" aria-hidden="true" />
            <p>
              We believe the best cakes start with the best ingredients and a
              whole lot of care. Whether you have a clear idea in mind or need a
              little inspiration, we&apos;re here to create something unforgettable.
            </p>
            <span className="bakery-story-about" aria-label="About Akara Bakery (coming soon)">
              About Akara Bakery <span aria-hidden="true">&rarr;</span>
            </span>
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
        <section className="bestsellers" aria-labelledby="bestsellers-heading">
          <h2 id="bestsellers-heading">Bestsellers</h2>
          <div className="bestsellers-grid">
            {bestsellers.map((product) => (
              <article className="bestseller" key={product.name}>
                <img src={product.image} alt={product.alt} width={480} height={480} loading="lazy" />
                <h3>{product.name}</h3>
                <p className="bestseller-price">{product.price}</p>
                <button type="button" disabled aria-label={`Add ${product.name} to cart (coming soon)`}>
                  Add to cart
                </button>
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
