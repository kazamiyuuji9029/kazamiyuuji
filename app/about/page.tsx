import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import GlassPanel from "@/components/glass/GlassPanel";
import Blob from "@/components/shapes/Blob";
import Ellipse from "@/components/shapes/Ellipse";
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
        <GlassPanel className="p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-primary bg-clip-text text-transparent">
            {aboutContent.title}
          </h1>
          <p className="text-lg text-surface/70 mb-10">
            {aboutContent.description}
          </p>

          <div className="space-y-8">
            {aboutContent.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-2xl font-semibold text-primary mb-3">
                  {section.heading}
                </h2>
                {"body" in section ? (
                  <p className="text-surface/60 leading-relaxed">
                    {section.body}
                  </p>
                ) : (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="glass-panel px-4 py-3 rounded-[var(--radius-card)] text-surface/80 font-medium"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </GlassPanel>
      </main>

      <Footer />
    </div>
  );
}
