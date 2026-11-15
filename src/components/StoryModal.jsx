import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StoryGuide } from './StoryGuide';
import { sound } from '../utils/soundEngine';
import {
  Sparkles,
  Gamepad2,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Compass,
  Zap,
  Activity,
  Maximize2,
  Minimize2,
  Image as ImageIcon,
  MapPin,
  X,
} from 'lucide-react';

export function StoryModal({
  artifact,
  onClose,
  onLaunchGame,
  onCompleteStory,
  voiceController,
  isMuted,
  onToggleMute,
}) {
  const [activeTab, setActiveTab] = useState('story'); // 'story', 'real-photo', 'visual'
  const [currentNodeIdx, setCurrentNodeIdx] = useState(0);
  const [selectedChoiceIdx, setSelectedChoiceIdx] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [isPhotoExpanded, setIsPhotoExpanded] = useState(false);

  const isMoon = artifact.planet.toLowerCase().includes('moon');
  const primaryColor = isMoon ? '#00F0FF' : '#FF4D2D';
  const guideType = artifact.guideVoice || (isMoon ? 'luna' : 'ares');

  const storyNodes = artifact.storyNodes || [];
  const currentNode = storyNodes[currentNodeIdx] || null;

  // On mount or node change, have the guide speak the introductory or node text
  useEffect(() => {
    if (!currentNode) {
      voiceController.speak(artifact.guideIntro, guideType);
    } else if (!revealed) {
      voiceController.speak(currentNode.question, guideType);
    }
  }, [currentNodeIdx, revealed]);

  const handleChoice = (idx, choice) => {
    if (selectedChoiceIdx !== null) return;
    setSelectedChoiceIdx(idx);
    setRevealed(true);

    if (choice.correct) {
      sound.playClick('normal');
      voiceController.speak(
        `${choice.explanation} ${currentNode.reveal} NASA Historic Fact: ${currentNode.nasaFact}`,
        guideType
      );
    } else {
      sound.playClick('mars');
      voiceController.speak(choice.explanation, guideType);
    }
  };

  const handleNextStep = () => {
    sound.playClick('decision');
    setSelectedChoiceIdx(null);
    setRevealed(false);

    if (currentNodeIdx + 1 < storyNodes.length) {
      setCurrentNodeIdx((prev) => prev + 1);
    } else {
      setCompleted(true);
      onCompleteStory(artifact.id, artifact.badgeReward);
      voiceController.speak(
        `Outstanding work, Explorer! You have unlocked the secrets of ${artifact.name}. You are now qualified to take on the mission challenge!`,
        guideType
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl glass-panel p-5 sm:p-7 border shadow-2xl flex flex-col"
        style={{
          borderColor: primaryColor,
          boxShadow: `0 0 40px ${primaryColor}33`,
        }}
      >
        {/* HUD Corner Accents */}
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-3 mb-4 border-slate-700/80 gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <span
                className="text-[11px] font-mono font-bold tracking-widest uppercase"
                style={{ color: primaryColor }}
              >
                DISCOVERY ARCHIVE // {artifact.planet}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                • MISSION: {artifact.mission}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white mt-0.5">
              {artifact.name}
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <span
              className="text-xs font-mono px-2.5 py-1 rounded-full border uppercase"
              style={{
                backgroundColor: `${primaryColor}15`,
                borderColor: `${primaryColor}66`,
                color: primaryColor,
              }}
            >
              {artifact.type}
            </span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {artifact.year}
            </span>
          </div>
        </div>

        {/* REAL NASA ARCHIVAL PHOTOGRAPH HERO BANNER */}
        {artifact.image && (
          <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden mb-4 border border-slate-700 group bg-slate-950">
            <img
              src={artifact.image}
              alt={artifact.name}
              className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                isPhotoExpanded ? 'object-contain' : 'object-cover'
              }`}
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

            {/* Official Badge Tag */}
            <div className="absolute top-3 left-3 flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-black/75 border border-cyan-400/50 backdrop-blur-md">
              <ImageIcon className="w-3 h-3 text-cyan-400" />
              <span className="text-[10px] font-mono tracking-wider text-cyan-300 font-bold uppercase">
                OFFICIAL NASA ARCHIVAL PHOTOGRAPH
              </span>
            </div>

            {/* Precise Coordinates Overlay Badge */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-slate-200">
              <span className="flex items-center space-x-1 bg-black/60 px-2 py-0.5 rounded border border-slate-700 text-[10px]">
                <MapPin className="w-3 h-3 text-amber-400 inline" />
                <span>
                  {artifact.landingSite} (LAT {artifact.coordinates.lat}°, LON {artifact.coordinates.lon}°)
                </span>
              </span>
              <span className="text-[10px] text-amber-300 font-bold hidden sm:inline">
                {artifact.status}
              </span>
            </div>
          </div>
        )}

        {/* Interactive Guide Dialogue Bar */}
        <div className="mb-4 p-3 sm:p-4 rounded-xl bg-slate-900/60 border border-slate-700/60 flex items-center justify-between">
          <StoryGuide
            guideType={guideType}
            isSpeaking={voiceController.isSpeaking}
            isPaused={voiceController.isPaused}
            onPlay={voiceController.resume}
            onPause={voiceController.pause}
            onReplay={voiceController.replay}
            onMuteToggle={onToggleMute}
            isMuted={isMuted}
            audioWaves={voiceController.audioWaves}
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 border-b border-slate-800 pb-2.5 mb-4">
          <button
            onClick={() => setActiveTab('story')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider flex items-center space-x-1.5 transition-all ${
              activeTab === 'story'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>✨ STORY & DISCOVERY</span>
          </button>

          <button
            onClick={() => setActiveTab('real-photo')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider flex items-center space-x-1.5 transition-all ${
              activeTab === 'real-photo'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>📍 LOCATION & SPECS</span>
          </button>

          {artifact.gameId && (
            <button
              onClick={() => onLaunchGame(artifact.gameId)}
              className="px-3 sm:px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider flex items-center space-x-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/50 hover:bg-amber-500/30 transition-all ml-auto"
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>🎮 TAKE THE CHALLENGE</span>
            </button>
          )}
        </div>

        {/* Tab 1: Interactive Story */}
        {activeTab === 'story' && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-sm leading-relaxed text-slate-200">
              <p className="italic">{artifact.guideIntro}</p>
            </div>

            {currentNode && (
              <div className="p-4 sm:p-5 rounded-xl border border-cyan-500/40 bg-cyan-950/15">
                <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 mb-2">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>
                    INTERACTIVE INQUIRY // STEP {currentNode.step} OF {storyNodes.length}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-3">
                  {currentNode.question}
                </h3>

                <div className="space-y-2">
                  {currentNode.choices.map((choice, idx) => {
                    const isSelected = selectedChoiceIdx === idx;
                    let style = 'bg-slate-900/60 border-slate-700 hover:border-cyan-500/50';

                    if (revealed) {
                      if (choice.correct) {
                        style = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
                      } else if (isSelected) {
                        style = 'bg-rose-950/60 border-rose-500 text-rose-200';
                      } else {
                        style = 'bg-slate-900/30 border-slate-800 opacity-50';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleChoice(idx, choice)}
                        disabled={revealed}
                        className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-start space-x-2.5 ${style}`}
                      >
                        <span className="font-mono font-bold mt-0.5 text-slate-400">
                          [{String.fromCharCode(65 + idx)}]
                        </span>
                        <div className="flex-1">
                          <p className="font-medium">{choice.text}</p>
                          {revealed && isSelected && (
                            <p className="text-xs mt-1 leading-relaxed font-mono">
                              {choice.explanation}
                            </p>
                          )}
                        </div>
                        {revealed && choice.correct && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        )}
                        {revealed && isSelected && !choice.correct && (
                          <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {revealed && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 space-y-3"
                    >
                      <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700">
                        <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-bold block mb-1">
                          MISSION REVELATION
                        </span>
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                          {currentNode.reveal}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/40">
                        <div className="flex items-center space-x-1.5 text-amber-400 text-xs font-mono font-bold mb-1">
                          <Zap className="w-3.5 h-3.5" />
                          <span>NASA ARCHIVAL FACT</span>
                        </div>
                        <p className="text-xs text-amber-200/90 leading-relaxed">
                          {currentNode.nasaFact}
                        </p>
                      </div>

                      <div className="flex justify-end pt-1">
                        <button
                          onClick={handleNextStep}
                          className="px-4 py-2 rounded-xl font-mono text-xs font-bold tracking-wider bg-cyan-500 text-black hover:bg-cyan-400 transition-colors flex items-center space-x-1.5"
                        >
                          <span>
                            {currentNodeIdx + 1 < storyNodes.length
                              ? 'CONTINUE STORY'
                              : 'COMPLETE LOG'}
                          </span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {completed && (
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/50 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">🏆</span>
                  <div>
                    <h4 className="font-display font-bold text-emerald-300">
                      Discovery Archival Complete!
                    </h4>
                    <p className="text-xs text-slate-300">
                      Earned +100 Explorer XP • Unlocked mission mini-game!
                    </p>
                  </div>
                </div>
                {artifact.gameId && (
                  <button
                    onClick={() => onLaunchGame(artifact.gameId)}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl font-mono text-xs font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:opacity-90 flex items-center justify-center space-x-1.5"
                  >
                    <Gamepad2 className="w-4 h-4" />
                    <span>LAUNCH MINI-GAME</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Location & Geological Specifications */}
        {activeTab === 'real-photo' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                  GEOGRAPHICAL LANDING SITE
                </span>
                <p className="text-sm font-bold text-white mt-1">
                  {artifact.landingSite}
                </p>
                <p className="text-xs font-mono text-cyan-400 mt-1">
                  LAT {artifact.coordinates.lat}° • LON {artifact.coordinates.lon}°
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                  CURRENT RESTING STATUS
                </span>
                <p className="text-sm font-bold text-amber-300 mt-1">
                  {artifact.status}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                HISTORICAL MISSION SIGNIFICANCE
              </span>
              <p className="text-xs sm:text-sm text-slate-200 mt-1.5 leading-relaxed">
                {artifact.significance}
              </p>
            </div>
          </div>
        )}

        {/* Footer: Official NASA Citation Link */}
        <div className="mt-5 pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-mono gap-2">
          <span>NASA Definitive Catalog // NSSDCA & Science</span>
          <a
            href={artifact.nasaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 hover:underline"
          >
            <span>View Official NASA Mission Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
