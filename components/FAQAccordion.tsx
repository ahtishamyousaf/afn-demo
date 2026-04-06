"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What types of small business loans are available?",
    answer:
      "Business loans come in several forms, depending on a company's needs and financial situation. Common types include term loans (fixed repayment over time), lines of credit (borrow only what you need), equipment financing (specific to purchasing machinery or tools), and merchant cash advances (borrowing against future sales). Each option suits different needs, such as expanding operations or managing cash flow.",
  },
  {
    question: "How does same-day business funding work?",
    answer:
      "Same-day funding involves lenders who can quickly approve and disburse loans. The process requires minimal documentation such as 3 months of bank statements. Applications are online, decisions made within hours, and funds deposited by end of day in most cases.",
  },
  {
    question: "What are the minimum requirements to apply for financing with AFN?",
    answer:
      "To qualify, businesses should have: a minimum of 6 months operating history, monthly revenue of at least $15,000, and a credit score of 450 or higher.",
  },
  {
    question: "What credit score is needed to qualify for a business loan?",
    answer:
      "AFN works with credit scores as low as 450. Traditional banks usually require 650+. We focus more on your business revenue and performance than your credit score alone.",
  },
  {
    question: "Are there risks to taking a short-term business loan?",
    answer:
      "Short-term loans can carry higher costs than traditional loans. It is important to ensure the capital goes toward something that generates a return. AFN specialists always walk through repayment terms so there are no surprises.",
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14" height="8" viewBox="0 0 20 12" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-200"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
    >
      <path d="M2 2L10 10L18 2" stroke="#000C5D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="flex flex-col gap-2">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="bg-[#f6f6f6] rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left bg-transparent border-none cursor-pointer"
            >
              <ChevronIcon open={isOpen} />
              <span className="text-sm md:text-[15px] font-semibold text-[#000c5d] leading-snug">
                {faq.question}
              </span>
            </button>

            {isOpen && (
              <div className="px-4 pb-4">
                <p className="text-xs md:text-sm text-[#4e5688] leading-relaxed m-0">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
