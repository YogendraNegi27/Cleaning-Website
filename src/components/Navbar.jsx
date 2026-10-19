/**
 * Navbar Component
 * ─────────────────
 * Sticky top navigation bar with:
 *  - Logo + brand name
 *  - Desktop nav links
 *  - Mobile hamburger menu toggle
 *  - "Get a Quote" CTA button
 *
 * Inspired by JaniKing's clean header layout
 */

import { useState } from "react";

// Navigation links configuration
const NAV_LINKS = [
  { label: "Home",      href: "#home" },
  { label: "Services",  href: "#services" },
  { label: "About",     href: "#about" },
  { label: "Why Us",    href: "#why-us" },
  { label: "Testimonials", href: "#testimonials" },
  {label: "FAQ", href: "#faq"},
  { label: "Contact",   href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* ── Top announcement bar (like MollyMaid promo strip) ── */}
      <div className="bg-primary-500 text-white text-center text-sm py-2 px-4">
        🧹 Book today &amp; get <strong>10% off</strong> your first cleaning!
        <a href="#contact" className="ml-2 underline font-semibold">Book Now →</a>
      </div>

      {/* ── Main nav row ── */}
      <nav className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16">

        {/* Logo / Brand */}
        <a href="#home" className="flex items-center gap-2 text-primary-500">
          {/* Simple SVG broom icon as logo */}
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 2H9a1 1 0 00-1 1v7.59L3.71 14.88A1 1 0 003 15.83V22h6v-4h2v4h2v-4h2v4h6V3a1 1 0 00-2 0v11H9V3H7V15H5v-1l4-4V3a3 3 0 013-3h10a3 3 0 013 3v19H1V15.83a3 3 0 011.29-2.46L7 9.93V3a3 3 0 013-3z" />
          </svg>
          <span className="text-xl font-extrabold tracking-tight">
            Sparkle<span className="text-accent-500">Clean</span>
          </span>
        </a>

        {/* ── Desktop links ── */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="hover:text-primary-500 transition-colors duration-150"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* ── Desktop CTA ── */}
        <div className="hidden md:block">
          <a href="#contact" className="btn-primary text-sm">
            Get a Free Quote
          </a>
        </div>

        {/* ── Mobile hamburger button ── */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* ── Mobile dropdown menu ── */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
          <ul className="flex flex-col gap-3 pt-3 text-sm font-medium text-gray-700">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block hover:text-primary-500"
                  onClick={() => setMenuOpen(false)} // close on click
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn-primary mt-4 w-full justify-center text-sm" onClick={() => setMenuOpen(false)}>
            Get a Free Quote
          </a>
        </div>
      )}
    </header>
  );
}
