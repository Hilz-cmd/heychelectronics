import React from 'react';

export interface ReviewItem {
  id: string;
  review: string;
  name: string;
  role: string;
}

const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    review:
      'Replacing our legacy outdoor display controllers with the HEYCH Lumine pipeline cut field maintenance dispatches by 70% within the first quarter.',
    name: 'Marcus Vance',
    role: 'Client',
  },
  {
    id: 'rev-2',
    review:
      'The off-grid solar canopy and LiFePO4 reserve bank kept our highway LED billboard array running at full 8,500-nit output through four consecutive storm days.',
    name: 'Elena Rostova',
    role: 'Client',
  },
  {
    id: 'rev-3',
    review:
      'Our 18-meter command center video wall was installed, calibrated, and synced to our telemetry streams in eight days flat with zero dead pixels.',
    name: 'David Chen',
    role: 'Client',
  },
  {
    id: 'rev-4',
    review:
      'Voice scene orchestration via Alexa and the Neone Pulse dial turned a 15-minute manual studio lighting and screen changeover into a single command.',
    name: 'Sora Takahashi',
    role: 'Client',
  },
  {
    id: 'rev-5',
    review:
      'The smoked-glass atrium screens blend seamlessly into our stone facade by day and deliver breathtaking cobalt contrast across the plaza at night.',
    name: 'Liam O’Connor',
    role: 'Client',
  },
  {
    id: 'rev-6',
    review:
      'Sub-3-millisecond multi-node synchronization across all six transit pavilions eliminated visual tearing and made real-time arrival updates effortless.',
    name: 'Amara Okafor',
    role: 'Client',
  },
  {
    id: 'rev-7',
    review:
      'From initial structural load engineering to final color-space calibration, the entire deployment was the cleanest hardware rollout we have ever experienced.',
    name: 'Henrik Lindqvist',
    role: 'Client',
  },
];

export const ReviewsSection: React.FC = () => {
  // Duplicate the 7 reviews for a seamless -50% infinite horizontal scroll
  const scrollingReviews = [...REVIEWS, ...REVIEWS];

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="relative z-20 w-full bg-[#030511] py-20 sm:py-28 border-t border-[#6c8eff]/12 overflow-hidden"
    >
      {/* Subtle Ambient Cobalt Glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[300px] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(72, 115, 245, 0.10) 0%, rgba(28, 52, 140, 0.03) 55%, transparent 80%)',
          filter: 'blur(36px)',
        }}
      />

      <div className="relative max-w-[1220px] mx-auto px-4 sm:px-8 mb-12 sm:mb-14">
        <p className="text-xs font-medium tracking-[0.04em] text-[#8ba8ff] mb-2.5">
          Client Feedback
        </p>
        <h2
          id="reviews-heading"
          className="font-display text-2xl sm:text-4xl font-semibold tracking-[-0.025em] text-white"
        >
          What Our <span className="text-lumine-gradient">Clients Say</span>
        </h2>
      </div>

      {/* Continuous Horizontal Scrolling Reviews Row */}
      <div className="relative w-full overflow-hidden marquee-fade-mask py-2">
        <div className="animate-reviews-marquee items-stretch">
          {scrollingReviews.map((item, idx) => (
            <article
              key={`${item.id}-${idx}`}
              className="w-[310px] sm:w-[370px] mx-3 sm:mx-4 p-6 sm:p-7 rounded-2xl bg-[#070b1e]/90 border border-[#6c8eff]/18 hover:border-[#8ba8ff]/45 transition-colors duration-200 flex flex-col justify-between shrink-0 shadow-[0_10px_30px_rgba(0,0,0,0.45)] select-text"
            >
              {/* 1. Review Text */}
              <p className="text-xs sm:text-[13.5px] leading-[1.68] text-[#d5e1fc]/85 font-normal">
                “{item.review}”
              </p>

              {/* 2. Name & 3. Who the person is ("Client") */}
              <div className="mt-6 pt-4 border-t border-white/[0.07]">
                <div className="font-display text-sm font-semibold text-white tracking-[-0.01em]">
                  {item.name}
                </div>
                <div className="text-xs text-[#8ba8ff]/80 mt-0.5">
                  {item.role}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
