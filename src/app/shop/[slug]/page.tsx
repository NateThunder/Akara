import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "../../site-header";
import HomeFooter from "../../home-footer";
import catalogue from "../all/products.json";
import details from "../product-details.json";
import ProductDetail from "./product-detail";

type Props = { params: Promise<{ slug: string }> };
function findProduct(slug: string) {
  const detail = details.find(item => item.slug === slug);
  const product = catalogue.products.find(item => item.id === detail?.id);
  return product && detail ? { ...product, ...detail } : undefined;
}
export function generateStaticParams() { return details.map(item => ({ slug: item.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = findProduct((await params).slug);
  return { title: product ? `${product.name} | Akara Bakery` : "Product not found | Akara Bakery", description: product?.description.slice(0, 160) };
}
export default async function ProductPage({ params }: Props) {
  const product = findProduct((await params).slug);
  if (!product) notFound();
  return <><SiteHeader /><main className="shop-page product-page">
    <nav className="product-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/shop/all">Shop all</a><span aria-hidden="true">/</span><span aria-current="page">{product.name}</span></nav>
    <ProductDetail product={product} />
    <section className="product-help"><div><h2>Made for your special moment.</h2><p>Looking for a personal touch or a bespoke design?</p></div><a className="shop-product-button" href="https://www.akarabakery.co.uk/contact">Get in touch →</a></section>
  </main><HomeFooter /></>;
}
