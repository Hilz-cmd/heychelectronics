import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

const LATITUDE = 6.6045292;
const LONGITUDE = 3.3100346;
const PLACE_NAME = 'Heych Electronics';
const ADDRESS = '11 ShaSha-Akowonjo road, Akowojo, Lagos State. Nigeria 420108';

const EMBED_MAP_URL = `https://maps.google.com/maps?q=${LATITUDE},${LONGITUDE}+(${encodeURIComponent(
  PLACE_NAME
)})&hl=en&z=16&output=embed`;

const DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${LATITUDE},${LONGITUDE}`;

export const MapSection: React.FC = () => {
  return (
    <section
      aria-labelledby="location-map-heading"
      className="relative z-20 w-full bg-[#030511] py-16 sm:py-24 px-4 sm:px-8 border-t border-[#6c8eff]/12 overflow-hidden"
    >
      {/* Subtle Ambient Cobalt Glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[280px] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(72, 115, 245, 0.11) 0%, rgba(28, 52, 140, 0.04) 55%, transparent 80%)',
          filter: 'blur(36px)',
        }}
      />

      <div className="relative max-w-[1220px] mx-auto">
        {/* Compact Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-medium tracking-[0.04em] text-[#8ba8ff] mb-2">
              Our Location
            </p>
            <h2
              id="location-map-heading"
              className="font-display text-2xl sm:text-3xl font-semibold tracking-[-0.025em] text-white"
            >
              {PLACE_NAME}
            </h2>
            <p className="mt-1.5 flex items-center gap-1.5 text-xs sm:text-sm text-[#c8d6f5]/78">
              <MapPin className="w-3.5 h-3.5 text-[#8ba8ff] shrink-0" />
              <span>{ADDRESS}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <span className="font-mono text-xs text-[#9cb5ff]/75 tabular-nums bg-[#070b1e] border border-[#6c8eff]/20 px-3 py-1.5 rounded-lg">
              {LATITUDE}, {LONGITUDE}
            </span>
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#6d8cf8]/20 hover:bg-[#6d8cf8]/30 border border-[#8ba8ff]/40 text-xs font-medium text-white transition-colors no-underline whitespace-nowrap"
            >
              <Navigation className="w-3.5 h-3.5 text-[#9cb5ff]" />
              <span>Open in Maps</span>
            </a>
          </div>
        </div>

        {/* Simple Map Frame */}
        <div className="relative w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden bg-[#070b1e] border border-[#6c8eff]/22 shadow-[0_14px_40px_rgba(0,0,0,0.55)]">
          <iframe
            title={`${PLACE_NAME} Location Map`}
            src={EMBED_MAP_URL}
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </section>
  );
};
