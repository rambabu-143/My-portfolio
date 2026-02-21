'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const tabs = [
  { id: "hero", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
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
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="glass rounded-full px-2 py-2 border border-white/10">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide max-w-[calc(100vw-32px)] md:max-w-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/10 rounded-full"
                  transition={{ type: "spring", duration: 0.3 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Tabs;