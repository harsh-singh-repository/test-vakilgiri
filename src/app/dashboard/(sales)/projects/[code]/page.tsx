"use client";
import React, { useEffect, useState } from "react";
import { Project } from "../types";
import { Plus } from "lucide-react";
import { FaPlus, FaUser } from "react-icons/fa";

const ProjectPage = () => {
  const [projectData, setProjectData] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<string>("Timeline");

  const tabs = [
    "Timeline",
    "Clients",
    "Discussions",
    "Files",
    "Financials",
    "Tickets",
  ];

  useEffect(() => {
    const data = localStorage.getItem("projectData");
    if (data) {
      setProjectData(JSON.parse(data));
    }
  }, []);
  const events = [
    {
      date: "24-12-2024, 4:41 pm",
      person: "Admin",
      description: "Created a new project",
    },
    {
      date: "26-12-2024, 5:31 am",
      person: "Admin",
      description: "Created a new business",
    },
    {
      date: "28-12-2024, 7:09 pm",
      person: "Admin",
      description: "updated project",
    },
  ];
  const timeline = () => {
    return (
      <div className="flex flex-col items-start space-y-6">
        {events.map((event, index) => (
          <div key={index} className="flex items-start space-x-4 relative">
            <div className="flex items-center justify-center gap-3">
              {/* Icon and Dotted Line */}
              <div className="relative flex-shrink-0 flex flex-col items-center">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center shadow">
                  <FaUser className="text-gray-500 text-lg" />
                </div>
                {/* Dotted Line */}
                {index !== events.length - 1 && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-px h-full border-dotted border-gray-700 border"></div>
                )}
              </div>

              {/* Timeline Content */}
              <div className="flex flex-col p-2 bg-white rounded-2xl shadow-md">
                <div className="text-sm">
                  <span className="font-bold text-red-500">{`(${event.person})`}</span>{" "}
                  <span className="text-gray-900">{event.description}</span>
                </div>
                <div className="text-xs text-gray-500">{event.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const clients = () => {
    return <div>hello</div>;
  };
  const discussions = () => {
    return (
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="w-full h-[31px] bg-[#091747] rounded-xl flex justify-between items-center">
              <div className="h-[15px] text-white font-poppins font-semibold mb-3 ml-3">Discussions</div>
              <div className="h-15 w-15 bg-[#f21300] mr-3 rounded-md text-white p-1 text-xs">
                <FaPlus/>
              </div>
          </div>
        </div>
        <div>
        <div className="w-full h-[31px] bg-[#091747] rounded-xl flex justify-between items-center">
              <div className="h-[15px] text-white font-poppins font-semibold mb-3 ml-3">Reminders</div>
              <div className="h-15 w-15 bg-[#f21300] mr-3 rounded-md text-white p-1 text-xs">
                <FaPlus/>
              </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="p-4 bg-[#eaeaea] min-h-screen">
      {/* Header */}
      <div className="p-2 w-full bg-[#091747] text-[18px] text-white font-medium font-poppins rounded-xl flex justify-between items-center">
        <span>
          {projectData?.code} {projectData?.projectService?.name}
        </span>
        <div className="bg-[#f21300] text-white max-h-fit max-w-fit px-1 py-1 rounded-md cursor-pointer flex items-center">
          <Plus strokeWidth={"5"} height={16} />
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-4 flex space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium text-[13px] font-poppins ${
              activeTab === tab
                ? "bg-[#f21300] text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4 p-2">
        {activeTab === "Timeline" && timeline()}
        {activeTab === "Clients" && clients()}
        {activeTab === "Discussions" && discussions()}
      </div>
    </div>
  );
};

export default ProjectPage;
