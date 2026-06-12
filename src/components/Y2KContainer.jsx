import React from 'react';
import { StarCursor } from './StarCursor';

export const Y2KContainer = ({ children, hideMarquee = false }) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-darkBg text-white">
      <div className="crt-overlay pointer-events-none z-50"></div>
      <StarCursor />
      
      {!hideMarquee && (
        <div className="w-full overflow-hidden bg-neonPink text-darkBg py-1 font-y2k text-xs border-b-2 border-neonPink shadow-neon-pink z-40 relative">
          <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] inline-block">
            🔥 WARNING: MAXIMUM HYPE DETECTED 🔥 NO FLAKING ALLOWED 🔥 DRINK RESPONSIBLY OR DON'T 🔥 
            🔥 WARNING: MAXIMUM HYPE DETECTED 🔥 NO FLAKING ALLOWED 🔥 DRINK RESPONSIBLY OR DON'T 🔥
          </div>
        </div>
      )}

      <main className="relative z-10 container mx-auto px-4 py-8 max-w-lg min-h-[calc(100vh-32px)] flex flex-col">
        {children}
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </div>
  );
};
