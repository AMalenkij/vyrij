import "@/app/globals.css";
import noiseTransparent from "@/public/img/noiseTransparent.png";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-stone-950 text-stone-200">
      <div
        className="-top-1/2 -left-1/2 pointer-events-none fixed z-[100] h-[200%] w-[200%] animate-noise opacity-90"
        style={{
          background: `transparent url(${noiseTransparent.src}) repeat 0 0`,
          backgroundSize: "300px 300px",
          willChange: "transform",
        }}
      />
      <Header />

      <main>{children}</main>
      <Footer />
    </div>
  );
}
