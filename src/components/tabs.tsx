'use client'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Projects from "./projects";
import Experience from "./experience";
import Contact from "./contact";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("projects");

  const renderContent = () => {
    switch (activeTab) {
      case "projects":
        return <Projects />;
      case "experience":
        return <Experience />;
      case "contact":
        return <Contact />;
      default:
        return <Projects />;
    }
  };

  return (
    <div className="w-full  bg-gray-900 overflow-hidden">
      <div className="flex space-x-4 border-b border-gray-800 mb-4">
        <button
          className={`py-2 px-4 ${activeTab === "projects" ? "border-b-2 border-red-600" : "text-gray-400"} hover:text-white`}
          onClick={() => setActiveTab("projects")}
        >
          Projects
        </button>
        <button
          className={`py-2 px-4 ${activeTab === "experience" ? "border-b-2 border-red-600" : "text-gray-400"} hover:text-white`}
          onClick={() => setActiveTab("experience")}
        >
          Experience
        </button>
        <button
          className={`py-2 px-4 ${activeTab === "contact" ? "border-b-2 border-red-600" : "text-gray-400"} hover:text-white`}
          onClick={() => setActiveTab("contact")}
        >
          Contact
        </button>
      </div>
      <div className="rounded-lg w-full">
        <AnimatePresence>
          {activeTab === "projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          )}
          {activeTab === "experience" && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          )}
          {activeTab === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Tabs;
