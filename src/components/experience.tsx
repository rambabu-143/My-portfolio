'use client';
import { motion } from "framer-motion";

const experiences = [
  {
    company: "Arohak.inc",
    role: "Gen AI Engineer",
    duration: "Mar 2026 - Present",
    description:
      "Building production-ready Gen AI systems and automation workflows. Designing and shipping AI-powered features, LLM pipelines, and agentic tools that drive real business outcomes.",
    highlights: [
      "Gen AI Engineering",
      "AI Automation",
      "Production LLM Systems",
      "Current Role",
    ],
    color: "amber",
  },
  {
    company: "Cyepro Solutions",
    role: "Contract GenAI & Backend Engineer",
    duration: "Jul 2025 - Feb 2026",
    description:
      "Built and shipped Zaya, a real-time dealership voice agent integrated into Cyepro DMS. Implemented tool-using agent workflows with routing, state, and memory-driven steps. Designed structured tool contracts with validation and fallback handling, reducing tool failure cases by 25%.",
    highlights: [
      "Zaya Voice Agent (Beta)",
      "Vercel AI SDK · LangGraph",
      "FastAPI · Supabase · Node.js",
      "25% reduction in failures",
    ],
    color: "cyan",
  },
  {
    company: "Genie AI",
    role: "GenAI Developer / Product-focused Engineer",
    duration: "Apr 2025 - Jun 2025",
    description:
      "Built agentic product features including routing, tool calling, and structured outputs for production workflows. Implemented streaming UX patterns with timeouts and fallback states, reducing timeouts by 20%.",
    highlights: [
      "Agentic features",
      "Streaming UX",
      "20% timeout reduction",
      "Clean API contracts",
    ],
    color: "violet",
  },
  {
    company: "Ordermatic Technologies",
    role: "Software Development Engineer II",
    duration: "Apr 2024 - Mar 2025",
    description:
      "Worked on a live restaurant POS product across billing, CRM, inventory, reporting, and payments. Delivered full-stack features and supported production releases, bug fixes, and stability improvements. Reduced repeated defects by 10% through improved edge-case handling.",
    highlights: [
      "Full-stack development",
      "POS Product",
      "10% defect reduction",
      "Production releases",
    ],
    color: "pink",
  },
  {
    company: "Gymclan Health & Fitness",
    role: "Software Development Engineer Intern",
    duration: "Jan 2024 - Mar 2024",
    description:
      "Built UI screens and backend flows. Contributed to production-oriented development and releases.",
    highlights: [
      "UI development",
      "Backend flows",
      "Production releases",
    ],
    color: "teal",
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
  amber:  { dot: "bg-amber-400",   badge: "bg-amber-500/12",   badgeText: "text-amber-300",   role: "text-amber-400",   highlight: "bg-amber-500/10",   highlightText: "text-amber-300",   leftBorder: "border-l-amber-500/55",   cardBorder: "border-amber-500/15 hover:border-amber-500/30"   },
  cyan:   { dot: "bg-cyan-400",    badge: "bg-cyan-500/12",    badgeText: "text-cyan-300",    role: "text-cyan-400",    highlight: "bg-cyan-500/10",    highlightText: "text-cyan-300",    leftBorder: "border-l-cyan-500/55",    cardBorder: "border-cyan-500/15 hover:border-cyan-500/30"    },
  violet: { dot: "bg-violet-400",  badge: "bg-violet-500/12",  badgeText: "text-violet-300",  role: "text-violet-400",  highlight: "bg-violet-500/10",  highlightText: "text-violet-300",  leftBorder: "border-l-violet-500/55",  cardBorder: "border-violet-500/15 hover:border-violet-500/30"  },
  pink:   { dot: "bg-pink-400",    badge: "bg-pink-500/12",    badgeText: "text-pink-300",    role: "text-pink-400",    highlight: "bg-pink-500/10",    highlightText: "text-pink-300",    leftBorder: "border-l-pink-500/55",    cardBorder: "border-pink-500/15 hover:border-pink-500/30"    },
  teal:   { dot: "bg-teal-400",    badge: "bg-teal-500/12",    badgeText: "text-teal-300",    role: "text-teal-400",    highlight: "bg-teal-500/10",    highlightText: "text-teal-300",    leftBorder: "border-l-teal-500/55",    cardBorder: "border-teal-500/15 hover:border-teal-500/30"    },
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
        <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
          Experience
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          My professional journey in GenAI and full-stack development
        </p>
      </motion.div>

      <div className="relative max-w-3xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/60 via-violet-500/20 to-transparent transform md:-translate-x-1/2 hidden md:block" />

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
              <div className={`absolute left-0 md:left-1/2 w-3 h-3 rounded-full border-2 border-[#06060e] transform -translate-x-1/2 z-10 hidden md:block shadow-lg ${cfg.dot}`} />

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

                  <p className="text-gray-400 text-sm leading-relaxed mb-3">
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
