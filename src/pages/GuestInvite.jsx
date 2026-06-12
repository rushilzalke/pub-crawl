import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Y2KContainer } from '../components/Y2KContainer';
import { GlitchText } from '../components/GlitchText';
import { NeonButton } from '../components/NeonButton';
import { RulesScreen } from '../components/RulesScreen';

export const GuestInvite = () => {
  const { crawlId } = useParams();
  const navigate = useNavigate();
  const [crawl, setCrawl] = useState(null);
  const [timeLeft, setTimeLeft] = useState('');
  const [rsvps, setRsvps] = useState([]);
  const [rulesAccepted, setRulesAccepted] = useState(false);

  useEffect(() => {
    // Load from local storage for now
    const data = localStorage.getItem(`crawl_${crawlId}`);
    if (data) {
      setCrawl(JSON.parse(data));
    }
    const rsvpData = JSON.parse(localStorage.getItem(`rsvps_${crawlId}`) || '[]');
    setRsvps(rsvpData);
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

  if (!crawl) return (
    <Y2KContainer>
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="font-y2k text-neonYellow text-xs animate-pulse">FINDING THE VIBE... 🔍</div>
      </div>
    </Y2KContainer>
  );

  return (
    <Y2KContainer>
      {crawl.showRules && !rulesAccepted && (
        <RulesScreen rules={crawl.rules} onComplete={() => setRulesAccepted(true)} />
      )}

      <div className="flex flex-col flex-1 gap-8 pb-32">
        <motion.div 
          initial={{ y: -50, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          className="text-center space-y-6 pt-10"
        >
          <div className="inline-block bg-neonYellow text-darkBg px-4 py-1 font-y2k text-[10px] -rotate-2 shadow-md">
            YOU'RE INVITED BESTIE! 🎉
          </div>
          <GlitchText text={crawl.name.toUpperCase()} className="text-4xl md:text-5xl text-white break-words px-2 drop-shadow-[0_0_15px_rgba(255,0,110,0.8)]" />
          <div className="flex justify-center gap-2">
            <span className="font-y2k text-neonGreen text-[10px] border-2 border-neonGreen px-2 py-1">THEME: {crawl.theme}</span>
          </div>
        </motion.div>

        <div className="bg-darkBg border-[3px] border-neonBlue p-8 shadow-[8px_8px_0px_#3a86ff] text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-neonBlue/10 blur-2xl rounded-full group-hover:bg-neonBlue/30 transition-all duration-1000"></div>
          <div className="absolute -top-1 -left-1 bg-neonBlue text-darkBg font-y2k text-[8px] px-2 py-0.5">MESSAGE.TXT</div>
          <p className="font-body text-xl italic text-white/95 leading-relaxed">"{crawl.message}"</p>
        </div>

        {rsvps.length > 0 && (
          <div className="space-y-4">
            <p className="font-y2k text-white text-[10px] text-center mb-4">THE SQUAD SO FAR 👀</p>
            <div className="flex flex-wrap justify-center gap-4">
              {rsvps.map((guest, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ y: -5, rotate: (Math.random() - 0.5) * 20 }}
                  className="flex flex-col items-center gap-1"
                >
                  <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-2xl bg-white/5 shadow-[4px_4px_0px_rgba(255,255,255,0.2)]">
                    {guest.emoji}
                  </div>
                  <span className="text-[8px] font-y2k text-white/60 truncate max-w-[60px]">{guest.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center space-y-3 my-4 bg-white/5 py-8 border-y-2 border-dashed border-white/10">
          <p className="font-y2k text-neonPink text-[10px] animate-pulse">COUNTDOWN TO CHAOS ⏳</p>
          <div className="text-3xl md:text-4xl font-y2k text-white drop-shadow-[0_0_15px_#ffffff] tracking-tight">{timeLeft}</div>
        </div>

        <div className="space-y-6">
          <h3 className="font-y2k text-neonYellow text-sm border-b-2 border-neonYellow pb-2 flex items-center gap-2">
            THE LINEUP 🗺️✨
          </h3>
          <div className="flex overflow-x-auto snap-x gap-6 pb-6 w-full scrollbar-hide">
            {crawl.pubs.map((pub, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="min-w-[280px] shrink-0 snap-center bg-black/40 border-[3px] border-white/10 relative group"
              >
                <div className="absolute top-2 left-2 bg-neonPink text-darkBg font-y2k text-[10px] px-2 py-1 z-10 shadow-md">
                  STOP {idx + 1}
                </div>
                <div className="relative h-44 overflow-hidden">
                  <img src={pub.photoUrl} alt={pub.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                </div>
                <div className="p-5 space-y-4">
                  <h4 className="font-bold text-lg text-neonBlue truncate drop-shadow-sm">{pub.name}</h4>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[10px] font-y2k text-white/70">
                      <span className="text-neonYellow">⏰</span> {pub.timeSlot || 'TBD'}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-y2k text-white/70">
                      <span className="text-neonGreen">💰</span> {pub.drinkPrice || '$$$'}
                    </div>
                  </div>
                  <a
                    href={pub.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-center border-2 border-white/20 py-3 mt-4 hover:border-neonBlue hover:text-neonBlue transition-all font-y2k text-[9px] active:scale-95"
                  >
                    OPEN IN MAPS 🗺️
                  </a>
                </div>
              </motion.div>
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
