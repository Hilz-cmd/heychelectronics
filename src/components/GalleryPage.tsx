import React, { useState, useEffect } from 'react';
import { ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';

const NUMBER_WORDS = [
  'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty',
  'twenty-one', 'twenty-two', 'twenty-three', 'twenty-four', 'twenty-five', 'twenty-six', 'twenty-seven', 'twenty-eight', 'twenty-nine', 'thirty',
  'thirty-one', 'thirty-two', 'thirty-three', 'thirty-four', 'thirty-five', 'thirty-six', 'thirty-seven', 'thirty-eight', 'thirty-nine', 'forty',
  'forty-one', 'forty-two', 'forty-three', 'forty-four', 'forty-five', 'forty-six', 'forty-seven'
];

interface GalleryPageProps {
  onBack: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onBack }) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex - 1 + NUMBER_WORDS.length) % NUMBER_WORDS.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex + 1) % NUMBER_WORDS.length);
  };

  return (
    <div className="min-h-screen w-full bg-[#030511] text-white selection:bg-[#6b8afd]/30">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-[#030511]/90 backdrop-blur-md border-b border-[#6c8eff]/15 py-4 px-6 sm:px-10">
        <div className="max-w-[1220px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-[#070b1e] border border-[#6c8eff]/25 hover:border-[#8ba8ff]/50 text-[#c8d6f5] hover:text-white transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#8ba8ff]" />
              <span>Back to Home</span>
            </button>
            <div className="hidden sm:block h-5 w-px bg-white/10" />
            <img src="/heych.svg" alt="HEYCH" className="h-6 sm:h-7 w-auto object-contain hidden sm:block" />
          </div>

          <div className="text-right">
            <span className="font-mono text-xs text-[#8ba8ff] tabular-nums">47 Past Works</span>
          </div>
        </div>
      </header>

      {/* Main Gallery Container */}
      <main className="max-w-[1220px] mx-auto px-4 sm:px-8 py-10 sm:py-16">
        {/* Subtle Ambient Glow */}
        <div
          className="pointer-events-none fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(68, 112, 242, 0.08) 0%, rgba(25, 48, 135, 0.02) 60%, transparent 80%)',
            filter: 'blur(50px)',
          }}
        />

        {/* Header Title */}
        <div className="mb-10 text-center sm:text-left">
          <p className="text-xs font-medium tracking-[0.04em] text-[#8ba8ff] mb-2">
            Showcase Archive
          </p>
          <h1 className="font-display text-2xl sm:text-4xl font-semibold tracking-[-0.025em] text-white">
            Past Works <span className="text-lumine-gradient">Gallery</span>
          </h1>
        </div>

        {/* 47 Images Grid: "Don't show the names, just images" */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {NUMBER_WORDS.map((name, index) => (
            <div
              key={name}
              onClick={() => setActiveImageIndex(index)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#070b1e] border border-[#6c8eff]/18 hover:border-[#8ba8ff]/50 transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-pointer"
            >
              <img
                src={`/${name}.webp`}
                alt=""
                loading="lazy"
                onError={(e) => {
                  // Fallback to gallery folder if root alias is needed
                  const target = e.currentTarget;
                  if (!target.src.includes('/gallery/')) {
                    target.src = `/gallery/${name}.webp`;
                  }
                }}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              {/* Subtle hover sheen overlay without text names */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030511]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </main>

      {/* Fullscreen Lightbox Viewer for Gallery */}
      {activeImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#02040d]/90 backdrop-blur-md"
          onClick={() => setActiveImageIndex(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-[#080d22] border border-[#789aff]/30 shadow-[0_24px_90px_rgba(0,0,0,0.9)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar Controls */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-[#050817]">
              <span className="font-mono text-xs text-[#9cb5ff] tabular-nums">
                {activeImageIndex + 1} / {NUMBER_WORDS.length}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                  aria-label="Next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveImageIndex(null)}
                  className="ml-1 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Image Container */}
            <div className="relative flex-1 bg-[#040714] flex items-center justify-center overflow-hidden p-2">
              <img
                src={`/${NUMBER_WORDS[activeImageIndex]}.webp`}
                alt=""
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
