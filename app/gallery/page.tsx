import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import GlassPanel from "@/components/glass/GlassPanel";
import HoverEffect from "@/components/animation/HoverEffect";
import ScrollReveal from "@/components/animation/ScrollReveal";
import Wave from "@/components/shapes/Wave";
import { galleryContent, projects } from "@/lib/data/portfolio";

export default function GalleryPage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Wave
        color="rgba(109, 179, 242, 0.1)"
        className="absolute top-20 left-0 right-0"
        flip
      />

      <Navigation />

      <main className="flex-1 px-6 pt-28 pb-16 max-w-5xl mx-auto w-full">
        <ScrollReveal>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">
            {galleryContent.title}
          </h1>
          <p className="text-lg text-surface/70 mb-12">
            {galleryContent.description}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.08}>
              <HoverEffect scale={1.03} glow>
                <GlassPanel variant="card" className="p-6 h-full flex flex-col">
                  <div className="aspect-video rounded-[var(--radius-card)] overflow-hidden mb-4 bg-white/5">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-surface/90 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-surface/50 leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full glass-panel text-accent/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlassPanel>
              </HoverEffect>
            </ScrollReveal>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
