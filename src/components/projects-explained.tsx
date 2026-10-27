'use client';
import { useEffect, useRef, useState } from "react";
import HairlineScene from "./hairline-scene";
import Reveal from "./reveal";
import ProjectCaseStudy from "./project-case-study";
import { projects } from "@/lib/project-case-studies";


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
      d.scrollTop = 0;
    }
  }, [open]);

  useEffect(() => {
    if (open === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  const active = open === null ? null : projects[open];

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="font-display font-semibold text-3xl sm:text-4xl">Featured projects</h2>
        <span className="eyebrow hidden sm:block">02</span>
      </div>
      <p className="text-muted-foreground leading-relaxed max-w-2xl mb-10">
        Production voice AI, enterprise retrieval, and developer tooling. Explore the problem, my contribution, and the outcome behind each project.
      </p>

      <div className="grid gap-5 md:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.08} className="h-full">
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="glass rounded-3xl p-6 text-left h-full w-full flex flex-col transition-transform hover:-translate-y-1"
            >
              <div className="w-full mb-5"><HairlineScene kind={p.kind} compact paused={open !== null} /></div>
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
        className="m-auto w-[min(1240px,96vw)] max-h-[94dvh] overflow-auto overscroll-contain rounded-3xl p-0 bg-transparent text-foreground backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        {active && <ProjectCaseStudy key={active.kind} project={active} onClose={() => dialog.current?.close()} />}
      </dialog>
    </div>
  );
};

export default ProjectsExplained;
