/**
 * Services Component
 * ───────────────────
 * Two-part section:
 *
 *  PART 1 — CurtainSplitHero (interactive curtain animation)
 *    • Uses framer-motion to fan out 8 service photos like a curtain
 *    • Scroll or click inside to open/close the curtain
 *    • Mouse parallax on each card
 *    • Reuses the SAME Unsplash images as the cards below
 *
 *  PART 2 — Service cards grid (original layout preserved)
 *    • Image banner → centered Title → Desc → Tag → CTA button
 *    • 4-column on desktop, 2-col on tablet, 1-col on mobile
 *
 * Inspired by JaniKing (commercial) + MollyMaid (residential) layouts
 */

// ── Import the curtain animation from /components/ui/ ─────────
import CurtainSplitHero from "./ui/curtain-split-hero";

// ── Service data — images shared with CurtainSplitHero ────────
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

// ── Tag pill colours ──────────────────────────────────────────
const TAG_COLORS = {
  Residential: "bg-green-100 text-green-700 border border-green-200",
  Commercial:  "bg-blue-100  text-blue-700  border border-blue-200",
  Specialty:   "bg-amber-100 text-amber-700 border border-amber-200",
};

// ── CTA button colour per tag ─────────────────────────────────
const BTN_COLORS = {
  Residential: "bg-green-600  hover:bg-green-700",
  Commercial:  "bg-primary-500 hover:bg-primary-700",
  Specialty:   "bg-amber-500  hover:bg-amber-600",
};

export default function Services() {
  return (
    <section id="services" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">

        {/* ── Section header ──
        <div className="text-center mb-10">
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
        </div> */}

        {/* ════════════════════════════════════════════════════════
            PART 1 — Curtain Split Hero (interactive fan-out)
            Scroll or click inside the box to open / close cards
        ════════════════════════════════════════════════════════ */}
        <div className="mb-14">
          <CurtainSplitHero />
        </div>

        ── Divider label ──
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-gray-200" />
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest whitespace-nowrap">
            Browse All Services
          </p>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* ════════════════════════════════════════════════════════
            PART 2 — Service cards grid
            Image → Title (centered) → Desc → Tag → CTA button
        ════════════════════════════════════════════════════════ */}
        
        </div>
      </div>
    </section>
  );
}
