"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

const PDF_PATH = "/downloads/nada-spray-spread-overview.pdf";

export function LeadInterestForm() {
	const [state, setState] = useState<FormState>("idle");
	const [errorMessage, setErrorMessage] = useState("");
	const [requestPdf, setRequestPdf] = useState(true);
	/** Snapshot for success UI after `requestPdf` is reset for the next visitor */
	const [successIncludedPdf, setSuccessIncludedPdf] = useState(false);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setState("submitting");
		setErrorMessage("");

		const form = event.currentTarget;
		const formData = new FormData(form);
		const firstName = String(formData.get("firstName") ?? "").trim();

		const payload = {
			stage: "final_submit",
			fullName: firstName,
			email: formData.get("email"),
			consent: true,
			companyName: formData.get("companyName"),
			requestPdf,
		};

		try {
			const response = await fetch("/api/lead", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				const data = (await response.json()) as { error?: string };
				throw new Error(data.error ?? "Submission failed. Please try again.");
			}

			setSuccessIncludedPdf(requestPdf);
			form.reset();
			setRequestPdf(true);
			setState("success");
		} catch (error) {
			const message =
				error instanceof Error
					? error.message
					: "Could not submit the form. Please try again.";
			setErrorMessage(message);
			setState("error");
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			data-track-form="lead-interest-guide"
			autoComplete="off"
			data-lpignore="true"
			data-1p-ignore="true"
			data-bwignore="true"
			className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-white p-6 shadow-[0_20px_60px_-20px_rgba(30,58,15,0.35)] sm:p-7"
		>
			<div
				aria-hidden
				className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full"
				style={{
					background:
						"radial-gradient(closest-side, rgba(212,160,23,0.22), rgba(212,160,23,0))",
				}}
			/>

			<div className="mb-5">
				<p className="font-heading text-xl font-semibold text-[color:var(--color-primary)]">
					Get the free North Alabama field guide
				</p>
				<p className="mt-1 text-sm text-[color:var(--fg-muted)]">
					Two fields—then download. See when drone application saves time and
					yield on your acres.
				</p>
			</div>

			<input
				type="text"
				name="companyName"
				tabIndex={-1}
				autoComplete="off"
				data-lpignore="true"
				data-1p-ignore="true"
				data-bwignore="true"
				className="hidden"
			/>

			<div className="grid gap-4">
				<div>
					<label htmlFor="firstName" className="field-label">
						First Name
					</label>
					<input
						id="firstName"
						name="firstName"
						autoComplete="off"
						required
						className="field"
						data-lpignore="true"
						data-1p-ignore="true"
						data-bwignore="true"
					/>
				</div>
				<div>
					<label htmlFor="email" className="field-label">
						Email
					</label>
					<input
						id="email"
						name="email"
						type="email"
						autoComplete="off"
						required
						className="field"
						data-lpignore="true"
						data-1p-ignore="true"
						data-bwignore="true"
					/>
				</div>
			</div>

			<div className="mt-5 space-y-3">
				<label className="flex cursor-pointer items-start gap-3 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-sunk)] px-3 py-3 text-sm text-[color:var(--fg-muted)]">
					<input
						type="checkbox"
						checked={requestPdf}
						onChange={(e) => setRequestPdf(e.target.checked)}
						className="mt-0.5 accent-[color:var(--color-primary)]"
					/>
					<span>
						<span className="font-medium text-[color:var(--foreground)]">
							Send me the &apos;Where Drone Application Pays Off&apos; Field
							Guide
						</span>
						<span className="mt-0.5 block text-xs text-[color:var(--fg-subtle)]">
							When drones save time and protect yield—and when they don&apos;t.
							Includes indicative cost bands for North Alabama.
						</span>
					</span>
				</label>
				<button
					type="submit"
					data-track="form-guide-submit"
					disabled={state === "submitting"}
					className="btn btn-accent w-full disabled:opacity-60"
				>
					{state === "submitting" ? "Sending..." : "Send Me the Guide"}
				</button>
			</div>

			<p className="mt-5 flex items-center gap-2 text-xs text-[color:var(--fg-muted)]">
				<svg
					viewBox="0 0 16 16"
					className="h-3.5 w-3.5 shrink-0 text-[color:var(--color-primary)]"
					fill="currentColor"
					aria-hidden="true"
				>
					<title>Lock</title>
					<path d="M8 1a4 4 0 0 0-4 4v2H3.5A1.5 1.5 0 0 0 2 8.5v5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 12.5 7H12V5a4 4 0 0 0-4-4Zm-2.5 6V5a2.5 2.5 0 0 1 5 0v2h-5Z" />
				</svg>
				One submit. We&apos;ll email you
				{requestPdf ? " the guide link" : " to confirm"}—no hard sales sequence.
			</p>
			{state === "success" && (
				<div className="mt-3 space-y-3 rounded-lg bg-[color:var(--color-primary-100)] px-3 py-3 text-sm font-medium text-[color:var(--color-primary)]">
					<p>
						{successIncludedPdf ? (
							<>
								You&apos;re in. Check your inbox—we&apos;ll send the guide and a
								quick follow-up you can ignore if you want.
							</>
						) : (
							<>
								You&apos;re in. We&apos;ll confirm by email—no hard sales
								sequence.
							</>
						)}
					</p>
					{successIncludedPdf && (
						<p>
							<a
								href={PDF_PATH}
								download
								data-track="form-success-pdf-download"
								className="inline-flex items-center gap-2 font-semibold underline underline-offset-2 hover:no-underline"
							>
								Download Where Drone Application Pays Off (North Alabama Field
								Guide)
							</a>
							<span className="mt-1 block text-xs font-normal text-[color:var(--color-primary)]/90">
								Same PDF link is in your email.
							</span>
						</p>
					)}
					<p className="text-xs font-normal leading-relaxed text-[color:var(--color-primary)]/95">
						Want a tailored look at your fields after you read it?{" "}
						<Link
							href="/contact"
							className="font-semibold underline underline-offset-2 hover:no-underline"
						>
							Request a Custom Field Review
						</Link>{" "}
						and we&apos;ll reply with next steps.
					</p>
				</div>
			)}
			{state === "error" && (
				<p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
					{errorMessage}
				</p>
			)}
		</form>
	);
}
