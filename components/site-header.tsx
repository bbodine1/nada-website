"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#explainer", label: "How It Works" },
  { href: "#testimonials", label: "Growers" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[color:var(--border)] bg-[color:var(--background)]/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="#top"
          className="group flex items-center gap-2.5"
          aria-label="North Alabama Drone Applicators"
        >
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
              scrolled
                ? "bg-[color:var(--color-primary)] text-white"
                : "bg-white/15 text-white ring-1 ring-white/30 backdrop-blur"
            }`}
          >
            <Monogram />
          </span>
          <span
            className={`flex flex-col leading-tight ${
              scrolled ? "text-[color:var(--color-primary)]" : "text-white"
            }`}
          >
            <span className="font-heading text-base font-semibold tracking-tight">
              North Alabama
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] opacity-80">
              Drone Applicators
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                scrolled
                  ? "text-[color:var(--fg-muted)] hover:text-[color:var(--color-primary)]"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#lead-form"
            data-track="header-cta"
            aria-label="Reserve my spot on the interest list"
            className="btn btn-accent hidden px-4 py-2 text-sm md:inline-flex"
          >
            Reserve My Spot
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((s) => !s)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg md:hidden ${
              scrolled
                ? "bg-[color:var(--surface-muted)] text-[color:var(--color-primary)]"
                : "bg-white/15 text-white ring-1 ring-white/30 backdrop-blur"
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[color:var(--border)] bg-[color:var(--background)] md:hidden">
          <div className="container-page flex flex-col gap-1 py-3">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-sm font-medium text-[color:var(--fg-muted)] hover:bg-[color:var(--surface-muted)] hover:text-[color:var(--color-primary)]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#lead-form"
              onClick={() => setOpen(false)}
              className="btn btn-accent mt-2 w-full"
              aria-label="Reserve my spot on the interest list"
            >
              Reserve My Spot
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Monogram() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 2.5c3 3.5 5 6.3 5 9.5a5 5 0 1 1-10 0c0-3.2 2-6 5-9.5Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M12 13.5c1.8 0 3.2-1.4 3.2-3.2"
        stroke="#fff"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.6"
      />
      <circle cx="18.5" cy="5.5" r="1.4" fill="#d4a017" />
    </svg>
  );
}
