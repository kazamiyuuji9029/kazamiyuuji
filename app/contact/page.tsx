"use client";

import React, { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import GlassPanel from "@/components/glass/GlassPanel";
import ScrollReveal from "@/components/animation/ScrollReveal";
import { contactContent } from "@/lib/data/portfolio";

// Replace with your Formspree form ID from https://formspree.io
const FORMSPREE_FORM_ID = "mvzebwjo";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Navigation />

      {/* Skip link target — WCAG 2.4.1 */}
      <main id="main-content" className="flex-1 px-6 pt-28 pb-16 max-w-4xl mx-auto w-full">
        <ScrollReveal>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">
            {contactContent.title}
          </h1>
          <p className="text-lg text-surface/70 mb-12">
            {contactContent.description}
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <ScrollReveal>
            <GlassPanel className="p-8">
              {status === "sent" ? (
                <div className="text-center py-12">
                  <p className="text-xl font-semibold text-primary mb-2">Message sent!</p>
                  <p className="text-surface/70">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 btn-secondary"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-surface/70 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-[var(--radius-button)] bg-white/50 border border-white/80 text-surface placeholder-surface/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="Your name"
                      required
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-surface/70 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-[var(--radius-button)] bg-white/50 border border-white/80 text-surface placeholder-surface/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="your@email.com"
                      required
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-surface/70 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-[var(--radius-button)] bg-white/50 border border-white/80 text-surface placeholder-surface/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 min-h-[120px] resize-none"
                      placeholder="Your message..."
                      required
                      aria-required="true"
                    />
                  </div>
                  {status === "error" && (
                    <p className="text-red-500 text-sm">Something went wrong. Try again.</p>
                  )}
                  <button
                    type="submit"
                    className="btn-primary w-full"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </GlassPanel>
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal delay={0.1}>
            <GlassPanel className="p-8">
              <h2 className="text-xl font-bold text-primary mb-6">Connect</h2>
              <div className="space-y-4" role="list" aria-label="Social media links">
                {contactContent.social.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-[var(--radius-button)] bg-white/50 hover:bg-white/70 transition-colors group"
                    aria-label={`${social.platform} — ${social.label}`}
                    role="listitem"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors" aria-hidden="true">
                      <span className="text-primary font-bold">
                        {social.platform[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-surface">{social.platform}</p>
                      <p className="text-sm text-surface/70">{social.label}</p>
                    </div>
                  </a>
                ))}
              </div>
            </GlassPanel>
          </ScrollReveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}
