'use client';
import { motion } from "framer-motion";

const experiences = [
  {
    company: "Cyepro Solutions",
    role: "Contract GenAI & Backend Engineer",
    duration: "Jul 2025 - Feb 2026",
    description:
      "Built and shipped Zaya, a real-time dealership voice agent integrated into Cyepro DMS. Implemented tool-using agent workflows with routing, state, and memory-driven steps. Designed structured tool contracts with validation and fallback handling, reducing tool failure cases by 25%.",
    highlights: [
      "Zaya Voice Agent (Beta)",
      "Vercel AI SDK + Mastra AI",
      "25% reduction in failures",
      "Production APIs",
    ],
    color: "cyan",
  },
  {
    company: "Genie AI",
    role: "GenAI Developer / Product-focused Engineer",
    duration: "Apr 2025 - Jul 2025",
    description:
      "Built agentic product features including routing, tool calling, and structured outputs for production workflows. Implemented streaming UX patterns with timeouts and fallback states, reducing timeouts by 20%.",
    highlights: [
      "Agentic features",
      "Streaming UX",
      "20% timeout reduction",
      "Clean API contracts",
    ],
    color: "purple",
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

const Experience = () => {
  return (
    <div className="w-full py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
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
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 transform md:-translate-x-1/2 hidden md:block" />

        {experiences.map((experience, index) => (
          <motion.div
            key={experience.company}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className={`relative flex flex-col md:flex-row items-start gap-6 mb-8 ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Timeline dot */}
            <div className={`absolute left-0 md:left-1/2 w-3 h-3 rounded-full transform -translate-x-1/2 z-10 hidden md:block ${
              experience.color === "cyan"
                ? "bg-cyan-500"
                : experience.color === "purple"
                ? "bg-purple-500"
                : experience.color === "pink"
                ? "bg-pink-500"
                : "bg-teal-500"
            }`} />

            {/* Content */}
            <div className={`flex-1 pl-6 md:pl-0 ${index % 2 === 0 ? "md:pr-10 md:text-right" : "md:pl-10 md:text-left"}`}>
              <div className="glass rounded-xl p-5 border border-white/10 hover:border-white/20 transition-colors">
                {/* Duration badge */}
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                  experience.color === "cyan"
                    ? "bg-cyan-500/20 text-cyan-400"
                    : experience.color === "purple"
                    ? "bg-purple-500/20 text-purple-400"
                    : experience.color === "pink"
                    ? "bg-pink-500/20 text-pink-400"
                    : "bg-teal-500/20 text-teal-400"
                }`}>
                  {experience.duration}
                </span>

                <h3 className="text-lg font-bold text-white mb-1">
                  {experience.company}
                </h3>
                <h4 className={`text-sm font-semibold mb-2 ${
                  experience.color === "cyan"
                    ? "text-cyan-400"
                    : experience.color === "purple"
                    ? "text-purple-400"
                    : experience.color === "pink"
                    ? "text-pink-400"
                    : "text-teal-400"
                }`}>
                  {experience.role}
                </h4>

                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                  {experience.description}
                </p>

                {/* Highlights */}
                <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                  {experience.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        experience.color === "cyan"
                          ? "bg-cyan-500/10 text-cyan-300"
                          : experience.color === "purple"
                          ? "bg-purple-500/10 text-purple-300"
                          : experience.color === "pink"
                          ? "bg-pink-500/10 text-pink-300"
                          : "bg-teal-500/10 text-teal-300"
                      }`}
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Empty space for alignment */}
            <div className="hidden md:block flex-1" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Experience;