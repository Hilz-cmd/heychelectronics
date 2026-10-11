/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HorizonBackdrop } from './components/HorizonBackdrop';
import { CompanyMarquee } from './components/CompanyMarquee';
import { ProductsSection } from './components/ProductsSection';
import { LedTickerSection } from './components/LedTickerSection';
import { ServicesSection } from './components/ServicesSection';
import { StatsSection } from './components/StatsSection';
import { ShowcaseSection } from './components/ShowcaseSection';
import { ReviewsSection } from './components/ReviewsSection';
import { AboutSection } from './components/AboutSection';
import { ContactAndFooterSection } from './components/ContactAndFooterSection';

const WHATSAPP_INSTALLATION_URL = `https://wa.me/2347035676769?text=${encodeURIComponent(
  'Hello HEYCH, I would like to request an installation and get a free quote.'
)}`;

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div id="top" className="relative min-h-screen w-full bg-[#030511] text-white select-none">
      {/* Sticky Top Navigation Bar (Strict 3-Zone Contract) */}
      <header
        className={`fixed top-0 inset-x-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-[#030511]/80 backdrop-blur-md border-b border-[#6c8eff]/15 py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="w-full max-w-[1220px] mx-auto px-6 sm:px-10 flex items-center justify-between">
          {/* Zone 1: Company Logo (heych.svg) */}
          <a
            href="#top"
            aria-label="HEYCH Home"
            className="group inline-flex items-center whitespace-nowrap focus:outline-none"
          >
            <img
              src="/heych.svg"
              alt="HEYCH"
              className="h-8 sm:h-9 w-auto object-contain transition-transform duration-150 group-hover:scale-[1.03]"
            />
          </a>

          {/* Zone 2: Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-[13.5px] font-normal text-white/80">
            <a
              href="#products"
              className="hover:text-white transition-colors py-1 whitespace-nowrap"
            >
              Products
            </a>
            <a
              href="#services"
              className="hover:text-white transition-colors py-1 whitespace-nowrap"
            >
              Services
            </a>
            <a
              href="#showcase"
              className="hover:text-white transition-colors py-1 whitespace-nowrap"
            >
              Showcase
            </a>
            <a
              href="#reviews"
              className="hover:text-white transition-colors py-1 whitespace-nowrap"
            >
              Reviews
            </a>
            <a
              href="#about"
              className="hover:text-white transition-colors py-1 whitespace-nowrap"
            >
              About Us
            </a>
            <a
              href="#contact"
              className="hover:text-white transition-colors py-1 whitespace-nowrap"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: Single Primary Action ("Get Our Free Quote" -> WhatsApp +2347035676769) */}
          <div className="flex items-center">
            <a
              href={WHATSAPP_INSTALLATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-[10px] bg-white text-[#060914] text-[13.5px] font-medium tracking-[-0.01em] shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:bg-[#f2f6ff] hover:shadow-[0_0_25px_rgba(180,205,255,0.4)] transition-all duration-150 cursor-pointer whitespace-nowrap no-underline"
            >
              Get Our Free Quote
            </a>
          </div>
        </div>
      </header>

      {/* 100vh Hero Section */}
      <section className="relative h-screen max-h-screen w-full overflow-hidden flex flex-col justify-center">
        {/* Background Cosmic Horizon Arc, Vertical Light Shafts & Bottom Particles */}
        <HorizonBackdrop />

        {/* Main Hero Centerpiece (Positioned inside the glowing horizon dome within 100vh) */}
        <main className="relative z-20 flex flex-col items-center justify-center pt-[12vh] px-6 text-center overflow-hidden">
          {/* Hero Headline: Reduced further on mobile (text-[26px]), same size on desktop (md:text-[66px]) */}
          <h1 className="font-display text-[26px] sm:text-[42px] md:text-[66px] font-semibold leading-[1.08] tracking-[-0.035em] text-white max-w-4xl select-text">
            <span className="block">
              Power{' '}
              <span className="text-lumine-gradient">Your World.</span>
            </span>
            <span className="block mt-1">
              Light Up{' '}
              <span className="text-lumine-gradient">Your Brand.</span>
            </span>
          </h1>

          {/* Subheadline Description */}
          <p className="mt-[2.8vh] max-w-[540px] text-[13px] sm:text-[15.2px] leading-[1.62] font-normal text-[#cedbf8]/72 tracking-[-0.005em] select-text">
            We design and install solar systems, LED screens, 3D signage, and smart home solutions for homes and businesses. Built to last.
          </p>

          {/* Single Primary CTA Button ("Get Our Free Quote" -> WhatsApp +2347035676769 asking for an installation) */}
          <div className="mt-[4.2vh] flex items-center justify-center shrink-0">
            <a
              href={WHATSAPP_INSTALLATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neone-primary inline-flex items-center justify-center min-w-[172px] h-[46px] px-7 rounded-[11px] text-[14px] font-semibold text-[#070b19] tracking-[-0.01em] cursor-pointer whitespace-nowrap no-underline"
            >
              Get Our Free Quote
            </a>
          </div>
        </main>
      </section>

      {/* Continuous Horizontal Scroll of Companies Directly Under the 100vh Hero */}
      <CompanyMarquee />

      {/* Products Section (1 in a row on mobile, 3 on desktop, 6 products total) */}
      <ProductsSection />

      {/* Single-Row LED Matrix Ticker Scrolling Right-to-Left with 3 Cycling Effects */}
      <LedTickerSection />

      {/* Services Section (List form in mobile, 2 lists in desktop view, 6 cards total) */}
      <ServicesSection />

      {/* Stats Section (4 Stats directly under the Services Section) */}
      <StatsSection />

      {/* Showcase Section (Asymmetric Bento Grid of 6 Past Works with Image, Company Name, Address & Year) */}
      <ShowcaseSection />

      {/* Reviews Section (7 reviews scrolling horizontally continuously, each with review, name, and "Client") */}
      <ReviewsSection />

      {/* Brief About Us Section Directly Under the Reviews Section */}
      <AboutSection />

      {/* Centered Contact Us Section ("Get us in WhatsApp") + Footer with Social Icons & Full-Width LED "HEYCH" */}
      <ContactAndFooterSection />
    </div>
  );
}
