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
  tagline: "Frutiger Cyber Portfolio",
  cta: {
    primary: { label: "About Me", href: "/about" },
    secondary: { label: "View Work", href: "/gallery" },
  },
} as const;

export const aboutContent = {
  title: "About Me",
  description: "A creative developer with a passion for futuristic, organic design.",
  sections: [
    {
      heading: "Philosophy",
      body: "I believe in design that feels alive — organic shapes, clean gradients, and interfaces that breathe.",
    },
    {
      heading: "Skills",
      items: ["Frontend Development", "UI/UX Design", "Creative Coding", "3D Visualization"],
    },
  ],
} as const;

export const galleryContent = {
  title: "Gallery",
  description: "A curated collection of work and experiments.",
  placeholder: true,
} as const;

export const contactContent = {
  title: "Get in Touch",
  description: "Have a project in mind? Let's create something amazing together.",
  email: "hello@example.com",
} as const;
