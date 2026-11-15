import React from 'react';

/**
 * AnimatedLunarSatellite
 * Dedicated animated NASA Lunar Science & Sample-Capture Satellite
 * Features:
 * - Holographic magnetic tractor-beam capture cone with animated suction waves
 * - Gold MLI thermal foil octagonal satellite bus with NASA meatball insignia
 * - Dual blue photovoltaic solar panel wings with cyan bus bars & shimmering cells
 * - High-gain parabolic communications dish with oscillating radar beam
 * - Twin cyan ion propulsion thruster exhausts with dynamic particle flicker
 * - Dynamic tilt response when steering & bright emerald flare on sample capture!
 */
export function AnimatedLunarSatellite({ isCollecting = false, tilt = 0 }) {
  return (
    <div
      className="relative flex flex-col items-center select-none"
      style={{
        transform: `rotate(${tilt}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
    >
      {/* 1. HOLOGRAPHIC MAGNETIC TRACTOR-BEAM CAPTURE CONE (Pointing upward to scoop falling samples) */}
      <div
        className={`relative -mb-3 flex flex-col items-center pointer-events-none transition-all duration-200 ${
          isCollecting ? 'scale-125 brightness-150' : 'scale-100 opacity-90'
        }`}
      >
        <svg
          width="80"
          height="36"
          viewBox="0 0 80 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <defs>
            {/* Capture beam gradient */}
            <linearGradient id="tractorGrad" x1="40" y1="0" x2="40" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={isCollecting ? '#10B981' : '#00F0FF'} stopOpacity="0.05" />
              <stop offset="40%" stopColor={isCollecting ? '#34D399' : '#38BDF8'} stopOpacity="0.35" />
              <stop offset="100%" stopColor={isCollecting ? '#10B981' : '#00F0FF'} stopOpacity="0.85" />
            </linearGradient>

            {/* Suction wave glow */}
            <filter id="tractorGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Upward expanding tractor cone */}
          <polygon
            points="10,0 70,0 48,34 32,34"
            fill="url(#tractorGrad)"
            filter="url(#tractorGlow)"
            className="animate-pulse"
          />

          {/* Magnetic capture rings pulsing downwards into the satellite scoop */}
          <ellipse cx="40" cy="8" rx="24" ry="4" stroke={isCollecting ? '#6EE7B7' : '#7DD3FC'} strokeWidth="1.5" strokeDasharray="3 2" opacity="0.8" className="animate-pulse" />
          <ellipse cx="40" cy="18" rx="16" ry="3" stroke={isCollecting ? '#34D399' : '#38BDF8'} strokeWidth="1.5" opacity="0.9" />
          <ellipse cx="40" cy="28" rx="9" ry="2" stroke={isCollecting ? '#10B981' : '#00F0FF'} strokeWidth="2" />

          {/* Animated chevron arrow pulling downwards */}
          <path
            d="M36 6 L40 10 L44 6"
            stroke={isCollecting ? '#FFFFFF' : '#E0F2FE'}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce"
          />
        </svg>

        {/* Capture spark text */}
        {isCollecting && (
          <div className="absolute -top-3 text-[10px] font-mono font-extrabold text-emerald-300 drop-shadow-[0_0_8px_#10B981] animate-ping">
            ✦ CAPTURED!
          </div>
        )}
      </div>

      {/* 2. MAIN SATELLITE CRAFT SVG */}
      <svg
        width="114"
        height="84"
        viewBox="0 0 114 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible filter drop-shadow-[0_0_12px_rgba(0,240,255,0.7)]"
      >
        <defs>
          {/* Gold MLI thermal foil body gradient */}
          <linearGradient id="goldFoil" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="35%" stopColor="#EAB308" />
            <stop offset="70%" stopColor="#CA8A04" />
            <stop offset="100%" stopColor="#854D0E" />
          </linearGradient>

          {/* Blue solar cell gradient */}
          <linearGradient id="solarCellGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="50%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#172554" />
          </linearGradient>

          {/* Ion Thruster Glow */}
          <linearGradient id="ionExhaust" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="30%" stopColor="#38BDF8" />
            <stop offset="70%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* LEFT SOLAR WING (Oscillating with space harmonics) */}
        <g className="origin-right transition-transform">
          {/* Metallic mounting strut */}
          <rect x="36" y="38" width="8" height="4" fill="#94A3B8" stroke="#475569" strokeWidth="0.8" rx="1" />
          {/* Main Panel Frame */}
          <rect x="3" y="27" width="34" height="26" rx="2" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.2" />
          {/* Solar cells grid */}
          <rect x="5" y="29" width="14" height="10" fill="url(#solarCellGrad)" stroke="#0284C7" strokeWidth="0.5" />
          <rect x="21" y="29" width="14" height="10" fill="url(#solarCellGrad)" stroke="#0284C7" strokeWidth="0.5" />
          <rect x="5" y="41" width="14" height="10" fill="url(#solarCellGrad)" stroke="#0284C7" strokeWidth="0.5" />
          <rect x="21" y="41" width="14" height="10" fill="url(#solarCellGrad)" stroke="#0284C7" strokeWidth="0.5" />
          {/* Silver busbars */}
          <line x1="5" y1="34" x2="33" y2="34" stroke="#7DD3FC" strokeWidth="0.6" strokeDasharray="1 1" />
          <line x1="5" y1="46" x2="33" y2="46" stroke="#7DD3FC" strokeWidth="0.6" strokeDasharray="1 1" />
          {/* Wingtip red navigation beacon */}
          <circle cx="3" cy="40" r="1.5" fill="#EF4444" className="animate-ping" />
        </g>

        {/* RIGHT SOLAR WING */}
        <g className="origin-left transition-transform">
          {/* Metallic mounting strut */}
          <rect x="70" y="38" width="8" height="4" fill="#94A3B8" stroke="#475569" strokeWidth="0.8" rx="1" />
          {/* Main Panel Frame */}
          <rect x="77" y="27" width="34" height="26" rx="2" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.2" />
          {/* Solar cells grid */}
          <rect x="79" y="29" width="14" height="10" fill="url(#solarCellGrad)" stroke="#0284C7" strokeWidth="0.5" />
          <rect x="95" y="29" width="14" height="10" fill="url(#solarCellGrad)" stroke="#0284C7" strokeWidth="0.5" />
          <rect x="79" y="41" width="14" height="10" fill="url(#solarCellGrad)" stroke="#0284C7" strokeWidth="0.5" />
          <rect x="95" y="41" width="14" height="10" fill="url(#solarCellGrad)" stroke="#0284C7" strokeWidth="0.5" />
          {/* Silver busbars */}
          <line x1="79" y1="34" x2="107" y2="34" stroke="#7DD3FC" strokeWidth="0.6" strokeDasharray="1 1" />
          <line x1="79" y1="46" x2="107" y2="46" stroke="#7DD3FC" strokeWidth="0.6" strokeDasharray="1 1" />
          {/* Wingtip green navigation beacon */}
          <circle cx="111" cy="40" r="1.5" fill="#10B981" className="animate-ping" />
        </g>

        {/* HIGH-GAIN PARABOLIC DISH ANTENNA (Top mounted, angled forward) */}
        <g>
          {/* Gimbal mount */}
          <rect x="54.5" y="14" width="5" height="6" fill="#64748B" rx="1" />
          {/* Parabolic reflector dish */}
          <ellipse cx="57" cy="14" rx="12" ry="4" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1" />
          <ellipse cx="57" cy="14" rx="8" ry="2.2" fill="#CBD5E1" />
          {/* Subreflector horn */}
          <line x1="57" y1="14" x2="57" y2="8" stroke="#38BDF8" strokeWidth="1.5" />
          <circle cx="57" cy="7" r="2" fill="#0284C7" stroke="#38BDF8" strokeWidth="0.8" />
          {/* Pulsing signal wave */}
          <ellipse cx="57" cy="4" rx="6" ry="1.8" stroke="#38BDF8" strokeWidth="0.8" opacity="0.7" className="animate-pulse" />
        </g>

        {/* CENTRAL HULL / SATELLITE BUS (Gold MLI thermal blanket wrapped octagonal chassis) */}
        <g>
          {/* Octagonal chassis polygon */}
          <polygon
            points="46,20 68,20 73,28 73,56 68,62 46,62 41,56 41,28"
            fill="url(#goldFoil)"
            stroke="#FDE047"
            strokeWidth="1.2"
          />

          {/* MLI thermal foil quilting seams */}
          <line x1="42" y1="32" x2="72" y2="32" stroke="#78350F" strokeWidth="0.6" opacity="0.7" />
          <line x1="42" y1="44" x2="72" y2="44" stroke="#78350F" strokeWidth="0.6" opacity="0.7" />
          <line x1="42" y1="54" x2="72" y2="54" stroke="#78350F" strokeWidth="0.6" opacity="0.7" />
          <line x1="52" y1="21" x2="52" y2="61" stroke="#78350F" strokeWidth="0.6" opacity="0.7" />
          <line x1="62" y1="21" x2="62" y2="61" stroke="#78350F" strokeWidth="0.6" opacity="0.7" />

          {/* FRONT SPECIMEN SUCTION APERTURE / COLLECTOR PORT */}
          <rect x="50" y="22" width="14" height="6" rx="2" fill="#0F172A" stroke={isCollecting ? '#10B981' : '#38BDF8'} strokeWidth="1.2" />
          <circle cx="57" cy="25" r="2" fill={isCollecting ? '#34D399' : '#00F0FF'} className="animate-pulse" />

          {/* AUTHENTIC NASA BLUE MEATBALL LOGO BADGE */}
          <circle cx="57" cy="38" r="5.5" fill="#0B3D91" stroke="#FFFFFF" strokeWidth="0.6" />
          <path d="M53 38 Q57 34 61 38" stroke="#EA212D" strokeWidth="1.2" fill="none" />
          <text x="57" y="39.8" fontSize="2.8" fontWeight="bold" fill="#FFFFFF" textAnchor="middle" fontFamily="sans-serif">
            NASA
          </text>

          {/* INSTRUMENT STATUS PANEL & SAMPLE BAY */}
          <rect x="47" y="47" width="20" height="9" rx="1.5" fill="#090D16" stroke="#0284C7" strokeWidth="0.8" />
          {/* LED telemetry indicator lights */}
          <circle cx="50.5" cy="51.5" r="1.2" fill="#10B981" />
          <circle cx="54" cy="51.5" r="1.2" fill="#38BDF8" />
          <circle cx="57.5" cy="51.5" r="1.2" fill={isCollecting ? '#10B981' : '#F59E0B'} className="animate-pulse" />
          {/* Specimen Hopper Level Bar */}
          <rect x="60.5" y="50" width="5" height="3" rx="0.5" fill="#1E293B" stroke="#0369A1" strokeWidth="0.4" />
          <rect x="61" y="50.5" width="4" height="2" fill="#34D399" />
        </g>

        {/* BOTTOM TWIN ION PROPULSION THRUSTERS & EXHAUST PLUMES */}
        <g>
          {/* Left Nozzle */}
          <polygon points="48,62 52,62 53,67 47,67" fill="#475569" stroke="#94A3B8" strokeWidth="0.6" />
          {/* Right Nozzle */}
          <polygon points="62,62 66,62 67,67 61,67" fill="#475569" stroke="#94A3B8" strokeWidth="0.6" />

          {/* Left Ion Plasma Jet Plume */}
          <polygon
            points="48,67 52,67 50,81"
            fill="url(#ionExhaust)"
            className="animate-pulse"
            opacity="0.95"
          />

          {/* Right Ion Plasma Jet Plume */}
          <polygon
            points="62,67 66,67 64,81"
            fill="url(#ionExhaust)"
            className="animate-pulse"
            opacity="0.95"
          />

          {/* Core high-temperature plasma core */}
          <line x1="50" y1="67" x2="50" y2="74" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="64" y1="67" x2="64" y2="74" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
        </g>
      </svg>

      {/* Dynamic Thruster Flare Particle Glow */}
      <div className="absolute -bottom-1 w-14 h-3 bg-gradient-to-t from-cyan-400 via-sky-300 to-transparent rounded-full blur-md animate-pulse pointer-events-none" />
    </div>
  );
}
