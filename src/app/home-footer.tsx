const quickLinks = ["Shop", "About", "Gallery", "Contact", "FAQs"];
const information = ["Collection & Delivery", "Ingredients & Allergens", "Terms & Conditions", "Privacy Policy"];

function BotanicalBranch({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 180 220" fill="none" aria-hidden="true">
      <path d="M89 230C64 183 74 116 109 18M77 177 31 135M79 147l57-47M89 107 52 65M99 69l41-39" />
      {[
        [91, 40, -15], [77, 77, -38], [66, 114, -48], [65, 155, -55],
        [108, 66, 48], [96, 105, 48], [86, 145, 58], [84, 184, 65],
        [40, 143, -60], [26, 125, -30], [121, 114, 45], [138, 94, 20],
        [55, 72, -20], [45, 59, -35], [135, 39, 30], [143, 24, 15],
      ].map(([x, y, angle], index) => (
        <g key={index} transform={`translate(${x} ${y}) rotate(${angle})`}>
          <path d="M0 0C-16-9-15-27 0-37 14-24 13-9 0 0ZM0 0v-32M0-10l-7-8m7 1 6-8M0-22l-5-5" />
        </g>
      ))}
    </svg>
  );
}

export function EnquiryBanner() {
  return (
    <section className="enquiry-banner" aria-labelledby="enquiry-heading">
      <BotanicalBranch className="enquiry-botanical enquiry-botanical-left" />
      <BotanicalBranch className="enquiry-botanical enquiry-botanical-right" />
      <div className="enquiry-inner">
        <div>
          <h2 id="enquiry-heading">Planning something special?</h2>
          <p>We&apos;d love to create the perfect cake for your occasion.<br />Get in touch to discuss your ideas.</p>
        </div>
        <button className="enquiry-button" type="button" disabled aria-label="Enquire now (coming soon)">
          Enquire now <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </section>
  );
}

export default function HomeFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <a className="footer-brand" href="/" aria-label="Akara Bakery home">
          <img src="/Video/logo white.png" alt="Akara Bakery" width={160} height={120} loading="lazy" />
        </a>
        <nav className="footer-links" aria-label="Quick links">
          <h2>Quick links</h2>
          <ul>{quickLinks.map((label) => <li key={label}><a role="link" aria-disabled="true">{label}</a></li>)}</ul>
        </nav>
        <nav className="footer-links" aria-label="Information">
          <h2>Info</h2>
          <ul>{information.map((label) => <li key={label}><a role="link" aria-disabled="true">{label}</a></li>)}</ul>
        </nav>
        <div className="footer-social">
          <h2>Follow us</h2>
          <div className="footer-social-icons">
            <a role="link" aria-disabled="true" aria-label="Instagram (coming soon)">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="5" /><circle cx="12" cy="12" r="4" /><circle className="social-fill" cx="17" cy="7" r="1" /></svg>
            </a>
            <a role="link" aria-disabled="true" aria-label="Facebook (coming soon)">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path className="social-fill" d="M14 21v-8h3l.5-3H14V8c0-1 .3-1.5 1.5-1.5H18V3.2L15.4 3C12.4 3 11 4.8 11 7.7V10H8v3h3v8Z" /></svg>
            </a>
            <a role="link" aria-disabled="true" aria-label="TikTok (coming soon)">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4v11.5a4.5 4.5 0 1 1-4-4.47M14 4c.5 3.5 2.5 5 6 5" strokeWidth="2.5" /></svg>
            </a>
          </div>
        </div>
      </div>
      <p className="footer-copyright">&copy; {new Date().getFullYear()} Akara Bakery. All rights reserved.</p>
    </footer>
  );
}
