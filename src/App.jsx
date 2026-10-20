/**
 * App.jsx — Root component
 * ─────────────────────────
 * Assembles all page sections in order:
 *   Navbar → Hero → TrustBar → Services (includes CurtainSplitHero) →
 *   About → HowItWorks → WhyUs → Testimonials → Pricing →
 *   Contact → FAQ → Footer
 *
 * Also renders a floating "Back to Top" button that appears
 * once the user scrolls past the hero.
 */

import { useState, useEffect } from "react";
import Navbar       from "./components/Navbar";
import Hero         from "./components/Hero";
import TrustBar     from "./components/TrustBar";
import CurtainSplitHero from "./components/ui/curtain-split-hero"; // ← replaces old Services grid
import About        from "./components/About";
import HowItWorks   from "./components/HowItWorks";
import WhyUs        from "./components/WhyUs";
import Testimonials from "./components/Testimonials";
import Pricing      from "./components/Pricing";
import Contact      from "./components/Contact";
import FAQ          from "./components/FAQ";
import Footer       from "./components/Footer";

export default function App() {
  // ── Show "Back to Top" button after scrolling 400px ──
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen">
      {/* ── Sticky top navigation ── */}
      <Navbar />

      <main>
        {/* ── Hero banner ── */}
        <Hero />

        {/* ── Certifications / trust badge strip ── */}
        <TrustBar />

        {/* ── Services — Curtain Split Hero (interactive card fan-out) ── */}
        <section id="services" className="section-padding bg-gray-50">
          <div className="max-w-4xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-10">
              <p className="text-accent-500 font-semibold uppercase tracking-widest text-sm mb-2">
                What We Offer
              </p>
              <h2 className="section-title">
                Cleaning Services for <span className="text-primary-500">Every Need</span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto mt-3 text-base">
                Scroll or click inside the box below to reveal our services.
              </p>
            </div>

            {/* Curtain hero component */}
            <CurtainSplitHero />
          </div>
        </section>

        {/* ── About the company ── */}
        <About />

        {/* ── 4-step booking process ── */}
        <HowItWorks />

        {/* ── Why choose us — USP features ── */}
        <WhyUs />

        {/* ── Customer testimonials ── */}
        <Testimonials />

        {/* ── Pricing tiers ── */}
        <Pricing />

        {/* ── Quote / contact form ── */}
        <Contact />

        {/* ── FAQ accordion ── */}
        <FAQ />
      </main>

      {/* ── Site footer ── */}
      <Footer />

      {/* ── Floating "Back to Top" button (appears after 400px scroll) ── */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full
                     bg-primary-500 hover:bg-primary-700 text-white text-xl
                     shadow-lg flex items-center justify-center transition-colors"
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </div>
  );
}
