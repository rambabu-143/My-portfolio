"use client";

import { MachineFigure } from "../machine/figure";
import { mcpCli } from "./machine";

const STEPS = [
  { title: "A developer runs one command", body: "Setting up an MCP server by hand used to take days, and every team did it a little differently. Now the developer runs one command in the terminal. The key on the hut is that command." },
  { title: "The standard modules are ready", body: "Every MCP server needs the same four things: a project structure, a place to register its tools and resources, its settings, and a working starting point. The tool keeps them ready as modules on pallets, so nobody rebuilds them from nothing." },
  { title: "The crane builds it on a scaffold", body: "The crane lifts the modules, one by one, onto a scaffold and stacks them. That is exactly what “scaffolding” means: a temporary frame that helps you build something properly, fast." },
  { title: "The scaffold comes down: a working server", body: "When the last module is on, the scaffold is taken away and a working server stands there. The developer starts with something that runs, not an empty folder, and adds only their own logic. New tools and resources plug in without touching the scaffolding." },
  { title: "An AI agent plugs into the standard door", body: "An AI agent can't use your tools by magic. MCP, the Model Context Protocol, is a standard door and plug: one shape that fits every server, so any agent can connect to any server the same way." },
  { title: "The agent uses what the server offers", body: "Once connected, the agent can use a tool (do something), read a resource (a document or data), or pick up a prompt (ready-made instructions). Click the site to build each kind. When every team builds from the same modules, all servers look alike, which makes them faster to build, easier to review and easier to maintain." },
];

export default function McpCliFigure() {
  return (
    <MachineFigure
      fig="Fig 3"
      title="One command, one server"
      hint="Click or ← → to build a different kind"
      keys={[
        { mark: "raised", label: "The standard modules and the finished server" },
        { mark: "lit", label: "What is happening right now" },
        { mark: "dotted", label: "The scaffold fades once the server stands" },
      ]}
      caption="The Go CLI I built during the Johnson & Johnson engagement, drawn as a construction site: one command generates the project structure, tool and resource registration and config wiring of an MCP server, a crane stacks them on a scaffold, and an AI agent connects through the standard MCP door. A tool, a resource and a prompt are the three things an MCP server can offer."
      lead={
        <>
          <b>What is this?</b> An internal command-line tool, written in Go, that creates new <b>MCP servers</b>. An MCP server is a small program that lets an AI agent use a tool or read some data. Building one by hand is slow and every team does it differently, so this tool <b>scaffolds</b> it: it generates the project, registers the tools and resources, and wires the config in one step.
        </>
      }
      steps={STEPS}
      parts={
        <>
          <b>What am I looking at?</b> The <b>hut</b> is the command. The <b>blocks on pallets</b> are the standard modules and the <b>crane</b> stacks them. The <b>building</b> is the finished server, and its <b>door</b> is MCP. The <b>little robot</b> is the AI agent.
        </>
      }
      machine={mcpCli}
    />
  );
}
