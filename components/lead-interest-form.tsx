"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

const countyOptions = [
  "Limestone",
  "Madison",
  "Morgan",
  "Lawrence",
  "Colbert",
  "Marshall",
  "Jackson",
  "DeKalb",
  "Other",
] as const;

const cropOptions = ["Cotton", "Corn", "Soybeans", "Wheat", "Hay/Forage", "Other"] as const;

export function LeadInterestForm() {
  const [state, setState] = useState<FormState>("idle");
  const [showOptionalFields, setShowOptionalFields] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const firstName = String(formData.get("firstName") ?? "").trim();
    const lastName = String(formData.get("lastName") ?? "").trim();
    const selectedCrops = formData.getAll("primaryCrops").map((crop) => String(crop));

    const payload = {
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
      setShowOptionalFields(false);
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
      className="space-y-4 rounded-xl border border-[#cfccbf] bg-white p-6 shadow-[0_4px_24px_rgba(30,58,15,0.10)]"
    >
      <input
        type="text"
        name="companyName"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />
      <div>
        <label
          htmlFor="firstName"
          className="mb-1 block text-sm font-medium text-[#444]"
        >
          First Name
        </label>
        <input
          id="firstName"
          name="firstName"
          required
          className="w-full rounded-md border border-[#ccc8bb] px-3 py-2"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-[#444]"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-md border border-[#ccc8bb] px-3 py-2"
        />
      </div>

      <button
        type="submit"
        data-track="form-submit-primary"
        disabled={state === "submitting"}
        className="w-full rounded-md bg-[#d4a017] px-4 py-2.5 font-semibold text-[#1a1a1a] transition hover:brightness-95 disabled:opacity-60"
      >
        {state === "submitting" ? "Submitting..." : "Reserve My Spot →"}
      </button>

      <button
        type="button"
        data-track="form-optional-toggle"
        onClick={() => setShowOptionalFields((current) => !current)}
        className="text-left text-sm font-medium text-[#2d5016] underline"
      >
        + Tell us about your operation (optional - helps us prepare)
      </button>

      {showOptionalFields && (
        <div className="space-y-4 rounded-lg border border-[#d8d5c9] bg-[#fbfaf6] p-4">
          <div>
            <label
              htmlFor="lastName"
              className="mb-1 block text-sm font-medium text-[#444]"
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              className="w-full rounded-md border border-[#ccc8bb] px-3 py-2"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="mb-1 block text-sm font-medium text-[#444]"
            >
              Phone Number (Optional)
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="w-full rounded-md border border-[#ccc8bb] px-3 py-2"
            />
          </div>
          <div>
            <label
              htmlFor="county"
              className="mb-1 block text-sm font-medium text-[#444]"
            >
              County
            </label>
            <select
              id="county"
              name="county"
              className="w-full rounded-md border border-[#ccc8bb] px-3 py-2"
            >
              <option value="">Select a county</option>
              {countyOptions.map((county) => (
                <option key={county} value={county}>
                  {county}
                </option>
              ))}
            </select>
          </div>
          <fieldset>
            <legend className="mb-2 text-sm font-medium text-[#444]">
              Primary Crop(s)
            </legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {cropOptions.map((crop) => (
                <label key={crop} className="flex items-center gap-2 text-sm text-[#444]">
                  <input type="checkbox" name="primaryCrops" value={crop} />
                  {crop}
                </label>
              ))}
            </div>
          </fieldset>
          <div>
            <label
              htmlFor="acreageRange"
              className="mb-1 block text-sm font-medium text-[#444]"
            >
              Total Acreage
            </label>
            <select
              id="acreageRange"
              name="acreageRange"
              className="w-full rounded-md border border-[#ccc8bb] px-3 py-2"
            >
              <option value="">Select acreage</option>
              <option value="under_100">Under 100 ac</option>
              <option value="100_500">100 - 500 ac</option>
              <option value="500_1000">500 - 1,000 ac</option>
              <option value="1000_plus">1,000+ ac</option>
            </select>
          </div>
          <fieldset>
            <legend className="mb-2 text-sm font-medium text-[#444]">
              Primary Interest
            </legend>
            <div className="space-y-2 text-sm text-[#444]">
              {["Spray Applications", "Crop Mapping/Scouting", "Both", "Just Learning"].map(
                (option) => (
                  <label key={option} className="flex items-center gap-2">
                    <input type="radio" name="primaryInterest" value={option} />
                    {option}
                  </label>
                ),
              )}
            </div>
          </fieldset>
          <div>
            <label
              htmlFor="howHeard"
              className="mb-1 block text-sm font-medium text-[#444]"
            >
              How did you hear about us?
            </label>
            <select
              id="howHeard"
              name="howHeard"
              className="w-full rounded-md border border-[#ccc8bb] px-3 py-2"
            >
              <option value="">Select one</option>
              <option value="Facebook">Facebook</option>
              <option value="Word of Mouth">Word of Mouth</option>
              <option value="Google">Google</option>
              <option value="Farm Bureau">Farm Bureau</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="notes"
              className="mb-1 block text-sm font-medium text-[#444]"
            >
              Message / Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              placeholder="Anything else we should know about your operation?"
              className="w-full rounded-md border border-[#ccc8bb] px-3 py-2"
            />
          </div>
        </div>
      )}

      <p className="text-sm text-[#4c4c4c]">
        🔒 We respect your privacy. No spam - just updates on our North Alabama
        launch.
      </p>
      {state === "success" && (
        <p className="text-sm font-medium text-[#2d5016]">
          You&apos;re on the list! We&apos;ll be in touch before the season kicks
          off.
        </p>
      )}
      {state === "error" && (
        <p className="text-sm font-medium text-red-700">{errorMessage}</p>
      )}
    </form>
  );
}
