/**
 * Portfolio content data
 * Centralized content for all pages — Mochi, Game Developer
 */

export const siteMetadata = {
  title: "Mochi | Game Developer",
  description: "Game developer portfolio — Frutiger Aero aesthetic",
  author: "Mochi",
};

export const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

export const heroContent = {
  name: "Mochi",
  tagline: "Crafting Worlds, One Pixel at a Time",
  subtitle:
    "Game developer passionate about creating immersive experiences — from indie 2D adventures to 3D worlds.",
  cta: {
    primary: { label: "View My Work", href: "/gallery" },
    secondary: { label: "Contact Me", href: "/contact" },
  },
} as const;

export const aboutContent = {
  title: "About Me",
  description:
    "Hi, I'm Mochi — a game developer who loves bringing ideas to life through code and creativity.",
  sections: [
    {
      heading: "What I Do",
      body: "I create games across all platforms — 2D indie titles, 3D adventures, web-based casual games, and everything in between. Every project is a new opportunity to push boundaries and create something memorable.",
    },
    {
      heading: "My Approach",
      body: "Games are about experience. I focus on gameplay feel, visual polish, and those small details that make players smile. Whether it's a satisfying animation, a clever puzzle, or an atmospheric world — it's the little things that matter.",
    },
    {
      heading: "Skills",
      items: [
        "Unity / Unreal Engine",
        "Godot / GameMaker",
        "C# / C++ / GDScript",
        "Pixel Art / 2D Design",
        "3D Modeling (Blender)",
        "Game Design",
        "Level Design",
        "Audio Design",
      ],
    },
    {
      heading: "Tools I Use",
      body: "My toolkit spans engines (Unity, Unreal, Godot), languages (C#, C++, GDScript), and creative tools (Blender, Aseprite, FMOD). I pick the right tool for each project — no dogma, just results.",
    },
  ],
} as const;

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  url?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Pixel Quest",
    description:
      "A retro-inspired 2D platformer with hand-crafted pixel art and tight controls. Explore enchanted dungeons and defeat bosses in this classic adventure.",
    tags: ["Unity", "2D", "Platformer"],
    image: "https://picsum.photos/seed/pixelquest/800/600",
  },
  {
    id: 2,
    title: "SkyBound",
    description:
      "An open-world 3D exploration game set in a floating archipelago. Soar between islands, discover secrets, and unravel an ancient mystery.",
    tags: ["Unreal Engine", "3D", "Open World"],
    image: "https://picsum.photos/seed/skybound/800/600",
  },
  {
    id: 3,
    title: "Bubble Pop Deluxe",
    description:
      "A casual mobile puzzle game with satisfying physics-based bubble mechanics. Over 200 levels of colorful, relaxing fun.",
    tags: ["Godot", "Mobile", "Puzzle"],
    image: "https://picsum.photos/seed/bubblepop/800/600",
  },
  {
    id: 4,
    title: "Neon Racer",
    description:
      "A fast-paced arcade racer with synthwave aesthetics. Drift through neon-lit cityscapes and compete on global leaderboards.",
    tags: ["Unity", "3D", "Racing"],
    image: "https://picsum.photos/seed/neonracer/800/600",
  },
  {
    id: 5,
    title: "Dungeon Crawler",
    description:
      "A roguelike dungeon crawler with procedural generation. Every run is unique — adapt, survive, and conquer the ever-changing depths.",
    tags: ["Godot", "2D", "Roguelike"],
    image: "https://picsum.photos/seed/dungeoncrawler/800/600",
  },
  {
    id: 6,
    title: "Starfield Explorer",
    description:
      "A web-based space exploration game built for the browser. Navigate star systems, trade resources, and build your cosmic empire.",
    tags: ["WebGL", "Browser", "Strategy"],
    image: "https://picsum.photos/seed/starfield/800/600",
  },
];

export const galleryContent = {
  title: "My Games",
  description:
    "A collection of games I've developed — from indie adventures to casual puzzles.",
} as const;

export const contactContent = {
  title: "Get in Touch",
  description:
    "Want to collaborate, have a question, or just want to say hi? Feel free to reach out!",
  email: "hello@mochi.dev",
  social: [
    {
      platform: "GitHub",
      url: "https://github.com/kazamiyuuji9029",
      label: "GitHub",
    },
    {
      platform: "Email",
      url: "mailto:hello@mochi.dev",
      label: "Email",
    },
  ],
} as const;
