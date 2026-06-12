/** Motion presets for marketing pages - matches dashboard section animations. */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_IN = [0.4, 0, 1, 1] as const;

export const SPRING_SNAPPY = {
  type: 'spring' as const,
  stiffness: 460,
  damping: 38,
  mass: 0.72,
};

export const SPRING_ENTRANCE = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 36,
  mass: 0.78,
};

const STAGGER_STEP = 0.028;

export function staggerDelay(index: number): number {
  return Math.max(0, index) * STAGGER_STEP;
}

export const sectionCardEntranceInitial = {
  opacity: 0,
  y: 6,
};

export function sectionEntranceAnimate(index = 0) {
  const delay = staggerDelay(index);

  return {
    opacity: 1,
    y: 0,
    transition: {
      y: {
        ...SPRING_ENTRANCE,
        delay,
      },
      opacity: {
        duration: 0.2,
        delay,
        ease: EASE_OUT,
      },
    },
  };
}

export function cardEntranceAnimate(index = 0) {
  const delay = staggerDelay(index) + 0.04;

  return {
    opacity: 1,
    y: 0,
    transition: {
      y: {
        ...SPRING_ENTRANCE,
        delay,
      },
      opacity: {
        duration: 0.2,
        delay,
        ease: EASE_OUT,
      },
    },
  };
}

export const pageEnterInitial = {
  opacity: 0,
  y: 8,
};

export const pageEnterAnimate = {
  opacity: 1,
  y: 0,
  transition: {
    y: SPRING_ENTRANCE,
    opacity: { duration: 0.2, ease: EASE_OUT },
  },
};

export const pageExitAnimate = {
  opacity: 0,
  y: 4,
  transition: {
    y: SPRING_SNAPPY,
    opacity: { duration: 0.12, ease: EASE_IN },
  },
};
