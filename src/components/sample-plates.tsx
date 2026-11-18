import React from "react";

export function SampleArtworkPlate({ svgKey }: { svgKey?: string | null }) {
  switch (svgKey) {
    case "portrait":
      return (
        <svg viewBox="0 0 600 450" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="450" fill="#24292E" />
          <circle cx="300" cy="215" r="155" fill="#323940" />
          <path d="M185 450 C195 345, 405 345, 415 450 Z" fill="#8C4A32" />
          <ellipse cx="300" cy="215" rx="68" ry="88" fill="#D9A78B" />
          <path d="M232 200 C230 120, 370 120, 368 200 C360 155, 240 155, 232 200 Z" fill="#1A1817" />
          <path d="M268 205 Q280 200 290 205" stroke="#1A1817" strokeWidth="3" fill="none" />
          <path d="M312 205 Q324 200 335 205" stroke="#1A1817" strokeWidth="3" fill="none" />
          <path d="M300 208 L295 236 L305 238" stroke="#9E6B52" strokeWidth="2.5" fill="none" />
          <path d="M284 260 Q300 268 316 260" stroke="#7A3E2D" strokeWidth="3" fill="none" />
          <circle cx="300" cy="182" r="5" fill="#B8332A" />
        </svg>
      );
    case "window":
      return (
        <svg viewBox="0 0 600 450" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="450" fill="#D8D0C1" />
          <rect x="160" y="55" width="280" height="340" rx="6" fill="#4A4238" />
          <rect x="178" y="73" width="115" height="145" fill="#9BB7C4" />
          <rect x="307" y="73" width="115" height="145" fill="#A9C4D1" />
          <rect x="178" y="232" width="115" height="145" fill="#86A3B0" />
          <rect x="307" y="232" width="115" height="145" fill="#95B1BE" />
          <polygon points="178,377 422,377 520,450 90,450" fill="#EFE8D8" opacity="0.75" />
          <circle cx="350" cy="340" r="18" fill="#8C4A32" />
          <path d="M346 322 Q335 290 355 275 M352 322 Q368 295 360 280" stroke="#3D5A45" strokeWidth="3" fill="none" />
        </svg>
      );
    case "afternoon-light":
      return (
        <svg viewBox="0 0 600 450" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="450" fill="#F2DEC4" />
          <polygon points="0,0 380,0 180,450 0,450" fill="#FCEFD9" />
          <polygon points="380,0 600,0 600,450 180,450" fill="#C9A882" opacity="0.55" />
          <rect x="95" y="260" width="410" height="16" fill="#6E472B" />
          <ellipse cx="265" cy="242" rx="44" ry="18" fill="#FAF6EE" />
          <circle cx="255" cy="232" r="14" fill="#D96B27" />
          <circle cx="278" cy="235" r="12" fill="#E39D25" />
        </svg>
      );
    case "silence":
      return (
        <svg viewBox="0 0 600 450" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="450" fill="#E7E5DF" />
          <line x1="0" y1="310" x2="600" y2="310" stroke="#B8B3A8" strokeWidth="2" />
          <circle cx="300" cy="195" r="78" fill="#1F1E1C" />
          <circle cx="326" cy="175" r="24" fill="#E7E5DF" />
          <path d="M120 310 Q300 326 480 310" stroke="#8A857C" strokeWidth="1.5" fill="none" />
        </svg>
      );
    case "monsoon":
      return (
        <svg viewBox="0 0 600 450" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="monsoonSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2B3A42" />
              <stop offset="60%" stopColor="#4A606A" />
              <stop offset="100%" stopColor="#7B939C" />
            </linearGradient>
          </defs>
          <rect width="600" height="450" fill="url(#monsoonSky)" />
          <path d="M0 290 Q160 270 320 295 T600 285 L600 450 L0 450 Z" fill="#1D2B30" />
          <path d="M210 292 L245 275 L340 275 L365 292 Z" fill="#11191C" />
          <path d="M265 275 Q295 245 325 275 Z" fill="#8C4A32" />
          <g stroke="#B8D0D9" strokeWidth="1.2" opacity="0.45">
            <line x1="90" y1="40" x2="70" y2="130" />
            <line x1="190" y1="20" x2="170" y2="110" />
            <line x1="310" y1="50" x2="290" y2="140" />
            <line x1="450" y1="30" x2="430" y2="120" />
            <line x1="520" y1="80" x2="500" y2="170" />
          </g>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 600 450" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="skyDhaka" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E8B878" />
              <stop offset="65%" stopColor="#D97B43" />
              <stop offset="100%" stopColor="#8C3B2B" />
            </linearGradient>
          </defs>
          <rect width="600" height="450" fill="url(#skyDhaka)" />
          <circle cx="440" cy="145" r="46" fill="#FFF3D6" opacity="0.85" />
          <path d="M0 320 L80 260 L150 285 L220 210 L290 250 L370 190 L460 245 L530 220 L600 270 L600 450 L0 450 Z" fill="#4A251D" />
          <path d="M180 250 Q220 175 260 250 Z" fill="#2E1510" />
          <rect x="216" y="160" width="8" height="35" fill="#2E1510" />
          <path d="M330 240 Q370 165 410 240 Z" fill="#3B1B14" />
          <path d="M40 450 L40 310 L130 310 L130 450 Z" fill="#6E3326" />
          <path d="M0 400 Q150 385 300 405 T600 395 L600 450 L0 450 Z" fill="#1F0E0B" />
        </svg>
      );
  }
}
