// src/pages/ContactUs.jsx
import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, ArrowBigLeft } from "lucide-react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          user_name: form.name, // match {{user_name}}
          user_email: form.email, // match {{user_email}}
          message: form.message, // match {{message}}
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus({ ok: true, msg: "Thanks! We’ll get back to you shortly." });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus({
        ok: false,
        msg: "Could not send your message. Please try again later.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      className="relative min-h-screen bg-cover bg-left"
      style={{
        backgroundImage: "url(./useit.jpg)",
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/90 to-indigo-600/90" />

      <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left: Info */}
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Have Any Questions?
            </h2>
            <p className="text-indigo-100 leading-relaxed">
              Have ideas to make <span className="font-semibold">CareKaro</span>{" "}
              better, want to collaborate, or explore promotions? We’d love to
              hear from you. Share suggestions, partnership proposals, or media
              queries anytime.
            </p>

            <ul className="mt-6 space-y-5">
              <li className="flex items-start gap-3">
                <Phone className="w-6 h-6 text-white" />
                <div>
                  <h4 className="text-lg">+91-8652440318</h4>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-6 h-6 text-white" />
                <div>
                  <h4 className="text-lg">webugbuster@gmail.com</h4>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-white" />
                <div>
                  <h4 className="text-lg">
                    Kandivali East, Thakur Village, Mumbai
                  </h4>
                </div>
              </li>
            </ul>
            <p className="text-indigo-100 leading-relaxed mt-5">
              For business/health advertisements purpose, you can use our {" "}
              <span className="font-semibold">Ask Help</span> button.
            </p>

            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              {/* Ask Help -> same styling as Send Us */}
              <Link
                to="/askhelp"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 bg-[#FE846F] text-white font-medium shadow-md border-2 border-[#FE846F] hover:opacity-95 transition"
              >
                Ask Help
                <Send className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right: Form card */}
          <div className="relative">
            <div className="relative w-full bg-white rounded-xl shadow-2xl p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter Your Name *"
                    className="w-full bg-transparent h-14 px-2 text-base font-semibold border-0 border-b-2 border-black/10 focus:outline-none focus:border-[#FE846F] transition"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter Your Email *"
                    className="w-full bg-transparent h-14 px-2 text-base font-semibold border-0 border-b-2 border-black/10 focus:outline-none focus:border-[#FE846F] transition"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    rows="4"
                    value={form.message}
                    onChange={handleChange}
                    required
                    placeholder="Enter Your Message *"
                    className="w-full bg-transparent px-2 py-3 text-base font-semibold border-0 border-b-2 border-black/10 focus:outline-none focus:border-[#FE846F] transition"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 bg-[#FE846F] text-white font-medium shadow-md border-2 border-[#FE846F] hover:opacity-95 transition disabled:opacity-60"
                  >
                    {submitting ? "Sending..." : "Send Us"}
                    <Send className="w-4 h-4" />
                  </button>

                  {/* Keep Ask Help here too if you want it on the card */}
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 bg-[#FE846F] text-white font-medium shadow-md border-2 border-[#FE846F] hover:opacity-95 transition"
                  >      <ArrowBigLeft className="w-4 h-4" />
                 Go Back
               
                  </Link>
                </div>

                {status && (
                  <p
                    className={`text-sm ${
                      status.ok ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {status.msg}
                  </p>
                )}
              </form>
              {/* subtle faux “full-bleed” effect */}
              <div className="absolute -inset-x-8 -inset-y-8 -z-10 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
