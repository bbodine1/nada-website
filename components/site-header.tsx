"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/** Single source for mobile menu — keep order stable for familiarity. */
const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/crop-applicators", label: "Crop Applicators" },
  { href: "/herbicide-application", label: "Herbicide" },
  { href: "/news", label: "News" },
  { href: "/#explainer", label: "How It Works" },
  { href: "/#testimonials", label: "Growers" },
  { href: "/#faq", label: "FAQ" },
];

const desktopPrimaryLinks = [
  { href: "/crop-applicators", label: "Crop Applicators" },
  { href: "/herbicide-application", label: "Herbicide" },
  { href: "/news", label: "News" },
];

const desktopExploreLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#explainer", label: "How It Works" },
  { href: "/#testimonials", label: "Growers" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const exploreRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!exploreOpen) return;

    const onPointerDown = (e: MouseEvent) => {
      if (
        exploreRef.current &&
        !exploreRef.current.contains(e.target as Node)
      ) {
        setExploreOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExploreOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [exploreOpen]);

  useEffect(() => {
    if (!open) return;

    const isInsideMobileMenu = (target: Node) =>
      !!(
        mobileMenuButtonRef.current?.contains(target) ||
        mobileMenuPanelRef.current?.contains(target)
      );

    const onPointerDown = (e: MouseEvent) => {
      if (!isInsideMobileMenu(e.target as Node)) setOpen(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const bareNavLinkClass = scrolled
    ? "text-[color:var(--fg-muted)] hover:text-[color:var(--color-primary)]"
    : "text-white/80 hover:text-white";

  const dropdownPanelClass = scrolled
    ? "border border-[color:var(--border)] bg-[color:var(--background)] shadow-lg ring-1 ring-black/5"
    : "border border-white/25 bg-black/55 shadow-lg backdrop-blur-md ring-1 ring-white/10";

  const dropdownItemClass = scrolled
    ? "text-[color:var(--fg-muted)] hover:bg-[color:var(--surface-muted)] hover:text-[color:var(--color-primary)]"
    : "text-white/90 hover:bg-white/10 hover:text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[color:var(--border)] bg-[color:var(--background)]/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between lg:h-24 xl:h-28">
        <Link
          href="/#top"
          className="group relative flex items-center"
          aria-label="North Alabama Drone Applicators"
        >
          <Image
            src="/logos/nada-logo-hz-dark.png"
            alt="North Alabama Drone Applicators"
            width={1900}
            height={649}
            priority
            loading="eager"
            className={`h-auto w-[150px] transition-opacity duration-300 md:w-[190px] lg:w-[230px] xl:w-[300px] ${
              scrolled ? "opacity-0" : "opacity-100"
            }`}
          />
          <Image
            src="/logos/nada-logo-hz-light.png"
            alt=""
            aria-hidden="true"
            width={1900}
            height={649}
            className={`absolute left-0 top-1/2 h-auto w-[150px] -translate-y-1/2 transition-opacity duration-300 md:w-[190px] lg:w-[230px] xl:w-[300px] ${
              scrolled ? "opacity-100" : "opacity-0"
            }`}
          />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-5 xl:flex"
        >
          {desktopPrimaryLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap text-sm font-medium transition-colors ${bareNavLinkClass}`}
            >
              {item.label}
            </Link>
          ))}

          <div ref={exploreRef} className="relative">
            <button
              type="button"
              id="desktop-nav-explore-trigger"
              aria-expanded={exploreOpen}
              aria-controls="desktop-nav-explore-panel"
              aria-haspopup="true"
              onClick={() => setExploreOpen((v) => !v)}
              className={`inline-flex items-center gap-1 whitespace-nowrap text-sm font-medium transition-colors ${bareNavLinkClass}`}
            >
              Explore
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className={`h-4 w-4 shrink-0 transition-transform duration-200 ${exploreOpen ? "rotate-180" : ""}`}
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {exploreOpen ? (
              <section
                id="desktop-nav-explore-panel"
                aria-labelledby="desktop-nav-explore-trigger"
                className="absolute right-0 top-full z-50 min-w-48 pt-2"
              >
                <div
                  className={`overflow-hidden rounded-lg py-1 ${dropdownPanelClass}`}
                >
                  {desktopExploreLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setExploreOpen(false)}
                      className={`block whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors ${dropdownItemClass}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#lead-form"
            data-track="header-cta-field-fit"
            aria-label="Request my field-fit assessment"
            className="btn btn-accent hidden px-4 py-2 text-sm xl:inline-flex"
          >
            Get Field-Fit Assessment
          </Link>
          <button
            ref={mobileMenuButtonRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
            aria-label="Toggle menu"
            onClick={() => setOpen((s) => !s)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg xl:hidden ${
              scrolled
                ? "bg-[color:var(--surface-muted)] text-[color:var(--color-primary)]"
                : "bg-white/15 text-white ring-1 ring-white/30 backdrop-blur"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
              focusable="false"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={mobileMenuPanelRef}
        id="mobile-nav-panel"
        aria-hidden={!open}
        className={`xl:hidden grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none motion-reduce:duration-0 ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden border-t border-[color:var(--border)] bg-[color:var(--background)]">
          <div
            className={`container-page flex flex-col gap-1 py-3 transition-opacity duration-300 ease-out motion-reduce:transition-none motion-reduce:duration-0 ${
              open ? "opacity-100 delay-75 motion-reduce:delay-0" : "opacity-0"
            }`}
            inert={open ? undefined : true}
          >
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-sm font-medium text-[color:var(--fg-muted)] hover:bg-[color:var(--surface-muted)] hover:text-[color:var(--color-primary)]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#lead-form"
              onClick={() => setOpen(false)}
              className="btn btn-accent mt-2 w-full"
              aria-label="Request my field-fit assessment"
            >
              Get Field-Fit Assessment
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

