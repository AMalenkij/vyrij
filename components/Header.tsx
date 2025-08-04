import Navigation from "@/components/Navigation";
import Logo from "@/components/ui/Logo";
import { DropdownMenuHeader } from "./DropdownMenu";

export default function Header() {
  return (
    <header className="container sticky inset-x-1 top-0 z-100 mx-auto flex items-center justify-between py-4">
      <Logo />
      <Navigation className="hidden gap-4 md:flex" />
      <DropdownMenuHeader className="block md:hidden" />
    </header>
  );
}
