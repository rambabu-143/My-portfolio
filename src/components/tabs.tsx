'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Logo } from "./logo";

const tabs = [
  { id: "hero", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Connect" },
];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = tabs.map((tab) => ({
        id: tab.id,
        element: document.getElementById(tab.id),
      }));

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveTab(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`pointer-events-auto flex items-center glass rounded-full border border-white/10 ${
          scrolled
            ? "justify-center gap-1 px-2 py-1.5"
            : "justify-between gap-2 w-[min(90vw,720px)] px-4 py-2.5"
        }`}
      >
        <button
          onClick={() => handleTabClick("hero")}
          aria-label="Scroll to top"
          className="shrink-0 flex items-center justify-center rounded-full p-1.5 hover:bg-white/10 transition-colors"
        >
          <Logo size={20} />
        </button>

        <div className="flex items-center gap-1">
          <div className="w-px self-stretch bg-white/10 mr-1" />

          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide max-w-[calc(100vw-96px)] md:max-w-none">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-white/40 hover:text-white/80"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/15 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                    transition={{ type: "spring", duration: 0.3 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Tabs;