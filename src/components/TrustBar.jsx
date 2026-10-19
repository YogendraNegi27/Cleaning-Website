import React from "react";
import { 
  LuAward, 
  LuShieldCheck, 
  LuUserCheck, 
  LuLeaf, 
  LuStar, 
  LuBadgeCheck 
} from "react-icons/lu";

// Simulated partner / certification badges with React Icons
const BADGES = [
  {
    icon: LuAward,
    label: "ISSA Certified",
    subtext: "Industry Standard",
    color: "text-blue-600 bg-blue-50 border-blue-100",
  },
  {
    icon: LuShieldCheck,
    label: "Fully Insured",
    subtext: "Up to $2M Coverage",
    color: "text-emerald-600 bg-emerald-50 border-emerald-100",
  },
  {
    icon: LuUserCheck,
    label: "Background Checked",
    subtext: "100% Vetted Staff",
    color: "text-indigo-600 bg-indigo-50 border-indigo-100",
  },
  {
    icon: LuLeaf,
    label: "Eco-Friendly",
    subtext: "Green Cleaning",
    color: "text-teal-600 bg-teal-50 border-teal-100",
  },
  {
    icon: LuStar,
    label: "BBB A+ Rated",
    subtext: "Accredited Business",
    color: "text-amber-600 bg-amber-50 border-amber-100",
  },
  {
    icon: LuBadgeCheck,
    label: "Green Seal Approved",
    subtext: "Certified Safe",
    color: "text-emerald-600 bg-emerald-50 border-emerald-100",
  },
];

export default function TrustBar() {
  return (
    <section className="bg-slate-50/80 border-y border-slate-200/80 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-6">
          <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block">
            Trust &amp; Certifications
          </span>
          <h2 className="text-base sm:text-lg font-bold text-slate-800 mt-2">
            Backed by Nationally Recognized Standards
          </h2>
        </div>

        {/* Badge Grid Blocks */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {BADGES.map((badge) => {
            const IconComponent = badge.icon;
            return (
              <div
                key={badge.label}
                className="group flex flex-col items-center justify-center p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-200 transition-all duration-200 text-center"
              >
                {/* Icon Container Block */}
                <div
                  className={`w-11 h-11 rounded-lg flex items-center justify-center mb-2.5 border transition-transform duration-200 group-hover:scale-110 ${badge.color}`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>

                {/* Badge Text */}
                <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                  {badge.label}
                </span>
                <span className="text-[11px] text-slate-400 font-medium mt-0.5">
                  {badge.subtext}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}