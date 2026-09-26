"use client";

import { useState } from "react";

export default function ContactForm() {
  const [attempted, setAttempted] = useState(false);

  return (
    <section className="contact-form-section" id="contact-form" aria-labelledby="contact-form-heading">
      <div className="contact-form-intro">
        <h2 id="contact-form-heading">Send us a note</h2>
        <p>Have a question or something special in mind? We’d love to hear from you.</p>
      </div>
      <form className="contact-form" aria-describedby="contact-form-note" onSubmit={(event) => {
        event.preventDefault();
        setAttempted(true);
      }}>
        <div className="contact-form-row">
          <div className="contact-form-field">
            <label htmlFor="contact-name">Name <span>(required)</span></label>
            <input id="contact-name" name="name" autoComplete="name" required maxLength={120} />
          </div>
          <div className="contact-form-field">
            <label htmlFor="contact-email">Email <span>(required)</span></label>
            <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} />
          </div>
        </div>
        <div className="contact-form-field">
          <label htmlFor="contact-message">Message <span>(required)</span></label>
          <textarea id="contact-message" name="message" rows={6} required maxLength={5000} />
        </div>
        <p className="contact-form-note" id="contact-form-note">Online enquiries are coming soon. For now, please email <a href="mailto:orders@akarabakery.co.uk">orders@akarabakery.co.uk</a>.</p>
        <button className="contact-form-submit" type="submit">Send message <span aria-hidden="true">&rarr;</span></button>
        <p className="contact-form-status" role="status">{attempted ? "Your message has not been sent. Please email us directly while online enquiries are being set up." : ""}</p>
      </form>
    </section>
  );
}
