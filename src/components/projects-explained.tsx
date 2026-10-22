'use client';
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Reveal from "./reveal";

const Loading = () => <p className="text-sm text-muted-foreground p-6">Loading demo…</p>;

const Zaya = dynamic(() => import("./zaya/demo"), { ssr: false, loading: Loading });
const RagProject = dynamic(() => import("./ragproject/figure"), { ssr: false, loading: Loading });
const McpCli = dynamic(() => import("./mcpcli/figure"), { ssr: false, loading: Loading });

const projects = [
  {
    n: "01",
    title: "Zaya",
    subtitle: "Voice AI agent for auto dealerships",
    status: "Live · Production",
    summary:
      "A phone assistant that answers 500+ calls a day for a US auto dealership. It listens, thinks, looks up live inventory and scheduling, and speaks back in real time, with a safe fallback to a person.",
    tags: ["LiveKit Agents", "Sarvam AI", "FastAPI", "Python"],
    detail: {
      problem: "A dealership phone line needs real answers (stock, scheduling) fast enough to feel like talking to a person, and it can't leave a caller hanging when a system is slow.",
      built: [
        "Full pipeline: speech-to-text, LLM tool-calling, text-to-speech, streamed end to end on LiveKit Agents with Sarvam AI.",
        "Real-time turn management, so the agent stops when the caller talks over it.",
        "A sub-400 ms target from the caller stopping to the first words heard.",
        "Resilience in the call path: timeouts, retries and safe fallback routing to a person.",
        "The auth and webhook layer that connects the agent to the dealership's APIs (FastAPI).",
      ],
      result: "Live in production, handling 500+ calls a day.",
    },
    Demo: Zaya,
  },
  {
    n: "02",
    title: "RAG Support Agent",
    subtitle: "Answers from a company's own documents",
    status: "Built on Google Cloud",
    summary:
      "A support chatbot that finds the most relevant pieces of the docs, hands only those to the AI, and says “I don't know” instead of guessing.",
    tags: ["Next.js", "Vertex AI", "Firestore vector search", "Gemini 2.5 Flash"],
    detail: {
      problem: "A normal chatbot answers from memory and guesses. A support bot has to answer from the company's own documents, and admit when they don't cover the question.",
      built: [
        "Documents are cut into 1,000-character chunks with 150 characters of overlap so no sentence is split.",
        "Each chunk is embedded with Vertex text-embedding-005 and stored in Firestore.",
        "A question is embedded the same way; Firestore vector search returns the 5 nearest chunks by cosine similarity.",
        "Gemini 2.5 Flash answers using only those 5 chunks, and says “I don't know” when none match.",
        "The app is Next.js, running on Google Cloud.",
      ],
      result: "Answers stay grounded in the source documents instead of invented.",
    },
    Demo: RagProject,
  },
  {
    n: "03",
    title: "MCP Server CLI",
    subtitle: "Scaffold a new MCP server in one command",
    status: "Johnson & Johnson engagement",
    summary:
      "An internal Go command-line tool. What used to be a multi-day manual setup now takes minutes, and every team starts from the same working project.",
    tags: ["Go", "Model Context Protocol", "CLI", "AI agents"],
    detail: {
      problem: "Setting up a new MCP server by hand took days, and every team ended up with a slightly different project.",
      built: [
        "An internal command-line tool written in Go, built during the Johnson & Johnson engagement.",
        "One command creates a complete, working MCP server project.",
        "Every team starts from the same standard layout, so servers are consistent and easier to maintain.",
      ],
      result: "What used to be a multi-day manual setup now takes minutes.",
    },
    Demo: McpCli,
  },
];

const ProjectsExplained = () => {
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open === null) {
      if (d.open) d.close();
    } else if (!d.open) {
      d.showModal();
    }
  }, [open]);

  const active = open === null ? null : projects[open];

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="font-display font-semibold text-3xl sm:text-4xl">Selected work</h2>
        <span className="eyebrow hidden sm:block">02</span>
      </div>
      <p className="text-muted-foreground leading-relaxed max-w-2xl mb-10">
        Three things I built. Open one to watch it run as a small working machine.
      </p>

      <div className="grid gap-5 md:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.08} className="h-full">
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="glass rounded-3xl p-6 text-left h-full w-full flex flex-col transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="eyebrow">{p.n}</span>
                <span className="text-xs font-medium chip rounded-full px-2.5 py-0.5">{p.status}</span>
              </div>
              <h3 className="font-display font-semibold text-xl">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{p.subtitle}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{p.summary}</p>
              <div className="flex flex-wrap gap-2 mt-auto mb-5">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs chip rounded-full px-2.5 py-1">{t}</span>
                ))}
              </div>
              <span className="text-sm font-medium">Watch it run ↗</span>
            </button>
          </Reveal>
        ))}
      </div>

      {/* demo mounts only while open, so nothing animates in the background */}
      <dialog
        ref={dialog}
        aria-labelledby="project-dialog-title"
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === dialog.current && setOpen(null)}
        className="m-auto w-[min(1000px,94vw)] max-h-[92vh] overflow-auto overscroll-contain rounded-3xl p-0 bg-transparent text-foreground backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        {active && (
          <div className="glass rounded-3xl p-4 sm:p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 id="project-dialog-title" className="font-display font-semibold text-2xl">{active.title}</h3>
                <p className="text-sm text-muted-foreground">{active.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => dialog.current?.close()}
                aria-label="Close"
                className="chip rounded-full w-9 h-9 shrink-0 focus-visible:outline focus-visible:outline-2"
              >
                ✕
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_1.4fr] mb-5 text-sm leading-relaxed">
              <div>
                <p className="eyebrow mb-1">The problem</p>
                <p className="text-muted-foreground mb-3">{active.detail.problem}</p>
                <p className="eyebrow mb-1">Result</p>
                <p className="text-muted-foreground">{active.detail.result}</p>
              </div>
              <div>
                <p className="eyebrow mb-1">What I built</p>
                <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                  {active.detail.built.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
            <active.Demo />
          </div>
        )}
      </dialog>
    </div>
  );
};

export default ProjectsExplained;
