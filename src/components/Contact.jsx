import { useState } from "react";
import { 
  FaPhoneVolume, 
  FaEnvelope, 
  FaLocationDot, 
  FaClock, 
  FaCircleCheck 
} from "react-icons/fa6";

const CONTACT_INFO = [
  { 
    icon: FaPhoneVolume, 
    label: "24/7 Support", 
    value: "1-800-SPARKLE (772-7553)" 
  },
  { 
    icon: FaEnvelope, 
    label: "Email Us", 
    value: "hello@sparkleclean.com" 
  },
  { 
    icon: FaLocationDot, 
    label: "Headquarters", 
    value: "1200 Commerce St, Dallas, TX 75201" 
  },
  { 
    icon: FaClock, 
    label: "Hours", 
    value: "Mon – Sat: 7 AM – 7 PM EST" 
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    zip: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-[#0b0f19] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Main inner white container with rounded top corners */}
        <div className="bg-[#f8f9fa] rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* ── Left Column: Contact Details & Info ── */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <p className="text-red-600 font-bold uppercase tracking-wider text-xs mb-3">
                  Get in Touch
                </p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Request a Free <br className="hidden sm:inline" />
                  Service Quote
                </h2>
                <p className="text-slate-600 mt-4 text-base leading-relaxed">
                  Tell us about your space and requirements. Our scheduling team responds fast — often within the hour.
                </p>

                {/* Contact List */}
                <div className="mt-8 space-y-5">
                  {CONTACT_INFO.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={item.label} className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
                            {item.label}
                          </p>
                          <p className="text-sm font-semibold text-slate-800">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Direct call banner */}
              <div className="mt-10 pt-8 border-t border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="bg-red-600 text-white p-3.5 rounded-xl shadow-md">
                    <FaPhoneVolume className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase font-bold tracking-wider text-slate-400">
                      Direct Dispatch
                    </span>
                    <a 
                      href="tel:18007727553" 
                      className="text-lg font-bold text-slate-900 hover:text-red-600 transition-colors"
                    >
                      (800) 779-7691
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right Column: Input Form ── */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="text-center py-12 px-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <FaCircleCheck className="text-5xl text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Received!</h3>
                  <p className="text-slate-600 max-w-sm mx-auto text-sm">
                    Thank you for reaching out. A specialist is reviewing your details and will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* First & Last Name */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
                      />
                    </div>
                  </div>

                  {/* Work Email */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Work Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
                    />
                  </div>

                  {/* Phone & Zip */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="(800) 779-7691"
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        ZIP / Postal Code
                      </label>
                      <input
                        type="text"
                        name="zip"
                        required
                        value={form.zip}
                        onChange={handleChange}
                        placeholder="e.g. 90210"
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
                      />
                    </div>
                  </div>

                  {/* Service Needed */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Service Needed
                    </label>
                    <select
                      name="service"
                      required
                      value={form.service}
                      onChange={handleChange}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition cursor-pointer"
                    >
                      <option value="">Select a service</option>
                      <option value="Armed Security">Armed Security</option>
                      <option value="Unarmed Security">Unarmed Security</option>
                      <option value="Patrol Services">Patrol Services</option>
                      <option value="Event Security">Event Security</option>
                      <option value="Commercial Cleaning">Commercial Cleaning</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Additional Notes
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your requirements..."
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full mt-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 px-6 rounded-xl transition duration-150 shadow-md text-sm"
                  >
                    Request My Free Quote
                  </button>

                  <p className="text-center text-xs text-slate-400 pt-1">
                    We respect your privacy. No spam, ever.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}