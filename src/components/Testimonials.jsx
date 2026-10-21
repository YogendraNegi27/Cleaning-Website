import React from "react";
import {
  SiMarriott,
  SiHilton,
  SiAirbnb,
  SiTarget,
  SiStarbucks,
  SiShopify,
  SiIkea,
  SiFedex,
  SiUber,
  SiNike,
  SiSpotify,
  SiStripe,
} from "react-icons/si";

// ── Testimonial data (ordered as shown in client reviews reference) ──
const TESTIMONIALS = [
  {
    name: "Mike T.",
    location: "New York, NY",
    rating: 5,
    text: "Excellent move-out cleaning service. Got my full security deposit back thanks to these folks. Booking was easy and the team arrived right on time.",
    service: "Move-Out Cleaning",
    source: "Google",
  },
  {
    name: "Angela K.",
    location: "Phoenix, AZ",
    rating: 5,
    text: "I've tried several cleaning companies and SparkleClean is by far the best. They remember my preferences, use my preferred products, and always go above and beyond.",
    service: "Home Cleaning",
    source: "Yelp",
  },
  {
    name: "David W.",
    location: "Miami, FL",
    rating: 5,
    text: "The post-construction cleaning team handled our renovation mess with impressive speed. Not a speck of dust left. Professional from start to finish.",
    service: "Post-Construction",
    source: "Google",
  },
  {
    name: "Sarah M.",
    location: "Chicago, IL",
    rating: 5,
    text: "SparkleClean transformed my home! Their team was punctual, thorough, and incredibly professional. My house hasn't looked this clean since we moved in. Will absolutely book again!",
    service: "Home Cleaning",
    source: "Google",
  },
  {
    name: "James R.",
    location: "Houston, TX",
    rating: 5,
    text: "As a business owner, I trust SparkleClean for our office cleaning 3x a week. They're reliable, discreet, and use products that keep our air quality excellent. Highly recommend.",
    service: "Office Cleaning",
    source: "Yelp",
  },
  {
    name: "Patricia L.",
    location: "Los Angeles, CA",
    rating: 5,
    text: "The deep clean they did on our house before we listed it for sale was incredible. Buyers commented on how spotless the place was. Worth every penny!",
    service: "Deep Cleaning",
    source: "Google",
  },
];

// ── Reputable corporate & commercial client references with logos ──
const TRUSTED_COMPANIES = [
  { name: "MARRIOTT", icon: SiMarriott, category: "Hotels & Hospitality" },
  { name: "HILTON", icon: SiHilton, category: "Worldwide Resorts" },
  { name: "airbnb", icon: SiAirbnb, category: "Superhost Verified" },
  { name: "TARGET", icon: SiTarget, category: "Commercial Facilities" },
  { name: "STARBUCKS", icon: SiStarbucks, category: "Storefront Locations" },
  { name: "shopify", icon: SiShopify, category: "Corporate Campus" },
  { name: "IKEA", icon: SiIkea, category: "Showrooms & Retail" },
  { name: "FedEx", icon: SiFedex, category: "Logistics Hubs" },
  { name: "Uber", icon: SiUber, category: "Tech Campuses" },
  { name: "NIKE", icon: SiNike, category: "Offices & Retail" },
  { name: "Spotify", icon: SiSpotify, category: "Creative Studios" },
  { name: "stripe", icon: SiStripe, category: "Fintech Facilities" },
];

// ── Render 5 yellow star icons ──
function Stars({ count = 5 }) {
  return (
    <div className="flex gap-1 text-amber-400">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          className={`w-4 h-4 ${n <= count ? "text-amber-400 fill-amber-400" : "text-gray-300 fill-gray-200"}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  // Duplicated arrays to ensure seamless infinite looping from right to left
  const duplicatedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];
  const duplicatedCompanies = [...TRUSTED_COMPANIES, ...TRUSTED_COMPANIES, ...TRUSTED_COMPANIES];

  return (
    <section id="testimonials" className="section-padding bg-slate-50 dark:bg-zinc-950/60 overflow-hidden border-t border-slate-200/60 dark:border-zinc-800 transition-colors duration-300">
      {/* ── Keyframes for continuous Right-to-Left horizontal motion ── */}
      <style>{`
        @keyframes scrollRightToLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-reviews {
          display: flex;
          width: max-content;
          gap: 1.5rem;
          animation: scrollRightToLeft 42s linear infinite;
        }
        .marquee-reviews:hover {
          animation-play-state: paused;
        }
        .marquee-companies {
          display: flex;
          width: max-content;
          gap: 3rem;
          animation: scrollRightToLeft 26s linear infinite;
        }
        .marquee-companies:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ── Section Header (Photo 1 reference) ── */}
      <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
        <p className="text-amber-500 dark:text-amber-400 font-bold uppercase tracking-widest text-xs sm:text-sm mb-2">
          CUSTOMER REVIEWS
        </p>
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          What Our <span className="text-primary-500 dark:text-primary-400">Clients Say</span>
        </h2>
        <p className="text-slate-500 dark:text-zinc-400 text-sm sm:text-base max-w-xl mx-auto mt-3 leading-relaxed">
          Over 10,000 five-star reviews on Google and Yelp. See why customers trust SparkleClean.
        </p>
      </div>

      {/* ── Customer Reviews Marquee (Right to Left) ── */}
      <div className="relative w-full overflow-hidden mb-16 sm:mb-20">
        {/* Soft gradient edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-slate-50 dark:from-zinc-950 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-slate-50 dark:from-zinc-950 to-transparent z-10" />

        <div className="marquee-reviews py-4">
          {duplicatedTestimonials.map((review, index) => (
            <div
              key={`${review.name}-${index}`}
              className="flex flex-col justify-between w-[300px] sm:w-[350px] md:w-[380px] flex-shrink-0 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm hover:shadow-md border border-slate-100 dark:border-zinc-800/90 transition-all duration-300"
            >
              {/* Stars & source */}
              <div className="flex items-center justify-between mb-3.5">
                <Stars count={review.rating} />
                <span className="text-xs font-semibold text-slate-400 dark:text-zinc-500">
                  via {review.source}
                </span>
              </div>

              {/* Review text */}
              <p className="text-slate-600 dark:text-zinc-300 text-sm leading-relaxed mb-6 flex-1 italic">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Reviewer info */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-zinc-800">
                <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                  {review.name[0]}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {review.name}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-zinc-500">
                    {review.location} • {review.service}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Partner / Client Companies Header ── */}
      <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
        <p className="text-xs uppercase tracking-widest font-bold text-slate-400 dark:text-zinc-500">
          TRUSTED BY INDUSTRY LEADERS &amp; COMMERCIAL PROPERTIES
        </p>
      </div>

      {/* ── Companies Logo Marquee (Photo 2 reference — Right to Left) ── */}
      <div className="relative w-full overflow-hidden">
        {/* Soft gradient edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-slate-50 dark:from-zinc-950 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-slate-50 dark:from-zinc-950 to-transparent z-10" />

        <div className="marquee-companies py-3 items-center">
          {duplicatedCompanies.map((company, index) => {
            const Icon = company.icon;
            return (
              <div
                key={`${company.name}-${index}`}
                className="flex items-center gap-2.5 px-4 py-2 shrink-0 opacity-70 hover:opacity-100 transition-opacity duration-300 group cursor-default"
              >
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-slate-800 dark:text-zinc-200 group-hover:text-primary-500 transition-colors" />
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-800 dark:text-zinc-200 group-hover:text-primary-500 transition-colors">
                  {company.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
