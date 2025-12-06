import Counter from "./Counter";
import { motion } from "framer-motion";

export default function StatsSection() {
  return (
    <div className="w-full py-16 sm:py-20 px-6 sm:px-10 md:px-20">

      <div className="
        max-w-6xl mx-auto
        grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4
        gap-10 sm:gap-12
        text-center
      ">

        {/* 1 - Cakes Baked */}
        <motion.div  className="flex flex-col items-center">
          <div className="flex items-center gap-1">
            <Counter to={400} duration={3} />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-2xl sm:text-4xl md:text-5xl font-bold text-amber-400"
            >
              +
            </motion.span>
          </div>
          <p className="text-sm sm:text-base md:text-lg mt-2">Cakes Baked</p>
        </motion.div>

        {/* 2 - Happy Customers */}
        <motion.div  className="flex flex-col items-center">
          <div className="flex items-center gap-1">
            <Counter to={392} duration={3} />
            <motion.span
              className="text-2xl sm:text-4xl md:text-5xl font-bold text-amber-400"
            >
              +
            </motion.span>
          </div>
          <p className="text-sm sm:text-base md:text-lg mt-2">Happy Customers</p>
        </motion.div>

        {/* 3 - Daily Orders */}
        <motion.div  className="flex flex-col items-center">
          <div className="flex items-center gap-1">
            <Counter to={10} duration={3} />
            <motion.span
              className="text-2xl sm:text-4xl md:text-5xl font-bold text-amber-400"
            >
              +
            </motion.span>
          </div>
          <p className="text-sm sm:text-base md:text-lg mt-2">Daily Orders</p>
        </motion.div>

        {/* 4 - Custom Designs */}
        <motion.div  className="flex flex-col items-center">
          <div className="flex items-center gap-1">
            <Counter to={50} duration={3} />
            <motion.span
              className="text-2xl sm:text-4xl md:text-5xl font-bold text-amber-400"
            >
              +
            </motion.span>
          </div>
          <p className="text-sm sm:text-base md:text-lg mt-2">Custom Designs</p>
        </motion.div>

      </div>
    </div>
  );
}
