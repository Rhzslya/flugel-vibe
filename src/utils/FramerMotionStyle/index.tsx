export const slideInFromLeft = (delay: number) => ({
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      delay,
      duration: 0.8,
      ease: "easeInOut",
    },
  },
});

export const slideInFromRight = (delay: number) => ({
  hidden: {
    x: 100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      delay,
      duration: 0.8,
      ease: "easeInOut",
    },
  },
});

export const fadeIn = (delay: number) => ({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay,
      duration: 1,
      ease: "easeInOut",
    },
  },
});

export const popIn = (delay: number) => ({
  hidden: {
    scale: 0.8,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay,
      duration: 0.6,
      ease: "easeOut",
    },
  },
});

export const backgroundVariants = {
  hidden: { opacity: 0, scale: 1.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 2, ease: "easeOut" },
  },
};

export const textSwitcherVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export const imageStackAnimate = (
  initialX = 100,
  initialY = 100,
  duration = 1
) => ({
  hidden: { opacity: 0, x: initialX, y: initialY },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: duration, ease: "easeOut" },
  },
});

export const buttonVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // ⏳ Delay tiap child muncul
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6 } },
};

export const shellVariants = {
  hidden: { opacity: 0, y: -20 }, // Awal: tidak terlihat dan sedikit ke atas
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }, // Muncul dengan smooth transition
};

export const scrollVariants = {
  animate: {
    y: [0, 10, 0], // Bergerak dari 0px ke 10px lalu kembali ke 0px
    transition: {
      duration: 1.5, // Durasi animasi
      repeat: Infinity, // Looping terus menerus
      ease: "easeInOut", // Efek animasi smooth
    },
  },
};

// utils/FramerMotionStyle.ts
export const scrollVariantsBox = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

export const slideUpFade = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const zoomIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const rotatePop = {
  hidden: { opacity: 0, scale: 0.9, rotate: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const zoomInUp = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export const slideInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};
