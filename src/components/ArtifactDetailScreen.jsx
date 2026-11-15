import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/soundEngine';
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  ExternalLink,
  Gamepad2,
  Trophy,
  Compass,
  Clock,
  MapPin,
  Activity,
  Layers,
  Sparkles,
  Info,
  Radio,
  CheckCircle2,
  X,
} from 'lucide-react';

export function ArtifactDetailScreen({
  artifact,
  onClose,
  onLaunchGame,
  voiceController,
  isMuted = false,
  onToggleMute,
}) {
  // Active speaking topic: 'whoAmI', 'mission', 'carried', 'whyLeft', 'doingNow'
  const [activeTopic, setActiveTopic] = useState('whoAmI');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [elapsedTime, setElapsedTime] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const isMoon = artifact.planet.toLowerCase().includes('moon');
  const primaryColor = isMoon ? '#00F0FF' : '#FF4D2D';
  const accentColor = isMoon ? '#38BDF8' : '#F59E0B';
  const guideVoice = artifact.shortName || artifact.name || 'Rocket Character';

  // Compute live elapsed time from exact landing date to now
  useEffect(() => {
    const landingDate = new Date(artifact.landingDateExact || '1969-07-20T20:17:40Z');

    const updateTimer = () => {
      const now = new Date();
      const diffMs = Math.max(0, now - landingDate);

      const totalSeconds = Math.floor(diffMs / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const totalDays = Math.floor(totalHours / 24);

      const years = Math.floor(totalDays / 365.25);
      const days = Math.floor(totalDays % 365.25);
      const hours = totalHours % 24;
      const minutes = totalMinutes % 60;
      const seconds = totalSeconds % 60;

      setElapsedTime({ years, days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [artifact.landingDateExact]);

  // Speech topics definitions
  const speechTopics = [
    {
      id: 'whoAmI',
      label: 'WHAT AM I?',
      icon: '🤖',
      subtitle: 'Identity & Purpose',
      text: artifact.speechDialogue?.whoAmI || artifact.whatItIs || artifact.significance,
    },
    {
      id: 'mission',
      label: 'MY MISSION',
      icon: '🚀',
      subtitle: 'NASA Launch & Goals',
      text: artifact.speechDialogue?.mission || artifact.missionUsedFor,
    },
    {
      id: 'carried',
      label: 'WHAT I CARRIED',
      icon: '📦',
      subtitle: 'Satellites & Instruments',
      text: artifact.speechDialogue?.carried || artifact.whatItCarried,
    },
    {
      id: 'whyLeft',
      label: 'WHY I WAS LEFT',
      icon: '⏳',
      subtitle: 'Why Abandoned Here',
      text: artifact.speechDialogue?.whyLeft || artifact.whyLeftThere,
    },
    {
      id: 'doingNow',
      label: 'WHAT I DO NOW',
      icon: '💤',
      subtitle: 'Current State & Future',
      text: artifact.speechDialogue?.doingNow || artifact.whatItIsDoingNow,
    },
  ];

  const currentTopicData =
    speechTopics.find((t) => t.id === activeTopic) || speechTopics[0];

  // Function to make character speak the active topic
  const speakCurrentTopic = (topicKey) => {
    const topic = speechTopics.find((t) => t.id === topicKey) || currentTopicData;
    if (voiceController && voiceController.speak && !isMuted) {
      setIsSpeaking(true);
      voiceController.speak(topic.text, guideVoice);
    }
  };

  // Speak initial intro on screen mount
  useEffect(() => {
    speakCurrentTopic('whoAmI');
    return () => {
      if (voiceController && voiceController.stop) {
        voiceController.stop();
      }
    };
  }, [artifact.id]);

  // Handle clicking on any component tab
  const handleSelectTopic = (topicId) => {
    sound.playClick('decision');
    setActiveTopic(topicId);
    speakCurrentTopic(topicId);
  };

  const handleReplayVoice = () => {
    sound.playClick('normal');
    speakCurrentTopic(activeTopic);
  };

  const handleStopVoice = () => {
    sound.playClick('normal');
    setIsSpeaking(false);
    if (voiceController && voiceController.stop) {
      voiceController.stop();
    }
  };

  const handleStartChallenge = () => {
    sound.playClick('decision');
    if (onLaunchGame) {
      onLaunchGame(artifact.gameId || 'mars-rover');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#030712]/95 backdrop-blur-2xl flex flex-col select-none text-slate-100 animate-in fade-in duration-300">
      {/* Background Starry Glow & Cockpit Scanlines */}
      <div className="absolute inset-0 scanlines pointer-events-none opacity-20" />
      <div
        className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ backgroundColor: primaryColor }}
      />

      {/* TOP HEADER BAR */}
      <header className="relative z-20 w-full px-4 sm:px-8 py-3.5 border-b border-slate-800/80 bg-black/60 backdrop-blur-md flex items-center justify-between">
        {/* Left: Back Button & Breadcrumbs */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={() => {
              sound.playClick('normal');
              onClose();
            }}
            className="px-3.5 py-1.5 rounded-xl border border-cyan-500/40 hover:border-cyan-400 bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 text-xs sm:text-sm font-mono font-bold flex items-center space-x-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.25)]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO {artifact.planet.toUpperCase()}</span>
          </button>

          <div className="hidden md:flex items-center space-x-2 text-xs font-mono text-slate-400">
            <span>NASA ARCHAEOLOGY</span>
            <span>/</span>
            <span style={{ color: primaryColor }}>{artifact.planet.toUpperCase()}</span>
            <span>/</span>
            <span className="text-white font-bold">{artifact.shortName}</span>
          </div>
        </div>

        {/* Right: Audio Voice Indicator, Mute Toggle & Close */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Speaking Audio Wave Visualizer */}
          <div className="hidden sm:flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-black/50 border border-slate-700">
            <Radio
              className="w-3.5 h-3.5 animate-pulse"
              style={{ color: primaryColor }}
            />
            <span className="text-[10px] font-mono tracking-wider text-slate-300">
              VOICE ACTIVE
            </span>
            <div className="flex items-end space-x-0.5 h-3 ml-1">
              {[40, 80, 50, 90, 60].map((h, i) => (
                <span
                  key={i}
                  className="w-0.5 rounded-full"
                  style={{
                    height: `${h}%`,
                    backgroundColor: primaryColor,
                    animation: `pulse 0.8s infinite ${i * 0.15}s`,
                  }}
                />
              ))}
            </div>
          </div>

          <button
            onClick={onToggleMute}
            className="p-2 rounded-xl border border-slate-700 hover:border-cyan-400 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-cyan-300" />}
          </button>

          <button
            onClick={() => {
              sound.playClick('normal');
              onClose();
            }}
            className="p-2 rounded-xl border border-slate-700 hover:border-red-400 bg-slate-900/60 hover:bg-red-950/60 text-slate-400 hover:text-red-300 transition-all cursor-pointer"
            title="Close Screen"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* MAIN TWO-COLUMN CONTENT AREA */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* ======================================================== */}
        {/* LEFT COLUMN: Telemetry, Chrono-Timer, Location & Challenge */}
        {/* ======================================================== */}
        <section className="lg:col-span-6 flex flex-col gap-5">
          
          {/* 1. CHRONO-TIMER: HOW MANY YEARS IT HAS BEEN THERE */}
          <div className="p-5 sm:p-6 rounded-2xl glass-panel border border-cyan-500/40 shadow-[0_0_30px_rgba(0,240,255,0.15)] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-300 to-transparent" />

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-bold tracking-[0.2em] text-cyan-300 uppercase">
                  TIME ON {artifact.planet.toUpperCase()} SURFACE
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                LIVE TELEMETRY
              </span>
            </div>

            {/* Glowing Big Digital Timer Digits */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3 my-2 text-center">
              {/* Years */}
              <div className="p-2 sm:p-3 rounded-xl bg-black/60 border border-cyan-500/30 flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-mono font-black text-white drop-shadow-[0_0_12px_rgba(0,240,255,0.7)]">
                  {elapsedTime.years}
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-cyan-300 uppercase mt-1">
                  YEARS
                </span>
              </div>

              {/* Days */}
              <div className="p-2 sm:p-3 rounded-xl bg-black/60 border border-cyan-500/30 flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-mono font-black text-cyan-200">
                  {elapsedTime.days}
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-cyan-300 uppercase mt-1">
                  DAYS
                </span>
              </div>

              {/* Hours */}
              <div className="p-2 sm:p-3 rounded-xl bg-black/60 border border-cyan-500/30 flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-mono font-black text-cyan-200">
                  {String(elapsedTime.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-cyan-300 uppercase mt-1">
                  HOURS
                </span>
              </div>

              {/* Mins */}
              <div className="p-2 sm:p-3 rounded-xl bg-black/60 border border-cyan-500/30 flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-mono font-black text-cyan-200">
                  {String(elapsedTime.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-cyan-300 uppercase mt-1">
                  MINS
                </span>
              </div>

              {/* Secs */}
              <div className="p-2 sm:p-3 rounded-xl bg-black/60 border border-cyan-500/30 flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-mono font-black text-cyan-400 animate-pulse">
                  {String(elapsedTime.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-cyan-400 uppercase mt-1">
                  SECS
                </span>
              </div>
            </div>

            <p className="text-[11px] font-mono text-slate-300 mt-2 text-center">
              Touchdown Date: <strong className="text-white">{new Date(artifact.landingDateExact || '1969-07-20').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
            </p>
          </div>

          {/* 2. LOCATION & RESTING STATUS */}
          <div className="p-5 sm:p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
            {/* Location Section */}
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono font-bold tracking-wider text-slate-400 uppercase mb-1.5">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>EXACT LANDING SITE &amp; LOCATION</span>
              </div>
              <h3 className="text-lg font-bold text-white font-display">
                {artifact.landingSite}
              </h3>
              <div className="mt-2 flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-lg bg-black/60 border border-slate-700 text-cyan-300 flex items-center space-x-1.5">
                  <Compass className="w-3.5 h-3.5 text-cyan-400" />
                  <span>LAT: {artifact.coordinates.lat}°</span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-black/60 border border-slate-700 text-cyan-300 flex items-center space-x-1.5">
                  <Compass className="w-3.5 h-3.5 text-cyan-400" />
                  <span>LON: {artifact.coordinates.lon}°</span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-black/60 border border-slate-700 text-slate-300">
                  SECTOR: {artifact.planet.toUpperCase()} SURFACE
                </span>
              </div>
            </div>

            {/* Resting Status */}
            <div className="pt-3 border-t border-slate-800/80">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold tracking-wider text-slate-400 uppercase mb-1.5">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>CURRENT RESTING STATUS</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold inline-block mb-2">
                ● {artifact.currentRestingStatus || artifact.status}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {artifact.significance}
              </p>
            </div>

            {/* Archival Mission Specs */}
            <div className="pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-black/40 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block">MISSION PROGRAM</span>
                <span className="font-bold text-white">{artifact.mission}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block">YEAR OF OPERATION</span>
                <span className="font-bold text-white">{artifact.year}</span>
              </div>
            </div>

            {/* Official NASA Archive Link */}
            <a
              href={artifact.nasaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-cyan-300 text-xs font-mono flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>VIEW OFFICIAL NASA ARCHIVES</span>
            </a>
          </div>

          {/* 3. AREA TO TAKE CHALLENGE */}
          <div className="p-5 sm:p-6 rounded-2xl glass-panel border border-amber-500/60 shadow-[0_0_30px_rgba(245,158,11,0.2)] bg-gradient-to-br from-amber-950/40 via-black/80 to-black/90 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-transparent" />

            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                🏆
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase font-bold block">
                  AREA TO TAKE CHALLENGE
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white font-display">
                  {artifact.shortName} Mission Simulator
                </h4>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Step into the mission commander's shoes! Complete the flight and exploration simulation challenge to log this artifact, earn the <strong className="text-amber-300 font-mono">[{artifact.badgeReward}]</strong> badge, and gain <strong className="text-cyan-300 font-mono">+200 XP</strong>.
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStartChallenge}
              className="w-full py-3.5 px-6 rounded-xl font-mono text-sm font-extrabold tracking-widest uppercase bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black shadow-[0_0_25px_rgba(245,158,11,0.6)] flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>START MISSION CHALLENGE</span>
            </motion.button>
          </div>
        </section>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: Talking Cartoon Character & Speech System  */}
        {/* ======================================================== */}
        <section className="lg:col-span-6 flex flex-col gap-5">
          
          {/* CARTOON SPEECH BUBBLE & CHARACTER DISPLAY */}
          <div className="p-5 sm:p-6 rounded-2xl glass-panel border border-cyan-500/50 shadow-[0_0_35px_rgba(0,240,255,0.15)] flex flex-col items-center">
            
            {/* CARTOON SPEECH BUBBLE (Yellow/Cream Comic Bubble with Pointer) */}
            <div className="relative w-full mb-4">
              <motion.div
                key={activeTopic}
                initial={{ opacity: 0, y: -10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="relative p-4 sm:p-5 rounded-2xl bg-amber-100 text-slate-900 border-2 border-amber-300 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
              >
                {/* Speech Bubble Header */}
                <div className="flex items-center justify-between border-b border-amber-300/80 pb-2 mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-base sm:text-lg">
                      {currentTopicData.icon}
                    </span>
                    <span className="font-mono text-xs font-black tracking-wider uppercase text-amber-950">
                      {artifact.shortName} speaks:
                    </span>
                  </div>

                  {/* Speech Audio Replay / Pause Controls */}
                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={handleReplayVoice}
                      className="p-1.5 rounded-lg bg-amber-200 hover:bg-amber-300 text-amber-950 transition-all cursor-pointer"
                      title="Replay Voice Speech"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={handleStopVoice}
                      className="px-2 py-1 rounded-lg bg-amber-200 hover:bg-amber-300 text-amber-950 text-[10px] font-mono font-bold transition-all cursor-pointer"
                      title="Stop Speech"
                    >
                      STOP
                    </button>
                  </div>
                </div>

                {/* Animated Speech Text Box */}
                <p className="text-xs sm:text-sm font-sans font-semibold text-slate-900 leading-relaxed">
                  "{currentTopicData.text}"
                </p>

                {/* Comic Speech Bubble Triangle Pointer Tail */}
                <div
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0"
                  style={{
                    borderLeft: '12px solid transparent',
                    borderRight: '12px solid transparent',
                    borderTop: '14px solid #FEF3C7',
                  }}
                />
              </motion.div>
            </div>

            {/* ANIMATED TALKING CHARACTER PHOTO */}
            <div className="relative my-2 flex flex-col items-center">
              {/* Animated Glowing Sound Rings when Speaking */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.6, 0.9, 0.6],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -inset-4 rounded-full blur-xl pointer-events-none"
                style={{ backgroundColor: primaryColor }}
              />

              {/* Character Avatar Container with Expressive Floating Movement */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 1, -1, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden border-4 bg-black/80 shadow-2xl flex items-center justify-center"
                style={{
                  borderColor: primaryColor,
                  boxShadow: `0 0 30px ${primaryColor}88, 0 10px 30px rgba(0,0,0,0.8)`,
                }}
              >
                {/* Real NASA Photo of the Equipment */}
                <img
                  src={artifact.image}
                  alt={artifact.name}
                  className="w-full h-full object-cover"
                />

                {/* Holographic Radar Eye / Cute Face Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-white tracking-wider uppercase">
                      {artifact.shortName}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                </div>
              </motion.div>

              {/* Character Speech Subtitle / Prompt */}
              <span className="mt-3 text-[11px] font-mono text-cyan-300 font-bold tracking-widest uppercase">
                ✦ CLICK COMPONENTS BELOW TO MAKE ME EXPLAIN ✦
              </span>
            </div>
          </div>

          {/* 5 INTERACTIVE COMPONENT BUTTONS */}
          {/* "Make every other components speak when we click on them" */}
          <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-slate-800 space-y-2.5">
            <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase block mb-1">
              EXPLORE TOPICS (CLICK TO HEAR ME EXPLAIN):
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {speechTopics.map((topic) => {
                const isSelected = activeTopic === topic.id;
                return (
                  <motion.button
                    key={topic.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectTopic(topic.id)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-start space-x-3 cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/25 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.4)] text-white'
                        : 'bg-black/50 border-slate-800 hover:border-slate-600 hover:bg-slate-900/60 text-slate-300'
                    }`}
                  >
                    <span className="text-2xl mt-0.5">{topic.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-black tracking-wider uppercase">
                          {topic.label}
                        </span>
                        {isSelected && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-400 text-black font-extrabold uppercase">
                            SPEAKING
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 block truncate mt-0.5 font-sans">
                        {topic.subtitle}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}
