import React, { useState, useEffect, useRef } from "react";

/**
 * Animated Counter Component
 * Triggers counting when visible in the viewport using IntersectionObserver
 */
function StatCounter({ target, suffix = "", decimals = 0, duration = 2000 }) {
  const [value, setValue] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime = null;

          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Smooth cubic ease-out
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            setValue(easeOutProgress * target);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setValue(target); // Locks exactly on final value
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={elementRef}>
      {decimals > 0 ? value.toFixed(decimals) : Math.floor(value)}
      {suffix}
    </span>
  );
}

const STATS_DATA = [
  { target: 50, suffix: "K+", decimals: 0, label: "Happy Clients" },
  { target: 20, suffix: "+",  decimals: 0, label: "Years Experience" },
  { target: 4.9, suffix: "★", decimals: 1, label: "Average Rating" },
  { target: 100, suffix: "%", decimals: 0, label: "Satisfaction Guarantee" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-primary-900 text-white"
    >
      {/* ── Decorative circle shapes (background bubbles) ── */}
      <div className="absolute top-[-80px] right-[-80px] w-72 h-72 bg-white/5 rounded-full" />
      <div className="absolute bottom-[-60px] left-[-60px] w-56 h-56 bg-white/5 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-28 flex flex-col md:flex-row items-center gap-12">

        {/* ── Left: Text content ── */}
        <div className="flex-1 text-center md:text-left">

          {/* Badge pill */}
          <span className="inline-block bg-accent-500 text-white text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full mb-5">
            Trusted Since 2005
          </span>

          {/* Main headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
            America&apos;s Most <br />
            <span className="text-accent-400">Trusted</span> Cleaning <br />
            Service
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-xl mx-auto md:mx-0">
            Professional residential &amp; commercial cleaning — fully insured, background-checked teams delivering spotless results across the US.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a
              href="#contact"
              className="bg-accent-500 hover:bg-accent-600 text-white font-bold px-8 py-4 rounded-lg text-base transition-colors shadow-lg"
            >
              Get a Free Quote →
            </a>
            <a
              href="#services"
              className="border-2 border-white/70 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg text-base transition-colors"
            >
              Our Services
            </a>
          </div>

          {/* ── Functional counting stats row ── */}
          <div className="mt-10 flex flex-wrap gap-6 justify-center md:justify-start">
            {STATS_DATA.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-extrabold text-accent-400">
                  <StatCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                    duration={2000}
                  />
                </p>
                <p className="text-sm text-blue-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Hero visual card ── */}
        <div className="flex-1 flex justify-center">
          <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center max-w-sm w-full border border-white/20 shadow-2xl">
            <div className="relative h-48 rounded-2xl overflow-hidden mb-6 group/banner">
              <img
                src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&q=80"
                alt="Professional cleaning"
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover/banner:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover/banner:opacity-40" />

              {/* Sheen effect on hover */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out group-hover/banner:translate-x-full" />
            </div>

            <h3 className="text-2xl font-bold mb-2">Book in Minutes</h3>
            <p className="text-blue-200 text-sm mb-6">Schedule your cleaning online 24/7 — no phone calls needed.</p>

            {/* Mini booking preview */}
            <div className="bg-white text-gray-800 rounded-xl p-4 text-left space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1">Service Type</label>
                <select className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option>Home Cleaning</option>
                  <option>Deep Cleaning</option>
                  <option>Office Cleaning</option>
                  <option>Move-In/Out Cleaning</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1">ZIP Code</label>
                <input
                  type="text"
                  placeholder="e.g. 10001"
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <a
                href="#contact"
                className="block w-full bg-primary-500 hover:bg-primary-700 text-white text-sm font-bold text-center py-3 rounded-lg transition-colors"
              >
                Check Availability
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}