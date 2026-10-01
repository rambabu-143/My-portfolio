'use client';
import { motion, useReducedMotion } from "framer-motion";

// Critically damped spring, no overshoot: the default for anything that isn't a flick.
// Reduced motion keeps the fade and drops the movement.
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", bounce: 0, duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}
