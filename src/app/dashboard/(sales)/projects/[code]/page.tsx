"use client"
import React, { useEffect, useState } from "react";
import { Project } from "../types";
import { Plus } from "lucide-react";

const ProjectPage = () => {
  const [projectData, setProjectData] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<string>("Timeline");

  const tabs = ["Timeline", "Clients", "Discussions", "Files", "Financials", "Tickets"];

  useEffect(() => {
    const data = localStorage.getItem("projectData");
    if (data) {
      setProjectData(JSON.parse(data));
    }
  }, []);

  return (
    <div className="p-4 bg-[#eaeaea] min-h-screen">
      {/* Header */}
      <div className="p-2 w-full bg-[#091747] text-[18px] text-white font-medium font-poppins rounded-xl flex justify-between items-center">
        <span>
          {projectData?.code} {projectData?.projectService?.name}
        </span>
        <div
          className="bg-[#f21300] text-white max-h-fit max-w-fit px-2 py-1 rounded-md cursor-pointer flex items-center"
        >
          <Plus strokeWidth={"5"} height={16} />
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-4 flex space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === tab ? "bg-[#f21300] text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4 p-4 bg-white rounded-lg shadow">
        {activeTab === "Timeline" && <div>(Admin) created a new project</div>}
        {activeTab !== "Timeline" && <div>{activeTab} content coming soon...</div>}
      </div>
    </div>
  );
};

export default ProjectPage;
