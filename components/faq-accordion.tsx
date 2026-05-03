"use client";

import { useState } from "react";

export type FaqAccordionItem = {
  question: string;
  answer: string;
};

const defaultFaqItems: FaqAccordionItem[] = [
  {
    question: "Do drones replace my ground rig or airplane program?",
    answer:
      "No. We position drone passes as a field-by-field tool, not a blanket replacement. In many programs, rigs and traditional aerial stay in place while drones handle wet areas, irregular edges, or timing-critical acres where access and precision are the issue.",
  },
  {
    question: "When is drone application the better fit than a rig?",
    answer:
      "Common fit cases are wet field access after rain, end rows and irregular boundaries, and zones where wheel traffic would add rut or compaction risk. If ground conditions and geometry are straightforward, we will tell you when the rig remains the more efficient choice.",
  },
  {
    question: "How do you handle drift and weather go/no-go decisions?",
    answer:
      "Every job is evaluated against label requirements, wind/weather conditions, and field context before launch. If conditions are not right for controlled application, we do not fly. We plan windows with you so timing and stewardship are both protected.",
  },
  {
    question: "How do you verify label compliance and program fit?",
    answer:
      "We align application plans to labeled use and your agronomic program before flying. You tell us crop, target pass, and field constraints; we confirm whether the requested pass is a fit for drone application and where another method is better.",
  },
  {
    question: "What can you spray and spread this season?",
    answer:
      "Spray: herbicide, fungicide, insecticide, and foliar nutrient passes where labels and field conditions support drone use. Spread: cover crop seed, dry fertilizer, lime, and pasture overseeding. We confirm each request by field and product plan.",
  },
  {
    question: "How quickly can you respond when the window opens?",
    answer:
      "Response speed depends on county routing, weather, and existing commitments. Joining early helps us build route density around your area so we can move faster when windows tighten.",
  },
  {
    question: "Is it legal and insured?",
    answer:
      "Yes. Our pilots operate under FAA Part 107 and we carry insurance for commercial agricultural operations. We review field-specific considerations with you up front before scheduling work.",
  },
  {
    question: "How much does it cost per acre?",
    answer:
      "Per-acre pricing is field-dependent: acreage, terrain, product, timing, and whether you need spray, spread, or both. We provide indicative ranges first, then a field-specific quote. The goal is a practical economics conversation, not a pressure sale.",
  },
  {
    question: "Do I need to buy equipment or build a drone team?",
    answer:
      "No. This is a managed service. We bring aircraft, batteries, crew, and flight operations. You stay focused on crop decisions and field priorities.",
  },
];

type FaqAccordionProps = {
  items?: FaqAccordionItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const faqItems = items ?? defaultFaqItems;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqItems.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.question}
            className="accordion-item"
            data-open={isOpen}
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="font-heading text-lg font-semibold text-[color:var(--foreground)]">
                {item.question}
              </span>
              <span className="accordion-chevron">
                <svg
                  viewBox="0 0 16 16"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                  focusable={false}
                >
                  <title>Toggle answer</title>
                  <path d="M8 3v10M3 8h10" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            <div className="accordion-content">
              <div>
                <p className="px-5 pb-5 text-[color:var(--fg-muted)]">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
