"use client";

import { MachineFigure } from "../machine/figure";
import { trendingPost } from "./machine";

const STEPS = [
  { title: "A timer wakes it up every day", body: "On my Mac, a macOS scheduled job (launchd) starts the bot at a set time each day. Nobody opens a terminal and nobody clicks anything. The clock rings and the work begins." },
  { title: "It looks at GitHub's trending repos", body: "The bot asks GitHub which repositories are trending today. The five crates on the shelf stand for that list, and the taller a crate, the more stars the repo has." },
  { title: "It picks one repo", body: "The crane takes a single repo off the shelf and sets it on the belt. Click the machine to see another day, when a different repo is on top." },
  { title: "A local model writes the summary", body: "The belt carries the repo into the press, which is Ollama running on my own computer. A long repo goes in and a short, readable summary comes out. Because the model runs locally, there is no paid AI API in the loop." },
  { title: "The summary becomes a post", body: "The printer lays the summary out as a LinkedIn post, ready to publish." },
  { title: "It posts through the LinkedIn API", body: "The post slides into the mailbox, which is the LinkedIn API, and the flag goes up to show it was sent. Then the machine goes quiet until the timer rings again tomorrow, with no one involved." },
];

export default function TrendingPostFigure() {
  return (
    <MachineFigure
      fig="Fig 4"
      title="One post a day, on its own"
      hint="Click or ← → to see another day"
      keys={[
        { mark: "raised", label: "The repo, then its summary card" },
        { mark: "lit", label: "What is happening right now" },
        { mark: "dim", label: "The stations waiting for their turn" },
      ]}
      caption="My open-source Trending AI Post bot, drawn as a small factory: a launchd job starts a Python script every day, which picks a trending GitHub repo, has a local Ollama model summarize it, and posts the result to LinkedIn through the LinkedIn API. The crates and their heights are illustrative."
      lead={
        <>
          <b>What is this?</b> A small Python bot that posts about a trending AI repo on LinkedIn <b>every day, by itself</b>. It finds a trending GitHub repo, asks a model running on my own computer to summarize it, and publishes the summary through the LinkedIn API. A scheduled job keeps it running unattended.
        </>
      }
      steps={STEPS}
      parts={
        <>
          <b>What am I looking at?</b> The <b>clock</b> is the daily timer. The <b>crates</b> are trending repos. The <b>crane</b> picks one and the <b>belt</b> carries it. The <b>press</b> is the local model, the <b>printer</b> lays out the post, and the <b>mailbox</b> is LinkedIn.
        </>
      }
      machine={trendingPost}
    />
  );
}
