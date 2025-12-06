import { motion, animate, useMotionValue, useTransform } from "framer-motion";

import { useEffect } from "react";

export default function Counter({ from = 0, to = 100, duration = 3 }) {
  const count = useMotionValue(from);
  const rounded = useTransform(() => Math.round(count.get()));

  useEffect(() => {
    const controls = animate(count, to, { duration });
    return () => controls.stop();
  }, [to, duration]);

  return (
    <motion.span className="text-4xl md:text-6xl font-bold text-amber-400">
      {rounded}
    </motion.span>
  );
}
