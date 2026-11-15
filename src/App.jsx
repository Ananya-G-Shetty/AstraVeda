import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

// 3D Scenes & Components
import { Starfield } from './scenes/Starfield';
import { MoonGlobe } from './scenes/MoonGlobe';
import { MarsGlobe } from './scenes/MarsGlobe';
import { SolarTravelScene } from './scenes/SolarTravelScene';

// Cinematic & Decision Components
import { CinematicPlayer } from './components/CinematicPlayer';
import { RocketDecisionScreen } from './components/RocketDecisionScreen';
import { CuteRocketCompanion } from './components/CuteRocketCompanion';

// Data
import { moonArtifacts } from './data/moonData';
import { marsArtifacts } from './data/marsData';

// Hooks & Sound
import { useProgression } from './hooks/useProgression';
import { useVoiceOver } from './hooks/useVoiceOver';
import { sound } from './utils/soundEngine';

// Modals & Navigation
import { Navigation } from './components/Navigation';
import { ArtifactDetailScreen } from './components/ArtifactDetailScreen';
import { StoryModal } from './components/StoryModal';
import { GameModal } from './games/GameModal';
import { BadgesModal } from './components/BadgesModal';
import { BadgeUnlockedAlert } from './components/BadgeUnlockedAlert';
import { FinalMemorialModal } from './components/FinalMemorialModal';
import { MissionsDrawer } from './components/MissionsDrawer';
import { authService, AuthModal } from './auth';

import { ArrowLeft } from 'lucide-react';

export default function App() {
  // Navigation scenes: 'cinematic', 'cockpit', 'moon', 'mars'
  const [currentScene, setCurrentScene] = useState('cinematic');
  const [hoveredDestination, setHoveredDestination] = useState(null);

  // Hovered Artifact for Dynamic Rocket Companion Speech ("Ready to explore [equipment name]?")
  const [hoveredArtifact, setHoveredArtifact] = useState(null);

  // Selected Artifact for Discovery Story
  const [selectedArtifact, setSelectedArtifact] = useState(null);

  // Active Mini-Game ID
  const [activeGameId, setActiveGameId] = useState(null);

  // Modals
  const [showBadges, setShowBadges] = useState(false);
  const [showMemorial, setShowMemorial] = useState(false);
  const [showMissionsDrawer, setShowMissionsDrawer] = useState(false);

  // Astronaut Cadet Authentication State (Shown as default screen on load or when switching profile)
  const [currentUser, setCurrentUser] = useState(() => authService.getCurrentCadet());
  const [showAuthModal, setShowAuthModal] = useState(true);

  const handleAuthSuccess = (cadet) => {
    setCurrentUser(cadet);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    authService.logoutCadet();
    setCurrentUser(null);
    setShowAuthModal(true);
  };

  // Audio State
  const [isMuted, setIsMuted] = useState(false);

  // Progression Hook
  const progression = useProgression();

  // Voice Over Hook
  const voice = useVoiceOver();

  // Handle Mute Toggle
  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
    if (next) {
      voice.stop();
    }
  };

  // When Cinematic completes its flight (or user clicks Skip) -> Enter Cockpit Decision HUD
  const handleCinematicComplete = () => {
    sound.playClick('decision');
    setCurrentScene('cockpit');
  };

  // Replay cinematic launch & flight
  const handleReplayFlight = () => {
    sound.playClick('normal');
    setCurrentScene('cinematic');
  };

  // Selecting Destination Moon or Mars
  const handleSelectDestination = (dest) => {
    sound.playClick('decision');
    setCurrentScene(dest);
    voice.speak(
      "Ready to explore each of the equipments!",
      "Rocket Character"
    );
  };

  // Return to Space Cockpit
  const handleReturnToSpace = () => {
    sound.playClick('normal');
    setSelectedArtifact(null);
    setHoveredArtifact(null);
    setCurrentScene('cockpit');
  };

  // Select an Artifact Beacon
  const handleSelectArtifact = (artifact) => {
    progression.discoverObject(artifact.id);
    setSelectedArtifact(artifact);
    setHoveredArtifact(null);
  };

  // Discovered count helpers
  const moonDiscovered = moonArtifacts.filter((a) =>
    progression.discoveredIds.includes(a.id)
  ).length;
  const marsDiscovered = marsArtifacts.filter((a) =>
    progression.discoveredIds.includes(a.id)
  ).length;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#030712] select-none">
      {/* Sci-fi Cockpit Scanlines Overlay */}
      <div className="absolute inset-0 scanlines pointer-events-none z-20" />

      {/* Floating Top Navigation */}
      <Navigation
        currentScene={currentScene}
        onNavigate={(scene) => {
          if (scene === 'earth') setCurrentScene('cinematic');
          else if (scene === 'decision') setCurrentScene('cockpit');
          else setCurrentScene(scene);
        }}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        xp={progression.xp}
        rank={progression.rank}
        discoveredCount={progression.discoveredIds.length}
        totalCount={moonArtifacts.length + marsArtifacts.length}
        onOpenBadges={() => setShowBadges(true)}
        onOpenMemorial={() => setShowMemorial(true)}
        onOpenMissionSelect={() => setShowMissionsDrawer(true)}
        onSkipCinematic={handleCinematicComplete}
        cadet={currentUser}
        onOpenAuth={() => setShowAuthModal(true)}
        onLogout={handleLogout}
      />

      {/* SCENE 1: CINEMATIC SEQUENCE (Matches Launchpad, Ignition, Ascent, Video Cruise, & Rocket Briefing!) */}
      {currentScene === 'cinematic' && (
        <CinematicPlayer
          onLaunchComplete={handleCinematicComplete}
          onSelectDestination={handleSelectDestination}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
      )}

      {/* SCENE 2: TALKING ROCKET CHARACTER DECISION SCREEN (No 3D simulation; pure animated video with Moon/Mars navigation) */}
      {currentScene === 'cockpit' && (
        <RocketDecisionScreen
          onSelectDestination={handleSelectDestination}
          onReplayLaunch={handleReplayFlight}
          isMuted={isMuted}
        />
      )}

      {/* SCENE 3: MOON 3D EXPEDITION */}
      {currentScene === 'moon' && (
        <div className="relative w-full h-full">
          {/* Cute Rocket Companion Asking "Ready to explore (equipment name)?" */}
          <CuteRocketCompanion
            scene="moon"
            voice={voice}
            hoveredArtifact={hoveredArtifact}
            isMuted={isMuted}
          />

          <div className="absolute inset-0 z-10">
            <Canvas camera={{ position: [0, 0, 9], fov: 50 }}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[10, 10, 10]} intensity={1.6} castShadow />
              <pointLight position={[-10, -5, -5]} intensity={0.3} color="#00F0FF" />
              <Starfield count={2200} speed={0.04} />
              <Suspense fallback={null}>
                <MoonGlobe
                  artifacts={moonArtifacts}
                  onSelectArtifact={handleSelectArtifact}
                  onHoverArtifact={setHoveredArtifact}
                  discoveredIds={progression.discoveredIds}
                />
                <OrbitControls
                  enableZoom={true}
                  minDistance={5.5}
                  maxDistance={12}
                  enablePan={false}
                  rotateSpeed={0.5}
                />
              </Suspense>
            </Canvas>
          </div>

          {/* Minimal Lunar HUD */}
          <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-6 pt-20">
            <div className="flex items-center justify-between pointer-events-auto">
              <div className="glass-panel px-4 py-2 rounded-xl border border-cyan-400/40 flex items-center space-x-3">
                <span className="text-xl">🌕</span>
                <div>
                  <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    MOON EXPEDITION
                  </h3>
                  <p className="text-[10px] font-mono text-cyan-300">
                    DISCOVERED {moonDiscovered} / {moonArtifacts.length} • LUNAR EXPLORER LEVEL {progression.rank.level}
                  </p>
                </div>
              </div>

              <button
                onClick={handleReturnToSpace}
                className="px-4 py-2 rounded-xl glass-button text-xs font-mono font-bold tracking-wider text-cyan-300 flex items-center space-x-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>🚀 RETURN TO SPACE</span>
              </button>
            </div>

            <div className="flex items-center justify-between pointer-events-auto">
              <div className="px-3 py-1.5 rounded-lg bg-black/60 border border-slate-700 text-[11px] font-mono text-slate-300">
                ✦ DRAG TO ROTATE MOON • CLICK GLOWING BEACON TO DISCOVER ARTIFACT
              </div>

              <div className="hidden sm:flex items-center space-x-2">
                {moonArtifacts.map((art) => (
                  <button
                    key={art.id}
                    onClick={() => handleSelectArtifact(art)}
                    onMouseEnter={() => setHoveredArtifact(art)}
                    onMouseLeave={() => setHoveredArtifact(null)}
                    className="px-2.5 py-1 rounded-md bg-slate-900/80 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-400 text-[10px] font-mono text-slate-300"
                  >
                    {art.shortName}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SCENE 4: MARS 3D EXPEDITION */}
      {currentScene === 'mars' && (
        <div className="relative w-full h-full">
          {/* Cute Rocket Companion Asking "Ready to explore (equipment name)?" */}
          <CuteRocketCompanion
            scene="mars"
            voice={voice}
            hoveredArtifact={hoveredArtifact}
            isMuted={isMuted}
          />

          <div className="absolute inset-0 z-10">
            <Canvas camera={{ position: [0, 0, 9], fov: 50 }}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[10, 10, 10]} intensity={1.6} castShadow />
              <pointLight position={[-10, -5, -5]} intensity={0.3} color="#FF4D2D" />
              <Starfield count={2200} speed={0.04} />
              <Suspense fallback={null}>
                <MarsGlobe
                  artifacts={marsArtifacts}
                  onSelectArtifact={handleSelectArtifact}
                  onHoverArtifact={setHoveredArtifact}
                  discoveredIds={progression.discoveredIds}
                />
                <OrbitControls
                  enableZoom={true}
                  minDistance={5.5}
                  maxDistance={12}
                  enablePan={false}
                  rotateSpeed={0.5}
                />
              </Suspense>
            </Canvas>
          </div>

          {/* Minimal Martian HUD */}
          <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-6 pt-20">
            <div className="flex items-center justify-between pointer-events-auto">
              <div className="glass-panel-mars px-4 py-2 rounded-xl border border-rose-500/50 flex items-center space-x-3">
                <span className="text-xl">🔴</span>
                <div>
                  <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    MARS EXPEDITION
                  </h3>
                  <p className="text-[10px] font-mono text-rose-300">
                    DISCOVERED {marsDiscovered} / {marsArtifacts.length} • MARS SCOUT LEVEL {progression.rank.level}
                  </p>
                </div>
              </div>

              <button
                onClick={handleReturnToSpace}
                className="px-4 py-2 rounded-xl glass-button-mars text-xs font-mono font-bold tracking-wider text-rose-300 flex items-center space-x-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>🚀 RETURN TO SPACE</span>
              </button>
            </div>

            <div className="flex items-center justify-between pointer-events-auto">
              <div className="px-3 py-1.5 rounded-lg bg-black/60 border border-slate-700 text-[11px] font-mono text-slate-300">
                ✦ DRAG TO ROTATE MARS • CLICK BEACONS TO UNCOVER ROVERS & PROBES
              </div>

              <div className="hidden sm:flex items-center space-x-2">
                {marsArtifacts.slice(0, 5).map((art) => (
                  <button
                    key={art.id}
                    onClick={() => handleSelectArtifact(art)}
                    onMouseEnter={() => setHoveredArtifact(art)}
                    onMouseLeave={() => setHoveredArtifact(null)}
                    className="px-2.5 py-1 rounded-md bg-slate-900/80 hover:bg-rose-500/20 border border-slate-700 hover:border-rose-400 text-[10px] font-mono text-slate-300"
                  >
                    {art.shortName}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FULL-PAGE ARTIFACT DETAIL & TALKING CHARACTER SCREEN */}
      <AnimatePresence>
        {selectedArtifact && (
          <ArtifactDetailScreen
            artifact={selectedArtifact}
            onClose={() => setSelectedArtifact(null)}
            onLaunchGame={(gameId) => {
              setActiveGameId(gameId);
              progression.completeStory(selectedArtifact.id, selectedArtifact.badgeReward);
            }}
            voiceController={voice}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
          />
        )}
      </AnimatePresence>

      {/* MINI-GAMES MODAL */}
      <AnimatePresence>
        {activeGameId && (
          <GameModal
            gameId={activeGameId}
            onClose={() => setActiveGameId(null)}
            onGameComplete={(gameId, badgeId, xp) => {
              progression.completeGame(gameId, badgeId, xp);
            }}
          />
        )}
      </AnimatePresence>

      {/* BADGES & RANK DRAWER */}
      <AnimatePresence>
        {showBadges && (
          <BadgesModal
            onClose={() => setShowBadges(false)}
            unlockedBadges={progression.unlockedBadges}
            xp={progression.xp}
            currentRank={progression.rank}
          />
        )}
      </AnimatePresence>

      {/* MISSIONS & SIMULATION DRAWER */}
      <AnimatePresence>
        {showMissionsDrawer && (
          <MissionsDrawer
            onClose={() => setShowMissionsDrawer(false)}
            onLaunchGame={(gameId) => setActiveGameId(gameId)}
            onSelectArtifact={(art) => handleSelectArtifact(art)}
            completedGames={progression.completedGames}
            discoveredIds={progression.discoveredIds}
          />
        )}
      </AnimatePresence>

      {/* FINAL SPACE ARCHAEOLOGIST MEMORIAL */}
      <AnimatePresence>
        {showMemorial && (
          <FinalMemorialModal
            onClose={() => setShowMemorial(false)}
            discoveredIds={progression.discoveredIds}
          />
        )}
      </AnimatePresence>

      {/* NEW BADGE UNLOCKED ALERT */}
      <BadgeUnlockedAlert
        badge={progression.newlyUnlockedBadge}
        onDismiss={progression.dismissBadgePopup}
      />

      {/* ASTRONAUT CADET AUTHENTICATION MODAL (Initial Terminal Clearance) */}
      <AnimatePresence>
        {showAuthModal && (
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            onAuthSuccess={handleAuthSuccess}
            canCloseWithoutAuth={!!currentUser}
            initialTab="guest"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
