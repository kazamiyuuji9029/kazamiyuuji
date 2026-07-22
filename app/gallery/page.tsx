"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import GlassPanel from "@/components/glass/GlassPanel";
import CardHover from "@/components/gallery/CardHover";
import ScrollReveal from "@/components/animation/ScrollReveal";
import { galleryContent } from "@/lib/data/portfolio";

interface AnimeImage {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
}

const animeThemes: { title: string; description: string; tags: string[] }[] = [
  {
    title: "Spirit Blossom",
    description: "A serene moment where spirits dance among cherry blossoms under the moonlight.",
    tags: ["Fantasy", "Atmospheric", "Spirit"],
  },
  {
    title: "Neon Samurai",
    description: "A lone warrior walks through the neon-lit streets of a cyberpunk Tokyo.",
    tags: ["Cyberpunk", "Action", "Neon"],
  },
  {
    title: "Starlight Journey",
    description: "Two travelers follow a path of falling stars across an endless sky.",
    tags: ["Adventure", "Stars", "Journey"],
  },
  {
    title: "Crimson Blade",
    description: "A swordsman channels ancient power through a blade forged in dragon fire.",
    tags: ["Fantasy", "Combat", "Power"],
  },
  {
    title: "Mystic Library",
    description: "An ancient library holds forbidden knowledge between walls of floating books.",
    tags: ["Mystery", "Magic", "Knowledge"],
  },
  {
    title: "Ocean Phantom",
    description: "A mysterious figure emerges from the deep ocean, trailing bioluminescent light.",
    tags: ["Supernatural", "Ocean", "Ethereal"],
  },
];

// Static curated anime artwork URLs — no external API needed
const animeImages: string[] = [
  "https://cdn.myanimelist.net/images/anime/1015/138006.jpg",
  "https://cdn.myanimelist.net/images/anime/1244/138851.jpg",
  "https://cdn.myanimelist.net/images/anime/1208/94745.jpg",
  "https://cdn.myanimelist.net/images/anime/1935/127974.jpg",
  "https://cdn.myanimelist.net/images/anime/1812/134736.jpg",
  "https://cdn.myanimelist.net/images/anime/5/87048.jpg",
];

export default function GalleryPage() {
  const [projects, setProjects] = useState<AnimeImage[]>([]);

  useEffect(() => {
    // Use static anime images — reliable, no CORS, no API dependency
    setProjects(
      animeThemes.map((theme, i) => ({
        id: i + 1,
        ...theme,
        image: animeImages[i],
      }))
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Navigation />

      <main id="main-content" className="flex-1 px-6 pt-28 pb-16 max-w-5xl mx-auto w-full">
        <ScrollReveal>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">
            {galleryContent.title}
          </h1>
          <p className="text-lg text-surface/70 mb-12">
            {galleryContent.description}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Anime artwork">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.08}>
              <CardHover>
                <GlassPanel variant="card" className="p-6 h-full flex flex-col" role="listitem">
                  <div className="aspect-video rounded-[var(--radius-card)] overflow-hidden mb-4 bg-primary/10">
                    <img
                      src={project.image}
                      alt={`${project.title} — ${project.description}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width={800}
                      height={600}
                      onError={(e) => {
                        // If MyAnimeList CDN blocks, fallback to a colored placeholder
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) {
                          const fallback = document.createElement("div");
                          fallback.className = "w-full h-full flex items-center justify-center text-4xl";
                          fallback.style.background = `linear-gradient(135deg, rgba(109,179,242,0.2) 0%, rgba(167,139,250,0.2) 100%)`;
                          fallback.textContent = ["🌸", "⚔️", "✨", "🗡️", "📚", "🌊"][index] || "🎮";
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-surface mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-surface/70 leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlassPanel>
              </CardHover>
            </ScrollReveal>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
