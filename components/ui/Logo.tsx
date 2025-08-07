import Link from "next/link";
import LogoIcon from "@/components/icons/Logo";
import { ROUTES_CONFIG } from "@/constants/routes";

export default function Logo() {
  return (
    <Link href={ROUTES_CONFIG.HOME} className="flex items-center gap-2">
      <span className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
        Chor
      </span>
      <LogoIcon className="h-9 w-10 md:h-11 md:w-12 lg:h-12 lg:w-14 xl:h-18 xl:w-20" />
    </Link>
  );
}
