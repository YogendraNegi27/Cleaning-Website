import React from "react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { MdOutlineCleaningServices } from "react-icons/md"; // Fallback icon if image is not ready

/**
 * Footer Component
 * ─────────────────
 * Full-width footer with:
 *  - Brand logo + tagline
 *  - Navigation columns (Services, Company, Support)
 *  - Social media icons
 *  - Legal links + copyright
 */

const FOOTER_LINKS = {
  Services: [
    "Home Cleaning",
    "Deep Cleaning",
    "Move-In / Move-Out",
    "Office Cleaning",
    "Commercial Cleaning",
    "Post-Construction",
    "Disinfection Services",
  ],
  Company: [
    "About Us",
    "Careers",
    "Franchise Opportunities",
    "Press & Media",
    "Community Impact",
    "Blog",
  ],
  Support: [
    "Get a Free Quote",
    "Book a Cleaning",
    "Manage My Booking",
    "FAQs",
    "Satisfaction Guarantee",
    "Contact Us",
  ],
};

// Social icons using react-icons
const SOCIAL = [
  { label: "Facebook", Icon: FaFacebookF, href: "#" },
  { label: "Instagram", Icon: FaInstagram, href: "#" },
  { label: "Twitter/X", Icon: FaXTwitter, href: "#" },
  { label: "LinkedIn", Icon: FaLinkedinIn, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white">

      {/* ── Main footer grid ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid sm:grid-cols-2 lg:grid-cols-5 gap-10">

        {/* Brand column (2 columns wide) */}
        <div className="lg:col-span-2">
          
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 mb-4">
            {/* OPTION 1: Use your actual image logo. Just place your logo.png or logo.svg in your public folder and update the src */}
            {/* <img src="/sparkleclean-logo.svg" alt="SparkleClean" className="h-8 w-auto" /> */}
            
            {/* OPTION 2: Icon + Text logo (Active by default until you add your image) */}
            <MdOutlineCleaningServices className="text-3xl text-accent-400" />
            <span className="text-xl font-extrabold tracking-tight">
              Sparkle<span className="text-accent-400">Clean</span>
            </span>
          </a>

          <p className="text-blue-300 text-sm leading-relaxed mb-6 max-w-xs">
            America&apos;s most trusted professional cleaning service. Serving homes and businesses across all 50 states since 2005.
          </p>

          {/* Social links */}
          <div className="flex gap-3">
            {SOCIAL.map((s) => {
              const Icon = s.Icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary-500 flex items-center justify-center text-sm transition-colors"
                >
                  <Icon />
                </a>
              );
            })}
          </div>

          {/* Phone */}
          <div className="mt-6">
            <p className="text-xs text-blue-400 font-semibold uppercase tracking-widest mb-1">Call Us Anytime</p>
            <p className="text-accent-400 text-lg font-bold">1-800-SPARKLE</p>
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(FOOTER_LINKS).map(([category, links]) => (
          <div key={category}>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-4">
              {category}
            </h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-blue-300 hover:text-white text-sm transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-400">

          <p>© {new Date().getFullYear()} SparkleClean, Inc. All rights reserved.</p>

          <div className="flex gap-4">
            {["Privacy Policy", "Terms of Service", "Accessibility", "Sitemap"].map((link) => (
              <a key={link} href="#" className="hover:text-white transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}