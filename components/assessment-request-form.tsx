"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";

import { SERVICE_AREA_COUNTIES } from "@/lib/service-area-counties";

type FormState = "idle" | "submitting" | "success" | "error";

const PDF_PATH =
	"/downloads/North_Alabama_Drone_Applicators_Field_Guide_2026.pdf";

export function AssessmentRequestForm() {
	const [state, setState] = useState<FormState>("idle");
	const [errorMessage, setErrorMessage] = useState("");
	const [requestPdf, setRequestPdf] = useState(false);
	const [successIncludedPdf, setSuccessIncludedPdf] = useState(false);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setState("submitting");
		setErrorMessage("");

		const form = event.currentTarget;
		const formData = new FormData(form);
		const targetPass = String(formData.get("targetPass") ?? "").trim();

		const payload = {
			stage: "final_submit",
			fullName: String(formData.get("fullName") ?? "").trim(),
			email: String(formData.get("email") ?? "").trim(),
			phone: String(formData.get("phone") ?? "").trim(),
			county: String(formData.get("county") ?? "Other"),
			cropTypes: String(formData.get("cropTypes") ?? "").trim(),
			acreageRange: String(formData.get("acreageRange") ?? "").trim(),
			notes: `Target pass: ${targetPass}`,
			consent: formData.get("consent") === "on",
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
			setRequestPdf(false);
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
			data-track-form="lead-assessment"
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
					Request your assessment
				</p>
				<p className="mt-1 text-sm text-[color:var(--fg-muted)]">
					Tell us your county, crop, acreage, and target pass. We&apos;ll follow up with a practical read on drone
					spraying, ground rig spraying, crop dusting, or a combined approach.
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
					<label htmlFor="assessment-fullName" className="field-label">
						Full name
					</label>
					<input
						id="assessment-fullName"
						name="fullName"
						autoComplete="off"
						required
						minLength={2}
						className="field"
						data-lpignore="true"
						data-1p-ignore="true"
						data-bwignore="true"
					/>
				</div>
				<div>
					<label htmlFor="assessment-email" className="field-label">
						Email
					</label>
					<input
						id="assessment-email"
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
				<div>
					<label htmlFor="assessment-phone" className="field-label">
						Phone <span className="font-normal text-[color:var(--fg-muted)]">(optional)</span>
					</label>
					<input
						id="assessment-phone"
						name="phone"
						type="tel"
						autoComplete="off"
						className="field"
						data-lpignore="true"
						data-1p-ignore="true"
						data-bwignore="true"
					/>
				</div>
				<div>
					<label htmlFor="assessment-county" className="field-label">
						County
					</label>
					<select
						id="assessment-county"
						name="county"
						required
						className="field"
						defaultValue="Other"
					>
						{SERVICE_AREA_COUNTIES.map((c) => (
							<option key={c} value={c}>
								{c === "Other" ? "Other / outside listed counties" : `${c} County, AL`}
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="assessment-cropTypes" className="field-label">
						Crop
					</label>
					<input
						id="assessment-cropTypes"
						name="cropTypes"
						autoComplete="off"
						required
						minLength={2}
						maxLength={200}
						className="field"
						placeholder="e.g. corn, cotton, soybeans"
						data-lpignore="true"
						data-1p-ignore="true"
						data-bwignore="true"
					/>
				</div>
				<div>
					<label htmlFor="assessment-acreageRange" className="field-label">
						Acreage
					</label>
					<input
						id="assessment-acreageRange"
						name="acreageRange"
						autoComplete="off"
						required
						minLength={1}
						maxLength={120}
						className="field"
						placeholder="e.g. 120 or 80–150"
						data-lpignore="true"
						data-1p-ignore="true"
						data-bwignore="true"
					/>
				</div>
				<div>
					<label htmlFor="assessment-targetPass" className="field-label">
						Target pass
					</label>
					<input
						id="assessment-targetPass"
						name="targetPass"
						autoComplete="off"
						required
						minLength={2}
						maxLength={500}
						className="field"
						placeholder="e.g. pre-emerge herbicide, fungicide pass, cover crop seeding"
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
							Also send me the &apos;Where Drone Application Pays Off&apos; field guide (PDF)
						</span>
						<span className="mt-0.5 block text-xs text-[color:var(--fg-subtle)]">
							Optional — same guide as our homepage download.
						</span>
					</span>
				</label>
				<label className="flex cursor-pointer items-start gap-3 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-sunk)] px-3 py-3 text-sm text-[color:var(--fg-muted)]">
					<input
						type="checkbox"
						name="consent"
						required
						className="mt-0.5 accent-[color:var(--color-primary)]"
					/>
					<span>
						<span className="font-medium text-[color:var(--foreground)]">
							I agree NADA may contact me about my inquiry.
						</span>
					</span>
				</label>
				<button
					type="submit"
					data-track="form-assessment-submit"
					disabled={state === "submitting"}
					className="btn btn-accent w-full disabled:opacity-60"
				>
					{state === "submitting" ? "Sending..." : "Request My Assessment"}
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
				We read every submission and reply during business hours.
			</p>

			{state === "success" && (
				<div className="mt-3 space-y-3 rounded-lg bg-[color:var(--color-primary-100)] px-3 py-3 text-sm font-medium text-[color:var(--color-primary)]">
					<p>
						Got it — we&apos;ll follow up with a practical read for your acres. Check your spam folder if you
						don&apos;t hear from us within a day or two.
					</p>
					{successIncludedPdf && (
						<p>
							<a
								href={PDF_PATH}
								download
								data-track="form-assessment-success-pdf-download"
								className="inline-flex items-center gap-2 font-semibold underline underline-offset-2 hover:no-underline"
							>
								Download Where Drone Application Pays Off (North Alabama Field Guide)
							</a>
							<span className="mt-1 block text-xs font-normal text-[color:var(--color-primary)]/90">
								Same PDF link is in your email.
							</span>
						</p>
					)}
					<p className="text-xs font-normal leading-relaxed text-[color:var(--color-primary)]/95">
						Prefer to send more detail?{" "}
						<Link
							href="/contact"
							className="font-semibold underline underline-offset-2 hover:no-underline"
						>
							Use the contact form
						</Link>
						.
					</p>
				</div>
			)}
			{state === "error" && (
				<p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{errorMessage}</p>
			)}
		</form>
	);
}
