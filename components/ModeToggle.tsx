"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ModeToggleProps = {
  variant: "dropdown" | "accordion";
  lightLabel: string;
  darkLabel: string;
  systemLabel: string;
  toggleTheme: string;
};

export default function ModeToggle({
  variant,
  lightLabel,
  darkLabel,
  systemLabel,
  toggleTheme,
}: ModeToggleProps) {
  const { setTheme } = useTheme();

  if (variant === "dropdown") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="text-stone-50">
            <Sun className="dark:-rotate-90 h-4 w-4 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">{toggleTheme}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <Sun className="h-4 w-4" />
            {lightLabel}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <Moon className="h-4 w-4" />
            {darkLabel}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <Monitor className="h-4 w-4" />
            {systemLabel}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (variant === "accordion") {
    return (
      <Accordion type="single" collapsible className="mb-10 w-full">
        <AccordionItem value="theme">
          <AccordionTrigger>{toggleTheme}</AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col items-start space-y-2">
              <Button variant="link">
                <li
                  onClick={() => setTheme("light")}
                  onKeyDown={() => setTheme("light")}
                  className="flex items-center gap-3"
                >
                  <Sun className="h-4 w-4" />
                  {lightLabel}
                </li>
              </Button>
              <Button variant="link">
                <li
                  onClick={() => setTheme("dark")}
                  onKeyDown={() => setTheme("dark")}
                  className="flex items-center gap-3"
                >
                  <Moon className="h-4 w-4" />
                  {darkLabel}
                </li>
              </Button>
              <Button variant="link">
                <li
                  onClick={() => setTheme("system")}
                  onKeyDown={() => setTheme("system")}
                  className="flex items-center gap-3"
                >
                  <Monitor className="h-4 w-4" />
                  {systemLabel}
                </li>
              </Button>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }
}
