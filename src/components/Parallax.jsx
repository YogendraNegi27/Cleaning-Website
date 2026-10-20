import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";

/**
 * Universal Parallax Component
 * 
 * @param {React.ReactNode} children - The element(s) you want to move (images, cards, text)
 * @param {number} speed - Movement intensity:
 *                         - Negative (-30 to -80): floats upward faster than normal scroll
 *                         - Positive (30 to 80): lags behind (ideal for background scenes)
 * @param {string} className - Optional Tailwind or custom classes
 * @param {boolean} fade - If true, adds a gentle fade-in / fade-out as it enters/leaves viewport
 */
export default function Parallax({ 
  children, 
  speed = 40, 
  className = "",
  fade = false 
}) {
  const targetRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Tracks the scroll progress while the element passes through the viewport (0 to 1)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // Calculate vertical translation
  const rawY = useTransform(scrollYProgress, [0, 1], [-speed, speed]);
  
  // Spring smoothing for natural physical inertia (avoids rigid/robotic scrolling)
  const smoothY = useSpring(rawY, {
    stiffness: 140,
    damping: 24,
    mass: 0.2,
  });

  // Optional subtle opacity ramp
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  // Accessibility check: disable parallax if user prefers reduced motion
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={targetRef}
      style={{
        y: smoothY,
        ...(fade ? { opacity } : {}),
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}