"use client";

import { type FormEvent, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

const COUNTIES = [
	"Cullman",
	"Lawrence",
	"Limestone",
	"Madison",
	"Morgan",
	"Other",
] as const;

export function ContactForm() {
	const [state, setState] = useState<FormState>("idle");
	const [errorMessage, setErrorMessage] = useState("");

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setState("submitting");
		setErrorMessage("");

		const form = event.currentTarget;
		const formData = new FormData(form);

		const payload = {
			fullName: String(formData.get("fullName") ?? "").trim(),
			email: String(formData.get("email") ?? "").trim(),
			phone: String(formData.get("phone") ?? "").trim(),
			county: String(formData.get("county") ?? "Other"),
			message: String(formData.get("message") ?? "").trim(),
			consent: formData.get("consent") === "on",
			companyName: formData.get("companyName"),
		};

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				const data = (await response.json()) as { error?: string };
				throw new Error(data.error ?? "Submission failed. Please try again.");
			}

			form.reset();
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
			data-track-form="contact"
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
					Send us a message
				</p>
				<p className="mt-1 text-sm text-[color:var(--fg-muted)]">
					We read every inquiry and reply during business hours.
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
					<label htmlFor="contact-fullName" className="field-label">
						Full name
					</label>
					<input
						id="contact-fullName"
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
					<label htmlFor="contact-email" className="field-label">
						Email
					</label>
					<input
						id="contact-email"
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
					<label htmlFor="contact-phone" className="field-label">
						Phone <span className="font-normal text-[color:var(--fg-muted)]">(optional)</span>
					</label>
					<input
						id="contact-phone"
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
					<label htmlFor="contact-county" className="field-label">
						County
					</label>
					<select
						id="contact-county"
						name="county"
						required
						className="field"
						defaultValue="Other"
					>
						{COUNTIES.map((c) => (
							<option key={c} value={c}>
								{c === "Other" ? "Other / outside listed counties" : `${c} County, AL`}
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="contact-message" className="field-label">
						Message
					</label>
					<textarea
						id="contact-message"
						name="message"
						required
						minLength={10}
						maxLength={2000}
						rows={5}
						className="field resize-y"
						data-lpignore="true"
						data-1p-ignore="true"
						data-bwignore="true"
					/>
					<p className="mt-1 text-xs text-[color:var(--fg-subtle)]">
						10–2,000 characters
					</p>
				</div>
			</div>

			<div className="mt-5 space-y-3">
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
					data-track="form-contact-submit"
					disabled={state === "submitting"}
					className="btn btn-accent w-full disabled:opacity-60"
				>
					{state === "submitting" ? "Sending..." : "Send message"}
				</button>
			</div>

			{state === "success" && (
				<div className="mt-4 rounded-lg bg-[color:var(--color-primary-100)] px-3 py-3 text-sm font-medium text-[color:var(--color-primary)]">
					Got it — we&apos;ll reply shortly. Check your spam folder if you
					don&apos;t see us within a day or two.
				</div>
			)}
			{state === "error" && (
				<p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
					{errorMessage}
				</p>
			)}
		</form>
	);
}
