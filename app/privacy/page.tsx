import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Privacy Policy | North Alabama Drone Applicators",
	description:
		"Privacy Policy for North Alabama Drone Applicators LLC — how we collect, use, and protect information submitted through our website.",
};

const EFFECTIVE_DATE = "April 22, 2026";

export default function PrivacyPage() {
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
						Privacy Policy
					</h1>
					<p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#d4d6c3] md:text-base">
						We respect your privacy. This policy explains what information we
						collect through our website and services, how we use it, and the
						choices you have.
					</p>
					<p className="mt-4 text-xs uppercase tracking-[0.18em] text-[#c9d3b7]">
						Effective {EFFECTIVE_DATE}
					</p>
				</div>
			</section>

			<section className="py-16 md:py-20">
				<div className="container-page">
					<div className="prose prose-neutral max-w-3xl text-[color:var(--fg)]">
						<LegalBlock title="1. Who We Are">
							<p>
								This Privacy Policy applies to websites, forms, and services
								provided by <strong>North Alabama Drone Applicators LLC</strong>{" "}
								(&ldquo;North Alabama Drone Applicators,&rdquo;
								&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), an
								Alabama limited liability company. Our primary service area is
								the Tennessee Valley in North Alabama.
							</p>
						</LegalBlock>

						<LegalBlock title="2. Information We Collect">
							<p>
								We collect information that you give us and information that is
								automatically generated when you use the site.
							</p>
							<h3 className="text-base font-semibold text-[color:var(--color-primary)]">
								Information you provide
							</h3>
							<ul>
								<li>
									<strong>Contact and farm details</strong> submitted through
									our interest list, contact forms, or guide requests — such as
									your name, email address, phone number, county, crop type,
									approximate acreage, and the services you&rsquo;re interested
									in;
								</li>
								<li>
									<strong>Communications</strong> you send us by email, text, or
									phone;
								</li>
								<li>
									<strong>Job and customer records</strong> if you become a
									customer, such as field locations, product and rate
									information, invoices, and payment records.
								</li>
							</ul>
							<h3 className="text-base font-semibold text-[color:var(--color-primary)]">
								Information collected automatically
							</h3>
							<ul>
								<li>
									<strong>Device and usage data</strong> such as IP address,
									browser type, device type, pages visited, referring URLs, and
									approximate location derived from IP;
								</li>
								<li>
									<strong>Cookies and similar technologies</strong> used to
									operate the site, remember preferences, and measure
									performance.
								</li>
							</ul>
						</LegalBlock>

						<LegalBlock title="3. How We Use Information">
							<p>We use the information we collect to:</p>
							<ul>
								<li>
									Respond to inquiries, send requested materials (such as the
									&quot;Where Drone Application Pays Off&quot; North Alabama
									Field Guide PDF), and follow up about scheduling;
								</li>
								<li>
									Add you to a priority or interest list when you request it and
									contact you about service availability;
								</li>
								<li>
									Plan routes, prepare quotes, perform services, issue invoices,
									and maintain business records;
								</li>
								<li>
									Operate, secure, and improve the website and our services;
								</li>
								<li>
									Comply with legal obligations, resolve disputes, and enforce
									our agreements.
								</li>
							</ul>
							<p>We do not sell your personal information.</p>
						</LegalBlock>

						<LegalBlock title="4. How We Share Information">
							<p>
								We share personal information only as needed to run our business
								and as described below:
							</p>
							<ul>
								<li>
									<strong>Service providers</strong> that help us operate the
									site and communicate with you — for example, website and form
									hosting, database hosting, email delivery, analytics, document
									generation, and customer messaging tools. These providers are
									only permitted to use your information to provide services to
									us.
								</li>
								<li>
									<strong>Professional advisors</strong> such as attorneys,
									accountants, and insurers, where appropriate.
								</li>
								<li>
									<strong>Legal and safety</strong> — when we reasonably believe
									disclosure is required by law, court order, or to protect the
									rights, property, or safety of any person.
								</li>
								<li>
									<strong>Business transfers</strong> — if we are involved in a
									merger, acquisition, financing, or sale of assets, your
									information may be transferred as part of that transaction,
									subject to a comparable privacy commitment.
								</li>
							</ul>
						</LegalBlock>

						<LegalBlock title="5. Cookies and Analytics">
							<p>
								We use a limited number of cookies and similar technologies to
								keep the site working correctly and to understand how visitors
								interact with our content so we can improve it. Most browsers
								let you refuse or delete cookies through your browser settings;
								doing so may affect how parts of the site function.
							</p>
						</LegalBlock>

						<LegalBlock title="6. Email, Text, and Phone Communications">
							<p>
								When you submit a form or contact us, you are providing consent
								for us to respond by email, phone, or text about your request,
								our services, and availability. You can ask us to stop
								contacting you at any time by replying &ldquo;STOP&rdquo; to a
								text message, using the unsubscribe link in an email, or sending
								us a written request. Message and data rates may apply to text
								messages from your carrier.
							</p>
						</LegalBlock>

						<LegalBlock title="7. Data Retention">
							<p>
								We keep personal information for as long as reasonably necessary
								to fulfill the purposes described in this policy, including
								providing services, maintaining business and tax records,
								resolving disputes, and complying with our legal obligations.
							</p>
						</LegalBlock>

						<LegalBlock title="8. Security">
							<p>
								We use reasonable administrative, technical, and physical
								safeguards designed to protect personal information against
								loss, theft, unauthorized access, disclosure, and alteration. No
								method of transmission over the internet or electronic storage
								is 100% secure, and we cannot guarantee absolute security.
							</p>
						</LegalBlock>

						<LegalBlock title="9. Your Choices and Rights">
							<p>You can:</p>
							<ul>
								<li>
									Ask us to access, correct, or delete personal information we
									have about you;
								</li>
								<li>Opt out of marketing emails or texts at any time;</li>
								<li>
									Ask us to stop processing your information for a specific
									purpose.
								</li>
							</ul>
							<p>
								Depending on where you live, you may have additional rights
								under applicable law. To exercise any of these rights, please
								contact us using the information below. We may need to verify
								your identity before acting on a request.
							</p>
						</LegalBlock>

						<LegalBlock title="10. Children's Privacy">
							<p>
								Our website and services are intended for adults. We do not
								knowingly collect personal information from children under 13.
								If you believe a child has submitted information, please contact
								us and we will promptly delete it.
							</p>
						</LegalBlock>

						<LegalBlock title="11. Third-Party Websites">
							<p>
								Our site may link to third-party websites or services that we
								don&rsquo;t control. This policy does not apply to those sites.
								We encourage you to review the privacy policies of any
								third-party site you visit.
							</p>
						</LegalBlock>

						<LegalBlock title="12. Changes to This Policy">
							<p>
								We may update this Privacy Policy from time to time. If we make
								material changes, we will update the &ldquo;Effective&rdquo;
								date above and, where appropriate, provide additional notice.
								Continued use of the site after an update takes effect means you
								accept the revised policy.
							</p>
						</LegalBlock>

						<LegalBlock title="13. Contact Us">
							<p>
								If you have questions about this policy or how we handle your
								information, you can reach us through our{" "}
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
								Alabama, United States
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
