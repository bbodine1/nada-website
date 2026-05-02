import type { Metadata } from "next";
import Link from "next/link";

import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { formatArticleDate, getAllArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "News & Articles | North Alabama Drone Applicators",
  description:
    "Read North Alabama Drone Applicators articles about drone spraying, drone spreading, crop timing, and field-fit decisions for Tennessee Valley farms.",
  alternates: {
    canonical: "/news",
  },
  openGraph: {
    title: "News & Articles | North Alabama Drone Applicators",
    description:
      "Practical articles about agricultural drone spraying and spreading for North Alabama growers.",
    url: "/news",
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
        alt: "North Alabama Drone Applicators articles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "News & Articles | North Alabama Drone Applicators",
    description:
      "Practical articles about agricultural drone spraying and spreading for North Alabama growers.",
    images: ["/og-image.png"],
  },
};

export default function NewsPage() {
  const articles = getAllArticles();
  const featured = articles[0];
  const remainingArticles = articles.slice(1);

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
              <span>News</span>
            </nav>
            <span className="eyebrow eyebrow-dot mt-6 border-white/20 bg-white/10 text-white backdrop-blur">
              Markdown articles
            </span>
            <h1 className="mt-5 max-w-4xl font-heading text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
              News and field notes for North Alabama growers.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#e8e8e8]">
              Practical articles about drone spraying, drone spreading, field timing, and when another applicator may be
              the better fit.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-pad topo-bg grain">
        <div className="container-page">
          {featured ? (
            <RevealOnScroll>
              <Link
                href={`/news/${featured.slug}`}
                className="group grid gap-8 rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-white p-6 shadow-[var(--shadow-sm)] transition hover:-translate-y-1 hover:border-[color:var(--border-strong)] hover:shadow-[var(--shadow)] lg:grid-cols-[0.85fr_1.15fr] lg:p-8"
              >
                <div className="flex min-h-64 flex-col justify-between rounded-[var(--radius-lg)] bg-[color:var(--color-primary)] p-6 text-white">
                  <div>
                    <span className="eyebrow border-white/20 bg-white/10 text-white">{featured.category}</span>
                    <p className="mt-6 text-sm uppercase tracking-[0.18em] text-[#d3ebc9]">Featured article</p>
                  </div>
                  <p className="font-heading text-3xl font-semibold text-white">{featured.title}</p>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--fg-subtle)]">
                    {formatArticleDate(featured.date)} · {featured.readingTime}
                  </p>
                  <h2 className="mt-4 font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-lg leading-8 text-[color:var(--fg-muted)]">{featured.excerpt}</p>
                  <span className="mt-6 inline-flex font-semibold text-[color:var(--color-primary)]">
                    Read article
                    <span
                      aria-hidden="true"
                      className="ml-2 transition-transform group-hover:translate-x-1"
                    >
                      -&gt;
                    </span>
                  </span>
                </div>
              </Link>
            </RevealOnScroll>
          ) : null}

          {remainingArticles.length > 0 ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {remainingArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/news/${article.slug}`}
                  className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-white p-6 shadow-[var(--shadow-sm)] transition hover:-translate-y-1 hover:border-[color:var(--border-strong)] hover:shadow-[var(--shadow)]"
                >
                  <span className="eyebrow w-fit">{article.category}</span>
                  <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--fg-subtle)]">
                    {formatArticleDate(article.date)} · {article.readingTime}
                  </p>
                  <h2 className="mt-4 font-heading text-2xl font-semibold text-[color:var(--color-primary)]">
                    {article.title}
                  </h2>
                  <p className="mt-4 flex-1 text-sm leading-6 text-[color:var(--fg-muted)]">{article.excerpt}</p>
                  <span className="mt-6 inline-flex font-semibold text-[color:var(--color-primary)]">
                    Read article
                    <span
                      aria-hidden="true"
                      className="ml-2 transition-transform group-hover:translate-x-1"
                    >
                      -&gt;
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
