import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CtaButton } from "@/components/cta-lead-popup";
import { RevealOnScroll } from "@/components/reveal-on-scroll";

const serviceArea = ["Madison", "Limestone", "Morgan", "Cullman", "Lawrence"] as const;

const methodCards = [
  {
    name: "Ground rig spraying",
    bestFor: "Large, dry fields where equipment can travel without leaving ruts.",
    watchOut: "Wet soil, narrow gates, end rows, terraces, and irregular patches can delay the pass or add compaction.",
  },
  {
    name: "Crop dusting / airplane application",
    bestFor: "Broad acres that need fast coverage and have enough scale for a traditional aerial route.",
    watchOut: "Small fields, tree lines, power lines, and patch work can make it harder to place product only where needed.",
  },
  {
    name: "Drone herbicide application",
    bestFor: "Wet spots, field edges, pasture strips, irregular blocks, and timing-critical acres where a rig or plane is not the best fit.",
    watchOut: "Every herbicide still has to match the label, crop stage, weather, buffer requirements, and field conditions.",
  },
] as const;

const applicationFactors = [
  "Target weed pressure and crop stage",
  "Product label requirements and carrier volume",
  "Wind, temperature inversion risk, humidity, and rainfast interval",
  "Soil trafficability for ground equipment",
  "Sensitive crops, waterways, homes, tree lines, and other buffers",
  "Field shape, acreage, gates, terraces, ditches, and power lines",
] as const;

const faqItems = [
  {
    question: "What are the main ways to apply herbicide to crops?",
    answer:
      "Most farmers compare ground rig spraying, traditional aerial crop dusting, and drone herbicide application. The right choice depends on acreage, soil conditions, field shape, product label, weather window, and how precisely the pass needs to be placed.",
  },
  {
    question: "Can a drone apply herbicide instead of a ground rig?",
    answer:
      "In many fields, yes, when the herbicide label and conditions support aerial application. Drones are often strongest when the rig would rut wet ground, cannot turn cleanly, or only part of the field needs treatment.",
  },
  {
    question: "Is crop dusting better than drone spraying for herbicide?",
    answer:
      "Traditional crop dusting is usually stronger for large, uniform acre blocks that need very fast coverage. Drone spraying is often more practical for smaller fields, patches, field edges, wet holes, and irregular acres where a plane or ground rig is not ideal.",
  },
  {
    question: "Do you help decide which herbicide application method fits my farm?",
    answer:
      "Yes. North Alabama Drone Applicators reviews crop, target pass, acreage, product plan, field access, and timing pressure before recommending drone application, ground rig spraying, traditional aerial, or a combination.",
  },
] as const;

export const metadata: Metadata = {
  title: "Herbicide Application for Crops | Drone, Crop Dusting & Ground Rig Spraying",
  description:
    "Compare ways to apply herbicide to crops: drone spraying, crop dusting, and ground rig spraying for North Alabama farms. Request a field-fit assessment.",
  alternates: {
    canonical: "/herbicide-application",
  },
  keywords: [
    "ways to apply herbicide to crops",
    "herbicide application",
    "crop dusting herbicide",
    "ground rig spraying",
    "drone herbicide spraying",
    "agricultural spraying North Alabama",
  ],
  openGraph: {
    title: "Herbicide Application for Crops in North Alabama",
    description:
      "Compare drone herbicide spraying, crop dusting, and ground rig spraying for wet fields, tight windows, and row-crop acres.",
    url: "/herbicide-application",
    siteName: "North Alabama Drone Applicators",
    locale: "en_US",
    type: "article",
    images: [
      {
        url: "/og-image.png",
        secureUrl: "/og-image.png",
        type: "image/png",
        width: 1200,
        height: 630,
        alt: "North Alabama Drone Applicators herbicide application guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Herbicide Application for Crops",
    description: "Drone spraying, crop dusting, and ground rig spraying compared for North Alabama farms.",
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
          name: "Herbicide Application for Crops",
          item: "https://www.northaldroneapplicators.com/herbicide-application",
        },
      ],
    },
    {
      "@type": "Service",
      name: "Herbicide Application for Crops",
      serviceType: "Agricultural drone herbicide spraying",
      provider: {
        "@type": "LocalBusiness",
        name: "North Alabama Drone Applicators",
        url: "https://www.northaldroneapplicators.com/",
        areaServed: serviceArea.map((county) => `${county} County, Alabama`),
      },
      areaServed: serviceArea.map((county) => ({
        "@type": "AdministrativeArea",
        name: `${county} County, Alabama`,
      })),
      description:
        "Field-fit reviews and managed drone herbicide application for row-crop and pasture acres in North Alabama, compared against ground rig spraying and traditional crop dusting.",
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
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

export default function HerbicideApplicationPage() {
  return (
    <div className="text-[color:var(--foreground)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden bg-[color:var(--color-primary)] pt-28 text-white lg:pt-36">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(700px 320px at 75% 20%, rgba(212,160,23,0.28), transparent 55%), radial-gradient(900px 380px at 10% 85%, rgba(255,255,255,0.12), transparent 60%)",
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
              <span>Herbicide Application</span>
            </nav>
            <span className="eyebrow eyebrow-dot mt-6 border-white/20 bg-white/10 text-white backdrop-blur">
              Farmer herbicide application guide
            </span>
            <h1 className="mt-5 font-heading text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
              Ways to apply herbicide to crops when timing matters.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#e8e8e8]">
              If you are comparing ground rig spraying, crop dusting, and drone herbicide application, the best
              answer is field-specific. North Alabama Drone Applicators helps growers decide where aerial drone
              spraying fits the crop, the label, the weather window, and the economics.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaButton
                data-track="herbicide-hero-field-fit"
                aria-label="Request herbicide application field-fit assessment"
                className="btn btn-accent"
              >
                Request Herbicide Field-Fit
              </CtaButton>
              <Link
                href="#compare-methods"
                className="btn btn-outline"
              >
                Compare Application Methods
              </Link>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-white/20 bg-white/10 p-3 shadow-[var(--shadow-lg)] backdrop-blur">
              <Image
                src="/drone-spraying.jpg"
                alt="Agricultural drone spraying herbicide over crop rows"
                width={800}
                height={560}
                priority
                className="h-full w-full rounded-[calc(var(--radius-xl)_-_0.75rem)] object-cover"
              />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section
        id="compare-methods"
        className="section-pad bg-[color:var(--background)]"
      >
        <div className="container-page">
          <RevealOnScroll>
            <span className="eyebrow eyebrow-dot">Ground rig, crop dusting, or drone?</span>
            <h2 className="mt-4 max-w-3xl font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl">
              Match the herbicide application method to the field problem.
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-[color:var(--fg-muted)]">
              No single application method wins every acre. A good plan starts with crop safety, label compliance,
              weather, weed pressure, and whether the equipment can reach the target without creating another
              problem.
            </p>
          </RevealOnScroll>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {methodCards.map((method) => (
              <RevealOnScroll
                key={method.name}
                className="rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-white p-6 shadow-[var(--shadow-sm)]"
              >
                <h3 className="font-heading text-xl font-semibold text-[color:var(--color-primary)]">{method.name}</h3>
                <p className="mt-4 text-sm font-semibold text-[color:var(--foreground)]">Best fit</p>
                <p className="mt-2 text-sm text-[color:var(--fg-muted)]">{method.bestFor}</p>
                <p className="mt-5 text-sm font-semibold text-[color:var(--foreground)]">Watch-outs</p>
                <p className="mt-2 text-sm text-[color:var(--fg-muted)]">{method.watchOut}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad topo-bg grain">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <RevealOnScroll>
            <span className="eyebrow eyebrow-dot">Field-fit checklist</span>
            <h2 className="mt-4 font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl">
              What decides whether drone herbicide spraying makes sense?
            </h2>
            <p className="mt-4 text-[color:var(--fg-muted)]">
              We review the same practical details a farmer or applicator would weigh before putting any herbicide
              pass on the schedule. If a ground rig or crop duster is the better tool, we will say so.
            </p>
            <div className="mt-8">
              <CtaButton
                data-track="herbicide-checklist-cta"
                aria-label="Ask if drone herbicide spraying fits my fields"
                className="btn btn-accent"
              >
                Ask If My Fields Fit
              </CtaButton>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <ul className="grid gap-3 sm:grid-cols-2">
              {applicationFactors.map((factor) => (
                <li
                  key={factor}
                  className="flex items-start gap-3 rounded-[var(--radius)] border border-[color:var(--border)] bg-white p-4 text-sm text-[color:var(--foreground)] shadow-[var(--shadow-sm)]"
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
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <RevealOnScroll>
            <span className="eyebrow eyebrow-dot">North Alabama service area</span>
            <h2 className="mt-4 font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl">
              Herbicide application help for Tennessee Valley crop acres.
            </h2>
            <p className="mt-4 text-[color:var(--fg-muted)]">
              We are building county-by-county routing for Madison, Limestone, Morgan, Cullman, and Lawrence Counties. Tell
              us your crop, weed pressure, herbicide plan, acreage, and timing window so we can evaluate whether drone
              spraying is a fit alongside your current ground rig or aerial program.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-[color:var(--surface-muted)] p-6">
              <p className="font-heading text-xl font-semibold text-[color:var(--color-primary)]">Counties served</p>
              <ul className="mt-5 grid gap-3 text-sm text-[color:var(--foreground)]">
                {serviceArea.map((county) => (
                  <li
                    key={county}
                    className="flex items-center gap-2"
                  >
                    <span className="h-2 w-2 rounded-full bg-[color:var(--color-accent)]" />
                    {county} County, Alabama
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-pad bg-[color:var(--background)]">
        <div className="container-page max-w-4xl">
          <RevealOnScroll>
            <span className="eyebrow eyebrow-dot">Herbicide application FAQ</span>
            <h2 className="mt-4 font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl">
              Common questions from farmers comparing application options.
            </h2>
          </RevealOnScroll>
          <div className="mt-10 space-y-4">
            {faqItems.map((item) => (
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
              Find out if drone herbicide application fits your acres.
            </h2>
            <p className="mt-4 max-w-2xl text-[#d3ebc9]">
              Share your crop, county, herbicide pass, and timing pressure. We will follow up with a practical answer
              on drone spraying, ground rig spraying, crop dusting, or a combined approach.
            </p>
          </div>
          <CtaButton
            data-track="herbicide-final-cta"
            aria-label="Request herbicide application assessment"
            className="btn btn-accent shrink-0"
          >
            Request My Assessment
          </CtaButton>
        </div>
      </section>
    </div>
  );
}
