'use client';

import { useState, useEffect } from "react";
import { Logo } from "./logo";

const tabs = [
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = tabs.map((tab) => ({
        id: tab.id,
        element: document.getElementById(tab.id),
      }));

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      let current = "";
      for (const section of sections) {
        if (section.element && section.element.offsetTop <= scrollPosition) {
          current = section.id;
        }
      }
      setActiveTab(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTabClick = (tabId: string) => {
    document.getElementById(tabId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-4 inset-x-0 z-50 px-4">
      <div
        className={`glass container-page !max-w-[1100px] mx-auto flex items-center justify-between h-14 px-4 sm:px-6 rounded-2xl transition-shadow duration-300 ${
          scrolled ? "shadow-lg" : ""
        }`}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="flex items-center gap-2 text-foreground"
        >
          <Logo size={20} className="accent" />
        </button>

        <div className="hidden sm:flex items-center gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`text-sm transition-colors ${
                activeTab === tab.id ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button onClick={() => handleTabClick("contact")} className="btn-secondary !py-2 !px-4 text-sm !border-foreground/10">
          Let&apos;s talk
        </button>
      </div>
    </nav>
  );
};

export default Tabs;
