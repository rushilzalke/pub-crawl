import React, { useEffect, useState } from 'react';

export const StarCursor = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    let lastTime = 0;
    
    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastTime < 50) return; // limit spawn rate
      lastTime = now;

      const newStar = {
        id: Math.random(),
        x: e.clientX,
        y: e.clientY,
        color: ['#ff006e', '#3a86ff', '#06d6a0', '#ffbe0b'][Math.floor(Math.random() * 4)],
      };

      setStars((prev) => [...prev, newStar].slice(-20)); // Keep max 20 stars

      setTimeout(() => {
        setStars((prev) => prev.filter((s) => s.id !== newStar.id));
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', (e) => handleMouseMove(e.touches[0]));
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', (e) => handleMouseMove(e.touches[0]));
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute text-xl animate-[fall_1s_ease-out_forwards]"
          style={{
            left: star.x - 10,
            top: star.y - 10,
            color: star.color,
            textShadow: `0 0 5px ${star.color}`,
          }}
        >
          ✧
        </div>
      ))}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fall {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(50px) scale(0); opacity: 0; }
        }
      `}} />
    </div>
  );
};
