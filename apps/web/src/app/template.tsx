'use client';

import { motion, cubicBezier } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  const ease = cubicBezier(0.22, 1, 0.36, 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease }}
      className="min-h-full"
    >
      {children}
    </motion.div>
  );
}