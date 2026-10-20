import React, { useState } from 'react';
import { ArrowUpRight, X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export interface ShowcaseWork {
  id: string;
  index: string;
  year: string;
  image: string;
  gridSpan: string;
}

const SHOWCASE_WORKS: ShowcaseWork[] = [
  {
    id: 'work-1',
    index: '01',
    year: '2016',
    image: '/thirteen.webp',
    gridSpan: 'lg:col-span-7',
  },
  {
    id: 'work-2',
    index: '02',
    year: '2018',
    image: '/thirty-one.webp',
    gridSpan: 'lg:col-span-5',
  },
  {
    id: 'work-3',
    index: '03',
    year: '2020',
    image: '/thirty-seven.webp',
    gridSpan: 'lg:col-span-5',
  },
  {
    id: 'work-4',
    index: '04',
    year: '2023',
    image: '/thirty-two.webp',
    gridSpan: 'lg:col-span-7',
  },
  {
    id: 'work-5',
    index: '05',
    year: '2025',
    image: '/three.webp',
    gridSpan: 'lg:col-span-6',
  },
  {
    id: 'work-6',
    index: '06',
    year: '2026',
    image: '/twenty-five.webp',
    gridSpan: 'lg:col-span-6',
  },
];

interface ShowcaseSectionProps {
  onSeeMore?: () => void;
}

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({ onSeeMore }) => {
  const [activeWorkIndex, setActiveWorkIndex] = useState<number | null>(null);

  const activeWork =
    activeWorkIndex !== null ? SHOWCASE_WORKS[activeWorkIndex] : null;

  const handlePrevWork = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeWorkIndex === null) return;
    setActiveWorkIndex(
      (activeWorkIndex - 1 + SHOWCASE_WORKS.length) % SHOWCASE_WORKS.length
    );
  };

  const handleNextWork = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeWorkIndex === null) return;
    setActiveWorkIndex((activeWorkIndex + 1) % SHOWCASE_WORKS.length);
  };

  return (
    <section
      id="showcase"
      aria-labelledby="showcase-heading"
      className="relative z-20 w-full bg-[#030511] py-20 sm:py-28 px-4 sm:px-8 border-t border-[#6c8eff]/12"
    >
      {/* Subtle Ambient Backdrop Glow */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[440px] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(68, 112, 242, 0.11) 0%, rgba(25, 48, 135, 0.04) 55%, transparent 80%)',
          filter: 'blur(42px)',
        }}
      />

      <div className="relative max-w-[1220px] mx-auto">
        {/* Section Header + See More Action Button (Year filter removed) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div>
            <p className="text-xs font-medium tracking-[0.04em] text-[#8ba8ff] mb-2.5">
              Selected Installations · 2016 — 2026
            </p>
            <h2
              id="showcase-heading"
              className="font-display text-2xl sm:text-4xl font-semibold tracking-[-0.025em] text-white"
            >
              Past Works <span className="text-lumine-gradient">& Global Deployments</span>
            </h2>
          </div>

          {/* "See More" Navigation CTA */}
          <button
            type="button"
            onClick={onSeeMore}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#6d8cf8]/20 hover:bg-[#6d8cf8]/30 border border-[#8ba8ff]/40 text-white shadow-[0_0_20px_rgba(105,142,255,0.2)] hover:shadow-[0_0_28px_rgba(105,142,255,0.35)] transition-all duration-200 cursor-pointer self-start sm:self-auto"
          >
            <span>See More</span>
            <ArrowRight className="w-4 h-4 text-[#9cb5ff]" />
          </button>
        </div>

        {/* 6 Past Works Cards: Just Image and Year Completed */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
          {SHOWCASE_WORKS.map((work, idx) => (
            <article
              key={work.id}
              onClick={() => setActiveWorkIndex(idx)}
              className={`group relative rounded-2xl bg-[#070b1e] border border-[#6c8eff]/18 hover:border-[#8ba8ff]/50 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-0.5 shadow-[0_14px_40px_rgba(0,0,0,0.55)] flex flex-col justify-end min-h-[300px] sm:min-h-[360px] ${work.gridSpan}`}
            >
              {/* Background Project Image */}
              <div className="absolute inset-0 bg-[#050816] overflow-hidden">
                <img
                  src={work.image}
                  alt={`Installation completed in ${work.year}`}
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('/gallery/')) {
                      target.src = `/gallery${work.image}`;
                    }
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                />

                {/* Subtle Contrast Scrim */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(3, 5, 17, 0.92) 0%, rgba(4, 8, 24, 0.45) 45%, rgba(3, 5, 17, 0.15) 100%)',
                  }}
                />
              </div>

              {/* Top Corner Index & Expand Icon */}
              <div className="relative z-10 p-5 sm:p-6 mb-auto flex items-center justify-between">
                <span className="font-mono text-xs font-medium text-white/75 tabular-nums">
                  {work.index} / 06
                </span>
                <span className="w-8 h-8 rounded-lg bg-[#05091a]/75 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/75 group-hover:text-white group-hover:border-[#8ba8ff]/50 transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>

              {/* Bottom Card Content: Just Image and Year Completed */}
              <div className="relative z-10 p-5 sm:p-6 pt-0">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#030511]/85 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-semibold text-white">
                  <span className="text-[#8ba8ff] font-normal">Completed</span>
                  <span className="font-mono tabular-nums text-lumine-gradient">{work.year}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeWork && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#02040d]/90 backdrop-blur-lg"
          onClick={() => setActiveWorkIndex(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl bg-[#080d22] border border-[#789aff]/30 shadow-[0_24px_90px_rgba(0,0,0,0.9)] overflow-hidden text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Lightbox Controls */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#050817]">
              <div className="flex items-center gap-2 text-xs text-[#9cb5ff] font-mono tabular-nums">
                <span>Installation {activeWork.index} of 06</span>
                <span aria-hidden="true">·</span>
                <span className="text-white font-semibold">Completed {activeWork.year}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevWork}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                  aria-label="Previous work"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextWork}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                  aria-label="Next work"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveWorkIndex(null)}
                  className="ml-1 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close viewer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* High-Resolution Image Viewport */}
            <div className="relative aspect-[16/9] w-full bg-[#040714] overflow-hidden">
              <img
                src={activeWork.image}
                alt={`Completed ${activeWork.year}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Clean Footer with Just Year */}
            <div className="px-6 py-4 bg-[#050817] flex items-center justify-between">
              <span className="text-xs text-[#8ba8ff]">Past Work Archive</span>
              <span className="font-mono text-sm font-semibold text-white">
                Completed {activeWork.year}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
