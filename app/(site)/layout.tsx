import "@/app/globals.css";
import noiseTransparent from "@/public/img/noiseTransparent.png";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { Marmelad, Great_Vibes } from "next/font/google";

const primaryFont = Marmelad({
  subsets: ["latin", "cyrillic"],
  weight: "400",
  variable: "--font-primary",
});

const accentFont = Great_Vibes({
  subsets: ["latin", "cyrillic"],
  weight: "400",
  variable: "--font-accent",
});

export const metadata: Metadata = {
  title: "Vyrij",
  description: "choir Vyrij",
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${primaryFont.variable} ${accentFont.variable} bg-stone-950 font-primary text-stone-200`}
    >
      <div
        className="pointer-events-none fixed inset-0 z-[100] animate-noise opacity-90"
        style={{
          background: `transparent url(${noiseTransparent.src}) repeat 0 0`,
          backgroundSize: "300px 300px",
          willChange: "transform",
        }}
      />
      <Header />
      {children}
      <Footer />
    </div>
  );
}
