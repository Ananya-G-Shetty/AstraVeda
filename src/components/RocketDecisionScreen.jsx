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
      document.documentElement.requestFullscreen().catch(() => { });
      setFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => { });
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

      {/* LEFT TELEMETRY HUD: CRISP MOON TARGET PANEL (Exact size of older card: 278px width, 250px height) */}
      <div className="absolute left-[3.6%] top-[38.9%] z-20 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-[278px] h-[250px] p-2.5 rounded-xl border border-cyan-400/70 bg-[#060B1E]/95 backdrop-blur-md shadow-[0_0_25px_rgba(0,240,255,0.25)] cursor-default select-none flex flex-col justify-between overflow-hidden"
        >
          {/* Top Header & Telemetry Data */}
          <div>
            {/* Header Row: MOON & LUNAR TARGET */}
            <div className="flex items-center justify-between border-b border-cyan-500/40 pb-1 mb-1">
              <span className="text-[12px] font-mono font-bold text-cyan-300 tracking-widest leading-none">
                MOON
              </span>
              <span className="text-[11px] font-mono text-cyan-400/80 tracking-wider font-semibold leading-none">
                LUNAR TARGET
              </span>
            </div>

            {/* Destination Title & Distance */}
            <div className="font-mono text-left leading-tight">
              <div className="text-[15.5px] font-bold text-white tracking-wide">
                <br>
                </br>DESTINATION A:
              </div>
              <div className="text-[12.5px] font-bold text-cyan-400 tracking-wide">
                MOON (384,400 KM)
              </div>
            </div>

            {/* Equipment / Exploration Highlights Bullet List */}
            <div className="text-[13.5px] font-mono text-slate-300 space-y-0.5 mt-1 leading-tight text-left">
              <div className="flex items-start space-x-1">
                <span className="text-cyan-400 font-bold"><br></br>•</span>
                <span><br></br>Apollo 11 Descent Stage</span>
              </div>
              <div className="flex items-start space-x-1">
                <span className="text-cyan-400 font-bold">•</span>
                <span>Lunar Roving Vehicles (LRVs)</span>
              </div>
              <div className="flex items-start space-x-1">
                <span className="text-cyan-400 font-bold">•</span>
                <span>ALSEP Scientific Stations</span>
              </div>
              <div className="flex items-start space-x-1">
                <span className="text-cyan-400 font-bold">•</span>
                <span>Surveyor 3 Soft Lander</span>
              </div>
            </div>
          </div>

          {/* Footer Status Bar: ORBIT TRAJECTORY LOCKED */}
          <div className="border-t border-cyan-500/30 pt-1 flex items-center justify-between">
            <span className="text-[8px] font-mono font-bold text-cyan-300 flex items-center space-x-1 tracking-wider leading-none">
              <span className="relative flex h-1.5 w-1.5 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" />
              </span>
              <span>ORBIT TRAJECTORY LOCKED</span>
            </span>
          </div>
        </motion.div>
      </div>

      {/* RIGHT TELEMETRY HUD: CRISP MARS TARGET PANEL (All Right-Aligned, width increased by 20%) */}
      <div className="absolute right-[3.1%] top-[38.9%] z-20 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-[285px] h-[250px] p-2.5 sm:p-3 rounded-xl border border-amber-500/70 bg-[#180806]/95 backdrop-blur-md shadow-[0_0_25px_rgba(245,158,11,0.25)] cursor-default select-none flex flex-col justify-between overflow-hidden"
        >
          {/* Top Header & Telemetry Data */}
          <div>
            {/* Header Row: MARTIAN TARGET & MARS */}
            <div className="flex items-center justify-between border-b border-amber-500/40 pb-1 mb-1.5">
              <span className="text-[11px] font-mono text-amber-400/80 tracking-wider font-semibold leading-none">
                MARTIAN TARGET
              </span>
              <span className="text-[12px] font-mono font-bold text-amber-400 tracking-widest leading-none">
                MARS
              </span>
            </div>

            {/* Destination Title & Distance (Right-Aligned) */}
            <div className="font-mono text-left leading-tight pr-1">
              <div className="text-[15.5px] font-bold text-white tracking-wide">
                <br></br>DESTINATION B:
              </div>
              <div className="text-[12.5px] font-bold text-amber-400 tracking-wide mt-0.5">
                MARS (54.6M KM)
              </div>
            </div>

            {/* Equipment / Exploration Highlights Bullet List (All Right-Aligned) */}
            <div className="text-[13.5px] font-mono text-slate-300 space-y-1 mt-2 leading-tight text-left pr-1">
              <div>
                <span className="text-amber-400 font-bold mr-1.5"><br></br>•</span>
                <span>Sojourner &amp; Opportunity</span>
              </div>
              <div>
                <span className="text-amber-400 font-bold mr-1.5">•</span>
                <span>Viking 1 &amp; 2 Landers</span>
              </div>
              <div>
                <span className="text-amber-400 font-bold mr-1.5">•</span>
                <span>InSight Seismic Station</span>
              </div>
              <div>
                <span className="text-amber-400 font-bold mr-1.5">•</span>
                <span>Ingenuity Mars Helicopter</span>
              </div>
            </div>
          </div>

          {/* Footer Status Bar: ARES VECTOR LOCKED with Equalizer Graphic */}
          <div className="border-t border-amber-500/30 pt-1 flex items-center justify-between">
            {/* Sound / Telemetry Equalizer Bars */}
            <div className="flex items-end space-x-0.5 h-3 pl-1">
              <span className="w-1 h-1 bg-amber-400 rounded-full" />
              <span className="w-1 h-2.5 bg-amber-400 rounded-full" />
              <span className="w-1 h-1.5 bg-amber-400 rounded-full" />
              <span className="w-1 h-3 bg-amber-400 rounded-full" />
              <span className="w-1 h-2 bg-amber-400 rounded-full" />
              <span className="w-1 h-1 bg-amber-400 rounded-full" />
            </div>

            <span className="text-[9px] font-mono font-bold text-amber-400 tracking-wider leading-none">
              ARES VECTOR LOCKED
            </span>
          </div>
        </motion.div>
      </div>

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
              <span>&lt; EXPLORE MOON &gt;</span>
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
