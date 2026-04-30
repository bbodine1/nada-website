import type { Metadata } from "next";
import Link from "next/link";

import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { localDroneServicePages } from "@/lib/service-areas";

export const metadata: Metadata = {
  title: "Local Agricultural Drone Service Pages | North Alabama",
  description:
    "County-specific agricultural drone service pages for Madison, Limestone, Morgan, Cullman, and Lawrence County farms in North Alabama.",
  alternates: {
    canonical: "/local-services",
  },
};

export default function LocalServicesIndexPage() {
  return (
    <div className="text-[color:var(--foreground)]">
      <section className="relative overflow-hidden bg-[color:var(--color-primary)] pt-28 text-white lg:pt-36">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(760px 320px at 78% 18%, rgba(212,160,23,0.28), transparent 55%), radial-gradient(900px 380px at 10% 88%, rgba(255,255,255,0.12), transparent 60%)",
          }}
        />
        <div className="container-page relative pb-16 pt-10 lg:pb-24">
          <RevealOnScroll>
            <nav
              aria-label="Breadcrumb"
              className="text-sm text-white/70"
            >
              <Link
                href="/"
                className="hover:text-white"
              >
                Home
              </Link>
              <span aria-hidden="true"> / </span>
              <span>Local Services</span>
            </nav>
            <span className="eyebrow eyebrow-dot mt-6 border-white/20 bg-white/10 text-white backdrop-blur">
              North Alabama counties
            </span>
            <h1 className="mt-5 max-w-4xl font-heading text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
              Local agricultural drone service pages for North Alabama farms.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#e8e8e8]">
              Choose your county to review crops, local field conditions, common drone spray and spread use cases, and
              the next step for a field-fit assessment.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {localDroneServicePages.map((page) => (
              <RevealOnScroll
                key={page.slug}
                className="rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-[color:var(--surface-muted)] p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-accent)]">
                  {page.county} County
                </p>
                <h2 className="mt-3 font-heading text-2xl font-semibold text-[color:var(--color-primary)]">
                  {page.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[color:var(--fg-muted)]">
                  {page.metaDescription}
                </p>
                <Link
                  href={`/local-services/${page.slug}`}
                  className="mt-5 inline-flex text-sm font-semibold text-[color:var(--color-primary)] hover:text-[color:var(--color-accent)]"
                >
                  View local page
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
