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
  
  // Actually we need global RSVPs, but for this demo local storage is fine.
  // In a real app, this would post to a backend.
  const handleAccept = () => {
    if (!name.trim()) {
      alert("ENTER YOUR NAME COWARD");
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
      <div className="flex flex-col items-center justify-center flex-1 h-full relative">
        <motion.div 
          className="w-full max-w-sm bg-darkBg border-[3px] border-neonGreen p-8 shadow-[10px_10px_0px_#06d6a0] relative z-10"
          initial={false}
          animate={{
            x: strikes >= 2 ? (Math.random() - 0.5) * 50 : 0,
            y: strikes >= 2 ? (Math.random() - 0.5) * 50 : 0,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 10 }}
        >
          <h2 className="font-y2k text-neonGreen text-xl text-center mb-6">RSVP STATUS</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-white font-y2k text-xs mb-2">YOUR NAME</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-transparent border-2 border-white p-3 text-white outline-none focus:border-neonPink focus:shadow-neon-pink text-center font-bold text-lg"
                placeholder="WHO DIS?"
              />
            </div>

            <div className="pt-4 flex flex-col gap-4 relative h-32">
              <NeonButton color="green" className="w-full py-4 text-xl" onClick={handleAccept}>
                I'M IN 🔥
              </NeonButton>
              
              <div 
                className="absolute w-full bottom-0 flex justify-center items-center"
                style={{ 
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                  transition: 'transform 0.2s ease-out'
                }}
              >
                <button
                  onMouseEnter={handleHover}
                  onClick={handleHover} // For mobile taps
                  className="font-y2k text-[10px] text-white/50 border border-white/20 px-4 py-2 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors whitespace-nowrap"
                >
                  {text}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Y2KContainer>
  );
};
