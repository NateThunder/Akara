"use client";

import { useState, type FormEvent } from "react";

const dietaryChoices = ["Gluten free", "Vegan", "Nuts", "Soya", "Other"];

export default function BespokeEnquiry({ eyebrow = "Something beyond the builder?" }: { eyebrow?: string }) {
  const [fulfilment, setFulfilment] = useState("Collection");
  const [imageName, setImageName] = useState("");
  const [status, setStatus] = useState("");

  function preview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("This form is a preview. Your enquiry has not been sent. Please email orders@akarabakery.co.uk for now.");
  }

  return <section className="bespoke-enquiry" aria-labelledby="bespoke-enquiry-heading">
    <div className="bespoke-enquiry-intro">
      <p className="bespoke-enquiry-eyebrow">{eyebrow}</p>
      <h2 id="bespoke-enquiry-heading">Tell us about your dream cake</h2>
      <p>Share your ideas and we can make a design and quote for your celebration.</p>
    </div>
    <form className="bespoke-enquiry-form" onSubmit={preview}>
      <div className="bespoke-enquiry-grid">
        <label>Full name <span>*</span><input name="name" autoComplete="name" required maxLength={120} /></label>
        <label>Telephone number <span>*</span><input name="phone" type="tel" autoComplete="tel" required maxLength={30} /></label>
        <label>Email address <span>*</span><input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
        <label>Date of event <span>*</span><input name="eventDate" type="date" required /></label>
        <label>Number of servings or guests <span>*</span><input name="servings" type="number" min="1" step="1" required /></label>
        <label>Flavour choice <span>*</span><select name="flavour" required defaultValue=""><option value="">Choose a flavour</option><option>Vanilla Sponge</option><option>Chocolate Sponge</option><option>Red Velvet</option><option>Lemon Sponge</option><option>Carrot Cake</option><option>Something else / please advise</option></select></label>
      </div>
      <fieldset className="bespoke-enquiry-choices"><legend>Dietary requirements or allergens</legend><p>Select any that apply and add details below. We will confirm suitability with you.</p><div>{dietaryChoices.map(choice => <label key={choice}><input type="checkbox" name="dietary" value={choice} />{choice}</label>)}</div></fieldset>
      <label className="bespoke-enquiry-wide">Dietary details (optional)<textarea name="dietaryDetails" rows={3} maxLength={1000} placeholder="Tell us about any allergies or other requirements" /></label>
      <fieldset className="bespoke-enquiry-choices"><legend>Collection or delivery <span>*</span></legend><div>{["Collection", "Delivery"].map(choice => <label key={choice}><input type="radio" name="fulfilment" value={choice} checked={fulfilment === choice} onChange={() => setFulfilment(choice)} />{choice}</label>)}</div></fieldset>
      {fulfilment === "Delivery" && <label className="bespoke-enquiry-wide">Delivery address <span>*</span><textarea name="address" autoComplete="street-address" rows={3} required maxLength={500} /></label>}
      <label className="bespoke-enquiry-wide">Design details (optional)<textarea name="designDetails" rows={5} maxLength={3000} placeholder="Colours, decorations, occasion, or anything you would like us to know" /></label>
      <label className="bespoke-enquiry-wide">Inspiration image (optional)<input name="inspiration" type="file" accept="image/png,image/jpeg,image/webp,image/avif" onChange={event => setImageName(event.target.files?.[0]?.name || "")} /><small>{imageName || "Choose a JPG, PNG, WebP or AVIF image."}</small></label>
      <p className="bespoke-enquiry-note">Online enquiries are coming soon. This form does not send or store your details or image. For now, email <a href="mailto:orders@akarabakery.co.uk">orders@akarabakery.co.uk</a>.</p>
      <button type="submit">Preview enquiry <span aria-hidden="true">→</span></button>
      <p className="bespoke-enquiry-status" role="status">{status}</p>
    </form>
  </section>;
}
