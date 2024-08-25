"use client";
import { useState } from "react";
import { motion } from "framer-motion";
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
    <div className="w-full bg-gray-900 overflow-hidden">
      <div className="flex justify-center py-8 items-center space-x-4 border-b border-gray-800 mb-4">
        <button
          className={`py-2 px-4 text-lg  ${
            activeTab === "projects"
              ? "border-b-2 border-red-600"
              : "text-gray-400"
          } hover:text-white`}
          onClick={() => setActiveTab("projects")}
        >
          Projects
        </button>
        <button
          className={`py-2 px-4 text-lg  ${
            activeTab === "experience"
              ? "border-b-2 border-red-600"
              : "text-gray-400"
          } hover:text-white`}
          onClick={() => setActiveTab("experience")}
        >
          Experience
        </button>
        <button
          className={`py-2 px-4 text-lg  ${
            activeTab === "contact"
              ? "border-b-2 border-red-600"
              : "text-gray-400"
          } hover:text-white`}
          onClick={() => setActiveTab("contact")}
        >
          Contact
        </button>
      </div>
      <motion.div
        className="bg-gray-900 rounded-lg"
        key={activeTab}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.5,
        }}
      >
        {renderContent()}
      </motion.div>
    </div>
  );
};

export default Tabs;
