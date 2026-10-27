export const projects = [
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

export type PortfolioProject = (typeof projects)[number];
export type ProjectKind = PortfolioProject["kind"];

export type StoryScene = { label: string; title: string; body: string; output: string };
export type CaseStudy = {
  headline: string;
  role: string;
  context: string;
  architecture: string[];
  scenes: StoryScene[];
  decisions: { title: string; body: string }[];
  evidence: string;
};

export const caseStudies: Record<ProjectKind, CaseStudy> = {
  voice: {
    headline: 'From a ringing phone to a useful conversation.',
    role: 'Voice pipeline, turn management & API integration',
    context: 'Production system · US auto dealership',
    architecture: ['Caller', 'LiveKit audio', 'Speech → text', 'LLM + tools', 'FastAPI integrations', 'Text → speech'],
    scenes: [
      { label: 'Listen', title: 'Start with the caller.', body: 'LiveKit carries the live audio stream. The conversation starts with a real caller asking about inventory or scheduling.', output: 'Incoming audio → streaming session' },
      { label: 'Understand', title: 'Turn speech into context.', body: 'Speech-to-text feeds the language model so the agent can interpret what the caller needs and decide whether it needs an external tool.', output: 'Audio → transcript → intent' },
      { label: 'Look up', title: 'Ask the dealership systems.', body: 'Tool calls reach the dealership APIs through the FastAPI auth and webhook layer. Inventory and scheduling answers come from connected systems.', output: 'Tool call → authenticated API → result' },
      { label: 'Respond', title: 'Speak back, and keep listening.', body: 'Text-to-speech streams the answer back. Turn management stops the agent when the caller interrupts, allowing a natural back-and-forth.', output: 'Answer → speech · interruptions respected' },
      { label: 'Recover', title: 'Give the call a safe way forward.', body: 'Timeouts, retries and routing to a person keep slow or failed dependencies from leaving the caller stranded.', output: 'Slow dependency → retry or human fallback' },
    ],
    decisions: [
      { title: 'Treat the conversation as a stream', body: 'Speech recognition, model tool-calling and speech generation work in the live call path. The integration has to manage turns as well as produce answers.' },
      { title: 'Keep business data behind tools', body: 'The auth and webhook layer connects the agent to inventory and scheduling APIs, giving tool calls a defined integration boundary.' },
      { title: 'Build recovery into the call path', body: 'Timeout handling, retries and a human fallback are part of the experience. A useful outcome can be a successful handoff.' },
    ],
    evidence: 'Production volume is the reported outcome: 500+ calls a day. The walkthrough uses a fictional conversation and representative tool names; it does not replay a customer call or expose dealership data.',
  },
  knowledge: {
    headline: 'Find the relationships behind the answer.',
    role: 'Retrieval & answer-generation contributions',
    context: 'Internal enterprise knowledge · Johnson & Johnson engagement',
    architecture: ['Question', 'Vector search', 'Entity relationships', 'Graph traversal', 'Combined context', 'LLM + evaluation'],
    scenes: [
      { label: 'Question', title: 'A question can span several documents.', body: 'An internal knowledge query may need facts from separate sources. A single similar passage may only contain part of the answer.', output: 'Question → retrieval request' },
      { label: 'Retrieve', title: 'Start with semantic similarity.', body: 'Vector search finds passages related to the query. These results provide starting context for the retrieval workflow.', output: 'Query → similar passages' },
      { label: 'Connect', title: 'Follow relationships to more context.', body: 'Graph traversal follows entity relationships across related documents, bringing in context that similarity search alone may miss.', output: 'Relevant passage → related entity → connected source' },
      { label: 'Assemble', title: 'Bring both retrieval paths together.', body: 'Graph context and vector results are combined before answer generation. I contributed to iterating on how those inputs were assembled for the LLM.', output: 'Vector results + graph context → answer context' },
      { label: 'Evaluate', title: 'Evaluate the retrieval-to-answer workflow.', body: 'RAGAS and DeepEval were used alongside implementation work to evaluate the pipeline. Public benchmark scores are not available for this engagement.', output: 'Generated answer → evaluation workflow' },
    ],
    decisions: [
      { title: 'Combine relevance with relationships', body: 'Vector similarity finds related language. Graph traversal contributes connections between entities and sources. Both feed the context-building workflow.' },
      { title: 'Make context assembly an explicit step', body: 'The combination of graph and vector results shapes what the answer generator sees. My contributions included iterating on that combination.' },
      { title: 'Evaluate alongside implementation', body: 'RAGAS and DeepEval were part of the workflow. No improvement percentage or evaluation score is claimed without a publishable dataset and baseline.' },
    ],
    evidence: 'This was a contribution within an enterprise engagement. The animation uses generic sample documents and relationships. Client documents, production architecture details and evaluation scores are not published here.',
  },
  mcp: {
    headline: 'Give every integration a consistent starting point.',
    role: 'Go CLI development & MCP scaffolding',
    context: 'Internal developer tooling · Johnson & Johnson engagement',
    architecture: ['Developer command', 'Go CLI', 'Project scaffold', 'Tool registration', 'Configuration', 'Runnable MCP server'],
    scenes: [
      { label: 'Initialize', title: 'Begin with one command.', body: 'An internal CLI written in Go starts a new MCP server project, giving teams one entry point for creating an integration.', output: 'Command → new server project' },
      { label: 'Generate', title: 'Create the project structure.', body: 'The command generates the baseline files and layout needed for a server. Every team begins with the same structure.', output: 'Project scaffold → consistent layout' },
      { label: 'Register', title: 'Give the server its tool wiring.', body: 'The generated baseline includes tool registration, so developers can build integration-specific functionality on an established starting point.', output: 'Tool definitions → registered server tools' },
      { label: 'Configure', title: 'Include configuration from the start.', body: 'Configuration is included with the scaffold. The result is a working baseline rather than a collection of disconnected boilerplate files.', output: 'Configuration + registration → runnable baseline' },
      { label: 'Build on it', title: 'Focus the team on the integration.', body: 'Teams extend the generated server with their own functionality. MCP tooling was tested using DeepEval during the engagement.', output: 'Runnable baseline → integration-specific development' },
    ],
    decisions: [
      { title: 'Generate a working baseline', body: 'The CLI creates a complete starting point with registration and configuration. That makes the output useful as a project, not just a file template.' },
      { title: 'Standardize the repeatable parts', body: 'A consistent layout reduces variation between new servers and gives teams a shared starting structure to maintain.' },
      { title: 'Leave room for integration-specific work', body: 'The scaffold handles common setup so the team can concentrate on the behavior of its own MCP tools and connected systems.' },
    ],
    evidence: 'The CLI was internal. Commands, file names and terminal messages shown here are illustrative reconstructions of the workflow. No internal source code or measured setup-time saving is claimed.',
  },
};
