'use client';

import { ArrowRight, Check, GitBranch, Layers3, ShieldCheck, X } from 'lucide-react';
import { caseStudies, type PortfolioProject } from '@/lib/project-case-studies';
import { useEffect, useRef, useState } from 'react';
import { Phone, Branches, Terminal } from './ui/hairline';
import FlowScene from './case-flow/scene';

const figures = { voice: Phone, knowledge: Branches, mcp: Terminal };

export default function ProjectCaseStudy({ project, onClose }: { project: PortfolioProject; onClose: () => void }) {
  const story = caseStudies[project.kind];
  const Figure = figures[project.kind];
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLElement | null)[]>([]);

  // Scroll-spy: the step crossing the middle of the dialog drives the system map.
  useEffect(() => {
    const root = steps.current[0]?.closest('dialog') ?? null;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(steps.current.indexOf(e.target as HTMLElement))),
      { root, rootMargin: '-40% 0px -40% 0px' },
    );
    steps.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return <article className="cs-study">
    <header className="cs-topbar">
      <span className="cs-topbar-label">Case study <span>/ {project.n}</span></span>
      <button type="button" onClick={onClose} className="cs-close" aria-label={`Close ${project.title} case study`} autoFocus><X size={18} /><span className="hidden sm:inline">Close</span></button>
    </header>
    <div className="cs-intro">
      <div className="cs-intro-fig" aria-hidden="true"><Figure /></div>
      <div className="cs-kicker"><span>{project.status}</span><span>{project.tags[0]}</span></div>
      <h3 id="project-dialog-title">{project.title}</h3>
      <p className="cs-headline">{story.headline}</p>
      <div className="cs-intro-meta"><div><span>My focus</span><p>{story.role}</p></div><div><span>Context</span><p>{story.context}</p></div></div>
    </div>

    <div className="cs-flow">
      <div className="cs-flow-sticky">
        <div className="cs-story-label"><span className="eyebrow">Inside the system</span></div>
        <FlowScene kind={project.kind} active={active} />
        <p className="cs-walkthrough-note">Illustrative animation · demonstration data only.</p>
      </div>
      <div className="cs-steps">
        {story.scenes.map((scene, i) => (
          <button
            key={scene.title}
            type="button"
            ref={(el) => { steps.current[i] = el; }}
            onClick={() => setActive(i)}
            className={i === active ? 'cs-step on' : 'cs-step'}
          >
            <span className="eyebrow">{String(i + 1).padStart(2, '0')} · {scene.label}</span>
            <h5>{scene.title}</h5>
            <p>{scene.body}</p>
          </button>
        ))}
      </div>
    </div>

    <section className="cs-written" aria-label="Detailed case study">
      <div className="cs-section-label"><span className="eyebrow">The challenge</span><span>{project.n}</span></div>
      <div className="cs-problem"><h4>{project.subtitle}</h4><p>{project.detail.problem}</p></div>
      <div className="cs-section-label"><span className="eyebrow">My contribution</span><GitBranch size={16} /></div>
      <div className="cs-contributions">{project.detail.built.map((item, i) => <div key={item}><span>{String(i + 1).padStart(2, '0')}</span><p>{item}</p></div>)}</div>
      <div className="cs-section-label"><span className="eyebrow">Engineering decisions</span><Layers3 size={16} /></div>
      <div className="cs-decisions">{story.decisions.map(d => <div key={d.title}><h5>{d.title}</h5><p>{d.body}</p></div>)}</div>
      <div className="cs-result"><div><span className="eyebrow">Outcome</span><h4>{project.detail.result}</h4></div><Check size={25} strokeWidth={1.3} /></div>
      <div className="cs-evidence"><ShieldCheck size={18} /><div><h5>What this walkthrough represents</h5><p>{story.evidence}</p></div></div>
    </section>
    <footer className="cs-footer"><span>{project.title} / Rambabu Arabandi</span><button type="button" onClick={onClose}>Back to featured projects <ArrowRight size={14} /></button></footer>
  </article>;
}
