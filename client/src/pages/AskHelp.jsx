import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

const AskHelp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "Emergency",
    fullName: "",
    location: "",
    contact: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/askhelp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          user_name: form.fullName,
          user_email: form.contact,
          message: `Title: ${form.title}\nDescription: ${form.description}\nType: ${form.type}\nLocation: ${form.location}`,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus({ ok: true, msg: "Request submitted! We'll contact you soon." });
      setForm({
        title: "",
        description: "",
        type: "Emergency",
        fullName: "",
        location: "",
        contact: "",
      });
    } catch (err) {
      console.error(err);
      setStatus({ ok: false, msg: "Something went wrong, please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-left flex items-center justify-center"
      style={{ backgroundImage: "url(./health.jpg)" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Glassmorphism Form */}
      <form
        onSubmit={handleSubmit}
        className="relative bg-white/10 backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(8,7,16,0.6)] rounded-lg p-12 w-[600px] max-w-full text-white flex flex-col space-y-4 z-10"
        style={{ minHeight: "480px" }}
      >
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/advertisement")}
          className="text-white text-sm mb-2 hover:underline self-start"
        >
          ← Back
        </button>

        <h3 className="text-3xl font-medium text-center mb-4">Request Help</h3>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-3 bg-white/10 rounded placeholder-white/70 text-white focus:outline-none"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 bg-white/10 rounded placeholder-white/70 text-white focus:outline-none resize-none h-20"
          required
        />
        <div className="relative">
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full p-3 bg-white/10 rounded text-white focus:outline-none appearance-none"
          >
            <option className="bg-black text-white">Emergency</option>
            <option className="bg-black text-white">Hiring</option>
            <option className="bg-black text-white">Demand</option>
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none">
            ▼
          </span>
        </div>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="w-full p-3 bg-white/10 rounded placeholder-white/70 text-white focus:outline-none"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full p-3 bg-white/10 rounded placeholder-white/70 text-white focus:outline-none"
          required
        />
        <input
          type="email"
          name="contact"
          placeholder="Email"
          value={form.contact}
          onChange={handleChange}
          className="w-full p-3 bg-white/10 rounded placeholder-white/70 text-white focus:outline-none"
          required
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-white text-[#080710] py-3 text-lg font-semibold rounded hover:opacity-90 transition mt-4"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>

        {status && (
          <p className={`mt-2 ${status.ok ? "text-green-400" : "text-red-400"}`}>
            {status.msg}
          </p>
        )}
      </form>
    </div>
  );
};

export default AskHelp;
