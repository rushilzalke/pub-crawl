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
    }, 6000); // 3.5s after confetti starts, show Locked In screen

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
            className="flex flex-col items-center justify-center flex-1 h-screen bg-white"
          >
            {/* Flashbang effect temporarily overrides dark theme */}
            <GlitchText text="LFG!!!" className="text-8xl text-darkBg" />
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center flex-1 w-full max-w-sm mx-auto space-y-8"
          >
            <div className="border-[4px] border-neonYellow p-6 text-center w-full shadow-[0_0_30px_#ffbe0b] relative bg-darkBg">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-neonYellow text-darkBg px-4 py-1 font-y2k text-sm whitespace-nowrap">
                STATUS: LOCKED IN
              </div>
              <div className="text-[80px] my-4">🍺</div>
              <h2 className="font-bold text-2xl mb-2 text-white">NO BACKING OUT NOW</h2>
              <p className="text-white/70 text-sm italic">"Your liver will remember this."</p>
            </div>

            <div className="flex flex-col gap-4 w-full">
              <NeonButton color="pink" onClick={() => {
                const text = "I'm locked in for the crawl! 🍺🔥";
                if (navigator.share) {
                  navigator.share({ title: 'CrawlMate', text, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(text);
                  alert("Status copied to clipboard!");
                }
              }}>
                SHARE STATUS
              </NeonButton>
              <NeonButton color="blue" onClick={() => navigate(`/invite/${crawlId}`)}>
                VIEW DETAILS
              </NeonButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Y2KContainer>
  );
};
