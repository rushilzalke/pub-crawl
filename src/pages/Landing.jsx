import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Y2KContainer } from '../components/Y2KContainer';
import { GlitchText } from '../components/GlitchText';
import { NeonButton } from '../components/NeonButton';

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <Y2KContainer>
      <div className="flex flex-col items-center justify-center flex-1 text-center mt-10">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="mb-12"
        >
          <GlitchText text="CRAWLMATE" className="text-5xl md:text-7xl mb-4 text-white drop-shadow-[0_0_15px_rgba(255,0,110,0.8)]" />
          <p className="text-neonYellow font-y2k text-[10px] md:text-xs animate-pulse">
            V 1.0 // NO FLAKES ALLOWED 🚫🚫🚫
          </p>
        </motion.div>

        <div className="w-full max-w-sm space-y-6 bg-darkBg border-[3px] border-neonPink p-8 shadow-[10px_10px_0px_#ff006e] relative">
          {/* Windows 95 style title bar */}
          <div className="absolute top-0 left-0 w-full bg-neonPink text-darkBg font-y2k text-[10px] p-1 flex justify-between border-b-[3px] border-darkBg">
            <span>WELCOME_BESTIE.EXE</span>
            <span className="flex gap-2">
              <span>_</span>
              <span>[ ]</span>
              <span>X</span>
            </span>
          </div>

          <div className="pt-4 flex flex-col space-y-6">
            <NeonButton color="pink" onClick={() => navigate('/host')} className="w-full py-4 text-lg">
              HOST A CRAWL 🎉
            </NeonButton>

            <NeonButton color="blue" onClick={() => navigate('/join')} className="w-full py-4 text-lg">
              JOIN THE CHAOS 🍻
            </NeonButton>
          </div>

          <div className="text-[10px] font-y2k text-white/50 mt-4 leading-relaxed">
            * BY CLICKING, YOU AGREE TO NEVER BE THE "I'M TIRED" PERSON.
          </div>
        </div>
      </div>
    </Y2KContainer>
  );
};
