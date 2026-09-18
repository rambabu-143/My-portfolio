'use client';
import { motion } from "framer-motion";

const projects = [
  {
    title: "Zaya: Voice AI Agent for Auto Dealerships",
    status: "Live · Production",
    description:
      "Real-time voice AI agent handling 500+ daily customer calls for a US auto dealership DMS platform. Full STT to LLM tool-calling to TTS pipeline with a sub-400ms latency target and real-time turn management. Built resilience into the call path (timeouts, retries, safe fallback routing) plus the auth/webhook layer connecting the agent to dealership APIs.",
    tags: ["LiveKit Agents", "Sarvam AI", "FastAPI", "Python"],
    links: [],
  },
  {
    title: "Hello Gorgeouss: Avatar Try-On Fashion App",
    status: "Live · Mobile",
    description:
      "Solo freelance build, end to end: every app screen in React Native (Expo), the Node.js/Express backend, and a custom avatar system for building a personal avatar and previewing outfits on it.",
    tags: ["React Native", "Expo", "Node.js", "Express"],
    links: [
      { label: "App Store", url: "https://apps.apple.com/in/app/hello-gorgeouss/id6739887399" },
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.hellogorgeous" },
    ],
  },
  {
    title: "Trending AI Post",
    status: "Open source",
    description:
      "A scheduled Python bot that finds a trending GitHub repo daily, summarizes it with a local Ollama model, and posts it to LinkedIn via the LinkedIn API, running unattended on a daily launchd job.",
    tags: ["Python", "LinkedIn API", "Ollama", "launchd"],
    links: [{ label: "Repo", url: "https://github.com/rambabu-143/Trending-AI-Post" }],
  },
];

const Projects = () => {
  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-12">
        <h2 className="font-display font-semibold text-3xl sm:text-4xl">Selected work</h2>
        <span className="eyebrow hidden sm:block">02</span>
      </div>

      <div className="space-y-5">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            className="glass rounded-2xl p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <span className="text-xs font-medium text-muted-foreground glass-tight rounded-full px-2.5 py-0.5">
                {project.status}
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mb-4">{project.description}</p>
            <div className="flex flex-wrap items-center gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs text-muted-foreground glass-tight rounded-full px-2.5 py-1">
                  {tag}
                </span>
              ))}
              {project.links.length > 0 && (
                <span className="w-px h-4 bg-border mx-1" />
              )}
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium link-underline text-foreground"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
