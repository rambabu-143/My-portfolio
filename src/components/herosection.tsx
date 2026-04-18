'use client';
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

// ── Audio ─────────────────────────────────────────────────────────────────────

function initAudio(ref: React.MutableRefObject<AudioContext | null>) {
  if (typeof window === 'undefined') return null;
  try {
    if (!ref.current)
      ref.current = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    if (ref.current.state === 'suspended') ref.current.resume().catch(() => {});
    return ref.current;
  } catch { return null; }
}

// Short electric tick on each edge snap
function snapTick(ctx: AudioContext, freq: number) {
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = 'square';
  o.frequency.setValueAtTime(freq, ctx.currentTime);
  g.gain.setValueAtTime(0.045, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.028);
  o.connect(g); g.connect(ctx.destination);
  o.start(); o.stop(ctx.currentTime + 0.032);
}

// Final lock-in sound — thud + ring
function lockSound(ctx: AudioContext) {
  const o1 = ctx.createOscillator(), g1 = ctx.createGain();
  o1.type = 'sine';
  o1.frequency.setValueAtTime(200, ctx.currentTime);
  o1.frequency.exponentialRampToValueAtTime(32, ctx.currentTime + 0.2);
  g1.gain.setValueAtTime(0.38, ctx.currentTime);
  g1.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.24);
  o1.connect(g1); g1.connect(ctx.destination);
  o1.start(); o1.stop(ctx.currentTime + 0.28);

  const o2 = ctx.createOscillator(), g2 = ctx.createGain();
  o2.type = 'sine';
  o2.frequency.setValueAtTime(1800, ctx.currentTime);
  o2.frequency.exponentialRampToValueAtTime(480, ctx.currentTime + 0.55);
  g2.gain.setValueAtTime(0.065, ctx.currentTime);
  g2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.55);
  o2.connect(g2); g2.connect(ctx.destination);
  o2.start(); o2.stop(ctx.currentTime + 0.6);
}

// ── Logo segments ─────────────────────────────────────────────────────────────
// Each entry: [x1, y1, x2, y2] — derived by parsing the original SVG paths

const P1: [number, number, number, number][] = [
  [125, 101.5, 125,  35.5 ],  // V 35.5
  [125,  35.5,  58.5, 0   ],  // L 58.5 0
  [ 58.5,  0,    0,  35.5 ],  // L 0 35.5
  [  0,   35.5, 125, 101.5],  // L 125 101.5
  [125, 101.5,  98, 122.5 ],  // L 98 122.5
  [ 98, 122.5, 146, 152   ],  // L 146 152
  [146, 152,   114, 173   ],  // L 114 173
  [114, 173,    58.5, 144.5], // L 58.5 144.5
  [ 58.5, 144.5, 0,  181.5],  // L 0 181.5
  [  0,  181.5,  0,  110  ],  // V 110
  [  0,  110,   31.5, 88  ],  // L 31.5 88
  [ 31.5,  88,  98,  122.5],  // L 98 122.5
];

const P2: [number, number, number, number][] = [
  [ 27,  86,   27,  152   ],  // L 27 152
  [ 27, 152,   93.5, 187.5],  // L 93.5 187.5
  [ 93.5, 187.5, 152, 152 ],  // L 152 152
  [152, 152,   27,   86   ],  // close
  [ 27,  86,   54,   65   ],  // L 54 65
  [ 54,  65,    6,   35.5 ],  // L 6 35.5
  [  6,  35.5, 38,   14.5 ],  // L 38 14.5
  [ 38,  14.5, 93.5, 43   ],  // L 93.5 43
  [ 93.5, 43,  152,   6   ],  // L 152 6
  [152,   6,   152,  77.5 ],  // L 152 77.5
  [152,  77.5, 120.5, 99.5],  // L 120.5 99.5
  [120.5, 99.5, 54,  65   ],  // L 54 65
];

// Interleave: p1[0], p2[0], p1[1], p2[1] … so both paths build simultaneously
const SEGS = P1.flatMap((coords, i) => [
  { coords, grad: 'url(#sn_g1)', w: 4 },
  { coords: P2[i], grad: 'url(#sn_g2)', w: 3 },
]);

// Pitch sweeps upward through the animation (electric build-up feeling)
const tickPitch = (i: number) => Math.round(380 + i * 30);

// ── Timing (ms) ───────────────────────────────────────────────────────────────
const STAGGER    = 68;   // ms between each edge
const SNAP       = 82;   // ms to draw each edge (snappy easeIn)
const LOCK_AT    = 100 + (SEGS.length - 1) * STAGGER + SNAP + 180; // ~1970ms
const DONE_AT    = LOCK_AT + 1300;                                   // ~3270ms

// ── Component ─────────────────────────────────────────────────────────────────
const Herosection = () => {
  const [started,    setStarted]    = useState(false);
  const [locked,     setLocked]     = useState(false);
  const [splashDone, setSplashDone] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);

  const skip = () => setSplashDone(true);

  useEffect(() => {
    const ctx = initAudio(audioRef);
    const T: ReturnType<typeof setTimeout>[] = [];

    // Kick off drawing
    T.push(setTimeout(() => setStarted(true), 100));

    // Electric tick per edge
    SEGS.forEach((_, i) => {
      T.push(setTimeout(
        () => { if (ctx) snapTick(ctx, tickPitch(i)); },
        100 + i * STAGGER + 5
      ));
    });

    // Lock-in at the end
    T.push(setTimeout(() => {
      setLocked(true);
      if (ctx) lockSound(ctx);
    }, LOCK_AT));

    // Fade out splash
    T.push(setTimeout(() => setSplashDone(true), DONE_AT));

    return () => T.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          STARTUP SPLASH — outside section to avoid stacking issues
      ══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {!splashDone && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#04040f] overflow-hidden cursor-pointer select-none"
            onClick={skip}
          >
            {/* subtle CRT scanlines */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.15) 2px,rgba(0,0,0,0.15) 4px)',
              }}
            />

            {/* glow bloom — visible only after lock */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(96,165,250,0.15) 50%, transparent 70%)',
                filter: 'blur(55px)',
              }}
              animate={{ opacity: locked ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />

            {/* Logo */}
            <motion.div
              className="relative z-10"
              style={{ border: 'none', outline: 'none', background: 'transparent' }}
              animate={{
                filter: locked
                  ? 'drop-shadow(0 0 12px rgba(59,130,246,0.8)) drop-shadow(0 0 30px rgba(96,165,250,0.4))'
                  : 'none',
              }}
              transition={{ duration: 0.5 }}
            >
              <svg
                width="160"
                height="200"
                viewBox="0 0 152 188"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ overflow: 'visible', display: 'block', border: 'none', outline: 'none', background: 'transparent' }}
              >
                <defs>
                  {/* Gradients in userSpaceOnUse so colour is consistent per position */}
                  <linearGradient id="sn_g1" x1="0" y1="0" x2="152" y2="188" gradientUnits="userSpaceOnUse">
                    <stop offset="0%"   stopColor="#ffffff" />
                    <stop offset="50%"  stopColor="#93c5fd" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                  <linearGradient id="sn_g2" x1="152" y1="0" x2="0" y2="188" gradientUnits="userSpaceOnUse">
                    <stop offset="0%"   stopColor="#e2e8f0" />
                    <stop offset="50%"  stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                </defs>

                {SEGS.map((seg, i) => {
                  const [x1, y1, x2, y2] = seg.coords;
                  return (
                    <motion.path
                      key={i}
                      d={`M ${x1} ${y1} L ${x2} ${y2}`}
                      stroke={seg.grad}
                      strokeWidth={seg.w}
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength: started ? 1 : 0,
                        opacity:    started ? 1 : 0,
                      }}
                      transition={{
                        pathLength: {
                          duration: SNAP / 1000,
                          delay: i * STAGGER / 1000,
                          // [0.75,0,1,1] = slow/still then SLAMS to full — the snap feel
                          ease: [0.75, 0, 1, 1],
                        },
                        opacity: {
                          duration: 0.01,
                          delay: i * STAGGER / 1000,
                        },
                      }}
                    />
                  );
                })}
              </svg>
            </motion.div>

            {/* skip hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.18 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[9px] text-white/30 tracking-[0.25em] pointer-events-none z-10"
            >
              CLICK TO SKIP
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid">
      {/* ══════════════════════════════════════════════════════════
          HERO CONTENT
      ══════════════════════════════════════════════════════════ */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-500/8 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-blue-400/5 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 rounded-full text-sm font-medium glass border border-blue-500/30 text-blue-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Gen AI Engineer · Building production AI systems
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Hi, I am{" "}
              <span className="gradient-text">Rambabu</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-4 mb-8"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-gray-300">
                Gen AI Engineer · Full-Stack Builder
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                I build{" "}
                <span className="text-blue-400 font-medium">AI automation systems</span>,{" "}
                <span className="text-white font-medium">voice agents</span>, and{" "}
                production-grade full-stack apps {" "}
                shipped to real users, not just demos.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="#services">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary group"
                >
                  <span className="flex items-center gap-2">
                    What I Build
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </motion.button>
              </Link>
              <Link href="#contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-secondary"
                >
                  <span className="text-gray-300">Get in Touch</span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-4 mt-8 justify-center lg:justify-start"
            >
              {[
                { href: "https://github.com/rambabu-143", icon: "github" },
                { href: "https://www.linkedin.com/in/rambabuarabandi", icon: "linkedin" },
                { href: "mailto:rambabuarabandi2001@gmail.com", icon: "email" },
              ].map((social) => (
                <motion.a
                  key={social.icon}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-white transition-colors border border-white/10 hover:border-white/30"
                >
                  {social.icon === "github" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  )}
                  {social.icon === "linkedin" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  )}
                  {social.icon === "email" && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:w-1/2 flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-blue-500/20 blur-xl" />
              <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border border-white/10">
                <Image src="/My-portfolio/hero.png" alt="Rambabu" fill className="object-cover" priority />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <span className="text-sm">Scroll to explore</span>
            <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </div>
      </section>
    </>
  );
};

export default Herosection;
