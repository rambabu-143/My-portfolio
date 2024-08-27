"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Projects from "./projects";
import Experience from "./experience";
import Contact from "./contact";
import Skills from "./skills"; // Assuming you've added a Skills component

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
      case "skills":
        return <Skills />;
      default:
        return <Projects />;
    }
  };

  return (
    <div className="w-full bg-black overflow-hidden">
      <div className="flex  justify-center items-center lg:text-xl py-8 px-4 sm:text-sm max-sm:text-sm md:text-sm max-md:text-sm ">
        <button
          className={`py-2 px-4 w-full md:w-auto  ${
            activeTab === "projects"
              ? "border-b-2 border-red-600"
              : "text-gray-400"
          } hover:text-white`}
          onClick={() => setActiveTab("projects")}
        >
          Projects
        </button>
        <button
          className={`py-2 px-4 w-full md:w-auto  ${
            activeTab === "experience"
              ? "border-b-2 border-red-600"
              : "text-gray-400"
          } hover:text-white`}
          onClick={() => setActiveTab("experience")}
        >
          Experience
        </button>
        <button
          className={`py-2 px-4 w-full md:w-auto  ${
            activeTab === "contact"
              ? "border-b-2 border-red-600"
              : "text-gray-400"
          } hover:text-white`}
          onClick={() => setActiveTab("contact")}
        >
          Contact
        </button>
        <button
          className={`py-2 px-4 w-full md:w-auto  ${
            activeTab === "skills"
              ? "border-b-2 border-red-600"
              : "text-gray-400"
          } hover:text-white`}
          onClick={() => setActiveTab("skills")}
        >
          Skills
        </button>
      </div>
      <motion.div
        className="bg-black rounded-lg"
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
