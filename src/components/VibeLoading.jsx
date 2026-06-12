import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  "summoning the vibes... 🔮",
  "bribing google maps rn 🗺️💸",
  "finding ur next situationship bar 😭🍹",
  "almost there ngl 👀",
  "loading pure chaos... 🌪️",
  "consulting the magic 8-ball 🎱",
  "checking the vibe levels... 📈",
];

export const VibeLoading = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="text-4xl"
      >
        🍹
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="font-y2k text-neonYellow text-[10px] md:text-xs min-h-[3em]"
        >
          {messages[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};
