"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { VIEWPORT_ANIMATION } from "@/constants/animations";

type ViewportWrapperProps = {
  children: ReactNode;
  once?: boolean;
  className?: string;
};

export function ViewportWrapper({
  children,
  once = false,
  className,
}: ViewportWrapperProps) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: VIEWPORT_ANIMATION.INITIAL.OPACITY,
        y: VIEWPORT_ANIMATION.INITIAL.Y,
      }}
      whileInView={{
        opacity: VIEWPORT_ANIMATION.ANIMATE.OPACITY,
        y: VIEWPORT_ANIMATION.ANIMATE.Y,
      }}
      transition={{
        duration: VIEWPORT_ANIMATION.TRANSITION.DURATION,
        ease: VIEWPORT_ANIMATION.TRANSITION.EASE,
      }}
      viewport={{
        once,
        amount: VIEWPORT_ANIMATION.VIEWPORT.AMOUNT,
      }}
    >
      {children}
    </motion.div>
  );
}
