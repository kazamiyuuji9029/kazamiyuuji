import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { LazyMotion, domAnimation } from "framer-motion";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/cursor/CustomCursor";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Kazamiyuuji | Portfolio",
  description: "Frutiger cyber aesthetic portfolio — clean, organic, futuristic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} antialiased`}>
      <body className="min-h-screen font-[family-name:var(--font-body)]">
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
