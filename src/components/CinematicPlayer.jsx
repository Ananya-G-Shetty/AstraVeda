import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/soundEngine';
import {
  Rocket,
  Sparkles,
  SkipForward,
  Compass,
} from 'lucide-react';

export function CinematicPlayer({
  onLaunchComplete,
  onSelectDestination,
  isMuted = false,
  onToggleMute,
}) {
  // Stages: 'launchpad', 'ignition', 'ascent', 'video-cruise', 'character-briefing'
  const [stage, setStage] = useState('launchpad');
  const videoRef = useRef(null);

  // When mission begins, advance through cinematic sequence
  const handleBeginMission = () => {
    sound.initContext();
    sound.startSpaceDrone();
    sound.playRocketLaunch();

    setStage('ignition');

    // After 2.5s of ignition, transition to orbital ascent
    setTimeout(() => {
      setStage('ascent');

      // After 2.5s of ascent, transition into deep space video flight
      setTimeout(() => {
        setStage('video-cruise');
      }, 2500);
    }, 2500);
  };

  // Video time update handling (when rocket flight ends, transition to speaking rocket decision screen!)
  const handleVideoTimeUpdate = () => {
    if (!videoRef.current) return;
    const ct = videoRef.current.currentTime;
    if (ct >= 9.3) {
      if (onLaunchComplete) onLaunchComplete();
    }
  };

  const handleSkipToCockpit = () => {
    sound.playClick('decision');
    if (onLaunchComplete) {
      onLaunchComplete();
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-black select-none">
      {/* Background Visuals for each stage */}

      {/* Stage 1: Launchpad at Night */}
      {stage === 'launchpad' && (
        <motion.div
          key="launchpad"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/cinematics/launchpad-night.jpg')` }}
        >
          {/* Subtle night vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/60" />
        </motion.div>
      )}

      {/* Stage 2: Rocket Launch Ignition */}
      {stage === 'ignition' && (
        <motion.div
          key="ignition"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/cinematics/rocket-launch-fire.jpg')` }}
        >
          <div className="absolute inset-0 bg-orange-600/25 mix-blend-screen animate-pulse" />
        </motion.div>
      )}

      {/* Stage 3: Ascent to Orbit with HUD */}
      {stage === 'ascent' && (
        <motion.div
          key="ascent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/cinematics/ascent-hud-orbit.jpg')` }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      )}

      {/* Stage 4: Deep Space Video Cruise (The 10-Second Uploaded Video) */}
      {stage === 'video-cruise' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <video
            ref={videoRef}
            src="/cinematics/space-journey.mp4"
            autoPlay
            playsInline
            muted={isMuted}
            onTimeUpdate={handleVideoTimeUpdate}
            onEnded={() => onLaunchComplete && onLaunchComplete()}
            className="w-full h-full min-w-full min-h-full object-cover"
          />
        </div>
      )}

      {/* Center Hero Card (Launchpad Stage) */}
      {stage === 'launchpad' && (
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 pt-16 max-w-3xl mx-auto pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-cyan-400/40 bg-cyan-950/60 text-cyan-300 text-xs font-mono tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NASA SPACE APPS CHALLENGE 2026</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black font-display text-white tracking-wider leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
              "I'M ABANDONED <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-300">
                BUT NOT FORGOTTEN"
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-200 font-sans tracking-wide max-w-xl mx-auto italic drop-shadow-md">
              "Some explorers stopped moving. Their stories didn't."
            </p>

            <div className="pt-6">
              <button
                onClick={handleBeginMission}
                className="px-8 py-4 rounded-2xl font-mono text-sm sm:text-base font-bold tracking-widest bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300 text-black hover:opacity-95 transform hover:-translate-y-1 transition-all shadow-[0_0_35px_rgba(0,240,255,0.7)] flex items-center space-x-3 mx-auto"
              >
                <Rocket className="w-5 h-5 fill-black" />
                <span>🚀 BEGIN THE MISSION</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Center Notifications (Ignition & Ascent) */}
      {(stage === 'ignition' || stage === 'ascent') && (
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center pointer-events-none">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-panel p-6 rounded-2xl border border-cyan-400/60 max-w-md text-center shadow-[0_0_40px_rgba(0,240,255,0.4)]"
          >
            <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white">
              {stage === 'ignition' ? '🔥 IGNITION SEQUENCE START' : '🚀 TRANSLUNAR INJECTION VECTOR'}
            </h3>
            <p className="text-xs font-mono text-cyan-300 mt-2">
              {stage === 'ignition'
                ? 'Solid Rocket Boosters (SRBs) ignited • Thrust: 8.8 Million lbs'
                : 'Earth Escape Velocity Reached • Trajectory: Moon & Mars Junction'}
            </p>
          </motion.div>
        </div>
      )}

      {/* Bottom spacer for clean aesthetics (no video player controls) */}
      <div className="relative z-20 pb-8 text-center text-[10px] font-mono text-slate-400 pointer-events-none">
        3D PLANETARY EXPLORATION • NASA HISTORICAL ARCHIVES
      </div>
    </div>
  );
}
