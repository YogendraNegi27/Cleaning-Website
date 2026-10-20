import React, { useState } from "react";
import { Check } from "lucide-react";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "STARTER",
      monthlyPrice: 50,
      annualPrice: 40,
      popular: false,
      features: [
        "Up to 10 projects",
        "Basic analytics",
        "48-hour support response time",
        "Limited API access",
        "Community support",
      ],
      ctaText: "Start Free Trial",
      ctaLink: "#contact",
      note: "Perfect for individuals and small projects",
      isPrimary: false,
    },
    {
      name: "PROFESSIONAL",
      monthlyPrice: 99,
      annualPrice: 79,
      popular: true,
      features: [
        "Unlimited projects",
        "Advanced analytics",
        "24-hour support response time",
        "Full API access",
        "Priority support",
        "Team collaboration",
        "Custom integrations",
      ],
      ctaText: "Get Started",
      ctaLink: "#contact",
      note: "Ideal for growing teams and businesses",
      isPrimary: true,
    },
    {
      name: "ENTERPRISE",
      monthlyPrice: 299,
      annualPrice: 239,
      popular: false,
      features: [
        "Everything in Professional",
        "Custom solutions",
        "Dedicated account manager",
        "1-hour support response time",
        "SSO Authentication",
        "Advanced security",
        "Custom contracts",
        "SLA agreement",
      ],
      ctaText: "Contact Sales",
      ctaLink: "#contact",
      note: "For large organizations with specific needs",
      isPrimary: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 sm:py-24 bg-[#fcf4ec] text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl mx-auto">
            Choose the plan that works for you
            <br className="hidden sm:inline" />
            All plans include access to our platform, lead generation tools, and dedicated support.
          </p>

          {/* ── Billing Toggle Switch ── */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              role="switch"
              aria-checked={isAnnual}
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 ${
                isAnnual ? "bg-slate-900" : "bg-slate-300/80"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  isAnnual ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <span
              onClick={() => setIsAnnual(!isAnnual)}
              className="text-sm font-semibold text-slate-700 cursor-pointer select-none"
            >
              Annual billing <span className="text-slate-900 font-bold">(Save 20%)</span>
            </span>
          </div>
        </div>

        {/* ── 3 Pricing Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.name}
                className={`group relative rounded-3xl bg-white p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ease-out cursor-pointer ${
                  plan.popular
                    ? "border-2 border-slate-950 shadow-2xl md:-translate-y-4 hover:md:-translate-y-6 hover:shadow-[0_25px_50px_rgba(0,0,0,0.22)] z-10"
                    : "border border-slate-200/90 shadow-sm hover:shadow-2xl hover:-translate-y-3 hover:border-slate-400"
                }`}
              >
                {/* Popular Corner Badge */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-slate-950 text-white text-xs font-bold px-4 py-1.5 rounded-tr-[22px] rounded-bl-2xl flex items-center gap-1.5 shadow-sm">
                    <span className="text-yellow-400 text-sm leading-none">★</span>
                    Popular
                  </div>
                )}

                <div>
                  {/* Plan Name */}
                  <div className="text-center">
                    <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                      {plan.name}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mt-4 text-center">
                    <div className="inline-flex items-baseline">
                      <span className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight">
                        ${price}
                      </span>
                      <span className="ml-1.5 text-xs sm:text-sm font-medium text-slate-500">
                        / per month
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400 font-medium">
                      {isAnnual ? "billed annually" : "billed monthly"}
                    </p>
                  </div>

                  {/* Features List */}
                  <ul className="mt-8 space-y-3.5 text-left border-t border-slate-100 pt-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <Check className="w-4 h-4 text-slate-950 flex-shrink-0 mt-0.5 stroke-[2.5]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA Button & Note */}
                <div className="mt-8 pt-4">
                  <a
                    href={plan.ctaLink}
                    className={`block w-full py-3 px-4 rounded-xl text-center text-sm font-bold transition-all duration-300 shadow-sm ${
                      plan.isPrimary
                        ? "bg-slate-950 hover:bg-slate-800 text-white shadow-md shadow-slate-900/15 group-hover:scale-[1.02] active:scale-[0.98]"
                        : "bg-white hover:bg-slate-950 hover:text-white hover:border-slate-950 text-slate-900 border border-slate-300 group-hover:border-slate-950 group-hover:scale-[1.02] active:scale-[0.98]"
                    }`}
                  >
                    {plan.ctaText}
                  </a>
                  <p className="mt-3 text-center text-xs text-slate-400 group-hover:text-slate-500 transition-colors">
                    {plan.note}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
