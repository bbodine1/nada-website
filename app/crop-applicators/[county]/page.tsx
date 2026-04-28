import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaButton } from "@/components/cta-lead-popup";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { cropApplicatorServiceAreas, getCropApplicatorServiceArea } from "@/lib/service-areas";

type PageProps = {
  params: Promise<{
    county: string;
  }>;
};

const applicationNeeds = [
  "Herbicide, fungicide, insecticide, or foliar nutrient spray timing",
  "Wet ground, soft headlands, end rows, patches, or field edges a rig should not rut",
  "Broad-acre work where crop dusting or a ground rig may still be the stronger option",
  "Cover crop seed, dry fertilizer, lime, or pasture overseeding where drone spreading fits",
] as const;

const methodComparison = [
  {
    method: "Ground rig spraying",
    fit: "Dry, accessible fields with enough room for equipment traffic and turns.",
  },
  {
    method: "Crop dusting / airplane application",
    fit: "Large, open acre blocks where traditional aerial coverage is efficient.",
  },
  {
    method: "Drone crop application",
    fit: "Wet areas, small blocks, irregular edges, buffers, patches, and timing windows where a nimble aerial pass helps.",
  },
] as const;

export function generateStaticParams() {
  return cropApplicatorServiceAreas.map((area) => ({
    county: area.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { county } = await params;
  const area = getCropApplicatorServiceArea(county);

  if (!area) {
    return {};
  }

  return {
    title: `Crop Applicators in ${area.label} | Drone, Crop Dusting & Ground Rig Spraying`,
    description: `${area.label} crop applicator help for farmers comparing drone spraying, crop dusting, and ground rig spraying. Request a practical field-fit review.`,
    alternates: {
      canonical: `/crop-applicators/${area.slug}`,
    },
    keywords: [
      `crop applicators ${area.label}`,
      `crop applicator ${area.county} County AL`,
      `crop dusting ${area.county} County Alabama`,
      `ground rig spraying ${area.county} County AL`,
      `drone spraying ${area.county} County AL`,
      `aerial applicator ${area.county} County Alabama`,
    ],
    openGraph: {
      title: `Crop Applicators in ${area.label}`,
      description: `Drone spraying, crop dusting, and ground rig spraying guidance for ${area.label} farmers.`,
      url: `/crop-applicators/${area.slug}`,
      siteName: "North Alabama Drone Applicators",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          secureUrl: "/og-image.png",
          type: "image/png",
          width: 1200,
          height: 630,
          alt: `North Alabama Drone Applicators crop applicator service in ${area.label}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Crop Applicators in ${area.label}`,
      description: `Compare drone spraying, crop dusting, and ground rig spraying for ${area.label} farms.`,
      images: ["/og-image.png"],
    },
  };
}

export default async function CountyCropApplicatorPage({ params }: PageProps) {
  const { county } = await params;
  const area = getCropApplicatorServiceArea(county);

  if (!area) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.northaldroneapplicators.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Crop Applicators",
            item: "https://www.northaldroneapplicators.com/crop-applicators",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: area.label,
            item: `https://www.northaldroneapplicators.com/crop-applicators/${area.slug}`,
          },
        ],
      },
      {
        "@type": "Service",
        name: `Crop Applicators in ${area.label}`,
        serviceType: "Agricultural crop application",
        provider: {
          "@type": "LocalBusiness",
          name: "North Alabama Drone Applicators",
          url: "https://www.northaldroneapplicators.com/",
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: area.label,
        },
        description: `Drone spraying and spreading field-fit reviews for ${area.label} farmers comparing crop dusting, ground rig spraying, and drone application.`,
      },
    ],
  };

  return (
    <div className="text-[color:var(--foreground)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="relative overflow-hidden bg-[color:var(--color-primary)] pt-28 text-white lg:pt-36">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(760px 320px at 78% 18%, rgba(212,160,23,0.28), transparent 55%), radial-gradient(900px 380px at 10% 88%, rgba(255,255,255,0.12), transparent 60%)",
          }}
        />
        <div className="container-page relative grid items-center gap-12 pb-16 pt-10 lg:grid-cols-[1.08fr_0.92fr] lg:pb-24">
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
              <Link
                href="/crop-applicators"
                className="hover:text-white"
              >
                Crop Applicators
              </Link>
              <span aria-hidden="true"> / </span>
              <span>{area.label}</span>
            </nav>
            <span className="eyebrow eyebrow-dot mt-6 border-white/20 bg-white/10 text-white backdrop-blur">
              {area.searchFocus}
            </span>
            <h1 className="mt-5 font-heading text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
              Crop applicators in {area.label} for drone spraying, crop dusting, and ground rig decisions.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#e8e8e8]">
              North Alabama Drone Applicators helps {area.county} County farmers near {area.nearby} decide where drone
              spraying or spreading fits the job. If a ground rig or crop duster is the better tool for the field, we
              will say so.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaButton
                data-track={`county-crop-applicator-${area.slug}-cta`}
                aria-label={`Request crop applicator review for ${area.label}`}
                className="btn btn-accent"
              >
                Request {area.county} County Review
              </CtaButton>
              <Link
                href="#field-fit"
                className="btn btn-outline"
              >
                See Field-Fit Factors
              </Link>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="rounded-[var(--radius-xl)] border border-white/20 bg-white/10 p-6 shadow-[var(--shadow-lg)] backdrop-blur">
              <p className="font-heading text-2xl font-semibold">Local searches this page supports</p>
              <ul className="mt-6 space-y-3 text-sm text-[#e9f0dd]">
                {[
                  `crop applicators ${area.label}`,
                  `crop dusting ${area.county} County Alabama`,
                  `ground rig spraying ${area.county} County AL`,
                  `drone spraying ${area.county} County AL`,
                  `aerial applicator ${area.county} County Alabama`,
                ].map((term) => (
                  <li
                    key={term}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1 h-2 w-2 rounded-full bg-[color:var(--color-accent)]" />
                    <span>{term}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section
        id="field-fit"
        className="section-pad bg-white"
      >
        <div className="container-page grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <RevealOnScroll>
            <span className="eyebrow eyebrow-dot">{area.county} County field fit</span>
            <h2 className="mt-4 font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl">
              Application advice for {area.fieldContext}.
            </h2>
            <p className="mt-4 text-lg text-[color:var(--fg-muted)]">
              {area.routeNote} We look at crop stage, product label, acres, weather, access, buffers, and timing before
              recommending any application method.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <ul className="grid gap-3">
              {applicationNeeds.map((need) => (
                <li
                  key={need}
                  className="flex items-start gap-3 rounded-[var(--radius)] border border-[color:var(--border)] bg-[color:var(--surface-muted)] p-4 text-sm text-[color:var(--foreground)]"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-primary-100)] text-[color:var(--color-primary)]">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      className="h-3 w-3"
                      fill="currentColor"
                    >
                      <path d="M6.5 11.5L3 8l1.4-1.4 2.1 2.1L11.6 3.5 13 4.9z" />
                    </svg>
                  </span>
                  <span>{need}</span>
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-pad topo-bg grain">
        <div className="container-page">
          <RevealOnScroll>
            <span className="eyebrow eyebrow-dot">Compare applicator methods</span>
            <h2 className="mt-4 max-w-3xl font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl">
              Match the applicator to the job, not the other way around.
            </h2>
          </RevealOnScroll>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {methodComparison.map((item) => (
              <RevealOnScroll
                key={item.method}
                className="rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-white p-6 shadow-[var(--shadow-sm)]"
              >
                <h3 className="font-heading text-xl font-semibold text-[color:var(--color-primary)]">{item.method}</h3>
                <p className="mt-3 text-sm leading-6 text-[color:var(--fg-muted)]">{item.fit}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[color:var(--color-primary)] text-white">
        <div className="container-page flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <span className="eyebrow eyebrow-dot border-white/20 bg-white/10 text-white backdrop-blur">Next step</span>
            <h2 className="mt-4 font-heading text-3xl font-semibold sm:text-4xl">
              Ask about crop application in {area.label}.
            </h2>
            <p className="mt-4 max-w-2xl text-[#d3ebc9]">
              Share your crop, acres, location, target product, and timing pressure. We will follow up with practical
              guidance on drone spraying, crop dusting, ground rig spraying, or a combined plan.
            </p>
          </div>
          <CtaButton
            data-track={`county-crop-applicator-final-${area.slug}`}
            aria-label={`Request ${area.label} crop application assessment`}
            className="btn btn-accent shrink-0"
          >
            Request My Assessment
          </CtaButton>
        </div>
      </section>
    </div>
  );
}
