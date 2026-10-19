import React from "react";
import {
  FiShield,
  FiCalendar,
  FiAward,
  FiSmartphone,
} from "react-icons/fi";
import { LuLeaf, LuGraduationCap } from "react-icons/lu";

// Feature data using react-icons
const FEATURES = [
  {
    icon: FiShield,
    title: "100% Bonded & Insured",
    desc: "Every cleaning professional is fully bonded, insured, and background-checked for your peace of mind.",
  },
  {
    icon: LuLeaf,
    title: "Eco-Friendly Products",
    desc: "We use green-certified, non-toxic cleaning solutions that are safe for kids, pets, and the environment.",
  },
  {
    icon: FiCalendar,
    title: "Flexible Scheduling",
    desc: "Book one-time, weekly, bi-weekly, or monthly cleanings — on your schedule, 7 days a week.",
  },
  {
    icon: FiAward,
    title: "Satisfaction Guarantee",
    desc: "Not happy? We'll come back and re-clean for free. No questions asked, no hassles.",
  },
  {
    icon: FiSmartphone,
    title: "Easy Online Booking",
    desc: "Schedule, reschedule, or cancel your cleaning in seconds via our website or app.",
  },
  {
    icon: LuGraduationCap,
    title: "Trained Professionals",
    desc: "Our cleaners complete a rigorous multi-week training program before serving any client.",
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="py-20 px-4 sm:px-6 lg:px-8 bg-sky-50">
      <div className="max-w-7xl mx-auto">
        {/* ── Section header ── */}
        <div className="text-center mb-16">
          <p className="text-sky-600 font-semibold uppercase tracking-wider text-sm mb-2">
            Why SparkleClean
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            The <span className="text-sky-600">SparkleClean</span> Difference
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto mt-3 text-base">
            We don&apos;t just clean — we create a healthier, happier environment
            for every client.
          </p>
        </div>

        {/* ── Feature Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURES.map((feat) => {
            const IconComponent = feat.icon;
            return (
              <div
                key={feat.title}
                className="group bg-white p-7 rounded-2xl border border-sky-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-start"
              >
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mb-5 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-300 text-2xl">
                  <IconComponent />
                </div>

                {/* Card Content */}
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-sky-700 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* ── Bottom CTA strip ── */}
        <div className="mt-14 bg-gradient-to-r from-sky-600 to-sky-700 rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-white shadow-lg">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold">
              Ready for a spotless home or office?
            </h3>
            <p className="text-sky-100 text-sm sm:text-base mt-1">
              Book now and get 10% off your first cleaning.
            </p>
          </div>
          <a
            href="#contact"
            className="bg-white text-sky-700 hover:bg-sky-50 font-semibold px-8 py-3.5 rounded-xl transition-all shadow hover:shadow-md whitespace-nowrap"
          >
            Book a Cleaning
          </a>
        </div>
      </div>
    </section>
  );
}