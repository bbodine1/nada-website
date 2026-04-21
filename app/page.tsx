import Image from 'next/image'

import { FaqAccordion } from '@/components/faq-accordion'
import { LeadInterestForm } from '@/components/lead-interest-form'
import { RevealOnScroll } from '@/components/reveal-on-scroll'

const problemCards = [
	{
		icon: '🌿',
		title: 'Tennessee Valley Weather Doesn’t Wait',
		body: 'Pop-up showers and humid air leave red clay holding water—sometimes the rig can’t roll for days. When the window opens, you need a pass that isn’t tied to someone else’s queue. Drone application can go when ground equipment still can’t.',
	},
	{
		icon: '📉',
		title: 'Thin Stands Before You Walk Every Row',
		body: 'From cotton around Limestone and Lawrence to corn and beans across Madison and Morgan, multispectral maps flag weak areas and variability before you see it from the truck window—so you and your agronomist can prioritize scouting and inputs.',
	},
	{
		icon: '💸',
		title: 'Every Gallon Has to Earn Its Keep',
		body: 'Margins are tight. Targeted application means putting product where the field needs it—not blanketing every acre the same way. That protects yield potential without throwing chemistry at ground that doesn’t need it.',
	},
] as const

const explainerStats = [
	{
		label: 'Yield pressure',
		detail: 'Farmers today grow far more per acre than a generation ago—precision tools are a big part of that story.',
	},
	{
		label: 'Less waste',
		detail:
			'Many operations see better use of crop protection products when applications are timed and placed with precision.',
	},
	{
		label: 'Earlier eyes',
		detail: 'Scouting layers often surface stress days to weeks before you’d catch it on a windshield survey alone.',
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
		county: 'Colbert County',
		crop: 'Corn and double-crop soybeans',
	},
] as const

export default function Home() {
	return (
		<div className="bg-[#f9f6f0] text-[#1a1a1a]">
			<main>
				<section className="relative flex min-h-screen items-end overflow-hidden">
					<video
						className="absolute inset-0 h-full w-full object-cover"
						autoPlay
						muted
						loop
						playsInline
						preload="metadata"
						poster="/hero-fallback.svg"
					>
						<source
							src="/video/farm-spraying.mp4"
							type="video/mp4"
						/>
					</video>
					<Image
						src="/hero-fallback.svg"
						alt="Drone flying over row crops at golden hour"
						fill
						className="object-cover md:hidden"
						priority
					/>
					<div className="hero-overlay absolute inset-0" />
					<div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-12 pt-24 sm:px-10 lg:px-12">
						<div className="grid items-start gap-8 lg:grid-cols-2">
							<RevealOnScroll className="max-w-3xl">
								<h1 className="font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
									See Every Acre. Protect Every Yield.
								</h1>
								<p className="mt-5 text-lg leading-8 text-[#e8e8e8] sm:text-xl">
									Agricultural drone services built for North Alabama farmers - from stand counts in April to spray
									applications in August.
								</p>
								<div className="mt-8 flex flex-col gap-3 sm:flex-row">
									<a
										href="#lead-form"
										data-track="hero-primary-cta"
										className="inline-flex items-center justify-center rounded-md bg-[#d4a017] px-6 py-3 font-semibold text-[#1a1a1a] hover:brightness-95"
									>
										Get Early Access →
									</a>
									<a
										href="#explainer"
										data-track="hero-secondary-cta"
										className="inline-flex items-center justify-center rounded-md border border-white/70 px-6 py-3 font-semibold text-white hover:bg-white/10"
									>
										Watch How It Works ↓
									</a>
								</div>
							</RevealOnScroll>
							<RevealOnScroll className="w-full">
								<div
									id="lead-form"
									className="rounded-xl bg-white/95 p-3 shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
								>
									<LeadInterestForm />
								</div>
							</RevealOnScroll>
						</div>
						<div className="mt-12 grid gap-3 rounded-xl bg-black/30 p-4 text-sm text-white sm:grid-cols-3">
							<p>✓ FAA Certified Pilots</p>
							<p>✓ Serving Limestone, Madison and Lawrence Counties</p>
							<p>✓ NDVI Mapping and Spray Applications</p>
						</div>
					</div>
				</section>

				<section className="section-pad bg-[#f9f6f0]">
					<div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-12">
						<RevealOnScroll>
							<h2 className="font-heading text-3xl font-bold text-[#1e3a0f] sm:text-4xl">
								North Alabama Farming Is Getting Harder. Your Tools Should Get Smarter.
							</h2>
							<p className="mt-4 max-w-3xl text-lg text-[#4c4c4c]">
								Between river bottoms, rolling ground, and humidity off the Gulf, the Tennessee Valley keeps you
								guessing. Limestone to Colbert, Madison to Morgan—same problems: narrow spray windows, rising input
								costs, and fields that don’t all behave the same.
							</p>
						</RevealOnScroll>
						<div className="mt-8 grid gap-5 lg:grid-cols-3">
							{problemCards.map(item => (
								<RevealOnScroll key={item.title}>
									<article className="topo-card rounded-xl p-6">
										<p className="text-2xl">{item.icon}</p>
										<h3 className="mt-3 font-heading text-2xl font-semibold text-[#2d5016]">{item.title}</h3>
										<p className="mt-3 text-[#4c4c4c]">{item.body}</p>
									</article>
								</RevealOnScroll>
							))}
						</div>
					</div>
				</section>

				<section
					id="services"
					className="section-pad bg-white"
				>
					<div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-12">
						<RevealOnScroll>
							<h2 className="font-heading text-3xl font-bold text-[#2d5016] sm:text-4xl">What We Do In Your Fields</h2>
							<p className="mt-3 max-w-3xl text-[#4c4c4c]">
								We fly for you—you don’t buy the drone, fuel it, or chase regulations alone. Built for North Alabama
								rotations: cotton, corn, soybeans, wheat, and hay where it fits your operation.
							</p>
						</RevealOnScroll>

						<div className="mt-10 grid items-center gap-8 lg:grid-cols-2">
							<Image
								src="/service-spray.svg"
								alt="Drone spraying over cotton rows at dusk"
								width={700}
								height={460}
								className="h-full w-full rounded-xl object-cover shadow-[0_4px_24px_rgba(30,58,15,0.10)]"
								loading="lazy"
							/>
							<RevealOnScroll>
								<h3 className="font-heading text-2xl font-bold text-[#2d5016]">Precision Spray Applications</h3>
								<p className="mt-4 text-[#4c4c4c]">
									Fungicide, herbicide, and foliar passes on cotton, corn, soybeans, and wheat—plus hay and forage where
									it makes sense. Aerial application shines on end rows, tree lines, ditches, and patches where a ground
									rig tears ground or can’t turn without hitting a fence or a neighbor’s place—common layouts across
									North Alabama.
								</p>
							</RevealOnScroll>
						</div>

						<div className="mt-10 grid items-center gap-8 lg:grid-cols-2">
							<RevealOnScroll className="lg:order-1">
								<h3 className="font-heading text-2xl font-bold text-[#2d5016]">Crop Scouting and NDVI Mapping</h3>
								<p className="mt-4 text-[#4c4c4c]">
									Multispectral and NDVI-style layers help spot stand gaps, variability, and stress patterns while you
									still have time to react. You get maps you can lay on the tailgate with your agronomist, crop
									consultant, or co-op—real numbers for a real plan, not a generic satellite screenshot.
								</p>
							</RevealOnScroll>
							<Image
								src="/service-ndvi.svg"
								alt="Tablet showing NDVI field map"
								width={700}
								height={460}
								className="h-full w-full rounded-xl object-cover shadow-[0_4px_24px_rgba(30,58,15,0.10)] lg:order-2"
								loading="lazy"
							/>
						</div>
					</div>
				</section>

				<section
					id="explainer"
					className="section-pad bg-[#f9f6f0]"
				>
					<div className="mx-auto max-w-4xl px-6 sm:px-10">
						<RevealOnScroll>
							<h2 className="text-center font-heading text-3xl font-bold text-[#2d5016] sm:text-4xl">
								See It Working In The Field
							</h2>
							<p className="mx-auto mt-4 max-w-2xl text-center text-[#4c4c4c]">
								Smarter spraying is about timing, placement, and less waste—not buzzwords. Here’s the kind of impact
								growers chase across the Valley when application fits the field, not the other way around.
							</p>
						</RevealOnScroll>
						<RevealOnScroll className="mt-7 overflow-hidden rounded-xl bg-white p-3 shadow-[0_4px_24px_rgba(30,58,15,0.10)]">
							<div className="relative aspect-video">
								<iframe
									className="h-full w-full rounded-lg"
									src="https://www.youtube.com/embed/dQw4w9WgXcQ"
									title="North Alabama drone field explainer"
									loading="lazy"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								/>
							</div>
						</RevealOnScroll>
						<div className="mt-8 grid gap-4 text-center sm:grid-cols-3">
							{explainerStats.map(row => (
								<RevealOnScroll
									key={row.label}
									className="rounded-xl border border-[#e3ddd0] bg-white p-5"
								>
									<p className="font-heading text-xl font-bold text-[#1e3a0f]">{row.label}</p>
									<p className="mt-2 text-sm text-[#4c4c4c]">{row.detail}</p>
								</RevealOnScroll>
							))}
						</div>
					</div>
				</section>

				<section className="section-pad bg-white">
					<div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-12">
						<RevealOnScroll>
							<h2 className="font-heading text-3xl font-bold text-[#2d5016] sm:text-4xl">
								Farmers Across North Alabama Are Paying Attention
							</h2>
							<p className="mt-3 max-w-3xl text-[#4c4c4c]">
								We’re building our Fall 2026 route map now—Limestone, Madison, Morgan, Lawrence, Colbert, and
								neighboring counties. Join the priority list and you’ll hear from us as we add fields (example quotes
								below are placeholders).
							</p>
						</RevealOnScroll>
						<div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
							{testimonials.map(testimonial => (
								<RevealOnScroll
									key={testimonial.name}
									className="rounded-xl border border-[#e3ddd0] bg-[#fefdfa] p-5 shadow-[0_4px_24px_rgba(30,58,15,0.10)]"
								>
									<p className="text-[#3f3f3f]">“{testimonial.quote}”</p>
									<p className="mt-4 font-semibold text-[#1a1a1a]">{testimonial.name}</p>
									<p className="text-sm text-[#6b6b6b]">
										{testimonial.county} • {testimonial.crop}
									</p>
									<p className="mt-2 text-xs text-[#9a9a9a]">Placeholder quote</p>
								</RevealOnScroll>
							))}
						</div>
						<div className="mt-7 grid gap-3 text-center text-sm text-[#6b6b6b] sm:grid-cols-3">
							<div className="rounded-md border border-[#e3ddd0] bg-white p-3">
								Alabama Farmers Federation (Placeholder)
							</div>
							<div className="rounded-md border border-[#e3ddd0] bg-white p-3">Auburn Extension (Placeholder)</div>
							<div className="rounded-md border border-[#e3ddd0] bg-white p-3">Local Co-op Partner (Placeholder)</div>
						</div>
					</div>
				</section>

				<section className="section-pad relative overflow-hidden bg-[#1e3a0f]">
					<Image
						src="/form-bg.svg"
						alt=""
						fill
						className="object-cover opacity-10"
						aria-hidden
					/>
					<div className="relative z-10 mx-auto max-w-4xl px-6 sm:px-10">
						<RevealOnScroll>
							<h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
								Reserve Your Free Field Assessment
							</h2>
							<p className="mt-4 text-[#d3ebc9]">
								North Alabama Drone Applicators is a managed service—we bring certified pilots and insured equipment to
								your farm, not a shopping list for you to buy. We’re onboarding a limited number of Tennessee Valley
								operations for Fall 2026: spray, mapping, or both. No contract today—just a conversation about your
								acres and your windows.
							</p>
						</RevealOnScroll>
						<p className="mt-6 text-sm text-[#d3ebc9]">
							Use the form at the top of this page from your truck or office—we route leads by county and crop so when
							the season gets busy, you’re already on the list.
						</p>
					</div>
				</section>

				<section className="section-pad bg-[#f9f6f0]">
					<div className="mx-auto max-w-4xl px-6 sm:px-10">
						<RevealOnScroll>
							<h2 className="font-heading text-3xl font-bold text-[#2d5016] sm:text-4xl">
								Questions From North Alabama Farmers
							</h2>
						</RevealOnScroll>
						<div className="mt-7">
							<FaqAccordion />
						</div>
					</div>
				</section>

				<footer className="border-t border-[#d9d3c6] bg-white">
					<div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-8 text-sm text-[#5a5a5a] sm:px-10 lg:px-12">
						<p className="font-heading text-xl text-[#1e3a0f]">North Alabama Drone Applicators</p>
						<p>Agricultural drone services for Tennessee Valley farms.</p>
						<div className="flex flex-wrap gap-4">
							<a href="#services">Services</a>
							<a href="#lead-form">About</a>
							<a href="#lead-form">Contact</a>
							<a href="#">Facebook</a>
							<a href="#">Instagram</a>
							<a href="#">YouTube</a>
						</div>
						<p>Privacy Policy | © 2025 North Alabama Drone Applicators</p>
					</div>
				</footer>

				<div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#d9d3c6] bg-white p-3 md:hidden">
					<a
						href="#lead-form"
						data-track="mobile-sticky-cta"
						className="inline-flex w-full items-center justify-center rounded-md bg-[#d4a017] px-4 py-3 font-semibold text-[#1a1a1a]"
					>
						Reserve Your Free Assessment →
					</a>
				</div>
			</main>
		</div>
	)
}
