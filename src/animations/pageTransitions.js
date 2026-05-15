export const pageVariants = {
  initial: { opacity: 0, y: 28, filter: 'blur(10px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -18, filter: 'blur(8px)' },
}

export const pageTransition = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1],
}

export const listVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.05,
    },
  },
}

export const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
}
