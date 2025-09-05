"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { PHOTO_ANIMATION } from "@/constants/animations";

type PhotoWrapperProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function PhotoWrapper({
  children,
  delay = 0,
  className,
}: PhotoWrapperProps) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: PHOTO_ANIMATION.INITIAL.OPACITY,
        filter: PHOTO_ANIMATION.INITIAL.BLUR,
        y: PHOTO_ANIMATION.INITIAL.Y,
      }}
      animate={{
        opacity: PHOTO_ANIMATION.ANIMATE.OPACITY,
        filter: PHOTO_ANIMATION.ANIMATE.BLUR,
        y: PHOTO_ANIMATION.ANIMATE.Y,
      }}
      transition={{
        duration: PHOTO_ANIMATION.TRANSITION.DURATION,
        ease: PHOTO_ANIMATION.TRANSITION.EASE,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
