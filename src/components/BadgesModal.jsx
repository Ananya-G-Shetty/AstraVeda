import React from 'react';
import { motion } from 'framer-motion';
import { badgesList, explorerRanks } from '../data/badgesData';
import { X, Award, CheckCircle2, Lock, Sparkles } from 'lucide-react';

export function BadgesModal({
  onClose,
  unlockedBadges = [],
  xp = 0,
  currentRank,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl glass-panel p-6 sm:p-8 border border-amber-500/50 shadow-2xl flex flex-col">
        {/* Corner Decors */}
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-5 border-slate-700">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🏆</span>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-bold">
                ASTRONAUTICAL HALL OF HONOR
              </span>
              <h2 className="text-2xl font-display font-extrabold text-white">
                Mission Badges & Explorer Rank
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Rank Banner */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-cyan-950/40 to-slate-900 border border-amber-500/40 mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-4xl">{currentRank.icon}</span>
            <div>
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">
                CURRENT EXPEDITION RANK
              </span>
              <h3 className="text-lg font-bold text-white font-display">
                Level {currentRank.level}: {currentRank.title}
              </h3>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-400 uppercase">
              TOTAL ACCUMULATED XP
            </span>
            <p className="text-xl font-bold font-mono text-cyan-400">{xp} XP</p>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {badgesList.map((badge) => {
            const isUnlocked = unlockedBadges.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-xl border transition-all flex items-start space-x-3.5 ${
                  isUnlocked
                    ? 'bg-slate-900/80 border-amber-400/50 shadow-[0_0_15px_rgba(255,215,0,0.1)]'
                    : 'bg-slate-950/60 border-slate-800 opacity-60'
                }`}
              >
                {/* Badge Icon Medallion */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 border ${
                    isUnlocked
                      ? 'border-amber-400 bg-amber-500/20'
                      : 'border-slate-700 bg-slate-900'
                  }`}
                >
                  {isUnlocked ? badge.icon : <Lock className="w-5 h-5 text-slate-500" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4
                      className={`text-sm font-bold font-display ${
                        isUnlocked ? 'text-white' : 'text-slate-400'
                      }`}
                    >
                      {badge.title}
                    </h4>
                    <span
                      className="text-[9px] font-mono uppercase px-2 py-0.5 rounded border"
                      style={{
                        borderColor: isUnlocked ? badge.color : '#475569',
                        color: isUnlocked ? badge.color : '#94A3B8',
                      }}
                    >
                      {badge.rarity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

