import React from 'react';

interface ClientLogo {
  id: string;
  name: string;
  src: string;
  alt: string;
  extraClasses?: string;
}

const CLIENT_LOGOS: ClientLogo[] = [
  {
    id: 'stan-sat',
    name: 'STAN SAT',
    src: '/assets/aistudio/stan-removebg-preview_4153f8f8.svg',
    alt: 'STAN SAT Electronics & Furniture',
    extraClasses: 'brightness-125 contrast-125 invert',
  },
  {
    id: 'urban-lagos',
    name: 'URBAN LAGOS',
    src: '/assets/aistudio/vvv_8e860a93.svg',
    alt: 'URBAN LAGOS',
    extraClasses: '',
  },
  {
    id: 'ibiza',
    name: 'ibiza',
    src: '/assets/aistudio/ibiza_a0b3be06.svg',
    alt: 'ibiza',
    extraClasses: '',
  },
  {
    id: 'krush-awka',
    name: 'KRUSH AWKA',
    src: '/assets/aistudio/krush_44de355d.svg',
    alt: 'KRUSH AWKA',
    extraClasses: '',
  },
];

export const CompanyMarquee: React.FC = () => {
  // Repeat the 4 logos 4 times for seamless continuous horizontal infinite scrolling
  const marqueeItems = [
    ...CLIENT_LOGOS,
    ...CLIENT_LOGOS,
    ...CLIENT_LOGOS,
    ...CLIENT_LOGOS,
  ];

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
        {/* Editorial label */}
        <p className="text-center text-[12.5px] font-medium tracking-[0.02em] text-[#b4c6f0]/60 mb-8">
          Worked with many prestigious companies across Nigeria
        </p>

        {/* Continuous Horizontal Marquee Container */}
        <div className="relative w-full overflow-hidden marquee-fade-mask py-3">
          <div className="animate-neone-marquee items-center">
            {marqueeItems.map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className="group mx-8 sm:mx-12 inline-flex items-center justify-center p-2 rounded-xl transition-all duration-200 shrink-0"
              >
                <div className="h-12 sm:h-14 flex items-center justify-center px-4 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] group-hover:border-[#8ba8ff]/35 group-hover:bg-white/[0.08] transition-all">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className={`h-8 sm:h-10 w-auto max-w-[160px] sm:max-w-[190px] object-contain opacity-85 group-hover:opacity-100 transition-opacity ${logo.extraClasses}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
