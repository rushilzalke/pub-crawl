import React from 'react';

export const GlitchText = ({ text, as: Component = 'h1', className = '' }) => {
  return (
    <Component 
      className={`glitch-text font-y2k ${className}`} 
      data-text={text}
    >
      {text}
    </Component>
  );
};
