import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaButton } from "@/components/cta-lead-popup";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd } from "@/components/json-ld";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { cropApplicatorServiceAreas, getCropApplicatorServiceArea } from "@/lib/service-areas";

type PageProps = {
  params: Promise<{
    county: string;
  }>;
};

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

  const desc = area.cropApplicatorMetaDescription;

  return {
    title: `Crop Applicators in ${area.label} | Drone, Crop Dusting & Ground Rig Spraying`,
    description: desc,
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
      description: desc,
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
      description: desc,
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

  const countyFaqItems = [...area.countyFaq];

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
        description: area.cropApplicatorMetaDescription,
      },
      {
        "@type": "FAQPage",
        mainEntity: countyFaqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="text-[color:var(--foreground)]">
      <JsonLd data={jsonLd} />

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
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#e8e8e8]">{area.leadParagraph}</p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/85">
              If a ground rig or crop duster is the better tool for your acres, we will say so—we match the applicator to
              the field, not the other way around.
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
                href="#local-detail"
                className="btn btn-outline"
              >
                Local towns, crops, and conditions
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
        id="local-detail"
        className="section-pad bg-white"
      >
        <div className="container-page grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <RevealOnScroll>
            <span className="eyebrow eyebrow-dot">{area.county} County towns</span>
            <h2 className="mt-4 font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl">
              Local communities we route conversations around.
            </h2>
            <p className="mt-4 text-lg text-[color:var(--fg-muted)]">
              Farms across {area.county} County often benchmark from{' '}
              <span className="font-medium text-[color:var(--foreground)]">{area.nearby}</span>.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <ul className="flex flex-wrap gap-2">
              {area.towns.map((town) => (
                <li
                  key={town}
                  className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface-muted)] px-4 py-2 text-sm font-medium text-[color:var(--color-primary)]"
                >
                  {town}
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        </div>

        <div className="container-page mt-14 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-x-12">
          <RevealOnScroll>
            <span className="eyebrow eyebrow-dot">{area.county} County crops</span>
            <h3 className="mt-4 font-heading text-2xl font-semibold text-[color:var(--color-primary)] sm:text-3xl">
              Common crops on field-fit reviews.
            </h3>
            <p className="mt-4 text-lg text-[color:var(--fg-muted)]">
              Typical conversations include {area.crops.slice(0, -1).join(", ")}, and {area.crops.at(-1)}—still checked
              field-by-field for stage, labels, weather, and access.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="grid gap-3 sm:grid-cols-2">
              {area.crops.map((crop) => (
                <div
                  key={crop}
                  className="rounded-[var(--radius)] border border-[color:var(--border)] bg-[color:var(--surface-muted)] p-4 font-medium capitalize text-[color:var(--color-primary)]"
                >
                  {crop}
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-pad topo-bg grain">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <RevealOnScroll>
            <span className="eyebrow eyebrow-dot">Local field conditions</span>
            <h2 className="mt-4 font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl">
              Why {area.county} County acres sometimes need a different applicator plan.
            </h2>
            <ul className="mt-6 space-y-3">
              {area.fieldConditions.map((condition) => (
                <li
                  key={condition}
                  className="rounded-[var(--radius)] border border-[color:var(--border)] bg-white p-4 text-sm leading-6 text-[color:var(--fg-muted)] shadow-[var(--shadow-sm)]"
                >
                  {condition}
                </li>
              ))}
            </ul>
          </RevealOnScroll>

          <RevealOnScroll>
            <span className="eyebrow eyebrow-dot">County-specific use cases</span>
            <h2 className="mt-4 font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl">
              Situations we discuss with {area.county} County growers.
            </h2>
            <ul className="mt-6 space-y-3">
              {area.useCases.map((useCase) => (
                <li
                  key={useCase}
                  className="flex items-start gap-3 rounded-[var(--radius)] border border-[color:var(--border)] bg-white p-4 text-sm leading-6 text-[color:var(--foreground)] shadow-[var(--shadow-sm)]"
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
                  <span>{useCase}</span>
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        </div>
      </section>

      <section
        id="field-fit"
        className="section-pad bg-white"
      >
        <div className="container-page grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <RevealOnScroll>
            <span className="eyebrow eyebrow-dot">{area.county} County checklist</span>
            <h2 className="mt-4 font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl">
              Requests we evaluate before recommending drone, rig, or airplane work.
            </h2>
            <p className="mt-4 text-lg text-[color:var(--fg-muted)]">
              We look at crop stage, product label, acres, weather, access, buffers, and timing before recommending any
              application method.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <ul className="grid gap-3">
              {area.applicationChecklist.map((need) => (
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
            <p className="mt-4 max-w-3xl text-lg text-[color:var(--fg-muted)]">{area.methodComparisonIntro}</p>
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

      <section
        id="county-faq"
        className="section-pad bg-white"
      >
        <div className="container-page max-w-3xl">
          <RevealOnScroll>
            <span className="eyebrow eyebrow-dot">{area.county} County FAQ</span>
            <h2 className="mt-4 font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl">
              Questions we hear from {area.county} County farmers.
            </h2>
            <p className="mt-4 text-lg text-[color:var(--fg-muted)]">
              Answers are written for local context—still grounded in labels, weather, and stewarded application decisions.
            </p>
          </RevealOnScroll>
          <div className="mt-10">
            <FaqAccordion items={countyFaqItems} />
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
