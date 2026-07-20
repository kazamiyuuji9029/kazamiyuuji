import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import GlassPanel from "@/components/glass/GlassPanel";
import Blob from "@/components/shapes/Blob";
import Wave from "@/components/shapes/Wave";
import ScrollReveal from "@/components/animation/ScrollReveal";
import HeroSceneLoader from "@/components/3d/HeroSceneLoader";
import { heroContent } from "@/lib/data/portfolio";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* 3D Hero Scene (lazy-loaded) */}
      <HeroSceneLoader />

      {/* Background organic shapes */}
      <Blob
        color="rgba(109, 179, 242, 0.2)"
        size={500}
        className="top-20 -left-40"
      />
      <Blob
        color="rgba(0, 206, 209, 0.15)"
        size={400}
        className="bottom-40 -right-32"
      />

      <Navigation />

      <main className="flex-1 flex items-center justify-center px-6 pt-24 relative z-10">
        <ScrollReveal className="w-full">
          <GlassPanel variant="hero" className="max-w-3xl text-center p-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">
              {heroContent.name}
            </h1>
            <p className="text-2xl text-surface/90 mb-4 font-light">
              {heroContent.tagline}
            </p>
            <p className="text-lg text-surface/50 mb-10 max-w-lg mx-auto leading-relaxed">
              {heroContent.subtitle}
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href={heroContent.cta.primary.href}
                className="px-8 py-3 gradient-primary rounded-[var(--radius-button)] text-surface font-semibold hover:shadow-[var(--shadow-glow-primary)] transition-shadow"
              >
                {heroContent.cta.primary.label}
              </a>
              <a
                href={heroContent.cta.secondary.href}
                className="px-8 py-3 glass-panel text-surface font-semibold hover:shadow-[var(--shadow-glow-accent)] transition-shadow"
              >
                {heroContent.cta.secondary.label}
              </a>
            </div>
          </GlassPanel>
        </ScrollReveal>
      </main>

      <Wave color="rgba(0, 206, 209, 0.15)" className="mt-auto" />

      <Footer />
    </div>
  );
}
