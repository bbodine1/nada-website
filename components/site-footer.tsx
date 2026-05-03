"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { localDroneServicePages } from "@/lib/service-areas";

const services = [
	{ label: "Drone Spraying", href: "/#services" },
	{ label: "Crop Applicators", href: "/crop-applicators" },
	{ label: "Herbicide Application", href: "/herbicide-application" },
	{ label: "Drone Spreading", href: "/#services" },
	{ label: "News & Articles", href: "/news" },
	{ label: "Fall 2026 Priority List", href: "/#lead-form" },
	{
		label: "Where Drone Application Pays Off (Field Guide)",
		href: "/#spray-spread-guide",
	},
];

export function SiteFooter() {
	const pathname = usePathname();
	/** Home `md:hidden` fixed bottom CTA clears footer links / copyright row */
	const mobileStickyCtaClearance =
		pathname === "/" || pathname === ""
			? "max-md:pb-[calc(5.75rem+env(safe-area-inset-bottom,0px))]"
			: "";

	return (
		<footer
			className={`relative overflow-hidden bg-[color:var(--color-primary)] text-[#e8e6d8] ${mobileStickyCtaClearance}`}
		>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 opacity-25"
				style={{
					backgroundImage:
						"radial-gradient(700px 320px at 10% 0%, rgba(212,160,23,0.25), transparent 60%), radial-gradient(900px 380px at 90% 100%, rgba(255,255,255,0.08), transparent 55%)",
				}}
			/>
			<div className="container-page relative grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
				<div>
					<Image
						src="/logos/nada-logo-hz-dark.png"
						alt="North Alabama Drone Applicators"
						width={1900}
						height={649}
						loading="eager"
						className="h-auto w-[180px] md:w-[220px] lg:w-[280px] lg:-translate-x-[10px] lg:-translate-y-[20px]"
					/>
					<p className="mt-5 max-w-md text-sm leading-relaxed text-[#d4d6c3]">
						Managed drone spray and spreading for row-crop and pasture acres
						across the Tennessee Valley — certified pilots, insured equipment,
						routes built for North Alabama.
					</p>
					<div className="mt-5 flex flex-wrap gap-2 text-xs">
						<span className="chip chip-dark">FAA Part 107</span>
						<span className="chip chip-dark">Fully Insured</span>
						<span className="chip chip-dark">Alabama Based</span>
					</div>
				</div>

				<div>
					<p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9d3b7]">
						Services
					</p>
					<ul className="mt-4 space-y-2 text-sm">
						{services.map((item) => (
							<li key={item.label}>
								<Link
									href={item.href}
									className="text-[#e8e6d8]/90 transition-colors hover:text-[color:var(--color-accent)]"
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</div>

				<div>
					<p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9d3b7]">
						Service Area
					</p>
					<ul className="mt-4 space-y-2 text-sm">
						{localDroneServicePages.map((page) => (
							<li
								key={page.slug}
								className="flex items-center gap-2 text-[#e8e6d8]/90"
							>
								<svg
									viewBox="0 0 16 16"
									className="h-3.5 w-3.5 text-[color:var(--color-accent)]"
									aria-hidden="true"
								>
									<path
										d="M8 0a5 5 0 0 0-5 5c0 4 5 11 5 11s5-7 5-11a5 5 0 0 0-5-5Zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
										fill="currentColor"
									/>
								</svg>
								<Link
									href={`/local-services/${page.slug}`}
									className="transition-colors hover:text-[color:var(--color-accent)]"
								>
									{page.county} County, AL
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className="relative border-t border-white/10">
				<div className="container-page flex flex-col items-start justify-between gap-3 py-6 text-xs text-[#c9d3b7] md:flex-row md:items-center">
					<p>
						© {new Date().getFullYear()} North Alabama Drone Applicators. All
						rights reserved.
					</p>
					<div className="flex flex-wrap gap-5">
						<Link href="/#lead-form" className="hover:text-white">
							Contact
						</Link>
						<Link href="/#faq" className="hover:text-white">
							FAQ
						</Link>
						<Link href="/news" className="hover:text-white">
							News
						</Link>
						<Link href="/privacy" className="hover:text-white">
							Privacy
						</Link>
						<Link href="/terms" className="hover:text-white">
							Terms
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
