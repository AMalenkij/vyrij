"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import {
  HOME_ROUTE,
  EVENT_ROUTE,
  CONCERTS_ROUTE,
  GALLERY_ROUTE,
} from "@/constants/routes";

const ROUTES = [
  {
    label: "Головна",
    href: HOME_ROUTE,
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

export function DropdownMenuHeader({ className }: { className?: string }) {
  const pathname = usePathname();

  // Функція для перевірки, чи є маршрут активним
  const isActive = (href: string) => {
    if (href === HOME_ROUTE) {
      return pathname === "/" || pathname === "";
    }
    return pathname?.startsWith(href);
  };

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="link" className="text-white uppercase">
            MENU [ ]
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="w-full md:visible">
          {ROUTES.map((route, index) => {
            // Визначаємо, чи є маршрут активним
            const active = isActive(route.href);

            return (
              <DropdownMenuItem asChild key={route.href}>
                <motion.li
                  className="relative w-full cursor-pointer py-6"
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  onHoverStart={() => {}}
                  onHoverEnd={() => {}}
                >
                  <Link
                    className="relative flex w-full items-center"
                    href={route.href}
                  >
                    {/* Анімований фон */}
                    <motion.div
                      className="bg-primary-foreground"
                      variants={itemCoverMotion}
                    />

                    {/* Номер пункту меню */}
                    <motion.span
                      className="w-[4ch] text-2xl sm:text-3xl md:text-4xl"
                      variants={itemContentMotion}
                    >
                      {(index + 1).toLocaleString("en-US", {
                        minimumIntegerDigits: 2,
                      })}
                    </motion.span>

                    {/* Назва пункту меню */}
                    <h1 className="flex-1 text-4xl uppercase tracking-wide sm:text-5xl md:text-6xl">
                      {route.label}
                    </h1>

                    {/* Стрілка з Lucide */}
                    <motion.div variants={arrowMotion}>
                      <ArrowUpRight className="h-6 w-6 text-accent-foreground" />
                    </motion.div>
                  </Link>

                  {/* Роздільник */}
                  <div
                    className={`absolute bottom-0 h-[2px] w-full origin-left ${
                      active ? "bg-red-500" : "bg-border"
                    }`}
                    // variants={dividerMotion}
                  />
                </motion.li>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// Анімації
export const easings = {
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
};

export const textRevealMotion = (delay: number) => ({
  initial: { y: 100, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      delay,
      duration: 0.8,
      ease: easings.easeOutQuart,
    },
  },
});

export const itemCoverMotion = {
  initial: { height: "100%" },
  animate: {
    height: 0,
    transition: {
      delay: 1,
      duration: 0.8,
      ease: easings.easeInOutQuint,
    },
  },
  hover: {
    height: 0, // Явно указываем, что при hover анимация должна остаться завершенной
  },
};

export const dividerMotion = {
  initial: { scaleX: 0 },
  animate: {
    scaleX: 1,
    transition: {
      delay: 1,
      duration: 0.8,
      ease: easings.easeInOutQuint,
    },
  },
  hover: {
    scaleX: 1, // Явно указываем, что при hover анимация должна остаться завершенной
  },
};

export const itemContentMotion = {
  hover: {
    width: "5ch",
    transition: {
      type: "spring",
      bounce: 0.5,
      duration: 0.5,
    },
  },
};

export const arrowMotion = {
  hover: {
    rotate: -90,
    scale: 1.1,
    transition: {
      type: "spring",
      bounce: 0.5,
      duration: 0.5,
    },
  },
};
