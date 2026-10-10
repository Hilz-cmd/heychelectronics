import React from 'react';

interface StatItem {
  value: string;
  label: string;
  context: string;
}

const STATS: StatItem[] = [
  {
    value: '14,800 m²',
    label: 'Active LED Matrix Surface',
    context: 'Calibrated outdoor billboards & indoor COB walls across 4 continents',
  },
  {
    value: '99.995%',
    label: 'Measured Telemetry Uptime',
    context: 'Verified across all HEYCH Lumine edge nodes over the past 24 months',
  },
  {
    value: '4.2 MW',
    label: 'Autonomous Solar Capacity',
    context: 'Off-grid monocrystalline canopies & LiFePO4 reserve banks deployed',
  },
  {
    value: '< 120 ms',
    label: 'Scene & Voice Execution',
    context: 'End-to-end hardware switching latency via local Alexa & DMX routing',
  },
];

export const StatsSection: React.FC = () => {
  return (
    <section
      id="stats"
      aria-label="Key performance metrics"
      className="relative z-20 w-full bg-[#030511] py-16 sm:py-20 px-4 sm:px-8 border-t border-[#6c8eff]/12"
    >
      {/* Subtle Ambient Cobalt Horizon Glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px mx-auto max-w-4xl"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(120, 165, 255, 0.45) 50%, transparent 100%)',
        }}
      />

      <div className="relative max-w-[1220px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-0 lg:divide-x lg:divide-white/[0.08]">
          {STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col justify-between ${
                idx === 0
                  ? 'lg:pr-8'
                  : idx === STATS.length - 1
                  ? 'lg:pl-8'
                  : 'lg:px-8'
              }`}
            >
              <div>
                <div className="font-display text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-[-0.03em] text-white tabular-nums">
                  <span className="text-lumine-gradient">{stat.value}</span>
                </div>
                <div className="mt-2 font-display text-sm sm:text-[15px] font-semibold text-white tracking-[-0.01em]">
                  {stat.label}
                </div>
              </div>
              <p className="mt-2 text-xs leading-[1.55] text-[#c8d6f5]/60">
                {stat.context}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
