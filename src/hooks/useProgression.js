import { useState, useEffect } from 'react';
import { badgesList, explorerRanks } from '../data/badgesData';
import { sound } from '../utils/soundEngine';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'nasa_space_apps_progression_v1';

export function useProgression() {
  const [progression, setProgression] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Could not load from localStorage:", e);
    }
    return {
      xp: 0,
      discoveredIds: [],
      completedStoryIds: [],
      completedGames: [],
      unlockedBadges: [],
    };
  });

  const [newlyUnlockedBadge, setNewlyUnlockedBadge] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progression));
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }
  }, [progression]);

  // Current rank calculation
  const currentRank = [...explorerRanks]
    .reverse()
    .find((r) => progression.xp >= r.minXp) || explorerRanks[0];

  // Discover an object
  const discoverObject = (id) => {
    if (!progression.discoveredIds.includes(id)) {
      setProgression((prev) => ({
        ...prev,
        xp: prev.xp + 50,
        discoveredIds: [...prev.discoveredIds, id],
      }));
      sound.playDiscoveryFanfare();
    }
  };

  // Complete a story node
  const completeStory = (id, badgeReward = null) => {
    const isNew = !progression.completedStoryIds.includes(id);
    if (isNew) {
      setProgression((prev) => {
        const nextBadges = badgeReward && !prev.unlockedBadges.includes(badgeReward)
          ? [...prev.unlockedBadges, badgeReward]
          : prev.unlockedBadges;

        return {
          ...prev,
          xp: prev.xp + 100,
          completedStoryIds: [...prev.completedStoryIds, id],
          unlockedBadges: nextBadges,
        };
      });

      if (badgeReward && !progression.unlockedBadges.includes(badgeReward)) {
        triggerBadgeCelebration(badgeReward);
      }
    }
  };

  // Complete a mini-game
  const completeGame = (gameId, badgeReward, xpAmount = 150) => {
    const isNewGame = !progression.completedGames.includes(gameId);
    
    setProgression((prev) => {
      const nextGames = isNewGame ? [...prev.completedGames, gameId] : prev.completedGames;
      const nextBadges = badgeReward && !prev.unlockedBadges.includes(badgeReward)
        ? [...prev.unlockedBadges, badgeReward]
        : prev.unlockedBadges;

      return {
        ...prev,
        xp: prev.xp + (isNewGame ? xpAmount : 30),
        completedGames: nextGames,
        unlockedBadges: nextBadges,
      };
    });

    if (badgeReward && !progression.unlockedBadges.includes(badgeReward)) {
      triggerBadgeCelebration(badgeReward);
    } else {
      sound.playDiscoveryFanfare();
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const triggerBadgeCelebration = (badgeId) => {
    const badge = badgesList.find((b) => b.id === badgeId);
    if (badge) {
      setNewlyUnlockedBadge(badge);
      sound.playDiscoveryFanfare();
      try {
        confetti({
          particleCount: 100,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#00F0FF', '#FF4D2D', '#FFD700', '#38BDF8']
        });
      } catch (e) {}
    }
  };

  const dismissBadgePopup = () => {
    setNewlyUnlockedBadge(null);
  };

  const resetProgress = () => {
    const fresh = {
      xp: 0,
      discoveredIds: [],
      completedStoryIds: [],
      completedGames: [],
      unlockedBadges: [],
    };
    setProgression(fresh);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    xp: progression.xp,
    rank: currentRank,
    discoveredIds: progression.discoveredIds,
    completedStoryIds: progression.completedStoryIds,
    completedGames: progression.completedGames,
    unlockedBadges: progression.unlockedBadges,
    newlyUnlockedBadge,
    discoverObject,
    completeStory,
    completeGame,
    dismissBadgePopup,
    resetProgress,
  };
}

