/**
 * Portfolio content data
 * Kazami Yuuji — The Fruit of Grisaia
 */

export const siteMetadata = {
  title: "Kazami Yuuji | Portfolio",
  description: "Kazami Yuuji — protagonist of The Fruit of Grisaia",
  author: "Kazami Yuuji",
};

export const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

export const heroContent = {
  name: "Kazami Yuuji",
  tagline: "The Man with the Deadliest Skillset",
  subtitle:
    "Former child soldier, government operative, and Mihama Academy's most dangerous student. I don't talk much — my work speaks for itself.",
  cta: {
    primary: { label: "View My Work", href: "/gallery" },
    secondary: { label: "Contact Me", href: "/contact" },
  },
} as const;

export const aboutContent = {
  title: "About Me",
  description:
    "I'm Kazami Yuuji. Former assassin turned student. That's all you need to know.",
  sections: [
    {
      heading: "Who I Am",
      body: "My name is Kazami Yuuji. I was raised by my sister Kazuki — the greatest magician the world has ever seen — and trained to be a weapon. By age 15, I had already completed black ops missions that would break most adults. Now I'm a student at Mihama Academy, trying to live something resembling a normal life. It's not going well.",
    },
    {
      heading: "What I Do",
      body: "Combat. Infiltration. Assassination. Languages. Hacking. You name it, I've done it professionally. But here at Mihama, I'm supposed to be learning how to be a regular high school student. The girls here have their own trauma, and somehow I keep getting dragged into their problems. Being a 'big brother' wasn't in the mission briefing.",
    },
    {
      heading: "Skills",
      items: [
        "Close Quarters Combat",
        "Marksman (All Weapons)",
        "Infiltration & Espionage",
        "Multilingual (JP, EN, RU, CN)",
        "Explosives & Demolitions",
        "Hand-to-Hand Combat",
        "Tactical Planning",
        "Cooking (Secret Talent)",
      ],
    },
    {
      heading: "My Philosophy",
      body: "The world isn't black and white — it's grey. I've done terrible things for good reasons, and good things by accident. All I can do now is protect the people I care about at Mihama. Kazuki left them in my care, and I don't break promises.",
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
    title: "Kazami Yuuji",
    description:
      "The protagonist. A former child soldier with a lethal skillset, now navigating life at Mihama Academy.",
    tags: ["Protagonist", "Combat", "Mihama"],
    image: "https://s4.anilist.co/file/anilistcdn/character/large/n80891-WesKQmQEVJ5n.jpg",
  },
  {
    id: 2,
    title: "Amane Suou",
    description:
      "The eldest of the Mihama girls. Seems promiscuous on the surface but carries deep trauma and genuine care for others.",
    tags: ["Onee-san", "Caring", "Complex"],
    image: "https://s4.anilist.co/file/anilistcdn/character/large/b80899-TzrealvmrLxH.png",
  },
  {
    id: 3,
    title: "Makina Irisu",
    description:
      "Childish and innocent on the outside, but comes from a twisted wealthy family. Surprisingly good at sharpshooting.",
    tags: ["Genki", "Shooter", "Irisu"],
    image: "https://s4.anilist.co/file/anilistcdn/character/large/n80893-qYexb8DbTG0E.jpg",
  },
  {
    id: 4,
    title: "Sachi Komine",
    description:
      "The maid of Mihama. Suppresses her own desires to serve others. Will do anything requested of her — no matter how dangerous.",
    tags: ["Maid", "Obedient", "Tragic"],
    image: "https://s4.anilist.co/file/anilistcdn/character/large/b80895-ER8FPmnwhR1h.png",
  },
  {
    id: 5,
    title: "Michiru Matsushima",
    description:
      "Self-proclaimed tsundere with a split personality. Talks big but hides real pain behind her blonde hair and energy.",
    tags: ["Tsundere", "Blonde", "Two-faced"],
    image: "https://s4.anilist.co/file/anilistcdn/character/large/n80897-psxA0eW0jAsb.jpg",
  },
  {
    id: 6,
    title: "Yumiko Sakaki",
    description:
      "The sharp-tongued daughter of a CEO. Initially hostile toward Yuuji but slowly opens up. Wields a box cutter with deadly precision.",
    tags: ["Tsundere", "Box Cutter", "Sakaki"],
    image: "https://s4.anilist.co/file/anilistcdn/character/large/b80257-pelmvGBeCiNm.png",
  },
];

export const galleryContent = {
  title: "The Fruit of Grisaia",
  description:
    "The cast of Mihama Academy — broken people finding purpose in each other.",
} as const;

export const contactContent = {
  title: "Get in Touch",
  description:
    "If you have a job, keep it to yourself. I'm done with that life. But if you need me... I'll be at Mihama.",
  email: "yuuji@mihama.edu",
  social: [
    {
      platform: "GitHub",
      url: "https://github.com/kazamiyuuji9029",
      label: "GitHub",
    },
    {
      platform: "Email",
      url: "mailto:yuuji@mihama.edu",
      label: "Email",
    },
  ],
} as const;
