import { useState, useRef, useCallback } from 'react';

export const useTrollButton = () => {
  const [strikes, setStrikes] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [text, setText] = useState("Decline");
  const buttonRef = useRef(null);

  const handleHover = useCallback(() => {
    setStrikes(s => s + 1);

    if (strikes === 0) {
      // Strike 1: Run away slightly
      setPosition({
        x: (Math.random() - 0.5) * 150,
        y: (Math.random() - 0.5) * 150
      });
      setText("Nice try");
    } else if (strikes === 1) {
      // Strike 2: Shrink and mock
      setScale(0.7);
      setPosition({
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200
      });
      setText("bro really trying 💀");
    } else {
      // Strike 3+: Teleport randomly and unhinged text
      const messages = [
        "touching grass won't save u",
        "caught in 4k",
        "why r u like this",
        "no escape",
        "L + ratio + accept"
      ];
      setText(messages[Math.floor(Math.random() * messages.length)]);
      setScale(Math.max(0.3, scale - 0.1));
      
      const maxX = window.innerWidth * 0.4;
      const maxY = window.innerHeight * 0.4;
      
      setPosition({
        x: (Math.random() - 0.5) * maxX * 2,
        y: (Math.random() - 0.5) * maxY * 2
      });
    }
  }, [strikes, scale]);

  return { buttonRef, position, scale, text, handleHover, strikes };
};
