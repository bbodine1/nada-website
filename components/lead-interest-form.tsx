"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

const countyOptions = [
  "Madison",
  "Limestone",
  "Morgan",
  "Cullman",
  "Lawrence",
] as const;

export function LeadInterestForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      county: formData.get("county"),
      cropTypes: formData.get("cropTypes"),
      acreageRange: formData.get("acreageRange"),
      preferredContactMethod: formData.get("preferredContactMethod"),
      notes: formData.get("notes"),
      consent: formData.get("consent") === "on",
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
      className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
    >
      <input type="text" name="companyName" tabIndex={-1} autoComplete="off" className="hidden" />
      <div>
        <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-zinc-700">
          Full name
        </label>
        <input id="fullName" name="fullName" required className="w-full rounded-md border border-zinc-300 px-3 py-2" />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-zinc-700">
          Email
        </label>
        <input id="email" name="email" type="email" required className="w-full rounded-md border border-zinc-300 px-3 py-2" />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium text-zinc-700">
          Phone (optional)
        </label>
        <input id="phone" name="phone" className="w-full rounded-md border border-zinc-300 px-3 py-2" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="county" className="mb-1 block text-sm font-medium text-zinc-700">
            County
          </label>
          <select id="county" name="county" required className="w-full rounded-md border border-zinc-300 px-3 py-2">
            <option value="">Select a county</option>
            {countyOptions.map((county) => (
              <option key={county} value={county}>
                {county}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="acreageRange" className="mb-1 block text-sm font-medium text-zinc-700">
            Estimated acreage
          </label>
          <select id="acreageRange" name="acreageRange" className="w-full rounded-md border border-zinc-300 px-3 py-2">
            <option value="">Select range (optional)</option>
            <option value="under_50">Under 50 acres</option>
            <option value="50_199">50 - 199 acres</option>
            <option value="200_499">200 - 499 acres</option>
            <option value="500_plus">500+ acres</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="cropTypes" className="mb-1 block text-sm font-medium text-zinc-700">
          Crop types
        </label>
        <input
          id="cropTypes"
          name="cropTypes"
          required
          placeholder="e.g. corn, soybeans, pasture, hay"
          className="w-full rounded-md border border-zinc-300 px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="preferredContactMethod" className="mb-1 block text-sm font-medium text-zinc-700">
          Preferred contact method
        </label>
        <select
          id="preferredContactMethod"
          name="preferredContactMethod"
          className="w-full rounded-md border border-zinc-300 px-3 py-2"
        >
          <option value="">No preference</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>
      </div>
      <div>
        <label htmlFor="notes" className="mb-1 block text-sm font-medium text-zinc-700">
          Notes and preferred timing (optional)
        </label>
        <textarea id="notes" name="notes" rows={3} className="w-full rounded-md border border-zinc-300 px-3 py-2" />
      </div>
      <label className="flex items-start gap-2 text-sm text-zinc-600">
        <input type="checkbox" name="consent" required className="mt-1" />
        I agree to be contacted about North Alabama Drone Applicators services and launch updates.
      </label>
      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full rounded-md bg-green-700 px-4 py-2 font-semibold text-white transition hover:bg-green-800 disabled:opacity-60"
      >
        {state === "submitting" ? "Submitting..." : "Join the Fall 2026 Priority List"}
      </button>
      {state === "success" && (
        <p className="text-sm font-medium text-green-700">
          Thanks! We have your info and will reach out as we approach the Fall 2026 season.
        </p>
      )}
      {state === "error" && <p className="text-sm font-medium text-red-700">{errorMessage}</p>}
    </form>
  );
}
