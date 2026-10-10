import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative z-20 w-full bg-[#030511] py-20 sm:py-28 px-4 sm:px-8 border-t border-[#6c8eff]/12 overflow-hidden"
    >
      {/* Subtle Ambient Horizon Glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[680px] h-[240px] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(75, 118, 245, 0.14) 0%, rgba(30, 56, 150, 0.04) 55%, transparent 80%)',
          filter: 'blur(28px)',
        }}
      />

      <div className="relative max-w-[1220px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Label, Heading & Subheading */}
          <div className="lg:col-span-5">
            <p className="text-xs font-medium tracking-[0.04em] text-[#8ba8ff] mb-2.5">
              About Us
            </p>
            <h2
              id="about-heading"
              className="font-display text-2xl sm:text-4xl font-semibold tracking-[-0.025em] text-white leading-[1.15]"
            >
              Innovating <span className="text-lumine-gradient">Better Living</span>
            </h2>
            <p className="mt-4 text-sm sm:text-[15px] leading-[1.65] text-[#c8d6f5]/75">
              Connect directly with us for our expertise in custom LED screen installations, solar inverter installations and smart homes
            </p>
          </div>

          {/* Right Column: Full Writeup */}
          <div className="lg:col-span-7 space-y-4 text-sm sm:text-[15.5px] leading-[1.72] text-[#d5e1fc]/85 font-normal">
            <p>
              HEYCH is a leading provider of innovative energy and display solutions, dedicated to powering homes and businesses with smarter, cleaner, and more visually impactful technology.
            </p>
            <p className="text-[#c8d6f5]/78">
              We specialize in the design, supply, and installation of solar power systems, indoor and outdoor LED screens, LED billboard signage, 3D illuminated signage, and smart home automation. Whether you&apos;re looking to cut energy costs, capture attention with striking digital displays, or transform your space into a fully connected smart environment, we deliver tailored solutions built to last.
            </p>
            <p className="text-[#c8d6f5]/78">
              From consultation and custom design to professional installation and ongoing support, we handle every project with precision and care.
            </p>
            <p className="text-[#c8d6f5]/78">
              At HEYCH, we believe in creating solutions that are efficient, eye-catching, and built for the future. Our mission is simple: to help our clients save more, stand out more, and live smarter.
              <br />
              <span className="text-white font-medium">
                Let&apos;s power your vision — and light up your world.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
