import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Y2KContainer } from '../components/Y2KContainer';
import { NeonButton } from '../components/NeonButton';
import { useTrollButton } from '../hooks/useTrollButton';
import { useCrawlState } from '../hooks/useCrawlState';

export const RSVP = () => {
  const { crawlId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const { position, scale, text, handleHover, strikes } = useTrollButton();
  
  const handleAccept = () => {
    if (!name.trim()) {
      alert("drop the name bestie 😭");
      return;
    }
    const rsvpsKey = `rsvps_${crawlId}`;
    const existing = JSON.parse(localStorage.getItem(rsvpsKey) || '[]');
    // generate a random emoji for the avatar
    const emojis = ['👽', '👾', '🔥', '💀', '🤡', '🤠', '😈', '🤖'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    localStorage.setItem(rsvpsKey, JSON.stringify([...existing, { name, emoji, status: 'going' }]));
    
    navigate(`/locked-in/${crawlId}`);
  };

  return (
    <Y2KContainer>
      <div className="flex flex-col items-center justify-center flex-1 h-full relative p-4">
        <motion.div 
          className="w-full max-w-sm bg-darkBg border-[3px] border-neonGreen p-8 shadow-[10px_10px_0px_#06d6a0] relative z-20"
          initial={false}
          animate={{
            x: strikes >= 3 ? (Math.random() - 0.5) * 40 : 0,
            y: strikes >= 3 ? (Math.random() - 0.5) * 40 : 0,
            rotate: strikes >= 3 ? (Math.random() - 0.5) * 5 : 0,
          }}
          style={{
            position: strikes >= 3 ? 'absolute' : 'relative',
            left: strikes >= 3 ? `${50 + (position.x / 10)}%` : 'auto',
            top: strikes >= 3 ? `${50 + (position.y / 10)}%` : 'auto',
            transform: strikes >= 3 ? 'translate(-50%, -50%)' : 'none',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
          <div className="absolute top-0 left-0 w-full bg-neonGreen text-darkBg font-y2k text-[8px] p-1 flex justify-between border-b-[3px] border-darkBg">
            <span>RSVP_FINAL.EXE</span>
            <span>[ ? ]</span>
          </div>

          <h2 className="font-y2k text-neonGreen text-lg text-center mb-10 mt-4 tracking-tighter">ARE YOU BUILT FOR THIS? 👀</h2>
          
          <div className="space-y-8">
            <div className="group">
              <label className="block text-white/60 font-y2k text-[10px] mb-3 group-focus-within:text-neonPink transition-colors">WHAT DO UR FRIENDS CALL U? 👑</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-black border-2 border-white p-4 text-white outline-none focus:border-neonPink focus:shadow-neon-pink text-center font-bold text-xl transition-all"
                placeholder="your name, your legacy 👑"
              />
            </div>

            <div className="pt-2 flex flex-col gap-6 relative min-h-[140px]">
              <NeonButton color="green" className="w-full py-5 text-2xl shadow-[6px_6px_0px_#000]" onClick={handleAccept}>
                I'M SO IN 🔥
              </NeonButton>
              
              <div 
                className="absolute w-full flex justify-center items-center pointer-events-none"
                style={{ 
                  bottom: strikes >= 3 ? 'auto' : '-40px',
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                  transition: 'transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  zIndex: 30
                }}
              >
                <button
                  onMouseEnter={handleHover}
                  onClick={(e) => {
                    e.preventDefault();
                    handleHover();
                  }}
                  className="pointer-events-auto font-y2k text-[9px] text-white/40 border-2 border-white/10 px-6 py-3 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all whitespace-nowrap bg-darkBg/80 backdrop-blur-sm shadow-xl cursor-not-allowed"
                >
                  {text}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {strikes >= 3 && (
          <div className="fixed inset-0 bg-red-500/10 pointer-events-none animate-pulse z-0"></div>
        )}
      </div>
    </Y2KContainer>
  );
};
