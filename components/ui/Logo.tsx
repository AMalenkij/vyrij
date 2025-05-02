import Link from "next/link";
import LogoIcon from "@/components/icons/Logo";
import { HOME_ROUTE } from "@/constants/routes";

export default function Logo() {
  return (
    <Link
      href={HOME_ROUTE}
      className="flex items-center"
      // className="rochester-regular flex h-10 w-28 shrink-0 items-center gap-2 whitespace-nowrap text-static_white text-xl lg:w-44 xl:text-3xl"
    >
      <span className="text-5xl">Chor |</span>
      <LogoIcon />
    </Link>
  );
}
