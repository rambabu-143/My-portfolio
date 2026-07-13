'use client';
import { motion } from "framer-motion";

const experiences = [
  {
    company: "Arohak Inc. (via Cognizant, J&J)",
    role: "AI Engineer and Solutions Architect",
    duration: "Mar 2026 - Present",
    description:
      "Designed the end-to-end architecture for a secure enterprise RAG pipeline retrieval strategy, schema validation, structured output contracts, and multi-stage document workflows. Defined reusable agent architecture standards (tool contracts, output validation, prompt structure) and built n8n automation workflows with webhook-driven agent triggers. Led technical hiring for GenAI engineer roles and mentored junior engineers on production-readiness.",
    highlights: [
      "Enterprise RAG Architecture",
      "Agent Design Standards",
      "n8n Automation",
      "Technical Hiring & Mentoring",
    ],
    color: "amber",
  },
  {
    company: "Cyepro Solutions",
    role: "Generative AI Engineer",
    duration: "Jul 2025 - Feb 2026",
    description:
      "Architected and shipped Zaya, a production real-time voice AI agent for a US auto dealership DMS platform, handling 500+ daily customer interactions. Designed the full voice pipeline STT ingestion, LLM tool-calling, TTS delivery, real-time turn management on LiveKit Agents. Built multi-tool agentic workflows with dynamic routing and memory-driven conversations, plus resilience patterns (timeouts, retries, fallback routing) and the full DMS integration layer.",
    highlights: [
      "Zaya Voice Agent · 500+ daily calls",
      "LiveKit Agents · LangGraph",
      "FastAPI · Supabase · Vercel AI SDK",
      "DMS Integration & Resilience",
    ],
    color: "cyan",
  },
  {
    company: "Ordermatic Technologies",
    role: "Software Development Engineer II",
    duration: "Apr 2024 - Mar 2025",
    description:
      "Contributed full-stack to a live restaurant POS system across billing, CRM, and inventory React frontend and Node.js/Express backend. Reduced production defects by 10% through systematic edge-case handling and improved test coverage across core billing flows.",
    highlights: [
      "Full-stack development",
      "POS Product",
      "10% defect reduction",
      "React · Node.js/Express",
    ],
    color: "pink",
  },
];

const colorMap: Record<string, {
  dot: string;
  badge: string;
  badgeText: string;
  role: string;
  highlight: string;
  highlightText: string;
  leftBorder: string;
  cardBorder: string;
}> = {
  amber:  { dot: "bg-white/60", badge: "bg-white/8",  badgeText: "text-white/60", role: "text-white/60", highlight: "bg-white/8",  highlightText: "text-white/60", leftBorder: "border-l-white/25", cardBorder: "border-white/8 hover:border-white/20" },
  cyan:   { dot: "bg-white/60", badge: "bg-white/8",  badgeText: "text-white/60", role: "text-white/60", highlight: "bg-white/8",  highlightText: "text-white/60", leftBorder: "border-l-white/25", cardBorder: "border-white/8 hover:border-white/20" },
  violet: { dot: "bg-white/60", badge: "bg-white/8",  badgeText: "text-white/60", role: "text-white/60", highlight: "bg-white/8",  highlightText: "text-white/60", leftBorder: "border-l-white/25", cardBorder: "border-white/8 hover:border-white/20" },
  pink:   { dot: "bg-white/60", badge: "bg-white/8",  badgeText: "text-white/60", role: "text-white/60", highlight: "bg-white/8",  highlightText: "text-white/60", leftBorder: "border-l-white/25", cardBorder: "border-white/8 hover:border-white/20" },
  teal:   { dot: "bg-white/60", badge: "bg-white/8",  badgeText: "text-white/60", role: "text-white/60", highlight: "bg-white/8",  highlightText: "text-white/60", leftBorder: "border-l-white/25", cardBorder: "border-white/8 hover:border-white/20" },
};

const Experience = () => {
  return (
    <div className="w-full py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Experience
        </h2>
        <p className="text-white/50 max-w-xl mx-auto">
          My professional journey in GenAI and full-stack development
        </p>
      </motion.div>

      <div className="relative max-w-3xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/30 via-white/10 to-transparent transform md:-translate-x-1/2 hidden md:block" />

        {experiences.map((experience, index) => {
          const cfg = colorMap[experience.color] ?? colorMap.violet;
          return (
            <motion.div
              key={experience.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className={`relative flex flex-col md:flex-row items-start gap-6 mb-8 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <div className={`absolute left-0 md:left-1/2 w-3 h-3 rounded-full border-2 border-black transform -translate-x-1/2 z-10 hidden md:block shadow-lg ${cfg.dot}`} />

              {/* Content */}
              <div className={`flex-1 pl-6 md:pl-0 ${index % 2 === 0 ? "md:pr-10 md:text-right" : "md:pl-10 md:text-left"}`}>
                <div className={`glass rounded-xl p-5 border-l-2 border ${cfg.leftBorder} ${cfg.cardBorder} transition-all duration-300`}>
                  {/* Duration badge */}
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${cfg.badge} ${cfg.badgeText}`}>
                    {experience.duration}
                  </span>

                  <h3 className="text-lg font-bold text-white mb-1">
                    {experience.company}
                  </h3>
                  <h4 className={`text-sm font-semibold mb-3 ${cfg.role}`}>
                    {experience.role}
                  </h4>

                  <p className="text-white/50 text-sm leading-relaxed mb-3">
                    {experience.description}
                  </p>

                  <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                    {experience.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${cfg.highlight} ${cfg.highlightText}`}
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="hidden md:block flex-1" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Experience;
