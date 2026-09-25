import React from 'react';

interface ChurchLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const ChurchLogo: React.FC<ChurchLogoProps> = ({
  className = '',
  size = 48,
  showText = false
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div 
        className="relative shrink-0 rounded-full flex items-center justify-center select-none shadow-[0_0_20px_rgba(245,158,11,0.25)]"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Outer golden rim gradient */}
            <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#ffd166" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            {/* Inner background gradient */}
            <radialGradient id="creamBg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#faf6ef" />
              <stop offset="85%" stopColor="#eee4d5" />
              <stop offset="100%" stopColor="#dfd2be" />
            </radialGradient>

            {/* Flame fire gradient */}
            <linearGradient id="flameGrad" x1="50%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="45%" stopColor="#ea580c" />
              <stop offset="75%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>

            {/* Metallic dark AD letters gradient */}
            <linearGradient id="metallicAD" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e2229" />
              <stop offset="50%" stopColor="#0d0f12" />
              <stop offset="100%" stopColor="#2a303c" />
            </linearGradient>

            {/* Curved path for text */}
            <path
              id="textArc"
              d="M 32,100 A 68,68 0 0,1 168,100"
              fill="none"
            />
          </defs>

          {/* Outer Ring */}
          <circle cx="100" cy="100" r="96" fill="url(#goldRim)" stroke="#b45309" strokeWidth="2" />
          
          {/* Inner Cream Disc */}
          <circle cx="100" cy="100" r="88" fill="url(#creamBg)" stroke="#c29d59" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="82" fill="none" stroke="#e0cbb2" strokeWidth="1" strokeDasharray="3,2" />
          <circle cx="100" cy="100" r="76" fill="none" stroke="#b4936b" strokeWidth="1.2" />

          {/* Curved Header Text: MINISTÉRIO ARARAS */}
          <text fill="#1c1917" fontSize="13.5" fontWeight="800" letterSpacing="2.5" fontFamily="'Plus Jakarta Sans', sans-serif">
            <textPath href="#textArc" startOffset="50%" textAnchor="middle">
              MINISTÉRIO ARARAS
            </textPath>
          </text>

          {/* Center Burning Flame */}
          <g transform="translate(100, 116) scale(0.95) translate(-100, -116)">
            {/* Outer flame tongue */}
            <path
              d="M100 48 C105 72 135 88 135 118 C135 142 118 158 100 162 C82 158 65 142 65 118 C65 92 88 78 100 48 Z"
              fill="url(#flameGrad)"
            />
            {/* Left and right energetic flame horns */}
            <path
              d="M72 120 C62 135 70 148 85 154 C68 148 58 132 68 116 C74 105 78 98 78 98 C78 98 76 110 72 120 Z"
              fill="#dc2626"
            />
            <path
              d="M128 120 C138 135 130 148 115 154 C132 148 142 132 132 116 C126 105 122 98 122 98 C122 98 124 110 128 120 Z"
              fill="#ea580c"
            />
            {/* Inner golden flame core */}
            <path
              d="M100 76 C104 92 120 106 120 126 C120 142 110 152 100 154 C90 152 80 142 80 126 C80 108 94 96 100 76 Z"
              fill="#fef08a"
              opacity="0.9"
            />
          </g>

          {/* Bold Monogram "AD" */}
          {/* Subtle drop shadow behind AD */}
          <text
            x="101"
            y="136"
            textAnchor="middle"
            fontFamily="'Cinzel', Georgia, serif"
            fontSize="54"
            fontWeight="900"
            fill="rgba(0,0,0,0.3)"
          >
            AD
          </text>
          
          {/* Main AD Letters with metallic gradient and golden bevel outline */}
          <text
            x="100"
            y="135"
            textAnchor="middle"
            fontFamily="'Cinzel', Georgia, serif"
            fontSize="54"
            fontWeight="900"
            letterSpacing="-2"
            fill="url(#metallicAD)"
            stroke="#fbbf24"
            strokeWidth="0.8"
          >
            AD
          </text>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="text-base font-bold text-slate-100 tracking-tight leading-tight">
            AD Araras Sede
          </span>
          <span className="text-xs text-amber-500 font-medium tracking-wide">
            Ministério Araras
          </span>
        </div>
      )}
    </div>
  );
};
