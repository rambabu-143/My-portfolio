'use client';
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

const Herosection = () => {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid">
      {/* Logo Startup Animation */}
      <AnimatePresence>
        {showLogo && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 50, 
                damping: 20,
                duration: 2.5 
              }}
              className="relative"
            >
              {/* Glow effect behind logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 blur-3xl"
              >
                <div className="w-full h-full bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-pink-500/50 rounded-full scale-150" />
              </motion.div>

              {/* Logo SVG */}
              <motion.svg 
                width="140" 
                height="175" 
                viewBox="0 0 152 188" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10"
              >
                <motion.g clipPath="url(#clip0_2007_3)">
                  <motion.path 
                    d="M125 101.5V35.5L58.5 0L0 35.5L125 101.5ZM125 101.5L98 122.5M98 122.5L146 152L114 173L58.5 144.5L0 181.5V110L31.5 88L98 122.5Z" 
                    stroke="url(#gradient1)" 
                    strokeWidth="4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                  />
                  <motion.path 
                    d="M27 86L27 152L93.5 187.5L152 152L27 86ZM27 86L54 65M54 65L6 35.5L38 14.5L93.5 43L152 6L152 77.5L120.5 99.5L54 65Z" 
                    stroke="url(#gradient2)" 
                    strokeWidth="3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
                  />
                </motion.g>
                <defs>
                  <clipPath id="clip0_2007_3">
                    <rect width="152" height="187.5" fill="white"/>
                  </clipPath>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="50%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#f472b6" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Simplified background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.5 }}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 rounded-full text-sm font-medium glass border border-cyan-500/30 text-cyan-400">
                ✨ Available for opportunities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.7 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Hi, I am{" "}
              <span className="gradient-text">Rambabu</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8 }}
              className="space-y-4 mb-8"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-gray-300">
                GenAI Developer | Full-Stack Engineer
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                Building production agentic features using{" "}
                <span className="text-cyan-400 font-medium">Vercel AI SDK</span> and{" "}
                <span className="text-purple-400 font-medium">Mastra AI</span>. 
                Specialized in tool calling, routing, structured outputs, and streaming UX 
                with reliability patterns.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="#contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary group"
                >
                  <span className="flex items-center gap-2">
                    Get in Touch
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </motion.button>
              </Link>
              <Link href="#projects">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-secondary"
                >
                  <span className="text-gray-300">View Projects</span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
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
                  className="w-12 h-12 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-colors border border-white/10 hover:border-cyan-500/50"
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
            transition={{ duration: 0.5, delay: 2.5 }}
            className="lg:w-1/2 flex justify-center"
          >
            <div className="relative">
              {/* Gradient border */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-50 blur-sm" />

              {/* Profile image container */}
              <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-background">
                <Image
                  src="./hero.png"
                  alt="Rambabu"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 3 }}
                className="absolute -top-4 -right-4 glass px-4 py-2 rounded-xl border border-cyan-500/30"
              >
                <span className="text-cyan-400 font-semibold text-sm">GenAI</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 3.1 }}
                className="absolute top-1/2 -left-8 glass px-4 py-2 rounded-xl border border-purple-500/30"
              >
                <span className="text-purple-400 font-semibold text-sm">Next.js</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 3.2 }}
                className="absolute -bottom-4 right:8 glass px-4 py-2 rounded-xl border border-pink-500/30"
              >
                <span className="text-pink-400 font-semibold text-sm">Python</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
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
  );
};

export default Herosection;