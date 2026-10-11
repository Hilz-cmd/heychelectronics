import React, { useState, useEffect } from 'react';
import { MessageCircle, MapPin } from 'lucide-react';

// 8x9 bold dot-matrix bitmaps for H, E, Y, C, H
const LETTER_BITMAPS: Record<string, string[]> = {
  H: [
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11111111',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
  ],
  E: [
    '11111111',
    '11111111',
    '11000000',
    '11000000',
    '11111110',
    '11000000',
    '11000000',
    '11111111',
    '11111111',
  ],
  Y: [
    '11000011',
    '11000011',
    '01100110',
    '00111100',
    '00011000',
    '00011000',
    '00011000',
    '00011000',
    '00011000',
  ],
  C: [
    '00111110',
    '01111111',
    '11000011',
    '11000000',
    '11000000',
    '11000000',
    '11000011',
    '01111111',
    '00111110',
  ],
};

const WORD = ['H', 'E', 'Y', 'C', 'H'];

interface DiodeCell {
  col: number;
  row: number;
  isLit: boolean;
  letterIndex: number;
}

const TOTAL_ROWS = 11;
const TOTAL_COLS = 56;

const DIODE_MATRIX: DiodeCell[] = (() => {
  const cells: DiodeCell[] = [];
  for (let r = 0; r < TOTAL_ROWS; r++) {
    for (let c = 0; c < TOTAL_COLS; c++) {
      let isLit = false;
      let letterIndex = -1;

      if (r >= 1 && r <= 9) {
        const bitmapRow = r - 1;
        for (let li = 0; li < WORD.length; li++) {
          const startCol = 2 + li * 11;
          const endCol = startCol + 8;
          if (c >= startCol && c < endCol) {
            letterIndex = li;
            const char = WORD[li];
            const pattern = LETTER_BITMAPS[char][bitmapRow];
            if (pattern[c - startCol] === '1') {
              isLit = true;
            }
            break;
          }
        }
      }

      cells.push({ col: c, row: r, isLit, letterIndex });
    }
  }
  return cells;
})();

type FooterLedEffect = 0 | 1 | 2 | 3;

/**
 * Custom SVG Icons for Facebook, Instagram, Gmail, and TikTok
 */
const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M13.5 21v-7.5h2.5l.38-3h-2.88V8.59c0-.87.24-1.46 1.49-1.46H16.5V4.45c-.27-.04-1.2-.12-2.28-.12-2.26 0-3.81 1.38-3.81 3.91v2.26H8v3h2.41V21h3.09Z" />
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const GmailIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="M3 6.5L12 13L21 6.5" />
  </svg>
);

const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M16.6 5.82a4.28 4.28 0 0 1-1.08-2.82h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.43 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.22-1.48Z" />
  </svg>
);

const WHATSAPP_CONTACT_URL = `https://wa.me/2347035676769?text=${encodeURIComponent(
  'Hello HEYCH, I would like to inquire about your products and installation services.'
)}`;

export const ContactAndFooterSection: React.FC = () => {
  const [ledEffect, setLedEffect] = useState<FooterLedEffect>(0);

  // Cycle the footer HEYCH LED effect every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLedEffect((prev) => ((prev + 1) % 4) as FooterLedEffect);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Color palette per effect for the full-width SVG LED diode array
  const effectPalette = [
    { core: '#ffffff', bulb: '#7da2ff', halo: 'rgba(110, 155, 255, 0.45)', animClass: 'led-effect-wave' },
    { core: '#fff7d6', bulb: '#ffb703', halo: 'rgba(255, 175, 30, 0.45)', animClass: 'led-effect-strobe' },
    { core: '#e0faff', bulb: '#22d3ee', halo: 'rgba(34, 211, 238, 0.45)', animClass: 'led-effect-prism' },
    { core: '#f3e8ff', bulb: '#a855f7', halo: 'rgba(168, 85, 247, 0.45)', animClass: 'led-effect-wave' },
  ][ledEffect];

  return (
    <>
      {/* 1. CONTACT US SECTION (Centered with CTA "Get us in WhatsApp") */}
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="relative z-20 w-full bg-[#030511] py-24 sm:py-32 px-4 sm:px-8 border-t border-[#6c8eff]/12 overflow-hidden"
      >
        {/* Centered Ambient Horizon Glow */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[280px] rounded-full"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(88, 135, 255, 0.20) 0%, rgba(38, 72, 190, 0.06) 55%, transparent 80%)',
            filter: 'blur(32px)',
          }}
        />

        <div className="relative max-w-2xl mx-auto text-center flex flex-col items-center">
          <p className="text-xs font-medium tracking-[0.04em] text-[#8ba8ff] mb-3">
            Contact Us
          </p>

          <h2
            id="contact-heading"
            className="font-display text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-white leading-[1.1]"
          >
            Ready to Illuminate{' '}
            <span className="text-lumine-gradient">Your Next Project?</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#c8d6f5]/72 max-w-lg leading-relaxed">
            Connect directly with us for our expertise in custom LED screen installations, solar inverter installations and smart homes
          </p>

          {/* Office Address */}
          <div className="mt-5 inline-flex items-center gap-2 text-xs sm:text-sm text-[#c8d6f5]/85">
            <MapPin className="w-4 h-4 text-[#8ba8ff] shrink-0" />
            <span>11 ShaSha-Akowonjo road, Akowojo, Lagos State. Nigeria 420108</span>
          </div>

          {/* Centered Primary CTA: "Get us in WhatsApp" -> +2347035676769 */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href={WHATSAPP_CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neone-primary inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold text-[#070b19] cursor-pointer whitespace-nowrap no-underline"
            >
              <MessageCircle className="w-4 h-4 fill-[#070b19]/15" />
              <span>Get us in WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. FOOTER SECTION (Social Icons + Address + Full-Width Individual-Diode LED "HEYCH" at the very bottom) */}
      <footer className="relative z-20 w-full bg-[#02040c] border-t border-[#6c8eff]/15 pt-12 overflow-hidden select-none">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-8 pb-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand, Copyright & Address */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-4 text-xs text-[#b4c6f0]/65 text-center sm:text-left">
              <img
                src="/heych.svg"
                alt="HEYCH"
                className="h-6 sm:h-7 w-auto object-contain"
              />
              <span aria-hidden="true" className="hidden sm:inline text-white/20">
                ·
              </span>
              <span>@ 2026 HEYCH. All rights reserved.</span>
              <span aria-hidden="true" className="hidden sm:inline text-white/20">
                ·
              </span>
              <span className="text-[#c8d6f5]/75">
                11 ShaSha-Akowonjo road, Akowojo, Lagos State. Nigeria 420108
              </span>
            </div>

            {/* Social Media Links: Facebook, Instagram, Gmail, and TikTok */}
            <div className="flex items-center gap-2.5">
              <a
                href="https://facebook.com/heychmedia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="facebook.com/heychmedia"
                className="w-9 h-9 rounded-xl bg-[#080d22] border border-[#6c8eff]/20 hover:border-[#8ba8ff]/55 text-[#c8d6f5]/80 hover:text-white flex items-center justify-center transition-all duration-150 hover:-translate-y-0.5 cursor-pointer"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>

              <a
                href="https://instagram.com/heych_eletronics"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="instagram.com/heych_eletronics"
                className="w-9 h-9 rounded-xl bg-[#080d22] border border-[#6c8eff]/20 hover:border-[#8ba8ff]/55 text-[#c8d6f5]/80 hover:text-white flex items-center justify-center transition-all duration-150 hover:-translate-y-0.5 cursor-pointer"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              <a
                href="mailto:heychelectronics@gmail.com"
                aria-label="Gmail"
                title="heychelectronics@gmail.com"
                className="w-9 h-9 rounded-xl bg-[#080d22] border border-[#6c8eff]/20 hover:border-[#8ba8ff]/55 text-[#c8d6f5]/80 hover:text-white flex items-center justify-center transition-all duration-150 hover:-translate-y-0.5 cursor-pointer"
              >
                <GmailIcon className="w-4 h-4" />
              </a>

              <a
                href="https://tiktok.com/@heychchuks"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                title="tiktok.com/@heychchuks"
                className="w-9 h-9 rounded-xl bg-[#080d22] border border-[#6c8eff]/20 hover:border-[#8ba8ff]/55 text-[#c8d6f5]/80 hover:text-white flex items-center justify-center transition-all duration-150 hover:-translate-y-0.5 cursor-pointer"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* LAST ELEMENT IN THE FOOTER: Full-Width Individual-LED "HEYCH" Board */}
        <div
          onClick={() => setLedEffect((prev) => ((prev + 1) % 4) as FooterLedEffect)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setLedEffect((prev) => ((prev + 1) % 4) as FooterLedEffect);
            }
          }}
          aria-label="HEYCH full-width interactive LED matrix display"
          className="relative w-full bg-[#02040c] border-t border-[#6c8eff]/20 cursor-pointer overflow-hidden py-3"
        >
          <svg
            viewBox={`0 0 ${TOTAL_COLS * 20} ${TOTAL_ROWS * 20}`}
            className={`block w-full h-auto ${effectPalette.animClass}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            {DIODE_MATRIX.map((cell, idx) => {
              const cx = cell.col * 20 + 10;
              const cy = cell.row * 20 + 10;
              if (!cell.isLit) {
                return (
                  <g key={idx}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={6.4}
                      fill="#0b1126"
                      stroke="rgba(110, 145, 235, 0.16)"
                      strokeWidth="0.9"
                    />
                    <circle
                      cx={cx - 1.8}
                      cy={cy - 1.8}
                      r={1.4}
                      fill="rgba(180, 205, 255, 0.12)"
                    />
                  </g>
                );
              }
              return (
                <g key={idx}>
                  <circle cx={cx} cy={cy} r={11} fill={effectPalette.halo} />
                  <circle cx={cx} cy={cy} r={6.6} fill={effectPalette.bulb} />
                  <circle cx={cx} cy={cy} r={3.4} fill={effectPalette.core} />
                </g>
              );
            })}
          </svg>
        </div>
      </footer>
    </>
  );
};
