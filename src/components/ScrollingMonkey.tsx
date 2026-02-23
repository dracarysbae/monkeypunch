import { motion, useScroll, useTransform, useSpring } from 'motion/react';

export default function ScrollingMonkey() {
  const { scrollYProgress } = useScroll();
  
  // Smooth out the scroll for the monkey
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001
  });

  // Map scroll progress to vertical position (from top to bottom of the screen)
  const y = useTransform(smoothProgress, [0, 1], ['5vh', '85vh']);
  
  // Add a slight swinging/climbing rotation based on scroll
  const rotate = useTransform(scrollYProgress, (p) => Math.sin(p * Math.PI * 8) * 8);
  
  // Add a slight horizontal shift to simulate climbing/swinging
  const x = useTransform(scrollYProgress, (p) => Math.sin(p * Math.PI * 4) * 20);

  return (
    <div className="fixed right-4 md:right-16 top-0 bottom-0 w-32 md:w-40 pointer-events-none z-50 hidden sm:block">
      {/* The Vine/Branch - Twisted Rope Look */}
      <div className="absolute left-1/2 top-0 bottom-0 w-2 md:w-3 -translate-x-1/2 bg-[#5D4037] shadow-lg overflow-hidden">
        {/* Twisted texture using repeating gradient */}
        <div className="w-full h-full opacity-60" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, #3E2723 5px, #3E2723 10px)'
        }} />
      </div>
      
      {/* Leaves on the vine - More organic placement */}
      {[10, 25, 40, 55, 70, 85].map((top, i) => (
        <motion.div
          key={i}
          className={`absolute left-1/2 -translate-x-1/2 text-emerald-600/90 text-3xl md:text-4xl drop-shadow-md origin-center`}
          style={{ 
            top: `${top}%`,
            marginLeft: i % 2 === 0 ? '-25px' : '25px',
            rotate: i % 2 === 0 ? 45 : -45,
          }}
          animate={{ 
            rotate: i % 2 === 0 ? [45, 55, 45] : [-45, -55, -45],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🌿
        </motion.div>
      ))}
    </div>
  );
}
