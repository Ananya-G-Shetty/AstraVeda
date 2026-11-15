import { useState, useEffect, useRef } from 'react';

/**
 * useVoiceOver Hook - Cartoon Character / Cute Kids Voice Engine
 * 
 * Tuned with high pitch, upbeat cadence, and youthful/child-like voice selection
 * to sound like a cheerful cartoon character kid (matching the cute talking NASA rocket).
 */
export function useVoiceOver() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speakingGuide, setSpeakingGuide] = useState(null);
  const [currentText, setCurrentText] = useState("");
  const [audioWaves, setAudioWaves] = useState([30, 60, 90, 45, 75, 50, 85, 40]);
  const [availableVoices, setAvailableVoices] = useState([]);
  const synthRef = useRef(null);
  const utteranceRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;

      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          setAvailableVoices(voices);
        }
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Animate audio wave heights while speaking
  useEffect(() => {
    if (!isSpeaking || isPaused) return;

    const interval = setInterval(() => {
      setAudioWaves([
        Math.floor(20 + Math.random() * 80),
        Math.floor(20 + Math.random() * 80),
        Math.floor(20 + Math.random() * 80),
        Math.floor(20 + Math.random() * 80),
        Math.floor(20 + Math.random() * 80),
        Math.floor(20 + Math.random() * 80),
        Math.floor(20 + Math.random() * 80),
        Math.floor(20 + Math.random() * 80),
      ]);
    }, 120);

    return () => clearInterval(interval);
  }, [isSpeaking, isPaused]);

  const speak = (text, guideName = "Rocket Character") => {
    if (!synthRef.current) return;

    // Cancel current active speech
    synthRef.current.cancel();
    setCurrentText(text);
    setSpeakingGuide(guideName);

    const cleanText = text.replace(/[#*_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utteranceRef.current = utterance;

    // Fetch loaded voices
    const voices = availableVoices.length > 0 ? availableVoices : synthRef.current.getVoices();
    let selectedVoice = null;

    // 1. Check for dedicated child/kid voices first (e.g. Microsoft Ana on Edge/Windows)
    selectedVoice = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.toLowerCase().includes('ana') ||
          v.name.toLowerCase().includes('child') ||
          v.name.toLowerCase().includes('kid') ||
          v.name.toLowerCase().includes('young'))
    );

    // 2. If no direct child voice, select clear youthful female/natural voice to pitch-shift
    if (!selectedVoice) {
      selectedVoice = voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.includes('Natural') ||
            v.name.includes('Jenny') ||
            v.name.includes('Aria') ||
            v.name.includes('Google US English') ||
            v.name.includes('Samantha') ||
            v.name.includes('Zira') ||
            v.name.includes('Victoria') ||
            v.name.includes('Female'))
      );
    }

    // 3. Fallback to any English voice
    if (!selectedVoice) {
      selectedVoice = voices.find((v) => v.lang.startsWith('en'));
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    // Cartoon Character / Cute Kids Voice Tuning:
    // Elevated pitch (1.55 - 1.72) and energetic, upbeat cadence (1.08 - 1.14)
    // transforms the speech into a cheerful, high-spirited cartoon kid voice like the rocket!
    const nameLower = (guideName || '').toLowerCase();
    let cartoonPitch = 1.62;
    let cartoonRate = 1.10;

    if (nameLower.includes('sojourner')) {
      // Tiny, adorable little rover kid
      cartoonPitch = 1.70;
      cartoonRate = 1.14;
    } else if (nameLower.includes('ingenuity') || nameLower.includes('ginny')) {
      // Whirring, energetic flying helicopter kid
      cartoonPitch = 1.68;
      cartoonRate = 1.12;
    } else if (nameLower.includes('oppy') || nameLower.includes('opportunity')) {
      // Enthusiastic, friendly marathon explorer kid
      cartoonPitch = 1.64;
      cartoonRate = 1.10;
    } else if (nameLower.includes('eagle') || nameLower.includes('apollo 11')) {
      // Proud, heroic little lunar lander kid
      cartoonPitch = 1.58;
      cartoonRate = 1.08;
    } else if (nameLower.includes('alsep') || nameLower.includes('insight')) {
      // Smart, curious science listener kid
      cartoonPitch = 1.62;
      cartoonRate = 1.08;
    } else if (nameLower.includes('lrv') || nameLower.includes('buggy') || nameLower.includes('apollo 15')) {
      // Zooming electric moon-buggy kid
      cartoonPitch = 1.66;
      cartoonRate = 1.12;
    } else if (nameLower.includes('surveyor') || nameLower.includes('viking')) {
      // Cute historic scout kid
      cartoonPitch = 1.60;
      cartoonRate = 1.08;
    } else {
      // General cartoon kid character voice (matching talking NASA rocket)
      cartoonPitch = 1.62;
      cartoonRate = 1.10;
    }

    utterance.pitch = cartoonPitch;
    utterance.rate = cartoonRate;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setSpeakingGuide(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setSpeakingGuide(null);
    };

    synthRef.current.speak(utterance);
  };

  const pause = () => {
    if (synthRef.current && isSpeaking && !isPaused) {
      synthRef.current.pause();
      setIsPaused(true);
    }
  };

  const resume = () => {
    if (synthRef.current && isSpeaking && isPaused) {
      synthRef.current.resume();
      setIsPaused(false);
    }
  };

  const stop = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
      setSpeakingGuide(null);
    }
  };

  const replay = () => {
    if (currentText) {
      speak(currentText, speakingGuide || "Rocket Character");
    }
  };

  return {
    isSpeaking,
    isPaused,
    speakingGuide,
    currentText,
    audioWaves,
    speak,
    pause,
    resume,
    stop,
    replay,
  };
}
