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
    duration: "3 - 5 Minutes",
    objective: "Pilot the twin-rotor helicopter through extreme Martian aerodynamic conditions across 5 waypoints in Jezero Crater. Fight high-velocity crosswinds, dodge swirling dust devils, and survive sudden low-density air pockets!",
    distractions: [
      { name: "Martian Dust Devils", icon: "🌪️", desc: "Turbulent mini-tornadoes that sweep across the flight path and throw the rotorcraft into violent pitch deviations." },
      { name: "Turbulent Crosswinds & Shears", icon: "💨", desc: "Sudden atmospheric gust vectors requiring continuous manual rudder and tilt corrections." },
      { name: "Dust Storm Whiteout", icon: "🌫️", desc: "Transient dust clouds that obscure visual flight cameras; fly strictly by altitude telemetry!" },
      { name: "Low-Density Air Pockets", icon: "⚠️", desc: "Sudden drop in atmospheric pressure requiring instant maximum rotor RPM thrust bursts." },
    ],
    instructions: "Hold [Spacebar / Thrust Button] to spin twin carbon-fiber blades to 2,500+ RPM and climb. Use [Left / Right] or Tilt Buttons to steer. Keep altitude strictly within the safe green corridor and clear all 5 waypoint gates!",
    rewardBadge: "flight-pioneer",
    xpReward: 300
  },
  "mars-rover": {
    id: "mars-rover",
    title: "Opportunity Rock Sample Expedition",
    icon: "🤖",
    planet: "Mars",
    mission: "Mars Exploration Rover (MER-B) Opportunity",
    duration: "3 - 5 Minutes",
    objective: "Navigate an 8x8 Martian terrain across 3 exploration sectors (Eagle, Endurance, and Victoria Craters). Deploy the Rock Abrasion Tool (RAT) and Alpha Particle X-ray Spectrometer (APXS) to uncover ancient standing water minerals while surviving sand dune traps!",
    features: [
      { name: "Spectrometer Rock Scanning", icon: "🔍", desc: "Scan adjacent rock outcrops to reveal their elemental chemical composition." },
      { name: "Hematite Blueberries", icon: "🫐", desc: "Grey hematite spherules that formed only in ancient acidic liquid groundwater." },
      { name: "Purgatory Dune Sand Traps", icon: "⚠️", desc: "Deep loose drifts where rover wheels spin and drain 2x battery power." },
      { name: "Dust Devil Cleaning Events", icon: "🌬️", desc: "Lucky Martian breezes that sweep dust off solar panels and recharge battery to 100%!" },
    ],
    instructions: "Move with D-Pad or Arrow Keys. Drive near rock formations to scan them with your spectrometer, drill hematite blueberries, avoid soft sand dunes, and catch cleaning winds!",
    rewardBadge: "rover-specialist",
    xpReward: 260
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
    title: "Kepler Exoplanet Transit Hunter",
    icon: "🔭",
    planet: "Deep Space",
    mission: "Kepler Space Telescope Photometer",
    duration: "3 - 5 Minutes",
    objective: "Monitor real-time stellar light curves from 3 candidate star systems. Detect the periodic transit dip when an alien world crosses in front of its star, calculate the planet's radius ratio, and determine if it orbits inside the habitable Goldilocks Zone!",
    transitMethodGuide: [
      { step: 1, title: "Photometric Flux Monitoring", desc: "As the planet crosses the star's disc, it blocks starlight, creating a characteristic U-shaped dip in brightness." },
      { step: 2, title: "Transit Depth = (Rp / R*)^2", desc: "A 0.1% dip reveals an Earth-sized rocky world. A 1.0% dip reveals a Neptune-sized ice world. A 2.5% dip reveals a Jupiter gas giant." },
      { step: 3, title: "Orbital Period & Habitable Zone", desc: "Planets with 200 to 450-day orbits around Sun-like stars fall into the Goldilocks zone where liquid water and life can exist!" },
    ],
    targets: [
      { id: 1, star: "Kepler-186", planet: "Kepler-186f", type: "Earth-Sized Terrestrial", period: "130 Days", dip: "0.04% Depth", status: "Habitable Zone of Red Dwarf" },
      { id: 2, star: "Kepler-452", planet: "Kepler-452b", type: "Earth's Older Cousin (Super-Earth)", period: "385 Days", dip: "0.12% Depth", status: "Habitable Zone of G2 Sun-like Star" },
      { id: 3, star: "Kepler-22", planet: "Kepler-22b", type: "Ocean Super-Earth (2.4x Earth Radius)", period: "290 Days", dip: "0.22% Depth", status: "Habitable Zone Ocean World" },
    ],
    instructions: "Watch the star's brightness curve. When the dip starts, click 'MARK TRANSIT ENTRY', then 'MARK TRANSIT EXIT'. Measure the flux drop with the caliper slider, calculate planetary radius, and confirm habitability!",
    rewardBadge: "exoplanet-hunter",
    xpReward: 280
  }
};
