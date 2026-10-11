import React, { useState } from 'react';
import { ArrowUpRight, Cpu } from 'lucide-react';

export interface Product {
  id: string;
  title: string;
  image: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'alexa',
    title: 'Alexa',
    image: '/src/assets/images/product_alexa_smart_hub_1791758773891.jpg',
  },
  {
    id: 'solar-lamp-lightbox',
    title: 'Solar lamp lightbox',
    image: '/src/assets/images/product_solar_lamp_lightbox_1791758782963.jpg',
  },
  {
    id: 'car-lightbox',
    title: 'Car lightbox',
    image: '/src/assets/images/product_car_roof_lightbox_1791758792674.jpg',
  },
  {
    id: '3d-illuminated-signages',
    title: '3d Illuminated signages',
    image: '/src/assets/images/product_3d_illuminated_signage_1791758802830.jpg',
  },
  {
    id: 'led-billboard-screens',
    title: 'LED billboard screens',
    image: '/src/assets/images/product_led_billboard_screen_1791758813032.jpg',
  },
  {
    id: 'electronic-car-tints',
    title: 'Electronic car tints',
    image: '/src/assets/images/product_electronic_car_tint_1791758822785.jpg',
  },
];

const getProductWhatsAppUrl = (productTitle: string) =>
  `https://wa.me/2347035676769?text=${encodeURIComponent(
    `Hello HEYCH, I would like to get the ${productTitle}.`
  )}`;

export const ProductsSection: React.FC = () => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="relative z-20 w-full bg-[#030511] py-20 sm:py-28 px-4 sm:px-8 border-t border-[#6c8eff]/10"
    >
      {/* Ambient background glow behind product grid */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[420px] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(65, 108, 235, 0.12) 0%, rgba(25, 45, 120, 0.04) 55%, transparent 80%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative max-w-[1220px] mx-auto">
        {/* Section Header */}
        <div className="mb-12 sm:mb-14">
          <p className="text-xs font-medium tracking-[0.04em] text-[#8ba8ff] mb-2.5">
            What we sell
          </p>
          <h2
            id="products-heading"
            className="font-display text-2xl sm:text-4xl font-semibold tracking-[-0.025em] text-white"
          >
            Quality Products <span className="text-lumine-gradient">Made for You</span>
          </h2>
        </div>

        {/* Product Grid: 1 column in mobile view (grid-cols-1), 3 for desktop (lg:grid-cols-3), 6 products total */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {PRODUCTS.map((product) => {
            const hasImgError = imageErrors[product.id];

            return (
              <a
                key={product.id}
                href={getProductWhatsAppUrl(product.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col rounded-2xl bg-[#070b1e]/90 border border-[#6c8eff]/18 hover:border-[#8ba8ff]/45 transition-all duration-200 overflow-hidden cursor-pointer hover:-translate-y-0.5 shadow-[0_10px_30px_rgba(0,0,0,0.45)] no-underline"
              >
                {/* Product Image Container (4:3 aspect ratio) */}
                <div className="relative w-full aspect-[4/3] bg-[#050816] overflow-hidden border-b border-[#6c8eff]/12">
                  {!hasImgError ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setImageErrors((prev) => ({ ...prev, [product.id]: true }))
                      }
                      className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-300 ease-out"
                    />
                  ) : (
                    /* Resilient Fallback Container */
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#0d1536] to-[#050816] text-[#8ba8ff]">
                      <Cpu className="w-8 h-8 mb-2 opacity-80" />
                      <span className="text-xs font-medium text-white/80 text-center">
                        {product.title}
                      </span>
                    </div>
                  )}

                  {/* Subtle bottom vignette for seamless transition into card body */}
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-12"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(7, 11, 30, 0.75) 0%, transparent 100%)',
                    }}
                  />
                </div>

                {/* Product Card Body: Title and "Get" Button (No prices or descriptions) */}
                <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
                  <h3 className="font-display text-base sm:text-[17px] font-semibold text-white tracking-[-0.01em] group-hover:text-[#b8ceff] transition-colors">
                    {product.title}
                  </h3>

                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white/[0.08] group-hover:bg-[#6d8cf8]/25 text-white group-hover:text-[#d8e3ff] border border-white/10 group-hover:border-[#8ba8ff]/50 transition-all duration-150 whitespace-nowrap shrink-0">
                    <span>Get</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#9cb5ff]" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
