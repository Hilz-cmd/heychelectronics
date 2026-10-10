/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HorizonBackdrop } from './components/HorizonBackdrop';
import { InteractiveModals, ModalType } from './components/InteractiveModals';
import { CompanyMarquee } from './components/CompanyMarquee';
import { ProductsSection } from './components/ProductsSection';
import { LedTickerSection } from './components/LedTickerSection';
import { ServicesSection } from './components/ServicesSection';
import { StatsSection } from './components/StatsSection';
import { ShowcaseSection } from './components/ShowcaseSection';
import { ReviewsSection } from './components/ReviewsSection';
import { AboutSection } from './components/AboutSection';
import { ContactAndFooterSection } from './components/ContactAndFooterSection';

export default function App() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
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
          {/* Zone 1: Brand Wordmark with signature 4-point star icon */}
          <a
            href="#top"
            className="group inline-flex items-center gap-2.5 text-[15px] font-bold tracking-[0.06em] text-white whitespace-nowrap focus:outline-none"
          >
            <span className="relative flex items-center justify-center w-6 h-6">
              <span
                className="absolute inset-0 rounded-full opacity-80 group-hover:opacity-100 transition-opacity"
                style={{
                  background:
                    'radial-gradient(circle, rgba(130, 160, 255, 0.55) 0%, transparent 72%)',
                  filter: 'blur(4px)',
                }}
              />
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10"
              >
                <defs>
                  <linearGradient
                    id="neoneStarGrad"
                    x1="2"
                    y1="2"
                    x2="22"
                    y2="22"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#e0eaff" />
                    <stop offset="50%" stopColor="#92adff" />
                    <stop offset="100%" stopColor="#5e7bf2" />
                  </linearGradient>
                </defs>
                <path
                  d="M11 2C11 7.2 14.8 11 20 11C14.8 11 11 14.8 11 20C11 14.8 7.2 11 2 11C7.2 11 11 7.2 11 2Z"
                  fill="url(#neoneStarGrad)"
                />
                <path
                  d="M18.5 13.5C18.5 15.6 20.1 17.2 22.2 17.2C20.1 17.2 18.5 18.8 18.5 20.9C18.5 18.8 16.9 17.2 14.8 17.2C16.9 17.2 18.5 15.6 18.5 13.5Z"
                  fill="#b8ccff"
                  fillOpacity="0.9"
                />
              </svg>
            </span>
            <span>HEYCH</span>
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

          {/* Zone 3: Single Primary Action ("Get Our Free Quote") */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setActiveModal('get-started')}
              className="px-4 py-2 rounded-[10px] bg-white text-[#060914] text-[13.5px] font-medium tracking-[-0.01em] shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:bg-[#f2f6ff] hover:shadow-[0_0_25px_rgba(180,205,255,0.4)] transition-all duration-150 cursor-pointer whitespace-nowrap"
            >
              Get Our Free Quote
            </button>
          </div>
        </div>
      </header>

      {/* 100vh Hero Section */}
      <section className="relative h-screen max-h-screen w-full overflow-hidden flex flex-col justify-center">
        {/* Background Cosmic Horizon Arc, Vertical Light Shafts & Bottom Particles */}
        <HorizonBackdrop />

        {/* Main Hero Centerpiece (Positioned inside the glowing horizon dome within 100vh) */}
        <main className="relative z-20 flex flex-col items-center justify-center pt-[12vh] px-6 text-center overflow-hidden">
          {/* Hero Headline */}
          <h1 className="font-display text-[clamp(2.5rem,7.5vh,4.25rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-white max-w-3xl select-text">
            <span className="block">
              Build Faster{' '}
              <span className="text-lumine-gradient">With</span>
            </span>
            <span className="block mt-0.5">
              Lumine{' '}
              <span className="text-lumine-gradient">Insights</span>
            </span>
          </h1>

          {/* Subheadline Description */}
          <p className="mt-[2.8vh] max-w-[510px] text-[clamp(13.5px,1.85vh,15.2px)] leading-[1.62] font-normal text-[#cedbf8]/72 tracking-[-0.005em] select-text">
            A minimal AI-powered system that transforms complex workflows
            <br className="hidden sm:inline" /> into clear, glowing, effortless structures — helping you ship ideas
            <br className="hidden sm:inline" /> faster.
          </p>

          {/* Single Primary CTA Button ("Get Our Free Quote") */}
          <div className="mt-[4.2vh] flex items-center justify-center shrink-0">
            <button
              type="button"
              onClick={() => setActiveModal('get-started')}
              className="btn-neone-primary min-w-[172px] h-[46px] px-7 rounded-[11px] text-[14px] font-semibold text-[#070b19] tracking-[-0.01em] cursor-pointer whitespace-nowrap"
            >
              Get Our Free Quote
            </button>
          </div>
        </main>
      </section>

      {/* Continuous Horizontal Scroll of Companies Directly Under the 100vh Hero */}
      <CompanyMarquee />

      {/* Products Section (2 in a row for mobile, 3 for desktop, 6 products total) */}
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

      {/* Interactive Modal for "Get Our Free Quote" */}
      <InteractiveModals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
        onSwitchModal={(modal) => setActiveModal(modal)}
      />
    </div>
  );
}
