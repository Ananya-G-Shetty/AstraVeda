import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/soundEngine';
import { Repeat, Maximize, Minimize } from 'lucide-react';

export function RocketDecisionScreen({
  onSelectDestination,
  onReplayLaunch,
  isMuted = false,
}) {
  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setFullscreen(false);
    }
  };

  const handleChooseMoon = () => {
    sound.playClick('decision');
    if (onSelectDestination) {
      onSelectDestination('moon');
    }
  };

  const handleChooseMars = () => {
    sound.playClick('decision');
    if (onSelectDestination) {
      onSelectDestination('mars');
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-black select-none">
      {/* Background Animated Video: Cute NASA Talking Rocket Character */}
      <video
        src="/cinematics/rocket-decision-character.mp4"
        autoPlay
        loop
        playsInline
        muted={isMuted}
        className="absolute inset-0 w-full h-full min-w-full min-h-full object-cover"
      />

      {/* Futuristic Cockpit Scanlines Effect */}
      <div className="absolute inset-0 scanlines pointer-events-none z-10 opacity-30" />

      {/* Main Interactive Overlay */}
      <div className="relative z-20 w-full h-full flex flex-col justify-end pb-4 sm:pb-6 px-4 sm:px-8 pointer-events-none">
        {/* Bottom Interactive Area: Always displayed, positioned DOWN at the bottom as it was earlier */}
        <div className="w-full flex flex-col gap-3 pointer-events-auto">
          {/* Main Destination Buttons: Explore Moon & Explore Mars */}
          <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 px-2 sm:px-6">
            {/* Explore Moon Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => sound.playRadarPing()}
              onClick={handleChooseMoon}
              className="w-full sm:w-auto px-8 sm:px-10 py-3.5 rounded-2xl font-mono text-sm sm:text-base font-extrabold tracking-widest bg-cyan-500/40 hover:bg-cyan-400 text-cyan-200 hover:text-black border-2 border-cyan-400 shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all flex items-center justify-center space-x-3 cursor-pointer backdrop-blur-md"
            >
              <span className="text-xl">🌕</span>
              <span>&lt; EXPLORE THE MOON &gt;</span>
            </motion.button>

            {/* Explore Mars Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => sound.playRadarPing()}
              onClick={handleChooseMars}
              className="w-full sm:w-auto px-8 sm:px-10 py-3.5 rounded-2xl font-mono text-sm sm:text-base font-extrabold tracking-widest bg-amber-500/40 hover:bg-amber-400 text-amber-200 hover:text-black border-2 border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.6)] transition-all flex items-center justify-center space-x-3 cursor-pointer backdrop-blur-md"
            >
              <span className="text-xl">🔴</span>
              <span>&lt; EXPLORE MARS &gt;</span>
            </motion.button>
          </div>

          {/* Bottom Utility Bar: REPLAY LAUNCH & Fullscreen */}
          <div className="w-full flex justify-between items-center px-2 sm:px-4 pt-1">
            <button
              onClick={() => {
                sound.playClick('normal');
                if (onReplayLaunch) onReplayLaunch();
              }}
              className="px-3.5 py-1.5 rounded-lg glass-panel hover:bg-white/10 text-xs font-mono text-cyan-300 flex items-center space-x-1.5 border border-cyan-400/30 cursor-pointer shadow-[0_0_10px_rgba(0,240,255,0.2)]"
            >
              <Repeat className="w-3.5 h-3.5 text-cyan-400" />
              <span>REPLAY LAUNCH</span>
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg glass-panel hover:bg-white/10 text-slate-300 hover:text-white border border-cyan-400/30 cursor-pointer shadow-[0_0_10px_rgba(0,240,255,0.2)]"
              title="Toggle Fullscreen"
            >
              {fullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
