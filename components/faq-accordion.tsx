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
    question: "Is it legal?",
    answer:
      "Yes. Our pilots operate under FAA Part 107 and carry insurance suited to commercial agricultural work. If you have field-specific rules or neighbor notifications, we plan with you up front.",
  },
  {
    question: "What products can you apply?",
    answer:
      "We focus on labeled agricultural uses—herbicides, fungicides, insecticides, and foliar nutrients—according to product labels and your crop consultant’s recommendation. Tell us your program and we’ll confirm what fits your acres.",
  },
  {
    question: "What crops do you cover?",
    answer:
      "Cotton, corn, soybeans, wheat, hay, and most row-crop rotations common in the Tennessee Valley. If you grow it here, we can usually help with spray, scouting, or both.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Pricing depends on acreage, terrain, product, and how many passes you need in a season. Join the list and we’ll quote your operation—no pressure, no obligation.",
  },
  {
    question: "What if I just want to learn more?",
    answer:
      "That is what the list is for. You will get local updates on our Fall 2026 launch and how we are routing across Limestone, Madison, Morgan, Lawrence, Colbert, and nearby counties.",
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
