import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'led-billboard-installation',
    index: '01',
    title: 'LED billboard installation',
  },
  {
    id: 'solar-inverter-installation',
    index: '02',
    title: 'Solar inverter installation',
  },
  {
    id: 'smart-glass-tint-installation',
    index: '03',
    title: 'Smart glass tint installation',
  },
  {
    id: 'solar-lightbox-installation',
    index: '04',
    title: 'Solar lightbox installation',
  },
  {
    id: 'electronic-car-tint-installation',
    index: '05',
    title: 'Electronic car tint installation',
  },
  {
    id: '3d-illuminated-signages-installation',
    index: '06',
    title: '3d illuminated signages installation',
  },
];

const getServiceWhatsAppUrl = (serviceTitle: string) =>
  `https://wa.me/2347035676769?text=${encodeURIComponent(
    `Hello HEYCH, I would like to book your ${serviceTitle} service.`
  )}`;

export const ServicesSection: React.FC = () => {
  // Split the 6 services into 2 lists of 3 for desktop view (single list in mobile)
  const leftList = SERVICES.slice(0, 3);
  const rightList = SERVICES.slice(3, 6);

  const renderServiceListItem = (service: ServiceItem) => (
    <li
      key={service.id}
      className="group relative flex items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-[#070b1e]/90 border border-[#6c8eff]/18 hover:border-[#8ba8ff]/45 transition-all duration-200 shadow-[0_8px_28px_rgba(0,0,0,0.4)]"
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <span className="font-mono text-xs sm:text-sm font-medium text-[#8ba8ff] tabular-nums shrink-0">
          {service.index}.
        </span>
        <h3 className="font-display text-base sm:text-lg font-semibold text-white tracking-[-0.01em] group-hover:text-[#b8ceff] transition-colors">
          {service.title}
        </h3>
      </div>

      <a
        href={getServiceWhatsAppUrl(service.title)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-neone-primary inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-[#070b19] cursor-pointer whitespace-nowrap shrink-0 no-underline"
      >
        <span>Book Us</span>
        <ArrowUpRight className="w-3.5 h-3.5" />
      </a>
    </li>
  );

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative z-20 w-full bg-[#030511] py-20 sm:py-28 px-4 sm:px-8 border-t border-[#6c8eff]/12"
    >
      {/* Subtle Ambient Cobalt Glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[380px] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(72, 115, 245, 0.11) 0%, rgba(28, 52, 140, 0.04) 55%, transparent 80%)',
          filter: 'blur(36px)',
        }}
      />

      <div className="relative max-w-[1220px] mx-auto">
        {/* Section Heading */}
        <div className="mb-12 sm:mb-14">
          <p className="text-xs font-medium tracking-[0.04em] text-[#8ba8ff] mb-2.5">
            Our Services
          </p>
          <h2
            id="services-heading"
            className="font-display text-2xl sm:text-4xl font-semibold tracking-[-0.025em] text-white"
          >
            Installations, <span className="text-lumine-gradient">Built to Last</span>
          </h2>
        </div>

        {/* 1 List on Mobile (grid-cols-1), 2 Lists Side-by-Side on Desktop (lg:grid-cols-2) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Desktop List 1 (Items 01 - 03) */}
          <ul className="flex flex-col gap-4 sm:gap-5 list-none p-0 m-0">
            {leftList.map(renderServiceListItem)}
          </ul>

          {/* Desktop List 2 (Items 04 - 06) */}
          <ul className="flex flex-col gap-4 sm:gap-5 list-none p-0 m-0">
            {rightList.map(renderServiceListItem)}
          </ul>
        </div>
      </div>
    </section>
  );
};
