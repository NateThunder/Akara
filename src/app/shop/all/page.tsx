import type { Metadata } from "next";
import { Suspense } from "react";
import SiteHeader from "../../site-header";
import HomeFooter from "../../home-footer";
import Catalogue from "./catalogue";

export const metadata: Metadata = {
  title: "Shop all cakes & treats | Akara Bakery",
  description: "Explore Akara Bakery's handmade cakes, cupcakes and gift cards. Baked in Glasgow, with vegan and gluten free options.",
};

export default function ShopAll() {
  return <>
    <SiteHeader />
    <main className="shop-page">
      <Suspense fallback={<p className="shop-loading">Loading the collection…</p>}><Catalogue /></Suspense>
      <section className="enquiry-banner shop-enquiry"><div className="enquiry-inner"><div><h2>A cake as special as the occasion.</h2><p>Tell us what you have in mind. We’ll help bring it to life.</p></div><a className="enquiry-button" href="https://www.akarabakery.co.uk/contact">Enquire now <span aria-hidden="true">→</span></a></div></section>
    </main>
    <HomeFooter />
  </>;
}
