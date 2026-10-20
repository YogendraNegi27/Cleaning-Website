import React, { useState, useEffect, useRef } from "react";

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

const HIGHLIGHTS = [
  { icon: "🌎", text: "Serving 200+ cities across all 50 US states" },
  { icon: "🧑‍💼", text: "1,500+ trained & background-verified cleaners" },
  { icon: "🏅", text: "Award-winning customer service since 2005" },
  { icon: "📋", text: "Custom cleaning plans tailored to your needs" },
];

const STATS = [
  { target: 50,  suffix: "K+", label: "Clients Served", decimals: 0 },
  { target: 200, suffix: "+",  label: "US Cities",      decimals: 0 },
  { target: 4.9, suffix: "/5", label: "Avg. Rating",    decimals: 1 },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      
      {/* ── 1. MAIN BACKGROUND IMAGE (Fixed Parallax) ── */}
      <div 
        className="absolute inset-0 z-0 bg-fixed bg-center bg-cover bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1920&q=80')" 
        }}
      />
      
      {/* Dark overlay so the background image doesn't clash with the white card */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white overflow-hidden flex flex-col md:flex-row transform transition-all duration-700 hover:shadow-3xl">
          
          {/* Left: Visual / Image Area */}
          <div className="relative w-full md:w-5/12 lg:w-1/2 min-h-[400px] md:min-h-[500px]">
            
            {/* ── 2. PROPERLY FITTED CARD IMAGE ── */}
            <img 
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80" 
              alt="Professional cleaning service" 
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
            
            <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 bg-white/95 backdrop-blur-md p-4 md:p-6 rounded-2xl shadow-xl border border-gray-100 grid grid-cols-3 divide-x divide-gray-200 text-center z-20">
              {STATS.map((s) => (
                <div key={s.label} className="px-1 md:px-2">
                  <p className="text-xl md:text-2xl lg:text-3xl font-extrabold text-blue-600 drop-shadow-sm">
                    <AnimatedNumber
                      target={s.target}
                      suffix={s.suffix}
                      decimals={s.decimals}
                      duration={2000}
                    />
                  </p>
                  <p className="text-[9px] md:text-[10px] lg:text-xs font-semibold text-gray-500 mt-1 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Text Content Area */}
          <div className="w-full md:w-7/12 lg:w-1/2 p-8 md:p-12 lg:p-16 space-y-6 bg-white/90">
            <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 font-bold uppercase tracking-widest text-xs rounded-full border border-blue-100">
              Our Story
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              Cleaning America&apos;s Homes &amp; Businesses Since 2005
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed">
              SparkleClean was founded in Dallas, TX with a simple mission: deliver exceptional cleaning services that people can truly rely on. Over two decades later, we&apos;ve grown into one of America&apos;s most recognized cleaning brands.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Every member of our team is thoroughly screened, professionally trained, and equipped with eco-friendly products. Whether you need weekly home cleaning or a large-scale commercial program, we design a solution that fits you.
            </p>

            <ul className="space-y-4 pt-4 mb-8">
              {HIGHLIGHTS.map((item) => (
                <li key={item.text} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-600 rounded-full text-lg shadow-sm border border-blue-100">
                    {item.icon}
                  </span>
                  <span className="text-gray-700 font-medium leading-snug pt-2">{item.text}</span>
                </li>
              ))}
            </ul>

            <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-300 bg-blue-600 border border-transparent rounded-full shadow-lg hover:bg-blue-700 hover:shadow-blue-500/30 hover:-translate-y-1">
              Learn More About Us
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}