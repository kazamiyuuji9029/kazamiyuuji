import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import GlassPanel from "@/components/glass/GlassPanel";
import Wave from "@/components/shapes/Wave";
import { galleryContent } from "@/lib/data/portfolio";

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
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">
          {galleryContent.title}
        </h1>
        <p className="text-lg text-surface/70 mb-12">
          {galleryContent.description}
        </p>

        {galleryContent.placeholder ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <GlassPanel key={i} variant="card" className="p-6">
                <div className="aspect-video rounded-[var(--radius-card)] bg-white/5 mb-4 flex items-center justify-center">
                  <span className="text-surface/30 text-sm">Coming Soon</span>
                </div>
                <h3 className="text-lg font-semibold text-surface/80">
                  Project {i}
                </h3>
                <p className="text-sm text-surface/50 mt-1">
                  Phase 2 will populate this gallery with real content.
                </p>
              </GlassPanel>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Real gallery items will be rendered here */}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
