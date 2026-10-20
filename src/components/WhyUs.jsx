import React from "react";
import {
  FiShield,
  FiCalendar,
  FiAward,
  FiSmartphone,
} from "react-icons/fi";
import { LuLeaf, LuGraduationCap } from "react-icons/lu";
import { WorksWheel } from "@/components/ui/works-wheel";

// ── Exact text cards from user's specification ─────────────────────────────────
const WHY_US_ITEMS = [
  {
    icon: FiShield,
    title: "100% Bonded & Insured",
    desc: "Every cleaning professional is fully bonded, insured, and background-checked for your peace of mind.",
    href: "#contact",
  },
  {
    icon: LuLeaf,
    title: "Eco-Friendly Products",
    desc: "We use green-certified, non-toxic cleaning solutions that are safe for kids, pets, and the environment.",
    href: "#contact",
  },
  {
    icon: FiCalendar,
    title: "Flexible Scheduling",
    desc: "Book one-time, weekly, bi-weekly, or monthly cleanings — on your schedule, 7 days a week.",
    href: "#contact",
  },
  {
    icon: FiAward,
    title: "Satisfaction Guarantee",
    desc: "Not happy? We'll come back and re-clean for free. No questions asked, no hassles.",
    href: "#contact",
  },
  {
    icon: FiSmartphone,
    title: "Easy Online Booking",
    desc: "Schedule, reschedule, or cancel your cleaning in seconds via our website or app.",
    href: "#contact",
  },
  {
    icon: LuGraduationCap,
    title: "Trained Professionals",
    desc: "Our cleaners complete a rigorous multi-week training program before serving any client.",
    href: "#contact",
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="relative w-full h-[500px] sm:h-[560px] md:h-[620px] lg:h-[680px] bg-sky-50/70">
      <WorksWheel
        items={WHY_US_ITEMS}
        label="Why Us"
        className="h-full w-full"
      />
    </section>
  );
}
