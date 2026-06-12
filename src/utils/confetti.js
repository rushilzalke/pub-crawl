import confetti from 'canvas-confetti';

export const triggerBassDropConfetti = () => {
  const duration = 3000;
  const end = Date.now() + duration;

  // Optional: Play a short sound if browser allows
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.5);
    
    gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.5);
  } catch(e) {
    console.log("Audio play prevented");
  }

  (function frame() {
    confetti({
      particleCount: 15,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#ff006e', '#3a86ff', '#06d6a0', '#ffbe0b']
    });
    confetti({
      particleCount: 15,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#ff006e', '#3a86ff', '#06d6a0', '#ffbe0b']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
};
