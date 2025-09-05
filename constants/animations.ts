// =====================================
// constants/animations.ts
// =====================================

// ==========================
// BASE CONSTANTS
// ==========================

// Opacity
export const OPACITY = {
  HIDDEN: 0,
  PARTIAL: 0.2,
  VISIBLE: 1,
} as const;

// Animation curves
export const EASING = {
  SMOOTH: "anticipate" as const,
  GENTLE: "easeOut" as const,
  BALANCED: "easeInOut" as const,
  CIRCULAR: "circOut" as const,
  CUSTOM_SMOOTH: [0.22, 1, 0.36, 1] as const,
} as const;

// Durations
export const DURATION = {
  INSTANT: 0.1,
  FAST: 0.3,
  NORMAL: 0.6,
  SLOW: 1.0,
  VERY_SLOW: 1.5,
} as const;

// Delays
export const DELAY = {
  NONE: 0,
  SHORT: 0.1,
  MEDIUM: 0.2,
  LONG: 0.3,
  STAGGER: DURATION.FAST / 3, // for sequential animations
} as const;

// Blur values
export const BLUR = {
  NONE: "blur(0px)",
  LIGHT: "blur(4px)",
  MEDIUM: "blur(8px)",
  HEAVY: "blur(16px)",
} as const;

// Transformations
export const TRANSFORM = {
  Y: {
    NONE: 0,
    SMALL: 10,
    MEDIUM: 20,
    LARGE: 30,
    EXTRA_LARGE: 50,
  },
  X: {
    NONE: 0,
    SMALL: 10,
    MEDIUM: 20,
    LARGE: 30,
    EXTRA_LARGE: 50,
  },
  SCALE: {
    ZERO: 0,
    SMALL: 0.95,
    MEDIUM: 0.9,
    LARGE: 0.8,
    NORMAL: 1,
    ENLARGED: 1.05,
    LARGE_ENLARGED: 1.25,
  },
} as const;

// ==========================
// GENERAL ANIMATIONS
// ==========================

// Universal fade-in animation
export const FADE_ANIMATION = {
  INITIAL: {
    OPACITY: OPACITY.HIDDEN,
    BLUR: BLUR.HEAVY,
    Y: TRANSFORM.Y.LARGE,
  },
  ANIMATE: {
    OPACITY: OPACITY.VISIBLE,
    BLUR: BLUR.NONE,
    Y: TRANSFORM.Y.NONE,
  },
  TRANSITION: {
    DURATION: DURATION.NORMAL,
    EASE: EASING.SMOOTH,
  },
} as const;

// Text animation
export const TEXT_ANIMATION = {
  INITIAL: {
    OPACITY: OPACITY.HIDDEN,
    BLUR: BLUR.MEDIUM,
    Y: TRANSFORM.Y.MEDIUM,
  },
  ANIMATE: {
    OPACITY: OPACITY.VISIBLE,
    BLUR: BLUR.NONE,
    Y: TRANSFORM.Y.NONE,
  },
  TRANSITION: {
    DURATION: DURATION.FAST,
    EASE: EASING.GENTLE,
    DELAY: DELAY.MEDIUM,
  },
} as const;

// Photo animation
export const PHOTO_ANIMATION = {
  INITIAL: {
    OPACITY: OPACITY.HIDDEN,
    BLUR: BLUR.MEDIUM,
    Y: TRANSFORM.Y.SMALL,
  },
  ANIMATE: {
    OPACITY: OPACITY.VISIBLE,
    BLUR: BLUR.NONE,
    Y: TRANSFORM.Y.NONE,
  },
  TRANSITION: {
    DURATION: DURATION.NORMAL,
    EASE: EASING.GENTLE,
  },
  VIEWPORT: {
    ONCE: true,
    AMOUNT: 0.3,
  },
} as const;

// Viewport appearance animation
export const VIEWPORT_ANIMATION = {
  INITIAL: {
    OPACITY: OPACITY.PARTIAL,
    Y: TRANSFORM.Y.SMALL,
  },
  ANIMATE: {
    OPACITY: OPACITY.VISIBLE,
    Y: TRANSFORM.Y.NONE,
  },
  TRANSITION: {
    DURATION: DURATION.SLOW,
    EASE: EASING.GENTLE,
  },
  VIEWPORT: {
    ONCE: false,
    AMOUNT: 0.2,
  },
} as const;

// ==========================
// SPECIALIZED ANIMATIONS
// ==========================

// Page transition
export const PAGE_TRANSITION = {
  INITIAL: {
    OPACITY: OPACITY.HIDDEN,
    BLUR: BLUR.HEAVY,
    Y: TRANSFORM.Y.LARGE,
  },
  ANIMATE: {
    OPACITY: OPACITY.VISIBLE,
    BLUR: BLUR.NONE,
    Y: TRANSFORM.Y.NONE,
  },
  TRANSITION: {
    DURATION: DURATION.VERY_SLOW,
    EASE: EASING.SMOOTH,
  },
} as const;

// Scroll ranges
export const SCROLL_RANGES = {
  HERO_FADE: {
    INPUT: [0, 150],
    OUTPUT_FADE: [OPACITY.VISIBLE, OPACITY.HIDDEN],
    OUTPUT_REVEAL: [OPACITY.HIDDEN, OPACITY.VISIBLE],
  },
  DEFAULT: {
    INPUT: [0, 1],
    OUTPUT_FADE: [OPACITY.VISIBLE, OPACITY.HIDDEN],
    OUTPUT_REVEAL: [OPACITY.HIDDEN, OPACITY.VISIBLE],
  },
};

// Parallax gallery
export const PARALLAX_GALLERY = {
  SCROLL_RANGE: [0, 1] as const,
  SCALE: {
    HERO: [1, 7] as const,
    SMALL: [1, 5] as const,
    MEDIUM: [1, 6] as const,
    LARGE: [1, 8] as const,
    EXTRA_LARGE: [1, 9] as const,
    MAX: [1, 12] as const,
  },
  TEXT_OPACITY: {
    RANGE: [0.9, 1],
    VALUES: [OPACITY.HIDDEN, OPACITY.VISIBLE],
  },
};

// Photo scaling on scroll
export const PHOTO_SCALE_ANIMATION = {
  SCROLL_OFFSET: ["start end", "end start"] as const,
  SCALE_RANGE: {
    INPUT: [0, 1] as const,
    OUTPUT: [TRANSFORM.SCALE.NORMAL, TRANSFORM.SCALE.LARGE_ENLARGED] as const,
  },
} as const;
