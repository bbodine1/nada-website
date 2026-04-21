import Image from 'next/image'

import { FaqAccordion } from '@/components/faq-accordion'
import { LeadInterestForm } from '@/components/lead-interest-form'
import { RevealOnScroll } from '@/components/reveal-on-scroll'

const problemCards = [
	{
		icon: (
			<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
				<path d="M4 15c1.5-2.5 4-4 8-4s6.5 1.5 8 4" strokeLinecap="round" />
				<path d="M8 19c1-1.5 2.5-2 4-2s3 .5 4 2" strokeLinecap="round" />
				<path d="M12 3v4M9 5l3-3 3 3" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
		title: 'Tennessee Valley Weather Doesn’t Wait',
		body: 'Pop-up showers and humid air leave red clay holding water—sometimes the rig can’t roll for days. When the window opens, you need a pass that isn’t tied to someone else’s queue.',
		bullet: 'Drone application can go when ground equipment still can’t.',
	},
	{
		icon: (
			<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
				<path d="M3 17l4-5 4 3 5-7 5 6" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M3 21h18" strokeLinecap="round" />
			</svg>
		),
		title: 'Thin Stands Before You Walk Every Row',
		body: 'From cotton around Limestone and Lawrence to corn and beans across Madison, Morgan, and Cullman, multispectral maps flag weak areas and variability before you see it from the truck window.',
		bullet: 'Catch issues in days, not weeks.',
	},
	{
		icon: (
			<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
				<circle cx="12" cy="12" r="8" />
				<path d="M12 7v5l3 2" strokeLinecap="round" />
			</svg>
		),
		title: 'Every Gallon Has to Earn Its Keep',
		body: 'Margins are tight. Targeted application means putting product where the field needs it—not blanketing every acre the same way.',
		bullet: 'Protect yield without wasting chemistry.',
	},
] as const

const explainerStats = [
	{
		value: 'Narrow',
		suffix: 'windows',
		label: 'Better timing',
		detail: 'Fly in the hours that fit the label—not when a waiting list lets you.',
	},
	{
		value: 'Less',
		suffix: 'waste',
		label: 'Placement over blanket',
		detail: 'Put product where the field actually needs it, based on real data.',
	},
	{
		value: 'Earlier',
		suffix: 'eyes',
		label: 'Real scouting layers',
		detail: 'See stress days to weeks before a windshield survey would catch it.',
	},
] as const

const testimonials = [
	{
		quote: 'The map showed thin cotton spots I wouldn’t have walked to in time. Saved us a guess on replant.',
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
		quote: 'Gave our co-op something concrete to look at—where to go first on double-crop beans.',
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
				<video
					className="absolute inset-0 h-full w-full object-cover"
					autoPlay
					muted
					loop
					playsInline
					preload="metadata"
					poster="/hero-fallback.svg"
				>
					<source src="/video/farm-spraying.mp4" type="video/mp4" />
				</video>
				<Image
					src="/hero-fallback.svg"
					alt="Drone flying over row crops at golden hour"
					fill
					className="object-cover md:hidden"
					priority
				/>
				<div className="hero-overlay absolute inset-0" />

				<div className="container-page relative z-10 pb-16 pt-10 sm:pb-24 sm:pt-14">
					<div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
						<RevealOnScroll className="max-w-2xl">
							<span className="eyebrow eyebrow-dot border-white/20 bg-white/10 text-white backdrop-blur">
								Fall 2026 · North Alabama
							</span>
							<h1 className="mt-5 font-heading text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
								See every acre.
								<br />
								<span className="gradient-text">Protect every yield.</span>
							</h1>
							<p className="mt-5 max-w-xl text-lg leading-8 text-[#e8e8e8]">
								Agricultural drone services built for North Alabama farmers—from stand counts in April to
								spray applications in August. You fly the farm. We’ll fly the drones.
							</p>
							<div className="mt-8 flex flex-wrap gap-3">
								<a href="#lead-form" data-track="hero-primary-cta" className="btn btn-accent">
									Get Early Access
									<svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
										<path d="M4 10h12M12 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</a>
								<a href="#explainer" data-track="hero-secondary-cta" className="btn btn-outline">
									Watch How It Works
								</a>
							</div>

							<div className="mt-10 flex flex-wrap items-center gap-2 text-sm text-white/85">
								<span className="chip chip-dark">✓ FAA Part 107</span>
								<span className="chip chip-dark">✓ Fully Insured</span>
								<span className="chip chip-dark">✓ 5 Alabama counties</span>
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
					<svg viewBox="0 0 16 16" className="h-3.5 w-3.5 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2">
						<path d="M8 3v10M3 9l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</a>
			</section>

			{/* Problems ------------------------------------------------------ */}
			<section id="problems" className="section-pad topo-bg grain">
				<div className="container-page">
					<RevealOnScroll>
						<span className="eyebrow eyebrow-dot">The Reality Out Here</span>
						<h2 className="mt-4 max-w-3xl font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl lg:text-[2.75rem]">
							North Alabama farming is getting harder.
							<br />
							<span className="text-[color:var(--foreground)]">Your tools should get smarter.</span>
						</h2>
						<p className="mt-5 max-w-3xl text-lg text-[color:var(--fg-muted)]">
							Between river bottoms, rolling ground, and humidity off the Gulf, the Tennessee Valley keeps you
							guessing. Across Madison, Limestone, Morgan, Cullman, and Lawrence Counties—same problems: narrow
							spray windows, rising input costs, and fields that don’t all behave the same.
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
									<p className="mt-3 text-[color:var(--fg-muted)]">{item.body}</p>
									<div className="mt-auto pt-5">
										<p className="flex items-start gap-2 border-t border-[color:var(--border)] pt-4 text-sm font-medium text-[color:var(--color-primary)]">
											<svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--color-accent)]" fill="currentColor">
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
							We fly for you—you don’t buy the drone, fuel it, or chase regulations alone. Built for North
							Alabama rotations: cotton, corn, soybeans, wheat, and hay where it fits your operation.
						</p>
					</RevealOnScroll>

					<div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
						<RevealOnScroll>
							<div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--border)] shadow-[var(--shadow)]">
								<Image
									src="/service-spray.svg"
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
								Fungicide, herbicide, and foliar passes on cotton, corn, soybeans, and wheat—plus hay and
								forage where it makes sense. Aerial application shines on end rows, tree lines, ditches, and
								patches where a ground rig tears ground or can’t turn without hitting a fence.
							</p>
							<ul className="mt-6 space-y-3 text-sm text-[color:var(--foreground)]">
								{[
									'Fit tighter spray windows and stacked weather days',
									'Protect sensitive ground and buffer zones',
									'Reduce compaction in wet seasons',
								].map((line) => (
									<li key={line} className="flex items-start gap-3">
										<span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-primary-100)] text-[color:var(--color-primary)]">
											<svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor">
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
									src="/service-ndvi.svg"
									alt="Tablet showing NDVI field map"
									width={800}
									height={520}
									className="h-full w-full object-cover"
									loading="lazy"
								/>
								<span className="absolute left-4 top-4 chip bg-white/85 text-[color:var(--color-primary)]">
									NDVI Mapping
								</span>
							</div>
						</RevealOnScroll>
						<RevealOnScroll className="lg:order-1">
							<h3 className="font-heading text-2xl font-semibold text-[color:var(--color-primary)] sm:text-3xl">
								Crop Scouting and NDVI Mapping
							</h3>
							<p className="mt-4 text-[color:var(--fg-muted)]">
								Multispectral and NDVI-style layers help spot stand gaps, variability, and stress patterns
								while you still have time to react. Real numbers for a real plan—not a generic satellite
								screenshot.
							</p>
							<ul className="mt-6 space-y-3 text-sm text-[color:var(--foreground)]">
								{[
									'Stand counts and early emergence maps',
									'Variability flags for your agronomist or co-op',
									'Tailgate-ready PDFs and shapefiles',
								].map((line) => (
									<li key={line} className="flex items-start gap-3">
										<span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-primary-100)] text-[color:var(--color-primary)]">
											<svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor">
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

			{/* Explainer ---------------------------------------------------- */}
			<section id="explainer" className="section-pad topo-bg grain">
				<div className="container-page max-w-5xl">
					<RevealOnScroll className="text-center">
						<span className="eyebrow eyebrow-dot">See It Working</span>
						<h2 className="mt-4 font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl">
							Smarter spraying, in the field.
						</h2>
						<p className="mx-auto mt-4 max-w-2xl text-[color:var(--fg-muted)]">
							Timing, placement, and less waste—not buzzwords. Here’s the kind of impact growers across the
							Valley chase when application fits the field, not the other way around.
						</p>
					</RevealOnScroll>

					<RevealOnScroll className="mt-10 overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-white p-2 shadow-[var(--shadow-lg)]">
						<div className="relative aspect-video overflow-hidden rounded-[calc(var(--radius-xl)_-_0.5rem)]">
							<iframe
								className="h-full w-full"
								src="https://www.youtube.com/embed/dQw4w9WgXcQ"
								title="North Alabama drone field explainer"
								loading="lazy"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
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
					{trustItems.map((item) => (
						<div
							key={item.title}
							className="flex items-start gap-4 rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-[color:var(--surface-muted)] p-5"
						>
							<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[color:var(--color-primary)] text-[color:var(--color-accent-100)]">
								<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
									<path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4Z" strokeLinejoin="round" />
									<path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
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
			<section id="testimonials" className="section-pad bg-[color:var(--background)]">
				<div className="container-page">
					<RevealOnScroll className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
						<div className="max-w-2xl">
							<span className="eyebrow eyebrow-dot">Growers Talking</span>
							<h2 className="mt-4 font-heading text-3xl font-semibold text-[color:var(--color-primary)] sm:text-4xl">
								Farmers across North Alabama are paying attention.
							</h2>
							<p className="mt-4 text-[color:var(--fg-muted)]">
								We’re building our Fall 2026 route map for Madison, Limestone, Morgan, Cullman, and Lawrence
								Counties in Alabama only. Join the priority list and you’ll hear from us as we add fields
								(example quotes below are placeholders).
							</p>
						</div>
						<a href="#lead-form" className="btn btn-ghost">
							Join the priority list
						</a>
					</RevealOnScroll>

					<div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
						{testimonials.map((testimonial) => (
							<RevealOnScroll
								key={testimonial.name}
								className="flex h-full flex-col rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-white p-7 shadow-[var(--shadow-sm)]"
							>
								<svg viewBox="0 0 32 32" className="h-8 w-8 text-[color:var(--color-accent)]" fill="currentColor">
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
											<svg key={i} viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor">
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
						backgroundImage:
							'radial-gradient(700px 320px at 85% 20%, rgba(212,160,23,0.22), transparent 55%)',
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
							North Alabama Drone Applicators is a managed service—we bring certified pilots and insured
							equipment to your farm, not a shopping list for you to buy. We’re onboarding a limited number of
							Tennessee Valley operations for Fall 2026: spray, mapping, or both.
						</p>
						<ul className="mt-6 space-y-3 text-sm text-[#e9f0dd]">
							{[
								'No contract today — just a conversation about your acres.',
								'We route leads by county and crop, so you’re already on the list when season hits.',
								'Only serving Madison, Limestone, Morgan, Cullman & Lawrence counties.',
							].map((line) => (
								<li key={line} className="flex items-start gap-3">
									<span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-accent)] text-[color:var(--color-primary)]">
										<svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor">
											<path d="M6.5 11.5L3 8l1.4-1.4 2.1 2.1L11.6 3.5 13 4.9z" />
										</svg>
									</span>
									<span>{line}</span>
								</li>
							))}
						</ul>
						<div className="mt-8">
							<a href="#lead-form" data-track="final-cta" className="btn btn-accent">
								Reserve Your Free Assessment
								<svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
									<path d="M4 10h12M12 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</a>
						</div>
					</div>

					<div className="relative">
						<div className="absolute inset-0 -m-2 rounded-[var(--radius-xl)] bg-[color:var(--color-accent)]/15 blur-2xl" />
						<div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-white/20 bg-white/[0.06] p-6 text-white backdrop-blur">
							<p className="font-heading text-xl font-semibold">Why leave your spot to chance?</p>
							<p className="mt-3 text-sm text-[#d3ebc9]">
								Routes are built in advance. Our bandwidth on any given day depends on who’s already on
								the list and how close their acres are to our next stop.
							</p>
							<div className="mt-6 grid grid-cols-3 gap-3 text-center">
								<Metric label="Counties" value="5" />
								<Metric label="Crops" value="6+" />
								<Metric label="Launch" value="Fall ’26" />
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
							Short, direct answers to the things growers ask most often. Not here? Drop it in the notes
							field when you join the list.
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
					className="btn btn-accent w-full"
				>
					Reserve Your Free Assessment →
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
