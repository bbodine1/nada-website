"use client";

import { useState } from "react";

const faqItems = [
  {
    question: "Do I need to own a drone?",
    answer:
      "No. This is a fully managed service. We bring the aircraft, batteries, and certified pilots.",
  },
  {
    question: "Is it legal?",
    answer:
      "Yes. Our pilots are FAA Part 107 certified and fully insured for commercial agricultural operations.",
  },
  {
    question: "What crops do you service?",
    answer:
      "Cotton, corn, soybeans, wheat, hay, and more. If you grow it, we can likely support your operation.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Pricing depends on acreage, terrain, and service type. Join the list and we will provide a custom quote for your fields.",
  },
  {
    question: "What if I just want to learn more?",
    answer:
      "That is exactly what this list is for. No commitment and no pressure, just local updates and launch timing.",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqItems.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className="overflow-hidden rounded-xl border border-[#d9d3c6] bg-white">
            <button
              type="button"
              className="flex w-full items-center justify-between px-5 py-4 text-left text-base font-semibold text-[#1a1a1a]"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              {item.question}
              <span className="text-xl text-[#6b6b6b]">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && <p className="px-5 pb-5 text-[#4c4c4c]">{item.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
