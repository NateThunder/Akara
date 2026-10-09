import MainNavigation from "./main-navigation";

export default function SiteHeader() { return (<>
      <ul className="service-strip" aria-label="Bakery services">
        <li>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 9c0 4.5-6 9-6 9S6 13.5 6 9a6 6 0 1 1 12 0Z" />
            <circle cx="12" cy="9" r="2" />
            <path d="M8 18.5c-2 .4-3 1-3 1.5 0 1.1 3.1 2 7 2s7-.9 7-2c0-.5-1-1.1-3-1.5" />
          </svg>
          <span className="service-label-full">Handmade in Glasgow</span>
          <span className="service-label-mobile">Glasgow</span>
        </li>
        <li>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 16H2V5h12v11H7m7-8h4l4 4v4h-2m-6 0h2M18 8v4h4" />
            <circle cx="5" cy="17" r="2" />
            <circle cx="18" cy="17" r="2" />
          </svg>
          <span className="service-label-full">Collection &amp; local delivery</span>
          <span className="service-label-mobile">Local delivery</span>
        </li>
        <li>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 3C10 2 4 6 4 12a7 7 0 0 0 7 7c6 0 10-6 9-16Z" />
            <path d="M3 21 15 9m-7 7v-5m0 5h5" />
          </svg>
          <span className="service-label-full">Vegan &amp; GF available</span>
          <span className="service-label-mobile">Vegan &amp; GF</span>
        </li>
      </ul>
      <header className="site-header">
        <a className="wordmark" href="/" aria-label="Akara Bakery home">
          <img
            className="site-logo"
            src="/Video/logo white.png"
            alt="Akara Bakery"
          />
        </a>
        <MainNavigation />
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

      {/* Order notice temporarily muted; keep markup and styles for restoring later.
      <aside className="order-notice" aria-label="Cake order lead times">
        <p>Cake orders need 4 days’ notice. Order by Tuesday midnight for the same week.</p>
        <a href="/contact">Need it sooner? Get in touch <span aria-hidden="true">→</span></a>
      </aside>
      */}
</>); }
