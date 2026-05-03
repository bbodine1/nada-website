import Image from "next/image";
import Link from "next/link";
import { FaqAccordion } from "@/components/faq-accordion";
import { HeroVideo } from "@/components/hero-video";
import { LeadInterestForm } from "@/components/lead-interest-form";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { YoutubeClickPlay } from "@/components/youtube-click-play";
import { localDroneServicePages } from "@/lib/service-areas";

const problemCards = [
	{
		icon: (
			<svg
				aria-hidden="true"
				viewBox="0 0 24 24"
				className="h-5 w-5"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.8"
			>
				<path d="M4 15c1.5-2.5 4-4 8-4s6.5 1.5 8 4" strokeLinecap="round" />
				<path d="M8 19c1-1.5 2.5-2 4-2s3 .5 4 2" strokeLinecap="round" />
				<path
					d="M12 3v4M9 5l3-3 3 3"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
		title: "Tennessee Valley Weather Doesn’t Wait",
		body: "Pop-up showers and humid air leave red clay holding water—sometimes the rig can’t roll for days. When the window opens, you need a pass that isn’t tied to someone else’s queue.",
		bullet: "Drone application can go when ground equipment still can’t.",
	},
	{
		icon: (
			<svg
				aria-hidden="true"
				viewBox="0 0 24 24"
				className="h-5 w-5"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.8"
			>
				<path
					d="M3 17l4-5 4 3 5-7 5 6"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path d="M3 21h18" strokeLinecap="round" />
			</svg>
		),
		title: "Uneven Ground, Uneven Needs",
		body: "River bottoms, end rows, and wet holes don’t all need the same rate. Spray and spread where the field calls for it—without dragging a rig through mud or tearing up headlands.",
		bullet: "Target product placement without fighting terrain.",
	},
	{
		icon: (
			<svg
				aria-hidden="true"
				viewBox="0 0 24 24"
				className="h-5 w-5"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.8"
			>
				<circle cx="12" cy="12" r="8" />
				<path d="M12 7v5l3 2" strokeLinecap="round" />
			</svg>
		),
		title: "Every Gallon and Pound Has to Earn Its Keep",
		body: "Margins are tight. Whether it’s liquid chemistry or dry product, placement beats blanket passes—especially when the window is short and the ground won’t cooperate.",
		bullet: "Protect yield without wasting inputs.",
	},
] as const;

const explainerStats = [
	{
		value: "Tight",
		suffix: "windows",
		label: "Spray when it counts",
		detail:
			"Get liquid on the crop when the label and weather line up—not when the queue finally opens.",
	},
	{
		value: "Even",
		suffix: "patterns",
		label: "Spread with control",
		detail:
			"Dry product where you need it: cover crop seed, fertilizer, lime, and pasture overseeding.",
	},
	{
		value: "Less",
		suffix: "ruts",
		label: "Keep mud off the rows",
		detail:
			"Stay off wet ground that would bury a ground rig—same season, less compaction.",
	},
] as const;

const testimonials = [
	{
		quote:
			"We got cover on end rows and wet holes the rig would’ve torn up. Didn’t have to wait on the co-op line.",
		name: "J. Hartselle",
		county: "Limestone County",
		crop: "Cotton and corn",
	},
	{
		quote:
			"After a gully washer, we still got a fungicide pass in when the rig couldn’t have touched it.",
		name: "R. Tanner",
		county: "Madison County",
		crop: "Soybeans and wheat",
	},
	{
		quote:
			"Spread lime where we needed it without burying the sprayer. Same field, less guesswork.",
		name: "C. Green",
		county: "Cullman County",
		crop: "Corn and double-crop soybeans",
	},
] as const;

const trustItems = [
	{
		title: "FAA Part 107",
		detail:
			"Certified commercial drone pilots, fully insured for agricultural operations.",
	},
	{
		title: "Managed Service",
		detail:
			"We bring the aircraft, fuel, and crew. You stay focused on the farm.",
	},
	{
		title: "North Alabama Only",
		detail:
			"Routes built around Madison, Limestone, Morgan, Cullman & Lawrence counties.",
	},
] as const;

const opsComparison = [
	{
		approach: "Ground Rig",
		access:
			"Strong on dry, open ground; limited when fields stay soft after rain.",
		precision:
			"Good section control, but harder in irregular edges and tight wet pockets.",
		risk: "Highest compaction and rut risk in soft Tennessee Valley conditions.",
		speed: "Fast once in-field, slower when weather or soil delays access.",
		bestFit:
			"Broad-acre passes when field conditions support equipment traffic.",
	},
	{
		approach: "Traditional Aerial",
		access: "Excellent access regardless of soil trafficability.",
		precision:
			"Strong on broad passes; less flexible for small or odd-shaped patches.",
		risk: "No wheel traffic, so no compaction from application equipment.",
		speed: "Very fast coverage when aircraft slot and route are available.",
		bestFit: "Large acre blocks and time-sensitive full-field applications.",
	},
	{
		approach: "Drone Application",
		access:
			"Excellent in wet fields, end rows, and areas where rigs cannot travel.",
		precision:
			"High control on irregular boundaries, turn rows, and targeted zones.",
		risk: "No wheel traffic in-crop and minimal ground disturbance at treatment area.",
		speed:
			"Fast to launch for focused jobs; scales through coordinated route planning.",
		bestFit:
			"Field edges, wet zones, patch treatment, and weather-tight spray/spread windows.",
	},
] as const;

const economicProofPoints = [
	{
		title: "Timing protection when rain stalls rigs",
		detail:
			"Indicative outcome: preserve a fungicide or foliar timing window on acres that stay too soft for ground entry. Value depends on crop stage, pressure, and field access.",
	},
	{
		title: "Compaction and rework reduction",
		detail:
			"Indicative outcome: fewer rut repairs and less stand disturbance in wet pockets, end rows, and soft headlands compared with heavy in-field traffic.",
	},
	{
		title: "Better use of partial-field passes",
		detail:
			"Indicative outcome: target irregular or hard-to-reach acres without paying for a blanket pass. Final quote and economics are field-specific.",
	},
] as const;

const homeLocalBusinessJsonLd = {
	"@context": "https://schema.org",
	"@type": "LocalBusiness",
	name: "North Alabama Drone Applicators",
	url: "https://www.northaldroneapplicators.com/",
	description:
		"Managed agricultural drone spraying and spreading for North Alabama farms, including herbicide, fungicide, foliar, seed, fertilizer, lime, and pasture applications.",
	areaServed: [
		"Madison County, Alabama",
		"Limestone County, Alabama",
		"Morgan County, Alabama",
		"Cullman County, Alabama",
		"Lawrence County, Alabama",
	],
	makesOffer: [
		{
			"@type": "Offer",
			itemOffered: {
				"@type": "Service",
				name: "Drone herbicide spraying",
				serviceType: "Agricultural herbicide application",
			},
		},
		{
			"@type": "Offer",
			itemOffered: {
				"@type": "Service",
				name: "Drone spreading",
				serviceType: "Agricultural dry product application",
			},
		},
	],
} as const;

export default function Home() {
	return (
		<div className="text-[color:var(--foreground)]">
			{/* JSON-LD requires raw script text; escape `<` in serialized JSON (see other app routes). */}
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must use raw script body; schema is static and `<` is escaped.
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(homeLocalBusinessJsonLd).replace(
						/</g,
						"\\u003c",
					),
				}}
			/>
			{/* Hero ---------------------------------------------------------- */}
			<section className="relative flex min-h-[100vh] items-end overflow-hidden pt-48 min-[600px]:pt-24">
				<HeroVideo />
				<div className="hero-overlay absolute inset-0" />

				<div className="container-page relative z-10 pb-16 pt-10 sm:pb-24 sm:pt-14">
					<div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
						<RevealOnScroll className="max-w-2xl">
							<span className="eyebrow eyebrow-dot border-white/20 bg-white/10 text-white backdrop-blur">
								Spray &amp; spread · North Alabama
							</span>
							<h1 className="mt-5 font-heading text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
								See Exactly Where Drone Spraying Pays Off On Your Fields
							</h1>
							<p className="mt-4 max-w-xl text-lg leading-8 text-[#e8e8e8]">
								Wet fields. Missed spray windows. Crop damage from tires.
								<br />
								This quick guide shows when drones actually save time and
								protect yield — and when they don&apos;t.
							</p>
							<p className="mt-5 max-w-xl text-lg leading-8 text-[#e8e8e8]">
								If you&apos;re dealing with wet fields, tight spray windows, or
								crops you don&apos;t want to run over, this guide shows you
								exactly when drone application is the better option.
							</p>
							<div className="mt-8 flex flex-wrap gap-3">
								<Link
									href="#lead-form"
									data-track="hero-cta-download-guide"
									aria-label="Download the free field guide"
									className="btn btn-accent inline-flex items-center gap-2"
								>
									Download the Free Field Guide
									<svg
										viewBox="0 0 20 20"
										className="h-4 w-4"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										aria-hidden="true"
									>
										<path
											d="M4 10h12M12 5l5 5-5 5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</Link>
								<Link
									href="/contact"
									data-track="hero-cta-custom-review"
									aria-label="Request a custom field review"
									className="btn btn-outline border-white/40 text-white hover:border-white/70 hover:bg-white/10"
								>
									Request a Custom Field Review
								</Link>
							</div>

							<div className="mt-10 flex flex-wrap items-center gap-2 text-sm text-white/85">
								<span className="chip chip-dark">
									✓ Built for Tennessee Valley growing conditions
								</span>
								<span className="chip chip-dark">✓ FAA Part 107</span>
								<span className="chip chip-dark">✓ 5 Alabama counties</span>
								<span className="chip chip-dark">
									✓ Designed for real field decisions, not theory
								</span>
							</div>
						</RevealOnScroll>

						<RevealOnScroll className="w-full">
							<div id="lead-form" className="scroll-mt-28">
								<LeadInterestForm />
							</div>
						</RevealOnScroll>
					</div>
				</div>

				<a
					href="#problems"
					aria-label="Scroll to next section"
					className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/70 md:flex"
				>
					<span>Scroll</span>
					<svg
						aria-hidden="true"
						viewBox="0 0 16 16"
						className="h-3.5 w-3.5 animate-bounce"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path
							d="M8 3v10M3 9l5 5 5-5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</a>
			</section>

			{/* Operations Comparison ---------------------------------------- */}
			<section
				id="comparison"
				className="section-pad bg-[color:var(--background)]"
			>
				<div className="container-page">
					<RevealOnScroll>
						<span className="eyebrow eyebrow-dot">
							Operational Fit Comparison
						</span>
						<h2 className="mt-4 max-w-3xl font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl">
							Where each application approach fits best.
						</h2>
						<p className="mt-4 max-w-3xl text-lg text-[color:var(--fg-muted)]">
							You do not need to replace proven tools. Use drones where access,
							precision, and timing pressure make the biggest difference on your
							acres.
						</p>
					</RevealOnScroll>

					<div className="mt-10 grid gap-5 lg:grid-cols-3">
						{opsComparison.map((item) => (
							<RevealOnScroll
								key={item.approach}
								className="rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-white p-6 shadow-[var(--shadow-sm)]"
							>
								<p className="font-heading text-xl font-semibold text-[color:var(--color-primary)]">
									{item.approach}
								</p>
								<ul className="mt-4 space-y-3 text-sm text-[color:var(--fg-muted)]">
									<li>
										<span className="font-semibold text-[color:var(--foreground)]">
											Access:
										</span>{" "}
										{item.access}
									</li>
									<li>
										<span className="font-semibold text-[color:var(--foreground)]">
											Precision:
										</span>{" "}
										{item.precision}
									</li>
									<li>
										<span className="font-semibold text-[color:var(--foreground)]">
											Compaction Risk:
										</span>{" "}
										{item.risk}
									</li>
									<li>
										<span className="font-semibold text-[color:var(--foreground)]">
											Turn-Around:
										</span>{" "}
										{item.speed}
									</li>
									<li>
										<span className="font-semibold text-[color:var(--foreground)]">
											Best Fit:
										</span>{" "}
										{item.bestFit}
									</li>
								</ul>
							</RevealOnScroll>
						))}
					</div>
					<div className="mt-8">
						<Link
							href="#lead-form"
							data-track="comparison-cta-download-guide"
							aria-label="Download the free field guide"
							className="btn btn-accent inline-flex"
						>
							Download the Free Field Guide
						</Link>
					</div>
				</div>
			</section>

			{/* Economics ----------------------------------------------------- */}
			<section className="section-pad bg-white">
				<div className="container-page">
					<RevealOnScroll>
						<span className="eyebrow eyebrow-dot">Economic Reality</span>
						<h2 className="mt-4 max-w-3xl font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl">
							What drone application can protect or save.
						</h2>
						<p className="mt-4 max-w-3xl text-lg text-[color:var(--fg-muted)]">
							These are indicative field outcomes, not blanket promises. Final
							pricing and ROI are field-dependent and quoted per job.
						</p>
					</RevealOnScroll>
					<div className="mt-10 grid gap-5 md:grid-cols-3">
						{economicProofPoints.map((point) => (
							<RevealOnScroll
								key={point.title}
								className="rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-[color:var(--surface-muted)] p-6"
							>
								<p className="font-heading text-lg font-semibold text-[color:var(--color-primary)]">
									{point.title}
								</p>
								<p className="mt-3 text-sm text-[color:var(--fg-muted)]">
									{point.detail}
								</p>
							</RevealOnScroll>
						))}
					</div>
					<div className="mt-8">
						<Link
							href="#lead-form"
							data-track="economics-cta-download-guide"
							aria-label="Download the free field guide"
							className="btn btn-accent inline-flex"
						>
							Download the Free Field Guide
						</Link>
					</div>
				</div>
			</section>

			{/* Problems ------------------------------------------------------ */}
			<section id="problems" className="section-pad topo-bg grain">
				<div className="container-page">
					<RevealOnScroll>
						<span className="eyebrow eyebrow-dot">The Reality Out Here</span>
						<h2 className="mt-4 max-w-3xl font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl lg:text-[2.75rem]">
							North Alabama farming is getting harder.
							<br />
							<span className="text-[color:var(--foreground)]">
								Your tools should get smarter.
							</span>
						</h2>
						<p className="mt-5 max-w-3xl text-lg text-[color:var(--fg-muted)]">
							Between river bottoms, rolling ground, and humidity off the Gulf,
							the Tennessee Valley keeps you guessing. Across Madison,
							Limestone, Morgan, Cullman, and Lawrence Counties—same problems:
							narrow spray windows, rising input costs, and fields that don’t
							all behave the same.
						</p>
					</RevealOnScroll>

					<div className="mt-12 grid gap-5 lg:grid-cols-3">
						{problemCards.map((item) => (
							<RevealOnScroll key={item.title}>
								<article className="topo-card flex h-full flex-col p-7">
									<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--color-primary)] text-[color:var(--color-accent-100)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
										{item.icon}
									</div>
									<h3 className="mt-5 font-heading text-xl font-semibold text-[color:var(--color-primary)]">
										{item.title}
									</h3>
									<p className="mt-3 text-[color:var(--fg-muted)]">
										{item.body}
									</p>
									<div className="mt-auto pt-5">
										<p className="flex items-start gap-2 border-t border-[color:var(--border)] pt-4 text-sm font-medium text-[color:var(--color-primary)]">
											<svg
												aria-hidden="true"
												viewBox="0 0 16 16"
												className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--color-accent)]"
												fill="currentColor"
											>
												<path d="M6.5 11.5L3 8l1.4-1.4 2.1 2.1L11.6 3.5 13 4.9z" />
											</svg>
											{item.bullet}
										</p>
									</div>
								</article>
							</RevealOnScroll>
						))}
					</div>
				</div>
			</section>

			{/* Services ------------------------------------------------------ */}
			<section id="services" className="section-pad bg-white">
				<div className="container-page">
					<RevealOnScroll>
						<span className="eyebrow eyebrow-dot">What We Do</span>
						<h2 className="mt-4 max-w-3xl font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl">
							Two ways we show up in your fields.
						</h2>
						<p className="mt-4 max-w-3xl text-lg text-[color:var(--fg-muted)]">
							We fly for you—you don’t buy the drone, fuel it, or chase
							regulations alone. Our focus: precision spray and dry
							spreading for cotton, corn, soybeans, wheat, hay, and pasture
							where it fits your operation.
						</p>
					</RevealOnScroll>

					<div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
						<RevealOnScroll>
							<div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--border)] shadow-[var(--shadow)]">
								<Image
									src="/drone-spraying.jpg"
									alt="Drone spraying over cotton rows at dusk"
									width={800}
									height={520}
									className="h-full w-full object-cover"
									loading="lazy"
								/>
								<span className="absolute left-4 top-4 chip bg-white/85 text-[color:var(--color-primary)]">
									Precision Spray
								</span>
							</div>
						</RevealOnScroll>
						<RevealOnScroll>
							<h3 className="font-heading text-2xl font-semibold text-[color:var(--color-primary)] sm:text-3xl">
								Precision Spray Applications
							</h3>
							<p className="mt-4 text-[color:var(--fg-muted)]">
								Fungicide, herbicide, and foliar passes on cotton, corn,
								soybeans, and wheat—plus hay and forage where it makes sense.
								Aerial application shines on end rows, tree lines, ditches, and
								patches where a ground rig tears ground or can’t turn without
								hitting a fence.
							</p>
							<ul className="mt-6 space-y-3 text-sm text-[color:var(--foreground)]">
								{[
									"Fit tighter spray windows and stacked weather days",
									"Protect sensitive ground and buffer zones",
									"Reduce compaction in wet seasons",
								].map((line) => (
									<li key={line} className="flex items-start gap-3">
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
										<span>{line}</span>
									</li>
								))}
							</ul>
						</RevealOnScroll>
					</div>

					<div className="mt-16 grid items-center gap-10 lg:grid-cols-2">
						<RevealOnScroll className="lg:order-2">
							<div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--border)] shadow-[var(--shadow)]">
								<Image
									src="/drone-spreading.png"
									alt="Drone spreading dry product over a green field"
									width={800}
									height={520}
									className="h-full w-full object-cover"
									loading="lazy"
								/>
								<span className="absolute left-4 top-4 chip bg-white/85 text-[color:var(--color-primary)]">
									Drone Spreading
								</span>
							</div>
						</RevealOnScroll>
						<RevealOnScroll className="lg:order-1">
							<h3 className="font-heading text-2xl font-semibold text-[color:var(--color-primary)] sm:text-3xl">
								Drone Spreading (Dry Product)
							</h3>
							<p className="mt-4 text-[color:var(--fg-muted)]">
								Cover crop seed, dry fertilizer, lime, and pasture
								overseeding—placed where your plan calls for it, without rutting
								headlands or waiting on ground equipment when the field is still
								holding water.
							</p>
							<ul className="mt-6 space-y-3 text-sm text-[color:var(--foreground)]">
								{[
									"Reach wet or tight spots without burying a rig",
									"Reduce compaction compared to heavy equipment in soft seasons",
									"Pair spreading with your spray program for one coordinated route",
								].map((line) => (
									<li key={line} className="flex items-start gap-3">
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
										<span>{line}</span>
									</li>
								))}
							</ul>
						</RevealOnScroll>
					</div>
				</div>
			</section>

			{/* Local Service Pages ------------------------------------------ */}
			<section className="section-pad bg-[color:var(--surface-muted)]">
				<div className="container-page">
					<RevealOnScroll>
						<span className="eyebrow eyebrow-dot">Local Service Pages</span>
						<h2 className="mt-4 max-w-3xl font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl">
							County-specific drone spray and spread pages.
						</h2>
						<p className="mt-4 max-w-3xl text-lg text-[color:var(--fg-muted)]">
							Start with the page for your county to see common crops, field
							conditions, use cases, and the right next step after you read the
							field guide.
						</p>
					</RevealOnScroll>

					<div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
						{localDroneServicePages.map((page) => (
							<RevealOnScroll
								key={page.slug}
								className="rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-white p-5 shadow-[var(--shadow-sm)]"
							>
								<p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-accent)]">
									{page.county} County
								</p>
								<h3 className="mt-3 font-heading text-xl font-semibold text-[color:var(--color-primary)]">
									{page.title}
								</h3>
								<p className="mt-3 text-sm leading-6 text-[color:var(--fg-muted)]">
									{page.crops.slice(0, 3).join(", ")} and local application
									context.
								</p>
								<Link
									href={`/local-services/${page.slug}`}
									className="mt-5 inline-flex text-sm font-semibold text-[color:var(--color-primary)] hover:text-[color:var(--color-accent)]"
								>
									View {page.county} page
								</Link>
							</RevealOnScroll>
						))}
					</div>
				</div>
			</section>

			{/* Field guide --------------------------------------------------- */}
			<section
				id="spray-spread-guide"
				className="section-pad bg-[color:var(--surface-muted)]"
			>
				<div className="container-page">
					<div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
						<RevealOnScroll>
							<div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--border)] shadow-[var(--shadow)]">
								<Image
									src="/hero-fallback.jpg"
									alt=""
									width={640}
									height={400}
									className="h-full w-full object-cover"
								/>
							</div>
						</RevealOnScroll>
						<RevealOnScroll>
							<span className="eyebrow eyebrow-dot">Free download</span>
							<h2 className="mt-4 font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl">
								Where Drone Application Pays Off (North Alabama Field Guide)
							</h2>
							<p className="mt-4 text-lg text-[color:var(--fg-muted)]">
								A short PDF built for real field decisions: when drone spraying
								and spreading saves time and yield on your acres, when rigs or
								traditional aerial still win, and what indicative cost bands
								look like in our service counties.
							</p>
							<ul className="mt-6 space-y-3 text-sm text-[color:var(--foreground)]">
								{[
									"Tennessee Valley weather, wet holes, and tight spray windows",
									"What we fly this season: spray + spread only",
									"Indicative per-acre bands (final quote is always field-specific)",
									"How we're building routes for North Alabama growers",
								].map((line) => (
									<li key={line} className="flex items-start gap-3">
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
										<span>{line}</span>
									</li>
								))}
							</ul>
							<div className="mt-8">
								<Link
									href="#lead-form"
									data-track="guide-cta-download"
									aria-label="Download the free field guide"
									className="btn btn-accent inline-flex items-center gap-2"
								>
									Download the Free Field Guide
									<svg
										aria-hidden="true"
										viewBox="0 0 20 20"
										className="h-4 w-4"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
									>
										<path
											d="M4 10h12M12 5l5 5-5 5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</Link>
							</div>
						</RevealOnScroll>
					</div>
				</div>
			</section>

			{/* Explainer ---------------------------------------------------- */}
			<section id="explainer" className="section-pad topo-bg grain">
				<div className="container-page max-w-5xl">
					<RevealOnScroll className="text-center">
						<span className="eyebrow eyebrow-dot">See It Working</span>
						<h2 className="mt-4 font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl">
							Spray and spread, on your schedule.
						</h2>
						<p className="mx-auto mt-4 max-w-2xl text-[color:var(--fg-muted)]">
							Liquid passes when the label and weather line up; dry product when
							the field needs it—without the ruts and delays that come with
							ground rigs in a wet Tennessee Valley season.
						</p>
					</RevealOnScroll>

					<RevealOnScroll className="mt-10 overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-white p-2 shadow-[var(--shadow-lg)]">
						<div className="relative aspect-video overflow-hidden rounded-[calc(var(--radius-xl)_-_0.5rem)]">
							<YoutubeClickPlay
								videoId="PbglS6ByHVk"
								title="North Alabama drone field biostem application"
							/>
						</div>
					</RevealOnScroll>

					<div className="mt-10 grid gap-4 sm:grid-cols-3">
						{explainerStats.map((row) => (
							<RevealOnScroll
								key={row.label}
								className="rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-white p-6"
							>
								<p className="font-heading text-3xl font-semibold text-[color:var(--color-primary)]">
									{row.value}
									<span className="ml-1 text-base font-medium text-[color:var(--fg-subtle)]">
										{row.suffix}
									</span>
								</p>
								<p className="mt-2 text-sm font-semibold text-[color:var(--foreground)]">
									{row.label}
								</p>
								<p className="mt-2 text-sm text-[color:var(--fg-muted)]">
									{row.detail}
								</p>
							</RevealOnScroll>
						))}
					</div>
				</div>
			</section>

			{/* Trust --------------------------------------------------------- */}
			<section className="bg-white py-12">
				<div className="container-page grid gap-6 md:grid-cols-3">
					{trustItems.map((item) => (
						<div
							key={item.title}
							className="flex items-start gap-4 rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-[color:var(--surface-muted)] p-5"
						>
							<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[color:var(--color-primary)] text-[color:var(--color-accent-100)]">
								<svg
									aria-hidden="true"
									viewBox="0 0 24 24"
									className="h-5 w-5"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.8"
								>
									<path
										d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4Z"
										strokeLinejoin="round"
									/>
									<path
										d="M9 12l2 2 4-4"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</span>
							<div>
								<p className="font-heading text-lg font-semibold text-[color:var(--color-primary)]">
									{item.title}
								</p>
								<p className="mt-1 text-sm text-[color:var(--fg-muted)]">
									{item.detail}
								</p>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Testimonials ------------------------------------------------- */}
			<section
				id="testimonials"
				className="section-pad bg-[color:var(--background)]"
			>
				<div className="container-page">
					<RevealOnScroll className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
						<div className="max-w-2xl">
							<span className="eyebrow eyebrow-dot">Growers Talking</span>
							<h2 className="mt-4 font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl">
								Farmers across North Alabama are paying attention.
							</h2>
							<p className="mt-4 text-[color:var(--fg-muted)]">
								We&apos;re building our spray-and-spread route map
								across Madison, Limestone, Morgan, Cullman, and Lawrence
								Counties—Alabama only. Grab the field guide first; if it fits
								your operation, we&apos;ll help you find the right next step.
							</p>
						</div>
						<Link
							href="#lead-form"
							className="btn btn-ghost"
							data-track="testimonials-cta-download-guide"
							aria-label="Download the free field guide"
						>
							Download the Free Field Guide
						</Link>
					</RevealOnScroll>

					<div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
						{testimonials.map((testimonial) => (
							<RevealOnScroll
								key={testimonial.name}
								className="flex h-full flex-col rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-white p-7 shadow-[var(--shadow-sm)]"
							>
								<svg
									aria-hidden="true"
									viewBox="0 0 32 32"
									className="h-8 w-8 text-[color:var(--color-accent)]"
									fill="currentColor"
								>
									<path d="M11 8c-3.3 0-6 2.7-6 6v10h10V14H9c0-1.1.9-2 2-2V8Zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8Z" />
								</svg>
								<p className="mt-4 text-[color:var(--foreground)]">
									“{testimonial.quote}”
								</p>
								<div className="mt-6 flex items-center justify-between border-t border-[color:var(--border)] pt-4">
									<div>
										<p className="font-semibold text-[color:var(--foreground)]">
											{testimonial.name}
										</p>
										<p className="text-xs text-[color:var(--fg-subtle)]">
											{testimonial.county} · {testimonial.crop}
										</p>
									</div>
									<div className="flex gap-0.5 text-[color:var(--color-accent)]">
										{[1, 2, 3, 4, 5].map((star) => (
											<svg
												aria-hidden="true"
												key={star}
												viewBox="0 0 20 20"
												className="h-3.5 w-3.5"
												fill="currentColor"
											>
												<path d="M10 1.5l2.7 5.5 6 .9-4.4 4.3 1 6-5.3-2.8-5.3 2.8 1-6-4.4-4.3 6-.9L10 1.5z" />
											</svg>
										))}
									</div>
								</div>
							</RevealOnScroll>
						))}
					</div>

					<div className="mt-10 rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-white p-5 text-sm text-[color:var(--fg-muted)]">
						<p className="font-semibold text-[color:var(--foreground)]">
							Built for practical, no-hype decisions.
						</p>
						<p className="mt-2">
							We&apos;ll tell you where drone passes likely help, where your
							current rig or aircraft remains the better play, and what
							indicative per-acre ranges look like before you commit to
							anything.
						</p>
					</div>
				</div>
			</section>

			{/* Final CTA ---------------------------------------------------- */}
			<section className="section-pad relative overflow-hidden bg-[color:var(--color-primary)]">
				<Image
					src="/form-bg.svg"
					alt=""
					fill
					sizes="100vw"
					className="object-cover opacity-10"
					aria-hidden
				/>
				<div
					aria-hidden
					className="pointer-events-none absolute inset-0"
					style={{
						backgroundImage:
							"radial-gradient(700px 320px at 85% 20%, rgba(212,160,23,0.22), transparent 55%)",
					}}
				/>
				<div className="container-page relative z-10 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
					<div>
						<span className="eyebrow eyebrow-dot border-white/20 bg-white/10 text-white backdrop-blur">
							Early access · North Alabama
						</span>
						<h2 className="mt-4 font-heading text-3xl font-semibold text-white sm:text-4xl lg:text-[2.75rem]">
							Get the free field guide—then decide what&apos;s next.
						</h2>
						<p className="mt-5 max-w-xl text-[#d3ebc9]">
							See where drone spraying and spreading saves time and yield on
							North Alabama acres—and where it doesn&apos;t. When you&apos;re
							ready for a closer look at your fields, you can reach out for a
							custom field review after you read it.
						</p>
						<ul className="mt-6 space-y-3 text-sm text-[#e9f0dd]">
							{[
								"Download takes seconds; the PDF is built for real field decisions.",
								"Managed service—we bring pilots, aircraft, and insurance, not a gear shopping list.",
								"Only serving Madison, Limestone, Morgan, Cullman & Lawrence counties.",
							].map((line) => (
								<li key={line} className="flex items-start gap-3">
									<span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-accent)] text-[color:var(--color-primary)]">
										<svg
											aria-hidden="true"
											viewBox="0 0 16 16"
											className="h-3 w-3"
											fill="currentColor"
										>
											<path d="M6.5 11.5L3 8l1.4-1.4 2.1 2.1L11.6 3.5 13 4.9z" />
										</svg>
									</span>
									<span>{line}</span>
								</li>
							))}
						</ul>
						<div className="mt-8 flex flex-wrap gap-3">
							<Link
								href="#lead-form"
								data-track="final-cta-download-guide"
								aria-label="Download the free field guide"
								className="btn btn-accent inline-flex items-center gap-2"
							>
								Download the Free Field Guide
								<svg
									aria-hidden="true"
									viewBox="0 0 20 20"
									className="h-4 w-4"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path
										d="M4 10h12M12 5l5 5-5 5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</Link>
							<Link
								href="/contact"
								data-track="final-cta-custom-review"
								aria-label="Request a custom field review"
								className="btn btn-outline border-white/40 text-white hover:border-white/70 hover:bg-white/10"
							>
								Request a Custom Field Review
							</Link>
						</div>
					</div>

					<div className="relative">
						<div className="absolute inset-0 -m-2 rounded-[var(--radius-xl)] bg-[color:var(--color-accent)]/15 blur-2xl" />
						<div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-white/20 bg-white/[0.06] p-6 text-white backdrop-blur">
							<p className="font-heading text-xl font-semibold">
								Why leave your spot to chance?
							</p>
							<p className="mt-3 text-sm text-[#d3ebc9]">
								Routes are built in advance. Our bandwidth on any given day
								depends on who’s already on the list and how close their acres
								are to our next stop.
							</p>
							<div className="mt-6 grid grid-cols-3 gap-3 text-center">
								<Metric label="Counties" value="5" />
								<Metric label="Services" value="2" />
								<Metric label="Rollout" value="Ongoing" />
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* FAQ ---------------------------------------------------------- */}
			<section id="faq" className="section-pad bg-[color:var(--background)]">
				<div className="container-page max-w-4xl">
					<RevealOnScroll>
						<span className="eyebrow eyebrow-dot">FAQ</span>
						<h2 className="mt-4 font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl">
							Questions from North Alabama farmers.
						</h2>
						<p className="mt-4 text-[color:var(--fg-muted)]">
							Short, direct answers to the things growers ask most often. Not
							here? Grab the field guide above, then reply to our email with
							your question—we read every note.
						</p>
					</RevealOnScroll>
					<div className="mt-10">
						<FaqAccordion />
					</div>
				</div>
			</section>

			{/* Mobile sticky CTA --------------------------------------------- */}
			<div className="fixed inset-x-0 bottom-0 z-40 border-t border-[color:var(--border)] bg-white/95 p-3 backdrop-blur md:hidden">
				<Link
					href="#lead-form"
					data-track="mobile-sticky-cta-download-guide"
					aria-label="Download the free field guide"
					className="btn btn-accent inline-flex w-full items-center justify-center gap-2"
				>
					Download the Free Field Guide
					<span aria-hidden>→</span>
				</Link>
			</div>
		</div>
	);
}

function Metric({ label, value }: { label: string; value: string }) {
	return (
		<div className="rounded-xl bg-white/10 p-3">
			<p className="font-heading text-xl font-semibold text-white">{value}</p>
			<p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c9d3b7]">
				{label}
			</p>
		</div>
	);
}
