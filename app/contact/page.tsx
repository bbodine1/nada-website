import type { Metadata } from 'next'

import { ContactForm } from '@/components/contact-form'

export const metadata: Metadata = {
	title: 'Contact North Alabama Drone Applicators',
	description:
		'Reach North Alabama Drone Applicators about drone spraying, spreading, or a custom field review — send a message and we’ll reply.',
	alternates: {
		canonical: '/contact',
	},
	openGraph: {
		title: 'Contact North Alabama Drone Applicators',
		description:
			'Questions about drone application in the Tennessee Valley? Use our contact form and we’ll get back to you.',
		url: '/contact',
		siteName: 'North Alabama Drone Applicators',
		locale: 'en_US',
		type: 'website',
	},
}

export default function ContactPage() {
	return (
		<>
			<section className="relative overflow-hidden bg-[color:var(--color-primary)] pt-28 pb-16 text-white md:pt-32 md:pb-20">
				<div
					aria-hidden
					className="pointer-events-none absolute inset-0 opacity-25"
					style={{
						backgroundImage:
							'radial-gradient(700px 320px at 10% 0%, rgba(212,160,23,0.25), transparent 60%), radial-gradient(900px 380px at 90% 100%, rgba(255,255,255,0.08), transparent 55%)',
					}}
				/>
				<div className="container-page relative">
					<p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9d3b7]">Contact</p>
					<h1 className="mt-3 font-heading text-4xl tracking-tight md:text-5xl">Get in touch</h1>
					<p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#d4d6c3] md:text-base">
						Tell us about your fields, timing, and what you&apos;re trying to accomplish — whether it&apos;s a quote, a
						custom field review, or a general question about drone spray and spread in North Alabama.
					</p>
				</div>
			</section>

			<section className="py-16 md:py-20">
				<div className="container-page">
					<div className="mx-auto max-w-xl">
						<ContactForm />
					</div>
				</div>
			</section>
		</>
	)
}
