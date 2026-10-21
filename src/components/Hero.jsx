import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { OrbButton } from "@/components/ui/hero-with-cards-utils/orb-button";
import { Sparkles, ArrowRight } from "lucide-react";

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
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            setValue(easeOutProgress * target);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setValue(target);
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

const CLEANING_CARDS = [
  {
    src: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80",
    alt: "Pristine Modern Kitchen Cleaning",
    label: "Kitchen & Dining",
    delay: 0.85,
    z: 10,
  },
  {
    src: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=800&q=80",
    alt: "Professional Vetted Cleaner",
    label: "Trained Cleaners",
    delay: 0.70,
    z: 20,
  },
  {
    src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    alt: "Luxury Bathroom Sanitization",
    label: "Hospital-Grade Clean",
    delay: 0.55,
    z: 30,
  },
  {
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
    alt: "Spotless Living Space",
    label: "Living & Bedroom",
    delay: 0.70,
    z: 20,
  },
  {
    src: "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=800&q=80",
    alt: "Eco-Friendly Cleaning Products",
    label: "100% Eco-Safe",
    delay: 0.85,
    z: 10,
  },
];

export default function Hero() {
  const [screenConfig, setScreenConfig] = useState({
    offset: 112,
    rotations: [-20, -10, 0, 10, 20],
    popX: [-18, -10, 0, 10, 18],
    popY: [-32, -35, -38, -35, -32],
  });

  // Responsive calculations across extra-small mobile, standard mobile, tablet & desktop
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 400) {
        // Extra-small mobile (< 400px e.g. iPhone SE, Fold)
        setScreenConfig({
          offset: 34,
          rotations: [-12, -6, 0, 6, 12],
          popX: [-8, -4, 0, 4, 8],
          popY: [-16, -20, -22, -20, -16],
        });
      } else if (width < 640) {
        // Standard mobile (400px - 640px e.g. iPhone 12/13/14/15/Pro, Galaxy, Pixel)
        setScreenConfig({
          offset: 48,
          rotations: [-15, -8, 0, 8, 15],
          popX: [-12, -6, 0, 6, 12],
          popY: [-22, -26, -28, -26, -22],
        });
      } else if (width < 1024) {
        // Tablets & iPad (640px - 1024px)
        setScreenConfig({
          offset: 82,
          rotations: [-18, -9, 0, 9, 18],
          popX: [-15, -8, 0, 8, 15],
          popY: [-28, -32, -35, -32, -28],
        });
      } else {
        // Desktop (1024px+)
        setScreenConfig({
          offset: 112,
          rotations: [-20, -10, 0, 10, 20],
          popX: [-18, -10, 0, 10, 18],
          popY: [-32, -35, -38, -35, -32],
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white pt-8 pb-12 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24 overflow-hidden border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-500"
    >
      {/* ── Ambient Background Glow ── */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(14,165,233,0.1),transparent)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        
        {/* ── Badge Pill ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800 dark:bg-sky-950/80 dark:text-sky-300 border border-sky-200 dark:border-sky-800/80 mb-4 sm:mb-6 shadow-xs max-w-full text-center"
        >
          <Sparkles className="w-3.5 h-3.5 shrink-0 text-sky-600 dark:text-sky-400" />
          <span>Trusted Since 2005 • America&apos;s #1 Rated Cleaning Service</span>
        </motion.div>

        {/* ── Main Headline ── */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-3xl min-[400px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-zinc-900 dark:text-white max-w-4xl leading-[1.14] tracking-tight px-1"
        >
          America&apos;s Most{" "}
          <em className="font-extrabold not-italic text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-400 dark:to-blue-400">
            Trusted
          </em>
          <br />
          Cleaning Service
        </motion.h1>

        {/* ── Subtitle ── */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38, ease: "easeOut" }}
          className="mt-3.5 sm:mt-5 text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0"
        >
          Professional residential &amp; commercial cleaning — fully insured, background-checked teams delivering spotless results across all 50 states.
        </motion.p>

        {/* ── Action Buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.52 }}
          className="mt-6 sm:mt-8 flex items-center justify-center gap-3 sm:gap-4 flex-wrap w-full"
        >
          <a href="#contact" className="inline-block">
            <OrbButton>
              Get a Free Quote
              <ArrowRight className="w-4 h-4 ml-1" />
            </OrbButton>
          </a>
          <a
            href="#services"
            className="inline-flex items-center justify-center px-5 py-3 sm:px-6 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300 shadow-sm hover:shadow"
          >
            Our Services
          </a>
        </motion.div>

        {/* ── Counting Stats Row (2x2 Grid on Mobile, Flex Row on Tablet/Desktop) ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="mt-6 sm:mt-8 grid grid-cols-2 sm:flex sm:flex-wrap gap-4 sm:gap-8 lg:gap-10 justify-center items-center max-w-xs sm:max-w-none mx-auto w-full"
        >
          {STATS_DATA.map((stat) => (
            <div key={stat.label} className="text-center p-1 sm:p-0">
              <p className="text-lg min-[400px]:text-xl sm:text-2xl font-extrabold text-sky-600 dark:text-sky-400">
                <StatCounter
                  target={stat.target}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  duration={2000}
                />
              </p>
              <p className="text-[11px] min-[400px]:text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ── Fanned 5-Card Deck with Smooth Responsive Motion & Touch Support ── */}
        <div
          className="relative mt-8 sm:mt-12 md:mt-14 flex items-end justify-center select-none w-full h-[220px] min-[400px]:h-[260px] sm:h-[320px] md:h-[380px]"
        >
          {CLEANING_CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 60, x: (i - 2) * screenConfig.offset }}
              animate={{
                opacity: 1,
                y: 0,
                x: (i - 2) * screenConfig.offset,
              }}
              transition={{
                duration: 0.65,
                delay: card.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                x: (i - 2) * screenConfig.offset + screenConfig.popX[i],
                y: screenConfig.popY[i],
                scale: 1.08,
                zIndex: 50,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              whileTap={{
                x: (i - 2) * screenConfig.offset + screenConfig.popX[i],
                y: screenConfig.popY[i],
                scale: 1.08,
                zIndex: 50,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              className="group absolute bottom-0 origin-bottom cursor-pointer touch-manipulation"
              style={{
                rotate: screenConfig.rotations[i],
                zIndex: card.z,
              }}
            >
              <Card className="w-28 h-44 min-[400px]:w-32 min-[400px]:h-48 sm:w-44 sm:h-64 md:w-56 md:h-80 p-0 overflow-hidden shadow-2xl ring-1.5 sm:ring-2 ring-white/80 dark:ring-zinc-700/80 border-0 rounded-xl sm:rounded-2xl bg-zinc-900 transition-shadow duration-300 group-hover:shadow-[0_20px_50px_rgba(14,165,233,0.3)]">
                <CardContent className="relative p-0 w-full h-full overflow-hidden">
                  <img
                    src={card.src}
                    alt={card.alt}
                    draggable={false}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Gradient shadow overlay for legibility — right-aligned on right cards so never hidden */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-2 min-[400px]:p-3 sm:p-4 ${
                      i >= 3 ? "text-right items-end" : "text-left items-start"
                    }`}
                  >
                    <span className="text-white text-[10px] min-[400px]:text-xs sm:text-sm font-bold tracking-tight drop-shadow-md leading-tight">
                      {card.label}
                    </span>
                    <span className="text-[8px] min-[400px]:text-[9px] sm:text-[10px] text-sky-300 font-medium leading-tight">
                      SparkleClean™
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
