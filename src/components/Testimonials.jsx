// ── Testimonial data ──────────────────────────────────────────
const TESTIMONIALS = [
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
  {
    name: "Mike T.",
    location: "New York, NY",
    rating: 4,
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
];

// ── Render star icons ─────────────────────────────────────────
function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          className={`w-4 h-4 ${n <= count ? "text-accent-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  // Double the items to create a seamless infinite loop
  const duplicatedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonials" className="section-padding bg-gray-50 overflow-hidden">
      {/* Embedded CSS keyframes */}
      <style>{`
        @keyframes scrollMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          gap: 1.5rem;
          animation: scrollMarquee 35s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
        <p className="text-accent-500 font-semibold uppercase tracking-widest text-sm mb-2">
          Customer Reviews
        </p>
        <h2 className="section-title">
          What Our <span className="text-primary-500">Clients Say</span>
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto mt-3">
          Over 10,000 five-star reviews on Google and Yelp. See why customers trust SparkleClean.
        </p>
      </div>

      {/* ── Auto-scrolling marquee track ── */}
      <div className="w-full overflow-hidden">
        <div className="marquee-track py-4">
          {duplicatedTestimonials.map((review, index) => (
            <div
              key={`${review.name}-${index}`}
              className="card flex flex-col justify-between w-[320px] md:w-[380px] flex-shrink-0 bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              {/* Stars & source */}
              <div className="flex items-center justify-between mb-3">
                <Stars count={review.rating} />
                <span className="text-xs font-semibold text-gray-400">via {review.source}</span>
              </div>

              {/* Review text */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Reviewer info */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {review.name[0]}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{review.name}</p>
                  <p className="text-xs text-gray-400">{review.location} · {review.service}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}