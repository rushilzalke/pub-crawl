import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NeonButton } from './NeonButton';

export const RulesScreen = ({ rules = [], onComplete }) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (visibleCount < rules.length) {
      const timer = setTimeout(() => {
        setVisibleCount(prev => prev + 1);
        // Play subtle bass hit sound
        try {
          const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          const oscillator = audioCtx.createOscillator();
          const gainNode = audioCtx.createGain();
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(60, audioCtx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(20, audioCtx.currentTime + 0.3);
          gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
          oscillator.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          oscillator.start();
          oscillator.stop(audioCtx.currentTime + 0.3);
        } catch(e) {}
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [visibleCount, rules.length]);

  const allRulesShown = visibleCount === rules.length;

  const handleComplete = () => {
    if (!allRulesShown) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
      return;
    }
    onComplete();
  };

  const getEntranceAnimation = (index) => {
    const types = [
      { initial: { x: -100, opacity: 0 }, animate: { x: 0, opacity: 1 } }, // Slide
      { initial: { scale: 0, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { type: 'spring', stiffness: 260, damping: 20 } }, // Bounce
      { initial: { opacity: 0, filter: 'blur(10px)' }, animate: { opacity: 1, filter: 'blur(0px)' } }, // Glitch-like blur
    ];
    return types[index % types.length];
  };

  const colors = ['#ff006e', '#3a86ff', '#06d6a0', '#ffbe0b'];

  return (
    <div className="fixed inset-0 z-[100] bg-darkBg flex flex-col p-6 overflow-y-auto scrollbar-hide">
      <div className="absolute inset-4 border-[2px] border-white/10 pointer-events-none"></div>

      <div className="relative z-10 max-w-lg mx-auto w-full pt-10 pb-20">
        <div className="text-center mb-10 space-y-2">
          <h1 className="font-y2k text-neonYellow text-xl md:text-2xl leading-tight">
            THE RULES OF ENGAGEMENT ⚔️🍺
          </h1>
          <p className="font-body text-[10px] text-white/50 italic">
            read these or face consequences bestie 😈
          </p>
        </div>

        <div className="space-y-6">
          {rules.slice(0, visibleCount).map((rule, idx) => (
            <motion.div
              key={rule.id}
              {...getEntranceAnimation(idx)}
              className="bg-black/40 border-l-[4px] p-4 shadow-xl"
              style={{ borderLeftColor: colors[idx % colors.length] }}
            >
              <div className="flex items-start gap-4">
                <span className="font-y2k text-white/30 text-lg">{idx + 1}</span>
                <div className="space-y-1">
                  <div className="text-2xl">{rule.emoji}</div>
                  <p className="font-body text-sm text-white/90 leading-snug">{rule.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 relative flex justify-center">
          <AnimatePresence>
            {allRulesShown ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full"
              >
                <NeonButton
                  color="pink"
                  className="w-full py-5 text-sm animate-pulse-glow"
                  onClick={handleComplete}
                >
                  I UNDERSTOOD THE ASSIGNMENT ✅
                </NeonButton>
              </motion.div>
            ) : (
              <div className="w-full">
                <button
                  onClick={handleComplete}
                  className="w-full py-5 text-sm font-y2k text-white/20 border-2 border-white/5 cursor-not-allowed"
                >
                  LOCKING IN... ⏳
                </button>
              </div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute -top-10 bg-neonPink text-darkBg px-3 py-1 font-y2k text-[8px] whitespace-nowrap"
              >
                no skipping bestie 😈
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
