"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

const SHOWN_SESSION_KEY = "nada_exit_intent_shown";
const PDF_PATH = "/downloads/nada-spray-spread-overview.pdf";
const MOBILE_SENTINEL_KEY = "nadaExitSentinel";
const countyOptions = ["Cullman", "Lawrence", "Limestone", "Madison", "Morgan"] as const;

function hasShownInSession(): boolean {
  return typeof window !== "undefined" && sessionStorage.getItem(SHOWN_SESSION_KEY) === "1";
}

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [county, setCounty] = useState("");
  const [companyName, setCompanyName] = useState("");

  const isCoarsePointerRef = useRef(false);
  const wasOpenedRef = useRef(false);
  const mobileSentinelActiveRef = useRef(false);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  const openModal = useCallback(() => {
    if (hasShownInSession() || wasOpenedRef.current) {
      return;
    }
    sessionStorage.setItem(SHOWN_SESSION_KEY, "1");
    wasOpenedRef.current = true;
    setIsOpen(true);
  }, []);

  const removeMobileSentinel = useCallback(() => {
    if (!mobileSentinelActiveRef.current) {
      return;
    }
    const state = window.history.state && typeof window.history.state === "object" ? window.history.state : {};
    const nextState = { ...(state as Record<string, unknown>) };
    delete nextState[MOBILE_SENTINEL_KEY];
    window.history.replaceState(nextState, "");
    mobileSentinelActiveRef.current = false;
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    removeMobileSentinel();
  }, [removeMobileSentinel]);

  useEffect(() => {
    if (hasShownInSession()) {
      wasOpenedRef.current = true;
      return;
    }

    isCoarsePointerRef.current = window.matchMedia("(pointer: coarse)").matches;

    if (!isCoarsePointerRef.current) {
      let isArmed = false;
      const timerId = window.setTimeout(() => {
        isArmed = true;
      }, 3000);

      const handleMouseOut = (event: MouseEvent) => {
        if (!isArmed || event.relatedTarget !== null || event.clientY > 0) {
          return;
        }
        openModal();
      };

      document.addEventListener("mouseout", handleMouseOut);
      return () => {
        window.clearTimeout(timerId);
        document.removeEventListener("mouseout", handleMouseOut);
      };
    }

    const addMobileSentinel = () => {
      if (mobileSentinelActiveRef.current) {
        return;
      }
      const state = window.history.state && typeof window.history.state === "object" ? window.history.state : {};
      window.history.pushState({ ...state, [MOBILE_SENTINEL_KEY]: true }, "");
      mobileSentinelActiveRef.current = true;
    };

    const armMobileSentinel = () => {
      addMobileSentinel();
      window.removeEventListener("touchstart", armMobileSentinel);
      window.removeEventListener("scroll", armMobileSentinel);
    };

    const handlePopState = (event: PopStateEvent) => {
      const state = event.state && typeof event.state === "object" ? event.state : {};
      const hasSentinel = Boolean((state as Record<string, unknown>)[MOBILE_SENTINEL_KEY]);

      if (hasSentinel || hasShownInSession()) {
        return;
      }

      openModal();
      const currentState =
        window.history.state && typeof window.history.state === "object" ? window.history.state : {};
      window.history.pushState({ ...currentState, [MOBILE_SENTINEL_KEY]: true }, "");
      mobileSentinelActiveRef.current = true;
    };

    window.addEventListener("touchstart", armMobileSentinel, { passive: true });
    window.addEventListener("scroll", armMobileSentinel, { passive: true });
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("touchstart", armMobileSentinel);
      window.removeEventListener("scroll", armMobileSentinel);
      window.removeEventListener("popstate", handlePopState);
      removeMobileSentinel();
    };
  }, [openModal, removeMobileSentinel]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => firstInputRef.current?.focus(), 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input:not([disabled]), select, [tabindex]:not([tabindex="-1"])',
      );

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [isOpen, closeModal]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState("submitting");
    setErrorMessage("");

    const payload = {
      stage: "final_submit",
      fullName: firstName.trim(),
      email: email.trim(),
      county,
      consent: true,
      requestPdf: true,
      companyName: companyName.trim(),
      notes: "Source: exit-intent popup",
      preferredContactMethod: "Just Learning",
      cropTypes: "Not provided",
    };

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? "Could not submit the form. Please try again.");
      }

      setFormState("success");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Could not submit the form. Please try again.";
      setErrorMessage(message);
      setFormState("error");
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close popup"
        onClick={closeModal}
        data-track="exit-intent-dismiss"
        className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-intent-title"
        data-track="exit-intent-open"
        className="relative z-10 w-full max-w-xl overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-white p-6 shadow-[0_25px_70px_-30px_rgba(30,58,15,0.45)] sm:p-7"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(212,160,23,0.22), rgba(212,160,23,0))",
          }}
        />

        <button
          type="button"
          onClick={closeModal}
          aria-label="Dismiss exit intent popup"
          data-track="exit-intent-dismiss"
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--border)] bg-white text-[color:var(--fg-muted)] transition hover:text-[color:var(--foreground)]"
        >
          <span aria-hidden>&times;</span>
        </button>

        {formState === "success" ? (
          <div className="relative">
            <p className="font-heading text-2xl font-semibold text-[color:var(--color-primary)]">
              You&apos;re on the list.
            </p>
            <p className="mt-2 text-sm text-[color:var(--fg-muted)]">
              Thanks for reaching out. Download the guide now, and we&apos;ll email this link too.
            </p>
            <a
              href={PDF_PATH}
              download
              data-track="exit-intent-success-pdf-download"
              className="btn btn-accent mt-6 inline-flex"
            >
              Download the Spray + Spread Overview (PDF)
            </a>
            <div className="mt-3">
              <button type="button" onClick={closeModal} className="btn btn-ghost">
                Close
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            data-lpignore="true"
            data-1p-ignore="true"
            data-bwignore="true"
            className="relative space-y-4"
          >
            <div>
              <p id="exit-intent-title" className="font-heading text-2xl font-semibold text-[color:var(--color-primary)]">
                Before you go, request your field-fit + cost guide.
              </p>
              <p className="mt-2 text-sm text-[color:var(--fg-muted)]">
                Share your details and county so we can route your request and send the PDF with indicative ranges.
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
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
            />

            <div>
              <label htmlFor="exit-first-name" className="field-label">
                First Name
              </label>
              <input
                ref={firstInputRef}
                id="exit-first-name"
                name="firstName"
                autoComplete="off"
                data-lpignore="true"
                data-1p-ignore="true"
                data-bwignore="true"
                required
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                className="field"
              />
            </div>

            <div>
              <label htmlFor="exit-email" className="field-label">
                Email
              </label>
              <input
                id="exit-email"
                name="email"
                type="email"
                autoComplete="off"
                data-lpignore="true"
                data-1p-ignore="true"
                data-bwignore="true"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="field"
              />
            </div>

            <div>
              <label htmlFor="exit-county" className="field-label">
                County
              </label>
              <select
                id="exit-county"
                name="county"
                autoComplete="off"
                data-lpignore="true"
                data-1p-ignore="true"
                data-bwignore="true"
                required
                value={county}
                onChange={(event) => setCounty(event.target.value)}
                className="field"
              >
                <option value="">Select your county</option>
                {countyOptions.map((entry) => (
                  <option key={entry} value={entry}>
                    {entry} County
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                data-track="exit-intent-submit-guide"
                disabled={formState === "submitting"}
                className="btn btn-accent w-full disabled:opacity-60"
              >
                {formState === "submitting" ? "Submitting..." : "Send My Field-Fit Guide"}
              </button>
              <button
                type="button"
                onClick={closeModal}
                data-track="exit-intent-dismiss"
                className="btn btn-ghost w-full"
              >
                No thanks
              </button>
            </div>

            {formState === "error" && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                {errorMessage}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
