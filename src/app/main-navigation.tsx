"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// New links inherit URL matching and the shared selected style automatically.
const navigation = [
  { label: "Shop", href: "/shop/all", matchPath: "/shop" },
  { label: "Bespoke Cakes", href: "/bespoke-cakes" },
  { label: "Custom Cakes", href: "/custom-cakes" },
  { label: "Celebration Cakes", href: "/shop/all?category=Cakes" },
  { label: "Cupcakes", href: "/shop/all?category=Cupcakes" },
  { label: "About", href: "/about" },
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
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLDialogElement>(null);

  function closeDrawer() {
    drawer.current?.close();
    setOpen(false);
  }

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reset = () => { if (desktop.matches) closeDrawer(); };
    desktop.addEventListener("change", reset);
    return () => desktop.removeEventListener("change", reset);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  return (
    <>
    <button ref={toggle} type="button" className="menu-toggle" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-navigation-drawer" aria-haspopup="dialog" onClick={() => { drawer.current?.showModal(); setOpen(true); }}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d={open ? "m6 6 12 12M6 18 18 6" : "M4 6h16M4 12h16M4 18h16"} /></svg>
      <span>Menu</span>
    </button>
    <nav id="main-navigation" className="main-nav" aria-label="Main navigation">
      <Suspense fallback={<NavigationLinks />}>
        <CurrentNavigation />
      </Suspense>
    </nav>
    <dialog ref={drawer} id="mobile-navigation-drawer" className="mobile-drawer" aria-label="Navigation menu" onClose={() => { setOpen(false); if (!window.matchMedia("(min-width: 1024px)").matches) toggle.current?.focus(); }} onClick={(event) => {
      if (event.target === event.currentTarget) {
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeDrawer();
      }
    }} onKeyDown={(event) => {
      if (event.key !== "Tab") return;
      const controls = event.currentTarget.querySelectorAll<HTMLElement>("button, a[href]");
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }}>
      <div className="drawer-heading">
        <span>Explore Akara</span>
        <button type="button" className="drawer-close" aria-label="Close menu" onClick={closeDrawer}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg>
        </button>
      </div>
      <nav className="main-nav drawer-nav" aria-label="Mobile navigation" onClick={(event) => { if ((event.target as HTMLElement).closest("a")) closeDrawer(); }}>
        <Suspense fallback={<NavigationLinks />}><CurrentNavigation /></Suspense>
      </nav>
    </dialog>
    </>
  );
}
