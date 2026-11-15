import React from 'react';
import { motion } from 'framer-motion';
import { moonArtifacts } from '../data/moonData';
import { marsArtifacts } from '../data/marsData';
import { sound } from '../utils/soundEngine';
import { Sparkles, X, ChevronRight, Compass } from 'lucide-react';

export function FinalMemorialModal({ onClose, discoveredIds = [] }) {
  const allArtifacts = [...moonArtifacts, ...marsArtifacts];
  const discoveredList = allArtifacts.filter((a) => discoveredIds.includes(a.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl glass-panel p-6 sm:p-10 border border-cyan-400/60 shadow-[0_0_60px_rgba(0,240,255,0.25)] flex flex-col text-center"
      >
        {/* HUD corners */}
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Cosmic Badge */}
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-cyan-500/30 to-amber-500/30 border-2 border-amber-400/80 flex items-center justify-center text-4xl shadow-[0_0_40px_rgba(255,215,0,0.4)] mb-4">
          🌌
        </div>

        <span className="text-xs font-mono tracking-[0.3em] uppercase text-cyan-400 font-bold">
          NASA SPACE APPS CHALLENGE 2026 // GRAND ARCHIVAL
        </span>

        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-2 tracking-wide">
          SPACE ARCHAEOLOGIST
        </h2>

        {/* The Poetic Core Tagline of the Challenge */}
        <div className="my-8 max-w-2xl mx-auto space-y-3 font-display text-slate-200">
          <p className="text-lg sm:text-xl text-cyan-200 tracking-wide">
            "Some explorers stopped moving."
          </p>
          <p className="text-lg sm:text-xl text-amber-200 tracking-wide">
            "Some were left behind."
          </p>
          <p className="text-lg sm:text-xl text-rose-200 tracking-wide">
            "Some are still travelling through space."
          </p>
          <p className="text-xl sm:text-2xl font-black text-white tracking-widest pt-2">
            "BUT NONE OF THEM WERE FORGOTTEN."
          </p>
        </div>

        {/* Humanity's Footprints Beyond Earth Gallery */}
        <div className="border-t border-b border-slate-800 py-6 my-4">
          <h3 className="text-sm font-mono tracking-widest uppercase text-amber-400 font-bold mb-4">
            HUMANITY'S FOOTPRINTS BEYOND EARTH
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-left">
            {allArtifacts.map((art) => {
              const isFound = discoveredIds.includes(art.id);

              return (
                <div
                  key={art.id}
                  className={`p-3 rounded-xl border transition-all ${
                    isFound
                      ? 'bg-slate-900/80 border-cyan-400/40 shadow-sm'
                      : 'bg-slate-950/40 border-slate-800 opacity-40'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="text-cyan-400">{art.planet}</span>
                    <span className="text-slate-400">{art.year}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-1 font-display">
                    {art.shortName}
                  </h4>
                  <span className="text-[9px] font-mono text-slate-400">
                    {isFound ? '✓ PRESERVED IN MEMORY' : 'UNEXPLORED'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-4 flex justify-center">
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-xl font-mono text-xs font-bold tracking-widest bg-gradient-to-r from-cyan-500 via-blue-500 to-amber-500 text-black hover:opacity-90 shadow-[0_0_25px_rgba(0,240,255,0.4)]"
          >
            CONTINUE EXPLORING THE COSMOS
          </button>
        </div>
      </motion.div>
    </div>
  );
}

