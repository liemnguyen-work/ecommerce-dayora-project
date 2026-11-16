import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

export function Rise({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: reduced ? 0 : 0.4 }}
    >
      {children}
    </motion.div>
  );
}
