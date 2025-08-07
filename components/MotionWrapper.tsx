"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

// Настройки анимации
const ANIMATION_CONFIG = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
};

type MotionWrapperProps = {
  children: ReactNode;
  className?: string;
  index?: number;
};

export default function MotionWrapper({
  children,
  className,
  index,
}: MotionWrapperProps) {
  return (
    <motion.div
      className={className}
      initial={ANIMATION_CONFIG.initial}
      whileInView={ANIMATION_CONFIG.whileInView}
      transition={{
        ...ANIMATION_CONFIG.transition,
        delay: (index || 0) * 0.1,
      }}
      viewport={ANIMATION_CONFIG.viewport}
    >
      {children}
    </motion.div>
  );
}
