import React from 'react';

interface StatItem {
  value: string;
  label: string;
}

const STATS: StatItem[] = [
  {
    value: '130+',
    label: 'Companies worked with',
  },
  {
    value: '30+',
    label: 'Screens installed',
  },
  {
    value: '40+',
    label: 'Solar inverters installed',
  },
  {
    value: '10+',
    label: 'Workers trained',
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
              className={`flex flex-col justify-center ${
                idx === 0
                  ? 'lg:pr-8'
                  : idx === STATS.length - 1
                  ? 'lg:pl-8'
                  : 'lg:px-8'
              }`}
            >
              <div className="font-display text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-[-0.03em] text-white tabular-nums">
                <span className="text-lumine-gradient">{stat.value}</span>
              </div>
              <div className="mt-2 font-display text-sm sm:text-[15px] font-medium text-[#d5e1fc]/85 tracking-[-0.01em]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
