import React from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  Rocket,
  Compass,
  Trophy,
  Gamepad2,
  BookOpen,
  Volume2,
  VolumeX,
  Sparkles,
  RotateCcw,
  SkipForward,
} from 'lucide-react';
import { sound } from '../utils/soundEngine';

export function Navigation({
  currentScene,
  onNavigate,
  isMuted,
  onToggleMute,
  xp,
  rank,
  discoveredCount,
  totalCount,
  onOpenBadges,
  onOpenMemorial,
  onOpenMissionSelect,
  onSkipCinematic,
}) {
  const handleNav = (scene) => {
    sound.playClick('normal');
    onNavigate(scene);
  };

  return (
    <header className="fixed top-3 inset-x-0 z-40 px-3 sm:px-6 pointer-events-none flex justify-between items-center">
      {/* Left Brand Badge */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="pointer-events-auto flex items-center space-x-2.5 px-3 py-1.5 rounded-full glass-panel border border-cyan-500/30"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
        <div className="flex flex-col">
          <span className="text-[10px] font-mono tracking-widest text-cyan-300 font-bold uppercase leading-none">
            NASA SPACE APPS 2026
          </span>
          <span className="text-[9px] font-mono text-slate-400 leading-tight">
            {currentScene === 'cinematic' ? (
              <span className="text-cyan-400 font-semibold tracking-wider">CINEMATIC ODYSSEY</span>
            ) : (
              'ABANDONED BUT NOT FORGOTTEN'
            )}
          </span>
        </div>
      </motion.div>

      {/* Floating Center Holographic Nav Pills */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pointer-events-auto hidden md:flex items-center space-x-1 p-1.5 rounded-full glass-panel border border-cyan-500/40 shadow-2xl"
      >
        <button
          onClick={() => handleNav('earth')}
          className={`px-3 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider flex items-center space-x-1.5 transition-all ${
            currentScene === 'earth'
              ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-400/60 shadow-[0_0_12px_rgba(0,240,255,0.4)]'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => handleNav('decision')}
          className={`px-3 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider flex items-center space-x-1.5 transition-all ${
            currentScene === 'decision'
              ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-400/60 shadow-[0_0_12px_rgba(0,240,255,0.4)]'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Space</span>
        </button>

        <button
          onClick={() => handleNav('moon')}
          className={`px-3 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider flex items-center space-x-1.5 transition-all ${
            currentScene === 'moon'
              ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-400/60 shadow-[0_0_12px_rgba(0,240,255,0.4)]'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <span>🌕</span>
          <span>Moon</span>
        </button>

        <button
          onClick={() => handleNav('mars')}
          className={`px-3 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider flex items-center space-x-1.5 transition-all ${
            currentScene === 'mars'
              ? 'bg-rose-500/25 text-rose-300 border border-rose-400/60 shadow-[0_0_12px_rgba(255,77,45,0.4)]'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <span>🔴</span>
          <span>Mars</span>
        </button>

        <button
          onClick={onOpenMissionSelect}
          className="px-3 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider flex items-center space-x-1.5 text-slate-300 hover:text-white hover:bg-white/5"
        >
          <Gamepad2 className="w-3.5 h-3.5 text-amber-400" />
          <span>Missions</span>
        </button>

        <button
          onClick={onOpenBadges}
          className="px-3 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider flex items-center space-x-1.5 text-slate-300 hover:text-white hover:bg-white/5"
        >
          <Trophy className="w-3.5 h-3.5 text-amber-300" />
          <span>Badges</span>
        </button>

        <button
          onClick={onOpenMemorial}
          className="px-3 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider flex items-center space-x-1.5 text-slate-300 hover:text-white hover:bg-white/5"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Memorial</span>
        </button>
      </motion.nav>

      {/* Right Progress & Sound Toggle */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="pointer-events-auto flex items-center space-x-2"
      >
        {/* Skip to space during cinematic intro */}
        {currentScene === 'cinematic' && onSkipCinematic && (
          <button
            onClick={onSkipCinematic}
            className="px-3.5 py-1.5 rounded-full glass-button text-xs font-mono font-bold tracking-wider text-cyan-300 flex items-center space-x-1.5 border border-cyan-400/50 shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:bg-cyan-500/20 transition-all cursor-pointer"
            title="Skip directly to Destination Decision"
          >
            <span className="hidden sm:inline">SKIP TO SPACE</span>
            <span className="sm:hidden">SKIP</span>
            <SkipForward className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        )}

        {/* Explorer Rank & XP Pill */}
        <button
          onClick={onOpenBadges}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-full glass-panel border border-cyan-500/40 hover:border-cyan-400 transition-all cursor-pointer"
        >
          <span className="text-sm">{rank.icon}</span>
          <div className="flex flex-col text-left">
            <span className="text-[9px] font-mono text-cyan-400 uppercase font-bold leading-none">
              {rank.title}
            </span>
            <span className="text-[10px] font-mono font-bold text-white leading-tight">
              {xp} XP
            </span>
          </div>
        </button>

        {/* Audio Mute/Unmute */}
        <button
          onClick={onToggleMute}
          className="p-2 rounded-full glass-panel border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white transition-all"
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-rose-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-cyan-400" />
          )}
        </button>
      </motion.div>
    </header>
  );
}

