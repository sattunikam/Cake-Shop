import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  wrap,
} from "framer-motion";
// ParallaxText Component
function ParallaxText({ children, baseVelocity = 50 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="relative overflow-hidden whitespace-nowrap w-full py-6">
      <motion.div className="inline-flex gap-8" style={{ x }}>
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-wide
              bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-rose-400 to-amber-200
              drop-shadow-lg"
          >
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// Professional ParallaxBanner Component
import { GiCakeSlice } from "react-icons/gi";
import { BsStars } from "react-icons/bs";

// ParallaxBanner Component
export default function ParallaxBanner() {
  return (
    <section className="relative py-16 overflow-hidden">

      {/* Parallax Text */}
      <ParallaxText baseVelocity={-3}>
        Freshly Baked Everyday <GiCakeSlice 
 className="inline text-amber-400" />
      </ParallaxText>
      <ParallaxText baseVelocity={3}>
        Delicious • Custom • Handmade • Cakes <BsStars className="inline text-amber-400"/>
      </ParallaxText>
    </section>
  );
}

