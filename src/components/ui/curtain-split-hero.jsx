/**
 * CurtainSplitHero — /components/ui/curtain-split-hero.jsx
 * ──────────────────────────────────────────────────────────
 * Converted from TypeScript to plain JSX for this Vite+React project.
 * "use client" directive removed (Next.js only — not needed in Vite).
 *
 * Adapted to use SparkleClean service images & titles instead of
 * the original architectural photography.
 *
 * Interaction:
 *  - Scroll  inside the component to open/close the curtain
 *  - Click   anywhere to toggle curtain open / closed
 *  - Move mouse for subtle parallax on the cards
 *
 * Dependencies: framer-motion (npm install framer-motion)
 */

import {
  motion,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ── Service images reused from Services.jsx ──────────────────
// Each entry maps directly to a service card in the Services section
const IMAGES = [
  { src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80", alt: "Home Cleaning",         tag: "Residential" },
  { src: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&q=80", alt: "Deep Cleaning",         tag: "Residential" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",   alt: "Move-In / Move-Out",    tag: "Residential" },
  { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", alt: "Office Cleaning",       tag: "Commercial"  },
  { src: "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=600&q=80", alt: "Retail & Commercial",   tag: "Commercial"  },
  { src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80", alt: "Post-Construction",     tag: "Specialty"   },
  { src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",   alt: "Seasonal Cleaning",     tag: "Residential" },
  { src: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80", alt: "Disinfection Services", tag: "Specialty"   },
];

// ── Tag badge colours (matches Services.jsx) ─────────────────
const TAG_COLORS = {
  Residential: "bg-green-100/90 text-green-800 border border-green-300",
  Commercial:  "bg-blue-100/90  text-blue-800  border border-blue-300",
  Specialty:   "bg-amber-100/90 text-amber-800 border border-amber-300",
};

// Spring physics shared across all animated values
const SPRING_CONFIG = { stiffness: 65, damping: 22, mass: 0.5 };

// ── Single curtain card ───────────────────────────────────────
function CurtainCard({ item, index, total, progress, pointer, isSpreadActive, stage }) {
  const half      = total / 2;
  const isLeft    = index % 2 === 0;
  const wingIndex = Math.floor(index / 2);          // 0 – 3
  const norm      = wingIndex / (half - 1) - 0.5;  // -0.5 – 0.5
  const sideMult  = isLeft ? -1 : 1;

  // Card size — slightly larger than original for readability
  const cardWidth  = stage.isMobile ? 75  : 100;
  const cardHeight = stage.isMobile ? 100 : 130;

  // ── Target spread positions (curtain OPEN) ──
  const archCurve    = Math.cos(norm * Math.PI) * (stage.width * 0.025);
  const targetX      = sideMult * (stage.width  * (stage.isMobile ? 0.32 : 0.34) + archCurve);
  const targetY      = norm     * (stage.height * 0.58);
  const targetRotate = sideMult * (norm * 18);

  // ── Initial stacked positions (curtain CLOSED) ──
  const initialX      = sideMult * (wingIndex * 4);
  const initialY      = norm     * 10;
  const initialRotate = sideMult * (wingIndex * 2);

  // ── Animated translate driven by scroll/click progress + mouse parallax ──
  const translate = useTransform(
    [progress, pointer.x, pointer.y],
    ([p, px, py]) => {
      const easeP = 1 - Math.pow(1 - p, 3); // cubic ease-out

      const tx = initialX + (targetX - initialX) * easeP;
      const ty = initialY + (targetY - initialY) * easeP;

      const maxParallaxX = stage.isMobile ? 8  : 16;
      const maxParallaxY = stage.isMobile ? 6  : 14;

      const dx = tx + px * (isLeft ? -maxParallaxX : maxParallaxX) * easeP;
      const dy = ty + py * maxParallaxY * easeP;

      return `calc(-50% + ${dx}px) calc(-50% + ${dy}px)`;
    }
  );

  const rotate = useTransform(
    progress,
    [0, 0.45, 1],
    [initialRotate, isLeft ? -14 : 14, targetRotate]
  );

  const scale = useTransform(progress, [0, 0.5, 1], [1, 0.96, 0.92]);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 will-change-transform cursor-pointer select-none"
      style={{
        width:  cardWidth,
        height: cardHeight,
        /* Left cards stack ascending, right cards descend */
        zIndex: isLeft ? index + 1 : total - index,
        translate,
        rotate,
        scale,
      }}
      /* Hover: lift spread card, remove rotation; hover closed = subtle shrink */
      whileHover={
        isSpreadActive
          ? { scale: 1.1, zIndex: 50, rotate: 0, transition: SPRING_CONFIG }
          : { scale: 0.97 }
      }
      whileTap={{ scale: 1.05, zIndex: 50 }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-xl shadow-xl shadow-black/20 ring-1 ring-black/10 transition-shadow duration-300 hover:shadow-2xl">

        {/* Service photo */}
        <img
          src={item.src}
          alt={item.alt}
          draggable={false}
          className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-110"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Service name + tag at bottom of each card (visible when spread) */}
        <div className="absolute bottom-0 left-0 right-0 p-2 text-center">
          <p className="text-white text-[9px] font-bold leading-tight truncate drop-shadow">
            {item.alt}
          </p>
          <span className={`inline-block mt-0.5 text-[7px] font-semibold px-1.5 py-0.5 rounded-full ${TAG_COLORS[item.tag]}`}>
            {item.tag}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main exported component ───────────────────────────────────
export default function CurtainSplitHero() {
  const stageRef = useRef(null);
  const reduce   = useReducedMotion();

  // Stage dimensions — recalculated on resize
  const [stage, setStage] = useState({ width: 1000, height: 500, isMobile: false });

  // Raw scroll progress (0 = curtain closed, 1 = curtain open)
  const rawProgress = useMotionValue(0);
  const progress    = useSpring(rawProgress, SPRING_CONFIG);

  // Whether cards are spread enough to enable individual hover
  const [isSpreadActive, setIsSpreadActive] = useState(false);
  useMotionValueEvent(progress, "change", (p) => setIsSpreadActive(p > 0.65));

  // Mouse parallax motion values
  const rawX     = useMotionValue(0);
  const rawY     = useMotionValue(0);
  const pointerX = useSpring(rawX, SPRING_CONFIG);
  const pointerY = useSpring(rawY, SPRING_CONFIG);

  // ── Measure stage on mount & resize ──
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      setStage({ width: rect.width, height: rect.height, isMobile: rect.width < 768 });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ── Wheel scroll inside hero drives progress ──
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const onWheel = (e) => {
      const current = rawProgress.get();
      const delta   = e.deltaY * 0.002;
      const next    = Math.min(1, Math.max(0, current + delta));

      if ((e.deltaY > 0 && current < 1) || (e.deltaY < 0 && current > 0)) {
        e.preventDefault();
        rawProgress.set(next);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [rawProgress]);

  // ── Mouse move → parallax ──
  const handlePointerMove = (e) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set(((e.clientX - rect.left)  / rect.width  - 0.5) * 2);
    rawY.set(((e.clientY - rect.top)   / rect.height - 0.5) * 2);
  };

  const handlePointerLeave = () => { rawX.set(0); rawY.set(0); };

  // Click toggles open ↔ closed
  const toggleCurtain = () => rawProgress.set(rawProgress.get() > 0.5 ? 0 : 1);

  // ── Centre text animations (fade in as curtain opens) ──
  const textY       = useTransform(progress, [0.25, 0.85], [30, 0]);
  const textOpacity = useTransform(progress, [0.3,  0.8],  [0, 1]);
  const lineScale   = useTransform(progress, [0.35, 0.85], [0, 1]);

  return (
    <div
      ref={stageRef}
      onClick={toggleCurtain}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative h-[430px] sm:h-[480px] md:h-[520px] w-full overflow-hidden rounded-2xl
                 bg-[#EFF6FF] cursor-pointer border border-blue-100 shadow-lg
                 flex items-center justify-center"
    >
      {/* Dot-grid background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: "radial-gradient(#93c5fd 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, #000 50%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, #000 50%, transparent 100%)",
        }}
      />

      {/* ── Centre editorial text (revealed when curtain opens) ── */}
      <motion.div
        className="pointer-events-none z-[5] flex flex-col items-center text-center px-4 max-w-xs sm:max-w-sm"
        style={{ y: textY, opacity: textOpacity }}
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary-500">
          What We Offer
        </span>

        <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-primary-900">
          Our Cleaning
          <br />
          <span className="text-accent-500">Services</span>
        </h2>

        {/* Animated accent line */}
        <motion.div
          style={{ scaleX: lineScale }}
          className="my-3 sm:my-4 h-1 w-14 sm:w-20 bg-accent-400 origin-center rounded-full"
        />

        <p className="max-w-[32ch] text-xs sm:text-sm font-normal text-gray-500 leading-relaxed">
          From homes to large commercial spaces — trusted by 50,000+ clients across all 50 states.
        </p>

        {/* CTA — stopPropagation so click doesn't toggle curtain */}
        <a
          href="#contact"
          onClick={(e) => e.stopPropagation()}
          className="mt-4 bg-primary-500 hover:bg-primary-700 text-white text-xs font-bold
                     px-5 py-2 rounded-lg transition-colors shadow pointer-events-auto"
        >
          Get a Free Quote →
        </a>
      </motion.div>

      {/* ── Curtain card deck ── */}
      <div className="absolute inset-0 z-10 pointer-events-auto">
        {IMAGES.map((item, i) => (
          <CurtainCard
            key={i}
            item={item}
            index={i}
            total={IMAGES.length}
            progress={progress}
            pointer={{ x: pointerX, y: pointerY }}
            isSpreadActive={isSpreadActive}
            stage={stage}
          />
        ))}
      </div>

      {/* ── Bottom status pill ── */}
      <div className="pointer-events-none absolute bottom-4 z-30 flex items-center gap-2
                      rounded-full bg-white/80 backdrop-blur-md px-3.5 py-1.5
                      border border-blue-100 shadow-sm text-[10px] font-medium tracking-wide text-gray-600">
        <span
          className={`h-1.5 w-1.5 rounded-full transition-colors duration-300
            ${isSpreadActive ? "bg-green-500" : "bg-amber-400"}`}
        />
        <span>
          {isSpreadActive
            ? "Scroll up or click to close"
            : "Scroll down or click to reveal our services"}
        </span>
      </div>
    </div>
  );
}
