import { Hub } from "./ui/hairline";

// Plain visible about text so search engines and AI answer engines can quote it. No FAQPage markup: questions are not shown.
const about = [
  "I'm Rambabu Arabandi, an AI Engineer in Hyderabad, India. I build AI that works in production: voice agents, GraphRAG retrieval workflows and MCP developer tooling, on a full-stack background in Next.js, TypeScript, Python (FastAPI) and Go.",
  "Zaya, a voice agent I built, answers 500+ calls a day for a US auto dealership. I also built a GraphRAG pipeline that combines vector search with graph traversal, evaluated with RAGAS and DeepEval, and a Go CLI that scaffolds runnable MCP servers in one command.",
  "I've worked at Arohak (on a Johnson & Johnson engagement via Cognizant), Cyepro Solutions, Ordermatic Technologies and Gymclan Fitness Services. I spoke at NOVA 2026 (ACM GRIET) on MCP and A2A protocols, and I'm open to AI Engineer roles.",
];

const Faq = () => (
  <div className="w-full">
    <div className="flex items-baseline justify-between mb-8">
      <h2 className="font-display font-semibold text-3xl sm:text-4xl">About</h2>
      <span className="eyebrow hidden sm:block">06</span>
    </div>
    <div className="grid gap-10 md:grid-cols-[1fr_minmax(0,22rem)] items-center">
      <div className="max-w-3xl space-y-4 text-[15px] sm:text-base leading-relaxed text-foreground/80">
        {about.map((t) => <p key={t}>{t}</p>)}
      </div>
      <div className="glass rounded-3xl p-6 w-full max-w-sm mx-auto" aria-hidden="true"><Hub /></div>
    </div>
  </div>
);

export default Faq;
