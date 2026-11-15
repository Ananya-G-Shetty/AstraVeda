import React from 'react';
import { miniGames } from '../data/gameData';
import { moonArtifacts } from '../data/moonData';
import { marsArtifacts } from '../data/marsData';
import { X, Gamepad2, Compass, CheckCircle2 } from 'lucide-react';

export function MissionsDrawer({
  onClose,
  onLaunchGame,
  onSelectArtifact,
  completedGames = [],
  discoveredIds = [],
}) {
  const gamesList = Object.values(miniGames);
  const allArtifacts = [...moonArtifacts, ...marsArtifacts];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl glass-panel p-6 sm:p-8 border border-cyan-500/50 shadow-2xl flex flex-col">
        {/* Corner Decors */}
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        <div className="flex items-center justify-between border-b pb-4 mb-6 border-slate-700">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🎮</span>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-bold">
                NASA FLIGHT ACADEMY
              </span>
              <h2 className="text-2xl font-display font-extrabold text-white">
                Interactive Missions & Challenges
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

        {/* 6 Mini Games Section */}
        <div className="space-y-3 mb-8">
          <h3 className="text-xs font-mono tracking-widest uppercase text-amber-400 font-bold">
            AVAILABLE FLIGHT SIMULATIONS & MINI-GAMES
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {gamesList.map((g) => {
              const isDone = completedGames.includes(g.id);

              return (
                <div
                  key={g.id}
                  className="p-4 rounded-xl bg-slate-900/70 border border-slate-700/80 hover:border-cyan-400/60 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl">{g.icon}</span>
                      {isDone && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                          ✓ COMPLETE
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-white font-display">
                      {g.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                      {g.objective}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      onLaunchGame(g.id);
                      onClose();
                    }}
                    className="mt-4 w-full py-2 rounded-lg font-mono text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500 hover:text-black transition-all flex items-center justify-center space-x-1.5"
                  >
                    <Gamepad2 className="w-3.5 h-3.5" />
                    <span>LAUNCH SIMULATION</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* All Equipment Catalog Jump */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono tracking-widest uppercase text-cyan-400 font-bold">
            ALL DISCOVERABLE EQUIPMENT & PROBES ({discoveredIds.length} / {allArtifacts.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {allArtifacts.map((art) => {
              const isFound = discoveredIds.includes(art.id);

              return (
                <button
                  key={art.id}
                  onClick={() => {
                    onSelectArtifact(art);
                    onClose();
                  }}
                  className="p-3 rounded-lg bg-slate-900/40 border border-slate-800 hover:border-cyan-400 text-left transition-all flex items-center justify-between"
                >
                  <div>
                    <span className="text-[9px] font-mono text-cyan-400 uppercase">
                      {art.planet} • {art.year}
                    </span>
                    <h5 className="text-xs font-bold text-white font-display">
                      {art.shortName}
                    </h5>
                  </div>
                  <span className="text-xs">{isFound ? '✅' : '🔍'}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

