"use client";

import * as React from "react";
import { asksForStillness, useInView } from "../iso/react/live";
import "../iso/iso.css";
import "../machine/machine.css";
import "./demo.css";
import { OBJECT_H, OBJECT_W, objectSvg, type Mode } from "./object";

// ------------------------------------------------------------------ the scripts (an example call)
const SAY = "Hi, do you have the new SUV in blue?".split(" ");
const REPLY = "Yes, we have three in blue on the lot. Want to book a test drive this week?".split(" ");
const FALLBACK = "Sorry, one moment. I'm connecting you with a colleague.".split(" ");
const BUDGET = 400;
const SCENES = ["A normal call", "The caller interrupts", "The system is slow"];

const upTo = (words: string[], n: number) => words.slice(0, Math.max(0, Math.min(words.length, n))).join(" ");
const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));

type Tool = "idle" | "run" | "ok" | "slow" | "retry" | "fail";
interface View {
  step: number;
  say: string;
  sayLive: boolean;
  caller: boolean;
  nodes: [boolean, boolean, boolean, boolean];
  bad: [boolean, boolean, boolean, boolean];
  tool: Tool;
  reply: string;
  replyLive: boolean;
  voice: boolean;
  ms: number;
  late: boolean;
  banner: string;
  end: number;
}

const END = [8.4, 9.2, 11];

function view(t: number, sc: number): View {
  const v: View = {
    step: 1, say: "", sayLive: false, caller: false, nodes: [false, false, false, false], bad: [false, false, false, false],
    tool: "idle", reply: "", replyLive: false, voice: false, ms: 0, late: false, banner: "A person calls the dealership. Press a call above to watch it.", end: END[sc]!,
  };
  const talk = seg(t, 0.2, 1.6);
  v.caller = t >= 0.2 && t < 1.6;
  v.say = upTo(SAY, Math.ceil(talk * SAY.length));
  v.sayLive = v.caller;
  v.nodes[0] = v.caller;
  if (t >= 0.2) v.banner = "The caller is talking. Their voice streams in small chunks, so we never wait for the end.";
  if (t >= 0.5 && t < 1.8) { v.nodes[1] = true; v.step = 2; v.banner = "Ears: speech-to-text writes the words live, as they are spoken."; }
  if (t >= 1.6) { v.nodes[1] = t < 1.8; v.step = 3; }
  // brain + tool
  if (t >= 1.8) {
    v.nodes[2] = true;
    v.banner = "Brain: the LLM reads the words and asks the dealership's system for real data.";
    v.tool = t < 2.6 ? "run" : "ok";
    v.ms = clamp((t - 1.6) / 0.6) * 110 + clamp((t - 1.8) / 0.8) * 140;
  }
  if (sc === 2 && t >= 1.8) {
    v.tool = t < 3.8 ? "slow" : t < 5.6 ? "retry" : "fail";
    v.ms = 110 + clamp((t - 1.8) / 1.8) * 330 + clamp((t - 3.8) / 3.6) * 140;
    v.late = v.ms > BUDGET;
    v.bad[2] = v.late;
    if (t < 3.8) v.banner = "Brain: still waiting for the dealership's system…";
    if (t >= 3.8) { v.step = 6; v.banner = t < 5.6 ? "Too slow. It asks again (a retry)." : "Still no answer. It safely hands the call to a person."; }
    if (t >= 5.6) {
      v.nodes[3] = true;
      v.reply = upTo(FALLBACK, Math.ceil(seg(t, 5.8, 8) * FALLBACK.length));
      v.replyLive = t < 8;
      v.voice = t < 8.2;
    }
    return v;
  }
  // streaming reply + voice out
  const reply = seg(t, 2.8, 5);
  if (t >= 2.8) {
    v.step = 4;
    v.reply = upTo(REPLY, Math.ceil(reply * REPLY.length));
    v.replyLive = reply < 1;
    v.nodes[3] = true;
    v.voice = reply < 1 || t < 5.4;
    v.ms = 250 + clamp((t - 2.8) / 0.6) * 120;
    v.banner = "The reply streams out word by word, and each word becomes voice right away. The caller hears it before the AI has finished writing.";
  }
  if (sc === 1 && t >= 4) {
    // the caller talks over the reply
    const cut = 4;
    v.reply = upTo(REPLY, Math.ceil(seg(cut, 2.8, 5) * REPLY.length));
    v.replyLive = false;
    v.voice = false;
    v.caller = t >= 4.2 && t < 6.2;
    v.say = t >= 4.2 ? "Actually, make it Saturday." : v.say;
    v.sayLive = v.caller;
    v.nodes = [v.caller, v.caller, false, false];
    v.step = 6;
    v.banner = "The caller talks over the AI. The reply stops mid-sentence and the AI listens.";
    v.ms = t >= 4.2 ? 0 : 370;
  } else if (sc === 0 && t >= 5.4) {
    v.step = 5;
    v.ms = 370;
    v.banner = "First words heard in 370 ms, under the 400 ms goal. Fast enough to feel like a real conversation.";
  }
  return v;
}

// ------------------------------------------------------------------ the demo
const Wave = ({ on }: { on: boolean }) => (
  <div className="zd-wave" data-on={on ? "" : undefined} aria-hidden="true">
    {Array.from({ length: 28 }, (_, i) => (
      <i key={i} style={{ animationDelay: `${((i * 37) % 11) * -0.08}s`, animationDuration: `${0.7 + ((i * 13) % 7) * 0.07}s` }} />
    ))}
  </div>
);

const STEPS = [
  { title: "A person speaks, and the voice streams", body: "Someone calls the car dealership. Their voice doesn't wait until they finish talking. It is sent in tiny chunks the whole time. That is called streaming." },
  { title: "Ears: voice becomes words", body: "While they speak, speech-to-text (Sarvam AI) writes down the words live, like fast subtitles. A computer can't read sound, but it can read words." },
  { title: "Brain: think, and use a tool", body: "The LLM reads the words and decides what it needs. If the question needs real facts, like what is in stock, it calls a tool: a request to the dealership's own system. This is “tool calling”." },
  { title: "The reply streams out as voice", body: "The LLM doesn't write the whole answer first. It sends words one by one, and text-to-speech turns each word into sound immediately. So the caller starts hearing the answer while it is still being written." },
  { title: "The clock: under 400 ms", body: "People feel a pause after about half a second. The whole path from “caller stops” to “first words heard” has a goal of under 400 milliseconds, less than a blink." },
  { title: "When real life gets messy", body: "Try the other two calls. If the caller talks over the AI, it stops and listens. If the dealership's system is slow, it retries, and if that fails it safely passes the call to a real person instead of leaving the caller hanging." },
];

const modeOf = (v: View): Mode =>
  v.tool === "fail" ? "person" : v.late ? "late" : v.caller ? "listen" : v.voice ? "speak" : v.tool === "run" || v.tool === "slow" || v.tool === "retry" ? "tool" : v.nodes[2] ? "think" : "idle";
const MODE_LABEL: Record<Mode, string> = { idle: "waiting for a call", listen: "listening", think: "thinking", tool: "asking the dealership's system", speak: "speaking", late: "too slow…", person: "a person took over" };

export default function ZayaDemo() {
  const root = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(root);
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  React.useEffect(() => {
    const html = document.documentElement;
    const sync = () => setTheme(html.classList.contains("dark") ? "dark" : "light");
    sync();
    const watch = new MutationObserver(sync);
    watch.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => watch.disconnect();
  }, []);
  const [sc, setSc] = React.useState(0);
  const [t, setT] = React.useState(0);
  const run = React.useRef({ sc: 0, t: 0, hold: 0, calm: false });

  React.useEffect(() => {
    run.current.calm = asksForStillness();
    if (run.current.calm) setT(END[run.current.sc]!);
  }, []);

  React.useEffect(() => {
    if (!inView || run.current.calm) return;
    let frame = 0;
    let last = 0;
    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 1 / 20) : 0;
      last = now;
      const r = run.current;
      if (asksForStillness()) {
        r.t = END[r.sc]!;
        setT(r.t);
        frame = requestAnimationFrame(tick);
        return;
      }
      const before = r.t;
      if (r.t < END[r.sc]!) r.t += dt;
      else {
        r.hold += dt;
        if (r.hold > 3.2) { r.sc = (r.sc + 1) % SCENES.length; r.t = 0; r.hold = 0; setSc(r.sc); }
      }
      if (r.t !== before) setT(r.t);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView]);

  const choose = (i: number) => {
    const r = run.current;
    r.sc = i; r.t = r.calm ? END[i]! : 0; r.hold = 0;
    setSc(i);
    setT(r.t);
  };

  const v = view(t, sc);
  return (
    <div ref={root} className="mx-wrap iso zd" data-theme={theme} data-step={v.step}>
      <div className="zd-tabs" role="tablist" aria-label="Choose a call">
        {SCENES.map((name, i) => (
          <button key={name} type="button" role="tab" aria-selected={sc === i} className="zd-tab" data-on={sc === i ? "" : undefined} onClick={() => choose(i)}>
            {name}
          </button>
        ))}
      </div>

      <div className="zd-stage">
        <div className="zd-card">
          <div className="zd-head"><span>The caller says</span><span>live words</span></div>
          <div className={`zd-text ${v.sayLive ? "zd-cursor" : ""}`}>{v.say || <i>…</i>}</div>
          <Wave on={v.caller} />
        </div>
        <div className="zd-object" aria-hidden="true">
          <svg className="iso-svg" viewBox={`0 0 ${OBJECT_W} ${OBJECT_H}`} focusable="false" dangerouslySetInnerHTML={{ __html: objectSvg(modeOf(v), t) }} />
          <div className="zd-mode">{MODE_LABEL[modeOf(v)]}</div>
        </div>
        <div className="zd-card">
          <div className="zd-head"><span>The agent says</span><span>streamed</span></div>
          <div className={`zd-text ${v.replyLive ? "zd-cursor" : ""}`}>{v.reply || <i>…</i>}</div>
          <Wave on={v.voice} />
        </div>
      </div>

      <div className="zd-tool">
        <span className="zd-head" style={{ gap: 8 }}>Dealership system</span>
        <span className="zd-pill" data-s={v.tool === "run" || v.tool === "slow" || v.tool === "retry" ? "run" : v.tool === "ok" ? "ok" : v.tool === "fail" ? "bad" : undefined}>
          {v.tool === "idle" ? "waiting" : v.tool === "run" ? "looking up inventory…" : v.tool === "ok" ? "inventory found" : v.tool === "slow" ? "no answer yet…" : v.tool === "retry" ? "retry · asking again…" : "no answer · hand to a person"}
        </span>
        {v.tool === "fail" && <span className="zd-pill" data-s="ok">a person joined the call</span>}
      </div>

      <div className="zd-clock">
        <div className="zd-head"><span>Speed: caller stops → first words heard</span><span className="zd-ms" style={{ color: v.late ? "var(--zd-bad)" : undefined }}>{Math.round(v.ms)} ms</span></div>
        <div className="zd-bar">
          <div className="zd-zone" />
          <div className="zd-fill" data-late={v.late ? "" : undefined} style={{ width: `${Math.min(100, (v.ms / 500) * 100)}%` }} />
          <div className="zd-goal" />
        </div>
        <div className="zd-scale"><span>0</span><span>goal 400 ms</span><span>500</span></div>
      </div>

      <div className="zd-banner" aria-live="polite">{v.banner}</div>

      <div className="mx-story">
        <p className="mx-lead">
          <b>What is Zaya?</b> A phone assistant for a car dealership. It answers 500+ calls every day, in real time, like a very fast receptionist who never gets tired. To work, it has to <b>listen</b>, <b>think</b> and <b>speak</b> in under half a second, and stay safe when something breaks. The call above uses an example question and invented timings. The real thing runs on LiveKit Agents with Sarvam AI and FastAPI.
        </p>
        <ol className="mx-steps">
          {STEPS.map((step, i) => (
            <li key={step.title} data-n={i + 1}>
              <span className="mx-num">{i + 1}</span>
              <span>
                <b>{step.title}</b>
                <span className="mx-body">{step.body}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
