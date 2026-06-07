'use client';
import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Languages",
    skills: ["Python", "TypeScript", "JavaScript"],
    color: "sky",
  },
  {
    title: "Agentic / GenAI",
    skills: ["Vercel AI SDK", "Mastra AI", "LangChain", "LangGraph", "PydanticAI", "MCP Servers", "RAG Systems"],
    color: "violet",
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "FastAPI", "REST APIs"],
    color: "emerald",
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "React Native"],
    color: "cyan",
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "Supabase", "Firebase", "MongoDB"],
    color: "amber",
  },
  {
    title: "DevOps",
    skills: ["Docker", "Vercel", "Git"],
    color: "pink",
  },
  {
    title: "Automations",
    skills: ["n8n", "Make.com", "Zapier"],
    color: "orange",
  },
];

const colorConfig: Record<string, {
  dot: string;
  title: string;
  leftBorder: string;
  pillHover: string;
  cardBorder: string;
}> = {
  sky:     { dot: "bg-white/60", title: "text-white/70", leftBorder: "border-l-white/25", pillHover: "hover:border-white/30 hover:text-white", cardBorder: "border-white/8 hover:border-white/20" },
  violet:  { dot: "bg-white/60", title: "text-white/70", leftBorder: "border-l-white/25", pillHover: "hover:border-white/30 hover:text-white", cardBorder: "border-white/8 hover:border-white/20" },
  emerald: { dot: "bg-white/60", title: "text-white/70", leftBorder: "border-l-white/25", pillHover: "hover:border-white/30 hover:text-white", cardBorder: "border-white/8 hover:border-white/20" },
  cyan:    { dot: "bg-white/60", title: "text-white/70", leftBorder: "border-l-white/25", pillHover: "hover:border-white/30 hover:text-white", cardBorder: "border-white/8 hover:border-white/20" },
  amber:   { dot: "bg-white/60", title: "text-white/70", leftBorder: "border-l-white/25", pillHover: "hover:border-white/30 hover:text-white", cardBorder: "border-white/8 hover:border-white/20" },
  pink:    { dot: "bg-white/60", title: "text-white/70", leftBorder: "border-l-white/25", pillHover: "hover:border-white/30 hover:text-white", cardBorder: "border-white/8 hover:border-white/20" },
  orange:  { dot: "bg-white/60", title: "text-white/70", leftBorder: "border-l-white/25", pillHover: "hover:border-white/30 hover:text-white", cardBorder: "border-white/8 hover:border-white/20" },
};

export default function Skills() {
  return (
    <section className="w-full py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Core Skills
        </h2>
        <p className="text-white/50 max-w-xl mx-auto">
          Production-grade expertise in GenAI, full-stack development, and modern tooling.
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {skillCategories.map((category, catIndex) => {
          const cfg = colorConfig[category.color];
          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: catIndex * 0.05, duration: 0.4 }}
              className={`glass rounded-xl p-5 border-l-2 border ${cfg.leftBorder} ${cfg.cardBorder} transition-all duration-300`}
            >
              <h3 className={`text-sm font-semibold mb-4 flex items-center gap-2 uppercase tracking-wider ${cfg.title}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1.5 text-sm text-gray-400 bg-white/4 border border-white/8 rounded-lg transition-all duration-200 cursor-default ${cfg.pillHover}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-center mt-10"
      >
        <div className="inline-flex items-center gap-3 glass px-5 py-3 rounded-full border border-white/10">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-white/50 text-sm">
            Currently deep in: <span className="text-white font-medium">AI Agents</span>, multi-agent systems, and voice AI pipelines
          </span>
        </div>
      </motion.div>
    </section>
  );
}
