/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          darkest: '#030712',
          deep: '#060B1E',
          void: '#0B122B',
          cyan: '#00F0FF',
          blue: '#38BDF8',
          gold: '#FFD700',
          mars: '#FF4D2D',
          amber: '#F59E0B',
          neon: '#10B981',
          hud: 'rgba(0, 240, 255, 0.15)',
          hudBorder: 'rgba(0, 240, 255, 0.4)',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
        display: ['"Orbitron"', '"Rajdhani"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow 2s ease-in-out infinite alternate',
        'radar-sweep': 'radarSweep 4s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          'from': { filter: 'drop-shadow(0 0 5px rgba(0,240,255,0.4))' },
          'to': { filter: 'drop-shadow(0 0 20px rgba(0,240,255,0.9))' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}

