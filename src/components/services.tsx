'use client';
import { motion } from "framer-motion";

const services = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: "AI Automation",
    description:
      "Custom LLM pipelines and agentic workflows that eliminate repetitive manual work. From lead processing to document automation I build it production-ready.",
    bullets: ["Multi-step LLM pipelines", "n8n / custom agents", "API integrations", "Reliable fallback handling"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    ),
    title: "Voice AI Agents",
    description:
      "Real-time voice agents with tool-calling, memory, and state. Same stack behind Zaya  a live dealership agent running at Cyepro DMS.",
    bullets: ["Real-time voice interactions", "Tool-using workflows", "CRM / DMS integrations", "Structured output + validation"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: "Full-Stack Web Apps",
    description:
      "End-to-end Next.js / React apps with clean APIs, auth, database, and deployment. Production-quality from day one not just a Figma mockup.",
    bullets: ["Next.js + TypeScript", "Supabase / Firebase / PostgreSQL", "REST & streaming APIs", "Vercel deployment"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Custom GenAI Features",
    description:
      "Integrate AI into your existing product  streaming UX, RAG pipelines, structured outputs, and tool routing. Proven 20–25% reliability improvements on live systems.",
    bullets: ["Streaming UX with fallbacks", "Tool calling + routing", "RAG / vector search", "LangChain · LangGraph · PydanticAI"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 2.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    title: "RAG Systems & MCP Servers",
    description:
      "Build knowledge-grounded AI with RAG pipelines and custom MCP servers that connect your data to LLMs. From vector search to retrieval-augmented generation at scale.",
    bullets: ["RAG pipeline design & build", "Vector DB (Pinecone, pgvector)", "Custom MCP server development", "Knowledge base integrations"],
  },
];

const Services = () => {
  return (
    <section className="w-full py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
          What I Build
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Production AI systems, voice agents, and full-stack apps  shipped to real businesses, not just prototypes.
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-5">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            className="glass rounded-2xl p-6 border border-white/8 hover:border-blue-500/30 transition-all duration-300 group"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 group-hover:bg-blue-500/15 transition-colors">
              {service.icon}
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">{service.description}</p>
            <ul className="space-y-1.5">
              {service.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="w-1 h-1 rounded-full shrink-0 bg-blue-400" />
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-center mt-12"
      >
        <a href="#contact">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary"
          >
            <span className="flex items-center gap-2">
              Get in Touch
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </motion.button>
        </a>
      </motion.div>
    </section>
  );
};

export default Services;
