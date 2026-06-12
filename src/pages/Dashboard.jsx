import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Y2KContainer } from '../components/Y2KContainer';
import { GlitchText } from '../components/GlitchText';
import { NeonButton } from '../components/NeonButton';

export const Dashboard = () => {
  const { crawlId } = useParams();
  const navigate = useNavigate();
  const [crawl, setCrawl] = useState(null);
  const [rsvps, setRsvps] = useState([]);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const data = localStorage.getItem(`crawl_${crawlId}`);
    if (data) setCrawl(JSON.parse(data));

    // Poll for RSVPs since we use local storage and no websockets
    const fetchRsvps = () => {
      const rsvpData = localStorage.getItem(`rsvps_${crawlId}`);
      if (rsvpData) setRsvps(JSON.parse(rsvpData));
    };
    
    fetchRsvps();
    const pollInterval = setInterval(fetchRsvps, 2000);
    return () => clearInterval(pollInterval);
  }, [crawlId]);

  useEffect(() => {
    if (!crawl?.date) return;
    const interval = setInterval(() => {
      const target = new Date(crawl.date).getTime();
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        setTimeLeft('ACTIVE');
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${hours}H ${minutes}M`);
    }, 1000);

    return () => clearInterval(interval);
  }, [crawl]);

  if (!crawl) return <Y2KContainer><div className="text-white">LOADING...</div></Y2KContainer>;

  return (
    <Y2KContainer>
      <div className="flex justify-between items-center mb-8 border-b-2 border-white/20 pb-4">
        <GlitchText text="DASHBOARD" className="text-2xl text-neonBlue" as="h1" />
        <div className="text-right">
          <div className="font-y2k text-[10px] text-neonYellow">T-MINUS</div>
          <div className="font-y2k text-xl text-white">{timeLeft || '...'}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        <div className="border-[3px] border-neonPink p-4 shadow-[5px_5px_0px_#ff006e] bg-darkBg h-[400px] flex flex-col">
          <h2 className="font-y2k text-neonPink text-sm mb-4 border-b border-neonPink pb-2">LIVE RSVPS ({rsvps.length})</h2>
          
          <div className="flex-1 overflow-y-auto space-y-3 relative">
            <AnimatePresence>
              {rsvps.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-white/30 font-y2k text-xs">
                  WAITING FOR VICTIMS...
                </div>
              )}
              {rsvps.map((rsvp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="flex items-center gap-4 bg-white/5 p-3 border border-white/10"
                >
                  <div className="text-3xl animate-[bounce_2s_infinite]">{rsvp.emoji}</div>
                  <div>
                    <div className="font-bold text-white uppercase">{rsvp.name}</div>
                    <div className="text-neonGreen text-xs font-y2k">LOCKED IN</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border-[3px] border-neonGreen p-4 bg-darkBg">
            <h2 className="font-y2k text-neonGreen text-sm mb-2">QUICK ACTIONS</h2>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => navigate(`/invite/${crawlId}`)}
                className="bg-white/10 p-3 text-xs font-y2k hover:bg-neonGreen hover:text-darkBg transition-colors"
              >
                VIEW INVITE
              </button>
              <button 
                onClick={() => {
                  const url = `${window.location.origin}/invite/${crawlId}`;
                  navigator.clipboard.writeText(url);
                  alert("Link copied!");
                }}
                className="bg-white/10 p-3 text-xs font-y2k hover:bg-neonBlue hover:text-darkBg transition-colors"
              >
                COPY LINK
              </button>
            </div>
          </div>

          <div className="border-[3px] border-neonYellow p-4 bg-darkBg flex-1">
            <h2 className="font-y2k text-neonYellow text-sm mb-4">THE ROUTE</h2>
            <div className="space-y-2">
              {crawl.pubs.map((pub, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs border-b border-white/10 pb-2">
                  <span className="font-bold truncate max-w-[150px]">{idx + 1}. {pub.name}</span>
                  <span className="text-neonYellow font-mono">{pub.timeSlot || 'TBD'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Y2KContainer>
  );
};
