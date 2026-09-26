import type { Metadata } from "next";
import SiteHeader from "../site-header";
import HomeFooter from "../home-footer";
import ContactForm from "./contact-form";

export const metadata: Metadata = {
  title: "Contact | Akara Bakery",
  description: "Contact Akara Bakery at 537 Duke Street, Glasgow, G31 1DL. Thursday–Sunday: 9am–5pm.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="contact-page">
        <section className="contact-layout" aria-labelledby="contact-heading">
          <div className="contact-copy">
            <h1 id="contact-heading">Contact Us</h1>
            <div className="contact-details">
              <section aria-labelledby="contact-location">
                <h2 id="contact-location">Location</h2>
                <address>537 Duke Street<br />Glasgow, G31 1DL</address>
                <a className="contact-directions" href="https://www.google.com/maps/dir/?api=1&destination=537+Duke+Street+Glasgow+G31+1DL">
                  Get directions <span aria-hidden="true">&rarr;</span>
                </a>
              </section>
              <section aria-labelledby="contact-hours">
                <h2 id="contact-hours">Hours</h2>
                <p>Thursday-Sunday: 9am-5pm</p>
              </section>
              <section className="contact-methods" aria-labelledby="contact-methods-heading">
                <h2 id="contact-methods-heading">Contact</h2>
                <a href="mailto:orders@akarabakery.co.uk">orders@akarabakery.co.uk</a>
                <a href="tel:+441412374414">(0141) 237-4414</a>
              </section>
            </div>
          </div>
          <ContactForm />
        </section>
      </main>
      <HomeFooter />
    </>
  );
}
