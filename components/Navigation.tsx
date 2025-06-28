"use client";

// constants/routes.ts
export const HOME_ROUTE = "/";
export const TIMELINE_ROUTE = "/timeline";
export const EVENT_ROUTE = "/events";
export const CONCERTS_ROUTE = "/concerts";
export const GALLERY_ROUTE = "/gallery";

// components/Navigation.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Routes configuration with Ukrainian labels
const ROUTES = [
  {
    label: "Головна",
    href: HOME_ROUTE,
  },
  {
    label: "Хронологія",
    href: TIMELINE_ROUTE,
  },
  {
    label: "Події",
    href: EVENT_ROUTE,
  },
  {
    label: "Концерти",
    href: CONCERTS_ROUTE,
  },
  {
    label: "Галерея",
    href: GALLERY_ROUTE,
  },
];

export default function Navigation() {
  const pathname = usePathname();

  // Function to check if a route is active (simplified without locale)
  const isActive = (href: string) => {
    if (href === HOME_ROUTE) {
      return pathname === "/" || pathname === "";
    }
    return pathname?.startsWith(href);
  };

  return (
    <nav>
      {ROUTES.map((route) => {
        const active = isActive(route.href);

        if (active) {
          return (
            <Button
              key={route.href}
              variant="link"
              disabled
              className="uppercase"
            >
              {route.label}
            </Button>
          );
        }

        return (
          <Button key={route.href} asChild variant="link" className="uppercase">
            <Link href={route.href}>{route.label}</Link>
          </Button>
        );
      })}
    </nav>
  );
}
