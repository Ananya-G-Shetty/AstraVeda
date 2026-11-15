import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Sparkles, X } from 'lucide-react';

export function BadgeUnlockedAlert({ badge, onDismiss }) {
  if (!badge) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm pointer-events-auto">
        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.7, opacity: 0 }}
          className="relative max-w-sm w-full rounded-2xl glass-panel p-6 border border-amber-400 text-center shadow-[0_0_50px_rgba(255,215,0,0.4)]"
        >
          {/* HUD corner decorations */}
          <div className="hud-corner-tl" />
          <div className="hud-corner-tr" />
          <div className="hud-corner-bl" />
          <div className="hud-corner-br" />

          <button
            onClick={onDismiss}
            className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Badge Medallion */}
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-amber-500/20 to-cyan-500/20 border-2 border-amber-400 flex items-center justify-center text-4xl shadow-[0_0_25px_rgba(255,215,0,0.5)] mb-3"
          >
            {badge.icon}
          </motion.div>

          <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-bold">
            NEW BADGE ACQUIRED!
          </span>

          <h3 className="text-xl font-display font-extrabold text-white mt-1">
            {badge.title}
          </h3>

          <p className="text-xs text-slate-300 mt-2 font-sans leading-relaxed">
            {badge.description}
          </p>

          <button
            onClick={onDismiss}
            className="mt-5 w-full py-2.5 rounded-xl font-mono text-xs font-bold tracking-widest bg-amber-400 text-black hover:bg-amber-300 transition-colors"
          >
            CLAIM BADGE TO PROFILE
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

