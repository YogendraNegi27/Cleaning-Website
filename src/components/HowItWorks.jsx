import React from "react";
// import Image from "next/image"; // Replace with standard <img> if using plain React/Vite

const STEPS = [
  {
    step: "01",
    tag: "Instant Quote",
    title: "Request Online",
    desc: "Share your zip code, home details, and service preferences in under 60 seconds without phone tag.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
    badge: "Takes ~1 min",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    step: "02",
    tag: "Flexible Scheduling",
    title: "Pick Date & Time",
    desc: "Select a window that suits you best. Receive prompt confirmation and assigned team credentials 24 hrs prior.",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80",
    badge: "7 Days a Week",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    step: "03",
    tag: "Certified Cleaning",
    title: "We Handle the Rest",
    desc: "Vetted, insured cleaners arrive fully equipped with green cleaning products—no supervision needed.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
    badge: "Fully Insured",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    step: "04",
    tag: "Quality Guarantee",
    title: "Relax & Re-book",
    desc: "Inspect your sparkling space. If you're not 100% happy, we re-clean within 24 hours at no extra charge.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    badge: "100% Guaranteed",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block py-1 px-3.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-blue-100 text-blue-700 mb-3">
            Hassle-Free Booking
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Professional Cleaning Made <span className="text-blue-600">Effortless</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            From online booking to a spotless home in four straightforward steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((item) => (
            <div
              key={item.step}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo Header with Overlays */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Step Pill */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    Step {item.step}
                  </div>

                  {/* Quick Tag Badge */}
                  <span className="absolute bottom-3 right-3 bg-slate-900/80 text-white text-[11px] font-medium px-2 py-0.5 rounded-full backdrop-blur-xs">
                    {item.badge}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                      {item.icon}
                    </div>
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="px-5 pb-5 pt-0">
                <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 w-0 group-hover:w-full transition-all duration-500" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action strip */}
        <div className="mt-14 p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-slate-900 text-sm">Need a customized commercial or recurring plan?</p>
              <p className="text-xs text-slate-500">Call 1-800-SPARKLE or chat with our live coordinator.</p>
            </div>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors shadow-sm"
          >
            Get Started Now
          </a>
        </div>

      </div>
    </section>
  );
}