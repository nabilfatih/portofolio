"use client";

import { AnimatePresence, motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function MainTransition({ children, className }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.main
        // transition effect for page transitions
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className={className}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
