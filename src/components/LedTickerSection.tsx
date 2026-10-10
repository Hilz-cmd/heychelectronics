import React, { useState, useEffect } from 'react';

const LED_WORDS = ['HEYCH', 'ALEXA', 'SCREENS', 'BILLBOARDS', 'SOLAR'] as const;

type LedEffectId = 0 | 1 | 2;

interface LedEffectConfig {
  id: LedEffectId;
  label: string;
  wordClass: string;
  plugClass: string;
  glowColor: string;
  borderGlow: string;
  effectAnimClass: string;
}

const LED_EFFECTS: LedEffectConfig[] = [
  {
    id: 0,
    label: '01. Lumine Cobalt Wave',
    wordClass: 'text-[#e4eeff]',
    plugClass: 'text-[#84a4ff]',
    glowColor: '0 0 10px rgba(120, 165, 255, 0.9), 0 0 24px rgba(85, 130, 248, 0.65)',
    borderGlow: 'rgba(110, 150, 255, 0.32)',
    effectAnimClass: 'led-effect-wave',
  },
  {
    id: 1,
    label: '02. Solar Amber Matrix',
    wordClass: 'text-[#ffe8a3]',
    plugClass: 'text-[#ffb703]',
    glowColor: '0 0 10px rgba(255, 190, 40, 0.95), 0 0 26px rgba(255, 140, 0, 0.7)',
    borderGlow: 'rgba(255, 175, 35, 0.35)',
    effectAnimClass: 'led-effect-strobe',
  },
  {
    id: 2,
    label: '03. Cyan Prism Scan',
    wordClass: 'text-[#a5f3fc]',
    plugClass: 'text-[#38bdf8]',
    glowColor: '0 0 12px rgba(56, 189, 248, 0.95), 0 0 28px rgba(129, 140, 248, 0.75)',
    borderGlow: 'rgba(56, 189, 248, 0.35)',
    effectAnimClass: 'led-effect-prism',
  },
];

/**
 * Custom SVG Electrical Plug Icon Facing Straight Up (Prongs pointing UP ↑)
 */
const PlugFacingUpIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Left Prong pointing straight UP */}
    <path
      d="M8.5 2.5V7.5"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    {/* Right Prong pointing straight UP */}
    <path
      d="M15.5 2.5V7.5"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    {/* Top Plug Collar */}
    <rect
      x="5"
      y="7.5"
      width="14"
      height="2.5"
      rx="1"
      fill="currentColor"
    />
    {/* Plug Body (U-shaped housing) */}
    <path
      d="M6.5 10H17.5V13.5C17.5 16.5376 15.0376 19 12 19C8.96243 19 6.5 16.5376 6.5 13.5V10Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.25"
    />
    {/* Bottom Cord Stem */}
    <path
      d="M12 19V22.5"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

export const LedTickerSection: React.FC = () => {
  const [activeEffect, setActiveEffect] = useState<LedEffectId>(0);
  const [autoCycle, setAutoCycle] = useState(true);

  // Cycle through the 3 LED effects automatically every 4.5 seconds
  useEffect(() => {
    if (!autoCycle) return;
    const timer = setInterval(() => {
      setActiveEffect((prev) => ((prev + 1) % 3) as LedEffectId);
    }, 4500);
    return () => clearInterval(timer);
  }, [autoCycle]);

  const currentEffect = LED_EFFECTS[activeEffect];

  // Repeat the 5-word sequence 4 times (2 halves for seamless -50% right-to-left continuous scroll)
  const repeatedSequence = [
    ...LED_WORDS,
    ...LED_WORDS,
    ...LED_WORDS,
    ...LED_WORDS,
  ];

  return (
    <section
      aria-label="LED Matrix Ticker"
      className="relative z-20 w-full bg-[#030511] py-10 sm:py-14 overflow-hidden select-none"
    >
      {/* Physical Single-Row LED Matrix Display Board */}
      <div
        className="relative w-full bg-[#02030a] border-y py-5 sm:py-6 overflow-hidden transition-colors duration-500"
        style={{
          borderColor: currentEffect.borderGlow,
          boxShadow:
            'inset 0 8px 24px rgba(0, 0, 0, 0.92), inset 0 -8px 24px rgba(0, 0, 0, 0.92), 0 0 40px rgba(55, 95, 220, 0.12)',
        }}
      >
        {/* Unlit LED Diode Matrix Background Grid */}
        <div
          className="pointer-events-none absolute inset-0 led-diode-grid opacity-75"
          aria-hidden="true"
        />

        {/* Single LED Row Scrolling Continuously from Right to Left */}
        <div className="relative z-10 w-full overflow-hidden marquee-fade-mask">
          <div className="animate-led-rtl items-center">
            {repeatedSequence.map((word, idx) => (
              <div
                key={`${word}-${idx}`}
                className={`inline-flex items-center shrink-0 ${currentEffect.effectAnimClass}`}
                style={{
                  animationDelay: `${(idx % 5) * 180}ms`,
                }}
              >
                {/* LED Word */}
                <span
                  className={`font-mono text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.22em] px-6 sm:px-9 transition-colors duration-500 whitespace-nowrap ${currentEffect.wordClass}`}
                  style={{
                    textShadow: currentEffect.glowColor,
                  }}
                >
                  {word}
                </span>

                {/* Separator: Plug Icon Facing Straight Up */}
                <span
                  className={`inline-flex items-center justify-center mx-2 sm:mx-4 transition-colors duration-500 ${currentEffect.plugClass}`}
                  style={{
                    filter: `drop-shadow(0 0 8px currentColor)`,
                  }}
                >
                  <PlugFacingUpIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Physical LED Scanline / Diode Mask Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-20 led-scanline-mask opacity-55"
          aria-hidden="true"
        />
      </div>
    </section>
  );
};
