/**
 * Mini-Games Configurations & Definitions
 * Abandoned But Not Forgotten - Gamification System
 * 
 * Each game is designed for a rich 3 to 5 minute gameplay session
 * with authentic scientific principles, realistic audio, and clear guides.
 */

export const miniGames = {
  "lunar-rover": {
    id: "lunar-rover",
    title: "Lunar Rover Crater Traverse",
    icon: "🛻",
    planet: "Moon",
    mission: "Apollo 15 / 17 LRV Mission",
    duration: "3 - 5 Minutes",
    targetDistance: "2,500 Meters",
    objective: "Pilot the NASA Lunar Science Satellite (or Apollo Rover) across Hadley Rille to recover pristine Apollo Genesis crystals and core drill samples with your magnetic tractor scoop. Steer clear of fatal impact craters and radioactive fissures!",
    collectibles: [
      { name: "Lunar Diamonds & Zircons", icon: "💎", points: "+100 pts", desc: "Ultra-dense crystal grains formed during the primordial lunar magma ocean." },
      { name: "Genesis Rock (Anorthosite)", icon: "🔷", points: "+150 pts", desc: "4.5-billion-year-old primordial crust sample discovered by Apollo 15." },
      { name: "Apollo Core Drill Samples", icon: "🧪", points: "+200 pts", desc: "Subsurface core cylinders containing ancient solar wind particles." },
      { name: "Helium-3 Power Cells", icon: "🔋", points: "+20% Battery", desc: "Clean fusion isotopes trapped in regolith to recharge rover motor drive." },
    ],
    hazards: [
      { name: "Deep Impact Craters", icon: "🕳️", effect: "-1 Shield Life", desc: "Steep void drops that damage vehicle suspension. You have 3 lives." },
      { name: "Jagged Basalt Boulders", icon: "🪨", effect: "-1 Shield Life", desc: "Razor volcanic ejecta blocks. You have 3 lives." },
      { name: "Radioactive Regolith Fissures", icon: "☢️", effect: "-1 Shield Life", desc: "Unstable thermal fissures. You have 3 lives." },
      { name: "Volatile Micro-Meteorites", icon: "☄️", effect: "-1 Shield Life", desc: "High-velocity cosmic impact debris pockets. You have 3 lives." },
    ],
    instructions: "Move your MOUSE / CURSOR left and right across the track (or use [A / D] / Arrow Keys / On-screen Buttons) to steer your satellite or rover! Capture diamonds, crystals, core tubes, and battery cells. Avoid colliding with craters and boulders — you have 3 shield lives before losing!",
    rewardBadge: "lunar-rover-expert",
    xpReward: 250
  },
  "alsep-science": {
    id: "alsep-science",
    title: "ALSEP Lunar Seismology Lab",
    icon: "🔬",
    planet: "Moon",
    mission: "Apollo ALSEP Package (Apollo 11 - 17)",
    duration: "3 - 5 Minutes",
    objective: "Deploy the Apollo Passive Seismic Experiment (PSE) array, listen to real-time resonant frequency hums, and calibrate the bandpass filters to isolate 3 authentic moonquakes: Thermal, Deep Tidal, and Artificial Saturn Rocket Impact!",
    scienceFact: "Because the Moon is completely bone dry with no oceans or atmosphere, seismic energy does not attenuate. The Moon literally rings like a church bell for up to 10 minutes following an impact!",
    stages: [
      { stage: 1, name: "Thermal Quake (Sunrise Expansion)", targetFreq: 22, targetGain: 4, desc: "Frigid lunar regolith cracks as sunlight warms the surface from -130°C to +120°C." },
      { stage: 2, name: "Deep Tidal Moonquake", targetFreq: 45, targetGain: 7, desc: "Gravitational tidal tug from Earth stresses faults 800-1,000 km deep inside the Moon." },
      { stage: 3, name: "Saturn Rocket Impact (Bell Ringing)", targetFreq: 68, targetGain: 9, desc: "NASA deliberately crashed spent Saturn S-IVB rocket stages into the Moon to create seismic soundings." },
    ],
    instructions: "Adjust the Frequency Filter slider (listen to the live audible audio hum!) and Signal Gain slider until the waveform locks. Toggle audio monitor to hear the authentic resonant ringing signature!",
    rewardBadge: "moon-scientist",
    xpReward: 250
  },
  "ingenuity-flight": {
    id: "ingenuity-flight",
    title: "Ingenuity Mars Aerodynamic Flight Simulator",
    icon: "🚁",
    planet: "Mars",
    mission: "Mars 2020 Perseverance & Ingenuity",
    duration: "2 Minutes",
    objective: "Pilot the twin-rotor helicopter through extreme Martian aerodynamic conditions across 5 waypoints in Jezero Crater within the 2-minute flight window. Fight high-velocity crosswinds, dodge swirling dust devils, and survive sudden low-density air pockets!",
    distractions: [
      { name: "Martian Dust Devils", icon: "🌪️", desc: "Turbulent mini-tornadoes that sweep across the flight path and throw the rotorcraft into violent pitch deviations." },
      { name: "Turbulent Crosswinds & Shears", icon: "💨", desc: "Sudden atmospheric gust vectors requiring continuous manual rudder and tilt corrections." },
      { name: "Dust Storm Whiteout", icon: "🌫️", desc: "Transient dust clouds that obscure visual flight cameras; fly strictly by altitude telemetry!" },
      { name: "Low-Density Air Pockets", icon: "⚠️", desc: "Sudden drop in atmospheric pressure requiring instant maximum rotor RPM thrust bursts." },
    ],
    instructions: "Hold [Spacebar / ▲ Thrust Button] to spin twin carbon-fiber blades to 2,500+ RPM and climb. Use [A / D] or [◀ / ▶ Tilt Buttons] to steer. If altitude reaches the baseline (0m), touch down safely and thrust back up! Clear all 5 waypoint gates before the 2-minute mission clock runs out!",
    rewardBadge: "flight-pioneer",
    xpReward: 300
  },
  "mars-rover": {
    id: "mars-rover",
    title: "Oppy's Mars Blueberry Hunt",
    icon: "🤖",
    planet: "Mars",
    mission: "Opportunity Rover • Mars Water Hunt",
    duration: "2 - 3 Minutes",
    objective: "Drive Oppy the friendly Mars Rover across the Martian sands! Scoop up all 5 sparkling Martian Blueberries, recharge with solar batteries, and drive to the NASA Flag to celebrate your water discovery!",
    features: [
      { name: "Martian Blueberries (Hematite)", icon: "🫐", desc: "Real mineral pearls discovered by NASA in 2004 that prove liquid water once existed on Mars!" },
      { name: "Solar Power Batteries", icon: "🔋", desc: "Drive over bright green batteries to boost Oppy's solar energy to 100%!" },
      { name: "Friendly Whirly Dust Devils", icon: "🌪️", desc: "Whirlwinds that spin Oppy around and sweep dust clean off the solar panels!" },
      { name: "NASA Victory Flag", icon: "🏁", desc: "Appears once you find all 5 blueberries. Drive to it to win!" },
    ],
    instructions: "Drive Oppy using your Keyboard [Arrow Keys] or [W A S D], tap the big green arrows, or tap any neighboring tile! Scoop up 5 Blueberries and reach the NASA Flag to win!",
    rewardBadge: "rover-specialist",
    xpReward: 300
  },
  "insight-seismic": {
    id: "insight-seismic",
    title: "InSight: Listen to the Heart of Mars",
    icon: "👂",
    planet: "Mars",
    mission: "InSight Lander SEIS Experiment",
    duration: "3 - 5 Minutes",
    objective: "Listen to the deep audible heartbeat of Mars! Deploy the Wind and Thermal Shield (WTS), filter out atmospheric gusts, and analyze seismic P-waves and S-waves reflecting off the molten Martian core boundary.",
    layers: [
      { layer: 1, name: "Crustal Sounding (30-70 km)", desc: "Deploy protective dome to silence howling surface wind noise." },
      { layer: 2, name: "Mantle Plume Thermal Convection", desc: "Tune bandpass to 38-42 Hz to detect shear S-waves travelling through warm mantle rock." },
      { layer: 3, name: "Molten Core Boundary (1,830 km Radius)", desc: "Hear the sub-bass rhythmic heartbeat pulse reflecting from the liquid iron-sulfur core!" },
    ],
    instructions: "1) Deploy the protective Wind & Thermal Shield. 2) Adjust the bandpass frequency to match core acoustics. 3) Listen to the audible planetary heartbeat and triangulate the Magnitude 5.0 marsquake!",
    rewardBadge: "seismic-pioneer",
    xpReward: 250
  },
  "kepler-transit": {
    id: "kepler-transit",
    title: "Kepler Alien World Hunter",
    icon: "🔭",
    planet: "Deep Space",
    mission: "Kepler Space Telescope • Alien Earths Search",
    duration: "2 - 3 Minutes",
    objective: "Peer through NASA's Kepler Space Telescope to find 3 real habitable alien planets! Watch the bright star blink as an alien world orbits across it. Snap a telescope photo during the eclipse, test for liquid water in the Goldilocks Zone, and collect all 3 alien worlds!",
    features: [
      { name: "Kepler-452b: Earth's Big Brother", icon: "🌍", desc: "A rocky Super-Earth orbiting a warm golden sun with green continents, blue oceans, and clouds!" },
      { name: "Kepler-186f: The Red-Sun Earth", icon: "🔴", desc: "An Earth-sized world orbiting a cozy red dwarf star with crimson and violet alien plant life!" },
      { name: "Kepler-22b: The Ocean Paradise", icon: "🌊", desc: "A colossal water world covered entirely by a global warm ocean with no dry land!" },
      { name: "The Goldilocks Zone Test", icon: "🍲", desc: "Not too hot, not too cold — just right for liquid water and alien life!" },
    ],
    instructions: "1) Watch the star: when the dark planet passes in front of the bright star, click [📸 SNAP PHOTO] or press [Spacebar]! 2) Click [💧 SCAN FOR WATER] to reveal the living planet! 3) Find all 3 Alien Earths to win!",
    rewardBadge: "exoplanet-hunter",
    xpReward: 280
  }
};
