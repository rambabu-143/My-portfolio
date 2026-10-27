'use client';
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import HeroTeardown from "./hero-teardown";

const FOCUS_AREAS = ["Agentic systems", "MCP tooling", "GraphRAG & evaluation", "Voice AI", "Full-stack"];

const STATS = [["500+", "daily calls on a production voice agent"], ["End to end", "from API integration to AI evaluation"]];

const SOCIALS = [
  { href: "https://github.com/rambabu-143", label: "GitHub", icon: "github" },
  { href: "https://www.linkedin.com/in/rambabuarabandi", label: "LinkedIn", icon: "linkedin" },
  { href: "mailto:rambabuarabandi2001@gmail.com", label: "Email", icon: "email" },
];

const spring = { type: "spring", bounce: 0, duration: 0.7 } as const;

const Herosection = () => {
  return (
    <div className="sticky top-0 flex items-start lg:items-center h-screen pt-20 pb-6 lg:pt-24 overflow-hidden">
      <HeroTeardown />
      <div className="w-full px-6 lg:px-14 relative z-10 pointer-events-none">
        <div className="grid gap-16 items-center">
          <div className="hero-copy pointer-events-auto lg:w-1/2 flex justify-center" style={{ opacity: "calc(1 - var(--hp, 0) * 9)", transform: "translateY(calc(var(--hp, 0) * -120px))" }}>
          <motion.div
            className="w-full max-w-[600px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring}
          >
            <div className="flex items-center gap-3 mb-7">
              <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/hero.jpg`} alt="Rambabu Arabandi" width={44} height={44} className="w-11 h-11 rounded-full object-cover grayscale border border-[color:var(--glass-border)]" priority />
              <p className="eyebrow !text-[11px] sm:!text-xs !tracking-[0.1em] sm:!tracking-[0.16em]">AI Engineer · Hyderabad, India</p>
            </div>

            <p className="text-sm text-muted-foreground mb-5">Open to AI Engineer roles · Voice AI, agents & developer tooling</p>
            <h1 className="display mb-7 !text-[clamp(3rem,7.4vw,5.75rem)]">
              Rambabu Arabandi
            </h1>

            <p className="sr-only sm:not-sr-only sm:!mb-6 text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed tracking-[-0.01em]">
              I build <span className="text-foreground font-medium">AI that works in production</span>: voice agents handling 500+ daily calls,
              MCP developer tools, and enterprise GraphRAG workflows evaluated with RAGAS and DeepEval.
            </p>

            <div className="sr-only sm:not-sr-only sm:flex sm:!mb-7 flex-wrap gap-2.5">
              {FOCUS_AREAS.map((area) => (
                <span key={area} className="glass-tight px-3.5 py-1.5 rounded-full text-sm text-foreground/75">
                  {area}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="#work" className="btn-primary">
                Explore projects
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="#contact" className="btn-secondary">
                Contact me
              </Link>
              <a
                href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/resume.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                View resume
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
                </svg>
              </a>

              <div className="flex items-center gap-1 ml-2">
                {SOCIALS.map((social) => (
                  <a
                    key={social.icon}
                    href={social.href}
                    target={social.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-foreground/5 active:scale-90 transition-all duration-200"
                  >
                    {social.icon === "github" && (
                      <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    )}
                    {social.icon === "linkedin" && (
                      <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    )}
                    {social.icon === "email" && (
                      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>

            <dl className="sr-only sm:not-sr-only sm:!mt-7 sm:flex gap-10 border-t border-[color:var(--glass-border)] pt-5">
              {STATS.map(([v, l]) => (
                <div key={l}>
                  <dt className="font-display text-3xl font-semibold tracking-tight">{v}</dt>
                  <dd className="eyebrow mt-1 !normal-case !tracking-normal">{l}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Herosection;
