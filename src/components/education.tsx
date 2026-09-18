'use client';
import { motion } from "framer-motion";

const items = [
  {
    duration: "2026",
    title: "Speaking & Teaching",
    description:
      "Speaker at NOVA 2026 (ACM GRIET) on MCP, A2A protocols, and AI-native development. Teaches AI engineering (agentic systems, RAG, and production deployment) to students, professionals, and founders.",
  },
  {
    duration: "2019 - 2023",
    title: "B.Tech, Computer Science Engineering",
    description: "Bharat Institute of Engineering and Technology, Hyderabad",
  },
];

const Education = () => {
  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-12">
        <h2 className="font-display font-semibold text-3xl sm:text-4xl">Speaking & Education</h2>
        <span className="eyebrow hidden sm:block">04</span>
      </div>

      <div className="space-y-5">
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            className="glass rounded-2xl grid sm:grid-cols-[180px_1fr] gap-3 sm:gap-10 p-6 sm:p-8"
          >
            <div className="text-sm text-muted-foreground">{item.duration}</div>
            <div>
              <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
              <p className="text-[15px] leading-relaxed text-foreground/80">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Education;
