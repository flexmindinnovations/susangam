export const animations = {
  defaultBackground: {
    initial: { opacity: 0, scale: 0.8, x: 100 },
    animate: { opacity: 1, scale: 1, x: 0 },
    transition: { duration: 0.3, type: "tween" }
  },
  defaultCard: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.6, ease: "easeOut" }
  },
  specialBackground: {
    initial: { opacity: 0, x: -200 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: "easeInOut" }
  },
  specialCard: {
    initial: { x: -200, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.8, ease: "easeIn" }
  }
};

export const getAnimationConfig = (pathName: string) => {
  if (pathName === "/login") {
    return {
      background: animations.specialBackground,
      card: animations.specialCard
    };
  }
  return {
    background: animations.defaultBackground,
    card: animations.defaultCard
  };
};
