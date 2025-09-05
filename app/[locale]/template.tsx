"use client";
import { motion } from "framer-motion";
import { PAGE_TRANSITION } from "@/constants/animations";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{
        opacity: PAGE_TRANSITION.INITIAL.OPACITY,
        filter: PAGE_TRANSITION.INITIAL.BLUR,
        y: PAGE_TRANSITION.INITIAL.Y,
      }}
      animate={{
        opacity: PAGE_TRANSITION.ANIMATE.OPACITY,
        filter: PAGE_TRANSITION.ANIMATE.BLUR,
        y: PAGE_TRANSITION.ANIMATE.Y,
      }}
      transition={{
        duration: PAGE_TRANSITION.TRANSITION.DURATION,
        ease: PAGE_TRANSITION.TRANSITION.EASE,
      }}
    >
      {children}
    </motion.div>
  );
}
