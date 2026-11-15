import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, RotateCcw } from 'lucide-react';

export function StoryGuide({
  guideType = 'luna', // 'luna' or 'ares'
  isSpeaking = false,
  isPaused = false,
  onPlay,
  onPause,
  onReplay,
  onMuteToggle,
  isMuted = false,
  audioWaves = [40, 70, 30, 80, 50, 90, 60, 45],
}) {
  const isLuna = guideType === 'luna';
  const guideName = isLuna ? 'LUNA' : 'ARES SCOUT';
  const guideRole = isLuna ? 'Lunar Celestial Companion' : 'Martian Archaeological Drone';
  const primaryColor = isLuna ? '#00F0FF' : '#FF4D2D';
  const accentColor = isLuna ? '#38BDF8' : '#F59E0B';

  return (
    <div className="flex items-center space-x-4">
      {/* Animated 3D/SVG Avatar */}
      <motion.div
        animate={{
          y: [0, -8, 0],
          rotate: [0, isLuna ? 2 : -2, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative group cursor-pointer"
      >
        {/* Glow Halo */}
        <div
          className="absolute -inset-2 rounded-full opacity-60 blur-md transition-all duration-500"
          style={{
            backgroundColor: primaryColor,
            transform: isSpeaking ? 'scale(1.2)' : 'scale(1.0)',
            opacity: isSpeaking ? 0.9 : 0.4,
          }}
        />

        {/* Outer Orbiting Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-1 rounded-full border border-dashed opacity-75"
          style={{ borderColor: primaryColor }}
        />

        {/* Character Face Container */}
        <div
          className="relative w-14 h-14 rounded-full flex items-center justify-center border-2 backdrop-blur-md shadow-2xl overflow-hidden"
          style={{
            backgroundColor: isLuna ? 'rgba(11, 18, 43, 0.9)' : 'rgba(35, 12, 10, 0.9)',
            borderColor: isSpeaking ? primaryColor : `${primaryColor}88`,
          }}
        >
          {isLuna ? (
            /* Luna Face: Cute celestial glowing robot */
            <div className="relative flex flex-col items-center">
              {/* Antenna */}
              <div className="w-1 h-2 bg-cyan-400 rounded-t-sm -mt-2 mb-0.5" />
              {/* Eyes */}
              <div className="flex space-x-2.5 items-center">
                <motion.div
                  animate={{
                    scaleY: isSpeaking ? [1, 0.2, 1] : 1,
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 2 + 1,
                  }}
                  className="w-2.5 h-3 rounded-full bg-cyan-300 shadow-[0_0_8px_#00F0FF]"
                />
                <motion.div
                  animate={{
                    scaleY: isSpeaking ? [1, 0.2, 1] : 1,
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 2 + 1,
                  }}
                  className="w-2.5 h-3 rounded-full bg-cyan-300 shadow-[0_0_8px_#00F0FF]"
                />
              </div>
              {/* Mouth / Smile LED */}
              <div
                className={`mt-1.5 transition-all duration-300 ${
                  isSpeaking
                    ? 'w-4 h-1.5 rounded-full bg-cyan-400'
                    : 'w-3 h-0.5 bg-cyan-500/70 rounded-full'
                }`}
              />
            </div>
          ) : (
            /* Ares / Mars Drone: Rugged lens eye */
            <div className="relative flex flex-col items-center">
              {/* Optical Camera Eye */}
              <div className="relative w-7 h-7 rounded-full border border-amber-500/60 bg-red-950 flex items-center justify-center">
                <motion.div
                  animate={{ scale: isSpeaking ? [1, 1.3, 1] : 1 }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-[0_0_10px_#F59E0B]"
                />
                <div className="absolute inset-0 border border-t-amber-400 border-r-transparent rounded-full animate-spin" />
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Guide Identity & Speech Controller */}
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <span
            className="text-xs font-mono font-bold tracking-widest uppercase"
            style={{ color: primaryColor }}
          >
            {guideName}
          </span>
          <span className="text-[10px] font-mono text-slate-400 tracking-wider">
            [{guideRole}]
          </span>
        </div>

        {/* Visual Speaking Indicator & Audio Equalizer */}
        <div className="flex items-center space-x-2 mt-1">
          {isSpeaking ? (
            <div className="flex items-center space-x-1 px-2 py-0.5 rounded bg-black/40 border border-slate-700/60">
              <span className="text-[10px] font-mono text-cyan-300 animate-pulse">
                Speaking...
              </span>
              <div className="flex items-end space-x-0.5 h-3 ml-1">
                {audioWaves.map((h, i) => (
                  <span
                    key={i}
                    className="w-0.5 rounded-full transition-all duration-100"
                    style={{
                      height: `${h}%`,
                      backgroundColor: primaryColor,
                    }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <span className="text-[10px] font-mono text-slate-400">
              Ready for transmission
            </span>
          )}

          {/* Quick Voice Controls */}
          <div className="flex items-center space-x-1 ml-2">
            {isSpeaking && !isPaused && (
              <button
                onClick={onPause}
                title="Pause voice"
                className="p-1 rounded hover:bg-white/10 text-slate-300 hover:text-white"
              >
                <Pause className="w-3.5 h-3.5" />
              </button>
            )}
            {isSpeaking && isPaused && (
              <button
                onClick={onPlay}
                title="Resume voice"
                className="p-1 rounded hover:bg-white/10 text-cyan-400"
              >
                <Play className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={onReplay}
              title="Replay dialogue"
              className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onMuteToggle}
              title={isMuted ? "Unmute audio" : "Mute audio"}
              className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

