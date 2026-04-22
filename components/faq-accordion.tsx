"use client";

import { useState } from "react";

const faqItems = [
  {
    question: "Do I need to own a drone?",
    answer:
      "No. This is a full-service operation—we bring the aircraft, batteries, and FAA Part 107 pilots. You are not buying equipment or maintaining a fleet; you are hiring applicators who fly for your farm.",
  },
  {
    question: "Can you spray when my ground rig can’t get in?",
    answer:
      "Often, yes. After heavy rain, river-bottom ground and red clay can stay too wet for heavy equipment while the spray window is still open. Drone application can go in many of those situations—exactly when timing matters for cotton, corn, and beans in North Alabama.",
  },
  {
    question: "What can you spread?",
    answer:
      "This season we’re focused on dry spreading for agricultural use—examples include cover crop seed, dry fertilizer, lime, and pasture overseeding. Tell us your program and acres; we’ll confirm what fits your operation and labels.",
  },
  {
    question: "Is drone application as accurate as a ground rig?",
    answer:
      "Modern ag drones are built for precise application when operated to label and field conditions. Ground rigs still excel in some situations—we’ll be straight about what makes sense for your acres, terrain, and product.",
  },
  {
    question: "Is it legal?",
    answer:
      "Yes. Our pilots operate under FAA Part 107 and carry insurance suited to commercial agricultural work. If you have field-specific rules or neighbor notifications, we plan with you up front.",
  },
  {
    question: "What products can you apply (spray)?",
    answer:
      "We focus on labeled agricultural uses—herbicides, fungicides, insecticides, and foliar nutrients—according to product labels and your crop consultant’s recommendation. Tell us your program and we’ll confirm what fits your acres.",
  },
  {
    question: "What are you booking for this season?",
    answer:
      "Fall 2026: drone spraying and drone spreading only for our North Alabama service area. Other services may return in future seasons—join the list to hear when we expand the lineup.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Pricing depends on acreage, terrain, product, and whether you need spray, spread, or both. Request the overview PDF and join the list—we’ll follow up with indicative ranges and a field-specific conversation. No pressure, no obligation.",
  },
  {
    question: "What if I just want to learn more?",
    answer:
      "That’s what the form is for. Tell us you’re interested, check the box for the Spray + Spread overview PDF, and we’ll email it after you submit. You’ll also get local updates on our Fall 2026 launch across Madison, Limestone, Morgan, Cullman, and Lawrence Counties—our only service area.",
  },
];

export function FaqAccordion() {
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
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
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
