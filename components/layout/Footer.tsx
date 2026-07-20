import React from "react";
import { siteMetadata } from "@/lib/data/portfolio";

export default function Footer() {
  return (
    <footer className="py-8 px-6 text-center">
      <p className="text-sm text-surface/50">
        &copy; {new Date().getFullYear()} {siteMetadata.author}. All rights reserved.
      </p>
    </footer>
  );
}
