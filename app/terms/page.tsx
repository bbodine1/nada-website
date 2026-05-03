import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Terms of Service | North Alabama Drone Applicators",
	description:
		"Terms of Service for North Alabama Drone Applicators LLC — drone spraying and spreading services across the Tennessee Valley.",
};

const EFFECTIVE_DATE = "April 22, 2026";

export default function TermsPage() {
	return (
		<>
			<section className="relative overflow-hidden bg-[color:var(--color-primary)] pt-28 pb-16 text-white md:pt-32 md:pb-20">
				<div
					aria-hidden
					className="pointer-events-none absolute inset-0 opacity-25"
					style={{
						backgroundImage:
							"radial-gradient(700px 320px at 10% 0%, rgba(212,160,23,0.25), transparent 60%), radial-gradient(900px 380px at 90% 100%, rgba(255,255,255,0.08), transparent 55%)",
					}}
				/>
				<div className="container-page relative">
					<p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9d3b7]">
						Legal
					</p>
					<h1 className="mt-3 font-heading text-4xl tracking-tight md:text-5xl">
						Terms of Service
					</h1>
					<p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#d4d6c3] md:text-base">
						These Terms govern your use of the North Alabama Drone Applicators
						website and the drone spray and spread services we provide. Please
						read them carefully.
					</p>
					<p className="mt-4 text-xs uppercase tracking-[0.18em] text-[#c9d3b7]">
						Effective {EFFECTIVE_DATE}
					</p>
				</div>
			</section>

			<section className="py-16 md:py-20">
				<div className="container-page">
					<div className="prose prose-neutral max-w-3xl text-[color:var(--fg)]">
						<LegalBlock title="1. About Us">
							<p>
								This website is operated by{" "}
								<strong>North Alabama Drone Applicators LLC</strong>{" "}
								(&ldquo;North Alabama Drone Applicators,&rdquo;
								&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), an
								Alabama limited liability company. References to
								&ldquo;you&rdquo; mean the person visiting the site or
								requesting services.
							</p>
						</LegalBlock>

						<LegalBlock title="2. Acceptance of These Terms">
							<p>
								By accessing this website, submitting a form, reserving a spot
								on a priority or interest list, requesting information, or
								engaging us for services, you agree to these Terms of Service
								and our{" "}
								<Link
									href="/privacy"
									className="font-medium text-[color:var(--color-primary)] underline underline-offset-2 hover:text-[color:var(--color-accent)]"
								>
									Privacy Policy
								</Link>
								. If you do not agree, please do not use the site or our
								services.
							</p>
						</LegalBlock>

						<LegalBlock title="3. Services We Offer">
							<p>
								We provide unmanned aircraft system (UAS / drone) application
								services, including but not limited to the aerial application of
								liquid crop protection products and dry materials such as cover
								crop seed, fertilizer, lime, and pasture inputs. All application
								services are:
							</p>
							<ul>
								<li>
									Subject to a separate written service agreement, work order,
									or invoice specifying scope, rates, products, and acreage;
								</li>
								<li>
									Performed by pilots operating under applicable FAA Part 107
									authorizations and, where required, Part 137 certificates,
									exemptions, or waivers;
								</li>
								<li>
									Performed in accordance with product labels, state pesticide
									regulations, and applicable federal and local laws.
								</li>
							</ul>
							<p>
								Marketing content on this website — including priority lists,
								interest forms, pricing indications, and program descriptions —
								is informational and does not by itself constitute a binding
								offer or contract.
							</p>
						</LegalBlock>

						<LegalBlock title="4. Eligibility and Accurate Information">
							<p>
								You must be at least 18 years old and legally able to enter into
								contracts to request services. You agree to provide accurate,
								current, and complete information (including field locations,
								acreage, crop, product preferences, and contact details) and to
								promptly update that information if it changes.
							</p>
						</LegalBlock>

						<LegalBlock title="5. Scheduling, Weather, and Site Conditions">
							<p>
								Agricultural aerial application depends on weather, wind, label
								requirements, airspace conditions, and site access. We may
								reschedule, reduce scope, or cancel a job when, in our sole
								judgment, conditions do not permit a safe and label-compliant
								application. You agree to:
							</p>
							<ul>
								<li>
									Identify sensitive areas (residences, beehives, organic
									fields, ponds, schools, livestock, neighboring crops, power
									lines, towers, and other obstructions) before application;
								</li>
								<li>
									Keep people, animals, and unprotected equipment clear of
									treatment areas during application;
								</li>
								<li>
									Provide reasonable access to loading areas, water sources (if
									applicable), and the fields to be treated.
								</li>
							</ul>
						</LegalBlock>

						<LegalBlock title="6. Products, Labels, and Regulatory Compliance">
							<p>
								All pesticide, fertilizer, seed, and similar products applied
								will be used consistent with their labels and applicable law.
								You are responsible for disclosing any nearby sensitive crops,
								prior applications, or label-restricted conditions that could
								affect the job. We may decline to apply a product or job that
								cannot be performed safely, legally, or in accordance with the
								label.
							</p>
						</LegalBlock>

						<LegalBlock title="7. Payment Terms">
							<p>
								Unless your written service agreement or invoice states
								otherwise, invoices are due upon receipt. Past-due balances may
								accrue interest at the lesser of 1.5% per month or the maximum
								rate allowed by Alabama law. You agree to reimburse reasonable
								collection costs, including attorney fees, on past-due amounts.
							</p>
						</LegalBlock>

						<LegalBlock title="8. Cancellations and Rescheduling">
							<p>
								Because aerial application windows are short and routes are
								planned in advance, cancellations with short notice may result
								in a rescheduling fee or loss of priority on a given route.
								Specific cancellation terms, if any, will be stated in your
								service agreement or quote.
							</p>
						</LegalBlock>

						<LegalBlock title="9. Assumption of Risk and Limitation of Liability">
							<p>
								Agricultural production is inherently subject to weather, pests,
								disease, market conditions, and other variables beyond our
								control. We cannot and do not guarantee specific yields, kill
								rates, coverage levels, stand counts, or economic outcomes.
							</p>
							<p>
								<strong>
									To the maximum extent permitted by law, our aggregate
									liability to you for any claim arising out of or relating to
									our services or this website is limited to the amounts
									actually paid by you to North Alabama Drone Applicators LLC
									for the specific job giving rise to the claim.
								</strong>{" "}
								We are not liable for indirect, incidental, consequential,
								special, exemplary, or punitive damages, including lost profits,
								loss of yield, or crop damage that is not directly caused by our
								negligence.
							</p>
							<p>
								Nothing in these Terms limits liability that cannot be limited
								under applicable law (for example, for gross negligence or
								willful misconduct).
							</p>
						</LegalBlock>

						<LegalBlock title="10. Indemnification">
							<p>
								You agree to defend, indemnify, and hold harmless North Alabama
								Drone Applicators LLC and its owners, employees, pilots, and
								contractors from and against any third-party claims arising out
								of: (a) inaccurate information you provided; (b) your failure to
								identify sensitive areas or neighbors; (c) your violation of
								law; or (d) your breach of these Terms.
							</p>
						</LegalBlock>

						<LegalBlock title="11. Intellectual Property">
							<p>
								All content on this website — including text, graphics, logos,
								photographs, videos, and downloadable materials such as the
								&quot;Where Drone Application Pays Off&quot; North Alabama Field
								Guide — is owned by North Alabama Drone Applicators LLC or its
								licensors and is protected by intellectual property laws. You
								may view and share this content for personal, non-commercial,
								informational purposes. You may not copy, modify, redistribute,
								or use it for commercial purposes without our prior written
								permission.
							</p>
						</LegalBlock>

						<LegalBlock title="12. Website Use and Conduct">
							<p>
								You agree not to use this website to: (a) violate any law; (b)
								send spam or unsolicited commercial communications; (c)
								interfere with or attempt to disrupt the site; (d) gain
								unauthorized access to any systems; (e) submit false, harmful,
								or misleading information through any form; or (f) scrape,
								frame, or harvest content for unauthorized use.
							</p>
						</LegalBlock>

						<LegalBlock title="13. Third-Party Links and Services">
							<p>
								The website may link to third-party websites or services that we
								do not control (for example, forms, analytics providers, or
								document hosts). We are not responsible for the content or
								practices of those third parties, and your use of them is at
								your own risk and subject to their terms and policies.
							</p>
						</LegalBlock>

						<LegalBlock title="14. Disclaimers">
							<p>
								The website and any downloadable materials are provided on an
								&ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without
								warranties of any kind, whether express or implied, including
								the implied warranties of merchantability, fitness for a
								particular purpose, and non-infringement. Information on this
								site is provided for general informational purposes only and is
								not agronomic, legal, or financial advice.
							</p>
						</LegalBlock>

						<LegalBlock title="15. Changes to These Terms">
							<p>
								We may update these Terms from time to time. If we make material
								changes, we will update the &ldquo;Effective&rdquo; date above
								and, where appropriate, provide additional notice. Continued use
								of the website or our services after the updated Terms take
								effect constitutes your acceptance of them.
							</p>
						</LegalBlock>

						<LegalBlock title="16. Governing Law and Venue">
							<p>
								These Terms are governed by the laws of the State of Alabama,
								without regard to its conflict-of-laws principles. Any dispute
								arising out of or relating to these Terms or our services shall
								be brought exclusively in the state or federal courts located in
								Alabama, and you consent to the personal jurisdiction of those
								courts.
							</p>
						</LegalBlock>

						<LegalBlock title="17. Contact Us">
							<p>
								Questions about these Terms can be sent through our{" "}
								<Link
									href="/contact"
									className="font-medium text-[color:var(--color-primary)] underline underline-offset-2 hover:text-[color:var(--color-accent)]"
								>
									contact form
								</Link>
								, or by mail to:
							</p>
							<address className="not-italic">
								North Alabama Drone Applicators LLC
								<br />
								2703 Park Ave. NW
								<br />
								Hartselle, AL 35640
								<br />
								<span className="font-medium text-[color:var(--color-primary)]">
									info@northaldroneapplicators.com
								</span>
								<br />
								<a
									href="tel:+12565668522"
									className="font-medium text-[color:var(--color-primary)] underline underline-offset-2 hover:text-[color:var(--color-accent)]"
								>
									256-566-8522
								</a>
							</address>
						</LegalBlock>
					</div>

					<div className="mt-12 max-w-3xl border-t border-[color:var(--border)] pt-6">
						<Link
							href="/"
							className="text-sm font-medium text-[color:var(--color-primary)] hover:text-[color:var(--color-accent)]"
						>
							← Back to home
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}

function LegalBlock({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<section className="mt-10 first:mt-0">
			<h2 className="font-heading text-xl tracking-tight text-[color:var(--color-primary)] md:text-2xl">
				{title}
			</h2>
			<div className="mt-3 space-y-3 text-sm leading-relaxed text-[color:var(--fg-muted)] md:text-base">
				{children}
			</div>
		</section>
	);
}
