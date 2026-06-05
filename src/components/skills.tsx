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
  sky:     { dot: "bg-sky-400",     title: "text-sky-400",     leftBorder: "border-l-sky-500/50",     pillHover: "hover:border-sky-500/40 hover:text-sky-300",     cardBorder: "border-sky-500/10 hover:border-sky-500/25"     },
  violet:  { dot: "bg-violet-400",  title: "text-violet-400",  leftBorder: "border-l-violet-500/50",  pillHover: "hover:border-violet-500/40 hover:text-violet-300",  cardBorder: "border-violet-500/10 hover:border-violet-500/25"  },
  emerald: { dot: "bg-emerald-400", title: "text-emerald-400", leftBorder: "border-l-emerald-500/50", pillHover: "hover:border-emerald-500/40 hover:text-emerald-300", cardBorder: "border-emerald-500/10 hover:border-emerald-500/25" },
  cyan:    { dot: "bg-cyan-400",    title: "text-cyan-400",    leftBorder: "border-l-cyan-500/50",    pillHover: "hover:border-cyan-500/40 hover:text-cyan-300",    cardBorder: "border-cyan-500/10 hover:border-cyan-500/25"    },
  amber:   { dot: "bg-amber-400",   title: "text-amber-400",   leftBorder: "border-l-amber-500/50",   pillHover: "hover:border-amber-500/40 hover:text-amber-300",   cardBorder: "border-amber-500/10 hover:border-amber-500/25"   },
  pink:    { dot: "bg-pink-400",    title: "text-pink-400",    leftBorder: "border-l-pink-500/50",    pillHover: "hover:border-pink-500/40 hover:text-pink-300",    cardBorder: "border-pink-500/10 hover:border-pink-500/25"    },
  orange:  { dot: "bg-orange-400",  title: "text-orange-400",  leftBorder: "border-l-orange-500/50",  pillHover: "hover:border-orange-500/40 hover:text-orange-300",  cardBorder: "border-orange-500/10 hover:border-orange-500/25"  },
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
        <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
          Core Skills
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">
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
        <div className="inline-flex items-center gap-3 glass px-5 py-3 rounded-full border border-violet-500/15">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-gray-400 text-sm">
            Currently deep in: <span className="text-white font-medium">AI Agents</span>, multi-agent systems, and voice AI pipelines
          </span>
        </div>
      </motion.div>
    </section>
  );
}
