"use client";

import * as React from "react";
import { IsoFigure } from "../iso/react/draw";
import { asksForStillness, follow, useInView, useLoop, useReadout } from "../iso/react/live";

export interface Item<S> {
  id: string;
  /** painter's key: larger is nearer. A function re-sorts every frame. */
  key: number | ((scene: S) => number);
  html: string | ((scene: S) => string);
}

export interface Tick<S> {
  scene: S;
  text: string;
  step: number;
}

export interface Machine<S> {
  width: number;
  height: number;
  label: string;
  items: Item<S>[];
  settled: Tick<S>;
  end: number;
  hold: number;
  choices: number;
  frame: (t: number, choice: number, prev: number | null, knob: number) => Tick<S>;
}

interface Run {
  choice: number;
  prev: number | null;
  t: number;
  hold: number;
  knob: number;
  pending: number | null;
}

const html = (markup: string) => ({ __html: markup });
const keyOf = <S,>(item: Item<S>, scene: S) => (typeof item.key === "function" ? item.key(scene) : item.key);
const markupOf = <S,>(item: Item<S>, scene: S) => (typeof item.html === "function" ? item.html(scene) : item.html);
const ordered = <S,>(items: Item<S>[], scene: S) =>
  items.map((item, index) => ({ item, index, key: keyOf(item, scene) })).sort((a, b) => a.key - b.key || a.index - b.index);

export function MachineLive<S>({ machine }: { machine: Machine<S> }) {
  const { anchor, say } = useReadout<HTMLDivElement>();
  const root = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(root);
  const run = React.useRef<Run>({ choice: 0, prev: null, t: machine.end, hold: 0, knob: 0, pending: null });
  const cache = React.useRef<Record<string, string>>({});
  const order = React.useRef("");
  const first = React.useMemo(() => ordered(machine.items, machine.settled.scene), [machine]);

  const paint = React.useCallback(
    (tick: Tick<S>) => {
      const host = root.current?.querySelector<SVGGElement>("[data-world]");
      if (!host) return;
      const nodes = new Map<string, Element>();
      host.querySelectorAll(":scope > [data-item]").forEach((node) => nodes.set(node.getAttribute("data-item")!, node));
      const sorted = ordered(machine.items, tick.scene);
      for (const { item } of sorted) {
        if (typeof item.html !== "function") continue;
        const markup = item.html(tick.scene);
        if (cache.current[item.id] !== markup) {
          cache.current[item.id] = markup;
          const node = nodes.get(item.id);
          if (node) node.innerHTML = markup;
        }
      }
      const signature = sorted.map(({ item }) => item.id).join("|");
      if (signature !== order.current) {
        order.current = signature;
        for (const { item } of sorted) {
          const node = nodes.get(item.id);
          if (node) host.appendChild(node);
        }
      }
      say(tick.text);
      const wrap = root.current?.closest<HTMLElement>("[data-machine]");
      if (wrap && wrap.dataset.step !== `${tick.step}`) wrap.dataset.step = `${tick.step}`;
    },
    [machine, say],
  );

  const tick = React.useCallback(
    (dt: number, calm: boolean) => {
      const r = run.current;
      let busy = false;
      if (r.t < machine.end) {
        r.t = calm ? machine.end : Math.min(machine.end, r.t + dt);
        busy = true;
      } else if (r.pending !== null) {
        r.prev = calm ? null : r.choice;
        r.choice = r.pending;
        r.pending = null;
        r.t = calm ? machine.end : 0;
        r.hold = 0;
        busy = true;
      } else if (!calm) {
        r.hold += dt;
        if (r.hold > machine.hold) r.pending = (r.choice + 1) % machine.choices;
        busy = true;
      }
      const target = r.pending ?? r.choice;
      r.knob = follow(r.knob, target, dt, 0.12, calm);
      paint(machine.frame(r.t, r.choice, r.prev, r.knob));
      return busy || r.knob !== target;
    },
    [machine, paint],
  );

  const kick = useLoop(tick, inView);

  const choose = React.useCallback(
    (next: number) => {
      const r = run.current;
      r.pending = (next + machine.choices) % machine.choices;
      r.t = machine.end;
      r.hold = machine.hold;
      kick();
    },
    [kick, machine],
  );

  const onKey = (event: React.KeyboardEvent) => {
    const base = run.current.pending ?? run.current.choice;
    if (["ArrowRight", "Enter"].includes(event.key)) choose(base + 1);
    else if (event.key === "ArrowLeft") choose(base - 1);
    else return;
    event.preventDefault();
  };

  React.useEffect(() => {
    if (asksForStillness()) tick(0, true);
  }, [tick]);

  return (
    <div
      ref={(node) => {
        root.current = node;
        (anchor as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      className="mx"
      role="group"
      aria-label="Interactive machine. Click or press the arrow keys to change the scenario."
      tabIndex={0}
      onClick={() => choose((run.current.pending ?? run.current.choice) + 1)}
      onKeyDown={onKey}
    >
      <IsoFigure width={machine.width} height={machine.height} label={machine.label}>
        <g data-world="">
          {first.map(({ item }) => (
            <g key={item.id} data-item={item.id} dangerouslySetInnerHTML={html(markupOf(item, machine.settled.scene))} />
          ))}
        </g>
      </IsoFigure>
    </div>
  );
}
