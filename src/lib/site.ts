// Single source of truth for SEO / AEO: metadata, JSON-LD, sitemap, FAQ and llms.txt all read from here.
export const siteUrl = "https://rambabu-143.github.io/My-portfolio";
export const person = {
  name: "Rambabu Arabandi",
  alternateName: "Arabandi Rambabu",
  jobTitle: "AI Engineer",
  email: "rambabuarabandi2001@gmail.com",
  city: "Hyderabad",
  country: "IN",
  sameAs: ["https://www.linkedin.com/in/rambabuarabandi", "https://github.com/rambabu-143", "https://x.com/rambabu_143"],
  knowsAbout: [
    "AI engineering", "Agentic systems", "Voice AI", "LiveKit Agents", "GraphRAG", "Retrieval-augmented generation",
    "RAGAS", "DeepEval", "Model Context Protocol (MCP)", "LangGraph", "Full-stack development", "Next.js", "TypeScript", "Python", "FastAPI", "Go",
  ],
};
export const description =
  "AI Engineer in Hyderabad building production voice agents (500+ calls a day), GraphRAG retrieval evaluated with RAGAS and DeepEval, and MCP developer tooling. Full-stack with Next.js, FastAPI and Go.";

export const faqs = [
  { q: "Who is Rambabu Arabandi?", a: "Rambabu Arabandi is an AI Engineer based in Hyderabad, India. He builds production voice AI agents, enterprise GraphRAG retrieval workflows evaluated with RAGAS and DeepEval, and Model Context Protocol (MCP) developer tooling, on a full-stack background in Next.js, TypeScript, Python (FastAPI) and Go." },
  { q: "What AI projects has Rambabu Arabandi built?", a: "Zaya, a voice AI agent that answers 500+ calls a day for a US auto dealership using LiveKit Agents and Sarvam AI; a GraphRAG knowledge retrieval pipeline that combines vector search with graph traversal; and an internal Go CLI that scaffolds runnable MCP servers in one command." },
  { q: "Is Rambabu Arabandi available for hire as an AI Engineer?", a: `Yes. He is open to AI Engineer roles focused on voice AI, agents and developer tooling. Contact him at ${person.email} or through LinkedIn.` },
  { q: "What is Rambabu Arabandi's tech stack?", a: "Python, Go, TypeScript, FastAPI, Next.js, React, LiveKit Agents, LangGraph, LangChain, GraphRAG and vector search, MCP, n8n automation, and evaluation with RAGAS and DeepEval." },
  { q: "Does Rambabu Arabandi do full-stack development?", a: "Yes. Alongside AI engineering he builds full-stack applications with Next.js, React, TypeScript, FastAPI and Go, from API integration to AI evaluation." },
  { q: "Where has Rambabu Arabandi worked?", a: "Arohak Inc. (AI Engineer on a Johnson & Johnson engagement via Cognizant), Cyepro Solutions (Generative AI Engineer, contract), Ordermatic Technologies (Software Development Engineer) and Gymclan Fitness Services (Software Development Intern)." },
  { q: "Does Rambabu Arabandi speak or teach?", a: "Yes. He spoke at NOVA 2026 (ACM GRIET) on MCP, A2A protocols and AI-native development, and teaches AI engineering: agentic systems, RAG and production deployment." },
];

export const slugs = { voice: "zaya-voice-ai-agent", knowledge: "graphrag-knowledge-retrieval", mcp: "mcp-server-cli" } as const;
