'use client';
import { motion } from "framer-motion";

const experiences = [
  {
    company: "Arohak Inc.",
    context: "J&J engagement via Cognizant · Hyderabad, India",
    role: "AI Engineer",
    duration: "Mar 2026 - Present",
    bullets: [
      "Designed and shipped an internal Go CLI that scaffolds MCP servers end to end (project boilerplate, tool/resource registration, and config wiring), so engineers can stand up a new MCP integration in minutes",
      "Helped build a GraphRAG pipeline for internal knowledge retrieval, combining vector and graph-based retrieval to improve answer quality on complex, multi-hop queries",
      "Built and deployed n8n automation systems: multi-step data pipelines with webhook-driven agent triggers and event-based orchestration that replaced manual handoffs and ran unattended in production",
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

const Experience = () => {
  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-12">
        <h2 className="font-display font-semibold text-3xl sm:text-4xl">Experience</h2>
        <span className="eyebrow hidden sm:block">01</span>
      </div>

      <div className="space-y-5">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            className="glass rounded-2xl grid sm:grid-cols-[180px_1fr] gap-3 sm:gap-10 p-6 sm:p-8"
          >
            <div className="text-sm text-muted-foreground">{exp.duration}</div>

            <div>
              <h3 className="text-lg font-semibold mb-0.5">
                {exp.role} · {exp.company}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{exp.context}</p>
              <ul className="space-y-2.5">
                {exp.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-foreground/80">
                    <span className="mt-2.5 w-1 h-1 rounded-full bg-muted-foreground shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
