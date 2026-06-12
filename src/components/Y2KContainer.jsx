import React from 'react';
import { StarCursor } from './StarCursor';

export const Y2KContainer = ({ children, hideMarquee = false }) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-darkBg text-white selection:bg-neonPink selection:text-white">
      <div className="crt-overlay pointer-events-none z-50"></div>
      <div className="crt-scanline pointer-events-none z-51"></div>
      <div className="crt-vignette pointer-events-none z-52"></div>
      <StarCursor />
      
      {!hideMarquee && (
        <div className="w-full overflow-hidden bg-neonPink text-darkBg py-1 font-y2k text-[10px] md:text-xs border-b-2 border-darkBg shadow-[0_4px_0_#000] z-40 relative">
          <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] inline-block">
            🔥 WARNING: MAXIMUM HYPE DETECTED 🔥 NO FLAKING ALLOWED 🔥 DRINK RESPONSIBLY OR DON'T 🔥 👁️ VIBE CHECK IN PROGRESS 👁️
            🔥 WARNING: MAXIMUM HYPE DETECTED 🔥 NO FLAKING ALLOWED 🔥 DRINK RESPONSIBLY OR DON'T 🔥 👁️ VIBE CHECK IN PROGRESS 👁️
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
