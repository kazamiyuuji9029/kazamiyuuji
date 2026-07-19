"use client";

import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import GlassPanel from "@/components/glass/GlassPanel";
import Blob from "@/components/shapes/Blob";
import Ellipse from "@/components/shapes/Ellipse";
import { contactContent } from "@/lib/data/portfolio";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Blob
        color="rgba(46, 204, 113, 0.15)"
        size={350}
        className="top-24 -left-32"
      />
      <Ellipse
        color="rgba(241, 196, 15, 0.08)"
        width={500}
        height={250}
        className="bottom-32 -right-24"
      />

      <Navigation />

      <main className="flex-1 flex items-center justify-center px-6 pt-24 pb-16">
        <GlassPanel variant="hero" className="max-w-xl w-full p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-primary bg-clip-text text-transparent text-center">
            {contactContent.title}
          </h1>
          <p className="text-lg text-surface/70 mb-10 text-center">
            {contactContent.description}
          </p>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-surface/60 mb-1.5"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full px-4 py-3 rounded-[var(--radius-button)] bg-white/5 border border-white/10 text-surface placeholder:text-surface/30 focus:outline-none focus:border-accent transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-surface/60 mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 rounded-[var(--radius-button)] bg-white/5 border border-white/10 text-surface placeholder:text-surface/30 focus:outline-none focus:border-accent transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-surface/60 mb-1.5"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-3 rounded-[var(--radius-button)] bg-white/5 border border-white/10 text-surface placeholder:text-surface/30 focus:outline-none focus:border-accent transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 gradient-primary rounded-[var(--radius-button)] text-surface font-semibold hover:shadow-[var(--shadow-glow-primary)] transition-shadow"
            >
              Send Message
            </button>
          </form>

          <p className="text-center text-surface/40 text-sm mt-6">
            Or reach out at{" "}
            <a
              href={`mailto:${contactContent.email}`}
              className="text-accent hover:underline"
            >
              {contactContent.email}
            </a>
          </p>
        </GlassPanel>
      </main>

      <Footer />
    </div>
  );
}
