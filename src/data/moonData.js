/**
 * NASA Moon Artifacts & Equipment Data
 * Abandoned But Not Forgotten - Moon Expedition
 * 
 * Symmetrically aligned across North, South, East, and West quadrants of the Moon.
 */

export const moonArtifacts = [
  {
    id: "apollo-lunar-module",
    name: "Apollo 11 Lunar Module (Eagle Descent Stage)",
    shortName: "Apollo 11 Eagle",
    type: "lander",
    planet: "Moon",
    mission: "Apollo 11",
    year: "1969",
    landingDateExact: "1969-07-20T20:17:40Z",
    landingSite: "Mare Tranquillitatis (Sea of Tranquility - Eastern Quadrant)",
    coordinates: { lat: 0.0, lon: 35.0 }, // Eastern Lunar Quadrant
    currentRestingStatus: "Historic Lunar Monument • Intact Golden Base • Preserved Bootprints",
    status: "Historic Monument on Lunar Surface",
    significance: "First crewed landing on another celestial body. The lower descent stage served as the launch pad when Neil Armstrong and Buzz Aldrin blasted off to rejoin orbit.",
    nasaUrl: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C",
    image: "/nasa/apollo11-lunar-module.jpg",
    modelType: "lander",
    gameId: "lunar-rover",
    badgeReward: "moon-explorer",
    guideVoice: "luna",
    guideIntro: "Greetings, Explorer. You are standing before the golden base of Apollo 11's Eagle. When Neil Armstrong and Buzz Aldrin fired their ascent engine to return to Earth, this descent stage stayed behind—silently preserving humanity's first extraterrestrial footprint.",
    characterGreeting: "Hi Earth explorer! I'm Eagle, Apollo 11's lunar lander! 🦅",
    whatItIs: "Apollo 11 Lunar Module Descent Stage (LM-5 'Eagle') — The first spacecraft to land humans on another celestial world.",
    missionUsedFor: "Apollo 11 Lunar Landing Mission, launched July 16, 1969 aboard the Saturn V rocket from Kennedy Space Center Pad 39A.",
    whatItCarried: "Carried the Descent Propulsion System (DPS) rocket engine, steerable landing radar, Early Apollo Scientific Experiments Package (EASEP), Lunar Surface TV Camera, rock collection boxes, Apollo flag, and the stainless-steel commemorative plaque.",
    whyLeftThere: "Engineered specifically to serve as the launchpad for liftoff! To escape the Moon's gravity and safely reach orbit, every pound of weight mattered. Neil and Buzz blasted off in the Ascent Stage, leaving the heavy descent engine and landing gear behind.",
    whatItIsDoingNow: "Resting eternally in the Sea of Tranquility! With zero wind, rain, or atmosphere on the Moon, my gold mylar insulation blankets, footpads, and Neil Armstrong's boot prints remain perfectly preserved.",
    speechDialogue: {
      whoAmI: "Hi Earth explorer! I'm the Apollo 11 Lunar Module Descent Stage, but the world calls me Eagle! I'm the golden four-legged spacecraft that carried Neil Armstrong and Buzz Aldrin down to humanity's very first touchdown on the Moon!",
      mission: "I flew on the historic Apollo 11 mission, launched atop the 363-foot Saturn V rocket! On July 20, 1969, Neil piloted me past a boulder field to a gentle touchdown, announcing to Earth: 'Houston, Tranquility Base here. The Eagle has landed!'",
      carried: "I carried our descent rocket engine, steerable landing radar, lunar surface TV camera, rock sampling boxes, and the Apollo science station! On my front landing leg, I still wear our famous stainless-steel plaque: 'Here men from planet Earth first set foot upon the Moon. We came in peace for all mankind.'",
      whyLeft: "You see, returning home to Earth required shedding every gram of extra weight! When it was time to leave, Neil and Buzz fired their ascent engine right off my top deck. I stayed behind as their faithful launchpad so they could rocket into orbit and reunite with Michael Collins!",
      doingNow: "I am standing proudly in the quiet lunar dust of Tranquility Base! Because the Moon has no atmosphere or weather, I am completely intact—my gold foil gleams in the sunlight, and Neil's bootprints are still preserved right next to my footpads!"
    },
    storyNodes: [
      {
        step: 1,
        question: "Why did astronauts leave the golden descent stage behind on the Moon?",
        choices: [
          { text: "It ran out of battery power and broke down", correct: false, explanation: "Actually, it functioned flawlessly! It was deliberately engineered this way." },
          { text: "Every gram of weight mattered to blast off back home", correct: true, explanation: "Correct! To escape the Moon's gravity, the Apollo engineers designed the stage to serve as the launchpad, shedding weight so the astronauts could make it home." },
          { text: "They forgot the keys inside the hatch", correct: false, explanation: "A funny thought! But in space engineering, every ounce of mass is strictly calculated." }
        ],
        reveal: "The descent stage had four legs, rocket engines, landing radar, and fuel tanks. Once the crew returned to lunar orbit, this golden stage remained as an eternal testament to human curiosity.",
        nasaFact: "Attached to one of the descent stage legs is a stainless steel plaque signed by the Apollo 11 crew and President Nixon, reading: 'Here men from the planet Earth first set foot upon the Moon, July 1969 A.D. We came in peace for all mankind.'"
      }
    ]
  },
  {
    id: "lunar-roving-vehicle",
    name: "Lunar Roving Vehicle (LRV - 'The Moon Buggy')",
    shortName: "Apollo 15 LRV",
    type: "rover",
    planet: "Moon",
    mission: "Apollo 15, 16, 17",
    year: "1971 - 1972",
    landingDateExact: "1971-07-30T22:16:29Z",
    landingSite: "Hadley Rille / Apennine Mountains (Northern Quadrant)",
    coordinates: { lat: 28.0, lon: 0.0 }, // Northern Lunar Quadrant
    currentRestingStatus: "Permanently Parked on Lunar Plain • Keys Left in Ignition",
    status: "Permanently Parked on the Moon",
    significance: "An electric four-wheeled vehicle driven by astronauts. Three LRVs remain parked on the Moon, left behind at the end of Apollos 15, 16, and 17.",
    nasaUrl: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C",
    image: "/nasa/lunar-roving-vehicle.jpg",
    modelType: "rover",
    gameId: "lunar-rover",
    badgeReward: "lunar-rover-expert",
    guideVoice: "luna",
    guideIntro: "Look at those wire-mesh tires! This is the Lunar Roving Vehicle—humanity's first electric car on another celestial body. Astronauts called it the greatest exploration machine ever conceived.",
    characterGreeting: "Vroom vroom! I'm the Apollo Moon Buggy! 🚙✨",
    whatItIs: "Apollo Lunar Roving Vehicle (LRV-1) — The first electric wheeled vehicle driven on another celestial world.",
    missionUsedFor: "Apollo 15, 16, and 17 long-duration exploration missions to expand astronaut surface range from hundreds of meters up to tens of kilometers.",
    whatItCarried: "Four electric wheel-hub motors, woven zinc-coated steel piano wire mesh tires with titanium chevrons, remote-controlled color TV camera, high-gain communications antenna, geology sampling drills, and sample collection containers.",
    whyLeftThere: "Weight limits for lunar ascent required leaving heavy exploration machinery behind. Commander Dave Scott drove me 27.8 km, then parked me at a safe distance so my color TV camera could broadcast their liftoff to the world.",
    whatItIsDoingNow: "Parked peacefully facing Hadley Rille. My wire-mesh tires never deflated because they have no air tubes, and my battery keys remain in the ignition.",
    speechDialogue: {
      whoAmI: "Vroom vroom! Well, silent electric vroom! I'm the Lunar Roving Vehicle, the very first electric car ever driven on another world! Astronauts called me the greatest exploration machine ever made!",
      mission: "I joined Apollo 15 to help astronauts explore vast craters and steep mountain slopes! Before me, astronauts could only walk a short distance in bulky spacesuits. With me, they drove over 27 kilometers across the rugged lunar terrain!",
      carried: "I carried high-gain radio dishes, rock collection bins, lunar drills, and a color TV camera operated live by Mission Control back on Earth! Look at my wheels—they're woven from piano wire and titanium treads because rubber tires would burst in the lunar vacuum!",
      whyLeft: "When the astronauts had to return home, their spacecraft could only lift so much weight. Commander Dave Scott drove me to a safe distance and pointed my camera at the Lunar Module so folks on Earth could watch the Apollo 15 blast-off live!",
      doingNow: "I've been parked right here facing the magnificent Hadley Rille canyon for over 54 years! My tires are still solid, and the key is still in my ignition, ready for future astronauts to take me for a cruise!"
    },
    storyNodes: [
      {
        step: 1,
        question: "What were the Moon Buggy's tires made of to withstand razor-sharp lunar dust?",
        choices: [
          { text: "Inflatable rubber tires like Earth cars", correct: false, explanation: "Rubber tires would have burst in the lunar vacuum and extreme temperature swings (-250°F to +250°F)!" },
          { text: "Woven zinc-coated steel piano wire with titanium treads", correct: true, explanation: "Exactly right! Engineers wove steel piano wire mesh with chevron titanium treads for maximum grip and zero puncture risk." },
          { text: "Solid cast iron wheels", correct: false, explanation: "Solid iron would be far too heavy to launch aboard the Saturn V rocket." }
        ],
        reveal: "The LRV was folded like origami underneath the Lunar Module descent stage. When astronauts pulled a lanyard, pulleys deployed the rover onto the surface in seconds.",
        nasaFact: "Gene Cernan, commander of Apollo 17, parked the final rover at a specific distance from the Lunar Module so its color television camera could broadcast their liftoff back to Earth."
      }
    ]
  },
  {
    id: "alsep-package",
    name: "ALSEP (Apollo Lunar Surface Experiments Package)",
    shortName: "Apollo ALSEP",
    type: "science",
    planet: "Moon",
    mission: "Apollo 12 - 17",
    year: "1969 - 1977",
    landingDateExact: "1969-11-19T06:54:35Z",
    landingSite: "Central Lunar Highlands / Fra Mauro Base (Southern Quadrant)",
    coordinates: { lat: -28.0, lon: 0.0 }, // Southern Lunar Quadrant
    currentRestingStatus: "Decommissioned Science Network • Laser Reflector Still Active",
    status: "Decommissioned Science Network",
    significance: "A suite of scientific instruments powered by plutonium radioisotope thermoelectric generators (RTGs). ALSEP operated autonomously for up to 8 years after astronauts departed.",
    nasaUrl: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C",
    image: "/nasa/alsep-package.jpg",
    modelType: "science",
    gameId: "alsep-science",
    badgeReward: "moon-scientist",
    guideVoice: "luna",
    guideIntro: "This is ALSEP—the science laboratory that kept working while Earth slept! For years after the astronauts returned, this station continued beaming seismic data and solar wind readings back to NASA.",
    characterGreeting: "Greetings, Explorer! I'm ALSEP, the Moon's science station! 🔬⚡",
    whatItIs: "ALSEP (Apollo Lunar Surface Experiments Package) — Autonomous nuclear-powered scientific station.",
    missionUsedFor: "Autonomous long-term scientific monitoring of lunar seismology, solar wind, and lunar interior structure on Apollos 12 through 17.",
    whatItCarried: "SNAP-27 Plutonium RTG nuclear generator, passive & active seismometers, solar wind spectrometer, suprathermal ion detector, cold cathode gauge, and corner-cube Lunar Laser Ranging Retroreflectors.",
    whyLeftThere: "Designed specifically to remain permanently on the Moon! Operated for 8 continuous years until NASA officially powered down receiving stations on September 30, 1977 due to budget reallocation.",
    whatItIsDoingNow: "Electronic transmitters are resting, but the passive Laser Ranging Retroreflectors remain 100% operational! Observatories on Earth fire lasers at my mirrors every month to measure lunar drift.",
    speechDialogue: {
      whoAmI: "Greetings, curious explorer! I'm ALSEP, NASA's legendary lunar automated science station! I was the science brain that kept working long after the astronauts went home to Earth!",
      mission: "Apollo astronauts deployed me to study the Moon's deep interior. I recorded moonquakes, measured the solar wind, and proved the Moon has a dense iron-rich core! When rocket stages crashed into the Moon, I discovered the Moon rings like a church bell for hours!",
      carried: "I carried a SNAP-27 nuclear generator for non-stop electricity, seismic detectors, ion detectors, and corner-cube laser retroreflectors! I beamed deep lunar secrets across 240,000 miles of space back to NASA scientists for eight full years!",
      whyLeft: "I was never meant to leave! Astronauts set me up on purpose to be a permanent robotic scientific guardian. NASA only turned off the listening stations in 1977 when budgets shifted, but I did my job beyond everyone's wildest dreams!",
      doingNow: "My electronic circuits are sleeping, but my quartz laser retroreflectors need zero electricity! Earth observatories still fire laser beams at my prisms today to measure the exact distance to the Moon down to the millimeter!"
    },
    storyNodes: [
      {
        step: 1,
        question: "What major discovery did ALSEP seismometers make about the Moon?",
        choices: [
          { text: "The Moon has active volcanoes spewing lava", correct: false, explanation: "The Moon's volcanic era ended billions of years ago." },
          { text: "The Moon experiences deep 'Moonquakes' and rings like a bell", correct: true, explanation: "Incredible, isn't it? When Apollo ascent stages were deliberately crashed into the Moon, ALSEP seismometers recorded that the Moon rang like a hollow church bell for over three hours!" },
          { text: "The Moon has an underground ocean of liquid water", correct: false, explanation: "No liquid oceans exist inside the Moon, though water ice is frozen in shadowed craters." }
        ],
        reveal: "ALSEP seismometers proved the Moon has a partially molten core, a mantle, and crust, and detected over 12,000 seismic events between 1969 and 1977.",
        nasaFact: "ALSEP packages were powered by SNAP-27 nuclear generators. They produced steady electricity for nearly a decade until NASA turned off receiver stations on September 30, 1977 due to budget constraints."
      }
    ]
  },
  {
    id: "surveyor-landers",
    name: "Surveyor 3 Robotic Lander",
    shortName: "Surveyor 3",
    type: "lander",
    planet: "Moon",
    mission: "Surveyor Program",
    year: "1967",
    landingDateExact: "1967-04-20T00:04:53Z",
    landingSite: "Oceanus Procellarum / Surveyor Crater (Western Quadrant)",
    coordinates: { lat: 0.0, lon: -35.0 }, // Western Lunar Quadrant
    currentRestingStatus: "Historic Scout Lander • First Probe Inspected by Astronauts",
    status: "Historic Scout Probe / Inspected by Apollo 12",
    significance: "Robotic pioneer sent by NASA to prove that spacecraft would not sink into deep lunar dust. Visited in 1969 by Apollo 12 astronauts Pete Conrad and Alan Bean.",
    nasaUrl: "https://science.nasa.gov/mission/surveyor-3/",
    image: "/nasa/surveyor3-lander.jpg",
    modelType: "lander",
    gameId: "lunar-rover",
    badgeReward: "moon-explorer",
    guideVoice: "luna",
    guideIntro: "Behold Surveyor 3. Before any human dared to land on the Moon, scientists worried the lunar surface was fluffy quicksand that would swallow a spaceship! Surveyor proved the ground was solid rock and dust.",
    characterGreeting: "Hello from 1967! I'm Surveyor 3, the robotic scout! 🛰️🌕",
    whatItIs: "Surveyor 3 — Pioneering automated lunar soft-lander.",
    missionUsedFor: "NASA Surveyor Program — Tested automated radar descent, surface bearing strength, and photographed terrain for Apollo landing sites.",
    whatItCarried: "Steerable television survey camera, motorized soil-sampling trenching arm, radar altimeter, landing strain gauges, and solar panel.",
    whyLeftThere: "Built as an uncrewed lander without a return rocket. In 1969, Apollo 12 made a precision landing 600 feet away; astronauts Pete Conrad and Alan Bean examined my frame and retrieved my camera for Earth laboratories.",
    whatItIsDoingNow: "Resting quietly in Surveyor Crater. My retrieved camera is exhibited at the Smithsonian National Air and Space Museum, while my tripod frame stands as humanity's first extraterrestrial rendezvous point.",
    speechDialogue: {
      whoAmI: "Hello! I'm Surveyor 3, NASA's brave robotic pioneer! Before any human dared set foot on the Moon, scientists were terrified the lunar surface was quicksand. I landed first to prove the ground was solid!",
      mission: "I was sent in April 1967 to test automated radar landings and dig into the Moon! I dug four trenches with my robotic scoop, took 6,315 television pictures, and sent telemetry confirming humans could safely walk here!",
      carried: "I carried a steerable TV camera, an extendable robotic trenching arm, deceleration rocket engines, radar altimeter, and solar panels! Everything was built so NASA could prepare for the Apollo astronaut landings!",
      whyLeft: "I was an unmanned scout without a return rocket. But two and a half years after I landed, Apollo 12 made a bullseye landing right next to me! Astronauts Pete Conrad and Alan Bean walked over, shook my struts, and brought my camera back to Earth!",
      doingNow: "I am resting quietly in Surveyor Crater! My retrieved camera is on display at the Smithsonian Air and Space Museum in Washington, D.C., while my tripod frame stands as a testament to humanity's first extraterrestrial rendezvous!"
    },
    storyNodes: [
      {
        step: 1,
        question: "What incredible coincidence happened when Apollo 12 landed on the Moon?",
        choices: [
          { text: "They landed by pinpoint precision just 600 feet from Surveyor 3", correct: true, explanation: "Astounding! Astronauts Pete Conrad and Alan Bean walked right up to Surveyor 3 and inspected the robot that had waited there for two and a half years." },
          { text: "Surveyor 3 turned on and drove away", correct: false, explanation: "Surveyor was a stationary lander with no wheels." },
          { text: "They found a letter left by alien explorers", correct: false, explanation: "Humanity's robotic scout was waiting there alone in the quiet lunar dust." }
        ],
        reveal: "Apollo 12 astronauts removed Surveyor 3's television camera and robotic scoop arm and brought them back to Earth inside their command module for NASA scientists to study the effects of prolonged space radiation.",
        nasaFact: "When scientists tested Surveyor 3's retrieved camera back on Earth, bacteria (Streptococcus mitis) were cultured from inside the insulation foam, sparking a fierce scientific debate about microbiological survival in space."
      }
    ]
  }
];
