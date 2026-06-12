/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        y2k: ['"Press Start 2P"', 'cursive'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        neonPink: '#ff006e',
        neonBlue: '#3a86ff',
        neonGreen: '#06d6a0',
        neonYellow: '#ffbe0b',
        darkBg: '#050510',
      },
      boxShadow: {
        'neon-pink': '0 0 8px #ff006e',
        'neon-blue': '0 0 8px #3a86ff',
        'neon-green': '0 0 8px #06d6a0',
        'neon-yellow': '0 0 8px #ffbe0b',
      },
    },
  },
  plugins: [],
}
