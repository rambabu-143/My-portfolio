'use client';
import { useEffect, useRef, useState } from "react";
import AtmosphereScene from "./atmosphere-scene";
import Reveal from "./reveal";

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
        "Resilience in the call path: timeouts, retries and safe fallback routing to a person.",
        "The auth and webhook layer that connects the agent to the dealership's APIs (FastAPI).",
      ],
      result: "Live in production, handling 500+ calls a day.",
    },
    kind: "voice" as const,
  },
  {
    n: "02",
    title: "GraphRAG Knowledge Retrieval",
    subtitle: "Connected context for multi-hop questions",
    status: "Enterprise engagement",
    summary:
      "Contributed to an internal retrieval pipeline that combines vector search with graph traversal across related documents, with evaluation using RAGAS and DeepEval.",
    tags: ["GraphRAG", "Vector search", "RAGAS", "DeepEval"],
    detail: {
      problem: "Internal knowledge queries can span several related documents. Vector similarity alone may miss the relationships needed to assemble useful context.",
      built: [
        "Contributed to retrieval and answer-generation components during the Johnson & Johnson engagement.",
        "Combined vector similarity results with graph traversal to assemble context through entity relationships.",
        "Iterated on how graph and vector results were combined before passing context to the LLM.",
        "Evaluated the pipeline with RAGAS and DeepEval alongside implementation contributions.",
      ],
      result: "A retrieval and evaluation workflow for internal knowledge questions spanning related documents.",
    },
    kind: "knowledge" as const,
  },
  {
    n: "03",
    title: "MCP Server CLI",
    subtitle: "Scaffold a new MCP server in one command",
    status: "Johnson & Johnson engagement",
    summary:
      "An internal Go command-line tool. It generates a runnable baseline with tool registration and configuration, so teams can focus on integration-specific functionality.",
    tags: ["Go", "Model Context Protocol", "CLI", "DeepEval"],
    detail: {
      problem: "Internal teams needed a consistent, runnable starting point for new MCP integrations.",
      built: [
        "An internal command-line tool written in Go, built during the Johnson & Johnson engagement.",
        "One command creates a complete, working MCP server project.",
        "Every team starts from the same standard layout, so servers are consistent and easier to maintain.",
      ],
      result: "A consistent runnable baseline, with MCP tooling tested using DeepEval.",
    },
    kind: "mcp" as const,
  },
];

const ProjectsExplained = () => {
  const [open, setOpen] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
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
        Production voice AI, enterprise retrieval, and developer tooling. Explore the problem, my contribution, and the outcome behind each project.
      </p>

      <button type="button" onClick={() => setPaused(!paused)} className="chip rounded-full px-4 py-2 text-xs mb-5">{paused ? "Play project previews" : "Pause project previews"}</button>
      <div className="grid gap-5 md:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.08} className="h-full">
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="glass rounded-3xl p-6 text-left h-full w-full flex flex-col transition-transform hover:-translate-y-1"
            >
              <div className="w-full mb-5"><AtmosphereScene kind={p.kind} compact paused={paused || open !== null} /></div>
              <div className="flex flex-wrap gap-2 items-center justify-between mb-4">
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
              <span className="text-sm font-medium">Explore case study ↗</span>
            </button>
          </Reveal>
        ))}
      </div>

      {/* Native dialog preserves keyboard navigation and returns focus on close. */}
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
            <AtmosphereScene kind={active.kind} />
          </div>
        )}
      </dialog>
    </div>
  );
};

export default ProjectsExplained;
