"use client";

import { useState } from "react";
import { cakeColours } from "../../cake-colours";

type Product = {
  name: string; href: string; image: string; price: number; from: boolean;
  description: string; images: string[]; categories: string[];
  variants: { id: string; price: number; options: Record<string, string | undefined> | null }[];
};
const money = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" });

export default function ProductDetail({ product }: { product: Product }) {
  const images = product.images.length ? product.images : [product.image];
  const [image, setImage] = useState(0);
  const [selection, setSelection] = useState<Record<string, string>>({});
  const [baseColour, setBaseColour] = useState("");
  const [decorationColour, setDecorationColour] = useState("");
  const slug = product.href.split("/").pop() || "";
  const design = ["ribbon-cake", "glutenfreeribboncake", "veganribboncake"].includes(slug) ? "ribbon" : ["heart2heart", "gfhearttoheart", "veganhearttoheart"].includes(slug) ? "heart" : ["queenof-hearts", "queenofheartsgf"].includes(slug) ? "queen" : null;
  const sprinkle = ["sprinklesprinkle", "gfsprinklesprinkle", "vegansprinkle"].includes(slug);
  const decorationLabel = design === "heart" ? "Heart colour" : "Ribbon colour";
  const optionNames = [...new Set(product.variants.flatMap(variant => Object.keys(variant.options || {})))].filter(name => !(design || sprinkle) || !["Color", "Custom Colours"].includes(name));
  const matches = product.variants.filter(variant => Object.entries(selection).every(([key, value]) => !value || variant.options?.[key] === value));
  const selected = optionNames.every(key => selection[key]) ? matches[0] : undefined;
  const price = selected?.price ?? (matches.length ? Math.min(...matches.map(variant => variant.price)) : product.price);
  const giftCard = product.categories.includes("Gift Cards");
  return <div className="product-layout">
    <div className="product-gallery">
      <div className="product-main-image"><img src={images[image]} alt={`${product.name}${images.length > 1 ? ` — view ${image + 1}` : ""}`} width={1000} height={1000} fetchPriority="high" /></div>
      {images.length > 1 && <div className="product-thumbnails" aria-label="Product photos">{images.map((src, index) => <button key={src + index} type="button" aria-label={`Show photo ${index + 1}`} aria-pressed={image === index} onClick={() => setImage(index)}><img src={src} alt="" width={100} height={100} /></button>)}</div>}
      <a className="product-back" href="/shop/all">← Back to the collection</a>
    </div>
    <div className="product-information">
      
      <h1>{product.name}</h1>
      <p className="product-price" aria-live="polite">{!selected && product.from ? "From " : ""}{money.format(price)}</p>
      <div className="product-description">{product.description.split(/\n+/).filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
      {optionNames.length > 0 && <fieldset className="product-options"><legend>Make it yours</legend>{optionNames.map(name => <label key={name}>{name}<select value={selection[name] || ""} onChange={event => setSelection(previous => ({ ...previous, [name]: event.target.value }))}><option value="">Choose {name.toLowerCase()}</option>{[...new Set(product.variants.map(variant => variant.options?.[name]).filter((value): value is string => !!value))].map(value => <option key={value} value={value}>{value}</option>)}</select></label>)}</fieldset>}
      {design && <fieldset className="product-options product-colour-options"><legend>Plan your colours</legend><label>Cake base colour<select value={baseColour} onChange={event => setBaseColour(event.target.value)}><option value="">Choose a base colour</option>{cakeColours.map(colour => <option key={colour.name}>{colour.name}</option>)}</select></label><label>{decorationLabel}<select value={decorationColour} onChange={event => setDecorationColour(event.target.value)}><option value="">Choose a {design === "heart" ? "heart" : "ribbon"} colour</option>{cakeColours.map(colour => <option key={colour.name}>{colour.name}</option>)}</select></label>{design === "queen" && <p>Secondary piping will match your ribbon colour{decorationColour ? `: ${decorationColour}` : ""}.</p>}<p>Colour choices are for planning here. Confirm them with the bakery when ordering.</p></fieldset>}
      {sprinkle && <fieldset className="product-options product-colour-options"><legend>Plan your colour</legend><label>Cake base colour<select value={baseColour} onChange={event => setBaseColour(event.target.value)}><option value="">Choose a base colour</option>{cakeColours.map(colour => <option key={colour.name}>{colour.name}</option>)}</select></label><p>Base colour is for planning here. Confirm it with the bakery when ordering.</p></fieldset>}
      {!matches.length && <p role="status">This combination is not available. Please choose another option.</p>}
      <a className="product-order-button" href={product.href}>Continue to order <span aria-hidden="true">→</span></a>
      <p className="product-order-hint">Opens our existing ordering site. Choose your options again there to confirm the final price{giftCard ? "." : " and collection or delivery date."}</p>
      {!giftCard && <details className="product-accordion" open><summary>Collection &amp; delivery</summary><p>Please allow 4 days for cake orders. Orders placed by Tuesday midnight can be fulfilled in the same week, subject to availability.</p><p>For a custom cake or a last-minute order, <a href="https://www.akarabakery.co.uk/contact">get in touch</a>.</p></details>}
      <details className="product-accordion"><summary>Questions about your order?</summary><p>{giftCard ? "Check the product description for where this gift card can be used." : "If you have an allergy or dietary requirement, please contact us before ordering to confirm this product is suitable."}</p><a href="https://www.akarabakery.co.uk/contact">Contact the bakery →</a></details>
    </div>
  </div>;
}
