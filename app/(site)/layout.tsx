import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-stone-900 text-stone-200">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer
        heroSubtitle="heroSubtitle"
        designerName="designerName"
        copyrightNotice="copyrightNotice"
        designCreditText="designCreditText"
      />
    </div>
  );
}
