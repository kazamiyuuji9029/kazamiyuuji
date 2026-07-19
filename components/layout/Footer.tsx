import React from "react";

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-surface/40 text-sm">
          &copy; {new Date().getFullYear()} Kazamiyuuji. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-surface/40 hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-surface/40 hover:text-accent transition-colors"
            aria-label="Twitter"
          >
            Twitter
          </a>
          <a
            href="mailto:hello@example.com"
            className="text-surface/40 hover:text-nature transition-colors"
            aria-label="Email"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
