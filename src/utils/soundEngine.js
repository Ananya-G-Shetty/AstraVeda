// Web Audio API Sci-Fi Sound Synthesizer & Speech Synthesis Controller

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.ambientGain = null;
    this.ambientOsc = null;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(mute) {
    this.muted = mute;
    if (this.ambientGain) {
      this.ambientGain.gain.setValueAtTime(mute ? 0 : 0.05, this.ctx ? this.ctx.currentTime : 0);
    }
    if (mute && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  // Futuristic UI click
  playClick(type = 'normal') {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    if (type === 'mars') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.08);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    } else if (type === 'decision') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.06);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    }

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.16);
  }

  // Rocket launch engine rumble & whoosh
  playRocketLaunch() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    
    // Low rumble oscillator
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(45, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 3.0);

    // Noise buffer for thrust flame
    const bufferSize = this.ctx.sampleRate * 3.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    // Filter noise to create deep rocket roar
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(150, now);
    filter.frequency.linearRampToValueAtTime(900, now + 2.5);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.01, now);
    noiseGain.gain.linearRampToValueAtTime(0.25, now + 1.2);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 3.5);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 1.5);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 3.5);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    noise.start(now);
    osc.stop(now + 3.5);
    noise.stop(now + 3.5);
  }

  // Discovery Fanfare & XP Unlock
  playDiscoveryFanfare() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime + idx * 0.1;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    });
  }

  // Radar Beep
  playRadarPing() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1800, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.12);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  // Start subtle space drone ambient
  startSpaceDrone() {
    if (this.ambientOsc) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      this.ambientOsc = this.ctx.createOscillator();
      this.ambientGain = this.ctx.createGain();

      this.ambientOsc.type = 'sine';
      this.ambientOsc.frequency.setValueAtTime(55, this.ctx.currentTime); // Low A

      this.ambientGain.gain.setValueAtTime(this.muted ? 0 : 0.03, this.ctx.currentTime);

      this.ambientOsc.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);
      this.ambientOsc.start();
    } catch (e) {
      console.warn("Ambient audio unable to auto-start:", e);
    }
  }

  // ALSEP: Live continuous seismic tuning tone that shifts with frequency
  startSeismicHum(frequency = 45) {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    if (!this.seismicOsc) {
      const now = this.ctx.currentTime;
      this.seismicOsc = this.ctx.createOscillator();
      this.seismicGain = this.ctx.createGain();
      this.seismicFilter = this.ctx.createBiquadFilter();

      this.seismicOsc.type = 'triangle';
      this.seismicOsc.frequency.setValueAtTime(frequency * 2.5, now);

      this.seismicFilter.type = 'bandpass';
      this.seismicFilter.frequency.setValueAtTime(frequency * 2.5, now);
      this.seismicFilter.Q.setValueAtTime(6.0, now);

      this.seismicGain.gain.setValueAtTime(0.001, now);
      this.seismicGain.gain.linearRampToValueAtTime(0.08, now + 0.15);

      this.seismicOsc.connect(this.seismicFilter);
      this.seismicFilter.connect(this.seismicGain);
      this.seismicGain.connect(this.ctx.destination);
      this.seismicOsc.start(now);
    } else {
      this.updateSeismicFreq(frequency);
    }
  }

  updateSeismicFreq(frequency = 45) {
    if (!this.seismicOsc || !this.ctx) return;
    const now = this.ctx.currentTime;
    const targetFreq = Math.max(30, frequency * 2.5);
    this.seismicOsc.frequency.setTargetAtTime(targetFreq, now, 0.05);
    if (this.seismicFilter) {
      this.seismicFilter.frequency.setTargetAtTime(targetFreq, now, 0.05);
    }
  }

  stopSeismicHum() {
    if (this.seismicGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.seismicGain.gain.linearRampToValueAtTime(0.001, now + 0.15);
      setTimeout(() => {
        if (this.seismicOsc) {
          try {
            this.seismicOsc.stop();
            this.seismicOsc.disconnect();
          } catch (e) {}
          this.seismicOsc = null;
        }
      }, 160);
    }
  }

  // ALSEP: Authentic Apollo Lunar Moonquake Resonance (The Moon rings like a bell)
  playMoonquakeRumble() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Harmonic bell ringing nodes (3.4 Hz, 45 Hz, 88 Hz, 130 Hz)
    const bellFrequencies = [45, 88, 134, 210];
    bellFrequencies.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Long ringing decay typical of the dry lunar regolith
      gain.gain.setValueAtTime(0.12 / (idx + 1), now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 4.6);
    });

    // Sub-surface seismic ground rumble (low-pass noise)
    const bufferSize = this.ctx.sampleRate * 4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.45));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(65, now);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.18, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 4.0);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);
    noise.start(now);
  }

  // INSIGHT: Rhythmic Heartbeat of Mars (Molten Core & Mantle pulse)
  startMarsHeartbeat() {
    if (this.muted || this.marsHeartbeatInterval) return;
    this.initContext();
    if (!this.ctx) return;

    const triggerHeartbeatPulse = () => {
      if (this.muted || !this.ctx) return;
      const now = this.ctx.currentTime;

      // Dual beat: "LUB-DUB"
      [0, 0.22].forEach((offset, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = now + offset;

        osc.type = 'sine';
        // Sub-bass fundamental (45Hz - 55Hz)
        osc.frequency.setValueAtTime(idx === 0 ? 52 : 46, t);
        osc.frequency.exponentialRampToValueAtTime(32, t + 0.18);

        gain.gain.setValueAtTime(0.22, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.26);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.28);
      });
    };

    triggerHeartbeatPulse();
    this.marsHeartbeatInterval = setInterval(triggerHeartbeatPulse, 1400); // ~43 BPM planetary heartbeat
  }

  stopMarsHeartbeat() {
    if (this.marsHeartbeatInterval) {
      clearInterval(this.marsHeartbeatInterval);
      this.marsHeartbeatInterval = null;
    }
  }

  // Gem / Diamond / Crystal Collect Chime
  playGemCollect() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [880, 1174, 1567]; // A5, D6, G6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = now + idx * 0.05;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.1, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.25);
    });
  }

  // Fatal Hazard / Mine / Crater Collision Explosion
  playHazardExplosion() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(25, now + 0.6);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.7);
  }

  // Ingenuity Rotor Speed Boost
  playRotorBoost() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.linearRampToValueAtTime(580, now + 0.2);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.26);
  }

  // Opportunity Spectrometer Laser Scan
  playSpectrometerScan() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.linearRampToValueAtTime(1400, now + 0.35);

    gain.gain.setValueAtTime(0.07, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.42);
  }

  // Opportunity Rock Abrasion Tool (RAT) Grinder
  playRockDrill() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.linearRampToValueAtTime(320, now + 0.25);
    osc.frequency.linearRampToValueAtTime(160, now + 0.5);

    gain.gain.setValueAtTime(0.09, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.58);
  }

  // NASA JPL Quindar / Radio Comms Beep
  playRadioBeep() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    [2525, 2475].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = now + idx * 0.08;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.07);
    });
  }

  // Camera / Telescope Shutter Snapshot Click
  playCameraShutter() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Click 1 (Mirror up)
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(1200, now);
    osc1.frequency.exponentialRampToValueAtTime(300, now + 0.04);
    gain1.gain.setValueAtTime(0.12, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.05);

    // Click 2 (Curtain close)
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(600, now + 0.08);
    osc2.frequency.exponentialRampToValueAtTime(150, now + 0.14);
    gain2.gain.setValueAtTime(0.15, now + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(now + 0.08);
    osc2.stop(now + 0.15);
  }

  // Alien Planet Magical Reveal Fanfare
  playPlanetReveal() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [440, 554.37, 659.25, 880, 1108.73]; // A4, C#5, E5, A5, C#6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime + idx * 0.07;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.1, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.38);
    });
  }
}

export const sound = new SoundEngine();

