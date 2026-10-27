'use client';

import type { ComponentType } from 'react';
import { caseStudies, type ProjectKind } from '@/lib/project-case-studies';
import { Cabinet, Dish, Exploded, Keyboard, Lockers, Patch, Phosphor, Riffle, Router, Slow, Terminal, Terrain, Vault } from '../ui/hairline';

// One Hairline figure per scene, chosen for what the step does. `lit[i]` = architecture chips active during scene i.
const stages: Record<ProjectKind, { figures: ComponentType[]; lit: number[][] }> = {
  voice: {
    figures: [Phosphor, Terminal, Cabinet, Slow, Router],
    lit: [[0, 1], [1, 2, 3], [3, 4], [3, 5, 0], [3, 4, 5]],
  },
  knowledge: {
    figures: [Dish, Cabinet, Patch, Riffle, Vault],
    lit: [[0], [0, 1], [1, 2, 3], [1, 3, 4], [4, 5]],
  },
  mcp: {
    figures: [Keyboard, Exploded, Patch, Lockers, Terrain],
    lit: [[0, 1], [1, 2], [2, 3], [3, 4, 5], [5]],
  },
};

export default function FlowScene({ kind, active }: { kind: ProjectKind; active: number }) {
  const { figures, lit } = stages[kind];
  const story = caseStudies[kind];
  const scene = story.scenes[active];
  const Figure = figures[active];
  const on = new Set(lit[active]);

  return (
    <figure className="cs-flow-fig">
      <div key={active} className="cs-flow-stage"><Figure /></div>
      <ol className="cs-chips" aria-label="System stages">
        {story.architecture.map((name, i) => <li key={name} className={on.has(i) ? 'on' : ''}>{name}</li>)}
      </ol>
      <figcaption key={`o${active}`} className="cs-flow-out">
        <span>{String(active + 1).padStart(2, '0')} · {scene.label} · move your pointer over the figure</span>
        <code>{scene.output}</code>
      </figcaption>
    </figure>
  );
}
