import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import GlassPanel from "@/components/glass/GlassPanel";
import ScrollReveal from "@/components/animation/ScrollReveal";
import HeroSceneLoader from "@/components/3d/HeroSceneLoader";
import { heroContent } from "@/lib/data/portfolio";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* 3D Hero Scene wraps page content — provides global mouse context */}
      <HeroSceneLoader>
        <Navigation />

        {/* Skip link target — WCAG 2.4.1 */}
        <main id="main-content" className="flex-1 flex items-center justify-center px-6 pt-24 relative z-10">
          <ScrollReveal className="w-full">
            <GlassPanel variant="hero" className="max-w-3xl text-center p-12">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">
                {heroContent.name}
              </h1>
              <p className="text-2xl text-surface/80 mb-4 font-light">
                {heroContent.tagline}
              </p>
              <p className="text-lg text-surface/60 mb-10 max-w-lg mx-auto leading-relaxed">
                {heroContent.subtitle}
              </p>
              <div className="flex gap-4 justify-center">
                <a
                  href={heroContent.cta.primary.href}
                  className="btn-primary"
                >
                  {heroContent.cta.primary.label}
                </a>
                <a
                  href={heroContent.cta.secondary.href}
                  className="btn-secondary"
                >
                  {heroContent.cta.secondary.label}
                </a>
              </div>
            </GlassPanel>
          </ScrollReveal>
        </main>

        <Footer />
      </HeroSceneLoader>
    </div>
  );
}
