import { useState } from "react";
import {
  FiHelpCircle,
  FiChevronDown,
  FiChevronUp,
  FiPhoneCall,
  FiMail,
  FiClock,
  FiMapPin,
  FiMessageSquare,
} from "react-icons/fi";

const FAQS = [
  {
    q: "How do I get a free quote?",
    a: "Simply fill out our online quote form with your address, home or office size, and the type of service you need. A scheduling specialist will call you within 60 minutes during business hours with a detailed, no-obligation estimate.",
  },
  {
    q: "Are your cleaning professionals background-checked?",
    a: "Yes — 100%. Every SparkleClean team member goes through a rigorous multi-step screening process that includes criminal background checks, identity verification, and professional reference checks before their very first job.",
  },
  {
    q: "Do I need to be home during the cleaning?",
    a: "Not at all! Many of our clients provide a key or door code so our team can clean while they're at work or out. Your home is fully protected — we're bonded and insured, and every visit is logged.",
  },
  {
    q: "What cleaning products do you use?",
    a: "We use EPA-approved, eco-friendly, non-toxic products that are safe for children, pets, and allergy sufferers. If you have a preferred brand or need a specific product avoided, just let us know and we'll accommodate.",
  },
  {
    q: "How often should I schedule a cleaning?",
    a: "It depends on your lifestyle and space. Most households benefit from bi-weekly cleaning. Families with kids or pets often prefer weekly. We also offer one-time deep cleans and seasonal cleans. Our team will recommend a schedule that fits your needs.",
  },
  {
    q: "What is your cancellation policy?",
    a: "We ask for at least 24 hours notice for cancellations or rescheduling. Cancellations made less than 24 hours before the appointment may incur a small fee. We understand life happens — just give us a heads up!",
  },
  {
    q: "Do you bring your own equipment and supplies?",
    a: "Yes! Our teams arrive fully equipped with professional-grade vacuums, mops, microfiber cloths, and all cleaning supplies needed. You don't need to provide anything — unless you have a specific product preference.",
  },
  {
    q: "What if I'm not satisfied with the cleaning?",
    a: "We back every clean with our 100% Satisfaction Guarantee. If you're not happy with any area of your cleaning, contact us within 24 hours and we'll send a team back to re-clean those areas absolutely free — no questions asked.",
  },
  {
    q: "Do you offer commercial and office cleaning?",
    a: "Absolutely! We provide customized janitorial programs for offices, retail stores, medical facilities, restaurants, gyms, schools, and more. Commercial quotes are tailored to your square footage, frequency, and specific requirements.",
  },
  {
    q: "How do I pay for my cleaning?",
    a: "We accept all major credit cards, debit cards, and digital wallets (Apple Pay, Google Pay). Payment is processed securely online after your cleaning is completed. We never ask for cash.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-20 bg-sky-50 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-sky-600 uppercase bg-sky-100 px-3 py-1 rounded-full mb-3">
            <FiHelpCircle className="text-sm" /> Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked <span className="text-sky-600">Questions</span>
          </h2>
          <p className="mt-3 text-base text-slate-600 max-w-2xl mx-auto">
            Everything you need to know about our services. Can&apos;t find an answer?{" "}
            <a href="#contact" className="text-sky-600 font-semibold hover:underline">
              Contact us directly →
            </a>
          </p>
        </div>

        {/* 2-Column Grid matching Contact Us layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Contact / Direct Support Details Box */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-sky-100 flex flex-col gap-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Need Immediate Help?</h3>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                Our support team is on standby to help with bookings, estimates, and custom requirements.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 text-lg">
                  <FiPhoneCall />
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-sky-600 tracking-wider">24/7 SUPPORT</span>
                  <a href="tel:18007727553" className="text-sm font-semibold text-slate-800 hover:text-sky-600 transition-colors">
                    1-800-SPARKLE (772-7553)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 text-lg">
                  <FiMail />
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-sky-600 tracking-wider">EMAIL US</span>
                  <a href="mailto:hello@sparkleclean.com" className="text-sm font-semibold text-slate-800 hover:text-sky-600 transition-colors">
                    hello@sparkleclean.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 text-lg">
                  <FiMapPin />
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-sky-600 tracking-wider">HEADQUARTERS</span>
                  <p className="text-sm font-medium text-slate-700">1200 Commerce St, Dallas, TX 75201</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 text-lg">
                  <FiClock />
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-sky-600 tracking-wider">OPERATING HOURS</span>
                  <p className="text-sm font-medium text-slate-700">Mon – Sat: 7 AM – 7 PM EST</p>
                </div>
              </div>
            </div>

            <a
              href="#contact"
              className="mt-2 w-full inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors shadow-sm text-sm"
            >
              <FiMessageSquare className="text-base" /> Send Us a Message
            </a>
          </div>

          {/* Right Side: Accordion Items */}
          <div className="lg:col-span-8 flex flex-col gap-3.5">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.q}
                  className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "border-sky-300 shadow-md shadow-sky-100/50"
                      : "border-slate-200 hover:border-sky-200 shadow-xs"
                  }`}
                >
                  <button
                    onClick={() => handleToggle(idx)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-slate-50 transition-colors"
                  >
                    <span
                      className={`text-sm sm:text-base font-semibold leading-snug transition-colors ${
                        isOpen ? "text-sky-700" : "text-slate-800"
                      }`}
                    >
                      {faq.q}
                    </span>

                    <span
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-200 ${
                        isOpen
                          ? "bg-sky-600 text-white"
                          : "bg-sky-50 text-sky-600 group-hover:bg-sky-100"
                      }`}
                    >
                      {isOpen ? <FiChevronUp className="text-lg" /> : <FiChevronDown className="text-lg" />}
                    </span>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}