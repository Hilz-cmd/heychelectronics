import React, { useState } from 'react';
import { ArrowUpRight, Check, X, Calendar, Clock } from 'lucide-react';

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  summary: string;
  specs: {
    label: string;
    value: string;
  }[];
  turnaround: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'led-billboards',
    index: '01',
    title: 'Outdoor LED Billboards & Facades',
    summary:
      'High-luminance weatherproof dot-matrix billboard arrays engineered for 24/7 highway and architectural visibility.',
    specs: [
      { label: 'Brightness', value: '8,500 nits peak' },
      { label: 'Pixel Pitch', value: 'P2.5 – P6.0 mm' },
      { label: 'Protection', value: 'IP68 Weatherproof' },
    ],
    turnaround: '14–21 Days Deployment',
  },
  {
    id: 'commercial-screens',
    index: '02',
    title: 'Ultra-Fine Indoor Matrix Screens',
    summary:
      'Seamless modular COB micro-LED video walls for command centers, retail flagships, and broadcast studios.',
    specs: [
      { label: 'Refresh Rate', value: '7,680 Hz' },
      { label: 'Contrast Ratio', value: '1,000,000:1' },
      { label: 'Color Gamut', value: '115% DCI-P3' },
    ],
    turnaround: '7–10 Days Deployment',
  },
  {
    id: 'solar-integration',
    index: '03',
    title: 'Autonomous Solar Array & Storage',
    summary:
      'Off-grid monocrystalline solar canopies and LiFePO4 battery banks that power high-draw signage and edge nodes.',
    specs: [
      { label: 'Array Output', value: '12 kW – 150 kW' },
      { label: 'Autonomy', value: '96 hrs Zero-Sun Reserve' },
      { label: 'Efficiency', value: '23.8% Cell Conversion' },
    ],
    turnaround: '10–18 Days Deployment',
  },
  {
    id: 'alexa-voice-control',
    index: '04',
    title: 'Alexa & Voice Scene Orchestration',
    summary:
      'Enterprise voice-triggered hardware routing for instant display switching, power scheduling, and scene presets.',
    specs: [
      { label: 'Response Time', value: '< 120 ms Local Execution' },
      { label: 'Protocols', value: 'Matter · Zigbee · DMX512' },
      { label: 'Encryption', value: 'AES-256 Hardware Key' },
    ],
    turnaround: '3–5 Days Integration',
  },
  {
    id: 'heych-telemetry-os',
    index: '05',
    title: 'HEYCH Lumine Control Architecture',
    summary:
      'Custom cloud-to-edge workflow pipelines synchronizing multi-site screens, solar telemetry, and automated diagnostics.',
    specs: [
      { label: 'Sync Jitter', value: '< 2.4 ms Multi-Node' },
      { label: 'Uptime SLA', value: '99.995% Guaranteed' },
      { label: 'Capacity', value: 'Up to 10,000 Endpoints' },
    ],
    turnaround: '5–10 Days Provisioning',
  },
  {
    id: 'preventive-maintenance',
    index: '06',
    title: '24/7 Field Calibration & Maintenance',
    summary:
      'Continuous thermal monitoring, diode module hot-swapping, and color-space recalibration across all installed sites.',
    specs: [
      { label: 'Dispatch SLA', value: '4-Hour On-Site Response' },
      { label: 'Diagnostics', value: 'Automated Pixel Health' },
      { label: 'Coverage', value: 'Nationwide Field Teams' },
    ],
    turnaround: 'Immediate Onboarding',
  },
];

export const ServicesSection: React.FC = () => {
  const [bookingService, setBookingService] = useState<ServiceItem | null>(null);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [projectDate, setProjectDate] = useState('');
  const [projectNotes, setProjectNotes] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [formError, setFormError] = useState('');

  // Split the 6 services into 2 lists of 3 for desktop view (single list in mobile)
  const leftList = SERVICES.slice(0, 3);
  const rightList = SERVICES.slice(3, 6);

  const handleOpenBooking = (service: ServiceItem) => {
    setBookingService(service);
    setBookingConfirmed(false);
    setFormError('');
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.includes('@')) {
      setFormError('Please provide your name and a valid email address.');
      return;
    }
    setFormError('');
    setBookingConfirmed(true);
  };

  const renderServiceListItem = (service: ServiceItem) => (
    <li
      key={service.id}
      className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-[#070b1e]/90 border border-[#6c8eff]/18 hover:border-[#8ba8ff]/45 transition-all duration-200 shadow-[0_8px_28px_rgba(0,0,0,0.4)]"
    >
      <div>
        {/* Top Row: Editorial Number + Title & Book Us CTA */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs text-[#8ba8ff] font-medium mb-1">
              <span className="font-mono tabular-nums">{service.index}.</span>
              <span aria-hidden="true" className="text-white/25">
                ·
              </span>
              <span className="text-[#b8caf5]/65">{service.turnaround}</span>
            </div>
            <h3 className="font-display text-base sm:text-lg font-semibold text-white tracking-[-0.01em] group-hover:text-[#b8ceff] transition-colors">
              {service.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={() => handleOpenBooking(service)}
            className="btn-neone-primary inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-[#070b19] cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>Book Us</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Summary Description */}
        <p className="mt-2.5 text-xs sm:text-[13.5px] leading-[1.6] text-[#c8d6f5]/70">
          {service.summary}
        </p>
      </div>

      {/* Technical Specifications List inside Card */}
      <dl className="mt-5 pt-4 border-t border-white/[0.07] grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4">
        {service.specs.map((spec) => (
          <div
            key={spec.label}
            className="flex sm:flex-col items-baseline justify-between sm:justify-start gap-2"
          >
            <dt className="text-[11px] text-[#9cb5ff]/55 font-normal">
              {spec.label}
            </dt>
            <dd className="text-xs font-medium text-white/90 font-mono tabular-nums">
              {spec.value}
            </dd>
          </div>
        ))}
      </dl>
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 sm:mb-14">
          <div>
            <p className="text-xs font-medium tracking-[0.04em] text-[#8ba8ff] mb-2.5">
              Engineering & Field Services
            </p>
            <h2
              id="services-heading"
              className="font-display text-2xl sm:text-4xl font-semibold tracking-[-0.025em] text-white"
            >
              Turnkey Deployment <span className="text-lumine-gradient">& Specifications</span>
            </h2>
          </div>
          <p className="text-sm text-[#c8d6f5]/68 max-w-md leading-relaxed">
            From high-output LED billboards and off-grid solar arrays to voice-automated HEYCH control rooms.
          </p>
        </div>

        {/* 1 List on Mobile (flex-col), 2 Lists Side-by-Side on Desktop (lg:grid-cols-2) */}
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

      {/* Interactive "Book Us" Modal */}
      {bookingService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#02040d]/80 backdrop-blur-md"
          onClick={() => setBookingService(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl bg-[#090e24] border border-[#789aff]/30 shadow-[0_24px_80px_rgba(0,0,0,0.85)] p-6 sm:p-8 text-white overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setBookingService(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close booking modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-xs text-[#8ba8ff] font-medium mb-2">
              <span className="font-mono tabular-nums">Service {bookingService.index}</span>
              <span aria-hidden="true">·</span>
              <span>{bookingService.turnaround}</span>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-semibold text-white">
              Book: {bookingService.title}
            </h3>

            {/* Selected Service Spec Summary */}
            <div className="mt-4 p-3.5 rounded-xl bg-[#050817] border border-[#6c8eff]/20 grid grid-cols-3 gap-2">
              {bookingService.specs.map((spec) => (
                <div key={spec.label}>
                  <div className="text-[10.5px] text-[#9cb5ff]/60">{spec.label}</div>
                  <div className="text-xs font-mono font-medium text-white tabular-nums mt-0.5">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>

            {bookingConfirmed ? (
              <div className="mt-6 p-6 rounded-xl bg-[#10193a]/90 border border-[#7c9aff]/35 text-center">
                <div className="w-10 h-10 rounded-full bg-[#6d8cf8]/20 border border-[#8ba8ff]/40 flex items-center justify-center mx-auto mb-3 text-[#a8c1ff]">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="font-display text-base font-semibold text-white">
                  Site Survey & Booking Confirmed
                </h4>
                <p className="mt-1.5 text-xs text-[#c8d6f5]/75 leading-relaxed">
                  Our lead field engineer will contact <span className="text-white font-medium">{clientEmail}</span> within 2 hours with the technical brief for <span className="text-white font-medium">{bookingService.title}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => setBookingService(null)}
                  className="mt-5 btn-neone-primary px-5 py-2.5 rounded-xl text-xs font-semibold text-[#080c1a] cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="mt-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-[#c8d6f5]/80 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Alex Rivera"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#050817] border border-[#6c8eff]/25 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#8ba8ff]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#c8d6f5]/80 mb-1.5">
                      Work Email
                    </label>
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#050817] border border-[#6c8eff]/25 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#8ba8ff]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-[#c8d6f5]/80 mb-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#8ba8ff]" />
                      <span>Target Kickoff Date</span>
                    </label>
                    <input
                      type="date"
                      value={projectDate}
                      onChange={(e) => setProjectDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#050817] border border-[#6c8eff]/25 text-sm text-white focus:outline-none focus:border-[#8ba8ff]"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-[#c8d6f5]/80 mb-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#8ba8ff]" />
                      <span>Site Readiness</span>
                    </label>
                    <input
                      type="text"
                      value={projectNotes}
                      onChange={(e) => setProjectNotes(e.target.value)}
                      placeholder="e.g. Commercial rooftop, 3-phase"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#050817] border border-[#6c8eff]/25 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#8ba8ff]"
                    />
                  </div>
                </div>

                {formError && <p className="text-xs text-rose-400">{formError}</p>}

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setBookingService(null)}
                    className="btn-neone-secondary px-4 py-2.5 rounded-xl text-xs font-medium text-white/80 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-neone-primary px-6 py-2.5 rounded-xl text-xs font-semibold text-[#080c1a] cursor-pointer whitespace-nowrap"
                  >
                    Confirm Booking Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
