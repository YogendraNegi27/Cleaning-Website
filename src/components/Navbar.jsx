/**
 * Navbar Component
 * ─────────────────
 * Sticky top navigation bar with:
 *  - Logo + brand name (Sparkles logo instead of broom)
 *  - Desktop nav links
 *  - Dark/Light mode toggle
 *  - Mobile hamburger menu toggle
 *  - "Get a Free Quote" CTA button
 */

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Why Us", href: "#why-us" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle theme and update the HTML class for Tailwind dark mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
      {/* ── Top announcement bar ── */}
      <div className="bg-primary-500 text-white text-center text-sm py-2 px-4">
        ✨ Book today &amp; get <strong>10% off</strong> your first cleaning!
        <a href="#contact" className="ml-2 underline font-semibold">
          Book Now →
        </a>
      </div>

      {/* ── Main nav row ── */}
      <nav className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16">
        
        {/* Logo / Brand */}
        <a href="#home" className="flex items-center gap-2 text-primary-500 dark:text-primary-400">
          {/* Sparkle Logo instead of Broom */}
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
            <path d="M5 3l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" />
          </svg>
          <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Sparkle<span className="text-primary-500 dark:text-primary-400">Clean</span>
          </span>
        </a>

        {/* ── Desktop links & Theme Toggle ── */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6 text-sm font-medium text-gray-700 dark:text-gray-200">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-150"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
              // Sun icon for Dark Mode
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              // Moon icon for Light Mode
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>

          {/* ── Desktop CTA ── */}
          <a href="#contact" className="btn-primary text-sm bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors">
            Get a Free Quote
          </a>
        </div>

        {/* ── Mobile hamburger & Theme Toggle ── */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="text-gray-700 dark:text-gray-300"
          >
            {isDarkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>
            )}
          </button>
          
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-gray-700 dark:bg-gray-300 transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-gray-700 dark:bg-gray-300 transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-gray-700 dark:bg-gray-300 transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      {/* ── Mobile dropdown menu ── */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-4 pb-4">
          <ul className="flex flex-col gap-3 pt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block hover:text-primary-500 dark:hover:text-primary-400 py-1"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a 
            href="#contact" 
            className="btn-primary mt-4 w-full justify-center text-center text-sm bg-primary-600 text-white py-2 rounded-md block" 
            onClick={() => setMenuOpen(false)}
          >
            Get a Free Quote
          </a>
        </div>
      )}
    </header>
  );
}