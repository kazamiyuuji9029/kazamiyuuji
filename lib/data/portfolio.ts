/**
 * Portfolio content data
 * Centralized content for all pages — easy to update without touching components.
 */

export const siteMetadata = {
  title: "Kazamiyuuji | Portfolio",
  description: "Frutiger cyber aesthetic portfolio — clean, organic, futuristic",
  author: "Kazamiyuuji",
};

export const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

export const heroContent = {
  name: "Kazamiyuuji",
  tagline: "Designing the future, one pixel at a time.",
  subtitle:
    "Creative developer crafting immersive digital experiences with Frutiger cyber aesthetics — where organic meets algorithmic.",
  cta: {
    primary: { label: "About Me", href: "/about" },
    secondary: { label: "View Work", href: "/gallery" },
  },
} as const;

export const aboutContent = {
  title: "About Me",
  description:
    "A creative developer and designer obsessed with the intersection of nature and technology. I build digital experiences that feel alive — breathing, flowing, evolving.",
  sections: [
    {
      heading: "Philosophy",
      body: "I believe in design that feels alive — organic shapes, clean gradients, and interfaces that breathe. Every project is an exploration of how technology can mirror the beauty of the natural world, creating digital spaces that feel both futuristic and organic.",
    },
    {
      heading: "What I Do",
      body: "I specialize in frontend development, creative coding, and immersive web experiences. From interactive 3D scenes to fluid micro-animations, I push the boundaries of what's possible in the browser.",
    },
    {
      heading: "Skills",
      items: [
        "React / Next.js",
        "TypeScript",
        "Three.js / R3F",
        "Framer Motion",
        "Tailwind CSS",
        "Creative Coding",
        "UI/UX Design",
        "WebGL / Shaders",
      ],
    },
    {
      heading: "Approach",
      body: "Every project starts with a question: how can this feel more human? I prototype rapidly, iterate on feel over feature, and ship experiences that make people pause and smile. The Frutiger aesthetic — clean, organic, optimistic — is my north star.",
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
    title: "Aqua Flow",
    description:
      "Interactive fluid simulation with real-time particle dynamics. A meditation on water, light, and motion rendered entirely in WebGL.",
    tags: ["WebGL", "Three.js", "GLSL"],
    image: "https://picsum.photos/seed/aquaflow/800/600",
  },
  {
    id: 2,
    title: "Verdant",
    description:
      "Generative art platform that grows organic patterns from algorithmic seeds. Each visit produces a unique, unrepeatable composition.",
    tags: ["Generative Art", "Canvas", "React"],
    image: "https://picsum.photos/seed/verdant/800/600",
  },
  {
    id: 3,
    title: "Neon Drift",
    description:
      "A synthwave-inspired music visualizer that transforms audio frequencies into luminous 3D landscapes in real time.",
    tags: ["Web Audio", "Three.js", "Shaders"],
    image: "https://picsum.photos/seed/neondrift/800/600",
  },
  {
    id: 4,
    title: "Crystal Lattice",
    description:
      "Data visualization exploring crystal growth algorithms. Millions of data points rendered as refractive, light-catching structures.",
    tags: ["D3.js", "WebGL", "Data Viz"],
    image: "https://picsum.photos/seed/crystalline/800/600",
  },
  {
    id: 5,
    title: "Solaris",
    description:
      "Atmospheric weather dashboard with animated cloud systems, dynamic sun positions, and real-time meteorological data overlays.",
    tags: ["Next.js", "API", "Animation"],
    image: "https://picsum.photos/seed/solaris/800/600",
  },
  {
    id: 6,
    title: "Bloom",
    description:
      "Interactive botanical simulation where virtual plants grow in response to user interaction and ambient conditions.",
    tags: ["R3F", "Procedural", "React"],
    image: "https://picsum.photos/seed/bloomfield/800/600",
  },
];

export const galleryContent = {
  title: "Gallery",
  description:
    "A curated collection of creative coding experiments, interactive installations, and design explorations.",
} as const;

export const contactContent = {
  title: "Get in Touch",
  description:
    "Have a project in mind, want to collaborate, or just want to say hello? I'd love to hear from you.",
  email: "hello@kazamiyuuji.dev",
  social: [
    {
      platform: "GitHub",
      url: "https://github.com/kazamiyuuji",
      label: "GitHub",
    },
    {
      platform: "Twitter",
      url: "https://twitter.com/kazamiyuuji",
      label: "Twitter",
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/kazamiyuuji",
      label: "LinkedIn",
    },
  ],
} as const;
