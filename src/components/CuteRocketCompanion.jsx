import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Sparkles } from 'lucide-react';
import { sound } from '../utils/soundEngine';

/**
 * CuteRocketCompanion Component
 * 
 * Displays the smiling NASA cartoon rocket character with its cream/yellow comic speech bubble.
 * 
 * Behavior:
 * - When idle: Displays and speaks "Ready to explore each of the equipments!"
 * - When user goes near/hovers any equipment: Dynamically speaks and displays "Ready to explore [equipment name]?"
 * - Floating bobbing animation with glowing blue rocket thruster fire.
 * - Interactive click-to-speak button with live audio waves.
 * - Fully transparent background (Mars screenshot sliver completely removed).
 */
export function CuteRocketCompanion({
  scene = 'mars', // 'moon' | 'mars'
  voice,
  hoveredArtifact = null,
  isMuted = false,
}) {
  const [hasGreeted, setHasGreeted] = useState(false);
  const [isSpeakingLocal, setIsSpeakingLocal] = useState(false);
  const lastSpokenIdRef = useRef(null);

  // Dynamic speech text: "Ready to explore (equipment name)?" or default
  const equipName = hoveredArtifact ? (hoveredArtifact.shortName || hoveredArtifact.name) : null;
  const currentText = equipName
    ? `Ready to explore ${equipName}?`
    : "Ready to explore each of the equipments!";

  // Trigger cute voice speech on click
  const handleTalk = () => {
    if (isMuted) return;

    sound.playClick('talk');
    setIsSpeakingLocal(true);

    if (voice && typeof voice.speak === 'function') {
      let dialogue;
      if (hoveredArtifact) {
        dialogue = `Ready to explore ${equipName}? Click on it to discover where it landed and hear its story!`;
      } else {
        dialogue = scene === 'moon'
          ? "Ready to explore each of the equipments! Click on Apollo 11, Lunar Rover, ALSEP, or Surveyor 3 to hear what they have to say!"
          : "Ready to explore each of the equipments! Click on Opportunity, Sojourner, Viking 1, InSight, or Ingenuity to hear what they have to say!";
      }
      voice.speak(dialogue, "Rocket Character");
    }

    setTimeout(() => {
      setIsSpeakingLocal(false);
    }, 4500);
  };

  // Speak "Ready to explore (equipment name)?" when user moves mouse near any equipment
  useEffect(() => {
    if (hoveredArtifact && hoveredArtifact.id !== lastSpokenIdRef.current) {
      lastSpokenIdRef.current = hoveredArtifact.id;
      if (!isMuted && voice && typeof voice.speak === 'function') {
        const speechLine = `Ready to explore ${hoveredArtifact.shortName || hoveredArtifact.name}?`;
        voice.speak(speechLine, "Rocket Character");
      }
    } else if (!hoveredArtifact) {
      lastSpokenIdRef.current = null;
    }
  }, [hoveredArtifact?.id, isMuted, voice]);

  // Initial greeting upon entering Moon or Mars (only once)
  useEffect(() => {
    if (!hasGreeted && !isMuted && voice && typeof voice.speak === 'function') {
      const timer = setTimeout(() => {
        voice.speak("Ready to explore each of the equipments!", "Rocket Character");
        setHasGreeted(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [hasGreeted, isMuted, voice]);

  const isSpeakingNow = isSpeakingLocal || (voice?.isSpeaking && voice?.speakingGuide === "Rocket Character");

  return (
    <motion.div
      initial={{ opacity: 0, x: -40, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -40, scale: 0.9 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed left-3 sm:left-8 md:left-12 top-[24%] sm:top-[26%] md:top-[28%] z-30 pointer-events-auto select-none"
    >
      {/* Floating Bobbing Wrapper */}
      <motion.div
        animate={{
          y: isSpeakingNow ? [0, -10, 0, -6, 0] : [0, -8, 0],
          rotate: isSpeakingNow ? [-1.5, 1.5, -1, 1, 0] : [-1, 1, -1],
        }}
        transition={{
          repeat: Infinity,
          duration: isSpeakingNow ? 1.5 : 3.6,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        onClick={handleTalk}
        className="relative group cursor-pointer flex flex-col items-center"
        title="Click me to talk! 🚀"
      >
        {/* Glow halo behind companion */}
        <div className="absolute -inset-4 bg-cyan-400/10 rounded-full blur-2xl group-hover:bg-cyan-400/25 transition-all duration-500 pointer-events-none" />

        {/* 1. CARTOON SPEECH BUBBLE WITH 3 YELLOW ACTION RAYS */}
        <div className="relative mb-1 flex flex-col items-center">
          {/* 3 Comic Yellow Rays on Top Left */}
          <div className="absolute -top-3.5 -left-2 flex items-end space-x-0.5 pointer-events-none z-10">
            <div className="w-1.5 h-3 bg-amber-400 rounded-full transform -rotate-45 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
            <div className="w-1.5 h-4.5 bg-amber-400 rounded-full transform -rotate-15 -translate-y-1 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
            <div className="w-1.5 h-3 bg-amber-400 rounded-full transform rotate-20 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
          </div>

          {/* Bubble Card with Yellow Border & Soft Cream Interior */}
          <motion.div
            key={currentText}
            initial={{ scale: 0.95, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="relative bg-[#fffde8] border-[3.5px] border-[#f59e0b] rounded-[24px] px-3.5 py-2.5 shadow-[0_8px_25px_rgba(0,0,0,0.7)] min-w-[170px] max-w-[210px] text-center"
          >
            <p className="font-black text-[#0f172a] text-[13px] leading-snug tracking-tight font-sans">
              {currentText}
            </p>

            {/* Comic pointer tail pointing down towards the rocket's orange nosecone */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-2.5 overflow-hidden">
              <div className="w-3 h-3 bg-[#fffde8] border-r-[3.5px] border-b-[3.5px] border-[#f59e0b] transform rotate-45 mx-auto -translate-y-1.5" />
            </div>
          </motion.div>
        </div>

        {/* 2. CUTE SMILING NASA ROCKET CHARACTER (NO MARS SCREENSHOT SLIVER) */}
        <div className="relative w-28 sm:w-32 flex flex-col items-center">
          {/* Thruster exhaust flame pulse glow */}
          <motion.div
            animate={{
              scaleY: [0.9, 1.3, 0.9],
              opacity: [0.7, 1.0, 0.7],
            }}
            transition={{
              repeat: Infinity,
              duration: 0.75,
              ease: "easeInOut",
            }}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-14 bg-gradient-to-b from-cyan-300 via-sky-400 to-transparent blur-md pointer-events-none"
          />

          <img
            src="/cinematics/cute-rocket-only.png"
            alt="Smiling NASA Rocket"
            className="w-full h-auto object-contain pointer-events-none drop-shadow-[0_6px_20px_rgba(0,0,0,0.8)] filter group-hover:drop-shadow-[0_0_20px_rgba(0,240,255,0.6)] transition-all"
            draggable={false}
          />
        </div>

        {/* 3. INTERACTIVE AUDIO STATUS BADGE / CLICK TO TALK PILL */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-cyan-400/40 text-[10px] font-mono font-bold text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.3)] group-hover:border-cyan-300 group-hover:bg-cyan-950/90 transition-all"
        >
          {isSpeakingNow ? (
            <>
              <div className="flex items-center space-x-0.5 h-3">
                <span className="w-0.5 h-3 bg-cyan-400 animate-pulse rounded-full" />
                <span className="w-0.5 h-2 bg-yellow-400 animate-pulse rounded-full delay-75" />
                <span className="w-0.5 h-3.5 bg-cyan-300 animate-pulse rounded-full delay-150" />
                <span className="w-0.5 h-2.5 bg-yellow-300 animate-pulse rounded-full delay-100" />
              </div>
              <span className="tracking-wider uppercase text-yellow-300">SPEAKING...</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3 h-3 text-cyan-400 group-hover:animate-bounce" />
              <span className="tracking-wider text-slate-200 group-hover:text-cyan-200">
                CLICK TO TALK!
              </span>
              <Sparkles className="w-2.5 h-2.5 text-yellow-400" />
            </>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
