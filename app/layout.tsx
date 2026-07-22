import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { LazyMotion, domAnimation } from "framer-motion";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/cursor/CustomCursor";
import Bubbles from "@/components/bubbles/Bubbles";
import SkipLink from "@/components/accessibility/SkipLink";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Mochi | Game Developer",
  description: "Game developer portfolio — Frutiger Aero aesthetic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} antialiased`}>
      <body
        className="min-h-screen font-[family-name:var(--font-body)]"
        style={{
          background: "linear-gradient(135deg, #E8F4FD 0%, #B3D9F2 50%, #FFFFFF 100%)",
        }}
      >
        {/* Skip link for keyboard users — WCAG 2.4.1 */}
        <SkipLink />

        <div className="light-rays" aria-hidden="true" />
        <Bubbles />
        <CustomCursor />
        <SmoothScroll>
          <LazyMotion features={domAnimation}>
            {children}
          </LazyMotion>
        </SmoothScroll>
      </body>
    </html>
  );
}
