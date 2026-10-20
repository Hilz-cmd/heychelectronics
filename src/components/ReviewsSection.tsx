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
      'After HEYCH installed our solar power system, we saw a massive drop in our electricity bills. The transition was seamless, and the team handled everything from consultation to installation with total precision.',
    name: 'Emeka Nwosu',
    role: 'Client',
  },
  {
    id: 'rev-2',
    review:
      'We wanted our storefront to stand out, and the 3D illuminated signage HEYCH designed did exactly that. It’s eye-catching, modern, and we’ve had countless customers comment on how great the building looks at night. Their design team really knows how to capture attention.',
    name: 'Fatima Al-Hassan',
    role: 'Client',
  },
  {
    id: 'rev-3',
    review:
      'I didn’t know where to start with smart home tech, but HEYCH made it easy. They integrated our lighting, and security into one simple system. It’s incredibly efficient and has genuinely made our home feel futuristic and easier to live in.',
    name: 'Tunde Bakare',
    role: 'Client',
  },
  {
    id: 'rev-4',
    review:
      'What impressed me most was the ongoing support. From the initial custom design to the professional installation, the team was responsive and careful. It’s rare to find a company that actually delivers on its promise.',
    name: 'Chidinma Eze',
    role: 'Client',
  },
  {
    id: 'rev-5',
    review:
      'The indoor LED screens HEYCH supplied for our office lobby are stunning. The colors are vibrant and the build quality is clearly built to last. They delivered a tailored solution that fit our budget and exceeded our expectations.',
    name: 'Kolawole Adeleke',
    role: 'Client',
  },
  {
    id: 'rev-6',
    review:
      'HEYCH helped us save more and stand out more. Their LED screen is eye-catching, and reliable. I highly recommend them to any business looking to upgrade their display.',
    name: 'Ngozi Okoro',
    role: 'Client',
  },
];

export const ReviewsSection: React.FC = () => {
  // Duplicate the 6 reviews twice for a seamless -50% infinite horizontal scroll
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
              className="w-[310px] sm:w-[380px] mx-3 sm:mx-4 p-6 sm:p-7 rounded-2xl bg-[#070b1e]/90 border border-[#6c8eff]/18 hover:border-[#8ba8ff]/45 transition-colors duration-200 flex flex-col justify-between shrink-0 shadow-[0_10px_30px_rgba(0,0,0,0.45)] select-text"
            >
              {/* 1. Review Text */}
              <p className="text-xs sm:text-[13.8px] leading-[1.72] text-[#d5e1fc]/85 font-normal">
                “{item.review}”
              </p>

              {/* 2. Name & 3. Who the person is ("Client") */}
              <div className="mt-6 pt-4 border-t border-white/[0.07] flex items-center justify-between">
                <div>
                  <div className="font-display text-sm font-semibold text-white tracking-[-0.01em]">
                    {item.name}
                  </div>
                  <div className="text-xs text-[#8ba8ff]/80 mt-0.5">
                    {item.role}
                  </div>
                </div>
                <div className="flex items-center text-amber-400 text-xs tracking-wider" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
