import type { Metadata } from "next";
import Link from "next/link";

import { CtaButton } from "@/components/cta-lead-popup";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { cropApplicatorServiceAreas } from "@/lib/service-areas";

const applicationMethods = [
  {
    name: "Drone spraying",
    detail:
      "A fit for wet fields, field edges, turn rows, patches, and timing-critical acres where controlled aerial placement is more practical than driving a rig.",
  },
  {
    name: "Ground rig spraying",
    detail:
      "Still a strong choice for large, dry, accessible blocks. We compare every request against rut risk, gate access, crop stage, and trafficability.",
  },
  {
    name: "Crop dusting",
    detail:
      "Traditional aerial application can be the right answer for broad acre blocks that need fast coverage and have room for airplane application.",
  },
] as const;

const cropApplicatorFaq = [
  {
    question: "Do you provide crop applicator service in my county?",
    answer:
      "North Alabama Drone Applicators is building routes for Madison, Limestone, Morgan, Cullman, and Lawrence Counties in Alabama. Share your county, crop, acreage, target pass, and timing window so we can review fit.",
  },
  {
    question: "Is this crop dusting or ground rig spraying?",
    answer:
      "Our managed service is drone spraying and spreading. Farmers often find us while searching for crop dusting, aerial applicators, or ground rig spraying because we help compare those options and decide where drone application belongs.",
  },
  {
    question: "What crop applications can you review?",
    answer:
      "We review herbicide, fungicide, insecticide, foliar nutrient, cover crop seed, dry fertilizer, lime, pasture overseeding, and similar farm application requests when the product label and field conditions support the method.",
  },
] as const;

export const metadata: Metadata = {
  title: "Crop Applicators in North Alabama | Drone, Crop Dusting & Ground Rig Spraying",
  description:
    "Crop applicator help for Madison, Limestone, Morgan, Cullman, and Lawrence County, AL farmers comparing drone spraying, crop dusting, and ground rig spraying.",
  alternates: {
    canonical: "/crop-applicators",
  },
  keywords: [
    "crop applicators North Alabama",
    "crop applicator Madison County AL",
    "crop applicator Limestone County AL",
    "crop applicator Morgan County AL",
    "crop applicator Cullman County AL",
    "crop applicator Lawrence County AL",
    "crop dusting North Alabama",
    "ground rig spraying Alabama",
    "drone spraying Alabama farms",
  ],
  openGraph: {
    title: "Crop Applicators for North Alabama Farms",
    description:
      "Compare drone spraying, crop dusting, and ground rig spraying for crop acres in Madison, Limestone, Morgan, Cullman, and Lawrence Counties.",
    url: "/crop-applicators",
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
        alt: "North Alabama Drone Applicators crop applicator service area",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crop Applicators in North Alabama",
    description:
      "Drone spraying, crop dusting, and ground rig spraying guidance for five North Alabama counties.",
    images: ["/og-image.png"],
  },
};

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
      ],
    },
    {
      "@type": "Service",
      name: "Crop Applicators in North Alabama",
      serviceType: "Agricultural crop application",
      provider: {
        "@type": "LocalBusiness",
        name: "North Alabama Drone Applicators",
        url: "https://www.northaldroneapplicators.com/",
      },
      areaServed: cropApplicatorServiceAreas.map((area) => ({
        "@type": "AdministrativeArea",
        name: area.label,
      })),
      description:
        "Managed agricultural drone spraying and spreading for farmers comparing crop dusting, ground rig spraying, and drone application in North Alabama.",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Crop application methods reviewed",
        itemListElement: applicationMethods.map((method) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: method.name,
            description: method.detail,
          },
        })),
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: cropApplicatorFaq.map((item) => ({
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

export default function CropApplicatorsPage() {
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
              <span>Crop Applicators</span>
            </nav>
            <span className="eyebrow eyebrow-dot mt-6 border-white/20 bg-white/10 text-white backdrop-blur">
              Crop applicators in North Alabama
            </span>
            <h1 className="mt-5 font-heading text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
              Crop applicator help when you are comparing drone spraying, crop dusting, and ground rigs.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#e8e8e8]">
              Farmers searching for crop applicators in Madison, Limestone, Morgan, Cullman, and Lawrence Counties
              need a practical answer: what can get the pass done on this field, with this crop, in this weather
              window? We review your application need and explain where drone application fits beside ground rig
              spraying or traditional aerial crop dusting.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaButton
                data-track="crop-applicators-hero-cta"
                aria-label="Request crop applicator field-fit assessment"
                className="btn btn-accent"
              >
                Request Crop Applicator Review
              </CtaButton>
              <Link
                href="#service-area"
                className="btn btn-outline"
              >
                See Counties Served
              </Link>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="rounded-[var(--radius-xl)] border border-white/20 bg-white/10 p-6 shadow-[var(--shadow-lg)] backdrop-blur">
              <p className="font-heading text-2xl font-semibold">Search terms this page answers</p>
              <ul className="mt-6 space-y-3 text-sm text-[#e9f0dd]">
                {[
                  "crop applicators near me",
                  "crop dusting in North Alabama",
                  "ground rig spraying in my county",
                  "drone spraying for crops",
                  "aerial applicators for wet fields and tight windows",
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

      <section className="section-pad bg-white">
        <div className="container-page">
          <RevealOnScroll>
            <span className="eyebrow eyebrow-dot">Application options</span>
            <h2 className="mt-4 max-w-3xl font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl">
              The best crop applicator method depends on field conditions.
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-[color:var(--fg-muted)]">
              We do not pretend one tool wins every acre. A farmer may need a ground rig, a crop duster, a drone, or a
              combination depending on label requirements, acreage, access, weather, crop stage, and nearby buffers.
            </p>
          </RevealOnScroll>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {applicationMethods.map((method) => (
              <RevealOnScroll
                key={method.name}
                className="rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-[color:var(--surface-muted)] p-6"
              >
                <h3 className="font-heading text-xl font-semibold text-[color:var(--color-primary)]">{method.name}</h3>
                <p className="mt-3 text-sm leading-6 text-[color:var(--fg-muted)]">{method.detail}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section
        id="service-area"
        className="section-pad topo-bg grain"
      >
        <div className="container-page">
          <RevealOnScroll>
            <span className="eyebrow eyebrow-dot">County landing pages</span>
            <h2 className="mt-4 max-w-3xl font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl">
              Crop applicator service area pages for North Alabama farmers.
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-[color:var(--fg-muted)]">
              Each county page is written for farmers searching locally for crop applicators, crop dusting, aerial
              applicators, ground rig spraying, or drone spraying.
            </p>
          </RevealOnScroll>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cropApplicatorServiceAreas.map((area) => (
              <RevealOnScroll
                key={area.slug}
                className="flex h-full flex-col rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-white p-6 shadow-[var(--shadow-sm)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--fg-subtle)]">
                  {area.searchFocus}
                </p>
                <h3 className="mt-3 font-heading text-2xl font-semibold text-[color:var(--color-primary)]">
                  {area.label}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[color:var(--fg-muted)]">
                  Serving farms near {area.nearby}. We review {area.fieldContext}.
                </p>
                <Link
                  href={`/crop-applicators/${area.slug}`}
                  className="mt-6 inline-flex font-semibold text-[color:var(--color-primary)] hover:text-[color:var(--color-accent)]"
                >
                  View {area.county} County crop applicator page
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[color:var(--background)]">
        <div className="container-page max-w-4xl">
          <RevealOnScroll>
            <span className="eyebrow eyebrow-dot">Crop applicator FAQ</span>
            <h2 className="mt-4 font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl">
              Questions from farmers searching for applicators.
            </h2>
          </RevealOnScroll>
          <div className="mt-10 space-y-4">
            {cropApplicatorFaq.map((item) => (
              <RevealOnScroll
                key={item.question}
                className="rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-white p-6 shadow-[var(--shadow-sm)]"
              >
                <h3 className="font-heading text-xl font-semibold text-[color:var(--color-primary)]">{item.question}</h3>
                <p className="mt-3 text-[color:var(--fg-muted)]">{item.answer}</p>
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
              Tell us your county, crop, acreage, and target pass.
            </h2>
            <p className="mt-4 max-w-2xl text-[#d3ebc9]">
              We will follow up with a practical read on drone spraying, ground rig spraying, crop dusting, or a combined
              approach for your acres.
            </p>
          </div>
          <CtaButton
            data-track="crop-applicators-final-cta"
            aria-label="Request crop applicator assessment"
            className="btn btn-accent shrink-0"
          >
            Request My Assessment
          </CtaButton>
        </div>
      </section>
    </div>
  );
}
