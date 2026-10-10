import React, { useState } from 'react';

interface CompanyItem {
  name: string;
  outcome: string;
  logo: React.ReactNode;
}

const COMPANIES: CompanyItem[] = [
  {
    name: 'VERCOR',
    outcome: 'Cut pipeline deployment latency by 64% across 140 microservices',
    logo: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <path
          d="M12 3L21 19H3L12 3Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M12 10L16 17H8L12 10Z" fill="currentColor" fillOpacity="0.45" />
      </svg>
    ),
  },
  {
    name: 'Linearity',
    outcome: 'Automated 1.8M daily telemetry events into structured DAGs',
    logo: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M6.5 17.5L17.5 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M9.5 19.5L19.5 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.6" />
      </svg>
    ),
  },
  {
    name: 'CHRONOS',
    outcome: 'Reduced incident root-cause isolation from 42m to 19s',
    logo: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 7.5V12L15 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Kinetix',
    outcome: '3.4x faster feature shipping velocity across 18 product squads',
    logo: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <path
          d="M4 12L12 4L20 12L12 20L4 12Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'AetherLabs',
    outcome: 'Unified 12 legacy data orchestrators into one Lumine graph',
    logo: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <path
          d="M12 2.5C14.8 7.8 16.2 12.2 21.5 12C16.2 11.8 14.8 16.2 12 21.5C9.2 16.2 7.8 11.8 2.5 12C7.8 12.2 9.2 7.8 12 2.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: 'RAYDIANT',
    outcome: 'Zero-config schema inference for 900+ real-time stream nodes',
    logo: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.8" />
        <path
          d="M12 3V6M12 18V21M3 12H6M18 12H21M5.6 5.6L7.8 7.8M16.2 16.2L18.4 18.4M18.4 5.6L16.2 7.8M7.8 16.2L5.6 18.4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: 'ScaleGrid',
    outcome: 'Saved 1,200+ engineering hours per quarter on workflow ops',
    logo: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" fill="currentColor" fillOpacity="0.45" stroke="currentColor" strokeWidth="1.8" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    name: 'HYPERION',
    outcome: '99.998% automated workflow reliability across global regions',
    logo: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <path
          d="M6 4V20M18 4V20M6 12H18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      </svg>
    ),
  },
];

export const CompanyMarquee: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState<CompanyItem | null>(null);

  // Duplicate list twice for seamless -50% infinite loop
  const marqueeItems = [...COMPANIES, ...COMPANIES];

  return (
    <section
      aria-label="Trusted companies"
      className="relative z-20 w-full bg-[#030511] border-t border-[#6c8eff]/12 py-12 sm:py-16 overflow-hidden"
    >
      {/* Subtle top-center ambient horizon continuation glow */}
      <div
        className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 w-[540px] h-24 rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(85, 130, 255, 0.20) 0%, rgba(40, 70, 180, 0.05) 60%, transparent 100%)',
          filter: 'blur(14px)',
        }}
      />

      <div className="max-w-[1220px] mx-auto px-6">
        {/* Quiet editorial label */}
        <p className="text-center text-[12.5px] font-medium tracking-[0.02em] text-[#b4c6f0]/50 mb-8">
          Trusted by engineering teams shipping complex workflows at scale
        </p>

        {/* Continuous Horizontal Marquee Container */}
        <div className="relative w-full overflow-hidden marquee-fade-mask py-2">
          <div className="animate-neone-marquee items-center">
            {marqueeItems.map((company, index) => {
              const isSelected = selectedCompany?.name === company.name;
              return (
                <button
                  key={`${company.name}-${index}`}
                  type="button"
                  onClick={() =>
                    setSelectedCompany((prev) =>
                      prev?.name === company.name ? null : company
                    )
                  }
                  className={`group mx-7 sm:mx-10 inline-flex items-center gap-2.5 py-2 px-3 rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'text-white bg-[#6d8cf8]/15 border border-[#8ba8ff]/35 shadow-[0_0_20px_rgba(105,142,255,0.22)]'
                      : 'text-[#b8caf5]/45 hover:text-white/95 border border-transparent'
                  }`}
                >
                  <span className="text-[#8ba8ff]/70 group-hover:text-[#a8c1ff] transition-colors">
                    {company.logo}
                  </span>
                  <span className="font-display text-[16px] sm:text-[17px] font-semibold tracking-[-0.01em]">
                    {company.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Proof Readout when a company logo is clicked */}
        {selectedCompany && (
          <div className="mt-6 flex items-center justify-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-[#0a1028]/90 border border-[#7c9aff]/25 text-xs text-[#d8e3ff]">
              <span className="font-semibold text-white">{selectedCompany.name}</span>
              <span aria-hidden="true" className="text-white/30">
                ·
              </span>
              <span className="text-[#c8d6f5]/85 tabular-nums">{selectedCompany.outcome}</span>
              <button
                type="button"
                onClick={() => setSelectedCompany(null)}
                className="ml-2 text-white/40 hover:text-white text-[11px] cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
