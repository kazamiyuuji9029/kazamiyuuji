import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import GlassPanel from "@/components/glass/GlassPanel";
import ScrollReveal from "@/components/animation/ScrollReveal";
import { aboutContent } from "@/lib/data/portfolio";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Navigation />

      {/* Skip link target — WCAG 2.4.1 */}
      <main id="main-content" className="flex-1 px-6 pt-28 pb-16 max-w-4xl mx-auto w-full">
        <ScrollReveal>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">
            {aboutContent.title}
          </h1>
          <p className="text-lg text-surface/70 mb-12">
            {aboutContent.description}
          </p>
        </ScrollReveal>

        <div className="space-y-8">
          {aboutContent.sections.map((section, index) => (
            <ScrollReveal key={section.heading} delay={index * 0.1}>
              <GlassPanel className="p-8">
                <h2 className="text-xl font-bold text-primary mb-4">
                  {section.heading}
                </h2>
                {"body" in section ? (
                  <p className="text-surface/70 leading-relaxed">
                    {section.body}
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-3" role="list" aria-label={`${section.heading} list`}>
                    {section.items.map((item) => (
                      <span
                        key={item}
                        role="listitem"
                        className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </GlassPanel>
            </ScrollReveal>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
