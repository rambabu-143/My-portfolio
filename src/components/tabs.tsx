'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Logo } from "./logo";
import ThemeToggle from "./theme-toggle";

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
  const [compact, setCompact] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      // small at the top, grows while scrolling down, shrinks back on scroll up
      if (Math.abs(y - lastY) > 4) {
        setCompact(!(y > 80 && y > lastY));
        lastY = y;
      }

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
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTabClick = (tabId: string) => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(tabId)?.scrollIntoView({ behavior: calm ? "auto" : "smooth" });
  };

  return (
    <nav className="fixed top-4 inset-x-0 z-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: -12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", bounce: 0, duration: 0.6 }}
        className={`glass container-page mx-auto flex items-center justify-between px-3 sm:px-4 rounded-full transition-[max-width,height,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          compact ? "!max-w-[820px] h-12" : "!max-w-[1100px] h-14"
        } ${scrolled ? "shadow-xl" : ""}`}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="flex items-center gap-2 text-foreground pl-2 active:scale-90 transition-transform duration-100"
        >
          <Logo size={26} />
        </button>

        <div className="hidden sm:flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`relative px-4 py-1.5 rounded-full text-sm tracking-[0.005em] transition-colors ${
                activeTab === tab.id ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="nav-pill"
                  transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                  className="nav-pill absolute inset-0 rounded-full"
                />
              )}
              <span className="relative">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button onClick={() => handleTabClick("contact")} className="btn-primary liquid-dark !py-2 !px-4 text-sm">
            Let&apos;s talk
          </button>
        </div>
      </motion.div>
    </nav>
  );
};

export default Tabs;
