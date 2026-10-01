'use client';
import Reveal from "./reveal";

const skillCategories = [
  { title: "AI & Agents", skills: ["LLM Integrations", "Prompt Engineering", "Tool Calling", "Agent Orchestration", "Structured Outputs", "Guardrails", "Multi-Agent Systems"] },
  { title: "MCP, Tooling & Automation", skills: ["MCP Servers", "CLI Tooling", "n8n Workflows", "Webhook-Driven Pipelines", "Event-Based Orchestration", "API Integration"] },
  { title: "Voice AI", skills: ["LiveKit Agents", "Sarvam AI", "Real-time STT/TTS", "Low-Latency Voice", "Turn Management"] },
  { title: "RAG & Retrieval", skills: ["Hybrid Retrieval", "BM25", "Vector Search", "Graph Retrieval", "FalkorDB", "RRF Fusion", "Cross-Encoder Reranking"] },
  { title: "AI Frameworks", skills: ["LangChain", "LangGraph", "Vercel AI SDK", "Claude Code", "Cursor"] },
  { title: "Full-Stack", skills: ["FastAPI", "Node.js/Express", "REST APIs", "Webhooks", "Next.js", "React", "Tailwind CSS"] },
  { title: "Data, Cloud & DevOps", skills: ["PostgreSQL", "Supabase", "AWS", "GCP", "Docker", "Vercel", "Git"] },
  { title: "Languages", skills: ["Python", "TypeScript", "JavaScript"] },
];

export default function Skills() {
  return (
    <section className="w-full">
      <div className="flex items-baseline justify-between mb-12">
        <h2 className="font-display font-semibold text-3xl sm:text-4xl">Skills</h2>
        <span className="eyebrow hidden sm:block">03</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {skillCategories.map((category, index) => (
          <Reveal key={category.title} delay={index * 0.04} className="glass rounded-3xl p-6">
            <h3 className="eyebrow mb-3">{category.title}</h3>
            <div className="flex flex-wrap gap-1.5">
              {category.skills.map((skill) => (
                <span key={skill} className="text-xs chip rounded-full px-2.5 py-1">
                  {skill}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
