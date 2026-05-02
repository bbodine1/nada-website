"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/crop-applicators", label: "Crop Applicators" },
  { href: "/herbicide-application", label: "Herbicide" },
  { href: "/news", label: "News" },
  { href: "/#explainer", label: "How It Works" },
  { href: "/#testimonials", label: "Growers" },
  { href: "/#faq", label: "FAQ" },
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

        <nav className="hidden items-center gap-5 xl:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap text-sm font-medium transition-colors ${
                scrolled
                  ? "text-[color:var(--fg-muted)] hover:text-[color:var(--color-primary)]"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
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
            type="button"
            aria-expanded={open}
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

      {open && (
        <div className="border-t border-[color:var(--border)] bg-[color:var(--background)] xl:hidden">
          <div className="container-page flex flex-col gap-1 py-3">
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
      )}
    </header>
  );
}

