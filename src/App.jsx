/**
 * App.jsx — Root component
 * ─────────────────────────
 * Assembles all page sections in order:
 *   Navbar → Hero → TrustBar → Services → About →
 *   HowItWorks → WhyUs → Testimonials → Pricing →
 *   Contact → Footer
 *
 * Also renders a floating "Back to Top" button that appears
 * once the user scrolls past the hero.
 */

import { useState, useEffect } from "react";
import Navbar       from "./components/Navbar";
import Hero         from "./components/Hero";
import TrustBar     from "./components/TrustBar";
import Services     from "./components/Services";
import About        from "./components/About";
import HowItWorks   from "./components/HowItWorks";
import WhyUs        from "./components/WhyUs";
import Testimonials from "./components/Testimonials";
import Pricing      from "./components/Pricing";
import Contact      from "./components/Contact";
import Footer       from "./components/Footer";
import FAQs  from "./components/FAQ";

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
      {/* ── Fixed top nav ── */}
      <Navbar />

      {/* ── Page sections ── */}
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <About />
        <HowItWorks />
        <WhyUs />
        <Testimonials />
        <Pricing />
        <Contact />
        <FAQs></FAQs>
      </main>

      {/* ── Site footer ── */}
      <Footer />

      {/* ── Floating "Back to Top" button ── */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-primary-500 hover:bg-primary-700 text-white shadow-lg flex items-center justify-center transition-colors"
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </div>
  );
}
