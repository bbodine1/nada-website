"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";
type StepState = 1 | 2;

const countyOptions = [
  "Cullman",
  "Lawrence",
  "Limestone",
  "Madison",
  "Morgan",
] as const;

const cropOptions = ["Cotton", "Corn", "Soybeans", "Wheat", "Hay/Forage", "Other"] as const;

export function LeadInterestForm() {
  const [step, setStep] = useState<StepState>(1);
  const [isStepOneCaptured, setIsStepOneCaptured] = useState(false);
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleStepOneCapture(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const firstName = String(formData.get("firstName") ?? "").trim();

    const payload = {
      stage: "step1_capture",
      fullName: firstName,
      email: formData.get("email"),
      consent: true,
      companyName: formData.get("companyName"),
    };

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? "Could not save step 1. Please try again.");
      }

      setIsStepOneCaptured(true);
      setStep(2);
      setState("idle");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Could not submit the form. Please try again.";
      setErrorMessage(message);
      setState("error");
    }
  }

  async function handleFinalSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const firstName = String(formData.get("firstName") ?? "").trim();
    const lastName = String(formData.get("lastName") ?? "").trim();
    const selectedCrops = formData.getAll("primaryCrops").map((crop) => String(crop));

    const payload = {
      stage: "final_submit",
      fullName: [firstName, lastName].filter(Boolean).join(" "),
      email: formData.get("email"),
      phone: formData.get("phone"),
      county: formData.get("county"),
      cropTypes: selectedCrops.join(", "),
      acreageRange: formData.get("acreageRange"),
      preferredContactMethod: formData.get("primaryInterest"),
      notes: [
        formData.get("notes"),
        formData.get("howHeard")
          ? `How heard about us: ${String(formData.get("howHeard"))}`
          : "",
      ]
        .filter(Boolean)
        .join("\n"),
      consent: true,
      companyName: formData.get("companyName"),
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

      form.reset();
      setIsStepOneCaptured(false);
      setStep(1);
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
      onSubmit={step === 1 ? handleStepOneCapture : handleFinalSubmit}
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

      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="font-heading text-xl font-semibold text-[color:var(--color-primary)]">
            Reserve your spot
          </p>
          <p className="mt-1 text-sm text-[color:var(--fg-muted)]">
            Fall 2026 priority list — no obligation.
          </p>
        </div>
        <StepIndicator current={step} />
      </div>

      <input
        type="text"
        name="companyName"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />

      <div className="grid gap-4">
        <div>
          <label htmlFor="firstName" className="field-label">First Name</label>
          <input id="firstName" name="firstName" required className="field" />
        </div>
        <div>
          <label htmlFor="email" className="field-label">Email</label>
          <input id="email" name="email" type="email" required className="field" />
        </div>
      </div>

      {step === 1 && (
        <div className="mt-5 space-y-3">
          <button
            type="submit"
            data-track="form-step1-next"
            disabled={state === "submitting"}
            className="btn btn-accent w-full disabled:opacity-60"
          >
            {state === "submitting" ? "Saving..." : "Continue →"}
          </button>
          <p className="text-xs text-[color:var(--fg-subtle)]">
            Step 1 saves your name and email. Step 2 is optional, but please click submit to complete your request.
          </p>
        </div>
      )}

      {step === 2 && (
        <div className="mt-5 space-y-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-sunk)] p-5">
          <p className="rounded-lg bg-[color:var(--color-primary-100)] px-3 py-2 text-xs font-medium text-[color:var(--color-primary)]">
            Step 2 is optional — add any details that help us prepare.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="lastName" className="field-label">Last Name</label>
              <input id="lastName" name="lastName" className="field" />
            </div>
            <div>
              <label htmlFor="phone" className="field-label">Phone (Optional)</label>
              <input id="phone" name="phone" type="tel" className="field" />
            </div>
          </div>
          <div>
            <label htmlFor="county" className="field-label">County</label>
            <select id="county" name="county" className="field">
              <option value="">Select a county</option>
              {countyOptions.map((county) => (
                <option key={county} value={county}>{county} County</option>
              ))}
            </select>
          </div>
          <fieldset>
            <legend className="field-label">Primary Crop(s)</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {cropOptions.map((crop) => (
                <label
                  key={crop}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-[color:var(--border)] bg-white px-3 py-2 text-sm text-[color:var(--fg-muted)] transition hover:border-[color:var(--color-primary-400)] hover:bg-[color:var(--color-primary-100)]"
                >
                  <input type="checkbox" name="primaryCrops" value={crop} className="accent-[color:var(--color-primary)]" />
                  {crop}
                </label>
              ))}
            </div>
          </fieldset>
          <div>
            <label htmlFor="acreageRange" className="field-label">Total Acreage</label>
            <select id="acreageRange" name="acreageRange" className="field">
              <option value="">Select acreage</option>
              <option value="under_100">Under 100 ac</option>
              <option value="100_500">100 – 500 ac</option>
              <option value="500_1000">500 – 1,000 ac</option>
              <option value="1000_plus">1,000+ ac</option>
            </select>
          </div>
          <fieldset>
            <legend className="field-label">Primary Interest</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {["Spray Applications", "Crop Mapping/Scouting", "Both", "Just Learning"].map(
                (option) => (
                  <label
                    key={option}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-[color:var(--border)] bg-white px-3 py-2 text-sm text-[color:var(--fg-muted)] transition hover:border-[color:var(--color-primary-400)] hover:bg-[color:var(--color-primary-100)]"
                  >
                    <input
                      type="radio"
                      name="primaryInterest"
                      value={option}
                      className="accent-[color:var(--color-primary)]"
                    />
                    {option}
                  </label>
                ),
              )}
            </div>
          </fieldset>
          <div>
            <label htmlFor="howHeard" className="field-label">How did you hear about us?</label>
            <select id="howHeard" name="howHeard" className="field">
              <option value="">Select one</option>
              <option value="Facebook">Facebook</option>
              <option value="Word of Mouth">Word of Mouth</option>
              <option value="Google">Google</option>
              <option value="Farm Bureau">Farm Bureau</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="notes" className="field-label">Message / Notes (Optional)</label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              placeholder="Anything else we should know about your operation?"
              className="field"
            />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              data-track="form-step2-submit"
              disabled={state === "submitting"}
              className="btn btn-accent w-full disabled:opacity-60"
            >
              {state === "submitting" ? "Submitting..." : "Submit My Request"}
            </button>
            <button
              type="button"
              data-track="form-step2-back"
              onClick={() => setStep(1)}
              className="btn btn-ghost w-full"
            >
              Back
            </button>
          </div>
        </div>
      )}

      <p className="mt-5 flex items-center gap-2 text-xs text-[color:var(--fg-muted)]">
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-[color:var(--color-primary)]" fill="currentColor">
          <path d="M8 1a4 4 0 0 0-4 4v2H3.5A1.5 1.5 0 0 0 2 8.5v5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 12.5 7H12V5a4 4 0 0 0-4-4Zm-2.5 6V5a2.5 2.5 0 0 1 5 0v2h-5Z" />
        </svg>
        We respect your privacy. No spam—just updates on our North Alabama launch.
      </p>
      {state === "success" && (
        <p className="mt-3 rounded-lg bg-[color:var(--color-primary-100)] px-3 py-2 text-sm font-medium text-[color:var(--color-primary)]">
          You&apos;re on the list! We&apos;ll be in touch before the season kicks off.
        </p>
      )}
      {isStepOneCaptured && step === 2 && state !== "success" && (
        <p className="mt-3 rounded-lg bg-[color:var(--color-primary-100)] px-3 py-2 text-sm font-medium text-[color:var(--color-primary)]">
          Step 1 saved. Optional details below — click submit to finish.
        </p>
      )}
      {state === "error" && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          {errorMessage}
        </p>
      )}
    </form>
  );
}

function StepIndicator({ current }: { current: StepState }) {
  return (
    <div className="flex items-center gap-2 text-xs font-medium text-[color:var(--fg-muted)]">
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full border text-[11px] ${
          current >= 1
            ? "border-[color:var(--color-primary)] bg-[color:var(--color-primary)] text-white"
            : "border-[color:var(--border)] bg-white"
        }`}
      >
        1
      </span>
      <span className="h-px w-6 bg-[color:var(--border-strong)]" />
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full border text-[11px] ${
          current >= 2
            ? "border-[color:var(--color-primary)] bg-[color:var(--color-primary)] text-white"
            : "border-[color:var(--border)] bg-white text-[color:var(--fg-subtle)]"
        }`}
      >
        2
      </span>
    </div>
  );
}
