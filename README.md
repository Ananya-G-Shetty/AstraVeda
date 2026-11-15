# NASA Space Apps Challenge 2026
## “Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars”

> *"Some explorers stopped moving. Their stories never did."*

An immersive, cinematic, 3D interactive storytelling & gamified space exploration frontend application designed for the NASA Space Apps Challenge 2026.

---

## 🌟 The Complete Astronautical Odyssey

The experience takes the explorer on a continuous cosmic expedition:

1. **🌍 Earth Outer Space Beginning**:
   - 3D rotating Earth with atmospheric scattering and cloud layers.
   - Launchpad and orbital positioning of NASA's Space Launch System (SLS) rocket.
   - Cinematic call to action: *"I'M ABANDONED BUT NOT FORGOTTEN — Some explorers stopped moving. Their stories didn't."*

2. **🚀 Rocket Launch Sequence**:
   - Engine ignition with glowing ion and chemical thruster particle plumes.
   - Camera ascent following rocket trajectory as Earth recedes and stars streak past.

3. **🌌 Deep Space Cruise & Decision**:
   - Holographic HUD cockpit interface (Destination A: Moon at 384,400 KM vs Destination B: Mars at 54.6M KM).
   - Dynamic planet hover glows, atmospheric rim lighting, telemetry readouts.

4. **🌕 Moon 3D Expedition**:
   - 3D interactive lunar sphere with crater surface modeling and basaltic lunar maria.
   - Glowing 3D beacons for **Apollo 11 Eagle Lunar Module**, **Lunar Roving Vehicle (LRV - 'Moon Buggy')**, **ALSEP Scientific Packages**, and **Surveyor 3 Lander**.
   - Minimalist HUD: `🌕 MOON EXPEDITION DISCOVERED X / 4 • LUNAR EXPLORER LEVEL X`.

5. **🔴 Mars 3D Expedition**:
   - Rugged, mysterious Martian terrain with salmon-pink atmospheric haze and Olympus Mons.
   - Interactive 3D beacons for **Sojourner**, **Spirit & Opportunity**, **Viking 1 & 2**, **InSight**, **Ingenuity Mars Helicopter**, **Kepler**, **Dawn**, **NEAR Shoemaker**, and **Pioneer 10 & 11**.
   - Minimalist HUD: `🔴 MARS EXPEDITION DISCOVERED X / 8 • MARS SCOUT LEVEL X`.

6. **🤖 Interactive Storytelling Guides & Web Speech Voice-Over**:
   - **🌕 Luna**: Friendly lunar celestial guide bot with floating orbital ring and facial animations.
   - **🔴 Ares Scout**: Rugged Martian reconnaissance drone with optical camera eye and telemetry pulses.
   - **Voice Controls**: Synthesized speech reading dialogue aloud with Play, Pause, Replay, Mute, and real-time audio wave equalizer animations. Accessible as plain text for all users.

7. **🎮 6 NASA-Authentic Mini-Games**:
   - 🛻 **Lunar Rover Traverse**: Steer wire-mesh wheels through craters and collect core samples to reach Apollo 15.
   - 🔬 **ALSEP Seismology Lab**: Deploy seismometer arrays and uncover deep moonquakes.
   - 🚁 **Ingenuity Flight Simulator**: Spin rotors to 2,500 RPM, overcome Martian winds, and maintain lift in 1% atmosphere.
   - 🤖 **Mars Rover Challenge**: Analyze rock outcrop hematite blueberries with Opportunity.
   - 👂 **InSight - Listen to Mars**: Slide bandpass filters to isolate the magnitude 5.0 marsquake from wind noise.
   - 🔭 **Kepler Exoplanet Transit Hunter**: Detect the micro-dip in stellar light curves as an exoplanet transits.

8. **🏆 Collectible Badges & Local Progression**:
   - 6 Explorer Ranks: *Space Cadet* → *Lunar Explorer* → *Mars Scout* → *Rover Specialist* → *Mission Explorer* → *Space Archaeologist*.
   - 10 Collectible 3D-styled badges with unlock fanfare and confetti animations.
   - Frontend-only persistence via `localStorage`.

9. **🌌 "Space Archaeologist" Memorial**:
   - Comprehensive celebration of humanity's footprints across the solar system.

---

## 📁 Data Placeholder Architecture

All content is strictly decoupled from the presentation components:

```
src/
├── data/
│   ├── moonData.js      <-- Moon artifacts, NSSDCA links, landing coordinates, and story nodes
│   ├── marsData.js      <-- Mars & interplanetary probes, facts, and story choices
│   ├── gameData.js      <-- Mini-game configurations, instructions, and XP rewards
│   └── badgesData.js    <-- Collectible badges, rarity tiers, and progression levels
├── components/
│   ├── Navigation.jsx       <-- Holographic floating navbar
│   ├── StoryGuide.jsx       <-- Animated Luna & Ares guides with voice visualizer
│   ├── StoryModal.jsx       <-- Interactive story questionnaire and equipment visualizer
│   ├── BadgesModal.jsx      <-- Collectible badge showcase & XP level tracker
│   ├── MissionsDrawer.jsx   <-- Quick launch menu for simulations and artifacts
│   └── FinalMemorialModal.jsx <-- Humanity's footprints memorial hall
├── scenes/
│   ├── Starfield.jsx        <-- Twinkling 3D procedural starfield
│   ├── EarthGlobe.jsx       <-- 3D Earth and launching SLS rocket
│   ├── MoonGlobe.jsx        <-- 3D Moon with interactive beacons
│   ├── MarsGlobe.jsx        <-- 3D Mars with rugged atmosphere & probes
│   ├── SolarTravelScene.jsx <-- Cockpit trajectory view with Moon & Mars
│   └── ArtifactMarker.jsx   <-- Glowing 3D laser beacon with hover card
├── games/
│   └── GameModal.jsx        <-- 6 Interactive gamified challenges
├── hooks/
│   ├── useProgression.js    <-- LocalStorage XP, rank, and badge tracker
│   └── useVoiceOver.js      <-- Web Speech API synthesis & wave animator
└── utils/
    ├── soundEngine.js       <-- Web Audio API sci-fi synthesizer & sound effects
    └── textureGenerator.js  <-- 100% offline procedural textures for Earth, Moon, & Mars
```

### How Another Team Can Insert Final NASA Content
Simply edit `src/data/moonData.js` or `src/data/marsData.js`. Each entry uses the standardized schema:
```javascript
{
  id: "apollo-lunar-module",
  name: "Apollo 11 Lunar Module (Eagle Descent Stage)",
  shortName: "Apollo 11 Eagle",
  type: "lander", // 'lander' | 'rover' | 'helicopter' | 'science' | 'spacecraft'
  planet: "Moon",
  mission: "Apollo 11",
  year: "1969",
  landingSite: "Mare Tranquillitatis",
  coordinates: { lat: 0.67408, lon: 23.47297, x: 0.72, y: 0.15, z: 0.65 },
  status: "Historic Monument on Lunar Surface",
  significance: "First crewed landing on another celestial body.",
  nasaUrl: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C",
  guideIntro: "...",
  storyNodes: [
    {
      step: 1,
      question: "...",
      choices: [
        { text: "...", correct: true, explanation: "..." }
      ],
      reveal: "...",
      nasaFact: "..."
    }
  ]
}
```

---

## 🚀 Running the Project

```bash
# Navigate to the project directory
cd C:\Users\Lenovo\.gemini\antigravity\scratch\nasa-abandoned-not-forgotten

# Install dependencies (already pre-installed)
npm install

# Start the Vite development server
npm run dev

# Build production bundle
npm run build
```

