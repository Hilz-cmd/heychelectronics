import React, { useState } from 'react';
import { X, Check, Copy, Sparkles, Play, ArrowRight, Layers, Cpu, Zap, ShieldCheck, Code2 } from 'lucide-react';

export type ModalType = 'get-started' | 'sign-in' | 'watch-demo' | null;

interface InteractiveModalsProps {
  activeModal: ModalType;
  onClose: () => void;
  onSwitchModal: (modal: ModalType) => void;
}

const STANDALONE_HTML_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>NEONE — Build Faster With Lumine Insights</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #030511;
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      height: 100vh;
      overflow: hidden;
      position: relative;
      display: flex;
      flex-direction: column;
    }
    /* Navbar */
    .navbar {
      max-width: 1200px;
      margin: 0 auto;
      padding: 24px 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      z-index: 20;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 700;
      font-size: 15px;
      letter-spacing: 0.06em;
      color: #fff;
      text-decoration: none;
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 32px;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.78);
    }
    .nav-links a {
      color: inherit;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      transition: color 0.15s;
    }
    .nav-links a:hover { color: #fff; }
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 24px;
      font-size: 14px;
    }
    .btn-signin {
      color: rgba(255, 255, 255, 0.82);
      text-decoration: none;
    }
    .btn-top-cta {
      background: #ffffff;
      color: #060914;
      font-weight: 500;
      padding: 9px 18px;
      border-radius: 10px;
      text-decoration: none;
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.18);
    }
    /* Hero Centerpiece */
    .hero {
      position: relative;
      z-index: 10;
      text-align: center;
      padding-top: 210px;
      padding-bottom: 120px;
      max-width: 820px;
      margin: 0 auto;
    }
    .beta-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 16px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 500;
      color: #d8e3ff;
      background: linear-gradient(180deg, rgba(32,45,90,0.62), rgba(19,27,58,0.68));
      border: 1px solid rgba(132,162,252,0.26);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.14), 0 4px 18px rgba(0,0,0,0.4);
      margin-bottom: 24px;
    }
    h1 {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: clamp(2.8rem, 5.2vw, 4.25rem);
      font-weight: 600;
      line-height: 1.08;
      letter-spacing: -0.035em;
      margin-bottom: 24px;
    }
    .grad-text {
      background: linear-gradient(180deg, #a8c1ff 0%, #6d8cf8 55%, #5875e8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .subtitle {
      max-width: 520px;
      margin: 0 auto 36px;
      font-size: 15px;
      line-height: 1.65;
      color: rgba(205, 218, 248, 0.74);
    }
    .cta-group {
      display: flex;
      justify-content: center;
      gap: 14px;
    }
    .btn-primary {
      padding: 13px 26px;
      border-radius: 11px;
      font-size: 14px;
      font-weight: 600;
      color: #080c1a;
      background: linear-gradient(180deg, #ffffff 0%, #f3f6ff 35%, #9cb5ff 100%);
      box-shadow: 0 8px 28px -4px rgba(105, 142, 255, 0.45);
      border: none;
      cursor: pointer;
    }
    .btn-secondary {
      padding: 13px 26px;
      border-radius: 11px;
      font-size: 14px;
      font-weight: 500;
      color: rgba(226, 234, 255, 0.9);
      background: rgba(13, 19, 42, 0.68);
      border: 1px solid rgba(125, 152, 232, 0.22);
      cursor: pointer;
    }
  </style>
</head>
<body>
  <!-- Full SVG & Canvas Horizon included in live React view -->
  <header class="navbar">
    <a href="#" class="brand">✦ NEONE</a>
    <nav class="nav-links">
      <a href="#features">Features</a>
      <a href="#templates">Templates ▾</a>
      <a href="#docs">Docs ▾</a>
      <a href="#pricing">Pricing ▾</a>
    </nav>
    <div class="nav-actions">
      <a href="#signin" class="btn-signin">Sign in</a>
      <a href="#start" class="btn-top-cta">Get Started</a>
    </div>
  </header>
  <main class="hero">
    <div class="beta-pill">✦ Early Access Beta</div>
    <h1>Build Faster <span class="grad-text">With</span><br/>Lumine <span class="grad-text">Insights</span></h1>
    <p class="subtitle">A minimal AI-powered system that transforms complex workflows into clear, glowing, effortless structures — helping you ship ideas faster.</p>
    <div class="cta-group">
      <button class="btn-primary">Get Started</button>
      <button class="btn-secondary">Watch Demo</button>
    </div>
  </main>
</body>
</html>`;

export const InteractiveModals: React.FC<InteractiveModalsProps> = ({
  activeModal,
  onClose,
  onSwitchModal,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [workspaceName, setWorkspaceName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [demoTab, setDemoTab] = useState<'interactive' | 'code'>('interactive');
  const [copied, setCopied] = useState(false);
  const [workflowState, setWorkflowState] = useState<'raw' | 'structured'>('structured');

  if (!activeModal) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(STANDALONE_HTML_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid work email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setError('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#02040d]/80 backdrop-blur-md animate-fadeIn"
      onClick={resetAndClose}
    >
      <div
        className="relative w-full max-w-xl rounded-2xl bg-[#090e24]/95 border border-[#789aff]/25 shadow-[0_24px_80px_rgba(0,0,0,0.85),0_0_40px_rgba(88,125,255,0.18)] p-6 md:p-8 text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top subtle horizon glow inside modal */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-40 rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(110, 165, 255, 0.28) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />

        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* MODAL 1: GET OUR FREE QUOTE */}
        {activeModal === 'get-started' && (
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-white">
              Get Your <span className="text-lumine-gradient">Free Quote</span>
            </h2>
            <p className="mt-2 text-sm text-[#c8d6f5]/75 leading-relaxed">
              Tell us about your solar power, indoor/outdoor LED screen, billboard signage, or smart home project for a tailored estimate.
            </p>

            {submitted ? (
              <div className="mt-6 p-5 rounded-xl bg-[#111a3a]/80 border border-[#759aff]/30 text-center">
                <div className="w-10 h-10 rounded-full bg-[#6d8cf8]/20 border border-[#8ba8ff]/40 flex items-center justify-center mx-auto mb-3 text-[#a8c1ff]">
                  <Check className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white">Quote Request Received</h3>
                <p className="mt-1 text-xs text-[#c8d6f5]/75">
                  Our engineering team will send your custom quote to <span className="text-white font-medium">{email}</span> shortly.
                </p>
                <button
                  onClick={resetAndClose}
                  className="mt-4 btn-neone-primary px-5 py-2.5 rounded-xl text-xs font-semibold text-[#080c1a] cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#c8d6f5]/80 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050817] border border-[#6c8eff]/25 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#8ba8ff]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#c8d6f5]/80 mb-1.5">
                    Project Type / Requirements
                  </label>
                  <input
                    type="text"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    placeholder="e.g. Outdoor LED Billboard, 15kW Solar Inverter, Smart Home"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050817] border border-[#6c8eff]/25 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#8ba8ff]"
                  />
                </div>

                {error && <p className="text-xs text-rose-400">{error}</p>}

                <button
                  type="submit"
                  className="w-full btn-neone-primary py-3 rounded-xl text-sm font-semibold text-[#080c1a] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Get Our Free Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        )}

        {/* MODAL 2: SIGN IN */}
        {activeModal === 'sign-in' && (
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-white">
              Sign in to <span className="text-lumine-gradient">NEONE</span>
            </h2>
            <p className="mt-1.5 text-sm text-[#c8d6f5]/75">
              Enter your credentials to access your Lumine Insights environment.
            </p>

            {submitted ? (
              <div className="mt-6 p-5 rounded-xl bg-[#111a3a]/80 border border-[#759aff]/30 text-center">
                <div className="w-10 h-10 rounded-full bg-[#6d8cf8]/20 border border-[#8ba8ff]/40 flex items-center justify-center mx-auto mb-3 text-[#a8c1ff]">
                  <Check className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white">Authenticated as {email}</h3>
                <p className="mt-1 text-xs text-[#c8d6f5]/75">
                  Session verified. Redirecting to your Lumine pipeline canvas...
                </p>
                <button
                  onClick={resetAndClose}
                  className="mt-4 btn-neone-primary px-5 py-2.5 rounded-xl text-xs font-semibold text-[#080c1a] cursor-pointer"
                >
                  Continue
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#c8d6f5]/80 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050817] border border-[#6c8eff]/25 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#8ba8ff]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#c8d6f5]/80 mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050817] border border-[#6c8eff]/25 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#8ba8ff]"
                    required
                  />
                </div>

                {error && <p className="text-xs text-rose-400">{error}</p>}

                <button
                  type="submit"
                  className="w-full btn-neone-primary py-3 rounded-xl text-sm font-semibold text-[#080c1a] cursor-pointer"
                >
                  Sign In
                </button>

                <div className="pt-2 text-center text-xs text-white/50">
                  Need an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setError('');
                      onSwitchModal('get-started');
                    }}
                    className="text-[#9cb5ff] hover:underline cursor-pointer"
                  >
                    Request Early Access
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* MODAL 3: WATCH DEMO & HTML/CSS/JS SOURCE */}
        {activeModal === 'watch-demo' && (
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5 pr-8">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDemoTab('interactive')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                    demoTab === 'interactive'
                      ? 'bg-[#6d8cf8]/25 text-white border border-[#8ba8ff]/40'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Interactive Lumine Demo</span>
                </button>
                <button
                  onClick={() => setDemoTab('code')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                    demoTab === 'code'
                      ? 'bg-[#6d8cf8]/25 text-white border border-[#8ba8ff]/40'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>HTML / CSS / JS Code</span>
                </button>
              </div>
            </div>

            {demoTab === 'interactive' ? (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      Lumine Workflow Structuring Engine
                    </h3>
                    <p className="text-xs text-[#c8d6f5]/70">
                      Toggle between legacy tangled pipelines and Lumine Insights auto-structured flow.
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setWorkflowState((s) => (s === 'raw' ? 'structured' : 'raw'))
                    }
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#16224f] border border-[#7c9aff]/40 text-[#c8d9ff] hover:bg-[#1e2e68] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {workflowState === 'structured' ? 'View Raw Input' : 'Apply Lumine AI'}
                  </button>
                </div>

                <div className="relative h-56 rounded-xl bg-[#040716] border border-[#6c8eff]/25 p-5 flex flex-col justify-between overflow-hidden">
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        workflowState === 'structured'
                          ? 'radial-gradient(circle at 50% 50%, rgba(95, 140, 255, 0.18), transparent 70%)'
                          : 'none',
                    }}
                  />

                  <div className="relative z-10 grid grid-cols-3 gap-3 my-auto">
                    {[
                      {
                        icon: Layers,
                        title: 'Ingest Streams',
                        detail: workflowState === 'structured' ? 'Normalized 420ms' : 'Unindexed JSON',
                      },
                      {
                        icon: Cpu,
                        title: 'Lumine Synthesis',
                        detail: workflowState === 'structured' ? 'Auto-mapped DAG' : 'Manual Rules',
                      },
                      {
                        icon: Zap,
                        title: 'Ship Velocity',
                        detail: workflowState === 'structured' ? '3.4x Faster Deploy' : 'Blocked Queue',
                      },
                    ].map((node, i) => {
                      const Icon = node.icon;
                      return (
                        <div
                          key={i}
                          className={`p-3.5 rounded-xl border transition-all duration-300 ${
                            workflowState === 'structured'
                              ? 'bg-[#0e1738]/90 border-[#84a4ff]/45 shadow-[0_0_24px_rgba(95,140,255,0.2)]'
                              : 'bg-[#080c1d]/60 border-white/10 opacity-70'
                          }`}
                        >
                          <div className="w-7 h-7 rounded-lg bg-[#6d8cf8]/20 flex items-center justify-center text-[#a8c1ff] mb-2">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="text-xs font-semibold text-white">{node.title}</div>
                          <div className="text-[11px] text-[#a8c1ff]/80 mt-0.5">{node.detail}</div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="relative z-10 flex items-center justify-between text-[11px] text-[#c8d6f5]/60 pt-3 border-t border-white/10">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#8ba8ff]" />
                      Zero-config schema inference
                    </span>
                    <span className="text-[#a8c1ff] font-medium">
                      {workflowState === 'structured' ? 'Structure Optimized' : 'Awaiting Structuring'}
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex justify-end gap-3">
                  <button
                    onClick={resetAndClose}
                    className="btn-neone-secondary px-4 py-2 rounded-xl text-xs font-medium text-white/80 cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => onSwitchModal('get-started')}
                    className="btn-neone-primary px-5 py-2 rounded-xl text-xs font-semibold text-[#080c1a] cursor-pointer"
                  >
                    Get Started Free
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#c8d6f5]/70">
                    Standalone HTML / CSS template for this Hero Section:
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-medium text-white transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy HTML/CSS</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3.5 rounded-xl bg-[#040612] border border-white/10 text-[11px] text-[#b8cdf8] font-mono overflow-x-auto max-h-60 leading-relaxed">
                  {STANDALONE_HTML_CODE}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
