import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { miniGames } from '../data/gameData';
import { sound } from '../utils/soundEngine';
import { AnimatedLunarSatellite } from './AnimatedLunarSatellite';
import {
  Trophy,
  X,
  Play,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
  Compass,
  Wind,
  Radio,
  Eye,
  Activity,
  Flame,
  Battery,
  Zap,
  AlertTriangle,
  Crosshair,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Layers,
  Sparkles,
  HelpCircle,
  Clock,
  Volume2,
  VolumeX,
  BookOpen,
} from 'lucide-react';

export function GameModal({ gameId, onClose, onGameComplete }) {
  const gameConfig = miniGames[gameId] || miniGames['lunar-rover'];
  const [gameState, setGameState] = useState('briefing'); // 'briefing', 'playing', 'won', 'lost'
  const [score, setScore] = useState(0);
  const [lossReason, setLossReason] = useState('');
  const [showInGameGuide, setShowInGameGuide] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(240); // 4 minutes (240s) for 3-5 min gameplay

  // Mission Timer Loop (3 to 5 minutes duration)
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleLose("Mission time elapsed! Orbital communication window closed. Try again to complete the challenge within the time limit.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  const handleStart = () => {
    sound.playClick('decision');
    setGameState('playing');
    setScore(0);
    setLossReason('');
    setTimeRemaining(240); // Reset to 4 minutes
  };

  const handleWin = (bonus = 0) => {
    sound.stopSeismicHum();
    sound.stopMarsHeartbeat();
    sound.playDiscoveryFanfare();
    setGameState('won');
    if (onGameComplete) {
      onGameComplete(gameConfig.id, gameConfig.rewardBadge, gameConfig.xpReward + bonus);
    }
  };

  const handleLose = (reason = '') => {
    sound.stopSeismicHum();
    sound.stopMarsHeartbeat();
    sound.playHazardExplosion();
    setLossReason(reason);
    setGameState('lost');
  };

  const handleCloseModal = () => {
    sound.stopSeismicHum();
    sound.stopMarsHeartbeat();
    onClose();
  };

  // Format time MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-lg select-none">
      {/* Near Fullscreen Sci-Fi Console Workstation */}
      <div className="relative w-[96vw] max-w-7xl h-[92vh] max-h-[95vh] rounded-2xl glass-panel p-4 sm:p-6 border border-cyan-500/50 shadow-[0_0_50px_rgba(0,240,255,0.2)] flex flex-col overflow-hidden">
        {/* Futuristic Corner Tech Decors */}
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b pb-3 mb-3 border-slate-700/80 shrink-0">
          <div className="flex items-center space-x-3">
            <span className="text-3xl sm:text-4xl filter drop-shadow-[0_0_10px_rgba(0,240,255,0.6)]">
              {gameConfig.icon}
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-cyan-400 uppercase font-bold">
                  NASA EXPEDITION CHALLENGE // {gameConfig.planet}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                  ⏱️ DURATION: {gameConfig.duration || "3 - 5 MINS"}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  +{gameConfig.xpReward} XP
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-display font-extrabold text-white">
                {gameConfig.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Live In-Game Timer */}
            {gameState === 'playing' && (
              <div className="px-3 py-1 rounded-lg bg-slate-900/90 border border-cyan-400/50 flex items-center space-x-2 font-mono text-xs">
                <Clock className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                <span className="text-slate-400">TIME:</span>
                <span className={`font-bold ${timeRemaining < 60 ? 'text-rose-400 animate-pulse' : 'text-cyan-300'}`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
            )}

            {/* In-Game Guide Toggle */}
            {gameState === 'playing' && (
              <button
                onClick={() => setShowInGameGuide(!showInGameGuide)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border transition-all flex items-center space-x-1.5 cursor-pointer ${
                  showInGameGuide
                    ? 'bg-amber-500 text-black border-amber-400'
                    : 'bg-slate-800 text-amber-300 border-amber-400/40 hover:bg-slate-700'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{showInGameGuide ? 'CLOSE GUIDE' : 'HOW TO PLAY'}</span>
              </button>
            )}

            <button
              onClick={handleCloseModal}
              className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
              title="Exit Mission"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Collapsible In-Game Quick Manual Overlay */}
        <AnimatePresence>
          {showInGameGuide && gameState === 'playing' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden shrink-0 mb-3 bg-slate-900/95 border-2 border-amber-400/70 rounded-xl p-4 text-xs font-mono text-slate-200 shadow-2xl z-30"
            >
              <div className="flex justify-between items-center mb-2 pb-1 border-b border-slate-700">
                <span className="font-bold text-amber-300 flex items-center space-x-1.5">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>MISSION MANUAL &amp; OPERATIONAL PROTOCOLS</span>
                </span>
                <button
                  onClick={() => setShowInGameGuide(false)}
                  className="text-slate-400 hover:text-white text-[11px]"
                >
                  ✕ HIDE GUIDE
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] leading-relaxed">
                <div>
                  <h5 className="text-cyan-400 font-bold uppercase mb-1">🎯 PRIMARY GOAL</h5>
                  <p className="text-slate-300">{gameConfig.objective}</p>
                </div>
                <div>
                  <h5 className="text-amber-400 font-bold uppercase mb-1">🎮 CONTROLS</h5>
                  <p className="text-slate-300">{gameConfig.instructions}</p>
                </div>
                <div>
                  <h5 className="text-emerald-400 font-bold uppercase mb-1">⚡ MISSION REWARD</h5>
                  <p className="text-slate-300">
                    Badge: <strong className="text-white">{gameConfig.rewardBadge}</strong> | Reward: <strong className="text-amber-300">+{gameConfig.xpReward} XP</strong>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Viewport */}
        <div className="flex-1 overflow-y-auto pr-1">
          <AnimatePresence mode="wait">
            {/* 1. COMPREHENSIVE BRIEFING & EXPLANATION GUIDE */}
            {gameState === 'briefing' && (
              <motion.div
                key="briefing"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4 max-w-5xl mx-auto py-2"
              >
                {/* Mission Objective Card */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/40 shadow-lg">
                  <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider mb-1.5">
                    <Compass className="w-4 h-4" />
                    <span>MISSION OBJECTIVE &amp; FLIGHT OVERVIEW</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-sans font-medium">
                    {gameConfig.objective}
                  </p>
                  {gameConfig.scienceFact && (
                    <div className="mt-3 p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200 font-mono">
                      💡 <strong>NASA Science Fact:</strong> {gameConfig.scienceFact}
                    </div>
                  )}
                </div>

                {/* Specific Capture vs Avoid Guide for Lunar Rover */}
                {gameConfig.collectibles && gameConfig.hazards && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* What to Capture */}
                    <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40">
                      <h4 className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider mb-2 flex items-center space-x-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        <span>WHAT TO CAPTURE (COLLECT THESE FOR POINTS)</span>
                      </h4>
                      <ul className="space-y-2 text-xs font-mono">
                        {gameConfig.collectibles.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2 bg-black/40 p-2 rounded-lg border border-emerald-500/20">
                            <span className="text-xl shrink-0">{item.icon}</span>
                            <div>
                              <div className="flex justify-between items-center">
                                <strong className="text-emerald-300">{item.name}</strong>
                                <span className="text-amber-400 text-[10px] font-bold">{item.points}</span>
                              </div>
                              <p className="text-slate-400 text-[10px] mt-0.5 leading-snug">{item.desc}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What NOT to Capture (Fatal Hazards) */}
                    <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40">
                      <h4 className="text-xs font-mono uppercase text-rose-400 font-bold tracking-wider mb-2 flex items-center space-x-1.5">
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                        <span>DO NOT CAPTURE (FATAL HAZARDS - INSTANT LOSS)</span>
                      </h4>
                      <ul className="space-y-2 text-xs font-mono">
                        {gameConfig.hazards.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2 bg-black/40 p-2 rounded-lg border border-rose-500/20">
                            <span className="text-xl shrink-0">{item.icon}</span>
                            <div>
                              <div className="flex justify-between items-center">
                                <strong className="text-rose-300">{item.name}</strong>
                                <span className="text-rose-400 text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-900/60 border border-rose-500/50">
                                  {item.effect}
                                </span>
                              </div>
                              <p className="text-slate-400 text-[10px] mt-0.5 leading-snug">{item.desc}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Specific Multi-Stage / Distraction Guide for ALSEP & Ingenuity */}
                {gameConfig.stages && (
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700">
                    <h4 className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider mb-2">
                      🔬 SEISMIC RECORDING PHASES (TOTAL DURATION: 3 - 5 MINUTES)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                      {gameConfig.stages.map((st) => (
                        <div key={st.stage} className="p-2.5 rounded-lg bg-black/50 border border-slate-800">
                          <span className="text-amber-400 font-bold block mb-1">STAGE {st.stage}: {st.name}</span>
                          <p className="text-slate-300 text-[11px] leading-snug">{st.desc}</p>
                          <span className="text-cyan-400 text-[10px] block mt-1">Target Freq: ~{st.targetFreq} Hz</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {gameConfig.distractions && (
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700">
                    <h4 className="text-xs font-mono uppercase text-amber-400 font-bold tracking-wider mb-2">
                      🌪️ MARTIAN AERODYNAMIC DISTRACTIONS &amp; TURBULENCE
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                      {gameConfig.distractions.map((d, i) => (
                        <div key={i} className="flex items-start space-x-2 p-2 rounded-lg bg-black/50 border border-slate-800">
                          <span className="text-xl shrink-0">{d.icon}</span>
                          <div>
                            <strong className="text-amber-300 block">{d.name}</strong>
                            <p className="text-slate-400 text-[10px] leading-snug">{d.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Kepler Transit Method Guide */}
                {gameConfig.transitMethodGuide && (
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700">
                    <h4 className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider mb-2">
                      🔭 HOW EXOPLANET TRANSIT PHOTOMETRY WORKS
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                      {gameConfig.transitMethodGuide.map((g, i) => (
                        <div key={i} className="p-2.5 rounded-lg bg-black/50 border border-slate-800">
                          <span className="text-emerald-400 font-bold block mb-1">{g.title}</span>
                          <p className="text-slate-300 text-[11px] leading-snug">{g.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Controls and Launch Action */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div>
                    <h4 className="text-xs font-mono uppercase text-amber-400 tracking-widest font-bold mb-1">
                      🎮 VEHICLE &amp; INSTRUMENT CONTROLS
                    </h4>
                    <p className="text-xs text-slate-300 font-mono">
                      {gameConfig.instructions}
                    </p>
                  </div>

                  <button
                    onClick={handleStart}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-mono text-xs font-extrabold tracking-widest bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 text-black hover:opacity-95 transition-all flex items-center justify-center space-x-2 shadow-[0_0_25px_rgba(0,240,255,0.5)] cursor-pointer shrink-0"
                  >
                    <Play className="w-4 h-4 fill-black" />
                    <span>LAUNCH SIMULATION (3 - 5 MINS)</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* 2. ACTIVE GAMEPLAY */}
            {gameState === 'playing' && (
              <motion.div
                key="playing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col justify-center"
              >
                {gameId === 'lunar-rover' && (
                  <LunarRoverGameInner onWin={handleWin} onLose={handleLose} />
                )}
                {gameId === 'alsep-science' && (
                  <AlsepScienceGameInner onWin={handleWin} onLose={handleLose} />
                )}
                {gameId === 'ingenuity-flight' && (
                  <IngenuityFlightGameInner onWin={handleWin} onLose={handleLose} />
                )}
                {gameId === 'mars-rover' && (
                  <MarsRoverGameInner onWin={handleWin} onLose={handleLose} />
                )}
                {gameId === 'insight-seismic' && (
                  <InsightSeismicGameInner onWin={handleWin} onLose={handleLose} />
                )}
                {gameId === 'kepler-transit' && (
                  <KeplerTransitGameInner onWin={handleWin} onLose={handleLose} />
                )}
              </motion.div>
            )}

            {/* 3. VICTORY SCREEN */}
            {gameState === 'won' && (
              <motion.div
                key="won"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-10 space-y-4 max-w-xl mx-auto"
              >
                <div className="w-24 h-24 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-5xl shadow-[0_0_40px_rgba(16,185,129,0.5)]">
                  🏆
                </div>
                <h3 className="text-3xl font-display font-extrabold text-white tracking-wide">
                  MISSION ACCOMPLISHED!
                </h3>
                <p className="text-sm text-emerald-300 font-mono tracking-widest uppercase">
                  NASA EXPEDITION SCIENTIFIC PROTOCOLS SATISFIED
                </p>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700 text-left space-y-2 text-xs font-mono">
                  <div className="flex items-center space-x-2 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Autonomous trajectory &amp; telemetry logged</span>
                  </div>
                  <div className="flex items-center space-x-2 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Scientific specimens &amp; frequency signatures verified</span>
                  </div>
                  <div className="flex items-center space-x-2 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Preserved in NASA Space Archaeology Archive</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-amber-300 text-sm">
                    <span>EXPEDITION XP AWARDED:</span>
                    <span>+{gameConfig.xpReward} XP</span>
                  </div>
                </div>

                <div className="flex justify-center space-x-4 pt-3">
                  <button
                    onClick={handleStart}
                    className="px-6 py-3 rounded-xl text-xs font-mono font-bold bg-slate-800 hover:bg-slate-700 text-white flex items-center space-x-2 cursor-pointer border border-slate-700"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>PLAY AGAIN</span>
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="px-8 py-3 rounded-xl text-xs font-mono font-bold bg-cyan-500 text-black hover:bg-cyan-400 flex items-center space-x-2 shadow-[0_0_20px_rgba(0,240,255,0.5)] cursor-pointer"
                  >
                    <span>RETURN TO PLANET</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* 4. MISSION FAILED / RESTART SCREEN */}
            {gameState === 'lost' && (
              <motion.div
                key="lost"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-10 space-y-4 max-w-xl mx-auto"
              >
                <div className="w-24 h-24 mx-auto rounded-full bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center text-5xl shadow-[0_0_40px_rgba(239,68,68,0.5)] animate-bounce">
                  ⚠️
                </div>
                <h3 className="text-3xl font-display font-extrabold text-white">
                  MISSION ABORTED!
                </h3>
                <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/50 text-left text-xs font-mono text-rose-200">
                  <span className="text-rose-400 font-bold block mb-1">CRITICAL INCIDENT REPORT:</span>
                  <p>{lossReason || "Equipment integrity breached or fatal hazard collided. You must strictly avoid craters and hazards."}</p>
                </div>

                <div className="flex justify-center space-x-4 pt-3">
                  <button
                    onClick={handleStart}
                    className="px-8 py-3 rounded-xl text-xs font-mono font-bold bg-cyan-500 text-black hover:bg-cyan-400 flex items-center space-x-2 shadow-[0_0_20px_rgba(0,240,255,0.4)] cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>RESTART MISSION &amp; TRY AGAIN</span>
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="px-6 py-3 rounded-xl text-xs font-mono font-bold bg-slate-800 text-slate-300 hover:text-white cursor-pointer border border-slate-700"
                  >
                    <span>ABORT TO BASE</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// GAME 1: Lunar Rover & Satellite Crater Traverse (3 Lives, Cursor Control, NASA Spacecraft)
// =========================================================================
function LunarRoverGameInner({ onWin, onLose }) {
  const [roverX, setRoverX] = useState(50); // percentage 12% to 88%
  const [distance, setDistance] = useState(0); // 0 to 2500m
  const [battery, setBattery] = useState(100);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3); // 3 Lives before losing!
  const [invulnerable, setInvulnerable] = useState(false);
  const [shieldWarning, setShieldWarning] = useState('');
  const [vehicleType, setVehicleType] = useState('satellite'); // 'satellite' | 'rover'
  const [isCollecting, setIsCollecting] = useState(false);
  const [tilt, setTilt] = useState(0);
  const [collectedItems, setCollectedItems] = useState({ diamonds: 0, crystals: 0, cores: 0 });
  const [sector, setSector] = useState(1);
  const [hazards, setHazards] = useState([
    { id: 1, x: 25, y: -20, type: 'diamond', label: '💎 Diamond' },
    { id: 2, x: 65, y: -70, type: 'crystal', label: '🔷 Genesis Crystal' },
    { id: 3, x: 45, y: -120, type: 'crater', label: '🕳️ Crater Void' },
  ]);

  // Track ref for calculating cursor position
  const trackRef = useRef(null);
  const lastXPctRef = useRef(50);

  // Mouse / Cursor movement across the track
  const handleMouseMove = (e) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const xPct = Math.max(12, Math.min(88, ((e.clientX - rect.left) / rect.width) * 100));
    const deltaX = xPct - lastXPctRef.current;
    lastXPctRef.current = xPct;
    setRoverX(xPct);
    if (deltaX < -0.8) setTilt(-8);
    else if (deltaX > 0.8) setTilt(8);
    else setTilt(0);
  };

  // Touch movement on mobile / touchscreens
  const handleTouchMove = (e) => {
    if (!trackRef.current || !e.touches || !e.touches[0]) return;
    const rect = trackRef.current.getBoundingClientRect();
    const xPct = Math.max(12, Math.min(88, ((e.touches[0].clientX - rect.left) / rect.width) * 100));
    const deltaX = xPct - lastXPctRef.current;
    lastXPctRef.current = xPct;
    setRoverX(xPct);
    if (deltaX < -0.8) setTilt(-8);
    else if (deltaX > 0.8) setTilt(8);
    else setTilt(0);
  };

  // Keyboard controls [A / D] or [Left / Right Arrow]
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        setRoverX((prev) => Math.max(12, prev - 8));
        setTilt(-8);
        setTimeout(() => setTilt(0), 180);
        sound.playClick('normal');
      }
      if (e.key === 'ArrowRight' || e.key === 'd') {
        setRoverX((prev) => Math.min(88, prev + 8));
        setTilt(8);
        setTimeout(() => setTilt(0), 180);
        sound.playClick('normal');
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Main 3-5 min simulation tick (Gentle lunar falling speed: +1.2 per tick)
  useEffect(() => {
    const timer = setInterval(() => {
      // Advance distance towards 2500m
      setDistance((prev) => {
        const nextDist = prev + 3.8;
        if (nextDist >= 2500) {
          clearInterval(timer);
          onWin(score);
          return 2500;
        }

        if (nextDist > 1600) setSector(3);
        else if (nextDist > 800) setSector(2);

        return nextDist;
      });

      // Battery slow consumption
      setBattery((b) => {
        if (b <= 1) {
          clearInterval(timer);
          onLose("Vehicle battery depleted before reaching base! Collect Helium-3 cells to sustain power.");
          return 0;
        }
        return b - 0.12;
      });

      // Move items downwards smoothly (Slower falling speed)
      setHazards((prevHazards) => {
        return prevHazards
          .map((h) => {
            const nextY = h.y + 1.25;

            // Tight vehicle collision detection (y: 74% to 86%, x proximity < 7.5%)
            if (nextY >= 74 && nextY <= 86 && Math.abs(h.x - roverX) < 7.5) {
              // 1. COLLIDED WITH AN UNWANTED HAZARD
              if (h.type === 'crater' || h.type === 'boulder' || h.type === 'fissure' || h.type === 'meteorite') {
                if (!invulnerable) {
                  const nextLives = lives - 1;
                  setLives(nextLives);
                  setShieldWarning(`⚠️ SHIELD HIT BY ${h.label.toUpperCase()}! ${nextLives} LIVES REMAINING`);

                  if (nextLives <= 0) {
                    clearInterval(timer);
                    sound.playHazardExplosion();
                    onLose(`All 3 shield lives depleted! You collided with ${h.label}. Move your mouse cursor left and right to capture diamonds and steer clear of craters.`);
                    return { ...h, y: 999 };
                  } else {
                    sound.playClick('mars');
                    setInvulnerable(true);
                    setTimeout(() => {
                      setInvulnerable(false);
                      setShieldWarning('');
                    }, 1600);
                    return { ...h, y: 999 }; // Remove the hazard that was hit
                  }
                }
              }

              // 2. CAPTURED A WANTED COLLECTIBLE (Diamonds, Crystals, Cores, Helium-3)
              if (h.type === 'diamond' || h.type === 'crystal' || h.type === 'core' || h.type === 'he3') {
                setIsCollecting(true);
                setTimeout(() => setIsCollecting(false), 380);

                if (h.type === 'diamond') {
                  sound.playGemCollect();
                  setScore((s) => s + 100);
                  setCollectedItems((c) => ({ ...c, diamonds: c.diamonds + 1 }));
                  setBattery((b) => Math.min(100, b + 6));
                } else if (h.type === 'crystal') {
                  sound.playGemCollect();
                  setScore((s) => s + 150);
                  setCollectedItems((c) => ({ ...c, crystals: c.crystals + 1 }));
                  setBattery((b) => Math.min(100, b + 8));
                } else if (h.type === 'core') {
                  sound.playGemCollect();
                  setScore((s) => s + 200);
                  setCollectedItems((c) => ({ ...c, cores: c.cores + 1 }));
                  setBattery((b) => Math.min(100, b + 10));
                } else if (h.type === 'he3') {
                  sound.playDiscoveryFanfare();
                  setScore((s) => s + 80);
                  setBattery((b) => Math.min(100, b + 25));
                }
                return { ...h, y: 999 };
              }
            }

            // Unwanted items falling past baseline do NOT hurt the player at all!
            return { ...h, y: nextY };
          })
          .filter((h) => h.y < 110); // Safely disappears past baseline
      });
    }, 75);

    return () => clearInterval(timer);
  }, [roverX, score, lives, invulnerable]);

  // Slower, paced item spawning (Spawns every 1.25s on balanced non-overlapping lanes)
  useEffect(() => {
    const lanes = [20, 35, 50, 65, 80];
    const spawnTimer = setInterval(() => {
      const lane = lanes[Math.floor(Math.random() * lanes.length)];
      const isGood = Math.random() < 0.58; // slightly higher chance of positive collectibles

      let itemType, itemLabel;
      if (isGood) {
        const goodTypes = [
          { type: 'diamond', label: '💎 Diamond' },
          { type: 'crystal', label: '🔷 Genesis Crystal' },
          { type: 'core', label: '🧪 Core Tube' },
          { type: 'he3', label: '🔋 He-3 Cell' },
        ];
        const chosen = goodTypes[Math.floor(Math.random() * goodTypes.length)];
        itemType = chosen.type;
        itemLabel = chosen.label;
      } else {
        const badTypes = [
          { type: 'crater', label: '🕳️ Crater Void' },
          { type: 'boulder', label: '🪨 Basalt Boulder' },
          { type: 'fissure', label: '☢️ Regolith Fissure' },
          { type: 'meteorite', label: '☄️ Volatile Debris' },
        ];
        const chosen = badTypes[Math.floor(Math.random() * badTypes.length)];
        itemType = chosen.type;
        itemLabel = chosen.label;
      }

      setHazards((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: lane + (Math.random() * 6 - 3),
          y: -12,
          type: itemType,
          label: itemLabel,
        },
      ]);
    }, 1250);

    return () => clearInterval(spawnTimer);
  }, []);

  return (
    <div className="space-y-3 h-full flex flex-col justify-between">
      {/* Real-time Telemetry Dashboard */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono bg-slate-900/90 p-3 rounded-xl border border-slate-700 text-center shrink-0">
        <div>
          <span className="text-slate-400 block text-[10px]">ROUTE TO BASE</span>
          <span className="text-cyan-400 font-bold">{Math.floor(distance)}m / 2500m ({Math.floor((distance / 2500) * 100)}%)</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">SHIELD INTEGRITY</span>
          <span className="text-rose-400 font-bold text-sm tracking-widest">
            {lives >= 3 ? '❤️❤️❤️' : lives === 2 ? '❤️❤️🖤' : '❤️🖤🖤'} ({lives} LIVES)
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">SPECIMENS CAPTURED</span>
          <span className="text-amber-400 font-bold">💎 {collectedItems.diamonds} | 🔷 {collectedItems.crystals} | 🧪 {collectedItems.cores}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">POWER BATTERY</span>
          <span className={`font-bold ${battery < 25 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>
            🔋 {Math.floor(battery)}%
          </span>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-slate-400 block text-[10px]">VEHICLE CHASSIS</span>
          <button
            onClick={() => {
              sound.playClick('normal');
              setVehicleType(vehicleType === 'satellite' ? 'rover' : 'satellite');
            }}
            className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-400 text-cyan-300 font-bold hover:bg-cyan-900 cursor-pointer text-[10px] transition-all"
            title="Click to switch vehicle model"
          >
            {vehicleType === 'satellite' ? '🛰️ NASA SATELLITE' : '🚜 APOLLO ROVER'}
          </button>
        </div>
      </div>

      {/* Lunar Track Simulator Viewport (Allows full mouse/cursor movement!) */}
      <div
        ref={trackRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative flex-1 min-h-[340px] rounded-2xl bg-gradient-to-b from-[#04060d] via-[#080c18] to-[#111726] border-2 border-cyan-500/50 overflow-hidden shadow-[inset_0_0_35px_rgba(0,0,0,0.95)] cursor-ew-resize"
      >
        {/* Progress Tracker Bar */}
        <div className="absolute top-3 left-6 right-6 h-2 rounded-full bg-slate-800/80 border border-slate-700 overflow-hidden z-20">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 transition-all duration-100"
            style={{ width: `${(distance / 2500) * 100}%` }}
          />
        </div>

        {/* Shield Hit Alert Flash */}
        <AnimatePresence>
          {shieldWarning && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute top-8 inset-x-0 mx-auto w-fit px-4 py-1.5 rounded-lg bg-rose-600/90 text-white font-mono text-xs font-bold border border-rose-300 shadow-xl z-30 animate-pulse"
            >
              {shieldWarning}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legend Overlay at Top Right */}
        <div className="absolute top-7 right-4 bg-black/80 border border-slate-700/80 rounded-lg p-2 text-[10px] font-mono z-20 hidden md:block">
          <div className="text-emerald-400 font-bold">✅ CAPTURE: 💎 🔷 🧪 🔋</div>
          <div className="text-amber-300 font-bold">⚠️ AVOID: 🕳️ 🪨 ☢️ ☄️ (3 LIVES)</div>
          <div className="text-cyan-300 text-[9px] mt-0.5">✦ MOVE CURSOR TO STEER</div>
        </div>

        {/* Soft Regolith Track Guidelines */}
        <div className="absolute inset-0 opacity-15 pointer-events-none flex justify-around">
          <div className="w-1 border-r border-dashed border-cyan-400" />
          <div className="w-1 border-r border-dashed border-cyan-400" />
          <div className="w-1 border-r border-dashed border-cyan-400" />
          <div className="w-1 border-r border-dashed border-cyan-400" />
        </div>

        {/* Falling Collectibles & Hazards (Slow floating rate) */}
        {hazards.map((h) => {
          const isGood = ['diamond', 'crystal', 'core', 'he3'].includes(h.type);
          return (
            <div
              key={h.id}
              className={`absolute -translate-x-1/2 -translate-y-1/2 text-3xl transition-all pointer-events-none ${
                isGood
                  ? 'filter drop-shadow-[0_0_15px_#34D399] animate-pulse'
                  : 'filter drop-shadow-[0_0_12px_#EF4444]'
              }`}
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
            >
              {h.type === 'diamond' ? '💎' :
               h.type === 'crystal' ? '🔷' :
               h.type === 'core' ? '🧪' :
               h.type === 'he3' ? '🔋' :
               h.type === 'crater' ? '🕳️' :
               h.type === 'boulder' ? '🪨' :
               h.type === 'fissure' ? '☢️' : '☄️'}
            </div>
          );
        })}

        {/* NASA Space Exploration Vehicle (Dedicated Animated Satellite or Lunar Rover) */}
        <div
          className={`absolute bottom-4 -translate-x-1/2 flex flex-col items-center pointer-events-none transition-all duration-75 z-20 ${
            invulnerable ? 'animate-pulse opacity-60' : 'opacity-100'
          }`}
          style={{ left: `${roverX}%` }}
        >
          {vehicleType === 'satellite' ? (
            /* Dedicated Animated NASA Lunar Satellite with active tractor scoop & solar panels */
            <div
              className={`relative transition-all duration-200 ${
                invulnerable
                  ? 'filter drop-shadow-[0_0_25px_#F59E0B]'
                  : isCollecting
                  ? 'filter drop-shadow-[0_0_30px_#10B981]'
                  : 'filter drop-shadow-[0_0_20px_rgba(0,240,255,0.7)]'
              }`}
            >
              <AnimatedLunarSatellite isCollecting={isCollecting} tilt={tilt} />
            </div>
          ) : (
            /* Apollo Lunar Roving Vehicle */
            <div
              className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 flex items-center justify-center overflow-hidden transition-all duration-200 ${
                invulnerable
                  ? 'border-yellow-400 bg-yellow-950/60 shadow-[0_0_30px_#F59E0B]'
                  : 'border-cyan-400 bg-black/85 shadow-[0_0_25px_rgba(0,240,255,0.7)]'
              }`}
            >
              <img
                src="/nasa/lunar-roving-vehicle.jpg"
                alt="Apollo Lunar Roving Vehicle"
                className="w-full h-full object-cover rounded-xl filter drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]"
              />
              <div className="absolute -bottom-2 w-10 h-3.5 bg-gradient-to-t from-cyan-400 via-sky-300 to-transparent rounded-full blur-sm animate-pulse" />
            </div>
          )}

          {/* Vehicle Identification & Shield Life Pill */}
          <div className="mt-1 flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-black/90 border border-cyan-400/60 text-[10px] font-mono font-bold text-cyan-300 shadow-md">
            <span>{vehicleType === 'satellite' ? '🛰️ LUNAR SATELLITE' : '🚜 APOLLO ROVER'}</span>
            <span className="text-rose-400">{'❤️'.repeat(lives)}</span>
          </div>
        </div>
      </div>

      {/* Steering Controls (Cursor Movement + Keyboard + Touch Buttons) */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 shrink-0">
        <div className="text-[11px] font-mono text-slate-400 text-center sm:text-left">
          💡 <strong>Controls:</strong> Move your <strong>Mouse / Cursor</strong> across the track to steer smoothly, or use keys / buttons below.
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => {
              sound.playClick('normal');
              setRoverX((x) => Math.max(12, x - 10));
            }}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold border border-cyan-500/40 active:scale-95 cursor-pointer shadow-lg flex items-center space-x-1.5"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span>LEFT (A)</span>
          </button>

          <button
            onClick={() => {
              sound.playClick('normal');
              setRoverX((x) => Math.min(88, x + 10));
            }}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold border border-cyan-500/40 active:scale-95 cursor-pointer shadow-lg flex items-center space-x-1.5"
          >
            <span>RIGHT (D)</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// GAME 2: ALSEP Lunar Seismology Lab (Audible Vibration Hum & Realistic Moonquake Audio)
// =========================================================================
function AlsepScienceGameInner({ onWin, onLose }) {
  const [filterFreq, setFilterFreq] = useState(15);
  const [gain, setGain] = useState(2);
  const [stage, setStage] = useState(1); // 3 stages across 3-5 minutes
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [analyzedQuakes, setAnalyzedQuakes] = useState([]);
  const [isCalibrated, setIsCalibrated] = useState(false);

  const stageTargets = [
    { stage: 1, name: "Thermal Quake (Sunrise Crustal Expansion)", targetFreq: 22, targetGain: 4, label: "Day/Night Thermal Tension" },
    { stage: 2, name: "Deep Tidal Moonquake (Earth Gravity Stress)", targetFreq: 45, targetGain: 7, label: "Sub-Crustal Tidal Shear" },
    { stage: 3, name: "Saturn V Rocket Impact Echo (Moon Rings Like a Bell)", targetFreq: 68, targetGain: 9, label: "Resonant Ringing Echo" },
  ];

  const currentStageInfo = stageTargets[stage - 1] || stageTargets[0];

  // Frequency audio synthesis: starts continuous live audible tone
  useEffect(() => {
    if (audioEnabled) {
      sound.startSeismicHum(filterFreq);
    } else {
      sound.stopSeismicHum();
    }
    return () => sound.stopSeismicHum();
  }, [audioEnabled]);

  // Update frequency live as slider moves
  const handleFreqChange = (newFreq) => {
    setFilterFreq(newFreq);
    if (audioEnabled) {
      sound.updateSeismicFreq(newFreq);
    }
  };

  // Calibration match check
  useEffect(() => {
    const freqMatch = Math.abs(filterFreq - currentStageInfo.targetFreq) <= 3;
    const gainMatch = Math.abs(gain - currentStageInfo.targetGain) <= 1;

    if (freqMatch && gainMatch) {
      setIsCalibrated(true);
    } else {
      setIsCalibrated(false);
    }
  }, [filterFreq, gain, stage, currentStageInfo]);

  // Lock In Moonquake Signature
  const handleLockMoonquake = () => {
    if (!isCalibrated) {
      sound.playClick('mars');
      return;
    }

    // Play authentic realistic seismic moonquake audio rumble!
    sound.playMoonquakeRumble();
    const updated = [...analyzedQuakes, currentStageInfo.name];
    setAnalyzedQuakes(updated);

    if (stage < 3) {
      setStage((s) => s + 1);
      setFilterFreq(15);
      setGain(2);
      setIsCalibrated(false);
    } else {
      setTimeout(() => {
        onWin(200);
      }, 1800);
    }
  };

  return (
    <div className="space-y-3 h-full flex flex-col justify-between">
      {/* Telemetry Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-900/90 p-3 rounded-xl border border-slate-700 text-xs font-mono gap-2 shrink-0">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-slate-300 font-bold">
            STAGE {stage} OF 3: <span className="text-amber-400">{currentStageInfo.name}</span>
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`px-3 py-1 rounded-lg text-[11px] font-bold border transition-all flex items-center space-x-1.5 cursor-pointer ${
              audioEnabled
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                : 'bg-slate-800 text-slate-500 border-slate-700'
            }`}
          >
            {audioEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{audioEnabled ? 'AUDIBLE VIBRATION: ON' : 'AUDIBLE VIBRATION: MUTED'}</span>
          </button>
          <span className="text-emerald-400 font-bold">RECORDED: {analyzedQuakes.length} / 3</span>
        </div>
      </div>

      {/* Seismogram Real-time Waveform Display */}
      <div className="relative flex-1 min-h-[280px] rounded-2xl bg-black border-2 border-cyan-500/50 p-4 flex flex-col justify-between overflow-hidden shadow-inner">
        <div className="flex justify-between items-center text-[10px] font-mono z-10">
          <span className="text-cyan-400">APOLLO PASSIVE SEISMIC EXPERIMENT (PSE) MONITOR // BANDPASS FFT</span>
          <span className={isCalibrated ? 'text-emerald-400 font-bold animate-pulse' : 'text-amber-400'}>
            {isCalibrated ? '🟢 RESONANT SEISMIC PEAK MATCHED! READY TO LOCK' : '🟡 TUNING FREQUENCY FILTER...'}
          </span>
        </div>

        {/* Dynamic Oscillating Waveform Graph */}
        <div className="flex-1 flex items-center justify-center space-x-1 sm:space-x-1.5 py-4">
          {Array.from({ length: 48 }).map((_, i) => {
            const h = isCalibrated
              ? 35 + Math.sin(i * 0.45) * 55
              : 12 + Math.random() * (filterFreq * 0.8 + gain * 5);
            return (
              <div
                key={i}
                className="w-1.5 sm:w-2 rounded-full transition-all duration-100"
                style={{
                  height: `${Math.min(95, Math.max(8, h))}%`,
                  backgroundColor: isCalibrated ? '#34D399' : '#00F0FF',
                  boxShadow: isCalibrated ? '0 0 12px #34D399' : 'none',
                }}
              />
            );
          })}
        </div>

        {/* Frequency & Resonance Telemetry */}
        <div className="flex justify-between text-[11px] font-mono text-slate-400 border-t border-slate-800 pt-2 z-10">
          <span>ACTIVE FREQUENCY: <strong className="text-white">{filterFreq} Hz</strong> (Target: ~{currentStageInfo.targetFreq} Hz)</span>
          <span>SIGNAL GAIN: <strong className="text-white">{gain}x</strong> (Target: ~{currentStageInfo.targetGain}x)</span>
          <span>ACOUSTIC PROPERTY: <strong className="text-cyan-300">Dry Lunar Regolith (High Q-Factor)</strong></span>
        </div>
      </div>

      {/* Frequency and Gain Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-900/90 border border-slate-700 shrink-0">
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-300 font-bold">1. BANDPASS FREQUENCY FILTER (AUDIO HEARABLE)</span>
            <span className="text-amber-400 font-bold">{filterFreq} Hz</span>
          </div>
          <input
            type="range"
            min="10"
            max="80"
            value={filterFreq}
            onChange={(e) => handleFreqChange(parseInt(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
          />
          <span className="text-[10px] text-slate-400 block font-mono">Target for {currentStageInfo.name}: ~{currentStageInfo.targetFreq} Hz</span>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-300 font-bold">2. SIGNAL AMPLITUDE GAIN</span>
            <span className="text-amber-400 font-bold">{gain}x</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={gain}
            onChange={(e) => setGain(parseInt(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
          />
          <span className="text-[10px] text-slate-400 block font-mono">Target Gain: ~{currentStageInfo.targetGain}x</span>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-end shrink-0">
        <button
          onClick={handleLockMoonquake}
          disabled={!isCalibrated}
          className={`px-8 py-3.5 rounded-xl font-mono text-xs font-extrabold tracking-widest transition-all cursor-pointer flex items-center space-x-2 ${
            isCalibrated
              ? 'bg-emerald-400 text-black shadow-[0_0_25px_rgba(52,211,153,0.6)] animate-pulse'
              : 'bg-slate-800 text-slate-500 border border-slate-700'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{stage < 3 ? `LOCK SIGNATURE &amp; HEAR MOONQUAKE (${stage}/3)` : 'VERIFY ALL MOONQUAKES &amp; COMPLETE'}</span>
        </button>
      </div>
    </div>
  );
}

// =========================================================================
// GAME 3: Ingenuity Mars Aerodynamic Flight Simulator (High Hardness & Distractions)
// =========================================================================
function IngenuityFlightGameInner({ onWin, onLose }) {
  const [altitude, setAltitude] = useState(3.0); // 0 to 12 meters
  const [posX, setPosX] = useState(15); // 10% to 90%
  const [rotorRPM, setRotorRPM] = useState(2500);
  const [battery, setBattery] = useState(100);
  const [gateIndex, setGateIndex] = useState(0);
  const [crosswind, setCrosswind] = useState(0); // -1.5 to +1.5
  const [dustDevilActive, setDustDevilActive] = useState(false);
  const [whiteoutActive, setWhiteoutActive] = useState(false);

  const waypoints = [
    { id: 1, x: 28, altMin: 3.5, altMax: 7.0, label: 'Gate 1: Wright Airfield' },
    { id: 2, x: 44, altMin: 4.5, altMax: 8.5, label: 'Gate 2: Séítah Dunes' },
    { id: 3, x: 60, altMin: 3.0, altMax: 6.5, label: 'Gate 3: Delta Scarp' },
    { id: 4, x: 76, altMin: 5.0, altMax: 9.0, label: 'Gate 4: Belva Crater' },
    { id: 5, x: 88, altMin: 1.5, altMax: 4.5, label: 'Gate 5: Touchdown Pad B' },
  ];

  // Random wind gusts and distractions loop
  useEffect(() => {
    const distTimer = setInterval(() => {
      // Wind gust changes
      const wind = (Math.random() - 0.5) * 2.8;
      setCrosswind(wind);

      // Dust devil hazard chance
      if (Math.random() < 0.25) {
        setDustDevilActive(true);
        setTimeout(() => setDustDevilActive(false), 3500);
      }

      // Dust storm whiteout chance
      if (Math.random() < 0.18) {
        setWhiteoutActive(true);
        setTimeout(() => setWhiteoutActive(false), 2500);
      }
    }, 4000);

    return () => clearInterval(distTimer);
  }, []);

  // Main flight physics tick
  useEffect(() => {
    const timer = setInterval(() => {
      // Gravity pulls down in thin atmosphere
      setAltitude((alt) => {
        let pull = 0.35;
        if (dustDevilActive) pull += (Math.random() - 0.5) * 1.2; // violent turbulence
        const nextAlt = Math.max(0, alt - pull);

        // Crash check
        if (nextAlt <= 0.2 && gateIndex < waypoints.length - 1) {
          clearInterval(timer);
          onLose("CRASHED ON MARTIAN SURFACE! Rotor blades struck crater boulders. Maintain altitude in the safe green corridor!");
        }
        return nextAlt;
      });

      // Crosswind pushes helicopter
      setPosX((x) => Math.min(92, Math.max(8, x + crosswind * 0.35)));

      // Battery consumption
      setBattery((b) => {
        if (b <= 1) {
          clearInterval(timer);
          onLose("Rotor battery depleted in thin air! Increase forward flight speed to clear gates before power drops.");
          return 0;
        }
        return b - 0.22;
      });

      // Waypoint passage check
      const currentGate = waypoints[gateIndex];
      if (currentGate) {
        if (Math.abs(posX - currentGate.x) < 7) {
          if (altitude >= currentGate.altMin && altitude <= currentGate.altMax) {
            sound.playDiscoveryFanfare();
            const nextIdx = gateIndex + 1;
            setGateIndex(nextIdx);
            if (nextIdx >= waypoints.length) {
              clearInterval(timer);
              onWin(300);
            }
          }
        }
      }
    }, 120);

    return () => clearInterval(timer);
  }, [posX, altitude, gateIndex, crosswind, dustDevilActive]);

  const handleThrust = () => {
    sound.playRotorBoost();
    setRotorRPM((rpm) => Math.min(2800, rpm + 50));
    setAltitude((alt) => Math.min(10.5, alt + 1.4));
  };

  const handleTilt = (dx) => {
    sound.playClick('normal');
    setPosX((x) => Math.min(92, Math.max(8, x + dx)));
  };

  return (
    <div className="space-y-3 h-full flex flex-col justify-between">
      {/* Telemetry Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono bg-slate-900/90 p-3 rounded-xl border border-slate-700 text-center shrink-0">
        <div>
          <span className="text-slate-400 block text-[10px]">ALTITUDE (RADAR)</span>
          <span className="text-cyan-400 font-bold">{altitude.toFixed(1)}m</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">TWIN ROTOR SPEED</span>
          <span className="text-emerald-400 font-bold">{rotorRPM} RPM</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">CROSSWIND SHEAR</span>
          <span className={`font-bold ${Math.abs(crosswind) > 1.0 ? 'text-amber-400 animate-pulse' : 'text-slate-300'}`}>
            {crosswind > 0 ? `+${crosswind.toFixed(1)} m/s ▶` : `${crosswind.toFixed(1)} m/s ◀`}
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">FLIGHT BATTERY</span>
          <span className={`font-bold ${battery < 25 ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`}>
            🔋 {Math.floor(battery)}%
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">GATES CLEARED</span>
          <span className="text-white font-bold">{gateIndex} / {waypoints.length}</span>
        </div>
      </div>

      {/* Flight Canvas Viewport */}
      <div className="relative flex-1 min-h-[300px] rounded-2xl bg-gradient-to-b from-[#240c0c] via-[#160606] to-[#080202] border-2 border-red-500/50 overflow-hidden shadow-inner">
        {/* Dust Storm Whiteout Effect */}
        {whiteoutActive && (
          <div className="absolute inset-0 bg-amber-800/40 backdrop-blur-sm z-30 flex items-center justify-center pointer-events-none">
            <span className="px-4 py-2 rounded-lg bg-black/80 border border-amber-500 text-amber-300 font-mono text-xs font-bold animate-pulse">
              🌫️ DUST STORM WHITEOUT ACTIVE: FLY BY RADAR INSTRUMENTS!
            </span>
          </div>
        )}

        {/* Dust Devil Warning */}
        {dustDevilActive && (
          <div className="absolute top-4 left-6 px-3 py-1 rounded bg-red-950/80 border border-red-500 text-red-300 font-mono text-[11px] font-bold z-20 animate-pulse">
            🌪️ MARTIAN DUST DEVIL IN FLIGHT PATH! CORRECTING FOR TURBULENCE
          </div>
        )}

        {/* Safe Corridor Guide Band */}
        <div className="absolute inset-x-0 top-16 bottom-20 bg-emerald-500/10 border-y border-dashed border-emerald-500/30 flex items-center justify-between px-4 pointer-events-none">
          <span className="text-[10px] font-mono text-emerald-400/80">RECOMMENDED CRUISE CORRIDOR (3.5m - 8.5m)</span>
        </div>

        {/* Waypoint Flight Gates */}
        {waypoints.map((gate, i) => (
          <div
            key={gate.id}
            className={`absolute -translate-x-1/2 w-14 border-2 rounded-xl flex flex-col items-center justify-center text-center transition-all ${
              i < gateIndex
                ? 'border-emerald-400 bg-emerald-950/50 text-emerald-300'
                : i === gateIndex
                ? 'border-amber-400 bg-amber-950/50 text-amber-200 animate-pulse'
                : 'border-slate-700 bg-slate-900/40 text-slate-500'
            }`}
            style={{
              left: `${gate.x}%`,
              top: `${(11 - gate.altMax) * 8.5}%`,
              bottom: `${gate.altMin * 8.5}%`,
            }}
          >
            <span className="text-[8px] font-mono font-bold leading-tight">{gate.label}</span>
          </div>
        ))}

        {/* Ingenuity Mars Helicopter */}
        <div
          className="absolute -translate-x-1/2 transition-all duration-75 flex flex-col items-center pointer-events-none z-10"
          style={{
            left: `${posX}%`,
            bottom: `${altitude * 8.5}%`,
          }}
        >
          <div className="w-16 h-1 bg-emerald-400 rounded-full animate-spin shadow-[0_0_8px_#34D399]" />
          <span className="text-4xl filter drop-shadow-[0_0_15px_#10B981]">🚁</span>
          <span className="text-[10px] font-mono text-emerald-300 font-bold bg-black/70 px-1 rounded">
            {altitude.toFixed(1)}m
          </span>
        </div>
      </div>

      {/* Flight Control Deck */}
      <div className="grid grid-cols-3 gap-3 shrink-0">
        <button
          onClick={() => handleTilt(-10)}
          className="py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold border border-slate-700 cursor-pointer shadow-lg active:scale-95"
        >
          ◀ TILT LEFT
        </button>
        <button
          onClick={handleThrust}
          className="py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-mono text-xs font-extrabold border border-emerald-400 cursor-pointer shadow-[0_0_20px_rgba(52,211,153,0.6)] active:scale-95"
        >
          ▲ ROTOR THRUST (CLIMB)
        </button>
        <button
          onClick={() => handleTilt(10)}
          className="py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold border border-slate-700 cursor-pointer shadow-lg active:scale-95"
        >
          TILT RIGHT ▶
        </button>
      </div>
    </div>
  );
}

// =========================================================================
// GAME 4: Opportunity Rock Sample Expedition (8x8 Tactical Grid & Spectrometer)
// =========================================================================
function MarsRoverGameInner({ onWin, onLose }) {
  const [roverPos, setRoverPos] = useState({ r: 6, c: 1 });
  const [battery, setBattery] = useState(100);
  const [sector, setSector] = useState(1);
  const [scannedTarget, setScannedTarget] = useState(null);
  const [collectedBlueberries, setCollectedBlueberries] = useState(0);

  const targets = [
    { r: 2, c: 2, name: 'Hematite Blueberry Outcrop', icon: '🫐', mineral: 'Iron Oxide (Liquid Water Formed)', collected: false },
    { r: 1, c: 5, name: 'Esperance Gypsum Bedrock', icon: '🧂', mineral: 'Calcium Sulfate Vein', collected: false },
    { r: 4, c: 6, name: 'Smectite Clay Strata', icon: '🏺', mineral: 'Hydrated Silicate Clay', collected: false },
    { r: 5, c: 3, name: 'Heat Shield Iron Meteorite', icon: '☄️', mineral: 'Kamacite Nickel-Iron', collected: false },
  ];

  const obstacles = [
    { r: 3, c: 2, label: '🪨 Basalt Pinnacle' },
    { r: 3, c: 5, label: '🪨 Sharp Ejecta' },
    { r: 4, c: 4, label: '⚠️ Purgatory Sand Dune' },
    { r: 6, c: 4, label: '⚠️ Soft Drift' },
  ];

  const dustDevils = [
    { r: 2, c: 6, label: '🌬️ Solar Cleaning Gust' },
    { r: 5, c: 1, label: '🌬️ Solar Cleaning Gust' },
  ];

  const handleMove = (dr, dc) => {
    const nextR = Math.max(0, Math.min(7, roverPos.r + dr));
    const nextC = Math.max(0, Math.min(7, roverPos.c + dc));

    // Obstacle / Sand Dune Check
    const obstacle = obstacles.find((o) => o.r === nextR && o.c === nextC);
    if (obstacle) {
      if (obstacle.label.includes('Dune')) {
        sound.playClick('mars');
        setBattery((b) => Math.max(0, b - 15)); // Sand trap drains extra torque
      } else {
        sound.playClick('mars');
        return;
      }
    }

    // Solar Cleaning Gust
    const gust = dustDevils.find((g) => g.r === nextR && g.c === nextC);
    if (gust) {
      sound.playDiscoveryFanfare();
      setBattery(100);
    } else {
      setBattery((b) => Math.max(0, b - 4));
    }

    sound.playClick('normal');
    setRoverPos({ r: nextR, c: nextC });

    // Battery depletion check
    if (battery <= 5) {
      onLose("Opportunity rover battery depleted in the dust! Catch cleaning breezes or avoid sand dunes to conserve solar energy.");
    }
  };

  // Deploy Rock Abrasion Tool (RAT) & Spectrometer
  const handleDeploySpectrometer = () => {
    // Check adjacent target (distance <= 1)
    const target = targets.find(
      (t) => Math.abs(t.r - roverPos.r) <= 1 && Math.abs(t.c - roverPos.c) <= 1 && !t.collected
    );

    if (target) {
      sound.playSpectrometerScan();
      setScannedTarget(target);
      target.collected = true;
      const count = collectedBlueberries + 1;
      setCollectedBlueberries(count);

      if (count >= targets.length) {
        setTimeout(() => onWin(260), 1500);
      }
    } else {
      sound.playClick('mars');
    }
  };

  return (
    <div className="space-y-3 h-full flex flex-col justify-between">
      {/* Telemetry Header */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono bg-slate-900/90 p-3 rounded-xl border border-slate-700 text-center shrink-0">
        <div>
          <span className="text-slate-400 block text-[10px]">WATER MINERALS DRILLED</span>
          <span className="text-amber-400 font-bold">{collectedBlueberries} / {targets.length} Sites</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">SOLAR BATTERY</span>
          <span className={`font-bold ${battery < 25 ? 'text-rose-400 animate-pulse' : 'text-cyan-400'}`}>
            🔋 {battery}%
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">CURRENT ROVER TOOLS</span>
          <span className="text-emerald-300 font-bold">APXS Spectrometer &amp; RAT</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">LAST SPECTRUM</span>
          <span className="text-purple-300 font-bold truncate">
            {scannedTarget ? scannedTarget.mineral : 'Awaiting Scan'}
          </span>
        </div>
      </div>

      {/* 8x8 Tactical Geological Grid Map */}
      <div className="grid grid-cols-8 gap-1.5 p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-[#1b0808] to-[#0c0303] border-2 border-amber-500/50 flex-1 min-h-[300px]">
        {Array.from({ length: 8 }).map((_, r) =>
          Array.from({ length: 8 }).map((_, c) => {
            const isRover = roverPos.r === r && roverPos.c === c;
            const target = targets.find((t) => t.r === r && t.c === c);
            const obstacle = obstacles.find((o) => o.r === r && o.c === c);
            const gust = dustDevils.find((g) => g.r === r && g.c === c);

            return (
              <div
                key={`${r}-${c}`}
                className={`rounded-lg border flex flex-col items-center justify-center text-lg sm:text-xl transition-all ${
                  isRover
                    ? 'border-cyan-400 bg-cyan-950/80 shadow-[0_0_15px_#00F0FF] scale-105 z-10'
                    : obstacle
                    ? 'border-red-900/60 bg-red-950/30 text-red-400'
                    : gust
                    ? 'border-sky-500/50 bg-sky-950/30 text-sky-300 animate-pulse'
                    : target
                    ? target.collected
                      ? 'border-emerald-500 bg-emerald-950/50 text-emerald-400'
                      : 'border-amber-400 bg-amber-950/50 text-amber-300 animate-bounce'
                    : 'border-slate-800/80 bg-black/40 text-slate-700'
                }`}
              >
                {isRover ? '🤖' : obstacle ? (obstacle.label.includes('Dune') ? '🏜️' : '🪨') : gust ? '🌬️' : target ? target.icon : '·'}
              </div>
            );
          })
        )}
      </div>

      {/* Controls: D-Pad and Spectrometer Arm */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 shrink-0">
        <button
          onClick={handleDeploySpectrometer}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-mono text-xs font-extrabold tracking-wider border border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.5)] cursor-pointer active:scale-95 flex items-center justify-center space-x-2"
        >
          <Zap className="w-4 h-4 fill-black" />
          <span>DEPLOY SPECTROMETER &amp; DRILL ADJACENT ROCK</span>
        </button>

        {/* D-Pad */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleMove(0, -1)}
            className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold text-xs border border-slate-700 cursor-pointer"
          >
            ◀ WEST
          </button>
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => handleMove(-1, 0)}
              className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold text-xs border border-slate-700 cursor-pointer"
            >
              ▲ NORTH
            </button>
            <button
              onClick={() => handleMove(1, 0)}
              className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold text-xs border border-slate-700 cursor-pointer"
            >
              ▼ SOUTH
            </button>
          </div>
          <button
            onClick={() => handleMove(0, 1)}
            className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold text-xs border border-slate-700 cursor-pointer"
          >
            EAST ▶
          </button>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// GAME 5: InSight Listen to Mars (Audible Heartbeat of the Red Planet)
// =========================================================================
function InsightSeismicGameInner({ onWin, onLose }) {
  const [shieldDeployed, setShieldDeployed] = useState(false);
  const [frequency, setFrequency] = useState(15); // target: 38-42 Hz
  const [heartbeatAudible, setHeartbeatAudible] = useState(true);
  const [layersAnalyzed, setLayersAnalyzed] = useState({ crust: false, mantle: false, core: false });

  const isFrequencyTuned = frequency >= 38 && frequency <= 42;

  // Start audible heartbeat of Mars
  useEffect(() => {
    if (heartbeatAudible) {
      sound.startMarsHeartbeat();
    } else {
      sound.stopMarsHeartbeat();
    }
    return () => sound.stopMarsHeartbeat();
  }, [heartbeatAudible]);

  const handleDeployShield = () => {
    sound.playClick('normal');
    setShieldDeployed(true);
    setLayersAnalyzed((prev) => ({ ...prev, crust: true }));
  };

  const handleSoundCore = () => {
    if (!shieldDeployed || !isFrequencyTuned) {
      sound.playClick('mars');
      return;
    }

    sound.playDiscoveryFanfare();
    setLayersAnalyzed({ crust: true, mantle: true, core: true });
    setTimeout(() => {
      onWin(250);
    }, 1800);
  };

  return (
    <div className="space-y-3 h-full flex flex-col justify-between">
      {/* Telemetry Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-900/90 p-3 rounded-xl border border-slate-700 text-xs font-mono gap-2 shrink-0">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-rose-500 animate-ping" />
          <span className="text-slate-300 font-bold">
            SEIS INSTRUMENT // <span className="text-rose-400">PLANETARY HEARTBEAT ACOUSTICS</span>
          </span>
        </div>
        <button
          onClick={() => setHeartbeatAudible(!heartbeatAudible)}
          className={`px-3 py-1 rounded-lg text-[11px] font-bold border transition-all flex items-center space-x-1.5 cursor-pointer ${
            heartbeatAudible
              ? 'bg-rose-500/20 text-rose-300 border-rose-400'
              : 'bg-slate-800 text-slate-500 border-slate-700'
          }`}
        >
          {heartbeatAudible ? <Volume2 className="w-3.5 h-3.5 text-rose-400" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span>{heartbeatAudible ? 'MARTIAN HEARTBEAT SOUND: ON' : 'HEARTBEAT SOUND: MUTED'}</span>
        </button>
      </div>

      {/* Planetary Heartbeat & Seismogram Monitor */}
      <div className="relative flex-1 min-h-[280px] rounded-2xl bg-black border-2 border-rose-500/50 p-4 flex flex-col justify-between overflow-hidden shadow-inner">
        <div className="flex justify-between items-center text-[10px] font-mono z-10">
          <span className="text-rose-400">CERBERUS FOSSAE SEISMIC PULSE (MAGNITUDE 5.0 MARSQUAKE)</span>
          <span className={layersAnalyzed.core ? 'text-emerald-400 font-bold animate-pulse' : 'text-amber-400'}>
            {layersAnalyzed.core ? '🟢 MOLTEN CORE PULSE IDENTIFIED' : isFrequencyTuned ? '🟡 CORE P-WAVE TUNED' : '🔴 SURFACE NOISE INTERFERENCE'}
          </span>
        </div>

        {/* Dynamic Heartbeat Waveform Display */}
        <div className="flex-1 flex items-center justify-center space-x-1.5 py-4">
          {Array.from({ length: 44 }).map((_, i) => {
            const h = layersAnalyzed.core
              ? 35 + Math.sin(i * 0.4) * 60
              : isFrequencyTuned && shieldDeployed
              ? 25 + Math.sin(i * 0.3) * 45
              : 10 + Math.random() * 85;
            return (
              <div
                key={i}
                className="w-1.5 sm:w-2 rounded-full transition-all duration-100"
                style={{
                  height: `${Math.min(95, Math.max(8, h))}%`,
                  backgroundColor: layersAnalyzed.core ? '#34D399' : isFrequencyTuned ? '#F59E0B' : '#EF4444',
                  boxShadow: layersAnalyzed.core ? '0 0 15px #34D399' : isFrequencyTuned ? '0 0 10px #F59E0B' : 'none',
                }}
              />
            );
          })}
        </div>

        {/* Layer Sounding Status */}
        <div className="grid grid-cols-3 gap-2 border-t border-slate-800 pt-2 text-[10px] font-mono text-center z-10">
          <div className={layersAnalyzed.crust ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
            LAYER 1: CRUST (50 KM) {layersAnalyzed.crust ? '✓' : '...'}
          </div>
          <div className={isFrequencyTuned ? 'text-amber-400 font-bold' : 'text-slate-500'}>
            LAYER 2: MANTLE PLUME {isFrequencyTuned ? '✓' : '...'}
          </div>
          <div className={layersAnalyzed.core ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
            LAYER 3: MOLTEN CORE (1830 KM) {layersAnalyzed.core ? '✓' : '...'}
          </div>
        </div>
      </div>

      {/* 2-Step Interactive Diagnostic Deck */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-900/90 border border-slate-700 shrink-0">
        {/* Step 1: Shield Dome */}
        <div className="space-y-1.5">
          <span className="text-xs font-mono text-slate-300 font-bold block">
            STEP 1: WIND &amp; THERMAL SHIELD (WTS DOME)
          </span>
          <button
            onClick={handleDeployShield}
            disabled={shieldDeployed}
            className={`w-full py-3 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              shieldDeployed
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500'
                : 'bg-cyan-500 text-black hover:bg-cyan-400'
            }`}
          >
            {shieldDeployed ? '✓ SHIELD DOME DEPLOYED (WIND NOISE CUT)' : 'DEPLOY AERODYNAMIC SHIELD DOME'}
          </button>
        </div>

        {/* Step 2: Bandpass Tuning */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-300 font-bold">STEP 2: CORE BANDPASS FILTER</span>
            <span className="text-amber-400 font-bold">{frequency} Hz</span>
          </div>
          <input
            type="range"
            min="10"
            max="80"
            value={frequency}
            onChange={(e) => setFrequency(parseInt(e.target.value))}
            className="w-full accent-rose-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
          />
          <span className="text-[10px] text-slate-400 block font-mono">Target: 38-42 Hz (Core Reflective P-Waves)</span>
        </div>
      </div>

      {/* Final Triangulation Button */}
      <div className="flex justify-end shrink-0">
        <button
          onClick={handleSoundCore}
          disabled={!shieldDeployed || !isFrequencyTuned}
          className={`px-8 py-3.5 rounded-xl font-mono text-xs font-extrabold tracking-widest transition-all cursor-pointer flex items-center space-x-2 ${
            shieldDeployed && isFrequencyTuned
              ? 'bg-rose-500 text-white shadow-[0_0_25px_rgba(244,63,94,0.6)] animate-pulse'
              : 'bg-slate-800 text-slate-500 border border-slate-700'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>TRIANGULATE MARS LIQUID CORE HEARTBEAT</span>
        </button>
      </div>
    </div>
  );
}

// =========================================================================
// GAME 6: Kepler Exoplanet Transit Hunter (Explainable & Logical Light Curve Analysis)
// =========================================================================
function KeplerTransitGameInner({ onWin, onLose }) {
  const [systemIndex, setSystemIndex] = useState(0);
  const [time, setTime] = useState(0);
  const [markedTransit, setMarkedTransit] = useState(false);
  const [measuredDepth, setMeasuredDepth] = useState(0.12);
  const [confirmedPlanets, setConfirmedPlanets] = useState([]);

  const candidateStars = [
    {
      id: 1,
      star: "Kepler-452 (G2-Type Sun-Like)",
      planet: "Kepler-452b",
      desc: "Earth's Older Cousin (1.6x Earth Radius)",
      period: "385 Days",
      targetDepth: 0.12,
      habitable: true,
    },
    {
      id: 2,
      star: "Kepler-186 (M1-Type Red Dwarf)",
      planet: "Kepler-186f",
      desc: "First Validated Earth-Sized Planet in Habitable Zone",
      period: "130 Days",
      targetDepth: 0.04,
      habitable: true,
    },
    {
      id: 3,
      star: "Kepler-22 (G5-Type Yellow Dwarf)",
      planet: "Kepler-22b",
      desc: "Water Ocean World in Habitable Zone (2.4x Earth Radius)",
      period: "290 Days",
      targetDepth: 0.22,
      habitable: true,
    },
  ];

  const currentCandidate = candidateStars[systemIndex] || candidateStars[0];

  // Orbital revolution tick
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((t) => (t + 1) % 100);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Transit dip occurs between time 42 and 58
  const isTransitDip = time >= 42 && time <= 58;
  const stellarFlux = isTransitDip
    ? 100.0 - currentCandidate.targetDepth * 10
    : 100.0;

  const handleMarkDip = () => {
    if (isTransitDip) {
      sound.playDiscoveryFanfare();
      setMarkedTransit(true);
    } else {
      sound.playClick('mars');
    }
  };

  const handleConfirmExoplanet = () => {
    sound.playDiscoveryFanfare();
    const updated = [...confirmedPlanets, currentCandidate.planet];
    setConfirmedPlanets(updated);

    if (systemIndex < 2) {
      setSystemIndex((s) => s + 1);
      setMarkedTransit(false);
      setTime(0);
    } else {
      setTimeout(() => {
        onWin(280);
      }, 1500);
    }
  };

  return (
    <div className="space-y-3 h-full flex flex-col justify-between">
      {/* Telemetry Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-900/90 p-3 rounded-xl border border-slate-700 text-xs font-mono gap-2 shrink-0">
        <div>
          <span className="text-slate-400">OBSERVING TARGET: </span>
          <strong className="text-cyan-400">{currentCandidate.star}</strong>
        </div>
        <div>
          <span className="text-slate-400">PLANET: </span>
          <strong className="text-amber-300">{currentCandidate.planet}</strong> ({currentCandidate.desc})
        </div>
        <div className="text-emerald-400 font-bold">
          CONFIRMED: {confirmedPlanets.length} / 3 CANDIDATES
        </div>
      </div>

      {/* Star Optical Field & Live Transit Graph */}
      <div className="relative flex-1 min-h-[280px] rounded-2xl bg-black border-2 border-cyan-500/50 p-4 flex flex-col justify-between overflow-hidden shadow-inner">
        {/* Star & Orbiting Planet Visual */}
        <div className="relative w-full h-28 flex items-center justify-center">
          <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-amber-100 via-amber-300 to-yellow-500 shadow-[0_0_50px_#F59E0B] flex items-center justify-center overflow-hidden">
            {/* Solar Surface Granules */}
            <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:8px_8px]" />

            {/* Transiting Planet Disc crossing the Star */}
            <div
              className="absolute w-6 h-6 rounded-full bg-black border border-slate-700 shadow-2xl transition-all duration-75"
              style={{ left: `${time}%` }}
            />
          </div>
        </div>

        {/* Real-Time Light Curve Telemetry Graph */}
        <div className="bg-slate-950/90 p-3 rounded-xl border border-slate-800 space-y-2 z-10">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-400">STELLAR FLUX BRIGHTNESS</span>
            <span className={isTransitDip ? 'text-amber-400 font-bold animate-pulse' : 'text-cyan-400'}>
              {stellarFlux.toFixed(2)}% {isTransitDip && '▼ TRANSIT DIP DETECTED!'}
            </span>
            <span className="text-emerald-400 font-bold">ORBITAL PERIOD: {currentCandidate.period} (HABITABLE ZONE)</span>
          </div>

          {/* Light Curve Graph Points */}
          <div className="h-12 w-full flex items-end space-x-1 border-b border-l border-slate-700 px-2 pb-1">
            {Array.from({ length: 40 }).map((_, i) => {
              const inDip = i >= 17 && i <= 23;
              const h = inDip ? 40 : 85;
              return (
                <div
                  key={i}
                  className={`flex-1 rounded-sm transition-all ${
                    inDip ? 'bg-amber-400 shadow-[0_0_8px_#F59E0B]' : 'bg-cyan-500/60'
                  }`}
                  style={{ height: `${h}%` }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Logical 2-Step Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 shrink-0">
        <button
          onClick={handleMarkDip}
          disabled={markedTransit}
          className={`py-3.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-2 ${
            markedTransit
              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500'
              : 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.4)]'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{markedTransit ? `✓ DIP MARKED (ΔF/F = ${currentCandidate.targetDepth}%)` : 'STEP 1: MARK TRANSIT DIP WHILE PLANET CROSSES'}</span>
        </button>

        <button
          onClick={handleConfirmExoplanet}
          disabled={!markedTransit}
          className={`py-3.5 rounded-xl font-mono text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center space-x-2 ${
            markedTransit
              ? 'bg-amber-400 text-black hover:bg-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.6)] animate-pulse'
              : 'bg-slate-800 text-slate-500 border border-slate-700'
          }`}
        >
          <Sparkles className="w-4 h-4 fill-black" />
          <span>{systemIndex < 2 ? `STEP 2: CONFIRM HABITABLE EXOPLANET (${systemIndex + 1}/3)` : 'STEP 2: CONFIRM ALL &amp; COMPLETE'}</span>
        </button>
      </div>
    </div>
  );
}
