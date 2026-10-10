import React, { useEffect, useRef } from 'react';

interface HorizonBackdropProps {
  mouseOffset: { x: number; y: number };
}

// Vertical light curtain columns positioned above the arc
const LIGHT_COLUMNS = [
  { left: '29.5%', width: '38px', height: '42vh', opacity: 0.09 },
  { left: '32.2%', width: '54px', height: '47vh', opacity: 0.14 },
  { left: '35.8%', width: '28px', height: '50vh', opacity: 0.11 },
  { left: '38.0%', width: '64px', height: '54vh', opacity: 0.18 },
  { left: '42.0%', width: '46px', height: '57vh', opacity: 0.22 },
  { left: '45.2%', width: '52px', height: '59vh', opacity: 0.28 },
  { left: '48.5%', width: '68px', height: '60vh', opacity: 0.34 },
  { left: '52.2%', width: '48px', height: '58vh', opacity: 0.26 },
  { left: '55.4%', width: '60px', height: '56vh', opacity: 0.20 },
  { left: '59.2%', width: '36px', height: '53vh', opacity: 0.16 },
  { left: '61.8%', width: '58px', height: '49vh', opacity: 0.15 },
  { left: '65.5%', width: '42px', height: '44vh', opacity: 0.11 },
  { left: '68.4%', width: '32px', height: '40vh', opacity: 0.08 },
];

export const HorizonBackdrop: React.FC<HorizonBackdropProps> = ({ mouseOffset }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const width = 700;
    const height = 200;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Seeded-like static + gently drifting bottom particles matching reference image
    const particles = [
      { x: 325, y: 132, r: 1.4, baseAlpha: 0.75, speed: 0.015, phase: 0.2 },
      { x: 256, y: 146, r: 1.2, baseAlpha: 0.65, speed: 0.012, phase: 1.4 },
      { x: 274, y: 170, r: 1.1, baseAlpha: 0.55, speed: 0.018, phase: 2.1 },
      { x: 295, y: 162, r: 1.0, baseAlpha: 0.45, speed: 0.014, phase: 0.8 },
      { x: 350, y: 158, r: 1.3, baseAlpha: 0.60, speed: 0.016, phase: 3.0 },
      { x: 405, y: 165, r: 1.3, baseAlpha: 0.65, speed: 0.013, phase: 1.9 },
      { x: 432, y: 148, r: 1.2, baseAlpha: 0.60, speed: 0.017, phase: 4.2 },
      { x: 446, y: 156, r: 1.4, baseAlpha: 0.70, speed: 0.011, phase: 2.7 },
      { x: 205, y: 182, r: 1.1, baseAlpha: 0.40, speed: 0.015, phase: 5.1 },
      { x: 238, y: 176, r: 0.9, baseAlpha: 0.35, speed: 0.019, phase: 1.1 },
      { x: 312, y: 186, r: 1.1, baseAlpha: 0.50, speed: 0.013, phase: 3.6 },
      { x: 374, y: 182, r: 1.0, baseAlpha: 0.48, speed: 0.014, phase: 0.5 },
      { x: 388, y: 142, r: 0.9, baseAlpha: 0.42, speed: 0.016, phase: 2.4 },
      { x: 478, y: 175, r: 1.1, baseAlpha: 0.45, speed: 0.012, phase: 4.8 },
      { x: 496, y: 188, r: 1.0, baseAlpha: 0.38, speed: 0.015, phase: 1.7 },
      { x: 342, y: 140, r: 0.8, baseAlpha: 0.35, speed: 0.020, phase: 3.9 },
      { x: 284, y: 149, r: 0.9, baseAlpha: 0.40, speed: 0.014, phase: 2.9 },
      { x: 418, y: 179, r: 1.0, baseAlpha: 0.50, speed: 0.016, phase: 0.3 },
    ];

    let tick = 0;
    const render = () => {
      tick += 1;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        const twinkle = Math.sin(tick * p.speed + p.phase) * 0.22;
        const alpha = Math.max(0.15, Math.min(0.95, p.baseAlpha + twinkle));
        const floatY = p.y + Math.cos(tick * 0.01 + p.phase) * 2.2;
        const floatX = p.x + Math.sin(tick * 0.008 + p.phase) * 1.5;

        // Soft outer glow
        const grad = ctx.createRadialGradient(floatX, floatY, 0, floatX, floatY, p.r * 3.5);
        grad.addColorStop(0, `rgba(210, 228, 255, ${alpha})`);
        grad.addColorStop(0.4, `rgba(130, 170, 255, ${alpha * 0.45})`);
        grad.addColorStop(1, 'rgba(90, 130, 255, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(floatX, floatY, p.r * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Crisp star core
        ctx.fillStyle = `rgba(240, 247, 255, ${Math.min(1, alpha * 1.15)})`;
        ctx.beginPath();
        ctx.arc(floatX, floatY, p.r * 0.75, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Deep Ambient Sky Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 68% 54% at 50% 24%, rgba(28, 56, 148, 0.34) 0%, rgba(12, 24, 72, 0.18) 52%, rgba(3, 5, 17, 1) 85%)',
        }}
      />

      {/* 2. Vertical Light Curtains / Aurora Pillars Above the Arc */}
      <div
        className="absolute inset-x-0 top-0 h-[62vh] transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * -8}px, ${mouseOffset.y * -4}px, 0)`,
          maskImage:
            'radial-gradient(ellipse 38% 75% at 50% 35%, black 25%, rgba(0,0,0,0.6) 65%, transparent 95%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 38% 75% at 50% 35%, black 25%, rgba(0,0,0,0.6) 65%, transparent 95%)',
        }}
      >
        {LIGHT_COLUMNS.map((col, idx) => (
          <div
            key={idx}
            className="absolute top-0"
            style={{
              left: col.left,
              width: col.width,
              height: col.height,
              opacity: col.opacity,
              background:
                'linear-gradient(90deg, rgba(80, 130, 255, 0) 0%, rgba(105, 155, 255, 0.65) 20%, rgba(160, 205, 255, 0.9) 50%, rgba(105, 155, 255, 0.65) 80%, rgba(80, 130, 255, 0) 100%)',
              maskImage:
                'linear-gradient(to top, rgba(0,0,0,1) 15%, rgba(0,0,0,0.65) 55%, rgba(0,0,0,0.08) 88%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to top, rgba(0,0,0,1) 15%, rgba(0,0,0,0.65) 55%, rgba(0,0,0,0.08) 88%, transparent 100%)',
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>

      {/* 3. Horizon Eclipse Arc & Atmospheric Glow System */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 w-[177.78vh] min-w-[1024px] h-screen transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 6}px, ${mouseOffset.y * 4}px, 0)`,
        }}
      >
        {/* Broad outer sky bloom around the apex */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-[10.8vh] w-[44%] h-[28vh] rounded-full animate-horizon-pulse"
          style={{
            background:
              'radial-gradient(ellipse 55% 50% at 50% 52%, rgba(110, 185, 255, 0.54) 0%, rgba(65, 120, 248, 0.30) 45%, rgba(30, 65, 180, 0) 80%)',
            filter: 'blur(24px)',
          }}
        />

        {/* SVG Precision Arc System */}
        <svg
          viewBox="0 0 1440 810"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Mask to fade the arc smoothly at left and right tips (around y=435) */}
            <linearGradient id="arcVerticalFade" x1="720" y1="172" x2="720" y2="462" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="66%" stopColor="white" stopOpacity="0.92" />
              <stop offset="85%" stopColor="white" stopOpacity="0.42" />
              <stop offset="97%" stopColor="white" stopOpacity="0" />
            </linearGradient>

            <mask id="arcTipMask">
              <rect x="0" y="0" width="1440" height="810" fill="url(#arcVerticalFade)" />
            </mask>

            {/* Dark Planet Occluder Gradient (blocks vertical rays inside the dome) */}
            <linearGradient id="planetBodyGrad" x1="720" y1="184" x2="720" y2="740" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#040717" stopOpacity="0.98" />
              <stop offset="35%" stopColor="#030511" stopOpacity="0.99" />
              <stop offset="100%" stopColor="#030511" stopOpacity="1" />
            </linearGradient>

            {/* Inner Blue Rim Halo inside the top of the planet dome */}
            <radialGradient
              id="innerRimGlow"
              cx="720"
              cy="647"
              r="465"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="86%" stopColor="#050819" stopOpacity="0" />
              <stop offset="94.5%" stopColor="#355cd6" stopOpacity="0.16" />
              <stop offset="98.2%" stopColor="#75a2ff" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#b8d9ff" stopOpacity="0.70" />
            </radialGradient>

            {/* Outer Blue Rim Halo along the arc curve */}
            <linearGradient id="rimStrokeColor" x1="295" y1="415" x2="1145" y2="415" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4f74e8" stopOpacity="0" />
              <stop offset="12%" stopColor="#6c8fff" stopOpacity="0.68" />
              <stop offset="32%" stopColor="#9ec2ff" stopOpacity="0.94" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="68%" stopColor="#9ec2ff" stopOpacity="0.94" />
              <stop offset="88%" stopColor="#6c8fff" stopOpacity="0.68" />
              <stop offset="100%" stopColor="#4f74e8" stopOpacity="0" />
            </linearGradient>

            {/* Glow Filters */}
            <filter id="blurWide" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="22" />
            </filter>
            <filter id="blurMedium" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="9" />
            </filter>
            <filter id="blurTight" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="2.5" />
            </filter>
            <filter id="blurApex" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="16" />
            </filter>
          </defs>

          {/* A. Dark Planet Body (occludes vertical light rays inside the arc) */}
          <circle
            cx="720"
            cy="647"
            r="464"
            fill="url(#planetBodyGrad)"
          />

          {/* B. Masked Arc Layers */}
          <g mask="url(#arcTipMask)">
            {/* Inner Rim Atmospheric Glow */}
            <circle
              cx="720"
              cy="647"
              r="464"
              fill="url(#innerRimGlow)"
            />

            {/* Wide Outer Cobalt-Cyan Halo along the curve */}
            <circle
              cx="720"
              cy="647"
              r="465"
              stroke="url(#rimStrokeColor)"
              strokeWidth="26"
              strokeOpacity="0.46"
              filter="url(#blurWide)"
            />

            {/* Medium Periwinkle-Ice Glow along the curve */}
            <circle
              cx="720"
              cy="647"
              r="465"
              stroke="url(#rimStrokeColor)"
              strokeWidth="10"
              strokeOpacity="0.78"
              filter="url(#blurMedium)"
            />

            {/* Soft Endpoint Cushions (left & right lower arc tips around x=320, y=412 and x=1120, y=412) */}
            <ellipse
              cx="322"
              cy="408"
              rx="28"
              ry="16"
              transform="rotate(-48 322 408)"
              fill="#658df8"
              fillOpacity="0.32"
              filter="url(#blurMedium)"
            />
            <ellipse
              cx="1118"
              cy="408"
              rx="28"
              ry="16"
              transform="rotate(48 1118 408)"
              fill="#658df8"
              fillOpacity="0.32"
              filter="url(#blurMedium)"
            />

            {/* Tight Crisp Bloom */}
            <circle
              cx="720"
              cy="647"
              r="465"
              stroke="url(#rimStrokeColor)"
              strokeWidth="3.8"
              strokeOpacity="0.92"
              filter="url(#blurTight)"
            />

            {/* Razor-Sharp Core Rim Line */}
            <circle
              cx="720"
              cy="647"
              r="465"
              stroke="url(#rimStrokeColor)"
              strokeWidth="2.1"
            />
          </g>

          {/* C. Intense Apex Sunrise Hotspot at (720, 182) */}
          <ellipse
            cx="720"
            cy="180"
            rx="160"
            ry="34"
            fill="#68b6ff"
            fillOpacity="0.58"
            filter="url(#blurWide)"
          />
          <ellipse
            cx="720"
            cy="182"
            rx="102"
            ry="16"
            fill="#aee6ff"
            fillOpacity="0.82"
            filter="url(#blurApex)"
          />
          <ellipse
            cx="720"
            cy="182"
            rx="58"
            ry="6"
            fill="#ffffff"
            fillOpacity="0.95"
            filter="url(#blurTight)"
          />
        </svg>
      </div>

      {/* 4. Subtle Ambient Backlight Behind Paragraph Text */}
      <div
        className="absolute left-1/2 top-[63vh] -translate-x-1/2 w-[480px] h-[14vh] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 50% 50%, rgba(76, 118, 245, 0.16) 0%, rgba(45, 75, 190, 0.05) 60%, transparent 100%)',
          filter: 'blur(18px)',
        }}
      />

      {/* 5. Bottom Horizon Mist & Twinkling Starlight Particles */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[24vh] max-h-[200px]">
        {/* Soft blue radial mist rising from bottom center */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 52% 72% at 50% 100%, rgba(78, 122, 248, 0.30) 0%, rgba(48, 82, 205, 0.14) 48%, rgba(15, 28, 85, 0) 82%)',
            filter: 'blur(8px)',
          }}
        />
        {/* Starlight particles canvas */}
        <canvas
          ref={canvasRef}
          className="relative w-full h-full opacity-95"
        />
      </div>
    </div>
  );
};
