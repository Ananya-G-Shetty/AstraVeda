/**
 * NASA Mars & Deep Space Equipment Data
 * Abandoned But Not Forgotten - Mars & Interplanetary Expedition
 * 
 * Symmetrically aligned across major Martian geographic basins and deep-space orbital sectors.
 */

export const marsArtifacts = [
  {
    id: "spirit-opportunity",
    name: "Spirit & Opportunity (Mars Exploration Rovers)",
    shortName: "Opportunity (Oppy)",
    type: "rover",
    planet: "Mars",
    mission: "Mars Exploration Rovers (MER)",
    year: "2004 - 2018",
    landingDateExact: "2004-01-25T05:05:00Z",
    landingSite: "Meridiani Planum (Prime Meridian / Endeavour Crater)",
    coordinates: { lat: -2.0, lon: 0.0 }, // Equatorial Prime Meridian Center
    currentRestingStatus: "Martian Marathon Champion • Inactive at Perseverance Valley",
    status: "Inactive Monuments to Human Exploration",
    significance: "Twin solar-powered rovers designed for 90-day missions. Opportunity explored Mars for 14.5 years, drove over 28 miles (a marathon in space), and proved ancient Mars once held liquid water hospitable to life.",
    nasaUrl: "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/",
    image: "/nasa/opportunity-rover.jpg",
    modelType: "rover",
    gameId: "mars-rover",
    badgeReward: "mars-explorer",
    guideVoice: "ares",
    guideIntro: "Opportunity, affectionately known as 'Oppy', was one of the greatest endurance champions in space history. Built for 90 days, it survived 5,111 Martian sols until a planet-wide dust storm blotted out the sun.",
    characterGreeting: "Hi Earthling! I'm Opportunity, but you can call me Oppy! 🔴✨",
    whatItIs: "Mars Exploration Rover B (MER-B 'Opportunity') — Six-wheeled solar robotic geologist.",
    missionUsedFor: "NASA Mars Exploration Rover Mission (MER), launched July 7, 2003 on a Boeing Delta II Heavy rocket from Cape Canaveral to search for geological evidence of past liquid water.",
    whatItCarried: "Panoramic Camera (Pancam), Miniature Thermal Emission Spectrometer (Mini-TES), Mössbauer Spectrometer, Alpha Particle X-Ray Spectrometer (APXS), Rock Abrasion Tool (RAT) diamond grinder, Microscopic Imager, UHF antenna, and solar arrays.",
    whyLeftThere: "In June 2018, a catastrophic global dust storm blotted out 99% of sunlight across Mars. My solar panels were covered in fine dust and my batteries drained after 5,111 sols (over 14.5 years). My final message to Earth was: 'My battery is low and it is getting dark.'",
    whatItIsDoingNow: "Resting peacefully in Perseverance Valley on the crest of Endeavour Crater, standing as an eternal monument to human endurance waiting for future astronauts.",
    speechDialogue: {
      whoAmI: "Hi Earthling! I'm Opportunity, though my human friends at NASA always called me Oppy! I'm a six-wheeled solar-powered robotic geologist built to explore the surface of Mars!",
      mission: "I landed in January 2004 to search for proof that liquid water once flowed across Mars! My mission was planned for just 90 days, but I kept driving and driving—completing a full 28-mile marathon across craters and dunes!",
      carried: "I carried high-tech panoramic cameras, a robotic arm with a diamond-tipped rock grinder called the RAT, spectrometers to analyze minerals, and solar arrays! I discovered millions of hematite 'blueberries' that only form in standing water!",
      whyLeft: "In June 2018, a ferocious planet-wide dust storm blotted out the sun across all of Mars. Thick dust blocked sunlight from reaching my solar panels. After 5,111 sols, my batteries drained. My human team sang me wake-up songs, but it was time for me to sleep.",
      doingNow: "I am resting peacefully right here in Perseverance Valley on the edge of Endeavour Crater! I showed humanity that Mars was once a wet, hospitable world, and I'm waiting for future human astronauts to come visit me!"
    },
    storyNodes: [
      {
        step: 1,
        question: "What famous microscopic discovery did Opportunity make inside the Martian rock outcrops?",
        choices: [
          { text: "Hematite 'Blueberries' formed in ancient standing liquid water", correct: true, explanation: "Bingo! Opportunity discovered millions of tiny mineral spheres nicknamed 'blueberries' that only precipitate in soaking groundwater." },
          { text: "Fossilized alien dinosaur bones", correct: false, explanation: "No macroscopic fossils have ever been found on Mars, though ancient microbial signatures remain the focus of current rovers." },
          { text: "Diamonds scattered in the craters", correct: false, explanation: "The true treasure was water-deposited minerals, proving Mars was once warm and wet!" }
        ],
        reveal: "Opportunity traversed craters like Endurance, Victoria, and Endeavour, uncovering sulfate salts and clay minerals deposited by ancient lakes.",
        nasaFact: "Opportunity's poetic last transmission to Earth translated to: 'My battery is low and it is getting dark.' Its monument rests peacefully at Perseverance Valley on the rim of Endeavour Crater."
      }
    ]
  },
  {
    id: "sojourner-rover",
    name: "Sojourner Rover (Mars Pathfinder)",
    shortName: "Sojourner",
    type: "rover",
    planet: "Mars",
    mission: "Mars Pathfinder",
    year: "1997",
    landingDateExact: "1997-07-04T16:57:00Z",
    landingSite: "Ares Vallis (Southwestern Outflow Plain)",
    coordinates: { lat: -18.0, lon: -40.0 }, // Southwestern Martian Sector
    currentRestingStatus: "First Wheeled Mars Explorer • Stationed at Carl Sagan Memorial Base",
    status: "First Wheeled Explorer / Station Inactive",
    significance: "Humanity's very first robotic rover on Mars. Microwave-oven sized (just 23 pounds), it proved rovers could survive and navigate the Red Planet autonomously.",
    nasaUrl: "https://science.nasa.gov/mission/mars-pathfinder/",
    image: "/nasa/sojourner-rover.jpg",
    modelType: "rover",
    gameId: "mars-rover",
    badgeReward: "rover-specialist",
    guideVoice: "ares",
    guideIntro: "Behold the pioneer. Sojourner weighed only 10.5 kilograms and had wheels the size of tea cups. It was the brave trailblazer that proved wheels could roll across the rust-colored sands of Mars.",
    characterGreeting: "Beep beep! I'm Sojourner, the first rover on Mars! 🚙💨",
    whatItIs: "Sojourner Rover (Mars Pathfinder) — The first autonomous wheeled planetary rover in human history.",
    missionUsedFor: "NASA Mars Pathfinder mission, launched December 4, 1996 on a Delta II rocket to pioneer low-cost planetary entry, landing airbags, and autonomous rover operations.",
    whatItCarried: "Alpha Proton X-Ray Spectrometer (APXS), front stereo monochrome cameras, rear color camera, UHF radio antenna, solar array, and 6-wheel rocker-bogie mobility suspension.",
    whyLeftThere: "Designed as a 7-sol technology demonstration. Survived for 83 Martian sols and traversed 100 meters until the Pathfinder lander station battery succumbed to extreme cold in September 1997.",
    whatItIsDoingNow: "Parked beside the lander in Ares Vallis, forever commemorated as the great trailblazer.",
    speechDialogue: {
      whoAmI: "Beep beep! I'm Sojourner, the very first wheeled rover in human history to drive on the surface of Mars! I'm named after the heroic civil rights activist Sojourner Truth!",
      mission: "I arrived on the 4th of July, 1997 with the Mars Pathfinder mission! NASA wanted to test if a low-cost robot could drive across the Martian desert on its own. I was tiny—only 23 pounds, the size of a microwave oven!",
      carried: "I carried six wheels on a flexible rocker-bogie suspension, stereo cameras, radio antennas, and an X-ray spectrometer! I rolled up to rocks named 'Barnacle Bill' and 'Yogi' and sniffed out volcanic minerals!",
      whyLeft: "I was only built to last for 7 Martian days! Instead, I survived for 83 days and took hundreds of photos! In late September 1997, my mothership lander's communications battery ran out of life in the freezing cold.",
      doingNow: "I am resting safely in Ares Vallis next to the Carl Sagan Memorial Station! Every bigger rover that followed—Spirit, Opportunity, Curiosity, and Perseverance—owes their wheels to me!"
    },
    storyNodes: [
      {
        step: 1,
        question: "How long was Sojourner originally planned to last on Mars?",
        choices: [
          { text: "7 Martian days (sols)", correct: true, explanation: "Correct! NASA engineers designed it for a 7-sol test mission. Instead, it operated for an astonishing 83 sols and took 550 photos!" },
          { text: "10 Earth years", correct: false, explanation: "Modern rovers like Curiosity last over a decade, but Sojourner was a low-cost proof-of-concept prototype!" },
          { text: "Only 1 hour before melting", correct: false, explanation: "Mars is very cold, not hot! Sojourner was well insulated with aerogel." }
        ],
        reveal: "Sojourner analyzed Martian rocks nicknamed 'Barnacle Bill' and 'Yogi', finding evidence of ancient flash-floods that shaped Mars billions of years ago.",
        nasaFact: "Sojourner was named in honor of Sojourner Truth, the African-American abolitionist and civil rights activist who traveled the country championing human freedom."
      }
    ]
  },
  {
    id: "viking-landers",
    name: "Viking 1 & 2 Landers",
    shortName: "Viking 1",
    type: "lander",
    planet: "Mars",
    mission: "Viking Program",
    year: "1976 - 1982",
    landingDateExact: "1976-07-20T11:53:06Z",
    landingSite: "Chryse Planitia (Northwestern Plain of Gold)",
    coordinates: { lat: 25.0, lon: -80.0 }, // Northwestern Martian Sector
    currentRestingStatus: "First US Successful Mars Lander • Thomas A. Mutch Memorial Station",
    status: "First Successful US Surface Mission on Mars",
    significance: "In July 1976, Viking 1 captured the very first high-resolution color photographs from the Martian surface and conducted the first biological experiments on extraterrestrial soil.",
    nasaUrl: "https://science.nasa.gov/mission/viking-1/",
    image: "/nasa/viking-lander.jpg",
    modelType: "lander",
    gameId: "insight-seismic",
    badgeReward: "mars-explorer",
    guideVoice: "ares",
    guideIntro: "Welcome to 1976. When Viking 1 touched down in Chryse Planitia, humans saw color photos of the Martian horizon for the very first time—a red desert under a salmon-pink sky.",
    characterGreeting: "Greetings from 1976! I'm Viking 1, the pioneer lander! 🛰️🔴",
    whatItIs: "Viking 1 Lander — Heavy robotic surface research station powered by nuclear RTGs.",
    missionUsedFor: "NASA Viking Project, launched August 20, 1975 on a Titan IIIE/Centaur rocket to conduct high-resolution orbital mapping and extraterrestrial soil biology experiments.",
    whatItCarried: "Two facsimile scanning color cameras, gas chromatograph mass spectrometer (GCMS), biological metabolism experiment suite, robotic soil scoop arm, meteorology station, seismometer, and SNAP-19 RTGs.",
    whyLeftThere: "Operated for 6 years and 116 days (2,245 sols). In November 1982, a ground uplink command designed to optimize battery charging unintentionally altered antenna tracking parameters, cutting communication.",
    whatItIsDoingNow: "Permanently preserved on Chryse Planitia as the Thomas A. Mutch Memorial Station.",
    speechDialogue: {
      whoAmI: "Greetings, Earthling! I am Viking 1! In July 1976, I became the very first American spacecraft to safely land on Mars and beam back the first color photos of its crimson landscape!",
      mission: "I was launched on a Titan IIIE rocket to answer humanity's biggest question: Does life exist on Mars? I analyzed the soil, scooped up Martian red dust, and watched morning frost form over the desert!",
      carried: "I was a heavy three-legged lander powered by plutonium nuclear batteries! I carried two scanning color cameras, an automated biology laboratory, a soil scoop arm, a weather station, and radio antennas!",
      whyLeft: "I worked faithfully for over 6 years and sent more than 50,000 photos! In 1982, an accidental software update changed my antenna direction code, and I lost contact with Earth.",
      doingNow: "I stand proudly in Chryse Planitia, the Plains of Gold! NASA renamed me the Thomas A. Mutch Memorial Station, and I stand undisturbed in the thin, pink Martian air."
    },
    storyNodes: [
      {
        step: 1,
        question: "How did Viking 1 discover why the Martian sky is pinkish-red rather than blue like Earth's?",
        choices: [
          { text: "Fine airborne iron-rich rust dust suspended in the thin atmosphere", correct: true, explanation: "Correct! The perpetual suspension of magnetite and hematite dust particles scatters sunlight to produce Mars's signature butterscotch-pink hue." },
          { text: "Alien neon lights reflecting on the clouds", correct: false, explanation: "It's all natural mineral physics! Iron oxide rust scatters red wavelengths." },
          { text: "The Sun appears redder in space", correct: false, explanation: "In space, the Sun is pure brilliant white." }
        ],
        reveal: "Viking 1 operated for more than 6 years until an erroneous software command accidentally cut communications in November 1982.",
        nasaFact: "In 1984, NASA officially renamed the Viking 1 lander the 'Thomas A. Mutch Memorial Station' in honor of the leader of the Viking imaging team."
      }
    ]
  },
  {
    id: "insight-lander",
    name: "InSight Lander (Interior Exploration using Seismic Investigations)",
    shortName: "InSight Lander",
    type: "science",
    planet: "Mars",
    mission: "InSight",
    year: "2018 - 2022",
    landingDateExact: "2018-11-26T19:52:59Z",
    landingSite: "Elysium Planitia (Eastern Volcanic Plain)",
    coordinates: { lat: 4.5, lon: 145.0 }, // Eastern Volcanic Martian Sector
    currentRestingStatus: "Martian Seismic Listening Station • Power Depleted by Dust",
    status: "Martian Seismic Listening Station (Power Depleted)",
    significance: "Placed an ultra-sensitive seismometer (SEIS) directly on the Martian soil under a wind shield, detecting over 1,300 marsquakes and mapping the Martian crust, mantle, and molten liquid core.",
    nasaUrl: "https://science.nasa.gov/mission/insight/",
    image: "/nasa/insight-lander.jpg",
    modelType: "science",
    gameId: "insight-seismic",
    badgeReward: "seismic-pioneer",
    guideVoice: "ares",
    guideIntro: "Shhh... listen closely. InSight did not look at Mars with cameras; it listened to its heart with seismometers. For four years, it detected the vibrations of meteorite impacts and deep volcanic rumbles.",
    characterGreeting: "Shhh... I'm InSight, the seismic listener of Mars! 📡🌍",
    whatItIs: "InSight Lander — Geophysical lander equipped to study the interior deep structure of Mars.",
    missionUsedFor: "NASA Discovery Program, launched May 5, 2018 on an Atlas V rocket to investigate internal planetary differentiation, seismic activity, and core structure.",
    whatItCarried: "SEIS seismometer with vacuum sphere and wind/thermal shield, HP3 Heat Flow and Physical Properties Package ('the mole'), RISE precision radio antenna, robotic instrument deployment arm, and twin solar wings.",
    whyLeftThere: "Operated for four years and cataloged 1,319 marsquakes. Martian atmospheric dust steadily coated its solar arrays until power generation ceased in December 2022.",
    whatItIsDoingNow: "Resting serenely on Elysium Planitia, having unlocked the first complete structural map of Mars's molten core and mantle.",
    speechDialogue: {
      whoAmI: "Shhh... listen closely! I'm InSight! Other rovers came to Mars with cameras to see its surface, but I came with super-sensitive ears to listen to the heartbeat inside Mars!",
      mission: "My mission was to map what's beneath Mars! By placing my gold-plated seismometer on the dirt, I detected over 1,300 marsquakes and proved that Mars has a giant molten liquid iron core!",
      carried: "I carried the French SEIS seismometer under a protective wind shield, the heat flow probe mole to dig underground, weather sensors, and giant circular solar wings!",
      whyLeft: "Unlike windy areas with dust devils that blew other rovers clean, Elysium Planitia had quiet air that allowed red dust to settle like a thick blanket over my solar arrays. After four years, my power dropped to zero.",
      doingNow: "I am resting peacefully under the pink Martian sky! My final words to Earth were: 'Don't worry about me: my time here has been productive and serene.' My data is now the bedrock of planetary science!"
    },
    storyNodes: [
      {
        step: 1,
        question: "What caused InSight's solar panels to slowly lose power and end the mission?",
        choices: [
          { text: "Fine Martian atmospheric dust blanketed the solar arrays", correct: true, explanation: "Spot on. Unlike rovers that occasionally got lucky with 'dust-cleaning wind devils', InSight's panels were covered in a thick layer of reddish dust that choked off sunlight." },
          { text: "It was struck by a meteor directly", correct: false, explanation: "Meteorite strikes happened nearby, but didn't hit the lander itself." },
          { text: "It ran out of gasoline", correct: false, explanation: "Space landers rely on solar panels and batteries, not fossil fuels." }
        ],
        reveal: "In May 2022, InSight detected a monster magnitude 5.0 marsquake—the largest seismic rumble ever recorded on another planet, shaking the crust for 10 hours.",
        nasaFact: "InSight sent its final heartfelt message on December 19, 2022: 'My power's really low, so this may be the last image I can send... Don't worry about me though: my time here has been both productive and serene.'"
      }
    ]
  },
  {
    id: "ingenuity-helicopter",
    name: "Ingenuity Mars Helicopter ('Ginny')",
    shortName: "Ingenuity",
    type: "helicopter",
    planet: "Mars",
    mission: "Mars 2020 / Perseverance",
    year: "2021 - 2024",
    landingDateExact: "2021-02-18T20:55:00Z",
    landingSite: "Jezero Crater (Northeastern River Delta)",
    coordinates: { lat: 18.0, lon: 75.0 }, // Northeastern Martian Sector
    currentRestingStatus: "First Aircraft on Another World • Historic Aerial Monument",
    status: "First Aircraft on Another World / Historic Aerial Monument",
    significance: "Made aviation history on April 19, 2021 by achieving the first powered, controlled aerodynamic flight on another planet. Designed for 5 test flights, it completed 72 flights over nearly 3 years.",
    nasaUrl: "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/",
    image: "/nasa/ingenuity-helicopter.jpg",
    modelType: "helicopter",
    gameId: "ingenuity-flight",
    badgeReward: "flight-pioneer",
    guideVoice: "ares",
    guideIntro: "Look up at the thin Martian sky! Ingenuity proved that flight was possible in an atmosphere just 1% as dense as Earth's. Its carbon-fiber blades spun at 2,400 RPM to lift a 4-pound marvel into history.",
    characterGreeting: "Whirrr! I'm Ingenuity, the Martian flying machine! 🚁💨",
    whatItIs: "Ingenuity Mars Helicopter ('Ginny') — The first powered, controlled aircraft flown on another world.",
    missionUsedFor: "Mars 2020 Perseverance Mission, launched July 30, 2020 on an Atlas V rocket to demonstrate powered flight in Mars's razor-thin atmosphere and scout paths for Perseverance.",
    whatItCarried: "Dual counter-rotating carbon-fiber rotor blades (spinning at 2,500 RPM), terrain navigation camera, high-resolution color camera, laser altimeter, solar panel, lithium-ion battery, and a piece of fabric from the 1903 Wright Brothers Flyer.",
    whyLeftThere: "Planned for 5 technology demonstration flights; flew 72 missions over 3 years, covering 10.5 miles. On Flight 72, navigation over featureless sand caused a hard landing that chipped a rotor blade tip.",
    whatItIsDoingNow: "Standing upright on four carbon legs at Valinor Hills Airfield, waking daily to record weather and temperature logs.",
    speechDialogue: {
      whoAmI: "Whirrr! Look up! I'm Ingenuity, but my friends call me Ginny! I am the very first aircraft to ever fly through the sky of another planet!",
      mission: "I hitched a ride beneath the belly of the Perseverance rover to Jezero Crater. Many scientists believed flight on Mars was impossible because the air is 99% thinner than Earth's. But I proved them wrong!",
      carried: "I weigh only 4 pounds! I carried twin carbon-fiber blades that spun at an incredible 2,500 RPM, navigation computers, terrain cameras, and a precious piece of fabric from the 1903 Wright Brothers plane tucked under my solar panel!",
      whyLeft: "I was only built to fly 5 times as a short test. Instead, I flew 72 missions, soaring over cliffs and sand dunes for three whole years! On my 72nd landing, my rotor tip grazed a sand dune, so my flying days came to a proud finish.",
      doingNow: "I'm standing tall on my four carbon legs at Valinor Hills Airfield! I still wake up every single Martian morning, record weather and temperature data, and wait for astronauts to come greet me!"
    },
    storyNodes: [
      {
        step: 1,
        question: "How fast did Ingenuity's twin counter-rotating blades have to spin to fly in Mars's razor-thin air?",
        choices: [
          { text: "2,400 to 2,700 rotations per minute", correct: true, explanation: "Correct! That is 5 times faster than passenger helicopters on Earth, generating lift where air is as thin as 100,000 feet altitude on Earth." },
          { text: "100 rotations per minute", correct: false, explanation: "Too slow! At that speed, it would never leave the Martian ground." },
          { text: "100,000 rotations per minute", correct: false, explanation: "That would shred the rotors into pieces!" }
        ],
        reveal: "Ingenuity scouted paths ahead of the Perseverance rover, photographed Martian dunes, and flew a cumulative total of 10.5 miles over 128.8 flight minutes.",
        nasaFact: "Tucked beneath Ingenuity's solar panel is a postage-stamp-sized swatch of muslin fabric from the wing of the 1903 Wright Flyer, connecting the first flight on Earth to the first flight on Mars."
      }
    ]
  },
  {
    id: "kepler-space-telescope",
    name: "Kepler Space Telescope",
    shortName: "Kepler",
    type: "spacecraft",
    planet: "Deep Space",
    mission: "Kepler & K2",
    year: "2009 - 2018",
    landingDateExact: "2009-03-07T03:49:57Z",
    landingSite: "Heliocentric High Earth-Trailing Orbit (Northern Deep Space)",
    coordinates: { lat: 45.0, lon: 0.0 }, // Northern Deep Space Orbit
    currentRestingStatus: "Decommissioned in Earth-Trailing Orbit • Exoplanet Pioneer",
    status: "Decommissioned in Earth-Trailing Orbit",
    significance: "Revolutionary exoplanet hunter that stared at 150,000+ stars simultaneously. It discovered over 2,662 confirmed planets outside our solar system, proving there are more planets than stars in our galaxy.",
    nasaUrl: "https://science.nasa.gov/mission/kepler/",
    image: "/nasa/kepler-telescope.jpg",
    modelType: "spacecraft",
    gameId: "kepler-transit",
    badgeReward: "exoplanet-hunter",
    guideVoice: "luna",
    guideIntro: "Drifting in silent orbit around the Sun is Kepler. It had a giant 95-megapixel digital camera that stared without blinking at the constellation Cygnus to find other worlds where life could exist.",
    characterGreeting: "Greetings! I'm Kepler, the great planet-hunting telescope! 🔭✨",
    whatItIs: "Kepler Space Telescope — NASA's primary space observatory dedicated to discovering extra-solar planetary systems.",
    missionUsedFor: "NASA Discovery Program, launched March 7, 2009 aboard a Delta II rocket to discover Earth-size and smaller planets in or near the habitable zone of distant stars.",
    whatItCarried: "0.95-meter Schmidt telescope photometer, 95-megapixel CCD sensor array (42 CCDs), steerable high-gain antenna, reaction wheels, and solar cell arrays.",
    whyLeftThere: "Operated for 9.6 years and discovered 2,662 confirmed alien worlds! On October 30, 2018, its reaction control thruster hydrazine fuel was fully depleted.",
    whatItIsDoingNow: "Drifting safely in a heliocentric Earth-trailing orbit around the Sun, where it will never collide with Earth.",
    speechDialogue: {
      whoAmI: "Greetings, stargazers! I am Kepler, humanity's greatest planet hunter! I carried a giant 95-megapixel digital camera into deep space to find new worlds orbiting distant stars!",
      mission: "I was launched in 2009 to answer whether our solar system is alone! I stared at 150,000 stars simultaneously without blinking, waiting for tiny dips in starlight as planets passed in front of their parent suns!",
      carried: "I carried a massive 0.95-meter optical photometer telescope with 42 ultra-sensitive image sensors, fine guidance sensors, solar arrays, and thrusters! I discovered over 2,662 confirmed planets outside our solar system!",
      whyLeft: "After almost 10 years of non-stop planet discoveries, my hydrazine rocket fuel ran completely dry. On October 30, 2018, NASA engineers sent me a final 'goodnight' command, safely disabling my transmitters.",
      doingNow: "I am drifting serenely in an orbit trailing behind Earth around the Sun, having proved to humankind that there are more planets in the Milky Way than stars in the sky!"
    },
    storyNodes: [
      {
        step: 1,
        question: "How did Kepler discover alien planets orbiting distant stars?",
        choices: [
          { text: "By detecting the microscopic dip in star brightness when a planet transits in front", correct: true, explanation: "Brilliant! Just like a moth flying in front of a distant lighthouse, a transiting planet dims the star's light by a fraction of a percent." },
          { text: "By flying directly to the other solar systems", correct: false, explanation: "Other stars are trillions of miles away! It would take tens of thousands of years for our fastest rockets to reach them." },
          { text: "By listening for alien radio stations", correct: false, explanation: "Kepler was an optical photometer measuring stellar brightness." }
        ],
        reveal: "Kepler revealed that almost every star in the night sky hosts a planetary system, and estimated that tens of billions of Earth-sized planets reside in habitable zones in the Milky Way.",
        nasaFact: "On October 30, 2018, having exhausted its reaction control hydrazine fuel, Kepler received a final 'goodnight' command from engineers, leaving it safely parked in an orbit where it will never collide with Earth."
      }
    ]
  },
  {
    id: "dawn-spacecraft",
    name: "Dawn Spacecraft",
    shortName: "Dawn",
    type: "spacecraft",
    planet: "Asteroid Belt",
    mission: "Discovery Program",
    year: "2007 - 2018",
    landingDateExact: "2007-09-27T11:34:00Z",
    landingSite: "Asteroid Belt Ceres Quarantine Orbit (Southwestern Deep Space)",
    coordinates: { lat: -45.0, lon: -140.0 }, // Southwestern Outer Sector
    currentRestingStatus: "Monument in Perpetual Unpowered Orbit around Ceres",
    status: "Monument in Perpetual Unpowered Orbit",
    significance: "First spacecraft to orbit two separate extraterrestrial destinations: giant protoplanet Vesta and dwarf planet Ceres. Powered by revolutionary xenon ion thrusters.",
    nasaUrl: "https://science.nasa.gov/mission/dawn/",
    image: "/nasa/dawn-spacecraft.jpg",
    modelType: "spacecraft",
    gameId: "kepler-transit",
    badgeReward: "deep-space-explorer",
    guideVoice: "ares",
    guideIntro: "Far out in the asteroid belt between Mars and Jupiter orbits Dawn. Powered by ghostly blue xenon ion propulsion, it mapped the bright sodium carbonate salt deposits of Occator Crater on Ceres.",
    characterGreeting: "Greetings from the Asteroid Belt! I'm Dawn, the ion explorer! ⚡🌌",
    whatItIs: "Dawn Spacecraft — The first spacecraft to orbit two separate celestial bodies in deep space.",
    missionUsedFor: "NASA Discovery Program, launched September 27, 2007 on a Delta II rocket to explore protoplanet Vesta and dwarf planet Ceres to understand solar system origins.",
    whatItCarried: "Three NEXT xenon ion propulsion thrusters, Framing Cameras, Visible and Infrared Spectrometer (VIR), Gamma Ray and Neutron Detector (GRaND), and dual 65-foot solar wings.",
    whyLeftThere: "Operated for 11 years across 4.3 billion miles. In November 2018, its attitude control hydrazine ran out; placed in a stable quarantine orbit around Ceres for planetary protection.",
    whatItIsDoingNow: "Silently coasting around Ceres in an unpowered stable orbit that will remain secure for centuries.",
    speechDialogue: {
      whoAmI: "Hello from deep space! I am Dawn! Powered by glowing blue xenon ion thrusters, I became the very first spacecraft to ever orbit two different celestial destinations beyond Earth!",
      mission: "I was sent out into the asteroid belt between Mars and Jupiter to explore ancient worlds: first the giant rocky asteroid Vesta, and second the icy dwarf planet Ceres!",
      carried: "I carried futuristic ion engines that accelerated xenon gas out my thrusters at 89,000 miles per hour! I carried mapping cameras and spectrometers, uncovering the mysterious glowing white salt deposits inside Occator Crater on Ceres!",
      whyLeft: "Because Ceres has subterranean water and organic molecules, NASA steered me into a permanent quarantine orbit where I will never crash into Ceres and contaminate its surface!",
      doingNow: "I am coasting peacefully in silent orbit high above dwarf planet Ceres, a quiet monument to human ingenuity circling the largest world in the asteroid belt."
    },
    storyNodes: [
      {
        step: 1,
        question: "Why will Dawn never crash into Ceres and contaminate its surface?",
        choices: [
          { text: "NASA carefully locked Dawn into a stable orbit that will last for hundreds of years", correct: true, explanation: "Planetary protection protocol! Ceres contains subterranean briny water and organic molecules, so Dawn was steered into a quarantine orbit to avoid contaminating any potential life." },
          { text: "Ceres has no gravity to pull it down", correct: false, explanation: "Ceres has substantial gravity (0.029 g) as the largest body in the asteroid belt." },
          { text: "Dawn has unlimited fuel", correct: false, explanation: "Dawn ran completely out of hydrazine attitude control fuel in November 2018." }
        ],
        reveal: "Dawn proved that Ceres is an icy water-rich world with cryovolcanoes like Ahuna Mons, expanding our understanding of habitable zones in the solar system.",
        nasaFact: "Dawn's ion engines operated for a cumulative 5.9 years—more than any previous spacecraft—accelerating xenon ions out of its thrusters at 89,000 mph."
      }
    ]
  },
  {
    id: "near-shoemaker",
    name: "NEAR Shoemaker (Near Earth Asteroid Rendezvous)",
    shortName: "NEAR Shoemaker",
    type: "spacecraft",
    planet: "Asteroid 433 Eros",
    mission: "Discovery Program",
    year: "1996 - 2001",
    landingDateExact: "2001-02-12T20:01:52Z",
    landingSite: "Southern Hemisphere of Asteroid 433 Eros (Southeastern Outer Sector)",
    coordinates: { lat: -45.0, lon: 110.0 }, // Southeastern Outer Sector
    currentRestingStatus: "Resting on the Boulders of Asteroid 433 Eros",
    status: "First Spacecraft to Touch Down on an Asteroid",
    significance: "First spacecraft to orbit and touch down on an asteroid. In February 2001, after a year of orbital photography, NEAR executed a gentle 4 mph touchdown on the surface of 433 Eros and survived.",
    nasaUrl: "https://science.nasa.gov/mission/near-shoemaker/",
    image: "/nasa/near-shoemaker.jpg",
    modelType: "spacecraft",
    gameId: "mars-rover",
    badgeReward: "asteroid-pioneer",
    guideVoice: "ares",
    guideIntro: "Resting on the rugged boulders of Asteroid 433 Eros is NEAR Shoemaker—humanity's first ambassador to land on an asteroid.",
    characterGreeting: "Greetings from Asteroid Eros! I'm NEAR Shoemaker! 🪨✨",
    whatItIs: "NEAR Shoemaker — First spacecraft to orbit and touch down on an asteroid.",
    missionUsedFor: "NASA Discovery Program, launched February 17, 1996 on a Delta II rocket to rendezvous with, orbit, and soft-land on near-Earth asteroid 433 Eros.",
    whatItCarried: "Multispectral Imager, Near-Infrared Spectrometer, X-ray/Gamma-Ray Spectrometer, Laser Rangefinder, Magnetometer, and solar panel wings.",
    whyLeftThere: "Designed only as an orbiter! After completing its primary mission, engineers commanded a daring experimental descent to the surface on February 12, 2001. It touched down at 4 mph and continued transmitting for two weeks.",
    whatItIsDoingNow: "Resting serenely on the cratered boulders of Asteroid Eros as it hurtles through the solar system.",
    speechDialogue: {
      whoAmI: "Hello from a space rock! I'm NEAR Shoemaker, the very first spacecraft in human history to land on the surface of an asteroid!",
      mission: "I was launched in 1996 to catch up with 433 Eros, a giant potato-shaped asteroid tumbling through space! I orbited it for an entire year, mapping its craters and mineral veins!",
      carried: "I carried laser rangefinders, multispectral cameras, gamma-ray spectrometers, and solar wings! I wasn't even built with landing gear—I was designed solely as an orbiter!",
      whyLeft: "At the end of my orbital mission in February 2001, NASA engineers asked: 'Can we land on an asteroid?' I descended at a gentle 4 miles per hour, touched down softly on the rocky ground, and kept transmitting data for two weeks!",
      doingNow: "I am riding on the surface of Asteroid 433 Eros as it orbits through the solar system, the very first human artifact to call an asteroid home!"
    },
    storyNodes: [
      {
        step: 1,
        question: "How did NEAR Shoemaker make history on February 12, 2001?",
        choices: [
          { text: "It executed a controlled soft landing on Asteroid Eros despite having no landing gear", correct: true, explanation: "Spot on! Even though it was designed only as an orbiter, engineers guided it down to a 4 mph touchdown and it survived!" },
          { text: "It pushed Eros into Earth's orbit", correct: false, explanation: "Asteroids are massive! NEAR was only a lightweight probe." },
          { text: "It exploded upon arrival", correct: false, explanation: "It touched down so gently that its radio transmitters continued working from the asteroid surface!" }
        ],
        reveal: "NEAR Shoemaker proved that spacecraft could touch down on low-gravity small bodies, paving the way for OSIRIS-REx and Hayabusa.",
        nasaFact: "NEAR was named in honor of Eugene Shoemaker, the pioneering planetary geologist who trained Apollo astronauts."
      }
    ]
  },
  {
    id: "pioneer-probes",
    name: "Pioneer 10 & 11 Probes",
    shortName: "Pioneer 10 & 11",
    type: "spacecraft",
    planet: "Interstellar Space",
    mission: "Pioneer Program",
    year: "1972 - 1973",
    landingDateExact: "1972-03-03T01:49:00Z",
    landingSite: "Interstellar Escape Trajectory (Far Northwestern Deep Space)",
    coordinates: { lat: 45.0, lon: -160.0 }, // Far Northwestern Deep Space
    currentRestingStatus: "Interstellar Ghost Ship • Bearing the Golden Plaque",
    status: "First Craft to Cross Asteroid Belt & Fly by Jupiter",
    significance: "First human spacecraft to traverse the Asteroid Belt, first to fly past Jupiter and Saturn, and first to achieve escape velocity from our solar system into interstellar space.",
    nasaUrl: "https://science.nasa.gov/mission/pioneer-10/",
    image: "/nasa/pioneer-probe.jpg",
    modelType: "spacecraft",
    gameId: "kepler-transit",
    badgeReward: "interstellar-pioneer",
    guideVoice: "ares",
    guideIntro: "Sailing through the silent void beyond Pluto is Pioneer 10—humanity's first ghost ship into the interstellar deep.",
    characterGreeting: "Greetings from interstellar space! I'm Pioneer 10! 🌌⭐",
    whatItIs: "Pioneer 10 & 11 Probes — Humanity's first interstellar explorers.",
    missionUsedFor: "Pioneer Program, launched March 3, 1972 on an Atlas-Centaur rocket to conduct the first reconnaissance of Jupiter and the outer solar system.",
    whatItCarried: "High-gain 9-foot parabolic dish antenna, imaging photopolarimeter, magnetometer, cosmic ray telescope, SNAP-19 nuclear RTGs, and the famous gold-anodized aluminum Pioneer Plaque.",
    whyLeftThere: "Launched on an open escape trajectory out of the solar system. Final faint telemetry received on January 23, 2003 from 7.5 billion miles away.",
    whatItIsDoingNow: "Silently coasting through interstellar space toward the red giant star Aldebaran in the constellation Taurus, where it will arrive in 2 million years.",
    speechDialogue: {
      whoAmI: "Greetings across the cosmic void! I am Pioneer 10, humanity's very first emissary to leave the solar system and venture into interstellar space!",
      mission: "I launched in 1972 to cross the terrifying Asteroid Belt—which scientists feared was an impassable wall of rock! I proved it was safe, then became the first human craft to fly past giant Jupiter!",
      carried: "I carried a 9-foot radio dish, cosmic ray detectors, nuclear batteries, and Carl Sagan's famous gold-anodized aluminum plaque with diagrams of humans and our cosmic address in the galaxy!",
      whyLeft: "My rocket flung me with so much speed that Jupiter's massive gravity slung me completely out of the solar system! After 31 years of sending signals across 7.5 billion miles, my nuclear transmitter whispered its last signal in 2003.",
      doingNow: "I am coasting silently through interstellar space between the stars, heading toward the giant red star Aldebaran, carrying humanity's greeting card into eternity!"
    },
    storyNodes: [
      {
        step: 1,
        question: "What historic artifact is bolted to the side of the Pioneer 10 and 11 spacecraft?",
        choices: [
          { text: "A gold-anodized aluminum plaque engraved with human figures and our solar system address", correct: true, explanation: "Correct! Designed by Carl Sagan and Frank Drake, the plaque is meant to communicate with extraterrestrial beings who might find it millions of years from now." },
          { text: "A smartphone with space photos", correct: false, explanation: "Smartphones did not exist in 1972!" },
          { text: "A time capsule full of soil", correct: false, explanation: "The message had to be etched in gold to survive millions of years in space." }
        ],
        reveal: "Pioneer 10 and 11 proved that spacecraft could safely navigate outer planetary space, paving the way for the Voyager and New Horizons missions.",
        nasaFact: "Pioneer 10's final signal was detected on January 23, 2003, at a distance of 80 astronomical units (over 7.5 billion miles) from Earth."
      }
    ]
  }
];
