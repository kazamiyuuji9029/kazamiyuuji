import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import GlassPanel from "@/components/glass/GlassPanel";
import Blob from "@/components/shapes/Blob";
import Ellipse from "@/components/shapes/Ellipse";
import ScrollReveal from "@/components/animation/ScrollReveal";
import { aboutContent } from "@/lib/data/portfolio";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Blob
        color="rgba(0, 206, 209, 0.15)"
        size={400}
        className="top-32 -right-32"
      />
      <Ellipse
        color="rgba(109, 179, 242, 0.08)"
        width={700}
        height={350}
        className="bottom-20 -left-48"
      />

      <Navigation />

      <main className="flex-1 px-6 pt-28 pb-16 max-w-4xl mx-auto w-full">
        <ScrollReveal>
          <GlassPanel className="p-8 md:p-12 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-primary bg-clip-text text-transparent">
              {aboutContent.title}
            </h1>
            <p className="text-lg text-surface/70 leading-relaxed">
              {aboutContent.description}
            </p>
          </GlassPanel>
        </ScrollReveal>

        <div className="space-y-6">
          {aboutContent.sections.map((section, index) => (
            <ScrollReveal key={section.heading} delay={index * 0.1}>
              <GlassPanel className="p-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">
                  {section.heading}
                </h2>
                {"body" in section ? (
                  <p className="text-surface/60 leading-relaxed">
                    {section.body}
                  </p>
                ) : (
                  <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="glass-panel px-4 py-3 rounded-[var(--radius-card)] text-surface/80 font-medium text-center"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
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
