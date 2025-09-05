import Link from "next/link";
import LogoIcon from "@/components/icons/Logo";
import { ROUTES_CONFIG } from "@/constants/routes";
import { CHOR } from "@/constants/app-content";

export default function Logo() {
  return (
    <Link
      href={ROUTES_CONFIG.HOME}
      className="flex items-center gap-1 md:gap-2"
    >
      <span className="text-base sm:text-xl md:text-2xl lg:text-2xl">
        {CHOR}
      </span>
      <LogoIcon className="h-8 w-9 md:h-11 md:w-12 lg:h-12 lg:w-14" />
    </Link>
  );
}
