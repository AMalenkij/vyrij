import Navigation from "@/components/Navigation";
import Logo from "@/components/ui/Logo";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-4">
      <Logo />
      <Navigation />
    </header>
  );
}
