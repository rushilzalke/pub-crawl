import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Y2KContainer } from '../components/Y2KContainer';
import { GlitchText } from '../components/GlitchText';
import { triggerBassDropConfetti } from '../utils/confetti';
import { NeonButton } from '../components/NeonButton';

export const PostAccept = () => {
  const { crawlId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Sequence timing
    const timer1 = setTimeout(() => {
      setStep(2);
      triggerBassDropConfetti();
    }, 2500); // Wait 2.5s on reaction screen

    const timer2 = setTimeout(() => {
      setStep(3);
    }, 5500); // 3s after confetti starts, show Locked In screen

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <Y2KContainer hideMarquee>
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center flex-1 h-screen"
          >
            <h1 className="font-y2k text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-neonYellow via-neonPink to-neonBlue fire-text text-center">
              YOU'RE IN
            </h1>
            <div className="mt-8 text-[100px] animate-bounce">🔥</div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center flex-1 h-screen bg-white relative overflow-hidden"
          >
            {/* Flashbang effect temporarily overrides dark theme */}
            <GlitchText text="LFG!!!" className="text-8xl text-darkBg z-10" />

            {/* Emoji rain */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: -100, x: Math.random() * window.innerWidth }}
                  animate={{ y: window.innerHeight + 100 }}
                  transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
                  className="absolute text-4xl"
                >
                  {['🍺', '🎉', '🔥', '💀', '✨'][Math.floor(Math.random() * 5)]}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center flex-1 w-full max-w-sm mx-auto space-y-8"
          >
            <div id="status-badge" className="border-[4px] border-neonYellow p-8 text-center w-full shadow-[0_0_30px_rgba(255,190,11,0.5)] relative bg-darkBg overflow-hidden">
              <div className="absolute top-0 left-0 w-full bg-neonYellow text-darkBg font-y2k text-[10px] p-1 flex justify-between border-b-[3px] border-darkBg">
                <span>STATUS_LOCKED.JPG</span>
                <span>X</span>
              </div>
              <div className="text-[80px] my-8 animate-bounce-slow">🍺</div>
              <h2 className="font-y2k text-white text-xl mb-4 tracking-tighter">NO BACKING OUT NOW 😈</h2>
              <p className="text-white/70 text-xs italic font-body">"ur friends already said yes btw 👀"</p>

              <div className="mt-8 border-t-2 border-dashed border-white/20 pt-4">
                <div className="text-[10px] font-y2k text-neonGreen">LOCKED IN FR FR 🔒🔥</div>
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full">
              <NeonButton color="pink" className="py-4" onClick={() => {
                const text = `I'M LOCKED IN FOR THE CRAWL! 🍺🔥 No take-backs bestie 😈 #CrawlMate`;
                if (navigator.share) {
                  navigator.share({ title: 'CrawlMate', text, url: `${window.location.origin}/invite/${crawlId}` });
                } else {
                  navigator.clipboard.writeText(text);
                  alert("locked in fr fr 🔒🔥 (copied to clipboard)");
                }
              }}>
                SHARE STATUS 🗣️
              </NeonButton>
              <NeonButton color="blue" className="py-4" onClick={() => navigate(`/invite/${crawlId}`)}>
                VIEW DETAILS 🗺️
              </NeonButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Y2KContainer>
  );
};
