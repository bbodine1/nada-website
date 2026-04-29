"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

const FORM_SUBMIT_EVENT = "Form Submit";
const UNKNOWN_FORM = "unknown-form";

function getSubmitter(event: SubmitEvent) {
  return event.submitter instanceof HTMLElement ? event.submitter : null;
}

function getFormName(form: HTMLFormElement, submitter: HTMLElement | null) {
  return (
    form.dataset.trackForm ??
    form.id ??
    form.getAttribute("name") ??
    submitter?.dataset.track ??
    UNKNOWN_FORM
  );
}

export function FormSubmitTracker() {
  useEffect(() => {
    const handleSubmit = (event: SubmitEvent) => {
      if (!(event.target instanceof HTMLFormElement)) {
        return;
      }

      const form = event.target;
      const submitter = getSubmitter(event);

      track(FORM_SUBMIT_EVENT, {
        form: getFormName(form, submitter),
        method: (form.getAttribute("method") ?? "get").toUpperCase(),
        path: window.location.pathname,
        submitter: submitter?.dataset.track,
      });
    };

    document.addEventListener("submit", handleSubmit, true);
    return () => document.removeEventListener("submit", handleSubmit, true);
  }, []);

  return null;
}
