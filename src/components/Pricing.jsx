/**
 * Pricing Component
 * ──────────────────
 * Three-tier pricing cards (Basic, Standard, Premium).
 * MollyMaid and JaniKing both use transparent pricing
 * to reduce friction in the lead funnel.
 *
 * The "Most Popular" card is highlighted with the primary color.
 */

const PLANS = [
  {
    name: "Basic",
    price: "$89",
    period: "per visit",
    tagline: "Perfect for small apartments",
    color: "border-gray-200",
    highlight: false,
    features: [
      "Up to 2 bedrooms",
      "Kitchen & 1 bathroom",
      "Vacuuming & mopping",
      "Surface dusting",
      "Trash removal",
      "✗ Inside oven/fridge",
      "✗ Window washing",
    ],
  },
  {
    name: "Standard",
    price: "$149",
    period: "per visit",
    tagline: "Our most popular plan",
    color: "border-primary-500",
    highlight: true,
    features: [
      "Up to 4 bedrooms",
      "Kitchen & up to 2 bathrooms",
      "Vacuuming, mopping & scrubbing",
      "Deep surface dusting",
      "Trash removal",
      "Inside oven & fridge",
      "✗ Window washing",
    ],
  },
  {
    name: "Premium",
    price: "$229",
    period: "per visit",
    tagline: "Full top-to-bottom deep clean",
    color: "border-gray-200",
    highlight: false,
    features: [
      "Unlimited bedrooms",
      "All bathrooms & kitchen",
      "Vacuuming, mopping & scrubbing",
      "Deep surface + baseboards",
      "Trash removal",
      "Inside oven & fridge",
      "Interior window washing",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">

        {/* ── Section header ── */}
        <div className="text-center mb-12">
          <p className="text-accent-500 font-semibold uppercase tracking-widest text-sm mb-2">
            Transparent Pricing
          </p>
          <h2 className="section-title">
            Simple, <span className="text-primary-500">Honest</span> Pricing
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mt-3">
            No hidden fees. No surprise charges. What you see is what you pay.
            Commercial quotes available on request.
          </p>
        </div>

        {/* ── Pricing cards ── */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative border-2 rounded-2xl p-8 flex flex-col transition-shadow duration-200
                ${plan.highlight
                  ? "border-primary-500 shadow-xl scale-105 bg-white"
                  : "border-gray-200 shadow-sm hover:shadow-md bg-white"
                }`}
            >
              {/* "Most Popular" badge */}
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-500 text-white text-xs font-bold uppercase px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              {/* Plan name */}
              <h3 className={`text-xl font-bold mb-1 ${plan.highlight ? "text-primary-500" : "text-gray-900"}`}>
                {plan.name}
              </h3>
              <p className="text-sm text-gray-400 mb-4">{plan.tagline}</p>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                <span className="text-gray-400 text-sm ml-1">{plan.period}</span>
              </div>

              {/* Features list */}
              <ul className="space-y-2 flex-1 mb-8">
                {plan.features.map((feat) => (
                  <li
                    key={feat}
                    className={`text-sm flex items-center gap-2 ${
                      feat.startsWith("✗") ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    <span>{feat.startsWith("✗") ? "✗" : "✓"}</span>
                    <span>{feat.startsWith("✗") ? feat.slice(2) : feat}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                className={`w-full text-center font-bold py-3 rounded-lg transition-colors ${
                  plan.highlight
                    ? "bg-primary-500 hover:bg-primary-700 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                }`}
              >
                Book Now
              </a>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <p className="text-center text-xs text-gray-400 mt-8">
          * Prices shown are starting rates. Final quote based on home size and specific requirements.
          Commercial and move-in/out pricing available upon request.
        </p>
      </div>
    </section>
  );
}
