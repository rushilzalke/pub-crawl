import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Y2KContainer } from '../components/Y2KContainer';
import { GlitchText } from '../components/GlitchText';
import { NeonButton } from '../components/NeonButton';
import { Users, Clock, Edit2, Share2 } from 'lucide-react';

export const Dashboard = () => {
  const { crawlId } = useParams();
  const navigate = useNavigate();
  const [crawl, setCrawl] = useState(null);
  const [rsvps, setRsvps] = useState([]);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const data = localStorage.getItem(`crawl_${crawlId}`);
    if (data) {
      setCrawl(JSON.parse(data));
    }
    const rsvpData = JSON.parse(localStorage.getItem(`rsvps_${crawlId}`) || '[]');
    setRsvps(rsvpData);

    // Sync RSVPs every 5 seconds (simulated)
    const interval = setInterval(() => {
      const updatedRsvps = JSON.parse(localStorage.getItem(`rsvps_${crawlId}`) || '[]');
      setRsvps(updatedRsvps);
    }, 5000);

    return () => clearInterval(interval);
  }, [crawlId]);

  useEffect(() => {
    if (!crawl?.date) return;
    const target = new Date(crawl.date).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;
      if (distance < 0) {
        setTimeLeft('HAPPENING NOW 🍺');
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

  if (!crawl) return <Y2KContainer><div className="font-y2k text-neonYellow text-xs">summoning ur data... 🔮</div></Y2KContainer>;

  return (
    <Y2KContainer hideMarquee>
      <div className="w-full bg-neonBlue text-darkBg py-1 font-y2k text-[10px] border-b-2 border-darkBg overflow-hidden relative z-40">
        <div className="whitespace-nowrap animate-[marquee_15s_linear_infinite] inline-block">
          🚀 HOST DASHBOARD // {crawl.name.toUpperCase()} // {rsvps.length} LEGENDS JOINED // NO FLAKING ALLOWED // 🚀 HOST DASHBOARD // {crawl.name.toUpperCase()} // {rsvps.length} LEGENDS JOINED // NO FLAKING ALLOWED //
        </div>
      </div>

      <div className="flex flex-col flex-1 gap-6 p-4 pt-8 pb-20">
        <header className="flex justify-between items-start">
          <div className="space-y-1">
            <h1 className="font-y2k text-white text-xl tracking-tighter">CONTROL CENTER 🕹️</h1>
            <p className="text-neonBlue font-y2k text-[10px]">CRAWL_ID: {crawlId}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/host')}
              className="p-2 bg-white/10 border border-white/20 hover:border-neonYellow transition-colors"
            >
              <Edit2 size={18} className="text-neonYellow" />
            </button>
          </div>
        </header>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-darkBg border-2 border-neonPink p-4 shadow-[4px_4px_0px_#ff006e] flex flex-col gap-2">
            <div className="flex items-center gap-2 text-neonPink">
              <Users size={16} />
              <span className="font-y2k text-[10px]">SQUAD</span>
            </div>
            <div className="text-2xl font-y2k">{rsvps.length}</div>
          </div>
          <div className="bg-darkBg border-2 border-neonGreen p-4 shadow-[4px_4px_0px_#06d6a0] flex flex-col gap-2">
            <div className="flex items-center gap-2 text-neonGreen">
              <Clock size={16} />
              <span className="font-y2k text-[10px]">STARTS IN</span>
            </div>
            <div className="text-[10px] font-y2k truncate">{timeLeft}</div>
          </div>
        </div>

        <div className="bg-darkBg border-2 border-white p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rotate-45 translate-x-16 -translate-y-16"></div>
          <h3 className="font-y2k text-xs mb-6 flex items-center gap-2">
            LIVE RSVP TRACKER 📡
          </h3>
          
          {rsvps.length === 0 ? (
            <div className="text-center py-10 space-y-4">
              <div className="text-4xl animate-bounce">🦗</div>
              <p className="font-y2k text-[10px] text-white/40">it's quiet... too quiet... 💀</p>
              <NeonButton color="blue" className="text-[10px] py-2" onClick={() => navigate(`/host`)}>
                SHARE LINK AGAIN
              </NeonButton>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {rsvps.map((rsvp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-14 h-14 rounded-full border-2 border-neonBlue bg-neonBlue/10 flex items-center justify-center text-3xl animate-pulse-glow" style={{ color: '#3a86ff' }}>
                    {rsvp.emoji}
                  </div>
                  <span className="text-[8px] font-y2k text-white text-center truncate w-full">{rsvp.name}</span>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="font-y2k text-xs text-neonYellow">QUICK ACTIONS ⚡</h3>
          <div className="grid grid-cols-1 gap-3">
            <NeonButton color="pink" className="w-full py-4 text-[10px]" onClick={() => {
              navigator.clipboard.writeText(`${window.location.origin}/invite/${crawlId}`);
              alert("invite link copied bestie 🔗✨");
            }}>
              COPY INVITE LINK 🔗
            </NeonButton>
            <NeonButton color="blue" className="w-full py-4 text-[10px]" onClick={() => navigate(`/invite/${crawlId}`)}>
              PREVIEW AS GUEST 👀
            </NeonButton>
          </div>
        </div>
      </div>
    </Y2KContainer>
  );
};
