export const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
    opacity: 1,
    transition: { 
        staggerChildren: 0.1
    }
    }
};

export const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
    }
};

export const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };
  
export const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.2 }
  })
};

export const linkVariants = {
  initial: { y: 0 },
  hover: { y: -2 },
};

export const spanVariants = {
  initial: { scaleX: 0 },
  hover: { scaleX: 1 },
};