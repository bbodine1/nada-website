import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaButton } from "@/components/cta-lead-popup";
import { MarkdownContent } from "@/components/markdown-content";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { formatArticleDate, getAllArticles, getArticleBySlug } from "@/lib/articles";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllArticles().map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {};
  }

  return {
    title: `${article.title} | North Alabama Drone Applicators`,
    description: article.description,
    alternates: {
      canonical: `/news/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `/news/${article.slug}`,
      siteName: "North Alabama Drone Applicators",
      locale: "en_US",
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
      tags: [article.category],
      images: [
        {
          url: "/og-image.png",
          secureUrl: "/og-image.png",
          type: "image/png",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: ["/og-image.png"],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getAllArticles()
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: {
      "@type": "Organization",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "North Alabama Drone Applicators",
      url: "https://www.northaldroneapplicators.com/",
    },
    mainEntityOfPage: `https://www.northaldroneapplicators.com/news/${article.slug}`,
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
              <Link
                href="/news"
                className="hover:text-white"
              >
                News
              </Link>
              <span aria-hidden="true"> / </span>
              <span>{article.title}</span>
            </nav>
            <span className="eyebrow eyebrow-dot mt-6 border-white/20 bg-white/10 text-white backdrop-blur">
              {article.category}
            </span>
            <h1 className="mt-5 max-w-4xl font-heading text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
              {article.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#e8e8e8]">{article.description}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-[#d3ebc9]">
              <span>{formatArticleDate(article.date)}</span>
              <span aria-hidden="true">/</span>
              <span>{article.author}</span>
              <span aria-hidden="true">/</span>
              <span>{article.readingTime}</span>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <RevealOnScroll>
            <article className="rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-[color:var(--background)] p-6 shadow-[var(--shadow-sm)] sm:p-8 lg:p-10">
              <MarkdownContent blocks={article.blocks} />
            </article>
          </RevealOnScroll>

          <aside className="space-y-5">
            <RevealOnScroll className="rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-[color:var(--surface-muted)] p-6">
              <p className="font-heading text-xl font-semibold text-[color:var(--color-primary)]">Field-fit question?</p>
              <p className="mt-3 text-sm leading-6 text-[color:var(--fg-muted)]">
                Share the crop, county, acreage, product target, and timing pressure. We will help decide whether a drone
                pass fits.
              </p>
              <CtaButton
                data-track={`article-${article.slug}-sidebar-cta`}
                aria-label="Request a field-fit assessment"
                className="btn btn-accent mt-5 w-full"
              >
                Request Assessment
              </CtaButton>
            </RevealOnScroll>

            {relatedArticles.length > 0 && (
              <RevealOnScroll className="rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-white p-6 shadow-[var(--shadow-sm)]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--fg-subtle)]">
                  More articles
                </p>
                <div className="mt-4 space-y-4">
                  {relatedArticles.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/news/${item.slug}`}
                      className="block rounded-[var(--radius)] border border-[color:var(--border)] bg-[color:var(--surface-muted)] p-4 transition hover:-translate-y-0.5 hover:border-[color:var(--border-strong)] hover:shadow-[var(--shadow-sm)]"
                    >
                      <span className="text-xs font-medium uppercase tracking-[0.14em] text-[color:var(--color-accent-600)]">
                        {item.category}
                      </span>
                      <span className="mt-2 block font-heading text-lg font-semibold text-[color:var(--color-primary)]">
                        {item.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </RevealOnScroll>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}
