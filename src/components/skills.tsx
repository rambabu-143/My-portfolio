'use client';
import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "Python", level: 90 },
      { name: "TypeScript", level: 88 },
      { name: "JavaScript", level: 90 },
    ],
  },
  {
    title: "Agentic/GenAI",
    skills: [
      { name: "Vercel AI SDK", level: 85 },
      { name: "Mastra AI", level: 85 },
      { name: "LangChain", level: 80 },
      { name: "LangGraph", level: 80 },
      { name: "PydanticAI", level: 75 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 85 },
      { name: "FastAPI", level: 80 },
      { name: "REST APIs", level: 90 },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 88 },
      { name: "Tailwind CSS", level: 92 },
      { name: "React Native", level: 75 },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "PostgreSQL", level: 80 },
      { name: "Supabase", level: 82 },
      { name: "Firebase", level: 85 },
      { name: "MongoDB", level: 78 },
    ],
  },
  {
    title: "DevOps",
    skills: [
      { name: "Docker", level: 75 },
      { name: "Vercel", level: 90 },
      { name: "Git", level: 88 },
      { name: "Kubernetes", level: 50 },
    ],
  },
];

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

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, catIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: catIndex * 0.05, duration: 0.4 }}
            className="glass rounded-xl p-5 border border-white/10"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              {category.title}
            </h3>
            <div className="space-y-3">
              {category.skills.map((skill, skillIndex) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{skill.name}</span>
                    <span className="text-gray-500">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 bg-background rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: skillIndex * 0.03 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Currently Learning */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-center mt-10"
      >
        <div className="inline-flex items-center gap-3 glass px-5 py-3 rounded-full border border-white/10">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-gray-400 text-sm">
            Currently Learning: <span className="text-white font-medium">Kubernetes</span> (deployments, services, scaling)
          </span>
        </div>
      </motion.div>
    </section>
  );
}