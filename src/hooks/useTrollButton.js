import { useState, useRef, useCallback } from 'react';

export const useTrollButton = () => {
  const [strikes, setStrikes] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [text, setText] = useState("Decline");
  const buttonRef = useRef(null);

  const handleHover = useCallback(() => {
    setStrikes(s => {
      const newStrikes = s + 1;
      
      if (newStrikes === 1) {
        // Strike 1: Run away slightly
        setPosition({
          x: (Math.random() - 0.5) * 200,
          y: (Math.random() - 0.5) * 200
        });
        setText("bro where are you going 💀");
      } else if (newStrikes === 2) {
        // Strike 2: Shrink and mock
        setScale(0.7);
        setPosition({
          x: (Math.random() - 0.5) * 300,
          y: (Math.random() - 0.5) * 300
        });
        const mockMessages = ["bro really trying 💀", "give up bestie 😭", "ur not built 4 this"];
        setText(mockMessages[Math.floor(Math.random() * mockMessages.length)]);
      } else {
        // Strike 3+: Teleport randomly and unhinged text
        const messages = [
          "touching grass won't save u 🌿",
          "the pub crawl finds YOU 🍺",
          "resistance is futile bestie 😈",
          "ur friends already said yes btw 👀"
        ];
        setText(messages[Math.floor(Math.random() * messages.length)]);
        setScale(prev => Math.max(0.4, prev - 0.1));

        const maxX = window.innerWidth * 0.4;
        const maxY = window.innerHeight * 0.4;

        setPosition({
          x: (Math.random() - 0.5) * maxX * 2,
          y: (Math.random() - 0.5) * maxY * 2
        });
      }

      return newStrikes;
    });
  }, []);

  return { buttonRef, position, scale, text, handleHover, strikes };
};
