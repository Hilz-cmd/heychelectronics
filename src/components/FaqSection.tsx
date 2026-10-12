import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export type FaqCategory =
  | 'General'
  | 'Solar'
  | 'LED Screens & Billboards'
  | '3D Illuminated Signage'
  | 'Smart Homes';

export interface FaqItem {
  number: number;
  category: FaqCategory;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  // General (1 - 4)
  {
    number: 1,
    category: 'General',
    question: 'What services do you offer?',
    answer:
      'We provide solar power installations, indoor and outdoor LED screens, LED billboard signage, 3D illuminated signage, and smart home automation — all under one roof.',
  },
  {
    number: 2,
    category: 'General',
    question: 'Do you handle both residential and commercial projects?',
    answer: 'Yes. We work with homeowners, businesses, and organizations of all sizes.',
  },
  {
    number: 3,
    category: 'General',
    question: 'How long does a typical project take?',
    answer:
      'Timelines vary by project size and type. Most installations are completed within 4 - 8 days after design approval.',
  },
  {
    number: 4,
    category: 'General',
    question: 'Do you offer warranties or after-sales support?',
    answer: 'Yes. All our installations come with 1 year warranty and ongoing support.',
  },

  // Solar (5 - 8)
  {
    number: 5,
    category: 'Solar',
    question: 'How much can I save by switching to solar?',
    answer:
      'Savings depend on your energy usage, location, and system size. Most clients see a reduction of 60–70% on their monthly power costs.',
  },
  {
    number: 6,
    category: 'Solar',
    question: 'How long does a solar installation take?',
    answer:
      'Most residential installations are completed in a day. Commercial systems may take longer depending on scale.',
  },
  {
    number: 7,
    category: 'Solar',
    question: 'Do solar panels work during cloudy weather or power outages?',
    answer:
      'Yes, panels still generate power in cloudy conditions at reduced output. With a battery backup system, you can keep the lights on during outages.',
  },
  {
    number: 8,
    category: 'Solar',
    question: 'What maintenance do solar systems need?',
    answer:
      'Very little. Occasional cleaning and an annual check-up are usually enough. We offer maintenance plans.',
  },

  // LED Screens & Billboards (9 - 13)
  {
    number: 9,
    category: 'LED Screens & Billboards',
    question: "What's the difference between indoor and outdoor LED screens?",
    answer:
      'Indoor screens are built for closer viewing and lower brightness. Outdoor screens are weatherproof and much brighter to stay visible in sunlight.',
  },
  {
    number: 10,
    category: 'LED Screens & Billboards',
    question: 'Can I display video, images, and live content on my LED screen?',
    answer:
      'Yes. Our screens support video, images, text, and live feeds, and can be updated remotely.',
  },
  {
    number: 11,
    category: 'LED Screens & Billboards',
    question: 'How long do LED screens last?',
    answer: 'Most LED panels last 2-4 years before needing replacement.',
  },
  {
    number: 12,
    category: 'LED Screens & Billboards',
    question: 'Do you handle installation and setup?',
    answer:
      'Yes. We handle everything from design and supply to installation, setup, and training.',
  },
  {
    number: 13,
    category: 'LED Screens & Billboards',
    question: 'Can the screen be controlled remotely?',
    answer:
      'Yes. Most of our systems allow remote content management from a phone, tablet, or computer.',
  },

  // 3D Illuminated Signage (14 - 17)
  {
    number: 14,
    category: '3D Illuminated Signage',
    question: 'What is 3D illuminated signage?',
    answer:
      "It's custom signage with depth and lighting — often used for storefronts, logos, and building facades — designed to stand out day and night.",
  },
  {
    number: 15,
    category: '3D Illuminated Signage',
    question: 'Can you design a sign that matches my brand?',
    answer:
      'Yes. We work with your logo, colors, and brand guidelines to create a custom sign.',
  },
  {
    number: 16,
    category: '3D Illuminated Signage',
    question: 'Are your signs weatherproof?',
    answer:
      'Yes. All outdoor signage is built with weather-resistant materials and rated for outdoor use.',
  },
  {
    number: 17,
    category: '3D Illuminated Signage',
    question: 'How long does it take to design and install a sign?',
    answer:
      'Typically, 5-10 days from concept to installation, depending on complexity.',
  },

  // Smart Homes (18 - 20)
  {
    number: 18,
    category: 'Smart Homes',
    question: 'What can a smart home system control?',
    answer:
      'Lighting, security cameras, door locks, thermostats, entertainment systems, curtains, and more — all from one app or voice command.',
  },
  {
    number: 19,
    category: 'Smart Homes',
    question: 'Can I add smart features to my existing home?',
    answer:
      'Yes. Most smart home systems can be installed in existing homes without major renovations.',
  },
  {
    number: 20,
    category: 'Smart Homes',
    question: 'Can I control everything from my phone?',
    answer:
      'Yes. You can control your smart home from a smartphone app, and often with voice assistants like Alexa (which we install).',
  },
];

const CATEGORIES: ('All' | FaqCategory)[] = [
  'All',
  'General',
  'Solar',
  'LED Screens & Billboards',
  '3D Illuminated Signage',
  'Smart Homes',
];

const CATEGORY_GROUPS: FaqCategory[] = [
  'General',
  'Solar',
  'LED Screens & Billboards',
  '3D Illuminated Signage',
  'Smart Homes',
];

export const FaqSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | FaqCategory>('All');
  const [openNumbers, setOpenNumbers] = useState<Record<number, boolean>>({
    1: true,
    5: true,
    9: true,
    14: true,
    18: true,
  });

  const toggleItem = (num: number) => {
    setOpenNumbers((prev) => ({
      ...prev,
      [num]: !prev[num],
    }));
  };

  const visibleGroups =
    activeCategory === 'All' ? CATEGORY_GROUPS : [activeCategory];

  return (
    <section
      id="faqs"
      aria-labelledby="faqs-heading"
      className="relative z-20 w-full bg-[#030511] py-20 sm:py-28 px-4 sm:px-8 border-t border-[#6c8eff]/12 overflow-hidden"
    >
      {/* Subtle Ambient Cobalt Glow */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[420px] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(68, 112, 242, 0.11) 0%, rgba(25, 48, 135, 0.04) 55%, transparent 80%)',
          filter: 'blur(42px)',
        }}
      />

      <div className="relative max-w-[1020px] mx-auto">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12">
          <p className="text-xs font-medium tracking-[0.04em] text-[#8ba8ff] mb-2.5">
            FAQs
          </p>
          <h2
            id="faqs-heading"
            className="font-display text-2xl sm:text-4xl font-semibold tracking-[-0.025em] text-white"
          >
            Frequently Asked <span className="text-lumine-gradient">Questions</span>
          </h2>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#6d8cf8]/25 text-white border border-[#8ba8ff]/45 shadow-[0_0_20px_rgba(105,142,255,0.18)]'
                    : 'bg-[#070b1e]/80 text-[#b4c6f0]/65 hover:text-white border border-[#6c8eff]/15 hover:border-[#8ba8ff]/35'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Grouped FAQ Lists */}
        <div className="space-y-10">
          {visibleGroups.map((groupName) => {
            const groupItems = FAQ_ITEMS.filter((item) => item.category === groupName);

            return (
              <div key={groupName} className="space-y-3.5">
                {groupName !== 'General' && (
                  <h3 className="font-display text-base sm:text-lg font-semibold text-[#9cb5ff] tracking-[-0.01em] pt-2 pb-1">
                    {groupName}
                  </h3>
                )}

                <div className="space-y-3">
                  {groupItems.map((faq) => {
                    const isOpen = !!openNumbers[faq.number];
                    return (
                      <div
                        key={faq.number}
                        className={`rounded-2xl transition-all duration-200 border ${
                          isOpen
                            ? 'bg-[#080e24]/95 border-[#8ba8ff]/40 shadow-[0_10px_30px_rgba(0,0,0,0.45)]'
                            : 'bg-[#070b1e]/80 border-[#6c8eff]/16 hover:border-[#8ba8ff]/35'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => toggleItem(faq.number)}
                          aria-expanded={isOpen}
                          className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                        >
                          <span className="flex items-baseline gap-3 min-w-0">
                            <span className="font-mono text-xs sm:text-sm font-medium text-[#8ba8ff] tabular-nums shrink-0">
                              {faq.number}.
                            </span>
                            <span className="font-display text-sm sm:text-base font-semibold text-white tracking-[-0.01em]">
                              {faq.question}
                            </span>
                          </span>

                          <ChevronDown
                            className={`w-4 h-4 text-[#8ba8ff] shrink-0 transition-transform duration-200 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        {isOpen && (
                          <div className="px-5 sm:px-6 pb-5 pt-0 pl-11 sm:pl-13 text-xs sm:text-[14.5px] leading-[1.68] text-[#c8d6f5]/82 select-text">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
