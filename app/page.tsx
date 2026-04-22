import Image from 'next/image'

import { HeroVideo } from '@/components/hero-video'
import { FaqAccordion } from '@/components/faq-accordion'
import { LeadInterestForm } from '@/components/lead-interest-form'
import { RevealOnScroll } from '@/components/reveal-on-scroll'

const problemCards = [
	{
		icon: (
			<svg
				viewBox="0 0 24 24"
				className="h-5 w-5"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.8"
			>
				<path
					d="M4 15c1.5-2.5 4-4 8-4s6.5 1.5 8 4"
					strokeLinecap="round"
				/>
				<path
					d="M8 19c1-1.5 2.5-2 4-2s3 .5 4 2"
					strokeLinecap="round"
				/>
				<path
					d="M12 3v4M9 5l3-3 3 3"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
		title: 'Tennessee Valley Weather Doesn’t Wait',
		body: 'Pop-up showers and humid air leave red clay holding water—sometimes the rig can’t roll for days. When the window opens, you need a pass that isn’t tied to someone else’s queue.',
		bullet: 'Drone application can go when ground equipment still can’t.',
	},
	{
		icon: (
			<svg
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
				<path
					d="M3 21h18"
					strokeLinecap="round"
				/>
			</svg>
		),
		title: 'Uneven Ground, Uneven Needs',
		body: 'River bottoms, end rows, and wet holes don’t all need the same rate. Spray and spread where the field calls for it—without dragging a rig through mud or tearing up headlands.',
		bullet: 'Target product placement without fighting terrain.',
	},
	{
		icon: (
			<svg
				viewBox="0 0 24 24"
				className="h-5 w-5"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.8"
			>
				<circle
					cx="12"
					cy="12"
					r="8"
				/>
				<path
					d="M12 7v5l3 2"
					strokeLinecap="round"
				/>
			</svg>
		),
		title: 'Every Gallon and Pound Has to Earn Its Keep',
		body: 'Margins are tight. Whether it’s liquid chemistry or dry product, placement beats blanket passes—especially when the window is short and the ground won’t cooperate.',
		bullet: 'Protect yield without wasting inputs.',
	},
] as const

const explainerStats = [
	{
		value: 'Tight',
		suffix: 'windows',
		label: 'Spray when it counts',
		detail: 'Get liquid on the crop when the label and weather line up—not when the queue finally opens.',
	},
	{
		value: 'Even',
		suffix: 'patterns',
		label: 'Spread with control',
		detail: 'Dry product where you need it: cover crop seed, fertilizer, lime, and pasture overseeding.',
	},
	{
		value: 'Less',
		suffix: 'ruts',
		label: 'Keep mud off the rows',
		detail: 'Stay off wet ground that would bury a ground rig—same season, less compaction.',
	},
] as const

const testimonials = [
	{
		quote: 'We got cover on end rows and wet holes the rig would’ve torn up. Didn’t have to wait on the co-op line.',
		name: 'J. Hartselle',
		county: 'Limestone County',
		crop: 'Cotton and corn',
	},
	{
		quote: 'After a gully washer, we still got a fungicide pass in when the rig couldn’t have touched it.',
		name: 'R. Tanner',
		county: 'Madison County',
		crop: 'Soybeans and wheat',
	},
	{
		quote: 'Spread lime where we needed it without burying the sprayer. Same field, less guesswork.',
		name: 'C. Green',
		county: 'Cullman County',
		crop: 'Corn and double-crop soybeans',
	},
] as const

const trustItems = [
	{
		title: 'FAA Part 107',
		detail: 'Certified commercial drone pilots, fully insured for agricultural operations.',
	},
	{
		title: 'Managed Service',
		detail: 'We bring the aircraft, fuel, and crew. You stay focused on the farm.',
	},
	{
		title: 'North Alabama Only',
		detail: 'Routes built around Madison, Limestone, Morgan, Cullman & Lawrence counties.',
	},
] as const

export default function Home() {
	return (
		<div className="text-[color:var(--foreground)]">
			{/* Hero ---------------------------------------------------------- */}
			<section className="relative flex min-h-[100vh] items-end overflow-hidden pt-20">
				<HeroVideo />
				<div className="hero-overlay absolute inset-0" />

				<div className="container-page relative z-10 pb-16 pt-10 sm:pb-24 sm:pt-14">
					<div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
						<RevealOnScroll className="max-w-2xl">
							<span className="eyebrow eyebrow-dot border-white/20 bg-white/10 text-white backdrop-blur">
								Fall 2026 · North Alabama
							</span>
							<h1 className="mt-5 font-heading text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
								Drone spraying and spreading.
								<br />
								<span className="gradient-text">Built for North Alabama farms.</span>
							</h1>
							<p className="mt-5 max-w-xl text-lg leading-8 text-[#e8e8e8]">
								This season we&apos;re flying precision spray and dry spreading only—liquid chemistry when the window
								opens, and seed, fertilizer, lime, and pasture overseeding where it fits your operation. Tell us
								you&apos;re interested; we&apos;ll follow up with details and routing for Fall 2026.
							</p>
							<div className="mt-8 flex flex-wrap gap-3">
								<a
									href="#lead-form"
									data-track="hero-primary-cta"
									aria-label="Reserve my spot on the interest list"
									className="btn btn-accent"
								>
									Reserve My Spot
									<svg
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
								</a>
								<a
									href="#lead-form"
									data-track="hero-secondary-cta"
									aria-label="Get the free spray and spread guide—submit the form"
									className="btn btn-outline"
								>
									Download the Free Guide
								</a>
							</div>

							<div className="mt-10 flex flex-wrap items-center gap-2 text-sm text-white/85">
								<span className="chip chip-dark">✓ Spray &amp; spread this season</span>
								<span className="chip chip-dark">✓ FAA Part 107</span>
								<span className="chip chip-dark">✓ 5 Alabama counties</span>
							</div>
						</RevealOnScroll>

						<RevealOnScroll className="w-full">
							<div
								id="lead-form"
								className="scroll-mt-28"
							>
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

			{/* Problems ------------------------------------------------------ */}
			<section
				id="problems"
				className="section-pad topo-bg grain"
			>
				<div className="container-page">
					<RevealOnScroll>
						<span className="eyebrow eyebrow-dot">The Reality Out Here</span>
						<h2 className="mt-4 max-w-3xl font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl lg:text-[2.75rem]">
							North Alabama farming is getting harder.
							<br />
							<span className="text-[color:var(--foreground)]">Your tools should get smarter.</span>
						</h2>
						<p className="mt-5 max-w-3xl text-lg text-[color:var(--fg-muted)]">
							Between river bottoms, rolling ground, and humidity off the Gulf, the Tennessee Valley keeps you guessing.
							Across Madison, Limestone, Morgan, Cullman, and Lawrence Counties—same problems: narrow spray windows,
							rising input costs, and fields that don’t all behave the same.
						</p>
					</RevealOnScroll>

					<div className="mt-12 grid gap-5 lg:grid-cols-3">
						{problemCards.map(item => (
							<RevealOnScroll key={item.title}>
								<article className="topo-card flex h-full flex-col p-7">
									<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--color-primary)] text-[color:var(--color-accent-100)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
										{item.icon}
									</div>
									<h3 className="mt-5 font-heading text-xl font-semibold text-[color:var(--color-primary)]">
										{item.title}
									</h3>
									<p className="mt-3 text-[color:var(--fg-muted)]">{item.body}</p>
									<div className="mt-auto pt-5">
										<p className="flex items-start gap-2 border-t border-[color:var(--border)] pt-4 text-sm font-medium text-[color:var(--color-primary)]">
											<svg
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
			<section
				id="services"
				className="section-pad bg-white"
			>
				<div className="container-page">
					<RevealOnScroll>
						<span className="eyebrow eyebrow-dot">What We Do</span>
						<h2 className="mt-4 max-w-3xl font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl">
							Two ways we show up in your fields.
						</h2>
						<p className="mt-4 max-w-3xl text-lg text-[color:var(--fg-muted)]">
							We fly for you—you don’t buy the drone, fuel it, or chase regulations alone. Fall 2026 focus: precision
							spray and dry spreading for cotton, corn, soybeans, wheat, hay, and pasture where it fits your operation.
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
								Fungicide, herbicide, and foliar passes on cotton, corn, soybeans, and wheat—plus hay and forage where
								it makes sense. Aerial application shines on end rows, tree lines, ditches, and patches where a ground
								rig tears ground or can’t turn without hitting a fence.
							</p>
							<ul className="mt-6 space-y-3 text-sm text-[color:var(--foreground)]">
								{[
									'Fit tighter spray windows and stacked weather days',
									'Protect sensitive ground and buffer zones',
									'Reduce compaction in wet seasons',
								].map(line => (
									<li
										key={line}
										className="flex items-start gap-3"
									>
										<span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-primary-100)] text-[color:var(--color-primary)]">
											<svg
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
								Cover crop seed, dry fertilizer, lime, and pasture overseeding—placed where your plan calls for it,
								without rutting headlands or waiting on ground equipment when the field is still holding water.
							</p>
							<ul className="mt-6 space-y-3 text-sm text-[color:var(--foreground)]">
								{[
									'Reach wet or tight spots without burying a rig',
									'Reduce compaction compared to heavy equipment in soft seasons',
									'Pair spreading with your spray program for one coordinated route',
								].map(line => (
									<li
										key={line}
										className="flex items-start gap-3"
									>
										<span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-primary-100)] text-[color:var(--color-primary)]">
											<svg
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

			{/* Spray + Spread Guide ----------------------------------------- */}
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
							<span className="eyebrow eyebrow-dot">Fall 2026 Overview</span>
							<h2 className="mt-4 font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl">
								Get the Spray + Spread overview (PDF).
							</h2>
							<p className="mt-4 text-lg text-[color:var(--fg-muted)]">
								Benefits for North Alabama acres, preliminary cost-per-acre bands, and where we&apos;re headed—after you
								tell us you&apos;re interested. Submit the short form and we&apos;ll email you the guide.
							</p>
							<ul className="mt-6 space-y-3 text-sm text-[color:var(--foreground)]">
								{[
									'Why drone application fits Tennessee Valley weather and terrain',
									'What we fly this season: spray + spread only',
									'Indicative pricing ranges (preliminary—final quote per field)',
									'Roadmap: Fall 2026 launch and what comes next',
								].map(line => (
									<li
										key={line}
										className="flex items-start gap-3"
									>
										<span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-primary-100)] text-[color:var(--color-primary)]">
											<svg
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
								<a
									href="#lead-form"
									data-track="guide-section-cta"
									aria-label="Request the spray and spread PDF via the interest form"
									className="btn btn-accent inline-flex"
								>
									Request the PDF — join the list
									<svg
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
								</a>
							</div>
						</RevealOnScroll>
					</div>
				</div>
			</section>

			{/* Explainer ---------------------------------------------------- */}
			<section
				id="explainer"
				className="section-pad topo-bg grain"
			>
				<div className="container-page max-w-5xl">
					<RevealOnScroll className="text-center">
						<span className="eyebrow eyebrow-dot">See It Working</span>
						<h2 className="mt-4 font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl">
							Spray and spread, on your schedule.
						</h2>
						<p className="mx-auto mt-4 max-w-2xl text-[color:var(--fg-muted)]">
							Liquid passes when the label and weather line up; dry product when the field needs it—without the ruts and
							delays that come with ground rigs in a wet Tennessee Valley season.
						</p>
					</RevealOnScroll>

					<RevealOnScroll className="mt-10 overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-white p-2 shadow-[var(--shadow-lg)]">
						<div className="relative aspect-video overflow-hidden rounded-[calc(var(--radius-xl)_-_0.5rem)]">
							<iframe
								className="h-full w-full"
								src="https://youtube.com/embed/PbglS6ByHVk"
								title="North Alabama drone field biostem application"
								loading="lazy"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>
						</div>
					</RevealOnScroll>

					<div className="mt-10 grid gap-4 sm:grid-cols-3">
						{explainerStats.map(row => (
							<RevealOnScroll
								key={row.label}
								className="rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-white p-6"
							>
								<p className="font-heading text-3xl font-semibold text-[color:var(--color-primary)]">
									{row.value}
									<span className="ml-1 text-base font-medium text-[color:var(--fg-subtle)]">{row.suffix}</span>
								</p>
								<p className="mt-2 text-sm font-semibold text-[color:var(--foreground)]">{row.label}</p>
								<p className="mt-2 text-sm text-[color:var(--fg-muted)]">{row.detail}</p>
							</RevealOnScroll>
						))}
					</div>
				</div>
			</section>

			{/* Trust --------------------------------------------------------- */}
			<section className="bg-white py-12">
				<div className="container-page grid gap-6 md:grid-cols-3">
					{trustItems.map(item => (
						<div
							key={item.title}
							className="flex items-start gap-4 rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-[color:var(--surface-muted)] p-5"
						>
							<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[color:var(--color-primary)] text-[color:var(--color-accent-100)]">
								<svg
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
								<p className="font-heading text-lg font-semibold text-[color:var(--color-primary)]">{item.title}</p>
								<p className="mt-1 text-sm text-[color:var(--fg-muted)]">{item.detail}</p>
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
								We’re building our Fall 2026 route map for spray and spread across Madison, Limestone, Morgan, Cullman,
								and Lawrence Counties—Alabama only. Join the list, request the PDF, and we’ll follow up (example quotes
								below are placeholders).
							</p>
						</div>
						<a
							href="#lead-form"
							className="btn btn-ghost"
							data-track="testimonials-cta"
						>
							Reserve my spot
						</a>
					</RevealOnScroll>

					<div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
						{testimonials.map(testimonial => (
							<RevealOnScroll
								key={testimonial.name}
								className="flex h-full flex-col rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-white p-7 shadow-[var(--shadow-sm)]"
							>
								<svg
									viewBox="0 0 32 32"
									className="h-8 w-8 text-[color:var(--color-accent)]"
									fill="currentColor"
								>
									<path d="M11 8c-3.3 0-6 2.7-6 6v10h10V14H9c0-1.1.9-2 2-2V8Zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8Z" />
								</svg>
								<p className="mt-4 text-[color:var(--foreground)]">“{testimonial.quote}”</p>
								<div className="mt-6 flex items-center justify-between border-t border-[color:var(--border)] pt-4">
									<div>
										<p className="font-semibold text-[color:var(--foreground)]">{testimonial.name}</p>
										<p className="text-xs text-[color:var(--fg-subtle)]">
											{testimonial.county} · {testimonial.crop}
										</p>
									</div>
									<div className="flex gap-0.5 text-[color:var(--color-accent)]">
										{Array.from({ length: 5 }).map((_, i) => (
											<svg
												key={i}
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

					<div className="mt-10 grid gap-3 text-center text-xs uppercase tracking-[0.18em] text-[color:var(--fg-subtle)] sm:grid-cols-3">
						<div className="rounded-md border border-dashed border-[color:var(--border-strong)] bg-white px-3 py-4">
							Alabama Farmers Federation
						</div>
						<div className="rounded-md border border-dashed border-[color:var(--border-strong)] bg-white px-3 py-4">
							Auburn Extension
						</div>
						<div className="rounded-md border border-dashed border-[color:var(--border-strong)] bg-white px-3 py-4">
							Local Co-op Partner
						</div>
					</div>
				</div>
			</section>

			{/* Final CTA ---------------------------------------------------- */}
			<section className="section-pad relative overflow-hidden bg-[color:var(--color-primary)]">
				<Image
					src="/form-bg.svg"
					alt=""
					fill
					className="object-cover opacity-10"
					aria-hidden
				/>
				<div
					aria-hidden
					className="pointer-events-none absolute inset-0"
					style={{
						backgroundImage: 'radial-gradient(700px 320px at 85% 20%, rgba(212,160,23,0.22), transparent 55%)',
					}}
				/>
				<div className="container-page relative z-10 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
					<div>
						<span className="eyebrow eyebrow-dot border-white/20 bg-white/10 text-white backdrop-blur">
							Fall 2026 · Early Access
						</span>
						<h2 className="mt-4 font-heading text-3xl font-semibold text-white sm:text-4xl lg:text-[2.75rem]">
							Reserve your free field assessment.
						</h2>
						<p className="mt-5 max-w-xl text-[#d3ebc9]">
							North Alabama Drone Applicators is a managed service—we bring certified pilots and insured equipment to
							your farm, not a shopping list for you to buy. This season we&apos;re onboarding Tennessee Valley
							operations for Fall 2026: drone spraying, drone spreading, or both.
						</p>
						<ul className="mt-6 space-y-3 text-sm text-[#e9f0dd]">
							{[
								'No contract today — just a conversation about your acres.',
								'We route leads by county and crop, so you’re already on the list when season hits.',
								'Only serving Madison, Limestone, Morgan, Cullman & Lawrence counties.',
							].map(line => (
								<li
									key={line}
									className="flex items-start gap-3"
								>
									<span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-accent)] text-[color:var(--color-primary)]">
										<svg
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
							<a
								href="#lead-form"
								data-track="final-cta"
								aria-label="Reserve my spot on the interest list"
								className="btn btn-accent"
							>
								Reserve My Spot
								<svg
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
							</a>
						</div>
					</div>

					<div className="relative">
						<div className="absolute inset-0 -m-2 rounded-[var(--radius-xl)] bg-[color:var(--color-accent)]/15 blur-2xl" />
						<div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-white/20 bg-white/[0.06] p-6 text-white backdrop-blur">
							<p className="font-heading text-xl font-semibold">Why leave your spot to chance?</p>
							<p className="mt-3 text-sm text-[#d3ebc9]">
								Routes are built in advance. Our bandwidth on any given day depends on who’s already on the list and how
								close their acres are to our next stop.
							</p>
							<div className="mt-6 grid grid-cols-3 gap-3 text-center">
								<Metric
									label="Counties"
									value="5"
								/>
								<Metric
									label="Services"
									value="2"
								/>
								<Metric
									label="Launch"
									value="Fall ’26"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* FAQ ---------------------------------------------------------- */}
			<section
				id="faq"
				className="section-pad bg-[color:var(--background)]"
			>
				<div className="container-page max-w-4xl">
					<RevealOnScroll>
						<span className="eyebrow eyebrow-dot">FAQ</span>
						<h2 className="mt-4 font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl">
							Questions from North Alabama farmers.
						</h2>
						<p className="mt-4 text-[color:var(--fg-muted)]">
							Short, direct answers to the things growers ask most often. Not here? Drop it in the notes field when you
							join the list.
						</p>
					</RevealOnScroll>
					<div className="mt-10">
						<FaqAccordion />
					</div>
				</div>
			</section>

			{/* Mobile sticky CTA --------------------------------------------- */}
			<div className="fixed inset-x-0 bottom-0 z-40 border-t border-[color:var(--border)] bg-white/95 p-3 backdrop-blur md:hidden">
				<a
					href="#lead-form"
					data-track="mobile-sticky-cta"
					aria-label="Reserve my spot and request the spray and spread guide"
					className="btn btn-accent w-full"
				>
					Reserve My Spot &amp; Get the Guide →
				</a>
			</div>
		</div>
	)
}

function Metric({ label, value }: { label: string; value: string }) {
	return (
		<div className="rounded-xl bg-white/10 p-3">
			<p className="font-heading text-xl font-semibold text-white">{value}</p>
			<p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c9d3b7]">{label}</p>
		</div>
	)
}
