'use client';
import Link from "next/link";
import { motion } from "framer-motion";

const Projects = () => {
  const projects = [
    {
      title: "Zaya - Dealership Voice Agent",
      description:
        "Real-time voice agent for dealership workflows integrated into Cyepro DMS. Built tool-driven orchestration with routing, conversation state, and memory-driven steps using Vercel AI SDK + Mastra AI. Implemented structured tool outputs, validation, and fallback handling.",
      url: "https://cyepro.com",
      tags: ["Vercel AI SDK", "Mastra AI", "Next.js", "Voice AI"],
      color: "cyan",
      status: "Live (Beta)",
    },
    {
      title: "Loop - App Builder",
      description:
        "Lovable-inspired builder clone focused on template-first UI generation and fast iteration. Built prompt-driven UI generation and reusable flows for rapid app/site creation with modular, reusable components.",
      url: "https://github.com/rambabu-143/Loop",
      tags: ["Next.js", "TypeScript", "AI", "UI Generation"],
      color: "purple",
      status: "Open Source",
    },
    {
      title: "Hello Gorgeous - 3D Avatar Commerce",
      description:
        "Mobile commerce app where users generate realistic 3D avatars from face images for personalized shopping experiences. Built mobile UI flows and integrated avatar-first journeys into browsing and product discovery.",
      url: "#",
      tags: ["React Native", "Expo", "3D Avatars", "Mobile"],
      color: "pink",
      status: "Mobile App",
    },
  ];

  return (
    <div className="w-full">
      <div className="grid gap-6 max-w-4xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="group"
          >
            <div className="glass rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors duration-300">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:gradient-text transition-all">
                      {project.title}
                    </h3>
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-white/10 text-white/60">
                      {project.status}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-white/50 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium rounded-full border border-white/15 text-white/60 bg-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  {project.url !== "#" && (
                    <Link
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium transition-colors text-white/60 hover:text-white"
                    >
                      View Project
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;