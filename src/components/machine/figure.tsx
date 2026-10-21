"use client";

import * as React from "react";
import { Plate } from "../iso/react/draw";
import "../iso/iso.css";
import { MachineLive, type Machine } from "./engine";
import "./machine.css";

export interface Step {
  title: string;
  body: string;
}

export interface FigureProps<S> {
  fig: string;
  title: string;
  hint: string;
  keys: { mark: "raised" | "flat" | "lit" | "edge" | "dim" | "dotted" | "dashed" | "red" | "green" | "blue"; label: string }[];
  caption: string;
  lead: React.ReactNode;
  steps: Step[];
  parts: React.ReactNode;
  machine: Machine<S>;
}

export function MachineFigure<S>({ fig, title, hint, keys, caption, lead, steps, parts, machine }: FigureProps<S>) {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  React.useEffect(() => {
    const root = document.documentElement;
    const sync = () => setTheme(root.classList.contains("dark") ? "dark" : "light");
    sync();
    const watch = new MutationObserver(sync);
    watch.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => watch.disconnect();
  }, []);

  return (
    <div className="iso mx-wrap" data-machine="" data-theme={theme} data-step={machine.settled.step}>
      <Plate fig={fig} title={title} hint={hint} readout={machine.settled.text} keys={keys} caption={caption}>
        <MachineLive machine={machine} />
      </Plate>
      <div className="mx-story">
        <p className="mx-lead">{lead}</p>
        <ol className="mx-steps">
          {steps.map((step, i) => (
            <li key={step.title} data-n={i + 1}>
              <span className="mx-num">{i + 1}</span>
              <span>
                <b>{step.title}</b>
                <span className="mx-body">{step.body}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className="mx-parts">{parts}</p>
      </div>
    </div>
  );
}
