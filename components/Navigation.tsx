"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { ROUTES_CONFIG } from "@/constants/routes";
import { cn } from "@/lib/utils";

export type Route = {
  key: string;
  label: string;
  href: string;
};

type NavigationProps = {
  routes: Route[];
  className?: string;
};

export default function Navigation({ routes, className }: NavigationProps) {
  const pathname = usePathname();
  const { locale } = useParams();

  const isActive = (href: string) => {
    const fullHref = `/${locale}${href}`;
    if (href === ROUTES_CONFIG.HOME) {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname?.startsWith(fullHref);
  };

  return (
    <nav className={className}>
      {routes?.map(({ key, label, href }) => {
        const active = isActive(href);
        const localizedHref = `/${locale}${href}`;

        return (
          <span key={key}>
            <Button
              variant="link"
              asChild={!active}
              disabled={active}
              aria-current={active ? "page" : undefined}
              className={cn("")}
              title={label}
            >
              {active ? (
                <p className="text-start">{label}</p>
              ) : (
                <Link href={localizedHref}>{label}</Link>
              )}
            </Button>
          </span>
        );
      })}
    </nav>
  );
}
