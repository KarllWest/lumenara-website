import { motion, useScroll, useSpring } from 'framer-motion';

// Тонка смужка прогресу читання вгорі. Анімуємо тільки scaleX (GPU),
// тому на скролі не навантажує рендер.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-0.5 bg-white origin-left z-[70]"
      aria-hidden="true"
    />
  );
}
