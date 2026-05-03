import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaButton } from "@/components/cta-lead-popup";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd } from "@/components/json-ld";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { getLocalDroneServicePage, localDroneServicePages } from "@/lib/service-areas";

type PageProps = {
  params: Promise<{
    service: string;
  }>;
};

const reviewFactors = [
  "Crop stage, acreage, and target product",
  "Label requirements, weather, buffers, and drift risk",
  "Field access, gates, tree lines, ditches, waterways, and power lines",
  "Whether drone work should stand alone or support a ground rig or crop duster",
] as const;

export function generateStaticParams() {
  return localDroneServicePages.map((page) => ({
    service: page.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service } = await params;
  const page = getLocalDroneServicePage(service);

  if (!page) {
    return {};
  }

  return {
    title: `${page.title} | North Alabama Drone Applicators`,
    description: page.metaDescription,
    alternates: {
      canonical: `/local-services/${page.slug}`,
    },
    keywords: [
      page.title,
      `${page.serviceType} ${page.county} County AL`,
      `agricultural drone services ${page.county} County Alabama`,
      `drone application ${page.county} County AL`,
      `farm drone services ${page.county} County AL`,
    ],
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url: `/local-services/${page.slug}`,
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
          alt: `${page.title} service area`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.metaDescription,
      images: ["/og-image.png"],
    },
  };
}

export default async function LocalServicePage({ params }: PageProps) {
  const { service } = await params;
  const page = getLocalDroneServicePage(service);

  if (!page) {
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
            name: page.title,
            item: `https://www.northaldroneapplicators.com/local-services/${page.slug}`,
          },
        ],
      },
      {
        "@type": "Service",
        name: page.title,
        serviceType: page.serviceType,
        provider: {
          "@type": "LocalBusiness",
          name: "North Alabama Drone Applicators",
          url: "https://www.northaldroneapplicators.com/",
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: `${page.county} County, Alabama`,
        },
        description: page.metaDescription,
      },
      {
        "@type": "FAQPage",
        mainEntity: [...page.countyFaq].map((item) => ({
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
              <span>{page.title}</span>
            </nav>
            <span className="eyebrow eyebrow-dot mt-6 border-white/20 bg-white/10 text-white backdrop-blur">
              {page.serviceType} in {page.county} County
            </span>
            <h1 className="mt-5 font-heading text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
              {page.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#e8e8e8]">{page.leadParagraph}</p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/85">
              This page focuses on {page.serviceType.toLowerCase()}. North Alabama Drone Applicators still confirms crop,
              field condition, product plan, labels, and weather before recommending any drone pass—or redirecting you to
              a rig or airplane when that is the stewarded choice.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaButton
                data-track={`local-service-${page.slug}-hero-cta`}
                aria-label={page.cta}
                className="btn btn-accent"
              >
                {page.cta}
              </CtaButton>
              <Link
                href="#local-fit"
                className="btn btn-outline"
              >
                See towns and crops
              </Link>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="rounded-[var(--radius-xl)] border border-white/20 bg-white/10 p-6 shadow-[var(--shadow-lg)] backdrop-blur">
              <p className="font-heading text-2xl font-semibold">Local page focus</p>
              <ul className="mt-6 space-y-3 text-sm text-[#e9f0dd]">
                {[
                  page.title,
                  `${page.serviceType} ${page.county} County AL`,
                  `Agricultural drone services ${page.county} County Alabama`,
                  `Farm drone application near ${page.towns[0]}`,
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
        id="local-fit"
        className="section-pad bg-white"
      >
        <div className="container-page grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <RevealOnScroll>
            <span className="eyebrow eyebrow-dot">{page.county} County towns</span>
            <h2 className="mt-4 font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl">
              Local communities around these reviews.
            </h2>
            <p className="mt-4 text-lg text-[color:var(--fg-muted)]">
              Typical routing conversations reference farms near{' '}
              <span className="font-medium text-[color:var(--foreground)]">{page.nearby}</span>.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <ul className="flex flex-wrap gap-2">
              {page.towns.map((town) => (
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
            <span className="eyebrow eyebrow-dot">{page.county} County crops</span>
            <h3 className="mt-4 font-heading text-2xl font-semibold text-[color:var(--color-primary)] sm:text-3xl">
              Built around common local crops.
            </h3>
            <p className="mt-4 text-lg text-[color:var(--fg-muted)]">
              Common crop reviews include {page.crops.slice(0, -1).join(", ")}, and {page.crops.at(-1)}. Every request is
              checked against field access, weather, product fit, and whether the application belongs on a drone.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="grid gap-3 sm:grid-cols-2">
              {page.crops.map((crop) => (
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
              Why {page.county} County acres may need a drone option.
            </h2>
            <ul className="mt-6 space-y-3">
              {page.fieldConditions.map((condition) => (
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
            <span className="eyebrow eyebrow-dot">Common use cases</span>
            <h2 className="mt-4 font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl">
              Application requests we can review.
            </h2>
            <ul className="mt-6 space-y-3">
              {page.useCases.map((useCase) => (
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

      <section className="section-pad bg-white">
        <div className="container-page">
          <RevealOnScroll>
            <span className="eyebrow eyebrow-dot">Field-fit review</span>
            <h2 className="mt-4 max-w-3xl font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl">
              Clear next steps before product ever leaves the ground.
            </h2>
          </RevealOnScroll>
          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            {reviewFactors.map((factor) => (
              <RevealOnScroll
                key={factor}
                className="rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-[color:var(--surface-muted)] p-6"
              >
                <p className="text-sm font-medium leading-6 text-[color:var(--foreground)]">{factor}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section
        id="county-faq"
        className="section-pad topo-bg grain"
      >
        <div className="container-page max-w-3xl">
          <RevealOnScroll>
            <span className="eyebrow eyebrow-dot">{page.county} County FAQ</span>
            <h2 className="mt-4 font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl">
              Local questions about {page.serviceType.toLowerCase()}.
            </h2>
            <p className="mt-4 text-lg text-[color:var(--fg-muted)]">
              Same county-focused answers as our crop applicator pages—tailored to how {page.county} County farms actually
              run.
            </p>
          </RevealOnScroll>
          <div className="mt-10 rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-white p-2 shadow-[var(--shadow-sm)]">
            <FaqAccordion items={[...page.countyFaq]} />
          </div>
        </div>
      </section>

      <section className="section-pad bg-[color:var(--color-primary)] text-white">
        <div className="container-page flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <span className="eyebrow eyebrow-dot border-white/20 bg-white/10 text-white backdrop-blur">
              {page.county} County CTA
            </span>
            <h2 className="mt-4 font-heading text-3xl font-semibold sm:text-4xl">
              Ask whether {page.serviceType.toLowerCase()} fits your field.
            </h2>
            <p className="mt-4 max-w-2xl text-[#d3ebc9]">
              Share your county, crop, acreage, target pass, product plan, and timing pressure. We will follow up with a
              practical recommendation for your field.
            </p>
          </div>
          <CtaButton
            data-track={`local-service-${page.slug}-final-cta`}
            aria-label={page.cta}
            className="btn btn-accent shrink-0"
          >
            {page.cta}
          </CtaButton>
        </div>
      </section>
    </div>
  );
}
