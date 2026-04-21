import Image from 'next/image'

import { FaqAccordion } from '@/components/faq-accordion'
import { LeadInterestForm } from '@/components/lead-interest-form'
import { RevealOnScroll } from '@/components/reveal-on-scroll'

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
						poster="/hero-fallback.jpg"
					>
						<source
							src="/video/farm-spraying.mp4"
							type="video/mp4"
						/>
					</video>
					<Image
						src="/hero-fallback.jpg"
						alt="Drone flying over row crops at golden hour"
						fill
						sizes="(max-width: 767px) 100vw, 0px"
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
						</RevealOnScroll>
						<div className="mt-8 grid gap-5 lg:grid-cols-3">
							{[
								{
									icon: '🌿',
									title: 'Missed Spray Windows',
									body: 'Ground rigs cannot always get in after rain. Drones fly when equipment cannot, helping you protect timing and yield.',
								},
								{
									icon: '📉',
									title: 'Crop Stress You Cannot See',
									body: 'NDVI mapping can flag weak spots before visible damage in the field so you can act earlier with your agronomy team.',
								},
								{
									icon: '💸',
									title: 'Rising Input Costs',
									body: 'Precision application helps target where treatment is needed so you use less product and protect margins.',
								},
							].map(item => (
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
									We support cotton, corn, soybeans, and wheat with fungicide, herbicide, and foliar nutrient
									applications. Drone applications are especially useful near homes, drainage ditches, and parts of the
									field where ground rigs struggle.
								</p>
							</RevealOnScroll>
						</div>

						<div className="mt-10 grid items-center gap-8 lg:grid-cols-2">
							<RevealOnScroll className="lg:order-1">
								<h3 className="font-heading text-2xl font-bold text-[#2d5016]">Crop Scouting and NDVI Mapping</h3>
								<p className="mt-4 text-[#4c4c4c]">
									Multispectral mapping helps identify stand gaps, pest pressure, and possible nutrient issues earlier.
									You receive georeferenced maps you can use with your agronomist or co-op for decisions in-season.
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
							{[
								['262%', 'More food produced per acre today vs. 1950.'],
								['Up to 40%', 'Potential reduction in chemical inputs with precision application.'],
								['2 to 3 weeks', 'Earlier crop stress detection versus visual scouting alone.'],
							].map(([stat, detail]) => (
								<RevealOnScroll
									key={stat}
									className="rounded-xl border border-[#e3ddd0] bg-white p-5"
								>
									<p className="font-heading text-3xl font-bold text-[#1e3a0f]">{stat}</p>
									<p className="mt-2 text-sm text-[#4c4c4c]">{detail}</p>
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
						</RevealOnScroll>
						<div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
							{[
								{
									quote:
										'I was skeptical at first, but the NDVI map showed thin spots I would not have caught early enough.',
									name: 'J. Hartselle',
									county: 'Limestone County',
									crop: 'Cotton and Corn',
								},
								{
									quote:
										'After rain, we still got coverage done on schedule. That timing made a real difference for us.',
									name: 'R. Tanner',
									county: 'Madison County',
									crop: 'Soybeans and Wheat',
								},
								{
									quote: 'The map layers gave us better conversations with our co-op about where to focus first.',
									name: 'C. Green',
									county: 'Lawrence County',
									crop: 'Corn and Hay',
								},
							].map(testimonial => (
								<RevealOnScroll
									key={testimonial.name}
									className="rounded-xl border border-[#e3ddd0] bg-[#fefdfa] p-5 shadow-[0_4px_24px_rgba(30,58,15,0.10)]"
								>
									<p className="text-[#3f3f3f]">“{testimonial.quote}”</p>
									<p className="mt-4 font-semibold text-[#1a1a1a]">{testimonial.name}</p>
									<p className="text-sm text-[#6b6b6b]">
										{testimonial.county} • {testimonial.crop}
									</p>
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
						sizes="100vw"
						className="object-cover opacity-10"
						aria-hidden
					/>
					<div className="relative z-10 mx-auto max-w-4xl px-6 sm:px-10">
						<RevealOnScroll>
							<h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
								Reserve Your Free Field Assessment
							</h2>
							<p className="mt-4 text-[#d3ebc9]">
								We are onboarding a limited number of farms in North Alabama for Fall 2026. Secure your spot now with no
								commitment required.
							</p>
						</RevealOnScroll>
						<p className="mt-6 text-sm text-[#d3ebc9]">
							The form is at the top of this page so you can submit quickly from mobile or desktop.
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
