import React, { useState } from 'react';
import { MapPin, ArrowUpRight, X, ChevronLeft, ChevronRight, Building2 } from 'lucide-react';
import vercorFacadeImg from '../assets/images/showcase_vercor_led_facade_1791489250453.jpg';
import aetherSolarImg from '../assets/images/showcase_aether_solar_array_1791489260407.jpg';
import chronosWallImg from '../assets/images/showcase_chronos_command_wall_1791489271285.jpg';
import kinetixBillboardImg from '../assets/images/showcase_kinetix_arena_billboard_1791489280850.jpg';
import raydiantRetailImg from '../assets/images/showcase_raydiant_retail_atrium_1791489293008.jpg';
import hyperionCanopyImg from '../assets/images/showcase_hyperion_transit_canopy_1791489306681.jpg';

export interface ShowcaseWork {
  id: string;
  index: string;
  companyName: string;
  projectTitle: string;
  address: string;
  year: string;
  scope: string;
  image: string;
  gridSpan: string;
}

const SHOWCASE_WORKS: ShowcaseWork[] = [
  {
    id: 'vercor-seoul',
    index: '01',
    companyName: 'Vercor Holdings',
    projectTitle: 'Curved Kinetic LED Media Facade',
    address: '440 Teheran-ro, Gangnam-gu, Seoul, South Korea',
    year: '2026',
    scope: '1,420 m² P3.9 Weatherproof Outdoor Curve · HEYCH Sync OS',
    image: vercorFacadeImg,
    gridSpan: 'lg:col-span-7',
  },
  {
    id: 'aether-nevada',
    index: '02',
    companyName: 'AetherLabs Energy',
    projectTitle: 'Autonomous Solar Canopy & Telemetry Hub',
    address: '1280 Solar Pkwy, Boulder City, NV 89005, USA',
    year: '2025',
    scope: '140 kW Monocrystalline Canopy · LiFePO4 Reserve Bank',
    image: aetherSolarImg,
    gridSpan: 'lg:col-span-5',
  },
  {
    id: 'chronos-nyc',
    index: '03',
    companyName: 'Chronos Capital',
    projectTitle: 'Global Telemetry Command Video Wall',
    address: '85 Broad St, Financial District, New York, NY 10004',
    year: '2025',
    scope: '18-Meter Seamless COB Micro-LED · 7,680 Hz Refresh',
    image: chronosWallImg,
    gridSpan: 'lg:col-span-5',
  },
  {
    id: 'kinetix-london',
    index: '04',
    companyName: 'Kinetix Entertainment',
    projectTitle: '360° Suspended Plaza Halo Billboard',
    address: '100 Peninsula Square, Greenwich, London SE10 0DX, UK',
    year: '2024',
    scope: '64-Meter Circular LED Ribbon · Voice & DMX Scene Routing',
    image: kinetixBillboardImg,
    gridSpan: 'lg:col-span-7',
  },
  {
    id: 'raydiant-tokyo',
    index: '05',
    companyName: 'Raydiant Retail Group',
    projectTitle: 'Smoked-Glass Interactive Flagship Screens',
    address: '5-7-21 Jingumae, Shibuya-ku, Tokyo 150-0001, Japan',
    year: '2024',
    scope: 'Floor-to-Ceiling Acoustic Glass LED · Alexa Scene Presets',
    image: raydiantRetailImg,
    gridSpan: 'lg:col-span-6',
  },
  {
    id: 'hyperion-frankfurt',
    index: '06',
    companyName: 'Hyperion Mobility',
    projectTitle: 'Solar Transit Pavilion & Arrival Matrix',
    address: 'Europa-Allee 64, 60327 Frankfurt am Main, Germany',
    year: '2023',
    scope: 'Solar-Powered Transit Roof · High-Contrast Passenger Boards',
    image: hyperionCanopyImg,
    gridSpan: 'lg:col-span-6',
  },
];

const YEAR_FILTERS = ['All', '2026', '2025', '2024', '2023'] as const;

export const ShowcaseSection: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [activeWorkIndex, setActiveWorkIndex] = useState<number | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const filteredWorks =
    selectedYear === 'All'
      ? SHOWCASE_WORKS
      : SHOWCASE_WORKS.filter((w) => w.year === selectedYear);

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
        {/* Section Header + Interactive Year Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div>
            <p className="text-xs font-medium tracking-[0.04em] text-[#8ba8ff] mb-2.5">
              Selected Installations · 2023 — 2026
            </p>
            <h2
              id="showcase-heading"
              className="font-display text-2xl sm:text-4xl font-semibold tracking-[-0.025em] text-white"
            >
              Past Works <span className="text-lumine-gradient">& Global Deployments</span>
            </h2>
          </div>

          {/* Interactive Year Filter Segmented Controls */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#070b1e] border border-[#6c8eff]/20 self-start md:self-auto">
            {YEAR_FILTERS.map((year) => {
              const isActive = selectedYear === year;
              return (
                <button
                  key={year}
                  type="button"
                  onClick={() => setSelectedYear(year)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium tabular-nums transition-all duration-150 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#6d8cf8]/25 text-white border border-[#8ba8ff]/40 shadow-sm'
                      : 'text-[#b4c6f0]/60 hover:text-white border border-transparent'
                  }`}
                >
                  {year === 'All' ? 'All Works (6)' : year}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Architectural Bento Grid (12-col desktop, 1-col mobile, 2-col tablet) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
          {filteredWorks.map((work) => {
            const fullIdx = SHOWCASE_WORKS.findIndex((w) => w.id === work.id);
            const hasError = imgErrors[work.id];

            return (
              <article
                key={work.id}
                onClick={() => setActiveWorkIndex(fullIdx)}
                className={`group relative rounded-2xl bg-[#070b1e] border border-[#6c8eff]/18 hover:border-[#8ba8ff]/50 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-0.5 shadow-[0_14px_40px_rgba(0,0,0,0.55)] flex flex-col justify-end min-h-[340px] sm:min-h-[390px] ${
                  selectedYear === 'All' ? work.gridSpan : 'lg:col-span-6'
                }`}
              >
                {/* Background Project Image */}
                <div className="absolute inset-0 bg-[#050816] overflow-hidden">
                  {!hasError ? (
                    <img
                      src={work.image}
                      alt={`${work.companyName} — ${work.projectTitle}`}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setImgErrors((prev) => ({ ...prev, [work.id]: true }))
                      }
                      className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                    />
                  ) : (
                    /* Resilient Fallback Container */
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0e1738] to-[#040714] text-[#8ba8ff] p-6">
                      <Building2 className="w-10 h-10 mb-2 opacity-75" />
                      <span className="text-sm font-medium text-white/80">
                        {work.companyName}
                      </span>
                    </div>
                  )}

                  {/* Measured Contrast Scrim for Guaranteed WCAG AA Text Legibility */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(3, 5, 17, 0.96) 0%, rgba(4, 8, 24, 0.72) 42%, rgba(3, 5, 17, 0.18) 100%)',
                    }}
                  />
                </div>

                {/* Top Corner Editorial Index & Interactive Expand Affordance */}
                <div className="relative z-10 p-5 sm:p-6 mb-auto flex items-center justify-between">
                  <span className="font-mono text-xs font-medium text-white/75 tabular-nums">
                    {work.index} / 06
                  </span>
                  <span className="w-8 h-8 rounded-lg bg-[#05091a]/75 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/75 group-hover:text-white group-hover:border-[#8ba8ff]/50 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>

                {/* Bottom Content Overlay: Company Name, Project Title, Address, and Year */}
                <div className="relative z-10 p-5 sm:p-7 pt-0">
                  {/* Unboxed Metadata Line: Company Name · Year */}
                  <div className="flex items-center justify-between gap-3 text-xs sm:text-[13px] font-medium text-[#9cb5ff] mb-1.5">
                    <span className="text-white font-semibold tracking-[-0.01em]">
                      {work.companyName}
                    </span>
                    <span className="font-mono text-[#a8c1ff] tabular-nums shrink-0">
                      {work.year}
                    </span>
                  </div>

                  {/* Project Headline */}
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-white tracking-[-0.015em] group-hover:text-[#c4d7ff] transition-colors">
                    {work.projectTitle}
                  </h3>

                  {/* Technical Scope Line */}
                  <p className="mt-1 text-xs text-[#c8d6f5]/70 line-clamp-1">
                    {work.scope}
                  </p>

                  {/* Hairline Divider + Physical Address & Year Footer */}
                  <div className="mt-4 pt-3.5 border-t border-white/12 flex items-center justify-between gap-4 text-xs text-[#c8d6f5]/80">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <MapPin className="w-3.5 h-3.5 text-[#8ba8ff] shrink-0" />
                      <span className="truncate">{work.address}</span>
                    </div>
                    <span className="font-mono text-[11px] text-white/55 tabular-nums shrink-0">
                      Completed {work.year}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox Case-Study Viewer Modal */}
      {activeWork && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#02040d]/88 backdrop-blur-lg"
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
                <span>{activeWork.year}</span>
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
                alt={`${activeWork.companyName} — ${activeWork.projectTitle}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Case Study Metadata Details */}
            <div className="p-6 sm:p-7">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <div className="text-xs font-semibold text-[#8ba8ff] tracking-wide">
                    {activeWork.companyName}
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-white mt-0.5">
                    {activeWork.projectTitle}
                  </h3>
                </div>
                <span className="font-mono text-sm font-semibold text-[#a8c1ff] tabular-nums">
                  Year: {activeWork.year}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#9cb5ff]/60 block mb-1">Installation Address</span>
                  <span className="text-white/90 font-medium flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#8ba8ff] shrink-0" />
                    {activeWork.address}
                  </span>
                </div>
                <div>
                  <span className="text-[#9cb5ff]/60 block mb-1">System Architecture</span>
                  <span className="text-white/90 font-mono tabular-nums">
                    {activeWork.scope}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
