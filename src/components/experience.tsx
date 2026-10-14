'use client';
import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import Reveal from "./reveal";
export const experiences = [
  {
    company: "Arohak Inc.",
    context: "J&J engagement via Cognizant · Hyderabad, India",
    role: "AI Engineer",
    duration: "Mar 2026 - Sep 2026",
    bullets: [
      "Designed and shipped an internal Go CLI that scaffolds MCP servers end to end (project boilerplate, tool/resource registration, and config wiring), so engineers can stand up a new MCP integration in minutes",
      "Helped build a GraphRAG pipeline for internal knowledge retrieval, combining vector and graph-based retrieval to improve answer quality on complex, multi-hop queries",
      "Built and deployed n8n automation systems: multi-step data pipelines with webhook-driven agent triggers and event-based orchestration that replaced manual handoffs and ran unattended in production",
      "Built an internal HRMS for Arohak from scratch and handed it over to the junior engineers who now own and maintain it",
    ],
  },
  {
    company: "Cyepro Solutions",
    context: "Generative AI Engineer (Contract) · Hyderabad, India",
    role: "US auto dealership DMS platform",
    duration: "Jul 2025 - Feb 2026",
    bullets: [
      "Architected and shipped Zaya, a production real-time voice AI agent handling 500+ daily dealership calls, with a full STT to LLM tool-calling to TTS pipeline on LiveKit Agents, engineered for a sub-400ms latency target",
      "Built multi-tool agentic workflows with dynamic routing, memory-driven conversations, and structured tool contracts",
      "Owned the DMS integration layer: auth flows, webhook handling, and structured data exchange with dealership APIs",
    ],
  },
  {
    company: "Ordermatic Technologies",
    context: "Live restaurant POS product · Hyderabad, India",
    role: "Software Development Engineer",
    duration: "Apr 2024 - Apr 2025",
    bullets: [
      "Shipped full-stack features across billing, CRM, and inventory on a live POS system (React, Node.js/Express)",
      "Reduced production defects through systematic edge-case handling and improved test coverage",
    ],
  },
];

// Mobile timeline: a line draws down the left as you scroll, each job is a card on it, tap to expand.
// (Desktop shows Experience on the laptop screen instead; page.tsx only renders this below lg.)
const Experience = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 55%"] });
  const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-12">
        <h2 className="font-display font-semibold text-3xl sm:text-4xl">Experience</h2>
        <span className="eyebrow hidden sm:block">01</span>
      </div>

      <div ref={ref} className="relative pl-9">
        <div className="absolute left-[9px] top-2 bottom-2 w-px bg-foreground/15" />
        <motion.div
          className="absolute left-[8px] top-2 bottom-2 w-[3px] rounded-full origin-top bg-gradient-to-b from-blue-400 via-violet-400 to-cyan-300 shadow-[0_0_12px_rgba(96,165,250,0.7)]"
          style={{ scaleY: reduce ? 1 : draw }}
        />

        <div className="space-y-5">
          {experiences.map((exp, i) => {
            const isOpen = open === i;
            return (
              <div key={exp.company} className="relative">
                <motion.span
                  className="absolute -left-[34px] top-7 w-[11px] h-[11px] rounded-full bg-background border-2 border-blue-400"
                  initial={reduce ? false : { scale: 0.4, backgroundColor: "rgba(96,165,250,0)" }}
                  whileInView={{ scale: 1, backgroundColor: "rgba(96,165,250,1)", boxShadow: "0 0 14px rgba(96,165,250,0.9)" }}
                  viewport={{ margin: "0px 0px -40% 0px" }}
                  transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
                />
                <Reveal delay={i * 0.06} className="glass rounded-3xl">
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-5 flex items-start gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-muted-foreground mb-1">{exp.duration}</div>
                      <h3 className="text-lg font-semibold leading-snug">{exp.role} · {exp.company}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{exp.context}</p>
                    </div>
                    <motion.svg
                      className="w-5 h-5 mt-1 shrink-0 text-muted-foreground"
                      fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                    className="overflow-hidden"
                  >
                    <ul className="space-y-2.5 px-5 pb-5">
                      {exp.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-foreground/80">
                          <span className="mt-2.5 w-1 h-1 rounded-full bg-muted-foreground shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Experience;
