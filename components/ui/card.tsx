import * as React from "react";
import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        // Основные стили стекла
        "relative isolate overflow-hidden",
        "bg-gray-100/10 dark:bg-gray-900/10",
        "backdrop-blur-xl backdrop-saturate-100",
        "border border-white/5 dark:border-white/5",
        // "shadow-lg shadow-blue-500/10 dark:shadow-blue-900/20",

        // Текстура фростед-стекла (легкая матовая текстура)
        "before:content-[''] before:absolute before:inset-0 before:-z-10",
        "before:bg-[radial-gradient(at_center_center,_rgba(255,255,255,0.3)_0%,_transparent_70%)]",
        "before:opacity-20 dark:before:opacity-15",

        // Оригинальные стили
        "text-card-foreground flex flex-col gap-6 rounded-xl py-6",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        // Полупрозрачная разделительная линия
        "[.border-b]:border-white/5 dark:[.border-b]:border-white/5",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "leading-none font-semibold text-lg",
        // Яркий текст для контраста на стекле
        "text-gray-900/90 dark:text-white/90",
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "text-sm",
        // Полупрозрачный текст
        "text-gray-700/80 dark:text-gray-300/80",
        className,
      )}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center px-6 [.border-t]:pt-6",
        // Полупрозрачная разделительная линия
        "[.border-t]:border-white/30 dark:[.border-t]:border-white/15",
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
