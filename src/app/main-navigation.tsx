"use client";

import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// New links inherit URL matching and the shared selected style automatically.
const navigation = [
  { label: "Shop", href: "/shop/all", matchPath: "/shop" },
  { label: "Bespoke Cakes", href: "/bespoke-cakes" },
  { label: "Celebration Cakes", href: "/shop/all?category=Cakes" },
  { label: "Cupcakes & Treats", href: "/shop/all?category=Brownies%20%26%20Cupcakes" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "https://www.akarabakery.co.uk/gallery" },
  { label: "Contact", href: "/contact" },
];

function NavigationLinks({ activeIndex = -1 }: { activeIndex?: number }) {
  return <>{navigation.map(({ label, href }, index) => (
    <a key={href} href={href} aria-current={index === activeIndex ? "page" : undefined}>
      {label}
      {label === "Shop" && (
        <svg className="nav-chevron" viewBox="0 0 12 12" aria-hidden="true">
          <path d="m3 4.5 3 3 3-3" />
        </svg>
      )}
    </a>
  ))}</>;
}

function CurrentNavigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let activeIndex = -1;
  let bestScore = -1;

  navigation.forEach((item, index) => {
    const target = new URL(item.href, "https://www.akarabakery.co.uk");
    const path = (item.matchPath ?? target.pathname).replace(/\/$/, "") || "/";
    const matchesPath = pathname === path || (path !== "/" && pathname.startsWith(`${path}/`));
    const matchesQuery = Array.from(target.searchParams).every(([key, value]) => searchParams.get(key) === value);
    // Prefer a specific category or child route over its parent section.
    const score = path.length + Array.from(target.searchParams).length * 1000;
    if (matchesPath && matchesQuery && score > bestScore) {
      activeIndex = index;
      bestScore = score;
    }
  });

  return <NavigationLinks activeIndex={activeIndex} />;
}

export default function MainNavigation() {
  return (
    <nav className="main-nav" aria-label="Main navigation">
      <Suspense fallback={<NavigationLinks />}>
        <CurrentNavigation />
      </Suspense>
    </nav>
  );
}
