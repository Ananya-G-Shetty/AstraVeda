import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/soundEngine';
import {
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Repeat,
  Radio,
  Compass,
} from 'lucide-react';

export function CockpitHUD({
  onSelectDestination,
  onHoverDestination,
  hoveredDestination,
  isMuted = false,
  onToggleMute,
  onReplayFlight,
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

  return (
    <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between pt-16 sm:pt-20 pb-4 sm:pb-6 px-3 sm:px-6 overflow-hidden select-none">
      {/* Outer Curved Futuristic Holographic Cockpit Frame - Lowered and framed properly */}
      <div className="absolute inset-x-3 sm:inset-x-6 top-16 sm:top-20 bottom-3 sm:bottom-6 border-2 sm:border-4 border-cyan-500/30 rounded-2xl sm:rounded-3xl pointer-events-none shadow-[inset_0_0_60px_rgba(0,240,255,0.08)]">
        {/* Curved Corner Brackets - perfectly aligned to all 4 corners */}
        <div className="absolute top-0 left-0 w-12 sm:w-16 h-12 sm:h-16 border-t-2 border-l-2 border-cyan-400 rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-12 sm:w-16 h-12 sm:h-16 border-t-2 border-r-2 border-cyan-400 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-12 sm:w-16 h-12 sm:h-16 border-b-2 border-l-2 border-cyan-400 rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-12 sm:w-16 h-12 sm:h-16 border-b-2 border-r-2 border-cyan-400 rounded-br-2xl" />

        {/* Top Cockpit Telemetry Metadata */}
        <div className="absolute top-3 left-6 text-[10px] font-mono text-cyan-400/80 tracking-widest uppercase">
          <div>CHARTRAY</div>
          <div className="text-slate-400 text-[9px]">PTEX 388151:00059</div>
        </div>
        <div className="absolute top-3 right-6 text-right text-[10px] font-mono text-cyan-400/80 tracking-widest uppercase">
          <div>91134 // 1001</div>
          <div className="text-slate-400 text-[9px]">DOT 0581286</div>
        </div>

        {/* Bottom Cockpit Telemetry Metadata */}
        <div className="absolute bottom-3 left-6 text-[9px] font-mono text-slate-500 tracking-widest uppercase">
          CONSTANTIAS // VECTOR LOCK
        </div>
        <div className="absolute bottom-3 right-6 text-right text-[9px] font-mono text-slate-500 tracking-widest uppercase">
          CHIVE // TELEMETRY LINK
        </div>
      </div>

      {/* TOP CENTER: "SELECT DESTINATION..." BOX */}
      <div className="pt-2 sm:pt-4 flex flex-col items-center pointer-events-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative px-6 py-2 rounded-xl border border-cyan-400/80 bg-cyan-950/70 backdrop-blur-md shadow-[0_0_25px_rgba(0,240,255,0.4)]"
        >
          {/* Top bracket notch */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-cyan-400" />
          <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.25em] text-cyan-300 uppercase">
            SELECT DESTINATION...
          </span>
        </motion.div>
      </div>

      {/* CENTER HUD DISPLAY: MOON (LEFT) vs MARS (RIGHT) */}
      <div className="flex-1 flex flex-col sm:flex-row items-center justify-between px-2 sm:px-10 pointer-events-auto gap-4">
        {/* LEFT HUD: DESTINATION A: MOON (384,400 KM) */}
        <div className="flex flex-col items-start max-w-xs w-full">
          {/* Cyan Telemetry Panel */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            onMouseEnter={() => {
              onHoverDestination('moon');
              sound.playRadarPing();
            }}
            onMouseLeave={() => onHoverDestination(null)}
            onClick={() => onSelectDestination('moon')}
            className="p-4 rounded-xl border border-cyan-400/70 bg-[#060B1E]/80 backdrop-blur-md shadow-[0_0_30px_rgba(0,240,255,0.25)] cursor-pointer w-full"
          >
            <div className="flex items-center justify-between border-b border-cyan-500/40 pb-2 mb-2">
              <span className="text-xs font-mono font-bold text-cyan-300 tracking-widest">
                MOON
              </span>
              <span className="text-[10px] font-mono text-cyan-400/80">
                LUNAR TARGET
              </span>
            </div>

            <div className="text-xs font-mono text-cyan-200 space-y-1">
              <div className="font-bold text-white">DESTINATION A:</div>
              <div className="text-cyan-400">MOON (384,400 KM)</div>
              <div className="text-[10px] text-slate-400 mt-2">
                • Apollo 11 Descent Stage<br />
                • Lunar Roving Vehicles (LRVs)<br />
                • ALSEP Scientific Stations<br />
                • Surveyor 3 Soft Lander
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between pt-2 border-t border-cyan-500/30">
              <span className="text-[10px] font-mono text-cyan-300 flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block mr-1" />
                ORBIT TRAJECTORY LOCKED
              </span>
            </div>
          </motion.div>

          {/* Pulsing Interactive Selection Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectDestination('moon')}
            className="mt-3 w-full py-3 rounded-xl font-mono text-sm font-extrabold tracking-widest bg-cyan-500/30 hover:bg-cyan-400 text-cyan-200 hover:text-black border-2 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.6)] transition-all flex items-center justify-center space-x-2"
          >
            <span>&lt; MOON &gt;</span>
          </motion.button>
        </div>

        {/* RIGHT HUD: DESTINATION B: MARS (54.6M KM) */}
        <div className="flex flex-col items-end max-w-xs w-full">
          {/* Orange/Amber Telemetry Panel */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            onMouseEnter={() => {
              onHoverDestination('mars');
              sound.playRadarPing();
            }}
            onMouseLeave={() => onHoverDestination(null)}
            onClick={() => onSelectDestination('mars')}
            className="p-4 rounded-xl border border-amber-500/70 bg-[#230C0A]/85 backdrop-blur-md shadow-[0_0_30px_rgba(245,158,11,0.25)] cursor-pointer w-full text-right"
          >
            <div className="flex items-center justify-between border-b border-amber-500/40 pb-2 mb-2">
              <span className="text-[10px] font-mono text-amber-400/80">
                MARTIAN TARGET
              </span>
              <span className="text-xs font-mono font-bold text-amber-300 tracking-widest">
                MARS
              </span>
            </div>

            <div className="text-xs font-mono text-amber-200 space-y-1">
              <div className="font-bold text-white">DESTINATION B:</div>
              <div className="text-amber-400">MARS (54.6M KM)</div>
              <div className="text-[10px] text-slate-300 mt-2">
                • Sojourner & Opportunity<br />
                • Viking 1 & 2 Landers<br />
                • InSight Seismic Station<br />
                • Ingenuity Mars Helicopter
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between pt-2 border-t border-amber-500/30">
              <div className="flex space-x-0.5 items-end h-3">
                {[40, 70, 30, 85, 60, 95, 50].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 bg-amber-400 rounded-full animate-pulse"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <span className="text-[10px] font-mono text-amber-300">
                ARES VECTOR LOCKED
              </span>
            </div>
          </motion.div>

          {/* Pulsing Interactive Selection Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectDestination('mars')}
            className="mt-3 w-full py-3 rounded-xl font-mono text-sm font-extrabold tracking-widest bg-amber-500/30 hover:bg-amber-400 text-amber-200 hover:text-black border-2 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.6)] transition-all flex items-center justify-center space-x-2"
          >
            <span>&lt; MARS &gt;</span>
          </motion.button>
        </div>
      </div>

      {/* Clean Bottom Cockpit Controls */}
      <div className="relative z-10 w-full flex justify-between items-center px-6 sm:px-10 pb-1 sm:pb-2 pointer-events-auto">
        <div className="flex items-center space-x-2">
          <button
            onClick={onReplayFlight}
            className="px-3 py-1.5 rounded-lg glass-panel hover:bg-white/10 text-[11px] font-mono text-cyan-300 flex items-center space-x-1.5 border border-cyan-400/30 cursor-pointer shadow-[0_0_10px_rgba(0,240,255,0.2)]"
          >
            <Repeat className="w-3.5 h-3.5" />
            <span>REPLAY LAUNCH</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
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
  );
}
