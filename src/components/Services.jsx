/**
 * Services Component
 * ───────────────────
 * Grid of service cards covering both:
 *  - Residential services  (à la MollyMaid)
 *  - Commercial services   (à la JaniKing)
 *
 * Card layout (top → bottom):
 *  1. Background image banner at the top
 *  2. Centered service title
 *  3. Centered description
 *  4. Tag pill
 *  5. "Get a Quote" button with hover effect
 */

// ── Service data with Unsplash background images ──────────────────────────────────────────────
const SERVICES = [
  {
    img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80",
    title: "Home Cleaning",
    desc: "Regular scheduled home cleaning — kitchens, bathrooms, living areas, and bedrooms kept spotless every visit.",
    tag: "Residential",
  },
  {
    img: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&q=80",
    title: "Deep Cleaning",
    desc: "A thorough top-to-bottom clean covering inside appliances, baseboards, ceiling fans, and every hidden corner.",
    tag: "Residential",
  },
  {
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    title: "Move-In / Move-Out",
    desc: "Stress-free relocation cleaning so your new home is pristine from day one, or to reclaim your security deposit.",
    tag: "Residential",
  },
  {
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    title: "Office Cleaning",
    desc: "Professional janitorial services for offices — workstations, restrooms, lobbies, and common areas after hours.",
    tag: "Commercial",
  },
  {
    img: "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=600&q=80",
    title: "Retail & Commercial",
    desc: "Customized cleaning programs for retail stores, restaurants, gyms, schools, and medical facilities nationwide.",
    tag: "Commercial",
  },
  {
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
    title: "Post-Construction",
    desc: "Remove dust, debris, and construction residue to make your newly built or renovated space ready to occupy.",
    tag: "Specialty",
  },
  {
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    title: "Seasonal Cleaning",
    desc: "Spring or fall deep-cleans to refresh your home with allergen removal, window washing, and garage tidying.",
    tag: "Residential",
  },
  {
    img: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80",
    title: "Disinfection Services",
    desc: "EPA-approved sanitization and disinfection to eliminate viruses, bacteria, and germs in high-traffic areas.",
    tag: "Specialty",
  },
];

// ── Tag pill colors ───────────────────────────────────────────
const TAG_COLORS = {
  Residential: "bg-green-100 text-green-700 border border-green-200",
  Commercial:  "bg-blue-100  text-blue-700  border border-blue-200",
  Specialty:   "bg-amber-100 text-amber-700 border border-amber-200",
};

// ── Button hover color by tag type ───────────────────────────
const BTN_COLORS = {
  Residential: "bg-green-600  hover:bg-green-700",
  Commercial:  "bg-primary-500 hover:bg-primary-700",
  Specialty:   "bg-amber-500  hover:bg-amber-600",
};

export default function Services() {
  return (
    <section id="services" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">

        {/* ── Section header ── */}
        <div className="text-center mb-12">
          <p className="text-accent-500 font-semibold uppercase tracking-widest text-sm mb-2">
            What We Offer
          </p>
          <h2 className="section-title">
            Cleaning Services for <span className="text-primary-500">Every Need</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto mt-3 text-base">
            From cozy homes to large commercial spaces, our certified teams deliver consistent,
            high-quality results backed by our 100% satisfaction guarantee.
          </p>
        </div>

        {/* ── Service cards grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              /* Card container — flex column so button sticks to the bottom */
              className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden
                         flex flex-col group transition-all duration-300 hover:-translate-y-1"
            >

              {/* ── 1. Background image banner ── */}
              <div className="relative h-44 overflow-hidden">
                {/* Actual service image */}
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500
                             group-hover:scale-110"
                />

                {/* Dark gradient overlay so any future text on image stays readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* ── Card body (grows to push button down) ── */}
              <div className="flex flex-col items-center text-center flex-1 px-5 py-5 gap-3">

                {/* 2. Centered service title */}
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-500
                               transition-colors duration-200 leading-snug">
                  {service.title}
                </h3>

                {/* 3. Centered description */}
                <p className="text-gray-500 text-sm leading-relaxed flex-1">
                  {service.desc}
                </p>

                {/* 4. Tag pill */}
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${TAG_COLORS[service.tag]}`}>
                  {service.tag}
                </span>

                {/* 5. CTA button with hover animation */}
                <a
                  href="#contact"
                  className={`mt-1 w-full text-center text-sm font-bold text-white
                             py-2.5 rounded-lg transition-all duration-200 shadow-sm
                             hover:shadow-md active:scale-95 ${BTN_COLORS[service.tag]}`}
                >
                  Get a Quote →
                </a>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
