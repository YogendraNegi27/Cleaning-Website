import React, { useState, useEffect, useRef } from "react";

/**
 * AnimatedNumber Component
 * ────────────────────────
 * Counts smoothly from 0 to target using an ease-out curve.
 * Starts animating only when it scrolls into view.
 */
function AnimatedNumber({ target, duration = 1800, decimals = 0, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Ease-out cubic: fast start, smooth landing
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(easeOut * target);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const animationId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationId);
  }, [hasStarted, target, duration]);

  return (
    <span ref={elementRef}>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  );
}

// Bullet highlights for the company
const HIGHLIGHTS = [
  { icon: "🌎", text: "Serving 200+ cities across all 50 US states" },
  { icon: "🧑‍💼", text: "1,500+ trained & background-verified cleaners" },
  { icon: "🏅", text: "Award-winning customer service since 2005" },
  { icon: "📋", text: "Custom cleaning plans tailored to your needs" },
];

// Quick stats with separated values and formatting options
const STATS = [
  { target: 50,  suffix: "K+", label: "Clients Served", decimals: 0 },
  { target: 200, suffix: "+",  label: "US Cities",      decimals: 0 },
  { target: 4.9, suffix: "/5", label: "Avg. Rating",    decimals: 1 },
];

export default function About() {
  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* ── Left: Visual / Illustration placeholder ── */}
        <div className="relative">
          {/* Decorative colored border behind the card */}
          <div className="absolute inset-0 bg-primary-500 rounded-3xl rotate-3 opacity-10" />

          {/* Main visual card */}
          <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Simulated photo area — replace with <img> in production */}
            <div className="bg-gradient-to-br from-primary-500 to-primary-800 h-64 flex items-center justify-center text-8xl">
              <img 
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80" 
                  alt="SparkleClean professional cleaning crew" 
                  className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            {/* Floating stat badges */}
            <div className="p-6 grid grid-cols-3 divide-x divide-gray-200 text-center">
              {STATS.map((s) => (
                <div key={s.label} className="px-2">
                  <p className="text-2xl font-extrabold text-primary-500">
                    <AnimatedNumber
                      target={s.target}
                      suffix={s.suffix}
                      decimals={s.decimals}
                      duration={1800}
                    />
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Text content ── */}
        <div>
          {/* Section label */}
          <p className="text-accent-500 font-semibold uppercase tracking-widest text-sm mb-3">
            Our Story
          </p>

          {/* Heading with accent underline */}
          <h2 className="section-title underline-accent mb-8">
            Cleaning America&apos;s Homes &amp; Businesses Since 2005
          </h2>

          {/* Body copy */}
          <p className="text-gray-600 leading-relaxed mb-5">
            SparkleClean was founded in Dallas, TX with a simple mission: deliver exceptional cleaning services that people can truly rely on. Over two decades later, we&apos;ve grown into one of America&apos;s most recognized cleaning brands — but our values remain the same.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            Every member of our team is thoroughly screened, professionally trained, and equipped with eco-friendly products. Whether you need weekly home cleaning or a large-scale commercial program, we design a solution that fits you.
          </p>

          {/* Bullet highlights */}
          <ul className="space-y-3 mb-8">
            {HIGHLIGHTS.map((item) => (
              <li key={item.text} className="flex items-start gap-3">
                <span className="text-xl mt-0.5">{item.icon}</span>
                <span className="text-gray-700 text-sm leading-snug">{item.text}</span>
              </li>
            ))}
          </ul>

          <a href="#contact" className="btn-primary">
            Learn More About Us
          </a>
        </div>
      </div>
    </section>
  );
}