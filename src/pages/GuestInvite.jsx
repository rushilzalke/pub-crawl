import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Y2KContainer } from '../components/Y2KContainer';
import { GlitchText } from '../components/GlitchText';
import { NeonButton } from '../components/NeonButton';

export const GuestInvite = () => {
  const { crawlId } = useParams();
  const navigate = useNavigate();
  const [crawl, setCrawl] = useState(null);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    // Load from local storage for now
    const data = localStorage.getItem(`crawl_${crawlId}`);
    if (data) {
      setCrawl(JSON.parse(data));
    }
  }, [crawlId]);

  useEffect(() => {
    if (!crawl?.date) return;
    
    const target = new Date(crawl.date).getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        setTimeLeft('HAPPENING NOW');
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}D ${hours}H ${minutes}M ${seconds}S`);
    }, 1000);

    return () => clearInterval(interval);
  }, [crawl]);

  if (!crawl) return <Y2KContainer><div className="text-white">LOADING...</div></Y2KContainer>;

  return (
    <Y2KContainer>
      <div className="flex flex-col flex-1 gap-6 pb-20">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center space-y-4 pt-10"
        >
          <div className="inline-block border-2 border-neonYellow text-neonYellow px-4 py-1 font-y2k text-xs">
            YOU'RE INVITED TO
          </div>
          <GlitchText text={crawl.name.toUpperCase()} className="text-4xl text-neonPink break-words px-2" />
          <p className="font-y2k text-neonGreen text-sm">THEME: {crawl.theme}</p>
        </motion.div>

        <div className="bg-darkBg border-2 border-neonBlue p-6 shadow-neon-blue text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-neonBlue/20 blur-xl rounded-full"></div>
          <p className="font-body text-lg italic text-white/90">"{crawl.message}"</p>
        </div>

        <div className="text-center space-y-2 my-4">
          <p className="font-y2k text-neonPink text-xs">COUNTDOWN TO CHAOS</p>
          <div className="text-3xl font-y2k text-white drop-shadow-[0_0_10px_#ffffff]">{timeLeft}</div>
        </div>

        <div className="space-y-4">
          <h3 className="font-y2k text-neonYellow text-lg border-b border-neonYellow pb-2">THE ROUTE</h3>
          <div className="flex overflow-x-auto snap-x gap-4 pb-4 w-full">
            {crawl.pubs.map((pub, idx) => (
              <div key={idx} className="min-w-[85%] sm:min-w-[300px] shrink-0 snap-center bg-black/50 border border-white/20 relative">
                <div className="absolute top-2 left-2 bg-neonPink text-darkBg font-y2k text-xs px-2 py-1 z-10">
                  STOP {idx + 1}
                </div>
                <img src={pub.photoUrl} alt={pub.name} className="w-full h-40 object-cover opacity-80 mix-blend-screen" />
                <div className="p-4 space-y-2">
                  <h4 className="font-bold text-lg text-neonBlue truncate">{pub.name}</h4>
                  <div className="flex justify-between text-xs font-mono text-white/80">
                    <span>{pub.timeSlot || 'TBD'}</span>
                    <span className="text-neonGreen">{pub.drinkPrice || '$$$'}</span>
                  </div>
                  <a href={pub.mapsUrl} target="_blank" rel="noreferrer" className="block text-center border border-white/30 py-2 mt-2 hover:bg-white hover:text-black transition-colors font-y2k text-[10px]">
                    VIEW ON MAPS
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-darkBg via-darkBg to-transparent z-50 flex justify-center">
          <NeonButton color="pink" className="w-full max-w-lg text-xl py-5" onClick={() => navigate(`/rsvp/${crawlId}`)}>
            RESPOND NOW
          </NeonButton>
        </div>
      </div>
    </Y2KContainer>
  );
};
