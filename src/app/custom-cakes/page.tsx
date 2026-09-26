import type { Metadata } from "next";
import CakeCustomiser from "./cake-customiser";
import SiteHeader from "../site-header";

export const metadata: Metadata = {
  title: "Custom Cakes | Akara Bakery",
  description: "Choose your flavour, colours and finishing touches for a cake made for you.",
};

export default function CustomCakesPage() {
  return <><SiteHeader /><main className="custom-cakes-page">
    <header className="custom-cakes-heading"><p>Akara Bakery · Made for you</p><h1>Custom Cakes</h1></header>
    <CakeCustomiser />
  </main></>;
}
