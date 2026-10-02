"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import catalogue from "./products.json";
import { removedProductSlugs } from "../removed-products";

const categories = ["All", "Cakes", "Cheesecakes", "Vegan Cakes", "Gluten Free Cakes", "Cupcakes", "Gift Cards"];
const money = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" });

export default function Catalogue() {
  const params = useSearchParams();
  const router = useRouter();
  const selected = params.get("category") || "All";
  const category = categories.includes(selected) ? selected : "All";
  const categoryList = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const list = categoryList.current;
    const button = list?.querySelector<HTMLButtonElement>('[aria-pressed="true"]');
    if (list && button && list.scrollWidth > list.clientWidth) {
      list.scrollLeft += button.getBoundingClientRect().left - list.getBoundingClientRect().left - (list.clientWidth - button.offsetWidth) / 2;
    }
  }, [category]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const products = catalogue.products.filter(product => !removedProductSlugs.has(product.href.split("/").pop() || "") && (category === "All" || product.categories.includes(category)) && product.name.toLowerCase().includes(search.trim().toLowerCase()));
  if (sort === "price-low") products.sort((a,b) => a.price - b.price);
  if (sort === "price-high") products.sort((a,b) => b.price - a.price);
  if (sort === "name") products.sort((a,b) => a.name.localeCompare(b.name));
  function selectCategory(value: string) {
    const next = new URLSearchParams(params.toString());
    if (value === "All") next.delete("category"); else next.set("category", value);
    router.replace(`/shop/all${next.size ? `?${next}` : ""}`, { scroll: false });
  }
  return <section className="shop-collection" id="collection" aria-labelledby="collection-heading">
    <header className="shop-collection-heading"><h1 id="collection-heading">Shop our collection</h1></header>
    <div ref={categoryList} className="shop-categories" aria-label="Product categories">{categories.map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => selectCategory(item)}>{item}</button>)}</div>
    <div className="shop-toolbar">
      <p role="status" aria-live="polite">{products.length} {products.length === 1 ? "product" : "products"}{category !== "All" ? ` · ${category}` : ""}</p>
      <label className="shop-search"><span className="shop-sr-only">Search products</span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6" /><path d="m15 15 5 5" /></svg><input type="search" placeholder="Find something delicious…" value={search} onChange={event => setSearch(event.target.value)} /></label>
      <label className="shop-sort">Sort by<select value={sort} onChange={event => setSort(event.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name: A–Z</option></select></label>
    </div>
    <div className="shop-product-grid">{products.map((product,index) => <article className="shop-product" key={product.id}>
      <a className="shop-product-image" href={`/shop/${product.href.split("/").pop()}`} aria-label={`View ${product.name}`}><img src={product.image} alt={product.name} width={750} height={750} loading={index < 4 ? "eager" : "lazy"} /><span className="shop-image-action">Discover more <span aria-hidden="true">→</span></span></a>
      <div className="shop-product-copy"><h3><a href={`/shop/${product.href.split("/").pop()}`}>{product.name}</a></h3><p>{product.from && <span>From </span>}{money.format(product.price)}</p><a className="shop-product-button" href={`/shop/${product.href.split("/").pop()}`}>Choose options <span className="shop-sr-only">for {product.name}</span></a></div>
    </article>)}</div>
    {products.length === 0 && <div className="shop-empty"><h3>No treats found this time.</h3><p>Try another flavour or browse the whole collection.</p><button type="button" className="shop-product-button" onClick={() => { setSearch(""); selectCategory("All"); }}>Clear filters</button></div>}
  </section>;
}
