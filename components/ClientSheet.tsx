"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function ClientSheet({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="flex md:hidden">
          {"{ "} open {"} "}
        </Button>
      </SheetTrigger>
      <SheetContent className="translate-custom-translate-rotate transform text-foreground transition duration-custom-long ease-custom-cubic">
        {children}
      </SheetContent>
    </Sheet>
  );
}
