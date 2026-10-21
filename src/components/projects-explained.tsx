'use client';
import dynamic from "next/dynamic";
import Reveal from "./reveal";

const Zaya = dynamic(() => import("./zaya/demo"), { ssr: false });
const RagProject = dynamic(() => import("./ragproject/figure"), { ssr: false });
const McpCli = dynamic(() => import("./mcpcli/figure"), { ssr: false });

interface BlockProps {
  n: string;
  title: string;
  status: string;
  summary: string;
  tags: string[];
  children: React.ReactNode;
}

const Block = ({ n, title, status, summary, tags, children }: BlockProps) => (
  <div className="mb-24 last:mb-0">
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-3">
      <span className="eyebrow">{n}</span>
      <h3 className="font-display font-semibold text-2xl sm:text-3xl">{title}</h3>
      <span className="text-xs font-medium chip rounded-full px-2.5 py-0.5 whitespace-nowrap">{status}</span>
    </div>
    <p className="text-muted-foreground leading-relaxed max-w-2xl mb-4">{summary}</p>
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {tags.map((tag) => (
        <span key={tag} className="text-xs chip rounded-full px-2.5 py-1">{tag}</span>
      ))}
    </div>
    <Reveal className="glass rounded-3xl p-4 sm:p-6">{children}</Reveal>
  </div>
);

const ProjectsExplained = () => (
  <div className="w-full">
    <div className="flex items-baseline justify-between mb-4">
      <h2 className="font-display font-semibold text-3xl sm:text-4xl">Selected work</h2>
      <span className="eyebrow hidden sm:block">02</span>
    </div>
    <p className="text-muted-foreground leading-relaxed max-w-2xl mb-14">
      Three things I built, each shown as a small working machine. Watch it run, click it to try something else, and read the steps underneath.
    </p>

    <Block
      n="01"
      title="Zaya: Voice AI Agent for Auto Dealerships"
      status="Live · Production"
      summary="A phone assistant that answers 500+ calls a day for a US auto dealership. It listens, thinks, looks up live inventory and scheduling in the dealership's systems, and speaks back in real time, with a safe fallback to a person."
      tags={["LiveKit Agents", "Sarvam AI", "FastAPI", "Python"]}
    >
      <Zaya />
    </Block>

    <Block
      n="02"
      title="RAG Support Agent"
      status="Built on Google Cloud"
      summary="A support chatbot that answers from a company's own documents. It finds the most relevant pieces, hands only those to the AI, and says “I don't know” instead of guessing."
      tags={["Next.js", "Vertex AI", "Firestore vector search", "Gemini 2.5 Flash"]}
    >
      <RagProject />
    </Block>

    <Block
      n="03"
      title="MCP Server Scaffolding CLI"
      status="Johnson & Johnson engagement"
      summary="An internal command-line tool, written in Go, that creates a new MCP server in one command. What used to be a multi-day manual setup now takes minutes, and every team starts from the same standard, working project."
      tags={["Go", "Model Context Protocol", "CLI", "AI agents"]}
    >
      <McpCli />
    </Block>

  </div>
);

export default ProjectsExplained;
