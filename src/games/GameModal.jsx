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
  Satellite,
  Target,
  Send,
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
  const [gateIndex, setGateIndex] = useState(0);
  const [crosswind, setCrosswind] = useState(0); // -1.5 to +1.5
  const [dustDevilActive, setDustDevilActive] = useState(false);
  const [whiteoutActive, setWhiteoutActive] = useState(false);

  // 2-Minute Flight Window Time Limit (120 seconds)
  const [timeLeft, setTimeLeft] = useState(120);

  const waypoints = [
    { id: 1, x: 28, altMin: 3.5, altMax: 7.0, label: 'Gate 1: Wright Airfield' },
    { id: 2, x: 44, altMin: 4.5, altMax: 8.5, label: 'Gate 2: Séítah Dunes' },
    { id: 3, x: 60, altMin: 3.0, altMax: 6.5, label: 'Gate 3: Delta Scarp' },
    { id: 4, x: 76, altMin: 5.0, altMax: 9.0, label: 'Gate 4: Belva Crater' },
    { id: 5, x: 88, altMin: 1.5, altMax: 4.5, label: 'Gate 5: Touchdown Pad B' },
  ];

  // 2-Minute Countdown Timer Loop (Game is governed by time limit)
  useEffect(() => {
    const clockInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(clockInterval);
          onLose("MISSION TIME EXPIRED! The 2-minute flight window closed. Relaunch Ingenuity to complete all 5 waypoints within the time limit.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(clockInterval);
  }, [onLose]);

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
        let pull = 0.32;
        if (dustDevilActive) pull += (Math.random() - 0.5) * 1.1; // violent turbulence
        // Touch down safely on baseline (0m) without aborting!
        const nextAlt = Math.max(0, alt - pull);
        return nextAlt;
      });

      // Crosswind pushes helicopter
      setPosX((x) => Math.min(92, Math.max(8, x + crosswind * 0.35)));

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
  }, [posX, altitude, gateIndex, crosswind, dustDevilActive, onWin]);

  const handleThrust = () => {
    sound.playRotorBoost();
    setRotorRPM((rpm) => Math.min(2800, rpm + 50));
    setAltitude((alt) => Math.min(10.5, alt + 1.4));
  };

  const handleTilt = (dx) => {
    sound.playClick('normal');
    setPosX((x) => Math.min(92, Math.max(8, x + dx)));
  };

  // Keyboard navigation controls for desktop
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'ArrowUp' || e.code === 'Space') {
        e.preventDefault();
        handleThrust();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handleTilt(-7);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleTilt(7);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const batteryPercent = Math.max(0, Math.floor((timeLeft / 120) * 100));

  return (
    <div className="space-y-3 h-full flex flex-col justify-between">
      {/* Telemetry Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono bg-slate-900/90 p-3 rounded-xl border border-slate-700 text-center shrink-0">
        <div>
          <span className="text-slate-400 block text-[10px]">MISSION CLOCK (2 MIN)</span>
          <span className={`font-bold font-mono ${timeLeft < 25 ? 'text-rose-400 animate-pulse' : timeLeft < 50 ? 'text-amber-400' : 'text-emerald-300'}`}>
            ⏱️ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">ALTITUDE (RADAR)</span>
          <span className={`font-bold ${altitude === 0 ? 'text-amber-400' : 'text-cyan-400'}`}>
            {altitude === 0 ? '0.0m [BASELINE]' : `${altitude.toFixed(1)}m`}
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">TWIN ROTOR SPEED</span>
          <span className="text-emerald-400 font-bold">{altitude === 0 ? '2000 RPM (IDLE)' : `${rotorRPM} RPM`}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">FLIGHT BATTERY</span>
          <span className={`font-bold ${batteryPercent < 25 ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`}>
            🔋 {batteryPercent}%
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">GATES CLEARED</span>
          <span className="text-white font-bold">{gateIndex} / {waypoints.length}</span>
        </div>
      </div>

      {/* Flight Canvas Viewport */}
      <div className="relative flex-1 min-h-[300px] rounded-2xl bg-gradient-to-b from-[#240c0c] via-[#160606] to-[#080202] border-2 border-red-500/50 overflow-hidden shadow-inner">
        {/* Baseline Landing Skid Guide Notification */}
        {altitude === 0 && (
          <div className="absolute bottom-3 inset-x-0 z-30 flex justify-center pointer-events-none">
            <span className="px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-400/80 text-amber-300 font-mono text-[11px] font-bold shadow-lg flex items-center space-x-1.5 animate-bounce">
              <span>🛬 TOUCHDOWN ON BASELINE</span>
              <span className="text-slate-400">•</span>
              <span className="text-white">PRESS [▲ THRUST / SPACE] TO LIFT OFF!</span>
            </span>
          </div>
        )}

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
// GAME 4: Opportunity's Mars Blueberry Hunt (Kid-Friendly Rover Adventure)
// =========================================================================
function MarsRoverGameInner({ onWin, onLose }) {
  // Grid size: 6 rows x 7 columns (fits perfectly in any screen height)
  const ROWS = 6;
  const COLS = 7;

  // Initial Game State
  const [roverPos, setRoverPos] = useState({ r: 4, c: 1 });
  const [facing, setFacing] = useState('right'); // 'left', 'right', 'up', 'down'
  const [battery, setBattery] = useState(100);
  const [score, setScore] = useState(0);
  const [oppyMood, setOppyMood] = useState('happy'); // 'happy', 'excited', 'oops'
  const [speechBubble, setSpeechBubble] = useState("Hi! I'm Oppy! Help me find 5 Martian Blueberries! 🫐");

  // Collectible Blueberries (5 scattered across Mars)
  const [blueberries, setBlueberries] = useState([
    { id: 1, r: 1, c: 2, collected: false },
    { id: 2, r: 1, c: 5, collected: false },
    { id: 3, r: 3, c: 3, collected: false },
    { id: 4, r: 4, c: 5, collected: false },
    { id: 5, r: 2, c: 0, collected: false },
  ]);

  // Batteries (Recharge solar power)
  const [batteries, setBatteries] = useState([
    { id: 1, r: 0, c: 4, collected: false },
    { id: 2, r: 5, c: 3, collected: false },
  ]);

  // Whirly Dust Devils (Fun cleaning boosts)
  const [dustDevils] = useState([
    { id: 1, r: 2, c: 2 },
    { id: 2, r: 4, c: 6 },
  ]);

  // Rocks / Boulders (Obstacles you gently bump into)
  const [rocks] = useState([
    { r: 2, c: 4 },
    { r: 3, c: 1 },
    { r: 0, c: 1 },
    { r: 4, c: 3 },
  ]);

  // Victory Flag (Appears at row 0, col 6 once all 5 berries are found)
  const flagPos = { r: 0, c: 6 };

  const collectedCount = blueberries.filter((b) => b.collected).length;
  const allBerriesCollected = collectedCount === blueberries.length;

  // Move Oppy
  const handleMove = (dr, dc) => {
    const nextR = roverPos.r + dr;
    const nextC = roverPos.c + dc;

    // Check boundaries
    if (nextR < 0 || nextR >= ROWS || nextC < 0 || nextC >= COLS) {
      sound.playClick('mars');
      setSpeechBubble("Woah, that's the edge of the crater! Let's turn around! 🚀");
      setOppyMood('oops');
      return;
    }

    // Check rock collision
    const isRock = rocks.some((rock) => rock.r === nextR && rock.c === nextC);
    if (isRock) {
      sound.playClick('mars');
      setSpeechBubble("Boop! A Martian rock! Let's drive around it! 🪨");
      setOppyMood('oops');
      return;
    }

    // Determine direction facing
    if (dc > 0) setFacing('right');
    else if (dc < 0) setFacing('left');
    else if (dr < 0) setFacing('up');
    else if (dr > 0) setFacing('down');

    // Move rover
    setRoverPos({ r: nextR, c: nextC });
    setBattery((b) => Math.max(5, b - 2)); // Tiny gentle drain

    // Check Blueberry collection
    const berryIndex = blueberries.findIndex(
      (b) => !b.collected && b.r === nextR && b.c === nextC
    );
    if (berryIndex !== -1) {
      sound.playGemCollect();
      const updated = [...blueberries];
      updated[berryIndex].collected = true;
      setBlueberries(updated);
      setScore((s) => s + 100);
      setOppyMood('excited');

      const newCount = collectedCount + 1;
      if (newCount >= blueberries.length) {
        sound.playDiscoveryFanfare();
        setSpeechBubble("YAY! ALL 5 BLUEBERRIES FOUND! 🎉 Now drive to the NASA Flag to WIN! 🏁");
      } else {
        const funFacts = [
          "Yum! A Martian Blueberry! Water formed these billions of years ago! 🫐",
          "Awesome job! Blueberries are made of hematite minerals! 🫐",
          "High five! That's another ancient water treasure! 🫐",
          "Super driving! NASA found these real blueberries on Mars in 2004! 🫐",
        ];
        setSpeechBubble(funFacts[newCount % funFacts.length]);
      }
      return;
    }

    // Check Battery recharge
    const batIndex = batteries.findIndex(
      (b) => !b.collected && b.r === nextR && b.c === nextC
    );
    if (batIndex !== -1) {
      sound.playDiscoveryFanfare();
      const updatedBats = [...batteries];
      updatedBats[batIndex].collected = true;
      setBatteries(updatedBats);
      setBattery(100);
      setScore((s) => s + 50);
      setOppyMood('excited');
      setSpeechBubble("⚡ ZAP! Solar power boosted to 100%! Zoom zoom! 🔋");
      return;
    }

    // Check Dust Devil whirl
    const isWhirlwind = dustDevils.some((g) => g.r === nextR && g.c === nextC);
    if (isWhirlwind) {
      sound.playRotorBoost();
      setBattery(100);
      setScore((s) => s + 50);
      setOppyMood('excited');
      setSpeechBubble("🌪️ Wheee! A friendly Martian whirlwind cleaned our solar panels! ⚡");
      return;
    }

    // Check Victory Flag reach
    if (allBerriesCollected && nextR === flagPos.r && nextC === flagPos.c) {
      sound.playDiscoveryFanfare();
      setSpeechBubble("🏆 MISSION COMPLETE! You and Oppy proved Mars had water! 🌟");
      setTimeout(() => {
        onWin(300);
      }, 1500);
      return;
    }

    // Normal step
    sound.playClick('normal');
    setOppyMood('happy');
  };

  // Click on tile to move toward it
  const handleTileClick = (r, c) => {
    const dr = r - roverPos.r;
    const dc = c - roverPos.c;
    // If adjacent tile (orthogonal)
    if (Math.abs(dr) + Math.abs(dc) === 1) {
      handleMove(dr, dc);
    } else if (dr === 0 && dc === 0) {
      setSpeechBubble("Beep boop! That's me, Oppy! Tap the arrows to drive! 🤖");
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        handleMove(-1, 0);
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        handleMove(1, 0);
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        handleMove(0, -1);
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        handleMove(0, 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [roverPos, blueberries, batteries, collectedCount, allBerriesCollected]);

  return (
    <div className="h-full flex flex-col justify-between select-none max-w-2xl mx-auto w-full px-2 py-1">
      {/* 1. Kid-Friendly Score & Mission Goal Bar */}
      <div className="bg-slate-900/95 border-2 border-amber-500/60 rounded-xl p-2.5 shadow-md flex items-center justify-between gap-2 shrink-0 font-mono">
        {/* Goal Indicator */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl animate-bounce">🫐</span>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
              BLUEBERRIES COLLECTED
            </span>
            <div className="flex items-center space-x-1.5">
              <span className="text-amber-400 font-extrabold text-sm sm:text-base">
                {collectedCount} / 5
              </span>
              <div className="flex space-x-0.5">
                {blueberries.map((b) => (
                  <span key={b.id} className="text-xs">
                    {b.collected ? '🫐' : '⚪'}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Battery Bar */}
        <div className="flex items-center space-x-2">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
              SOLAR POWER
            </span>
            <span className="text-emerald-400 font-bold text-xs">
              ⚡ {battery}%
            </span>
          </div>
          <div className="w-14 sm:w-20 bg-slate-800 h-3 rounded-full overflow-hidden border border-slate-700">
            <div
              className={`h-full transition-all duration-300 ${
                battery > 50 ? 'bg-emerald-400' : battery > 25 ? 'bg-amber-400' : 'bg-rose-400'
              }`}
              style={{ width: `${battery}%` }}
            />
          </div>
        </div>

        {/* Points */}
        <div className="text-right">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
            MISSION SCORE
          </span>
          <span className="text-cyan-300 font-extrabold text-sm sm:text-base">
            ⭐ {score} XP
          </span>
        </div>
      </div>

      {/* 2. Oppy's Friendly Speech Bubble */}
      <div className="my-1.5 bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-transparent border-l-4 border-amber-400 px-3 py-1.5 rounded-r-lg flex items-center space-x-2 shrink-0">
        <span className="text-xl shrink-0">
          {oppyMood === 'excited' ? '🌟' : oppyMood === 'oops' ? '😅' : '🤖'}
        </span>
        <span className="text-xs sm:text-sm font-sans font-semibold text-amber-200">
          {speechBubble}
        </span>
      </div>

      {/* 3. The Martian Playground (Fits perfectly inside the container) */}
      <div className="flex-1 min-h-0 w-full flex items-center justify-center p-1">
        <div className="w-full h-full max-h-[300px] sm:max-h-[340px] bg-gradient-to-b from-[#2b0f0f] via-[#1c0808] to-[#120404] border-2 border-amber-500/80 rounded-2xl p-1.5 sm:p-2 shadow-[0_0_25px_rgba(245,158,11,0.25)] flex flex-col justify-center">
          <div className="grid grid-rows-6 grid-cols-7 gap-1 sm:gap-1.5 w-full h-full">
            {Array.from({ length: ROWS }).map((_, r) =>
              Array.from({ length: COLS }).map((_, c) => {
                const isRover = roverPos.r === r && roverPos.c === c;
                const berry = blueberries.find((b) => b.r === r && b.c === c);
                const bat = batteries.find((b) => b.r === r && b.c === c);
                const whirl = dustDevils.find((g) => g.r === r && g.c === c);
                const rock = rocks.find((rk) => rk.r === r && rk.c === c);
                const isFlag = allBerriesCollected && flagPos.r === r && flagPos.c === c;

                // Is tile adjacent to rover? (clickable)
                const isAdjacent = Math.abs(roverPos.r - r) + Math.abs(roverPos.c - c) === 1;

                return (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => handleTileClick(r, c)}
                    className={`relative rounded-xl border flex items-center justify-center transition-all cursor-pointer select-none ${
                      isRover
                        ? 'border-cyan-400 bg-cyan-950/90 shadow-[0_0_15px_#00F0FF] scale-105 z-20 ring-2 ring-cyan-300'
                        : isFlag
                        ? 'border-emerald-400 bg-emerald-950/80 shadow-[0_0_20px_#10B981] animate-bounce z-10'
                        : berry && !berry.collected
                        ? 'border-indigo-400/80 bg-indigo-950/40 shadow-[0_0_10px_rgba(129,140,248,0.5)]'
                        : bat && !bat.collected
                        ? 'border-emerald-400/80 bg-emerald-950/40 shadow-[0_0_10px_rgba(52,211,153,0.5)]'
                        : whirl
                        ? 'border-sky-400/60 bg-sky-950/30 text-sky-300'
                        : rock
                        ? 'border-red-950/80 bg-red-950/40 text-stone-300'
                        : isAdjacent
                        ? 'border-amber-500/40 bg-amber-950/20 hover:bg-amber-900/40 hover:border-amber-400'
                        : 'border-amber-950/40 bg-black/40 text-slate-700'
                    }`}
                  >
                    {/* Item contents */}
                    {isRover ? (
                      <span
                        className="text-2xl sm:text-3xl transition-transform duration-200"
                        style={{
                          transform:
                            facing === 'left'
                              ? 'scaleX(-1)'
                              : facing === 'up'
                              ? 'rotate(-20deg)'
                              : facing === 'down'
                              ? 'rotate(20deg)'
                              : 'none',
                        }}
                      >
                        🤖
                      </span>
                    ) : isFlag ? (
                      <span className="text-2xl sm:text-3xl animate-bounce">🏁</span>
                    ) : berry && !berry.collected ? (
                      <span className="text-xl sm:text-2xl animate-pulse filter drop-shadow">
                        🫐
                      </span>
                    ) : bat && !bat.collected ? (
                      <span className="text-lg sm:text-xl animate-bounce">🔋</span>
                    ) : whirl ? (
                      <span className="text-base sm:text-lg animate-spin" style={{ animationDuration: '6s' }}>
                        🌪️
                      </span>
                    ) : rock ? (
                      <span className="text-lg sm:text-xl">🪨</span>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-900/40" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* 4. Big, Colorful Kid-Friendly Arrow Controls */}
      <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-2 shadow flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
        <div className="text-center sm:text-left">
          <span className="text-white font-bold text-xs block">
            🎮 HOW TO DRIVE OPPY:
          </span>
          <span className="text-[11px] text-slate-300 font-sans">
            Use Keyboard <span className="text-amber-300 font-mono font-bold">[Arrow Keys]</span> or <span className="text-amber-300 font-mono font-bold">[W A S D]</span>, or tap the green arrows!
          </span>
        </div>

        {/* Big Touch Directional D-Pad */}
        <div className="flex items-center space-x-2">
          {/* Left */}
          <button
            onClick={() => handleMove(0, -1)}
            className="w-11 h-11 rounded-xl bg-gradient-to-b from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 active:scale-90 text-white font-black text-lg shadow-lg flex items-center justify-center border-2 border-emerald-300 cursor-pointer"
            title="Drive Left (A / Left Arrow)"
          >
            ⬅️
          </button>

          {/* Up / Down */}
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => handleMove(-1, 0)}
              className="w-11 h-8 rounded-lg bg-gradient-to-b from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 active:scale-90 text-white font-black text-sm shadow flex items-center justify-center border-2 border-emerald-300 cursor-pointer"
              title="Drive Up (W / Up Arrow)"
            >
              ⬆️
            </button>
            <button
              onClick={() => handleMove(1, 0)}
              className="w-11 h-8 rounded-lg bg-gradient-to-b from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 active:scale-90 text-white font-black text-sm shadow flex items-center justify-center border-2 border-emerald-300 cursor-pointer"
              title="Drive Down (S / Down Arrow)"
            >
              ⬇️
            </button>
          </div>

          {/* Right */}
          <button
            onClick={() => handleMove(0, 1)}
            className="w-11 h-11 rounded-xl bg-gradient-to-b from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 active:scale-90 text-white font-black text-lg shadow-lg flex items-center justify-center border-2 border-emerald-300 cursor-pointer"
            title="Drive Right (D / Right Arrow)"
          >
            ➡️
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
// GAME 6: Kepler Alien World Hunter (Kid-Friendly Exoplanet Discovery Lab)
// =========================================================================
function KeplerTransitGameInner({ onWin, onLose }) {
  // 3 Famous Real NASA Exoplanets
  const EXOPLANET_SYSTEMS = [
    {
      id: 1,
      starName: "Kepler-452 (Sun-Like Star)",
      planetName: "Kepler-452b",
      nickname: "Earth's Older Cousin 🌍",
      starType: "Golden Sun (G2-Type)",
      starGradient: "from-yellow-100 via-amber-400 to-orange-500",
      starGlow: "rgba(245, 158, 11, 0.8)",
      planetColor: "from-blue-600 via-emerald-500 to-sky-400",
      planetDetails: "Rocky Super-Earth with green continents, blue oceans, and fluffy white clouds!",
      temperature: "22°C (Warm & Sunny)",
      goldilocksStatus: "🍲 JUST RIGHT! Liquid water can flow freely!",
      distance: "1,400 Light Years away in Cygnus",
    },
    {
      id: 2,
      starName: "Kepler-186 (Cozy Red Dwarf)",
      planetName: "Kepler-186f",
      nickname: "The Red-Sun Earth 🔴",
      starType: "Cool Red Dwarf (M-Type)",
      starGradient: "from-rose-200 via-red-500 to-rose-700",
      starGlow: "rgba(244, 63, 94, 0.85)",
      planetColor: "from-rose-700 via-purple-600 to-indigo-900",
      planetDetails: "Earth-sized world! Under its gentle red sun, plants might have red or purple leaves!",
      temperature: "14°C (Crisp & Autumn-like)",
      goldilocksStatus: "🍲 JUST RIGHT! Cool enough for ice caps and liquid seas!",
      distance: "580 Light Years away",
    },
    {
      id: 3,
      starName: "Kepler-22 (Bright Sun)",
      planetName: "Kepler-22b",
      nickname: "The Warm Ocean World 🌊",
      starType: "Yellow-Green Dwarf (G5-Type)",
      starGradient: "from-amber-200 via-yellow-400 to-amber-600",
      starGlow: "rgba(234, 179, 8, 0.85)",
      planetColor: "from-cyan-400 via-blue-600 to-teal-500",
      planetDetails: "A massive planet covered by a global warm ocean! No dry land—just endless blue waters!",
      temperature: "20°C (Tropical Ocean Paradise)",
      goldilocksStatus: "🍲 JUST RIGHT! A colossal ocean world!",
      distance: "620 Light Years away",
    },
  ];

  const [systemIdx, setSystemIdx] = useState(0);
  const [orbitProgress, setOrbitProgress] = useState(15); // 0 to 100%
  const [isAutoOrbit, setIsAutoOrbit] = useState(true);
  const [gameStep, setGameStep] = useState('hunting'); // 'hunting', 'captured', 'scanned'
  const [shutterFlash, setShutterFlash] = useState(false);
  const [discoveredPlanets, setDiscoveredPlanets] = useState([]);
  const [speech, setSpeech] = useState("Telescope locked! Watch the star. When the planet blocks starlight, SNAP A PHOTO! 📸");

  const currentSystem = EXOPLANET_SYSTEMS[systemIdx];

  // Automatic orbit cycle (~4.5s per revolution)
  useEffect(() => {
    if (!isAutoOrbit || gameStep !== 'hunting') return;
    const interval = setInterval(() => {
      setOrbitProgress((prev) => (prev + 1.2) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, [isAutoOrbit, gameStep]);

  // Planet is directly in front of the star between 38% and 62%
  const isCrossingStar = orbitProgress >= 38 && orbitProgress <= 62;
  const isCentered = orbitProgress >= 46 && orbitProgress <= 54;

  // Starlight brightness dips from 100% down to 86% during transit
  const starlightPercent = isCrossingStar
    ? Math.max(86, Math.round(100 - (1 - Math.abs(50 - orbitProgress) / 12) * 14))
    : 100;

  // Step 1: Snap telescope photo when crossing
  const handleSnapPhoto = () => {
    if (isCrossingStar) {
      sound.playCameraShutter();
      setShutterFlash(true);
      setTimeout(() => setShutterFlash(false), 120);

      setGameStep('captured');
      setSpeech("BULLSEYE! 🎯 We caught the alien world's shadow! Now let's test for water and life! 💧");
    } else {
      sound.playClick('mars');
      setSpeech("Oops, too early! Wait until the dark planet passes in front of the bright star! 🔭");
    }
  };

  // Step 2: Scan for Water & Life
  const handleScanWater = () => {
    sound.playSpectrometerScan();
    setTimeout(() => {
      sound.playPlanetReveal();
      setGameStep('scanned');
      setSpeech(`HOORAY! 🎉 Liquid water detected! Welcome to ${currentSystem.planetName}!`);
    }, 600);
  };

  // Step 3: Add to Passport & Next Star
  const handleNextPlanet = () => {
    sound.playDiscoveryFanfare();
    const updated = [...discoveredPlanets, currentSystem.planetName];
    setDiscoveredPlanets(updated);

    if (systemIdx < EXOPLANET_SYSTEMS.length - 1) {
      setSystemIdx((prev) => prev + 1);
      setGameStep('hunting');
      setOrbitProgress(15);
      setSpeech("New star system targeted! Watch the starlight and catch the next alien world! 🌟");
    } else {
      setSpeech("🎉 INCREDIBLE! You discovered all 3 Alien Earths! Mission Complete! 🏆");
      setTimeout(() => {
        onWin(280);
      }, 1600);
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.key === 'Enter') {
        e.preventDefault();
        if (gameStep === 'hunting') handleSnapPhoto();
        else if (gameStep === 'captured') handleScanWater();
        else if (gameStep === 'scanned') handleNextPlanet();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStep, isCrossingStar, systemIdx, discoveredPlanets]);

  return (
    <div className="h-full flex flex-col justify-between select-none max-w-2xl mx-auto w-full px-2 py-1 font-mono">
      {/* 1. Header Bar: Target Star & Discovery Passport */}
      <div className="bg-slate-900/95 border-2 border-cyan-500/60 rounded-xl p-2.5 shadow-md flex items-center justify-between gap-2 shrink-0">
        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
            TELESCOPE TARGET
          </span>
          <span className="text-cyan-300 font-extrabold text-xs sm:text-sm">
            🔭 {currentSystem.starName}
          </span>
        </div>

        {/* Starlight Brightness Meter */}
        <div className="text-center px-3 py-1 rounded-lg bg-black/60 border border-slate-700">
          <span className="text-[9px] text-slate-400 uppercase tracking-wider block">
            STARLIGHT BRIGHTNESS
          </span>
          <span
            className={`font-black text-xs sm:text-sm ${
              isCrossingStar ? 'text-amber-400 animate-pulse' : 'text-emerald-400'
            }`}
          >
            ☀️ {starlightPercent}% {isCrossingStar && '▼ (BLINKING!)'}
          </span>
        </div>

        {/* Discovery Passport Stamps */}
        <div className="text-right">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
            ALIEN EARTHS FOUND
          </span>
          <div className="flex items-center justify-end space-x-1">
            <span className="text-purple-300 font-extrabold text-xs sm:text-sm">
              {discoveredPlanets.length} / 3
            </span>
            <div className="flex space-x-0.5 text-xs">
              {EXOPLANET_SYSTEMS.map((s, idx) => (
                <span key={s.id}>
                  {discoveredPlanets.includes(s.planetName) ? '🪐' : '⚪'}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Kepler Mascot Friendly Speech Bubble */}
      <div className="my-1.5 bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-transparent border-l-4 border-cyan-400 px-3 py-1.5 rounded-r-lg flex items-center space-x-2 shrink-0">
        <span className="text-xl shrink-0">
          {gameStep === 'scanned' ? '🎉' : isCrossingStar ? '👀' : '🔭'}
        </span>
        <span className="text-xs sm:text-sm font-sans font-semibold text-cyan-200">
          {speech}
        </span>
      </div>

      {/* 3. The Interactive Deep Space Telescope Viewport */}
      <div className="relative flex-1 min-h-0 w-full flex items-center justify-center p-1">
        {/* Camera Shutter Flash Effect */}
        {shutterFlash && (
          <div className="absolute inset-0 bg-white z-50 rounded-2xl animate-fade-out pointer-events-none" />
        )}

        <div className="relative w-full h-full max-h-[300px] sm:max-h-[340px] bg-gradient-to-b from-[#030712] via-[#050b1d] to-[#020510] border-2 border-cyan-500/70 rounded-2xl p-3 shadow-[0_0_30px_rgba(6,182,212,0.3)] flex flex-col justify-between overflow-hidden">
          {/* Background Starfield twinkling */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Telescope Circular HUD Reticle */}
          <div className="absolute inset-0 border border-cyan-500/20 rounded-2xl pointer-events-none flex items-center justify-center">
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-cyan-400/30 border-dashed animate-spin" style={{ animationDuration: '60s' }} />
          </div>

          {/* MAIN SPACE VIEW: Star in Center + Orbiting Planet */}
          <div className="relative flex-1 flex items-center justify-center">
            {/* The Giant Alien Star in Center */}
            <div
              className={`relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br ${currentSystem.starGradient} flex items-center justify-center transition-all duration-300`}
              style={{
                boxShadow: `0 0 50px ${currentSystem.starGlow}, inset 0 0 20px rgba(255,255,255,0.8)`,
              }}
            >
              {/* Star Surface Granulation Activity */}
              <div className="absolute inset-0 rounded-full opacity-30 bg-[radial-gradient(#fff_2px,transparent_2px)] [background-size:6px_6px] animate-pulse" />

              {/* Orbiting Planet Track Overlay */}
              <div className="absolute inset-x-[-40px] sm:inset-x-[-60px] h-0.5 border-t border-cyan-400/40 border-dashed" />

              {/* THE ORBITING PLANET */}
              <div
                className="absolute transition-all duration-75 flex items-center justify-center"
                style={{
                  left: `${orbitProgress}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                {/* Visual Representation of Planet */}
                {gameStep === 'scanned' ? (
                  // Living, colorful discovered world!
                  <div
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br ${currentSystem.planetColor} border-2 border-white shadow-[0_0_20px_#00F0FF] animate-bounce flex items-center justify-center text-lg`}
                  >
                    🌱
                  </div>
                ) : (
                  // Dark Silhouette during transit eclipse
                  <div
                    className={`rounded-full transition-all ${
                      isCrossingStar
                        ? 'w-8 h-8 sm:w-10 sm:h-10 bg-black border-2 border-cyan-300 shadow-[0_0_15px_#00F0FF] ring-2 ring-amber-400'
                        : 'w-6 h-6 sm:w-7 sm:h-7 bg-slate-900 border border-slate-600'
                    }`}
                  >
                    {isCrossingStar && (
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-amber-500 text-black text-[9px] font-black uppercase whitespace-nowrap shadow animate-pulse">
                        TRANSIT! 📸
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Live Telemetry within Viewport */}
          <div className="relative z-10 bg-black/75 border border-slate-800 rounded-xl p-2 flex items-center justify-between text-[11px] text-slate-300">
            <div className="flex items-center space-x-1.5">
              <span className="text-cyan-400 font-bold">ORBIT POSITION:</span>
              <span>{Math.round(orbitProgress)}%</span>
            </div>

            <div className="flex items-center space-x-1.5">
              <span className="text-amber-400 font-bold">STATUS:</span>
              <span className={isCrossingStar ? 'text-amber-300 font-bold animate-pulse' : 'text-slate-400'}>
                {isCrossingStar ? '🚨 ECLIPSE DETECTED!' : 'Planet in outer orbit'}
              </span>
            </div>

            {/* Manual Orbit Scrub Slider for Kids who like direct interaction */}
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] text-slate-400">Scrub Orbit:</span>
              <input
                type="range"
                min="0"
                max="100"
                value={Math.round(orbitProgress)}
                onChange={(e) => {
                  setIsAutoOrbit(false);
                  setOrbitProgress(Number(e.target.value));
                }}
                className="w-16 sm:w-24 accent-cyan-400 cursor-pointer h-1.5"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Action & Discovery Deck (Intuitive 1-Button Progression) */}
      <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-2.5 shadow flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
        {/* Step 1: Hunting - Snap photo */}
        {gameStep === 'hunting' && (
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="text-center sm:text-left">
              <span className="text-white font-bold text-xs block">
                🎯 STEP 1: CATCH THE PLANET'S ECLIPSE
              </span>
              <span className="text-[11px] text-slate-300 font-sans">
                Wait until the black planet passes over the star, then tap <strong className="text-amber-300">[SNAP PHOTO]</strong> or press <strong className="text-amber-300">[SPACE]</strong>!
              </span>
            </div>

            <button
              onClick={handleSnapPhoto}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-mono text-xs font-black tracking-wider transition-all cursor-pointer active:scale-95 shadow-lg flex items-center justify-center space-x-2 ${
                isCrossingStar
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-[0_0_25px_rgba(245,158,11,0.8)] animate-bounce border-2 border-amber-200'
                  : 'bg-cyan-600 hover:bg-cyan-500 text-white border border-cyan-400'
              }`}
            >
              <span>📸</span>
              <span>SNAP TELESCOPE PHOTO [SPACE]</span>
            </button>
          </div>
        )}

        {/* Step 2: Captured - Test for Water & Habitability */}
        {gameStep === 'captured' && (
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-emerald-400 font-bold text-xs">
                  ✓ SHADOW CAPTURED!
                </span>
                <span className="text-slate-300 text-xs">
                  Temperature: <strong className="text-amber-300">{currentSystem.temperature}</strong>
                </span>
              </div>
              <span className="text-[11px] text-emerald-300 font-sans block">
                {currentSystem.goldilocksStatus}
              </span>
            </div>

            <button
              onClick={handleScanWater}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-black text-xs tracking-wider border-2 border-cyan-200 shadow-[0_0_20px_rgba(6,182,212,0.8)] cursor-pointer active:scale-95 flex items-center justify-center space-x-2 animate-bounce"
            >
              <span>💧</span>
              <span>SCAN FOR LIQUID WATER &amp; LIFE [SPACE]</span>
            </button>
          </div>
        )}

        {/* Step 3: Scanned - Living World Revealed! */}
        {gameStep === 'scanned' && (
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-purple-300 font-bold text-xs">
                  🪐 {currentSystem.planetName} ({currentSystem.nickname})
                </span>
              </div>
              <span className="text-[11px] text-slate-200 font-sans block">
                {currentSystem.planetDetails}
              </span>
            </div>

            <button
              onClick={handleNextPlanet}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-black font-black text-xs tracking-wider border-2 border-emerald-200 shadow-[0_0_25px_rgba(16,185,129,0.8)] cursor-pointer active:scale-95 flex items-center justify-center space-x-2 animate-bounce"
            >
              <span>🌟</span>
              <span>
                {systemIdx < EXOPLANET_SYSTEMS.length - 1
                  ? 'COLLECT BADGE & FIND NEXT WORLD ➡️'
                  : 'CONFIRM ALL & CLAIM NASA BADGE 🏆'}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
