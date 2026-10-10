import React, { useState, useEffect } from 'react';
import { MessageCircle, Check, Copy, ExternalLink, X, Sparkles } from 'lucide-react';

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

// Build full 56-column x 11-row LED matrix grid (with 1-row top/bottom padding and 2-col side padding + 3-col letter spacing)
interface DiodeCell {
  col: number;
  row: number;
  isLit: boolean;
  letterIndex: number; // 0..4 for H,E,Y,C,H or -1 if background diode
}

const TOTAL_ROWS = 11;
const TOTAL_COLS = 56; // 2 + 8 + 3 + 8 + 3 + 8 + 3 + 8 + 3 + 8 + 2

const DIODE_MATRIX: DiodeCell[] = (() => {
  const cells: DiodeCell[] = [];
  for (let r = 0; r < TOTAL_ROWS; r++) {
    for (let c = 0; c < TOTAL_COLS; c++) {
      let isLit = false;
      let letterIndex = -1;

      if (r >= 1 && r <= 9) {
        const bitmapRow = r - 1;
        // Check which letter column c falls into
        for (let li = 0; li < WORD.length; li++) {
          const startCol = 2 + li * 11; // 8 cols width + 3 cols gap = 11 stride
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

const FOOTER_EFFECT_NAMES: Record<FooterLedEffect, string> = {
  0: '01. Cobalt Horizon Wave',
  1: '02. Solar Amber Letter Chase',
  2: '03. Cyber Cyan Matrix Pulse',
  3: '04. Radial Spectrum Ripple',
};

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

export const ContactAndFooterSection: React.FC = () => {
  const [ledEffect, setLedEffect] = useState<FooterLedEffect>(0);
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('Outdoor LED Billboard Inquiry');
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [activeSocialToast, setActiveSocialToast] = useState<string | null>(null);

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

  const whatsappUrl = `https://wa.me/18005550199?text=${encodeURIComponent(
    `Hello HEYCH / NEONE team, I would like to discuss: ${selectedTopic}`
  )}`;

  const handleSocialClick = (platform: string, detail: string) => {
    setActiveSocialToast(`${platform}: ${detail}`);
    setTimeout(() => {
      setActiveSocialToast((curr) => (curr === `${platform}: ${detail}` ? null : curr));
    }, 3000);
  };

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

          {/* Centered Primary CTA: "Get us in WhatsApp" */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={() => setWhatsAppModalOpen(true)}
              className="btn-neone-primary inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold text-[#070b19] cursor-pointer whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 fill-[#070b19]/15" />
              <span>Get us in WhatsApp</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. FOOTER SECTION (Social Icons + Full-Width Individual-Diode LED "HEYCH" at the very bottom) */}
      <footer className="relative z-20 w-full bg-[#02040c] border-t border-[#6c8eff]/15 pt-12 overflow-hidden select-none">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-8 pb-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand & Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 text-xs text-[#b4c6f0]/60">
              <span className="font-display font-bold tracking-[0.08em] text-white text-sm">
                HEYCH
              </span>
              <span aria-hidden="true" className="hidden sm:inline text-white/20">
                ·
              </span>
              <span>@ 2026 HEYCH. All rights reserved.</span>
            </div>

            {/* Social Icons: Facebook, Instagram, Gmail, and TikTok */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => handleSocialClick('Facebook', 'facebook.com/heych.lumine')}
                aria-label="Facebook"
                title="Facebook"
                className="w-9 h-9 rounded-xl bg-[#080d22] border border-[#6c8eff]/20 hover:border-[#8ba8ff]/55 text-[#c8d6f5]/80 hover:text-white flex items-center justify-center transition-all duration-150 hover:-translate-y-0.5 cursor-pointer"
              >
                <FacebookIcon className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleSocialClick('Instagram', '@heych.lumine')}
                aria-label="Instagram"
                title="Instagram"
                className="w-9 h-9 rounded-xl bg-[#080d22] border border-[#6c8eff]/20 hover:border-[#8ba8ff]/55 text-[#c8d6f5]/80 hover:text-white flex items-center justify-center transition-all duration-150 hover:-translate-y-0.5 cursor-pointer"
              >
                <InstagramIcon className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleSocialClick('Gmail', 'engineering@heych.io')}
                aria-label="Gmail"
                title="Gmail"
                className="w-9 h-9 rounded-xl bg-[#080d22] border border-[#6c8eff]/20 hover:border-[#8ba8ff]/55 text-[#c8d6f5]/80 hover:text-white flex items-center justify-center transition-all duration-150 hover:-translate-y-0.5 cursor-pointer"
              >
                <GmailIcon className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleSocialClick('TikTok', '@heych.official')}
                aria-label="TikTok"
                title="TikTok"
                className="w-9 h-9 rounded-xl bg-[#080d22] border border-[#6c8eff]/20 hover:border-[#8ba8ff]/55 text-[#c8d6f5]/80 hover:text-white flex items-center justify-center transition-all duration-150 hover:-translate-y-0.5 cursor-pointer"
              >
                <TikTokIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Feedback Toast when a Social Icon is clicked */}
          {activeSocialToast && (
            <div className="mt-4 flex justify-center md:justify-end">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#0d1638] border border-[#8ba8ff]/35 text-xs text-[#d8e3ff]">
                <Sparkles className="w-3.5 h-3.5 text-[#a8c1ff]" />
                <span>{activeSocialToast}</span>
              </div>
            </div>
          )}
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

      {/* Interactive WhatsApp Dispatch Modal */}
      {whatsAppModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#02040d]/80 backdrop-blur-md"
          onClick={() => setWhatsAppModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-[#090e24] border border-[#789aff]/30 shadow-[0_24px_80px_rgba(0,0,0,0.85)] p-6 sm:p-7 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setWhatsAppModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close WhatsApp modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="inline-flex items-center gap-2 text-xs font-medium text-[#8ba8ff] mb-2">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Direct Engineering Line</span>
            </div>

            <h3 className="font-display text-xl font-semibold text-white">
              Get us in WhatsApp
            </h3>
            <p className="mt-1.5 text-xs text-[#c8d6f5]/75 leading-relaxed">
              Select your inquiry topic to open a pre-populated WhatsApp chat with our on-duty systems architect.
            </p>

            <div className="mt-4 space-y-2">
              {[
                'Outdoor LED Billboard Inquiry',
                'Autonomous Solar & Battery Sizing',
                'Indoor Micro-LED Command Screen',
                'Alexa & HEYCH Control Integration',
              ].map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setSelectedTopic(topic)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer flex items-center justify-between ${
                    selectedTopic === topic
                      ? 'bg-[#6d8cf8]/20 border-[#8ba8ff]/50 text-white'
                      : 'bg-[#050817] border-white/10 text-[#c8d6f5]/75 hover:text-white'
                  }`}
                >
                  <span>{topic}</span>
                  {selectedTopic === topic && <Check className="w-3.5 h-3.5 text-[#a8c1ff]" />}
                </button>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 flex flex-col gap-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-neone-primary py-3 rounded-xl text-xs font-semibold text-[#070b19] flex items-center justify-center gap-2 no-underline"
              >
                <span>Open WhatsApp Chat</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText('+1 (800) 555-0199');
                  setCopiedPhone(true);
                  setTimeout(() => setCopiedPhone(false), 2000);
                }}
                className="w-full btn-neone-secondary py-2.5 rounded-xl text-xs font-medium text-white/85 flex items-center justify-center gap-2 cursor-pointer"
              >
                {copiedPhone ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied WhatsApp Number: +1 (800) 555-0199</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#9cb5ff]" />
                    <span>Copy WhatsApp Number (+1 800-555-0199)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
